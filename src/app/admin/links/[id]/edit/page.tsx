// src/app/admin/links/[id]/edit/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface LinkData {
    id: number;
    title: string;
    url: string;
    icon: string | null;
    order: number;
}

export default function EditLinkPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<LinkData>({
        id: 0,
        title: '',
        url: '',
        icon: '',
        order: 0,
    });

    // Fetch existing link data
    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await fetch(`/api/links/${id}`);
                if (!response.ok) throw new Error('Failed to fetch link');
                const data = await response.json();
                setFormData(data.link);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load link');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLink();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            const response = await fetch(`/api/links/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update link');
            }

            router.push('/admin');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error && !formData.title) {
        return (
            <div className="text-center py-8 text-red-600">
                <p>Error: {error}</p>
                <Link href="/admin" className="text-blue-600 hover:underline mt-4 block">
                    ← Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/admin" className="text-blue-600 hover:underline">
                    ← Back to Dashboard
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-6">Edit Link</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="url" className="block text-sm font-medium mb-1">
                        URL *
                    </label>
                    <input
                        id="url"
                        type="url"
                        required
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="icon" className="block text-sm font-medium mb-1">
                        Icon (optional)
                    </label>
                    <input
                        id="icon"
                        type="text"
                        value={formData.icon || ''}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="🔗"
                    />
                </div>

                <div>
                    <label htmlFor="order" className="block text-sm font-medium mb-1">
                        Display Order
                    </label>
                    <input
                        id="order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <Link
                        href="/admin"
                        className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-center"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
