// src/components/AdminLinksList.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LinkData {
    id: number;
    title: string;
    url: string;
    icon: string | null;
    order: number;
    clicks: number;
}

export default function AdminLinksList({ links }: { links: LinkData[] }) {
    const router = useRouter();

    const deleteLink = async (id: number) => {
        if (!confirm('Are you sure you want to delete this link?')) return;

        try {
            const response = await fetch(`/api/links/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete link');
            }

            router.refresh(); // ✅ Refresh the page without reload
        } catch (error) {
            console.error('Error deleting link:', error);
            alert('Failed to delete link');
        }
    };

    if (links.length === 0) {
        return (
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
        );
    }

    return (
        <div className="grid gap-4">
            {links.map((link) => (
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
                            onClick={() => deleteLink(link.id)}
                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
