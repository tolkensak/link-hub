// src/proxy.ts

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin')) {
        if (!token) {
            const signInUrl = new URL('/auth/signin', request.url);
            signInUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(signInUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
