// src/lib/auth.ts

import NextAuth, { getServerSession } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db';

export const authOptions = {
    adapter: DrizzleAdapter(db),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
            console.log('🔐 Session callback - user:', user); // Debug
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
        jwt: async ({ token, user }) => {
            console.log('🔑 JWT callback - user:', user); // Debug
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: 'database',
    },
    debug: true,
};

// ✅ Export auth for server-side usage
export const auth = async () => {
    return await getServerSession(authOptions);
};

export const handlers = NextAuth(authOptions);
