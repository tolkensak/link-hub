// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';  // ✅ Use Inter instead of Geist
import './globals.css';  // ✅ Import the global CSS file

const inter = Inter({ subsets: ['latin'] });  // ✅ Use Inter

export const metadata: Metadata = {
  title: 'link-hub',
  description: 'Your personal link dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
