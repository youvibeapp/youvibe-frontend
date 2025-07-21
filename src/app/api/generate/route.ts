import { NextRequest, NextResponse } from 'next/server';
import { apiConfig, endpoints } from '@/lib/config';
import type {
  BackendImageQueryInput,
  BackendImageSearchResult,
  BackendErrorResponse,
} from '@/lib/types/backend';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request
    const body: BackendImageQueryInput = await request.json();

    // Validate that we have some query data
    if (!body.query && !body.tags && !body.prompt) {
      return NextResponse.json(
        { error: 'At least one of query, tags, or prompt is required' },
        { status: 400 }
      );
    }

    // Construct the backend URL
    const backendUrl = `${apiConfig.fastApiBaseUrl}${endpoints.generate}`;

    // Get query parameters (like provider)
    const searchParams = request.nextUrl.searchParams;
    const provider = searchParams.get('provider');

    // Build the backend request URL with query params
    const url = new URL(backendUrl);
    if (provider) {
      url.searchParams.set('provider', provider);
    }

    // Make request to FastAPI backend
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiConfig.fastApiKey,
      },
      body: JSON.stringify(body),
    });

    // Handle non-200 responses
    if (!response.ok) {
      const errorData: BackendErrorResponse = await response
        .json()
        .catch(() => ({
          detail: 'Unknown error occurred',
        }));

      return NextResponse.json(
        { error: errorData.detail },
        { status: response.status }
      );
    }

    // Parse and return the successful response
    const data: BackendImageSearchResult[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Generate API route error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}
