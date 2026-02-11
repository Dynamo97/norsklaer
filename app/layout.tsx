import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Norsk Lær',
    description: 'Master the Norwegian language',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-50 text-slate-900`}>
                <SessionProvider>
                    <div className="flex min-h-screen">
                        <Sidebar />
                        <main id="main-content" className="flex-1 p-6 md:p-12 overflow-y-auto pt-20 md:pt-12 transition-all duration-300">
                            <div className="max-w-6xl mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
