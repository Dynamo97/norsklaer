'use client';

import { useState, use, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { mockWords, Level, LEVELS } from '@/lib/data';
import { AnimatePresence, motion } from 'framer-motion';
import Flashcard from '@/components/Flashcard';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export default function FlashcardSession({ params }: { params: Promise<{ level: string }> }) {
    const { level } = use(params);
    const router = useRouter();

    if (!LEVELS.includes(level as Level)) {
        notFound();
    }

    const levelWords = mockWords.filter((w) => w.level === level);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isNorwegianFirst, setIsNorwegianFirst] = useState(true);

    if (levelWords.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-700">No cards found for this level.</h2>
                <Link href="/flashcards" className="text-blue-600 hover:underline mt-4 inline-block">
                    Go back
                </Link>
            </div>
        );
    }

    const currentWord = levelWords[currentIndex];
    const progress = ((currentIndex + 1) / levelWords.length) * 100;

    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        if (currentIndex < levelWords.length - 1) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                if (currentIndex < levelWords.length - 1) {
                    setIsFlipped(false);
                    setCurrentIndex(prev => prev + 1);
                }
            } else if (e.key === 'ArrowLeft') {
                if (currentIndex > 0) {
                    setIsFlipped(false);
                    setCurrentIndex(prev => prev - 1);
                }
            } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsFlipped(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, levelWords.length]);

    return (
        <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-8">
                <Link href="/flashcards" className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                    <X size={24} />
                </Link>

                <div className="flex items-center space-x-2 bg-white rounded-full p-1 border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setIsNorwegianFirst(true)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isNorwegianFirst ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        Norwegian First
                    </button>
                    <button
                        onClick={() => setIsNorwegianFirst(false)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!isNorwegianFirst ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        English First
                    </button>
                </div>

                <div className="text-sm font-medium text-slate-500 w-10 text-right">
                    {currentIndex + 1} / {levelWords.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full mb-12 overflow-hidden">
                <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Flashcard Area */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentWord.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="w-full flex justify-center"
                    >
                        <Flashcard
                            word={currentWord}
                            isNorwegianFirst={isNorwegianFirst}
                            isFlipped={isFlipped}
                            onFlip={() => setIsFlipped(!isFlipped)}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center space-x-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`p-4 rounded-full border border-slate-200 transition-all ${currentIndex === 0
                            ? 'opacity-50 cursor-not-allowed bg-slate-50 text-slate-300'
                            : 'hover:bg-white hover:shadow-lg hover:-translate-y-1 text-slate-600 bg-white'
                            }`}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <span className="text-sm text-slate-400 font-medium">
                        Use arrow keys or click
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex === levelWords.length - 1}
                        className={`p-4 rounded-full border border-slate-200 transition-all ${currentIndex === levelWords.length - 1
                            ? 'opacity-50 cursor-not-allowed bg-slate-50 text-slate-300'
                            : 'hover:bg-white hover:shadow-lg hover:-translate-y-1 text-slate-600 bg-white'
                            }`}
                    >
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
