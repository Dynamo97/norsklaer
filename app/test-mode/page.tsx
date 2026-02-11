import Link from 'next/link';
import { Target } from 'lucide-react';
import { LEVELS } from '@/lib/data';

export default function TestModePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">Test Your Knowledge</h1>
                <p className="text-slate-600">Select a level to begin a spaced repetition test session.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LEVELS.map((level) => (
                    <Link
                        key={level}
                        href={`/test-mode/${level}`}
                        className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-purple-200 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="text-8xl font-black text-purple-900 leading-none -mt-4 -mr-4">{level}</span>
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-2xl shadow-inner">
                                {level}
                            </div>

                            <div className="space-y-1">
                                <h2 className="font-bold text-slate-900 text-lg">Level {level}</h2>
                                <p className="text-sm text-slate-500">
                                    {level === 'A1' ? 'Beginner' :
                                        level === 'A2' ? 'Elementary' :
                                            level === 'B1' ? 'Intermediate' :
                                                level === 'B2' ? 'Upper Intermediate' : 'Advanced'}
                                </p>
                            </div>

                            <div className="pt-4">
                                <span className="inline-flex items-center text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                    Start Test <Target size={16} className="ml-2" />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
