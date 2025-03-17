import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    
    const body = await request.json() // accessing request body
    const { token } = body;
    if (!token) {
      return NextResponse.json({ message: "User is not authenticated" }, { status: 401, })
    } else {
      const cookieStore = await cookies();
      // cookieStore.set('name', token) // or // cookies().set('name', token, { secure: true }) 
      // or
      cookieStore.set({
        name: 'nightlearn-token',
        value: token,
        secure: true, // Is only accessible through HTTPS
        httpOnly: true, // Is only the server can access the cookie? Note: You cannot get or set httpOnly cookies from the browser, only the server.
        path: '/',
        maxAge: 3600 * 24 * 30 * 3, // 3 month
      });
      return NextResponse.json({ message: "User is authenticated" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}