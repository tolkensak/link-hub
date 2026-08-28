// src/components/ClickableLink.tsx

'use client';

import Link from 'next/link';

interface ClickableLinkProps {
    id: number;
    title: string;
    url: string;
    icon: string | null;
    clicks: number;
}

export default function ClickableLink({ id, title, url, icon, clicks }: ClickableLinkProps) {
    const handleClick = async () => {
        try {
            await fetch(`/api/links/${id}/click`, {
                method: 'POST',
            });
        } catch (error) {
            console.error('Error tracking click:', error);
        }
    };

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="block p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
        >
            <div className="flex items-center gap-3">
                {icon && <span className="text-2xl">{icon}</span>}
                <span className="font-medium">{title}</span>
                <span className="ml-auto text-sm text-gray-400 dark:text-gray-500">
                    → {clicks || 0} clicks
                </span>
            </div>
        </Link>
    );
}
