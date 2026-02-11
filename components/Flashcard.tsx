'use client';

import { motion } from 'framer-motion';
import { Word } from '@/lib/data';
import { RotateCw, Volume2 } from 'lucide-react';

interface FlashcardProps {
    word: Word;
    isNorwegianFirst: boolean;
    isFlipped: boolean;
    onFlip: () => void;
    onNext?: () => void;
}

export default function Flashcard({ word, isNorwegianFirst, isFlipped, onFlip }: FlashcardProps) {
    const frontText = isNorwegianFirst ? word.norwegian : word.english;
    const backText = isNorwegianFirst ? word.english : word.norwegian;
    const frontLabel = isNorwegianFirst ? 'Norwegian' : 'English';
    const backLabel = isNorwegianFirst ? 'English' : 'Norwegian';

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onFlip();
        }
    };

    return (
        <div className="w-full max-w-xl aspect-[4/3] relative perspective-1000 group">
            <motion.button
                onClick={onFlip}
                onKeyDown={handleKeyDown}
                className="w-full h-full relative preserve-3d transition-transform duration-500 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 rounded-3xl"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.15, type: "tween", ease: "easeInOut" }}
                style={{ transformStyle: 'preserve-3d' }}
                aria-label={`Flashcard: ${frontText}. Press to flip to see translation.`}
                aria-pressed={isFlipped}
            >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-lg border border-zinc-200 flex flex-col items-center justify-center p-10">
                    <div className="absolute top-8 left-8 text-xs font-bold text-zinc-400 uppercase tracking-widest">{frontLabel}</div>
                    <div className="absolute top-8 right-8 text-zinc-300 group-hover:text-blue-500 transition-colors">
                        <RotateCw size={24} />
                    </div>

                    <h2 className="text-5xl font-bold text-zinc-900 text-center text-balance leading-tight">{frontText}</h2>

                    <div className="absolute bottom-8 text-sm text-zinc-500 font-medium bg-zinc-100 px-4 py-1.5 rounded-full border border-zinc-200">
                        {word.category}
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl flex flex-col items-center justify-center p-10 text-white"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="absolute top-8 left-8 text-xs font-bold text-blue-200 uppercase tracking-widest">{backLabel}</div>

                    <h2 className="text-5xl font-bold text-white text-center text-balance leading-tight">{backText}</h2>

                    <div className="absolute bottom-8 flex gap-4">
                        <div
                            className="p-3 bg-white/20 rounded-full transition-colors"
                            aria-hidden="true"
                        >
                            <Volume2 size={24} />
                        </div>
                    </div>
                </div>
            </motion.button>

            <p className="sr-only">Click or press Space to flip card.</p>
        </div>
    );
}
