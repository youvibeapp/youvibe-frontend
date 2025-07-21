import { useState, useCallback, useRef } from 'react';
import type {
  ProcessingState,
  AestheticInput,
  AestheticResult,
  AestheticError,
} from '@/lib/types/aesthetic';
import type {
  BackendImageAnalysisResult,
  BackendImageQueryInput,
  BackendImageSearchResult,
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
  const isProcessing = state === 'analyzing' || state === 'generating';
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

        // Transform analysisResult to BackendImageQueryInput
        const metadata = analysisResult.descriptive_metadata;
        const queryInput = {
          query: `${metadata?.style} ${metadata?.mood} aesthetic`,
          tags: metadata?.tags?.slice(0, 3).join(', '),
          color: metadata?.color_palette_hexcodes?.[0],
          prompt: `${metadata?.style} aesthetic moodboard`,
        };

        // Step 2: Image Generation
        setState('generating');
        const imageResults = await generateImages(queryInput, {
          provider: options?.generationProvider,
          maxImages: options?.maxImages,
        });

        // Step 3: Transform results (simplified for now)
        const combinedResult: AestheticResult = {
          analysis: {
            tags: analysisResult.descriptive_metadata?.tags || [],
            caption: analysisResult.descriptive_metadata?.caption || '',
            style: analysisResult.descriptive_metadata?.style || '',
            mood: analysisResult.descriptive_metadata?.mood || '',
            colorPalette:
              analysisResult.descriptive_metadata?.color_palette_hexcodes || [],
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
    [analyzeImage, generateImages]
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
