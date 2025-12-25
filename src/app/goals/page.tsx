'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/store/useGamification';
import {
    Target,
    Trophy,
    Flame,
    Check,
    Plus,
    Calendar,
    TrendingUp,
    Zap,
    Star
} from 'lucide-react';
import confetti from 'canvas-confetti';

function GoalRing({
    value,
    max,
    label,
    color,
    icon: Icon
}: {
    value: number;
    max: number;
    label: string;
    color: string;
    icon: React.ElementType;
}) {
    const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference * (1 - percentage / 100);
    const isComplete = value >= max;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r="45"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                    />
                    <motion.circle
                        cx="64"
                        cy="64"
                        r="45"
                        fill="none"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className={`w-6 h-6 mb-1`} style={{ color }} />
                    <span className="text-lg font-bold text-white">{value}/{max}</span>
                </div>
                {isComplete && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                    >
                        <Check className="w-5 h-5 text-white" />
                    </motion.div>
                )}
            </div>
            <span className="text-sm text-gray-400 mt-2">{label}</span>
        </div>
    );
}

function SetGoalForm({ onSubmit, onCancel }: {
    onSubmit: (goals: { problems: number; hours: number; topics: number }) => void;
    onCancel: () => void;
}) {
    const [problems, setProblems] = useState(20);
    const [hours, setHours] = useState(15);
    const [topics, setTopics] = useState(10);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ problems, hours, topics });
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-6"
        >
            <h3 className="text-xl font-semibold text-white text-center">Set Your Weekly Goals</h3>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Problems to Solve</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min="5"
                            max="50"
                            value={problems}
                            onChange={(e) => setProblems(parseInt(e.target.value))}
                            className="flex-1 accent-purple-500"
                        />
                        <span className="text-white font-bold w-12 text-center">{problems}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Hours to Study</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min="5"
                            max="40"
                            value={hours}
                            onChange={(e) => setHours(parseInt(e.target.value))}
                            className="flex-1 accent-cyan-500"
                        />
                        <span className="text-white font-bold w-12 text-center">{hours}h</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Topics to Complete</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min="3"
                            max="20"
                            value={topics}
                            onChange={(e) => setTopics(parseInt(e.target.value))}
                            className="flex-1 accent-orange-500"
                        />
                        <span className="text-white font-bold w-12 text-center">{topics}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold"
                >
                    Set Goals 🎯
                </motion.button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white transition-colors"
                >
                    Cancel
                </button>
            </div>
        </motion.form>
    );
}

