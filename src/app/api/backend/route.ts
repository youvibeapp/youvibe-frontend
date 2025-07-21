import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.FASTAPI_BASE_URL || 'https://youvibe-backend-production.up.railway.app';
const API_KEY = process.env.FASTAPI_API_KEY || 'Rw_xHu56l4QNuAXl0C8hf5-kR4fut1MDRL2TwOWxPAU';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, data } = body;

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to communicate with backend' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || '/';

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      headers: {
        'X-API-Key': API_KEY,
      },
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to communicate with backend' },
      { status: 500 }
    );
  }
} 