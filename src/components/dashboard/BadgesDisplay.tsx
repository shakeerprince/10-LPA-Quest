'use client';

import { motion } from 'framer-motion';
import { useGamification, ALL_BADGES } from '@/store/useGamification';
import { Lock } from 'lucide-react';

export function BadgesDisplay() {
    const { unlockedBadges } = useGamification();

    return (
        <div className="glass-card rounded-2xl p-6 border border-yellow-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                🏆 Achievements
                <span className="text-xs text-gray-400 font-normal">
                    ({unlockedBadges.length}/{ALL_BADGES.length} unlocked)
                </span>
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {ALL_BADGES.map((badge, index) => {
                    const isUnlocked = unlockedBadges.includes(badge.id);

                    return (
                        <motion.div
                            key={badge.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className={`relative p-3 rounded-xl text-center transition-all duration-300 ${isUnlocked
                                    ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30'
                                    : 'bg-gray-800/30 border border-gray-700/30 opacity-50'
                                }`}
                            title={`${badge.name}: ${badge.description}`}
                        >
                            <div className="text-3xl mb-1">
                                {isUnlocked ? badge.icon : <Lock className="w-6 h-6 mx-auto text-gray-600" />}
                            </div>
                            <div className={`text-xs font-medium truncate ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                {badge.name}
                            </div>
                            {isUnlocked && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                                >
                                    <span className="text-[10px]">✓</span>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {unlockedBadges.length === 0 && (
                <div className="text-center py-4 text-gray-400 text-sm">
                    Complete tasks to unlock your first badge! 🎯
                </div>
            )}
        </div>
    );
}
