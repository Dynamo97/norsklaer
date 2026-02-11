import Link from 'next/link';
import { BookOpen, GraduationCap, WalletCards, ArrowRight } from 'lucide-react';

const features = [
    {
        title: 'Flashcards',
        description: 'Master vocabulary with interactive cards.',
        icon: WalletCards,
        href: '/flashcards',
        color: 'bg-blue-600',
        text: 'text-blue-600',
        accent: 'border-blue-100 hover:border-blue-200'
    },
    {
        title: 'Test Mode',
        description: 'Challenge yourself with spaced repetition quizzes.',
        icon: GraduationCap,
        href: '/test-mode',
        color: 'bg-purple-600',
        text: 'text-purple-600',
        accent: 'border-purple-100 hover:border-purple-200'
    },
    {
        title: 'Grammar Guide',
        description: 'Learn the rules and structure of Norwegian.',
        icon: BookOpen,
        href: '/grammar',
        color: 'bg-teal-600',
        text: 'text-teal-600',
        accent: 'border-teal-100 hover:border-teal-200'
    },
];

export default function Home() {
    return (
        <div className="space-y-16">
            <div className="text-center md:text-left space-y-6 max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 tracking-tight leading-none">
                    Velkommen til <span className="text-blue-600">Norsk Lær</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-2xl text-balance">
                    Your daily path to mastering the Norwegian language. Simple, effective, and beautiful.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <Link
                            key={feature.title}
                            href={feature.href}
                            className={`group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 border ${feature.accent} focus:outline-none focus:ring-4 focus:ring-zinc-100`}
                        >
                            <div className={`absolute -right-8 -top-8 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity transform rotate-12 scale-150`}>
                                <Icon size={180} className="text-zinc-900" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`w-14 h-14 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-zinc-200 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={28} />
                                </div>

                                <h2 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">
                                    {feature.title}
                                </h2>
                                <p className="text-zinc-500 mb-8 leading-relaxed font-medium">
                                    {feature.description}
                                </p>

                                <div className="mt-auto flex items-center text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                                    Start Learning <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="bg-zinc-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-zinc-900/20">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-800" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left space-y-2">
                        <h3 className="text-3xl font-bold tracking-tight">Daily Streak</h3>
                        <p className="text-zinc-400 font-medium">Consistency is key. Practice 10 minutes every day.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white/5 rounded-2xl p-6 min-w-[140px] backdrop-blur-sm border border-white/10">
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-400">
                            0
                        </div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-2">Days</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
