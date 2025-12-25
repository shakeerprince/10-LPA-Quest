'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/store/useGamification';
import {
    BarChart3,
    TrendingUp,
    Calendar,
    Zap,
    Target,
    Clock,
    Flame,
    Trophy,
    CheckCircle
} from 'lucide-react';

// Simple chart components (no external dependencies needed)
function AreaChart({ data, height = 200 }: { data: { date: string; xp: number }[]; height?: number }) {
    if (data.length === 0) return null;

    const maxXP = Math.max(...data.map(d => d.xp), 1);
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1 || 1)) * 100,
        y: 100 - (d.xp / maxXP) * 100,
    }));

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L 100 100 L 0 100 Z`;

    return (
        <svg viewBox="0 0 100 100" className="w-full" style={{ height }} preserveAspectRatio="none">
            <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
            </defs>
            <motion.path
                d={areaD}
                fill="url(#areaGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />
            <motion.path
                d={pathD}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
            />
            {points.map((p, i) => (
                <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="1.5"
                    fill="#8B5CF6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                />
            ))}
        </svg>
    );
}

function ProgressRing({ value, max, color, size = 80 }: { value: number; max: number; color: string; size?: number }) {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    const circumference = 2 * Math.PI * 35;
    const strokeDashoffset = circumference * (1 - percentage / 100);

    return (
        <svg width={size} height={size} viewBox="0 0 80 80">
            <circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
            />
            <motion.circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 40 40)"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <text x="40" y="40" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold" fill="white">
                {Math.round(percentage)}%
            </text>
        </svg>
    );
}

function CategoryBar({ category, value, total, color }: { category: string; value: number; total: number; color: string }) {
    const percentage = total > 0 ? (value / total) * 100 : 0;

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">{category}</span>
                <span className="text-white">{value} XP</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </div>
        </div>
    );
}

export default function AnalyticsPage() {
    const {
        totalXP,
        studyHistory,
        completedTopics,
        currentStreak,
        longestStreak,
        pomodoroSessions,
        dailyQuests,
        unlockedBadges,
    } = useGamification();

    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

    // Calculate filtered data based on time range
    const filteredHistory = useMemo(() => {
        const now = new Date();
        const cutoff = new Date();

        if (timeRange === 'week') {
            cutoff.setDate(now.getDate() - 7);
        } else if (timeRange === 'month') {
            cutoff.setDate(now.getDate() - 30);
        } else {
            cutoff.setFullYear(2000); // All time
        }

        return studyHistory.filter(d => new Date(d.date) >= cutoff);
    }, [studyHistory, timeRange]);

    // XP over time data
    const xpOverTime = useMemo(() => {
        let cumulative = 0;
        return filteredHistory.map(day => {
            cumulative += day.xpEarned;
            return { date: day.date, xp: cumulative };
        });
    }, [filteredHistory]);

    // Stats calculations
    const stats = useMemo(() => {
        const totalStudyHours = filteredHistory.reduce((sum, d) => sum + d.hoursStudied, 0);
        const totalTasks = filteredHistory.reduce((sum, d) => sum + d.tasksCompleted, 0);
        const periodXP = filteredHistory.reduce((sum, d) => sum + d.xpEarned, 0);
        const avgDailyXP = filteredHistory.length > 0 ? Math.round(periodXP / filteredHistory.length) : 0;
        const completedPomodoros = pomodoroSessions.filter(s => s.completed).length;
        const completedQuests = dailyQuests.filter(q => q.completed).length;

        return {
            totalStudyHours,
            totalTasks,
            periodXP,
            avgDailyXP,
            completedPomodoros,
            completedQuests,
        };
    }, [filteredHistory, pomodoroSessions, dailyQuests]);

    // Category breakdown (dummy categories based on XP distribution)
    const categoryBreakdown = useMemo(() => {
        const categories = [
            { name: 'DSA', color: '#8B5CF6', percentage: 0.4 },
            { name: 'Development', color: '#06B6D4', percentage: 0.35 },
            { name: 'System Design', color: '#F97316', percentage: 0.15 },
            { name: 'Daily Quests', color: '#10B981', percentage: 0.1 },
        ];

        return categories.map(c => ({
            ...c,
            xp: Math.round(totalXP * c.percentage),
        }));
    }, [totalXP]);

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
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                            📊 Analytics Dashboard
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        Track your progress and identify areas for improvement
                    </p>
                </motion.div>

                {/* Time Range Filter */}
                <div className="flex justify-center gap-2">
                    {(['week', 'month', 'all'] as const).map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === range
                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                }`}
                        >
                            {range === 'all' ? 'All Time' : `Last ${range === 'week' ? '7 Days' : '30 Days'}`}
                        </button>
                    ))}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total XP', value: totalXP.toLocaleString(), icon: Zap, color: 'text-purple-400' },
                        { label: 'Current Streak', value: `${currentStreak} days`, icon: Flame, color: 'text-orange-400' },
                        { label: 'Longest Streak', value: `${longestStreak} days`, icon: Trophy, color: 'text-yellow-400' },
                        { label: 'Badges Earned', value: unlockedBadges.length.toString(), icon: Target, color: 'text-cyan-400' },
                    ].map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-xl p-4 border border-gray-700/30"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                                <span className="text-sm text-gray-400">{metric.label}</span>
                            </div>
                            <div className="text-2xl font-bold text-white">{metric.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* XP Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-6 border border-purple-500/20"
                >
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        XP Growth Over Time
                    </h3>

                    {xpOverTime.length > 0 ? (
                        <div className="relative h-64">
                            <AreaChart data={xpOverTime} height={256} />
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
                                {xpOverTime.length > 0 && (
                                    <>
                                        <span>{new Date(xpOverTime[0]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        <span>{new Date(xpOverTime[xpOverTime.length - 1]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            <p>No data for this time period. Start completing tasks!</p>
                        </div>
                    )}
                </motion.div>

                {/* Two column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Category Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card rounded-2xl p-6 border border-cyan-500/20"
                    >
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-cyan-400" />
                            XP by Category
                        </h3>
                        <div className="space-y-4">
                            {categoryBreakdown.map((cat, index) => (
                                <motion.div
                                    key={cat.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <CategoryBar
                                        category={cat.name}
                                        value={cat.xp}
                                        total={totalXP}
                                        color={cat.color}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Period Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card rounded-2xl p-6 border border-orange-500/20"
                    >
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-orange-400" />
                            Period Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 rounded-xl bg-gray-800/30">
                                <div className="text-2xl font-bold text-purple-400">{stats.periodXP}</div>
                                <div className="text-sm text-gray-400">XP Earned</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-gray-800/30">
                                <div className="text-2xl font-bold text-cyan-400">{stats.avgDailyXP}</div>
                                <div className="text-sm text-gray-400">Avg Daily XP</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-gray-800/30">
                                <div className="text-2xl font-bold text-green-400">{stats.totalTasks}</div>
                                <div className="text-sm text-gray-400">Tasks Done</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-gray-800/30">
                                <div className="text-2xl font-bold text-orange-400">{stats.totalStudyHours.toFixed(1)}h</div>
                                <div className="text-sm text-gray-400">Study Hours</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Progress Rings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-6 border border-green-500/20"
                >
                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        Progress Indicators
                    </h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="text-center">
                            <ProgressRing value={completedTopics.length} max={100} color="#8B5CF6" size={100} />
                            <p className="text-sm text-gray-400 mt-2">Topics ({completedTopics.length}/100)</p>
                        </div>
                        <div className="text-center">
                            <ProgressRing value={stats.completedPomodoros} max={50} color="#06B6D4" size={100} />
                            <p className="text-sm text-gray-400 mt-2">Pomodoros ({stats.completedPomodoros}/50)</p>
                        </div>
                        <div className="text-center">
                            <ProgressRing value={stats.completedQuests} max={100} color="#10B981" size={100} />
                            <p className="text-sm text-gray-400 mt-2">Quests ({stats.completedQuests}/100)</p>
                        </div>
                        <div className="text-center">
                            <ProgressRing value={unlockedBadges.length} max={20} color="#F97316" size={100} />
                            <p className="text-sm text-gray-400 mt-2">Badges ({unlockedBadges.length}/20)</p>
                        </div>
                    </div>
                </motion.div>

                {/* Tip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                >
                    <p className="text-gray-500 text-sm">
                        💡 Tip: Consistency beats intensity. Aim for steady daily progress!
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
