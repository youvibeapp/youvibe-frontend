import { useState, useCallback, useRef } from 'react';
import type {
  ProcessingState,
  AestheticInput,
  AestheticResult,
  AestheticError,
  ProcessedCelebrityMatch,
} from '@/lib/types/aesthetic';
import type {
  BackendImageAnalysisResult,
  BackendImageQueryInput,
  BackendImageSearchResult,
  BackendCelebrityMatchInput,
  BackendCelebrityMatchResult,
} from '@/lib/types/backend';

// =============================================
// HOOK INTERFACE
// =============================================

export interface UseAestheticProcessorReturn {
  // State values (reactive)
  state: ProcessingState;
  result: AestheticResult | null;
  error: AestheticError | null;
  isIdle: boolean;
  isProcessing: boolean;
  isComplete: boolean;
  hasError: boolean;

  // Functions (stable references via useCallback)
  processImage: (
    imageBase64: string,
    options?: AestheticInput['options']
  ) => Promise<void>;
  reset: () => void;
  retry: () => Promise<void>;
}

// =============================================
// AESTHETIC PROCESSOR HOOK WITH PROGRESS TRACKING
// =============================================

/**
 * Hook for managing aesthetic image processing workflow
 *
 * Provides granular state updates by splitting API calls into separate steps.
 * Takes direct API functions as parameters for maximum flexibility.
 */

