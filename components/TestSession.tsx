'use client';

import { useState, useEffect, useRef } from 'react';
import { Word } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface TestSessionProps {
    initialWords: Word[];
}

export default function TestSession({ initialWords }: TestSessionProps) {
    // State for the session
    const [availableWords, setAvailableWords] = useState<Word[]>(initialWords);
    const [currentBatch, setCurrentBatch] = useState<Word[]>([]);
    const [mistakes, setMistakes] = useState<Word[]>([]);

    // State for current card
    const [batchIndex, setBatchIndex] = useState(0);
    const [input, setInput] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const nextButtonRef = useRef<HTMLButtonElement>(null);

    // Initialize first batch on mount
    useEffect(() => {
        startNewBatch(initialWords, []);
    }, []);

    // Post-submission focus management
    useEffect(() => {
        if (feedback && nextButtonRef.current) {
            nextButtonRef.current.focus();
        } else if (!feedback && !showResult && inputRef.current) {
            inputRef.current.focus();
        }
    }, [feedback, showResult, batchIndex]);

    const startNewBatch = (pool: Word[], carryOverMistakes: Word[]) => {
        // Logic: Take mistakes first, then fill up to 10 with new words from pool
        const batchSize = 10;
        const needed = batchSize - carryOverMistakes.length;

        // Shuffle pool
        const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
        const newWords = shuffledPool.slice(0, needed);

        // Create new batch
        const nextBatch = [...carryOverMistakes, ...newWords];

        // Update state
        setCurrentBatch(nextBatch);
        setAvailableWords(pool.filter(w => !newWords.includes(w)));
        setMistakes([]);
        setBatchIndex(0);
        setScore(0);
        setShowResult(false);
        setFeedback(null);
        setInput('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || feedback) return;

        const currentWord = currentBatch[batchIndex];
        // Simple normalization: lowercase, trim
        const isCorrect = input.toLowerCase().trim() === currentWord.norwegian.toLowerCase().trim();

        if (isCorrect) {
            setFeedback('correct');
            setScore(prev => prev + 1);
        } else {
            setFeedback('incorrect');
            setMistakes(prev => [...prev, currentWord]);
        }
    };

    const handleNext = () => {
        if (batchIndex < currentBatch.length - 1) {
            setBatchIndex(prev => prev + 1);
            setFeedback(null);
            setInput('');
        } else {
            setShowResult(true);
        }
    };

    if (currentBatch.length === 0) return <div className="p-8 text-center text-zinc-500">Loading learning session...</div>;

    if (showResult) {
        return (
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 text-center space-y-8 animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold text-zinc-900">Batch Complete!</h2>

                <div className="w-40 h-40 mx-auto rounded-full border-[12px] border-purple-100 flex items-center justify-center">
                    <span className="text-5xl font-black text-purple-600">{score}/{currentBatch.length}</span>
                </div>

                <div className="space-y-2">
                    <p className="text-zinc-600 text-lg">
                        {mistakes.length === 0
                            ? "Perfect score! Moving on to new words."
                            : `You have ${mistakes.length} words to review in the next batch.`}
                    </p>
                </div>

                <button
                    onClick={() => startNewBatch(availableWords, mistakes)}
                    className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-all flex items-center justify-center shadow-lg shadow-purple-200"
                >
                    Continue <ArrowRight size={20} className="ml-2" />
                </button>
            </div>
        );
    }

    const currentWord = currentBatch[batchIndex];

    return (
        <div className="max-w-lg mx-auto">
            {/* Progress */}
            <div className="mb-6 flex justify-between items-center text-sm font-semibold text-zinc-400 uppercase tracking-wide">
                <span>Word {batchIndex + 1} of {currentBatch.length}</span>
                <span>Score: {score}</span>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 p-10 space-y-10 relative overflow-hidden">
                {/* Question */}
                <div className="text-center space-y-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Translate to Norwegian</span>
                    <h2 className="text-4xl font-extrabold text-zinc-900 text-balance tracking-tight">{currentWord.english}</h2>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative">
                        <label htmlFor="translation-input" className="sr-only">Norwegian translation</label>
                        <input
                            id="translation-input"
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={feedback !== null}
                            className={`w-full p-5 text-center text-2xl font-medium bg-zinc-50 border-2 rounded-2xl focus:outline-none transition-all placeholder:text-zinc-300 ${feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-800' :
                                    feedback === 'incorrect' ? 'border-red-500 bg-red-50 text-red-800' :
                                        'border-zinc-200 focus:border-purple-500 focus:bg-white text-zinc-900 shadow-inner'
                                }`}
                            placeholder="Type answer..."
                            autoComplete="off"
                            aria-invalid={feedback === 'incorrect'}
                            aria-describedby={feedback ? "feedback-message" : undefined}
                        />

                        {/* Feedback Icon */}
                        <AnimatePresence>
                            {feedback && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
                                >
                                    {feedback === 'correct' ? (
                                        <CheckCircle className="text-green-600 drop-shadow-sm" size={28} />
                                    ) : (
                                        <XCircle className="text-red-600 drop-shadow-sm" size={28} />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Feedback Message & Action */}
                    <div className="h-24">
                        {feedback && (
                            <motion.div
                                id="feedback-message"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center space-y-5"
                                role="alert"
                            >
                                {feedback === 'incorrect' && (
                                    <div className="text-red-600 font-medium text-lg">
                                        Correct answer: <span className="font-bold">{currentWord.norwegian}</span>
                                    </div>
                                )}
                                {feedback === 'correct' && (
                                    <div className="text-green-600 font-bold text-lg">
                                        Correct! Well done.
                                    </div>
                                )}

                                <button
                                    type="button"
                                    ref={nextButtonRef}
                                    onClick={handleNext}
                                    className={`px-10 py-3.5 rounded-xl font-bold text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:ring-4 ${feedback === 'correct'
                                            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-200'
                                            : 'bg-red-600 hover:bg-red-700 focus:ring-red-200'
                                        }`}
                                >
                                    Next Word
                                </button>
                            </motion.div>
                        )}
                        {!feedback && (
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold text-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md focus:ring-4 focus:ring-zinc-200"
                            >
                                Check Answer
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
