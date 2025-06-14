// app/api/auth/google/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '@/inner-app-server/mongooose/models/user';
import { cookies } from 'next/headers';
import { createToken } from '@/inner-app-server/fundamental';

export async function GET(req: NextRequest) {

    const code = req.nextUrl.searchParams.get('code');
    if (!code) {
        return NextResponse.json({ message: 'No code provided', status: 400, }, { status: 400 });
    }
    console.log({ code })
    try {
        // Getting access_token and id_token from Google
        const result = await fetch('https://oauth2.googleapis.com/token',
            {
                body: JSON.stringify(
                    {
                        code,
                        client_id: process.env.GOOGLE_CLIENT_ID!,
                        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
                        grant_type: 'authorization_code',
                    }
                ),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        const tokenResponse = await result.json();
        const id_token = tokenResponse?.id_token;
        if (!id_token) {
            return NextResponse.json({ message: 'No id_token provided', status: 400, }, { status: 400 });
        }
        // Decoding id_token to get user information
        const googleUser = jwt.decode(id_token) as {
            given_name: string;
            family_name: string;
            email: string;
            picture: string;
            sub: string;
        };
        if (!googleUser) {
            return NextResponse.json({ message: 'No googleUser provided', status: 400, }, { status: 400 });
        }
        // Store or retrieve the user from the database
        const user = await User.findOne({ email: googleUser.email });
        let user_id = null;
        if (!user) {
            const hashedPassword = await bcrypt.hash(googleUser.sub, 10);
            const newUser = new User({
                firstname: googleUser.given_name,
                lastname: googleUser.family_name,
                email: googleUser.email,
                password: hashedPassword,
                authProvider: "google",
            });
            await newUser.save();
            user_id = newUser._id;
        } else {
            user_id = user._id;
        }
        // create token
        const token = createToken(user_id as string)
        // store token in cookie
        const cookieStore = cookies();
        // (await cookieStore).set('name', token) // or // cookies().set('name', token, { secure: true }) 
        // or
        (await cookieStore).set({
            name: 'NHTLN', // nightlearn-token
            value: token,
            secure: true, // Is only accessible through HTTPS
            httpOnly: true, // Is only the server can access the cookie? Note: You cannot get or set httpOnly cookies from the browser, only the server.
            path: '/',
            maxAge: 3600 * 24 * 30 * 3, // 3 month
        });
        return NextResponse.redirect(new URL('/', req.url));
    } catch (err) {
        console.error('Google Auth Error:', err);
        return NextResponse.json({ message: 'Google Authentication failed', status: 500, response: err }, { status: 500 });
    }
}
