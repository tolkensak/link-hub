// src/app/api/links/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { links } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// POST /api/links - Create a new link
export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, url, icon, order } = body;

        if (!title || !url) {
            return NextResponse.json(
                { error: 'Title and URL are required' },
                { status: 400 }
            );
        }

        const newLink = await db.insert(links).values({
            userId: session.user.id,
            title,
            url,
            icon: icon || null,
            order: order || 0,
        }).returning();

        return NextResponse.json({ success: true, link: newLink[0] });
    } catch (error) {
        console.error('Error creating link:', error);
        return NextResponse.json(
            { error: 'Failed to create link' },
            { status: 500 }
        );
    }
}

// DELETE /api/links/:id - Delete a link (we'll add this later)
// PUT /api/links/:id - Update a link (we'll add this later)
