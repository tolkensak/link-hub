// src/lib/auth.ts

import NextAuth, { getServerSession, type NextAuthOptions, type Session, type User } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db';
import type { Adapter } from 'next-auth/adapters';
import type { JWT } from 'next-auth/jwt';

// ✅ Define the session strategy type
type SessionStrategy = 'database' | 'jwt';

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db) as Adapter,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        session: async ({ session, user }: { session: Session; user: User }) => {
            console.log('🔐 Session callback - user:', user);
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
        jwt: async ({ token, user }: { token: JWT; user?: User }) => {
            console.log('🔑 JWT callback - user:', user);
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
        strategy: 'database' as SessionStrategy,
    },
    debug: true,
};

// ✅ Export auth for server-side usage
export const auth = async () => {
    return await getServerSession(authOptions);
};

// ✅ Export handlers for the API route
export const handlers = NextAuth(authOptions);
