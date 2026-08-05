// src/app/admin/page.tsx

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { links } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Welcome, {session.user.name || session.user.email}
                        </span>
                        <SignOutButton />
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

                <div className="grid gap-4">
                    {userLinks.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <p className="text-gray-600 dark:text-gray-400">
                                You haven't added any links yet.
                            </p>
                            <Link
                                href="/admin/links/new"
                                className="mt-4 inline-block text-blue-600 hover:underline"
                            >
                                Add your first link →
                            </Link>
                        </div>
                    ) : (
                        userLinks.map((link) => (
                            <div
                                key={link.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center justify-between"
                            >
                                <div>
                                    <h3 className="font-medium">{link.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{link.url}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        Clicks: {link.clicks}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/links/${link.id}/edit`}
                                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

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
