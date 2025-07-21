import type {
  BackendImageAnalysisInput,
  BackendImageAnalysisResult,
  BackendImageQueryInput,
  BackendImageSearchResult,
} from '@/lib/types/backend';

/**
 * Simple utility function to analyze an image via our Next.js API route
 */
export async function analyzeImage(
  imageBase64: string,
  options?: { engine?: string }
): Promise<BackendImageAnalysisResult> {
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
 * Simple utility function to generate moodboard images via our Next.js API route
 */
export async function generateImages(
  queryInput: BackendImageQueryInput,
  options?: { provider?: string }
): Promise<BackendImageSearchResult[]> {
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
