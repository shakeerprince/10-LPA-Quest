'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function UserMenu() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    if (status === 'loading') {
        return (
            <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
        );
    }

    if (!session) {
        return (
            <Link
                href="/auth/signin"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium text-sm transition-all"
            >
                Sign In
            </Link>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-purple-500/30 hover:border-purple-500/50 transition-colors"
            >
                {session.user?.image ? (
                    <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-6 h-6 rounded-full"
                    />
                ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                            {session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || 'U'}
                        </span>
                    </div>
                )}
                <span className="text-sm font-medium text-white hidden sm:inline max-w-[100px] truncate">
                    {session.user?.name?.split(' ')[0] || 'User'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 py-2 glass-card rounded-xl border border-purple-500/20 shadow-xl"
                    >
                        {/* User Info Header */}
                        <div className="px-4 py-3 border-b border-gray-700/50">
                            <p className="text-sm font-medium text-white truncate">
                                {session.user?.name || 'User'}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {session.user?.email}
                            </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <User className="w-4 h-4" />
                                <span className="text-sm">Profile</span>
                            </Link>
                            <Link
                                href="/settings"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                                <span className="text-sm">Settings</span>
                            </Link>
                        </div>

                        {/* Sign Out */}
                        <div className="border-t border-gray-700/50 pt-2">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    signOut({ callbackUrl: '/auth/signin' });
                                }}
                                className="flex items-center gap-3 px-4 py-2 w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm">Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
