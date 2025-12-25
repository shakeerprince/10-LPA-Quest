'use client';

import { motion } from 'framer-motion';
import { useGamification } from '@/store/useGamification';

export function FlameStreak() {
    const { currentStreak, longestStreak } = useGamification();

    // Flame size based on streak
    const getFlameSize = () => {
        if (currentStreak >= 30) return 'text-8xl';
        if (currentStreak >= 14) return 'text-7xl';
        if (currentStreak >= 7) return 'text-6xl';
        if (currentStreak >= 3) return 'text-5xl';
        return 'text-4xl';
    };

    // Flame color intensity
    const getFlameGlow = () => {
        if (currentStreak >= 30) return 'drop-shadow-[0_0_30px_rgba(249,115,22,0.8)]';
        if (currentStreak >= 14) return 'drop-shadow-[0_0_25px_rgba(249,115,22,0.7)]';
        if (currentStreak >= 7) return 'drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]';
        if (currentStreak >= 3) return 'drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]';
        return 'drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]';
    };

    return (
        <div className="glass-card rounded-2xl p-6 border border-orange-500/30 text-center">
            <div className="flex flex-col items-center gap-4">
                <motion.div
                    className={`${getFlameSize()} ${getFlameGlow()} ${currentStreak > 0 ? 'flame-animate' : ''}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                >
                    {currentStreak > 0 ? '🔥' : '❄️'}
                </motion.div>

                <div>
                    <motion.div
                        className="text-4xl font-bold text-orange-400"
                        key={currentStreak}
                        initial={{ scale: 1.5, color: '#fb923c' }}
                        animate={{ scale: 1, color: '#fb923c' }}
                        transition={{ type: 'spring' }}
                    >
                        {currentStreak}
                    </motion.div>
                    <div className="text-gray-400 text-sm">Day Streak</div>
                </div>

                {longestStreak > 0 && (
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span>🏆 Best:</span>
                        <span className="text-orange-400 font-medium">{longestStreak} days</span>
                    </div>
                )}

                {currentStreak === 0 && (
                    <p className="text-sm text-gray-400">
                        Complete a task to start your streak!
                    </p>
                )}

                {currentStreak >= 7 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-orange-300 bg-orange-500/10 px-3 py-1 rounded-full"
                    >
                        🎉 You&apos;re on fire!
                    </motion.div>
                )}
            </div>
        </div>
    );
}
