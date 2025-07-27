import type { AestheticResult } from '@/lib/types/aesthetic';
import type { AestheticSummaryCardProps } from '@/components/results/AestheticSummaryCard/types';
import type { MoodboardGridProps } from '@/components/results/MoodboardGrid/types';

/**
 * Transforms AestheticResult.images into MoodboardGrid props
 */
export function transformToMoodboardProps(
  result: AestheticResult | null
): MoodboardGridProps {
  if (!result?.images?.images) {
    return { images: undefined }; // Will use default images
  }

  // Extract imageUrl from each MoodboardImage
  const imageUrls = result.images.images
    .map(img => img.imageUrl)
    .filter(url => url); // Remove any empty URLs

  return {
    images: imageUrls,
  };
}

/**
 * Transforms AestheticResult into AestheticSummaryCard props
 */
export function transformToSummaryProps(
  result: AestheticResult | null,
  userImageUrl?: string
): AestheticSummaryCardProps {
  if (!result?.analysis) {
    // Return a minimal default analysis structure
    return {
      analysis: {
        tags: [],
        caption: '',
        style: '',
        mood: '',
        colorPalette: [],
        primaryColor: '#000000',
        mainTags: [],
        styleDescription: '',
      },
    };
  }

  return {
    analysis: result.analysis,
    celebrityMatch: result.celebrityMatch,
    userImageUrl,
  };
}

/**
 * Helper to check if we have valid result data
 */
export function hasValidResult(result: AestheticResult | null): boolean {
  return !!(result?.analysis && result?.images?.images?.length);
}
