// src/app/api/users/[userId]/route.ts

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, links } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = await params;

        // Fetch user
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Fetch user's links
        const userLinks = await db
            .select()
            .from(links)
            .where(eq(links.userId, userId))
            .orderBy(links.order);

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                bio: user.bio,
            },
            links: userLinks,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user data' },
            { status: 500 }
        );
    }
}
