import { NextRequest, NextResponse } from 'next/server';
import dbConnect from './services/server/mongooose/dbConnect';

export async function middleware(request: NextRequest) {
  // CORS settings
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000/'); // Allow all origins
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Allowed methods
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200 });
  }

  return NextResponse.next(); // Continue with the next middleware or handler
}

// Specify the paths where this middleware should be applied
export const config = {
  matcher: ['/api/:path*'], // Apply CORS to all API routes
};
