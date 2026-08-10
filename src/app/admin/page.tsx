// src/app/admin/page.tsx

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { links } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function AdminPage() {
    const session = await auth();

    if (!session) {
        redirect('/auth/signin');
    }

    // Fetch user's links
    const userLinks = await db
        .select()
        .from(links)
        .where(eq(links.userId, session.user.id))
        .orderBy(links.order);

    return (
        <div>
            <h1>Welcome, {session.user.name || session.user.email}</h1>
            {/* Rest of admin page */}
        </div>
    );
}
