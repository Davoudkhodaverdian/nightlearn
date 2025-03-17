import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  try {
    const cookieStore = await cookies();
    // cookieStore.set('name', token) // or // cookies().set('name', token, { secure: true }) 
    // or
    cookieStore.set({
      name: 'nightlearn-token',
      value: "", // remove token
      secure: true, // Is only accessible through HTTPS
      httpOnly: true, // Is only the server can access the cookie? Note: You cannot get or set httpOnly cookies from the browser, only the server.
      path: '/',
      maxAge: 0, // remove token
    });
    return NextResponse.json({ message: "User is authenticated" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 405 });
  }
}