export const useAestheticProcessorWithProgress = (
  analyzeImage: (
    imageBase64: string,
    options?: { engine?: string }
  ) => Promise<BackendImageAnalysisResult>,
  matchCelebrities: (
    input: BackendCelebrityMatchInput,
    options?: { engine?: string; imageExtractor?: string }
  ) => Promise<BackendCelebrityMatchResult>,
  generateImages: (
    input: BackendImageQueryInput,
    options?: { provider?: string; maxImages?: number }
  ) => Promise<BackendImageSearchResult[]>
): UseAestheticProcessorReturn => {
  const [state, setState] = useState<ProcessingState>('idle');
  const [result, setResult] = useState<AestheticResult | null>(null);
  const [error, setError] = useState<AestheticError | null>(null);
  const lastInputRef = useRef<AestheticInput | null>(null);

  // Derived state
  const isIdle = state === 'idle';
  const isProcessing =
    state === 'analyzing' || state === 'matching' || state === 'generating';
  const isComplete = state === 'complete';
  const hasError = state === 'error';

  const processImage = useCallback(
    async (
      imageBase64: string,
      options?: AestheticInput['options']
    ): Promise<void> => {
      const input: AestheticInput = { imageBase64, options };
      lastInputRef.current = input;

      setError(null);
      setResult(null);

      try {
        // Step 1: Image Analysis
        setState('analyzing');
        const analysisResult = await analyzeImage(imageBase64, {
          engine: options?.analysisEngine,
        });

        // Step 2: Celebrity Matching (only if facial metadata is available)
        let celebrityMatchResult: BackendCelebrityMatchResult | undefined;
        if (analysisResult.facial_metadata) {
          setState('matching');
          try {
            celebrityMatchResult = await matchCelebrities(
              {
                facial_metadata: analysisResult.facial_metadata,
                max_matches: 3,
              },
              {
                engine: 'pydantic-ai',
                imageExtractor: 'tmdb',
              }
            );
          } catch (celebrityError) {
            console.warn('Celebrity matching failed:', celebrityError);
            // Continue without celebrity match - this is optional
          }
        }

        // Transform analysisResult to BackendImageQueryInput
        const metadata = analysisResult.descriptive_metadata;
        const queryInput = {
          query: `${metadata?.style} ${metadata?.mood} aesthetic`,
          tags: metadata?.tags?.slice(0, 3).join(', '),
          color: metadata?.color_palette_hexcodes?.[0],
          prompt: `${metadata?.style} aesthetic moodboard`,
        };

        // Step 3: Image Generation
        setState('generating');
        const imageResults = await generateImages(queryInput, {
          provider: options?.generationProvider,
          maxImages: options?.maxImages,
        });

        // Step 4: Transform results
        // Transform celebrity match results
        const processedCelebrityMatch: ProcessedCelebrityMatch | undefined =
          celebrityMatchResult
            ? {
                matches: celebrityMatchResult.matches.map(match => ({
                  name: match.name,
                  description: match.description,
                  confidenceScore: match.confidence_score,
                  profession: match.profession,
                  matchReasons: match.match_reasons,
                  images: match.images.map(img => ({
                    filePath: img.file_path,
                    width: img.width,
                    height: img.height,
                    fullUrl: `https://image.tmdb.org/t/p/w500${img.file_path}`, // TMDB image URL format
                  })),
                })),
                searchSummary: celebrityMatchResult.search_summary,
              }
            : undefined;

        const combinedResult: AestheticResult = {
          analysis: {
            tags: analysisResult.descriptive_metadata?.tags || [],
            caption: analysisResult.descriptive_metadata?.caption || '',
            style: analysisResult.descriptive_metadata?.style || '',
            mood: analysisResult.descriptive_metadata?.mood || '',
            colorPalette:
              analysisResult.descriptive_metadata?.color_palette_hexcodes || [],
            facialAnalysis: analysisResult.facial_metadata
              ? {
                  // Basic demographics
                  ageRange: analysisResult.facial_metadata.age_range,
                  gender: analysisResult.facial_metadata.gender,
                  ethnicity: analysisResult.facial_metadata.ethnicity,

                  // Facial Structure Analysis
                  jawLine: analysisResult.facial_metadata.jaw_line,
                  chin: analysisResult.facial_metadata.chin,
                  cheeks: analysisResult.facial_metadata.cheeks,
                  forehead: analysisResult.facial_metadata.forehead,

                  // Individual Facial Features
                  eyebrows: analysisResult.facial_metadata.eyebrows,
                  eyes: analysisResult.facial_metadata.eyes,
                  nose: analysisResult.facial_metadata.nose,
                  lips: analysisResult.facial_metadata.lips,

                  // Style & Grooming Assessment
                  skinTexture: analysisResult.facial_metadata.skin_texture,
                  beardMoustacheArea:
                    analysisResult.facial_metadata.beard_moustache_area,
                  currentHairStyle:
                    analysisResult.facial_metadata.current_hair_style,
                  hairStyleImprovementSuggestions:
                    analysisResult.facial_metadata
                      .hair_style_improvement_suggestions,
                  clothingStyleSuggestions:
                    analysisResult.facial_metadata.clothing_style_suggestions,

                  // Overall Assessment
                  overallAppearance:
                    analysisResult.facial_metadata.overall_appearance,
                  confidenceScore:
                    analysisResult.facial_metadata.confidence_score,
                }
              : undefined,
            primaryColor:
              analysisResult.descriptive_metadata
                ?.color_palette_hexcodes?.[0] || '#000000',
            mainTags:
              analysisResult.descriptive_metadata?.tags?.slice(0, 5) || [],
            styleDescription:
              `${analysisResult.descriptive_metadata?.style || ''} ${analysisResult.descriptive_metadata?.mood || ''}`.trim(),
            embedding: analysisResult.semantic_embedding,
          },
          images: {
            images: imageResults.map((img: BackendImageSearchResult) => ({
              id: img.id,
              title: img.title,
              description: img.description,
              imageUrl: img.image_url || '',
              tags: img.tags
                ? img.tags.split(',').map((tag: string) => tag.trim())
                : [],
              owner: img.owner,
              sourcePage: img.source_page,
              sourceType: img.source_type,
            })),
            totalFound: imageResults.length,
            query: 'aesthetic moodboard',
            provider: options?.generationProvider || 'flickr',
          },
          celebrityMatch: processedCelebrityMatch,
          metadata: {
            processingTimeMs: 0, // TODO: Calculate actual time
            timestamp: new Date(),
          },
        };

        setState('complete');
        setResult(combinedResult);
      } catch (caughtError) {
        const aestheticError: AestheticError = {
          type: 'network_error',
          message: 'Processing failed',
          details:
            caughtError instanceof Error
              ? caughtError.message
              : String(caughtError),
          originalError: caughtError,
        };

        setState('error');
        setError(aestheticError);
        console.error('Processing failed:', aestheticError);
      }
    },
    [analyzeImage, matchCelebrities, generateImages]
  );

  const reset = useCallback(() => {
    setState('idle');
    setResult(null);
    setError(null);
    lastInputRef.current = null;
  }, []);

  const retry = useCallback(async (): Promise<void> => {
    const lastInput = lastInputRef.current;
    if (!lastInput) return;
    await processImage(lastInput.imageBase64, lastInput.options);
  }, [processImage]);

  return {
    state,
    result,
    error,
    isIdle,
    isProcessing,
    isComplete,
    hasError,
    processImage,
    reset,
    retry,
  };
};
