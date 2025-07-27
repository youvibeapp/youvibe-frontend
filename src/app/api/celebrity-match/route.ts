import { NextRequest, NextResponse } from 'next/server';
import { apiConfig, endpoints } from '@/lib/config';
import type {
  BackendCelebrityMatchInput,
  BackendCelebrityMatchResult,
  BackendErrorResponse,
} from '@/lib/types/backend';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request
    const body: BackendCelebrityMatchInput = await request.json();

    // Validate that we have facial metadata
    if (!body.facial_metadata) {
      return NextResponse.json(
        { error: 'facial_metadata is required' },
        { status: 400 }
      );
    }

    // Construct the backend URL
    const backendUrl = `${apiConfig.fastApiBaseUrl}${endpoints.celebrityMatch}`;

    // Get query parameters (like engine and image_extractor)
    const searchParams = request.nextUrl.searchParams;
    const engine = searchParams.get('engine');
    const imageExtractor = searchParams.get('image_extractor');

    // Build the backend request URL with query params
    const url = new URL(backendUrl);
    if (engine) {
      url.searchParams.set('engine', engine);
    }
    if (imageExtractor) {
      url.searchParams.set('image_extractor', imageExtractor);
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
    const data: BackendCelebrityMatchResult = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Celebrity match API route error:', error);

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
