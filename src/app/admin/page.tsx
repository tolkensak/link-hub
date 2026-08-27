// src/app/admin/page.tsx

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { links } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import AdminLinksList from '@/components/AdminLinksList';

export default async function AdminPage() {
    const session = await auth();
    
    if (!session) {
        redirect('/auth/signin');
    }

    const userLinks = await db
        .select()
        .from(links)
        .where(eq(links.userId, session.user.id))
        .orderBy(links.order);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Welcome, {session.user.name || session.user.email}
                        </span>
                        <Link
                            href="/api/auth/signout"
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                            Sign Out
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Link
                        href="/admin/links/new"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add New Link
                    </Link>
                </div>

                {/* ✅ Use the Client Component for interactive parts */}
                <AdminLinksList
                    links={userLinks.map((link) => ({
                        ...link,
                        order: link.order ?? 0,
                        clicks: link.clicks ?? 0,
                    }))}
                />

                <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <h3 className="font-medium">Your Public Page</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Share your links with the world:
                    </p>
                    <Link
                        href={`/${session.user.id}`}
                        className="text-blue-600 hover:underline text-sm"
                        target="_blank"
                    >
                        {`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${session.user.id}`}
                    </Link>
                </div>
            </main>
        </div>
    );
}
