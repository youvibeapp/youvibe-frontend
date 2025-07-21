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
 * Transforms AestheticResult.analysis into AestheticSummaryCard props
 */
export function transformToSummaryProps(
  result: AestheticResult | null
): AestheticSummaryCardProps {
  if (!result?.analysis) {
    return {}; // Will use default props
  }

  const { analysis } = result;

  // Create color story from the color palette
  const colorStory = analysis.colorPalette.slice(0, 4).map((color, index) => {
    // Simple percentage distribution - can be made more sophisticated
    const percentages = [35, 30, 25, 10];
    return {
      color,
      percentage: percentages[index] || 5,
    };
  });

  // Create aesthetic summary
  const aestheticSummary = analysis.styleDescription
    ? `Your vibe is: ${analysis.styleDescription} aesthetic that captures your unique style.`
    : undefined;

  // Create celebrity match (placeholder for now - could be enhanced)
  const celebrityMatch = analysis.style
    ? `Your aesthetic matches: ✨ ${analysis.style} vibes ✨`
    : undefined;

  return {
    aestheticSummary,
    celebrityMatch,
    colorStory: colorStory.length > 0 ? colorStory : undefined,
  };
}

/**
 * Helper to check if we have valid result data
 */
export function hasValidResult(result: AestheticResult | null): boolean {
  return !!(result?.analysis && result?.images?.images?.length);
}
