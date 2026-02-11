'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, WalletCards, GraduationCap, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfile from './UserProfile';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/flashcards', label: 'Flashcards', icon: WalletCards },
    { href: '/test-mode', label: 'Test Mode', icon: GraduationCap },
    { href: '/grammar', label: 'Grammar Guide', icon: BookOpen },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    className="p-2 bg-white/80 backdrop-blur-md rounded-md shadow-sm border border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Container */}
            <motion.aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-zinc-900 text-zinc-50 transform md:translate-x-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:static md:block border-r border-zinc-800 shadow-xl`}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="mb-10 pl-2">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                            Norsk Lær
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1 font-medium">Master Norwegian</p>
                    </div>

                    <nav className="flex-1 space-y-2" role="navigation" aria-label="Main Navigation">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/');

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-zinc-800 text-white shadow-lg shadow-zinc-900/20'
                                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                                        }`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <Icon size={20} className={`transition-colors ${isActive ? 'text-blue-400' : 'group-hover:text-zinc-300'}`} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-zinc-800">
                        <UserProfile />
                    </div>
                </div>
            </motion.aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
}