function MilestoneCard({
    title,
    value,
    target,
    icon: Icon,
    color
}: {
    title: string;
    value: number;
    target: number;
    icon: React.ElementType;
    color: string;
}) {
    const achieved = value >= target;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-xl border transition-all ${achieved
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-gray-800/30 border-gray-700/30'
                }`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${achieved ? 'bg-green-500/20' : 'bg-gray-700/50'}`}>
                    <Icon className={`w-5 h-5 ${achieved ? 'text-green-400' : 'text-gray-500'}`} style={!achieved ? { color } : {}} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className={`font-medium ${achieved ? 'text-green-400' : 'text-white'}`}>
                            {title}
                        </span>
                        {achieved && <Check className="w-4 h-4 text-green-400" />}
                    </div>
                    <div className="text-sm text-gray-500">
                        {value}/{target} {achieved ? '✓' : `(${target - value} to go)`}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function GoalsPage() {
    const {
        currentWeekGoal,
        setWeeklyGoal,
        weeklyGoalStreak,
        weeklyGoals,
        totalXP,
        completedTopics,
        pomodoroSessions,
        currentStreak
    } = useGamification();

    const [showSetGoal, setShowSetGoal] = useState(false);

    const handleSetGoal = (goals: { problems: number; hours: number; topics: number }) => {
        const weekStart = new Date();
        const day = weekStart.getDay();
        weekStart.setDate(weekStart.getDate() - day + (day === 0 ? -6 : 1));

        setWeeklyGoal({
            weekStart: weekStart.toISOString().split('T')[0],
            problemsTarget: goals.problems,
            problemsCompleted: 0,
            hoursTarget: goals.hours,
            hoursCompleted: 0,
            topicsTarget: goals.topics,
            topicsCompleted: 0,
        });

        setShowSetGoal(false);

        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
        });
    };

    const milestones = [
        { title: 'First 100 XP', value: totalXP, target: 100, icon: Zap, color: '#8B5CF6' },
        { title: 'Complete 10 Topics', value: completedTopics.length, target: 10, icon: Target, color: '#06B6D4' },
        { title: 'Complete 50 Topics', value: completedTopics.length, target: 50, icon: Target, color: '#06B6D4' },
        { title: '7 Day Streak', value: currentStreak, target: 7, icon: Flame, color: '#F97316' },
        { title: '30 Day Streak', value: currentStreak, target: 30, icon: Flame, color: '#F97316' },
        { title: 'Earn 1000 XP', value: totalXP, target: 1000, icon: Star, color: '#EAB308' },
        { title: 'Earn 5000 XP', value: totalXP, target: 5000, icon: Star, color: '#EAB308' },
        { title: '10 Pomodoros', value: pomodoroSessions.filter(p => p.completed).length, target: 10, icon: Trophy, color: '#10B981' },
    ];

    const achievedMilestones = milestones.filter(m => m.value >= m.target).length;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            🎯 Weekly Goals
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        Set targets, track progress, and celebrate your achievements
                    </p>
                </motion.div>

                {/* Goal Streak */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl p-6 border border-orange-500/20"
                >
                    <div className="flex items-center justify-center gap-4">
                        <Flame className="w-8 h-8 text-orange-400" />
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">{weeklyGoalStreak}</div>
                            <p className="text-sm text-gray-400">Weekly Goal Streak</p>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(Math.min(weeklyGoalStreak, 10))].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-3 h-3 rounded-full bg-orange-400"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Current Goal or Set Goal */}
                <AnimatePresence mode="wait">
                    {showSetGoal ? (
                        <SetGoalForm
                            key="form"
                            onSubmit={handleSetGoal}
                            onCancel={() => setShowSetGoal(false)}
                        />
                    ) : currentWeekGoal ? (
                        <motion.div
                            key="current"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-8 border border-purple-500/20"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">This Week's Goals</h2>
                                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                                        <Calendar className="w-4 h-4" />
                                        Week of {new Date(currentWeekGoal.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                                {currentWeekGoal.achieved && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400"
                                    >
                                        <Trophy className="w-5 h-5" />
                                        <span className="font-medium">Goal Achieved!</span>
                                    </motion.div>
                                )}
                            </div>

                            <div className="flex justify-center gap-8 flex-wrap">
                                <GoalRing
                                    value={currentWeekGoal.problemsCompleted}
                                    max={currentWeekGoal.problemsTarget}
                                    label="Problems"
                                    color="#8B5CF6"
                                    icon={Target}
                                />
                                <GoalRing
                                    value={currentWeekGoal.hoursCompleted}
                                    max={currentWeekGoal.hoursTarget}
                                    label="Hours"
                                    color="#06B6D4"
                                    icon={TrendingUp}
                                />
                                <GoalRing
                                    value={currentWeekGoal.topicsCompleted}
                                    max={currentWeekGoal.topicsTarget}
                                    label="Topics"
                                    color="#F97316"
                                    icon={Zap}
                                />
                            </div>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setShowSetGoal(true)}
                                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    Update Goals →
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-8 border border-purple-500/20 text-center"
                        >
                            <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">No Weekly Goal Set</h3>
                            <p className="text-gray-400 mb-6">Set a weekly goal to track your progress and stay motivated!</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowSetGoal(true)}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold flex items-center gap-2 mx-auto"
                            >
                                <Plus className="w-5 h-5" />
                                Set Weekly Goal
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Milestones */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-6 border border-yellow-500/20"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            Milestones
                        </h3>
                        <span className="text-sm text-gray-400">
                            {achievedMilestones}/{milestones.length} achieved
                        </span>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <MilestoneCard {...milestone} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Goal History */}
                {weeklyGoals.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-xl p-6 border border-gray-700/30"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            Goal History
                        </h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {weeklyGoals.slice().reverse().slice(0, 10).map((goal) => (
                                <div
                                    key={goal.id}
                                    className={`flex items-center justify-between p-3 rounded-lg ${goal.achieved ? 'bg-green-500/10' : 'bg-gray-800/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {goal.achieved ? (
                                            <Check className="w-5 h-5 text-green-400" />
                                        ) : (
                                            <Target className="w-5 h-5 text-gray-500" />
                                        )}
                                        <span className="text-sm text-gray-300">
                                            Week of {new Date(goal.weekStart).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {goal.problemsCompleted}/{goal.problemsTarget} problems • {goal.hoursCompleted}/{goal.hoursTarget}h • {goal.topicsCompleted}/{goal.topicsTarget} topics
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
