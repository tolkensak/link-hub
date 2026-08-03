
// // src/app/page.tsx

// import { redirect } from 'next/navigation';

// export default function HomePage() {
//     // Redirect to the default user page
//     // We'll make this dynamic later
//     redirect('/your-username');
// }

// src/app/page.tsx

import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-4">🌐 link-hub</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Your personal link dashboard
            </p>
            <Link
                href="/auth/signin"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
                Get Started
            </Link>
        </div>
    );
}
