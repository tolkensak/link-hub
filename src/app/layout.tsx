// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ Use Inter instead of Geist
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "link-hub",
    description: "Your personal link dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.variable,
                )}
            >
                {children}
            </body>
        </html>
    );
}
