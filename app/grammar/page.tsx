'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';
import { LEVELS } from '@/lib/data';

const GRAMMAR_TOPICS = {
    'A1': [
        { title: 'Introduction to Nouns', content: 'Nouns in Norwegian have three genders: masculine (en), feminine (ei), and neuter (et). Memorizing the gender is crucial for correct grammar.' },
        { title: 'Present Tense Verbs', content: 'Most verbs in the present tense end with an -r. For example, å spise (to eat) becomes spiser (eating).' },
        { title: 'Personal Pronouns', content: 'Jeg (I), du (you), han (he), hun (she), vi (we), dere (you plural), de (they).' }
    ],
    'A2': [
        { title: 'Past Tense', content: 'Learn regular and irregular past tense forms. Example: spiste (ate), gikk (went).' },
        { title: 'Adportives vs. Prepositions', content: 'Understanding location vs. motion (her/hit, der/dit).' }
    ],
    'B1': [
        { title: 'Word Order (V2 Rule)', content: 'The verb is always the second element in a main clause. Example: I dag spiser jeg (Today eat I).' },
        { title: 'Passive Voice', content: 'Using -s ending or bli + participle.' }
    ],
    'B2': [
        { title: 'Advanced Subordinate Clauses', content: 'Complex sentence structures and conjunctions.' },
        { title: 'Idiomatic Expressions', content: 'Common phrases used in daily life that do not translate literally.' }
    ],
    'C1+': [
        { title: 'Academic Writing', content: 'Formal language structure and vocabulary for essays and reports.' },
        { title: 'Dialects', content: 'Overview of major Norwegian dialects and their key differences.' }
    ]
};

export default function GrammarPage() {
    const [expandedLevel, setExpandedLevel] = useState<string | null>('A1');

    return (
        <div className="max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Grammar Guide</h1>
                <p className="text-xl text-zinc-500 max-w-2xl mx-auto">A comprehensive reference for Norwegian grammar rules by level.</p>
            </div>

            <div className="space-y-4">
                {LEVELS.map((level) => (
                    <div key={level} className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden group hover:border-zinc-300 transition-colors">
                        <button
                            onClick={() => setExpandedLevel(expandedLevel === level ? null : level)}
                            className="w-full flex items-center justify-between p-6 hover:bg-zinc-50 transition-colors focus:outline-none focus:ring-inset focus:ring-2 focus:ring-zinc-900"
                            aria-expanded={expandedLevel === level}
                            aria-controls={`content-${level}`}
                        >
                            <div className="flex items-center space-x-5">
                                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg border border-teal-100 shadow-sm">
                                    {level}
                                </div>
                                <h2 className="text-xl font-bold text-zinc-900">Level {level} Grammar</h2>
                            </div>
                            <ChevronDown
                                className={`text-zinc-400 transition-transform duration-300 ${expandedLevel === level ? 'rotate-180 text-zinc-900' : 'group-hover:text-zinc-600'}`}
                                size={24}
                            />
                        </button>

                        <AnimatePresence>
                            {expandedLevel === level && (
                                <motion.div
                                    id={`content-${level}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                >
                                    <div className="p-8 pt-0 border-t border-zinc-100 bg-zinc-50/50">
                                        <div className="space-y-6 mt-8">
                                            {GRAMMAR_TOPICS[level as keyof typeof GRAMMAR_TOPICS]?.map((topic, idx) => (
                                                <div key={idx} className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                                                    <h3 className="flex items-center text-lg font-bold text-zinc-900 mb-3">
                                                        <BookOpen size={20} className="mr-3 text-teal-600" />
                                                        {topic.title}
                                                    </h3>
                                                    <p className="text-zinc-600 leading-relaxed pl-8">
                                                        {topic.content}
                                                    </p>
                                                </div>
                                            ))}
                                            {(!GRAMMAR_TOPICS[level as keyof typeof GRAMMAR_TOPICS] || GRAMMAR_TOPICS[level as keyof typeof GRAMMAR_TOPICS].length === 0) && (
                                                <p className="text-zinc-400 italic text-center py-4">Content coming soon...</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
