'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useGamification, getLevelTitle, calculateLevel, xpForNextLevel } from '@/store/useGamification';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, Star, Zap } from 'lucide-react';

export function LevelUpModal() {
    const { showLevelUpModal, newLevel, closeLevelUpModal, totalXP } = useGamification();
    const title = getLevelTitle(newLevel);
    const xpNeeded = xpForNextLevel(newLevel);
    const xpProgress = ((totalXP - xpForNextLevel(newLevel - 1)) / (xpNeeded - xpForNextLevel(newLevel - 1))) * 100;

    useEffect(() => {
        if (showLevelUpModal) {
            // Epic confetti burst
            const duration = 3000;
            const end = Date.now() + duration;

            const colors = ['#8B5CF6', '#06B6D4', '#F97316', '#EC4899', '#10B981'];

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors,
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();

            // Auto-close after 5 seconds
            const timer = setTimeout(() => {
                closeLevelUpModal();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showLevelUpModal, closeLevelUpModal]);

    return (
        <AnimatePresence>
            {showLevelUpModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={closeLevelUpModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
                        className="relative max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500 rounded-3xl blur-xl opacity-50 animate-pulse" />

                        {/* Card */}
                        <div className="relative glass-card rounded-3xl p-8 border border-purple-500/50 overflow-hidden">
                            {/* Background particles */}
                            <div className="absolute inset-0 overflow-hidden">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                                        initial={{
                                            x: Math.random() * 400,
                                            y: Math.random() * 400,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            y: [null, -100],
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: Math.random() * 2,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="relative text-center space-y-6">
                                {/* Header */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center justify-center gap-2 text-yellow-400"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    <span className="text-sm font-semibold uppercase tracking-wider">Level Up!</span>
                                    <Sparkles className="w-5 h-5" />
                                </motion.div>

                                {/* Level Number */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', bounce: 0.6, delay: 0.4 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-50" />
                                    </div>
                                    <div className="relative flex items-center justify-center">
                                        <Trophy className="w-16 h-16 text-yellow-400 absolute -translate-y-8" />
                                        <span className="text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                                            {newLevel}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Title */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="space-y-2"
                                >
                                    <p className="text-gray-400 text-sm">You are now a</p>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                                        {title}
                                    </h2>
                                </motion.div>

                                {/* XP Bar */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Zap className="w-3 h-3 text-purple-400" />
                                            {totalXP.toLocaleString()} XP
                                        </span>
                                        <span>Next: {xpNeeded.toLocaleString()} XP</span>
                                    </div>
                                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(xpProgress, 100)}%` }}
                                            transition={{ delay: 1, duration: 1 }}
                                        />
                                    </div>
                                </motion.div>

                                {/* Stars decoration */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="flex justify-center gap-4"
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                                        >
                                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Close hint */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                    className="text-xs text-gray-500"
                                >
                                    Click anywhere to continue
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
