'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRoadmapStore, useCurrentDay, useIsDayCompleted } from '@/store/useRoadmapStore';
import { RoadmapDay } from '@/lib/roadmapGenerator';
import {
    ChevronDown,
    ChevronRight,
    Check,
    Calendar,
    Target,
    Zap,
    Clock,
    BookOpen,
    Code,
    Brain,
    Briefcase,
    Coffee,
    ExternalLink,
    PlayCircle,
    ArrowLeft,
    Filter,
    TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Category icon mapping
const getCategoryIcon = (category: RoadmapDay['category']) => {
    switch (category) {
        case 'dsa': return <Brain className="w-4 h-4" />;
        case 'development': return <Code className="w-4 h-4" />;
        case 'cs-fundamentals': return <BookOpen className="w-4 h-4" />;
        case 'project': return <Briefcase className="w-4 h-4" />;
        case 'interview': return <Target className="w-4 h-4" />;
        case 'rest': return <Coffee className="w-4 h-4" />;
        default: return <Calendar className="w-4 h-4" />;
    }
};

// Category color mapping
const getCategoryColor = (category: RoadmapDay['category']) => {
    switch (category) {
        case 'dsa': return 'text-purple-400 bg-purple-400/10 border-purple-500/30';
        case 'development': return 'text-cyan-400 bg-cyan-400/10 border-cyan-500/30';
        case 'cs-fundamentals': return 'text-orange-400 bg-orange-400/10 border-orange-500/30';
        case 'project': return 'text-pink-400 bg-pink-400/10 border-pink-500/30';
        case 'interview': return 'text-green-400 bg-green-400/10 border-green-500/30';
        case 'rest': return 'text-gray-400 bg-gray-400/10 border-gray-500/30';
        default: return 'text-gray-400 bg-gray-400/10 border-gray-500/30';
    }
};

// Day Card Component
function DayCard({ day, isCurrentDay, onComplete }: {
    day: RoadmapDay;
    isCurrentDay: boolean;
    onComplete: (dayNumber: number) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(isCurrentDay);
    const isCompleted = useIsDayCompleted(day.day);
    const categoryColor = getCategoryColor(day.category);

    const handleComplete = () => {
        if (!isCompleted) {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#8B5CF6', '#06B6D4', '#22C55E'],
            });
        }
        onComplete(day.day);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border overflow-hidden transition-all ${isCompleted
                    ? 'bg-green-500/5 border-green-500/30'
                    : isCurrentDay
                        ? 'bg-purple-500/10 border-purple-500/50 ring-2 ring-purple-500/30'
                        : 'bg-gray-800/30 border-gray-700/30 hover:border-gray-600/50'
                }`}
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center gap-4 text-left"
            >
                {/* Day number badge */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrentDay
                            ? 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white'
                            : 'bg-gray-700/50 text-gray-400'
                    }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : day.day}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor}`}>
                            {day.category.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">Week {day.week}</span>
                        {isCurrentDay && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                                TODAY
                            </span>
                        )}
                    </div>
                    <h3 className={`font-semibold truncate ${isCompleted ? 'text-gray-400' : 'text-white'}`}>
                        {day.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            {day.xp} XP
                        </span>
                        <span>{day.topics.length} topics</span>
                    </div>
                </div>

                {/* Expand icon */}
                {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
            </button>

            {/* Expanded content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-700/30"
                    >
                        <div className="p-4 space-y-4">
                            {/* Topics */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                    Topics to Cover
                                </h4>
                                <ul className="space-y-2">
                                    {day.topics.map((topic, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                            <span className="text-purple-400 mt-1">•</span>
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Resources */}
                            {day.resources.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                        Resources
                                    </h4>
                                    <div className="space-y-2">
                                        {day.resources.map((resource, idx) => (
                                            <a
                                                key={idx}
                                                href={resource.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                                            >
                                                {resource.type === 'video' ? (
                                                    <PlayCircle className="w-4 h-4 text-red-400" />
                                                ) : resource.type === 'practice' ? (
                                                    <Code className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <BookOpen className="w-4 h-4 text-blue-400" />
                                                )}
                                                <span className="text-sm text-gray-300 group-hover:text-white flex-1">
                                                    {resource.name}
                                                </span>
                                                <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Complete button */}
                            {!day.isRestDay && (
                                <button
                                    onClick={handleComplete}
                                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isCompleted
                                            ? 'bg-green-500/20 text-green-400 cursor-default'
                                            : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Completed!
                                        </>
                                    ) : (
                                        <>
                                            Mark as Complete
                                            <Zap className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Week Section Component
function WeekSection({ weekNumber, days, currentDay, onComplete }: {
    weekNumber: number;
    days: RoadmapDay[];
    currentDay: number;
    onComplete: (dayNumber: number) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(
        days.some(d => d.day === currentDay) || weekNumber <= 2
    );
    const completedDays = useRoadmapStore((state) => state.completedDays);
    const completedInWeek = days.filter(d => completedDays.includes(d.day)).length;
    const progressPercent = Math.round((completedInWeek / days.length) * 100);

    return (
        <div className="space-y-3">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center gap-4 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
            >
                <div className="text-left flex-1">
                    <h3 className="font-bold text-white">Week {weekNumber}</h3>
                    <p className="text-sm text-gray-400">
                        {completedInWeek}/{days.length} days completed
                    </p>
                </div>
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                    />
                </div>
                <span className="text-sm font-medium text-gray-400">{progressPercent}%</span>
                {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pl-4 border-l-2 border-purple-500/30"
                    >
                        {days.map((day) => (
                            <DayCard
                                key={day.day}
                                day={day}
                                isCurrentDay={day.day === currentDay}
                                onComplete={onComplete}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function MyRoadmapPage() {
    const router = useRouter();
    const roadmap = useRoadmapStore((state) => state.roadmap);
    const completeDay = useRoadmapStore((state) => state.completeDay);
    const uncompleteDay = useRoadmapStore((state) => state.uncompleteDay);
    const getProgress = useRoadmapStore((state) => state.getProgress);
    const currentDay = useCurrentDay();
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!roadmap) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Calendar className="w-8 h-8 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">No Roadmap Generated Yet</h2>
                    <p className="text-gray-400 max-w-md">
                        Complete the onboarding to generate your personalized study plan.
                    </p>
                    <button
                        onClick={() => router.push('/onboarding')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl"
                    >
                        Start Onboarding
                    </button>
                </div>
            </div>
        );
    }

    const progress = getProgress();
    const totalWeeks = Math.ceil(roadmap.totalDays / 7);
    const weekNumbers = Array.from({ length: totalWeeks }, (_, i) => i + 1);

    const handleToggleComplete = (dayNumber: number) => {
        const completedDays = useRoadmapStore.getState().completedDays;
        if (completedDays.includes(dayNumber)) {
            uncompleteDay(dayNumber);
        } else {
            completeDay(dayNumber);
        }
    };

    const categories = ['all', 'dsa', 'development', 'cs-fundamentals', 'project', 'interview', 'rest'];

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">
                            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                                📅 My Roadmap
                            </span>
                        </h1>
                        <p className="text-gray-400">
                            {roadmap.role.replace('-', ' ')} • {roadmap.totalDays} days • {roadmap.companyType.replace('_', ' ')}
                        </p>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-5 h-5 text-purple-400" />
                                <span className="text-lg font-semibold text-white">Overall Progress</span>
                            </div>
                            <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress.progressPercent}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </div>
                            <p className="text-sm text-gray-400">
                                {progress.completedCount} of {progress.totalDays} days completed
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{progress.progressPercent}%</div>
                                <div className="text-sm text-gray-400">Complete</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">{progress.earnedXP}</div>
                                <div className="text-sm text-gray-400">XP Earned</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-400">Day {currentDay}</div>
                                <div className="text-sm text-gray-400">Current</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                    <Filter className="w-5 h-5 text-gray-400 mr-2" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-all ${filterCategory === cat
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                                }`}
                        >
                            {cat === 'all' ? 'All' : cat.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Week by Week View */}
                <div className="space-y-6">
                    {weekNumbers.map((weekNum) => {
                        let days = roadmap.schedule.filter((d) => d.week === weekNum);

                        // Apply category filter
                        if (filterCategory !== 'all') {
                            days = days.filter((d) => d.category === filterCategory);
                        }

                        if (days.length === 0) return null;

                        return (
                            <WeekSection
                                key={weekNum}
                                weekNumber={weekNum}
                                days={days}
                                currentDay={currentDay}
                                onComplete={handleToggleComplete}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
