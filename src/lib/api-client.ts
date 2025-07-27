import type {
  BackendImageAnalysisInput,
  BackendImageAnalysisResult,
  BackendImageQueryInput,
  BackendImageSearchResult,
  BackendCelebrityMatchInput,
  BackendCelebrityMatchResult,
} from '@/lib/types/backend';
import {
  mockAnalysisResult,
  mockCelebrityMatchResult,
  mockImageSearchResults,
} from '@/lib/mockData';

// Check if mock mode is enabled
const MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === 'true';

// Helper function to simulate API delay
const mockDelay = (ms: number = 100) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simple utility function to analyze an image via our Next.js API route
 */
export async function analyzeImage(
  imageBase64: string,
  options?: { engine?: string }
): Promise<BackendImageAnalysisResult> {
  if (MOCK_MODE) {
    console.log('🔧 Mock Mode: Using mock analysis result');
    await mockDelay(150); // Simulate brief API delay
    return mockAnalysisResult;
  }

  const url = new URL('/api/analyze', window.location.origin);

  if (options?.engine) {
    url.searchParams.set('engine', options.engine);
  }

  const body: BackendImageAnalysisInput = {
    image_base64: imageBase64,
  };

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: 'Network error',
    }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Simple utility function to match celebrities via our Next.js API route
 */
export async function matchCelebrities(
  input: BackendCelebrityMatchInput,
  options?: { engine?: string; imageExtractor?: string }
): Promise<BackendCelebrityMatchResult> {
  if (MOCK_MODE) {
    console.log('🔧 Mock Mode: Using mock celebrity match result');
    await mockDelay(100); // Simulate brief API delay
    return mockCelebrityMatchResult;
  }

  const url = new URL('/api/celebrity-match', window.location.origin);

  if (options?.engine) {
    url.searchParams.set('engine', options.engine);
  }
  if (options?.imageExtractor) {
    url.searchParams.set('image_extractor', options.imageExtractor);
  }

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: 'Network error',
    }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Simple utility function to generate moodboard images via our Next.js API route
 */
export async function generateImages(
  queryInput: BackendImageQueryInput,
  options?: { provider?: string }
): Promise<BackendImageSearchResult[]> {
  if (MOCK_MODE) {
    console.log('🔧 Mock Mode: Using mock image search results');
    await mockDelay(200); // Simulate brief API delay
    return mockImageSearchResults;
  }

  const url = new URL('/api/generate', window.location.origin);

  if (options?.provider) {
    url.searchParams.set('provider', options.provider);
  }

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(queryInput),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: 'Network error',
    }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}
