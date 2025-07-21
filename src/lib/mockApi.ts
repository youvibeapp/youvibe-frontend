import { AestheticResult } from './types';

// Mock aesthetic results for testing
const mockResults: AestheticResult[] = [
  {
    aestheticSummary:
      'Your vibe is: a cozy soft girl aesthetic that has endless confidence.',
    celebrityMatch: 'Your aesthetic match is: ✨ Hailey Bieber ✨',
    colorStory: [
      { color: '#d2bdb1', percentage: 35 },
      { color: '#f38695', percentage: 30 },
      { color: '#0c2a6b', percentage: 25 },
      { color: '#fffcf4', percentage: 10 },
    ],
    moodboardImages: [
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
    ],
  },
  {
    aestheticSummary:
      'Your vibe is: dark academia with mysterious and intellectual energy.',
    celebrityMatch: 'Your aesthetic match is: ✨ Timothée Chalamet ✨',
    colorStory: [
      { color: '#2c1810', percentage: 40 },
      { color: '#8b4513', percentage: 25 },
      { color: '#daa520', percentage: 20 },
      { color: '#f5f5dc', percentage: 15 },
    ],
    moodboardImages: [
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
      '/placeholder.svg?height=100&width=100',
    ],
  },
];

export async function analyzeAesthetic(
  base64Image: string
): Promise<AestheticResult> {
  // Simulate API processing time
  await new Promise(resolve =>
    setTimeout(resolve, 2000 + Math.random() * 1000)
  );

  // Simulate occasional API errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Failed to analyze image. Please try again.');
  }

  // Return random mock result
  const randomResult =
    mockResults[Math.floor(Math.random() * mockResults.length)];

  return {
    ...randomResult,
    // Add some variation to make it feel more dynamic
    aestheticSummary:
      randomResult.aestheticSummary +
      ` (Analyzed at ${new Date().toLocaleTimeString()})`,
  };
}

export async function uploadImage(
  base64Image: string
): Promise<{ imageId: string }> {
  // Simulate upload time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));

  // Simulate upload errors (2% chance)
  if (Math.random() < 0.02) {
    throw new Error(
      'Upload failed. Please check your connection and try again.'
    );
  }

  return {
    imageId: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
}
