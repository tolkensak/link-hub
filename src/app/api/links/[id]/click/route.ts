// src/app/api/links/[id]/route.ts

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { links } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/links/:id - Fetch a single link
export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    console.log("🔍 GET /api/links/[id] - ID:", params.id);

    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const linkId = parseInt(id);

        if (isNaN(linkId)) {
            return NextResponse.json(
                { error: "Invalid link ID" },
                { status: 400 },
            );
        }

        const [link] = await db
            .select()
            .from(links)
            .where(eq(links.id, linkId))
            .limit(1);

        if (!link) {
            return NextResponse.json(
                { error: "Link not found" },
                { status: 404 },
            );
        }

        // Ensure the link belongs to the authenticated user
        if (link.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 },
            );
        }

        return NextResponse.json({ success: true, link });
    } catch (error) {
        console.error("Error fetching link:", error);
        return NextResponse.json(
            { error: "Failed to fetch link" },
            { status: 500 },
        );
    }
}

// PUT /api/links/:id - Update a link
export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    console.log("✏️ PUT /api/links/[id] - ID:", params.id);

    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const linkId = parseInt(id);

        if (isNaN(linkId)) {
            return NextResponse.json(
                { error: "Invalid link ID" },
                { status: 400 },
            );
        }

        const body = await request.json();
        const { title, url, icon, order } = body;

        if (!title || !url) {
            return NextResponse.json(
                { error: "Title and URL are required" },
                { status: 400 },
            );
        }

        // Check if link exists and belongs to user
        const [existingLink] = await db
            .select()
            .from(links)
            .where(eq(links.id, linkId))
            .limit(1);

        if (!existingLink) {
            return NextResponse.json(
                { error: "Link not found" },
                { status: 404 },
            );
        }

        if (existingLink.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 },
            );
        }

        const updatedLink = await db
            .update(links)
            .set({
                title,
                url,
                icon: icon || null,
                order: order || 0,
                updatedAt: new Date(),
            })
            .where(eq(links.id, linkId))
            .returning();

        return NextResponse.json({ success: true, link: updatedLink[0] });
    } catch (error) {
        console.error("Error updating link:", error);
        return NextResponse.json(
            { error: "Failed to update link" },
            { status: 500 },
        );
    }
}

// DELETE /api/links/:id - Delete a link
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    console.log("🗑️ DELETE /api/links/[id] - ID:", params.id);

    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const linkId = parseInt(id);

        if (isNaN(linkId)) {
            return NextResponse.json(
                { error: "Invalid link ID" },
                { status: 400 },
            );
        }

        // Check if link exists and belongs to user
        const [existingLink] = await db
            .select()
            .from(links)
            .where(eq(links.id, linkId))
            .limit(1);

        if (!existingLink) {
            return NextResponse.json(
                { error: "Link not found" },
                { status: 404 },
            );
        }

        if (existingLink.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 },
            );
        }

        await db.delete(links).where(eq(links.id, linkId));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting link:", error);
        return NextResponse.json(
            { error: "Failed to delete link" },
            { status: 500 },
        );
    }
}
