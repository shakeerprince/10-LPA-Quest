'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDailyQuote } from '@/data/roadmap';
import { Quote } from 'lucide-react';

export function DailyQuote() {
    const [quoteData, setQuoteData] = useState<{ quote: string; author: string } | null>(null);

    useEffect(() => {
        setQuoteData(getDailyQuote());
    }, []);

    if (!quoteData) return null;

    const { quote, author } = quoteData;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 border border-cyan-500/20 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 text-[120px] text-cyan-500/5 font-serif leading-none pointer-events-none">
                &ldquo;
            </div>

            <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/10 shrink-0">
                    <Quote className="w-5 h-5 text-cyan-400" />
                </div>

                <div className="relative z-10">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-200 italic leading-relaxed"
                    >
                        &ldquo;{quote}&rdquo;
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-cyan-400 mt-3 font-medium"
                    >
                        — {author}
                    </motion.p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-cyan-500/10">
                <p className="text-xs text-gray-500">
                    💡 Daily motivation to keep you going. New quote every day!
                </p>
            </div>
        </motion.div>
    );
}
