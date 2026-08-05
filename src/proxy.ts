// src/proxy.ts

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    console.log('🔄 Proxy - Path:', pathname, 'Token:', !!token); // Debug log

    // ✅ Protect /admin routes
    if (pathname.startsWith('/admin')) {
        if (!token) {
            console.log('🚫 No token, redirecting to signin');
            const signInUrl = new URL('/auth/signin', request.url);
            signInUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(signInUrl);
        }
        console.log('✅ Token found, allowing access to admin');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
