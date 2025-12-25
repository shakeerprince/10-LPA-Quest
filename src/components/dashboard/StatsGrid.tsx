'use client';

import { motion } from 'framer-motion';
import { Trophy, Zap, Clock, Target } from 'lucide-react';
import { useGamification, calculateLevel, xpForNextLevel, getLevelTitle } from '@/store/useGamification';
import { ROADMAP, calculateRoadmapStats } from '@/data/roadmap';

export function StatsGrid() {
    const { totalXP, hoursStudiedToday, completedTopics, updateHoursStudied } = useGamification();
    const level = calculateLevel(totalXP);
    const title = getLevelTitle(level);
    const nextLevelXP = xpForNextLevel(level);
    const currentLevelXP = xpForNextLevel(level - 1);
    const progressToNextLevel = ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

    const stats = calculateRoadmapStats(completedTopics);

    const statCards = [
        {
            icon: Trophy,
            label: 'Current Level',
            value: `Lv. ${level}`,
            subValue: title,
            color: 'from-yellow-400 to-orange-500',
            borderColor: 'border-yellow-500/30',
            progress: progressToNextLevel,
            progressLabel: `${totalXP} / ${nextLevelXP} XP`,
        },
        {
            icon: Zap,
            label: 'Total XP',
            value: totalXP.toLocaleString(),
            subValue: 'Experience Points',
            color: 'from-purple-400 to-pink-500',
            borderColor: 'border-purple-500/30',
        },
        {
            icon: Target,
            label: 'Topics Completed',
            value: `${stats.completedTopics}/${stats.totalTopics}`,
            subValue: `${stats.progressPercent}% Complete`,
            color: 'from-cyan-400 to-blue-500',
            borderColor: 'border-cyan-500/30',
            progress: stats.progressPercent,
        },
        {
            icon: Clock,
            label: 'Hours Today',
            value: hoursStudiedToday.toString(),
            subValue: 'Study Hours',
            color: 'from-green-400 to-emerald-500',
            borderColor: 'border-green-500/30',
            isInput: true,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => {
                const Icon = stat.icon;

                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`glass-card rounded-xl p-4 ${stat.borderColor} border glass-card-hover transition-all duration-300`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xs text-gray-400">{stat.label}</span>
                        </div>

                        {stat.isInput ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="0"
                                    max="24"
                                    step="0.5"
                                    value={hoursStudiedToday}
                                    onChange={(e) => updateHoursStudied(parseFloat(e.target.value) || 0)}
                                    className="text-2xl font-bold bg-transparent border-b border-green-500/30 focus:border-green-500 outline-none w-16 text-center"
                                />
                                <span className="text-gray-400 text-sm">hrs</span>
                            </div>
                        ) : (
                            <motion.div
                                className="text-2xl font-bold"
                                key={stat.value}
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                            >
                                <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </span>
                            </motion.div>
                        )}

                        <div className="text-xs text-gray-400 mt-1">{stat.subValue}</div>

                        {stat.progress !== undefined && (
                            <div className="mt-3">
                                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${stat.color} progress-glow`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(stat.progress, 100)}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                    />
                                </div>
                                {stat.progressLabel && (
                                    <div className="text-xs text-gray-500 mt-1">{stat.progressLabel}</div>
                                )}
                            </div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
