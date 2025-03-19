import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // CORS settings
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:4000/'); // Allow this origin
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Allowed methods
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
  console.log("middleware")
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200 });
  }

  return response; // Continue with the next middleware or handler
}

// Specify the paths where this middleware should be applied
export const config = {
  matcher: ['/api/:path*'], // Apply CORS to all API routes
};
