// src/app/[userId]/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LinkData {
    id: number;
    title: string;
    url: string;
    icon: string | null;
    order: number;
}

export default function UserPage({ params }: { params: { userId: string } }) {
    const router = useRouter();

    useEffect(() => {
        // You can't use params directly in a Client Component without use()
        // We'll handle the data fetching differently
    }, []);

    // We need to fetch the data on the client side or use a Server Component wrapper

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold">User Profile</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Loading links...
                    </p>
                </div>
            </div>
        </div>
    );
}
