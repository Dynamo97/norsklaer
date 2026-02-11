'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { mockWords, Level, LEVELS } from '@/lib/data';
import TestSession from '@/components/TestSession';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TestPage({ params }: { params: Promise<{ level: string }> }) {
    const { level } = use(params);

    if (!LEVELS.includes(level as Level)) {
        notFound();
    }

    const initialWords = mockWords.filter((w) => w.level === level);

    if (initialWords.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-700">No words found for this level.</h2>
                <Link href="/test-mode" className="text-purple-600 hover:underline mt-4 inline-block">
                    Go back
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col">
            <div className="mb-8">
                <Link href="/test-mode" className="inline-flex items-center text-slate-500 hover:text-purple-600 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Levels
                </Link>
            </div>

            <TestSession initialWords={initialWords} />
        </div>
    );
}
