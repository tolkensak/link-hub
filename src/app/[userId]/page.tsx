// src/app/[userId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
    id: string;
    name: string | null;
    bio: string | null;
}

interface LinkData {
    id: number;
    title: string;
    url: string;
    icon: string | null;
    order: number;
    clicks: number;
}

export default function UserPage({ params }: { params: { userId: string } }) {
    const [user, setUser] = useState<User | null>(null);
    const [links, setLinks] = useState<LinkData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userId = params.userId;

    // Fetch user data and links
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/users/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUser(data.user);
            setLinks(data.links);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    // Handle link click - increment click count
    const handleLinkClick = async (linkId: number, url: string) => {
        try {
            // Track click in the background
            await fetch(`/api/links/${linkId}/click`, {
                method: 'POST',
            });

            // ✅ Update the click count in the UI immediately
            setLinks((prevLinks) =>
                prevLinks.map((link) =>
                    link.id === linkId
                        ? { ...link, clicks: link.clicks + 1 }
                        : link
                )
            );
        } catch (error) {
            console.error('Error tracking click:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{error || 'User not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-2xl mx-auto px-4 py-12">
                {/* User Profile */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold">{user.name || 'User'}</h1>
                    {user.bio && (
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{user.bio}</p>
                    )}
                </div>

                {/* Links Grid */}
                <div className="space-y-3">
                    {links.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            No links yet.
                        </div>
                    ) : (
                        links.map((link) => (
                            <Link
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleLinkClick(link.id, link.url)}
                                className="block p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex items-center gap-3">
                                    {link.icon && (
                                        <span className="text-2xl">{link.icon}</span>
                                    )}
                                    <span className="font-medium">{link.title}</span>
                                    <span className="ml-auto text-sm text-gray-400 dark:text-gray-500">
                                        → {link.clicks || 0} clicks
                                    </span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
