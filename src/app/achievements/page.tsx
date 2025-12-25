'use client';

import { motion } from 'framer-motion';
import { useGamification, ALL_BADGES, type Badge } from '@/store/useGamification';
import { Trophy, Lock, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';

const rarityConfig = {
    common: { label: 'Common', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-500/30', glow: '' },
    rare: { label: 'Rare', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
    epic: { label: 'Epic', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-500/30', glow: 'shadow-purple-500/30' },
    legendary: { label: 'Legendary', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-500/30', glow: 'shadow-yellow-500/40' },
};

function BadgeCard({ badge, isUnlocked }: { badge: Badge; isUnlocked: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const rarity = rarityConfig[badge.rarity];

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative p-6 rounded-2xl border transition-all duration-300 ${isUnlocked
                    ? `glass-card ${rarity.border} ${rarity.glow} shadow-lg`
                    : 'bg-gray-900/50 border-gray-800/50'
                }`}
        >
            {/* Rarity indicator */}
            <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium ${rarity.bg} ${rarity.color}`}>
                {rarity.label}
            </div>

            {/* Badge icon */}
            <div className="relative mb-4">
                {isUnlocked ? (
                    <motion.div
                        animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-5xl"
                    >
                        {badge.icon}
                    </motion.div>
                ) : (
                    <div className="relative">
                        <span className="text-5xl opacity-20 grayscale">{badge.icon}</span>
                        <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-gray-600" />
                    </div>
                )}
            </div>

            {/* Badge info */}
            <h3 className={`font-bold text-lg mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                {badge.name}
            </h3>
            <p className={`text-sm mb-2 ${isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                {badge.description}
            </p>
            <p className={`text-xs ${isUnlocked ? rarity.color : 'text-gray-700'}`}>
                {badge.condition}
            </p>

            {/* Unlock sparkle effect */}
            {isUnlocked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                            animate={{
                                x: [Math.random() * 200, Math.random() * 200],
                                y: [Math.random() * 200, Math.random() * 200],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}

export default function AchievementsPage() {
    const { unlockedBadges } = useGamification();
    const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
    const [rarityFilter, setRarityFilter] = useState<string>('all');

    const filteredBadges = ALL_BADGES.filter((badge) => {
        const isUnlocked = unlockedBadges.includes(badge.id);

        if (filter === 'unlocked' && !isUnlocked) return false;
        if (filter === 'locked' && isUnlocked) return false;
        if (rarityFilter !== 'all' && badge.rarity !== rarityFilter) return false;

        return true;
    });

    const stats = {
        total: ALL_BADGES.length,
        unlocked: unlockedBadges.length,
        common: ALL_BADGES.filter(b => b.rarity === 'common' && unlockedBadges.includes(b.id)).length,
        rare: ALL_BADGES.filter(b => b.rarity === 'rare' && unlockedBadges.includes(b.id)).length,
        epic: ALL_BADGES.filter(b => b.rarity === 'epic' && unlockedBadges.includes(b.id)).length,
        legendary: ALL_BADGES.filter(b => b.rarity === 'legendary' && unlockedBadges.includes(b.id)).length,
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                            🏆 Trophy Room
                        </span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Your collection of achievements. Complete challenges to unlock legendary badges!
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-6 border border-purple-500/20"
                >
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                                <span className="text-3xl font-bold text-white">{stats.unlocked}/{stats.total}</span>
                            </div>
                            <p className="text-sm text-gray-400">Badges Unlocked</p>
                        </div>
                        <div className="h-12 w-px bg-gray-700 hidden sm:block" />
                        <div className="flex gap-6">
                            {(['common', 'rare', 'epic', 'legendary'] as const).map((rarity) => (
                                <div key={rarity} className="text-center">
                                    <div className={`text-2xl font-bold ${rarityConfig[rarity].color}`}>
                                        {stats[rarity]}
                                    </div>
                                    <p className="text-xs text-gray-500 capitalize">{rarity}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6">
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(stats.unlocked / stats.total) * 100}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                        <p className="text-center text-sm text-gray-400 mt-2">
                            {Math.round((stats.unlocked / stats.total) * 100)}% Complete
                        </p>
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex gap-2">
                        {(['all', 'unlocked', 'locked'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                        : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {['all', 'common', 'rare', 'epic', 'legendary'].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRarityFilter(r)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${rarityFilter === r
                                        ? r === 'all'
                                            ? 'bg-white/10 text-white'
                                            : `${rarityConfig[r as keyof typeof rarityConfig].bg} ${rarityConfig[r as keyof typeof rarityConfig].color}`
                                        : 'bg-gray-800/30 text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Badges Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredBadges.map((badge, index) => (
                        <motion.div
                            key={badge.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <BadgeCard
                                badge={badge}
                                isUnlocked={unlockedBadges.includes(badge.id)}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredBadges.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No badges match your filters</p>
                    </motion.div>
                )}

                {/* Motivation section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-8 border border-yellow-500/20 text-center"
                >
                    <div className="flex justify-center gap-2 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Keep Going!</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Every badge you unlock brings you closer to your 10 LPA goal.
                        Stay consistent and the legendary badges will be yours!
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
