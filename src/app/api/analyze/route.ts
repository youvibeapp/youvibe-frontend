import { NextRequest, NextResponse } from 'next/server';
import { apiConfig, endpoints } from '@/lib/config';
import type {
  BackendImageAnalysisInput,
  BackendImageAnalysisResult,
  BackendErrorResponse,
} from '@/lib/types/backend';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request
    const body: BackendImageAnalysisInput = await request.json();

    // Validate that we have image data
    if (!body.image_base64 && !body.image_bytes) {
      return NextResponse.json(
        { error: 'Either image_base64 or image_bytes is required' },
        { status: 400 }
      );
    }

    // Construct the backend URL
    const backendUrl = `${apiConfig.fastApiBaseUrl}${endpoints.analyze}`;

    // Get query parameters (like engine)
    const searchParams = request.nextUrl.searchParams;
    const engine = searchParams.get('engine');

    // Build the backend request URL with query params
    const url = new URL(backendUrl);
    if (engine) {
      url.searchParams.set('engine', engine);
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
    const data: BackendImageAnalysisResult = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Analyze API route error:', error);

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
