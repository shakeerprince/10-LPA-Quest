'use client';

import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function AIFloatingButton() {
    return (
        <Link href="/ai-mentor">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <div className="relative group">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />

                    {/* Button */}
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 cursor-pointer">
                        <Bot className="w-6 h-6 text-white" />

                        {/* Sparkle animation */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute -top-1 -right-1"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm text-white whitespace-nowrap">
                            Ask AI Mentor 🤖
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
