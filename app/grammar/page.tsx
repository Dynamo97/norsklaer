'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, BookOpen, ArrowLeft, GraduationCap, LayoutList } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
// Import the JSON data directly. Next.js handles reading JSON files.
import grammarData from '@/app/data/grammar.json';

// Define types for our data
type GrammarTopic = {
    level: string;
    category: string;
    topic: string;
    id: string;
    shortDescription: string;
    fullContent: string;
};

// Get unique levels and categories
const ALL_TOPICS = grammarData as GrammarTopic[];
const LEVELS = Array.from(new Set(ALL_TOPICS.map(t => t.level)));

// Group topics by level and category for easier navigation
const TOPICS_BY_LEVEL = ALL_TOPICS.reduce((acc, topic) => {
    if (!acc[topic.level]) acc[topic.level] = {};
    if (!acc[topic.level][topic.category]) acc[topic.level][topic.category] = [];
    acc[topic.level][topic.category].push(topic);
    return acc;
}, {} as Record<string, Record<string, GrammarTopic[]>>);

export default function GrammarPage() {
    // Navigation State: null means at top level
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);

    // Reset helpers
    const resetToLevels = () => {
        setSelectedLevel(null);
        setSelectedCategory(null);
        setSelectedTopic(null);
    };
    const resetToCategories = () => {
        setSelectedCategory(null);
        setSelectedTopic(null);
    };
    const resetToTopics = () => {
        setSelectedTopic(null);
    };

    return (
        <div className="max-w-4xl mx-auto min-h-[80vh]">

            {/* Header / Breadcrumbs */}
            <div className="mb-8 flex items-center space-x-2 text-sm text-zinc-500 overflow-x-auto whitespace-nowrap pb-2">
                <button onClick={resetToLevels} className={`hover:text-teal-600 transition-colors ${!selectedLevel ? 'font-bold text-zinc-900' : ''}`}>
                    Grammar Guide
                </button>
                {selectedLevel && (
                    <>
                        <ChevronRight size={14} />
                        <button onClick={resetToCategories} className={`hover:text-teal-600 transition-colors ${!selectedCategory ? 'font-bold text-zinc-900' : ''}`}>
                            Level {selectedLevel}
                        </button>
                    </>
                )}
                {selectedCategory && (
                    <>
                        <ChevronRight size={14} />
                        <button onClick={resetToTopics} className={`hover:text-teal-600 transition-colors ${!selectedTopic ? 'font-bold text-zinc-900' : ''}`}>
                            {selectedCategory}
                        </button>
                    </>
                )}
                {selectedTopic && (
                    <>
                        <ChevronRight size={14} />
                        <span className="font-bold text-zinc-900 truncate max-w-[150px]">
                            {selectedTopic.topic}
                        </span>
                    </>
                )}
            </div>

            <AnimatePresence mode="wait">

                {/* VIEW 1: SELECT LEVEL */}
                {!selectedLevel && (
                    <motion.div
                        key="levels"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {LEVELS.map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-teal-200 hover:-translate-y-1 transition-all duration-300 group text-left"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                                    {level}
                                </div>
                                <h2 className="text-2xl font-bold text-zinc-900 mb-2">Level {level}</h2>
                                <p className="text-zinc-500">
                                    {Object.keys(TOPICS_BY_LEVEL[level] || {}).length} Categories
                                </p>
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* VIEW 2: SELECT CATEGORY */}
                {selectedLevel && !selectedCategory && (
                    <motion.div
                        key="categories"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold text-zinc-900">Select a Category</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(TOPICS_BY_LEVEL[selectedLevel] || {}).map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex items-center justify-between group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 bg-zinc-50 rounded-xl text-zinc-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                                            <LayoutList size={24} />
                                        </div>
                                        <span className="text-lg font-bold text-zinc-900">{category}</span>
                                    </div>
                                    <ChevronRight className="text-zinc-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* VIEW 3: SELECT TOPIC */}
                {selectedLevel && selectedCategory && !selectedTopic && (
                    <motion.div
                        key="topics"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-zinc-900">{selectedCategory} Topics</h2>

                        <div className="space-y-4">
                            {TOPICS_BY_LEVEL[selectedLevel][selectedCategory].map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => setSelectedTopic(topic)}
                                    className="w-full bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all text-left group"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-teal-700 transition-colors">
                                                {topic.topic}
                                            </h3>
                                            <p className="text-zinc-600 leading-relaxed">
                                                {topic.shortDescription}
                                            </p>
                                        </div>
                                        <div className="mt-1 ml-4 p-2 bg-zinc-50 rounded-full group-hover:bg-teal-50 text-zinc-400 group-hover:text-teal-600 transition-colors">
                                            <BookOpen size={20} />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* VIEW 4: FULL CONTENT */}
                {selectedTopic && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden"
                    >
                        <div className="bg-zinc-50 border-b border-zinc-100 p-6 flex items-center justify-between">
                            <button
                                onClick={resetToTopics}
                                className="flex items-center text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                            >
                                <ArrowLeft size={16} className="mr-2" />
                                Back to {selectedCategory}
                            </button>
                            <div className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                                Level {selectedTopic.level}
                            </div>
                        </div>

                        <div className="p-8 md:p-12 prose prose-zinc prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-teal-600 hover:prose-a:text-teal-500">
                            <ReactMarkdown
                                components={{
                                    // Headings
                                    h1: ({ node, ...props }) => <h1 className="text-3xl font-extrabold text-zinc-900 mb-6 mt-2" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-zinc-900 mb-4 mt-10 pb-2 border-b border-zinc-100" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-zinc-800 mb-3 mt-8" {...props} />,

                                    // Text
                                    p: ({ node, ...props }) => <p className="text-zinc-600 leading-relaxed mb-6" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-zinc-900" {...props} />,
                                    em: ({ node, ...props }) => <em className="italic text-zinc-800" {...props} />,

                                    // Lists
                                    ul: ({ node, ...props }) => <ul className="space-y-2 mb-6 list-disc list-outside ml-5 text-zinc-600" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="space-y-2 mb-6 list-decimal list-outside ml-5 text-zinc-600" {...props} />,
                                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,

                                    // Blockquotes (Pro Tips)
                                    blockquote: ({ node, children, ...props }) => (
                                        <blockquote className="my-8 pl-6 border-l-4 border-teal-500 bg-teal-50/50 p-6 rounded-r-2xl not-italic" {...props}>
                                            <div className="flex items-center mb-2 text-teal-700 font-bold text-sm uppercase tracking-wider">
                                                <GraduationCap size={18} className="mr-2" />
                                                Pro Tip
                                            </div>
                                            <div className="text-zinc-700 italic">
                                                {children}
                                            </div>
                                        </blockquote>
                                    ),

                                    // Code
                                    code: ({ node, ...props }) => {
                                        // Start of workaround to avoid type errors with inline prop
                                        const { inline } = props as any;
                                        // End workaround

                                        return inline ? (
                                            <code className="bg-zinc-100 text-teal-700 px-1.5 py-0.5 rounded-md font-mono text-sm border border-zinc-200 font-medium" {...props} />
                                        ) : (
                                            <div className="overflow-x-auto my-8 rounded-xl border border-zinc-200 bg-zinc-50">
                                                <pre className="p-6 text-sm text-zinc-700 font-mono leading-relaxed">
                                                    <code {...props} />
                                                </pre>
                                            </div>
                                        );
                                    },

                                    // Tables
                                    table: ({ node, ...props }) => (
                                        <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm my-8">
                                            <table className="w-full text-left border-collapse" {...props} />
                                        </div>
                                    ),
                                    thead: ({ node, ...props }) => <thead className="bg-teal-50 text-teal-900 border-b border-teal-100/50" {...props} />,
                                    tbody: ({ node, ...props }) => <tbody className="bg-white" {...props} />,
                                    tr: ({ node, ...props }) => <tr className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors" {...props} />,
                                    th: ({ node, ...props }) => <th className="px-6 py-4 font-bold text-sm uppercase tracking-wider whitespace-nowrap" {...props} />,
                                    td: ({ node, ...props }) => <td className="px-6 py-4 text-zinc-600 whitespace-nowrap" {...props} />,

                                    // Links
                                    a: ({ node, ...props }) => <a className="text-teal-600 font-medium hover:text-teal-700 hover:underline decoration-2 underline-offset-2 transition-all" {...props} />,

                                    // HR
                                    hr: ({ node, ...props }) => <hr className="my-10 border-zinc-100" {...props} />,
                                }}
                            >
                                {selectedTopic.fullContent}
                            </ReactMarkdown>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
