'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Circle, ExternalLink, BookOpen, PlayCircle, Trophy, Code, MapPin, ArrowRight } from 'lucide-react';
import { useRoadmapStore, useCurrentDay, useIsDayCompleted } from '@/store/useRoadmapStore';
import { RoadmapDay } from '@/lib/roadmapGenerator';
import confetti from 'canvas-confetti';

// Fallback props for server-side rendering (legacy support)
interface LegacyProps {
    dayNumber?: number;
    content?: {
        day: number;
        title: string;
        topics: string[];
        resources: { title: string; url: string; type: 'video' | 'article' | 'practice' }[];
    } | null;
    isRestDay?: boolean;
}

export function DailyTargetCard({ dayNumber: legacyDayNumber, content: legacyContent, isRestDay: legacyIsRestDay }: LegacyProps) {
    const router = useRouter();
    const roadmap = useRoadmapStore((state) => state.roadmap);
    const getCurrentDayContent = useRoadmapStore((state) => state.getCurrentDayContent);
    const completeDay = useRoadmapStore((state) => state.completeDay);
    const [mounted, setMounted] = useState(false);
    const [completedTopics, setCompletedTopics] = useState<number[]>([]);

    const currentDay = useCurrentDay();
    const isDayCompleted = useIsDayCompleted(currentDay);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Get content from roadmap store or fallback to legacy props
    const dayContent = mounted ? getCurrentDayContent() : null;
    const displayDay = dayContent?.day ?? legacyDayNumber ?? 1;
    const isRestDay = dayContent?.isRestDay ?? legacyIsRestDay ?? false;

    const toggleTopic = (index: number) => {
        setCompletedTopics(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const handleCompleteDay = () => {
        if (!isDayCompleted && dayContent) {
            completeDay(dayContent.day);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8B5CF6', '#06B6D4', '#22C55E'],
            });
        }
    };

    if (isRestDay) {
        return (
            <motion.div
                key="rest-day"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-1 lg:col-span-2 glass-card p-6 border border-green-500/30 bg-green-500/5 rounded-2xl relative overflow-hidden"
            >
                <div className="relative z-10 flex flex-col items-center justify-center text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                        <Trophy className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Rest Day! 🌿</h3>
                    <p className="text-green-300 max-w-md">
                        Great work this week! Take today to recharge, review what you've learned, or build a fun side project.
                    </p>
                </div>
            </motion.div>
        );
    }

    // Show loading state while hydrating
    if (!mounted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-1 lg:col-span-2 glass-card p-6 border border-gray-700 rounded-2xl"
            >
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    <div className="h-24 bg-gray-700 rounded"></div>
                </div>
            </motion.div>
        );
    }

    // No content available
    if (!dayContent && !legacyContent) {
        return (
            <motion.div
                key="no-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-1 lg:col-span-2 glass-card p-6 border border-gray-700 rounded-2xl"
            >
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-300 mb-2">No Roadmap Generated Yet</h3>
                    <p className="text-gray-500 mb-4">Complete onboarding to get your personalized study plan.</p>
                    <button
                        onClick={() => router.push('/onboarding')}
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl"
                    >
                        Start Onboarding
                    </button>
                </div>
            </motion.div>
        );
    }

    // Map legacy content format to new format
    const topics = dayContent?.topics ?? legacyContent?.topics ?? [];
    const resources = dayContent?.resources ??
        legacyContent?.resources?.map(r => ({
            name: r.title,
            link: r.url,
            type: r.type
        })) ?? [];
    const title = dayContent?.title ?? legacyContent?.title ?? 'Today\'s Tasks';
    const xp = dayContent?.xp ?? 25;
    const category = dayContent?.category ?? 'dsa';

    const progress = Math.round((completedTopics.length / topics.length) * 100);
    const allTopicsCompleted = completedTopics.length === topics.length && topics.length > 0;

    return (
        <motion.div
            key="daily-target"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1 lg:col-span-2 glass-card p-0 border border-purple-500/30 rounded-2xl overflow-hidden flex flex-col"
        >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-b border-gray-700/50">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-cyan-400">Day {displayDay} Target</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${category === 'dsa' ? 'bg-purple-500/20 text-purple-400' :
                                    category === 'development' ? 'bg-cyan-500/20 text-cyan-400' :
                                        category === 'cs-fundamentals' ? 'bg-orange-500/20 text-orange-400' :
                                            'bg-gray-500/20 text-gray-400'
                                }`}>
                                {category.replace('-', ' ')}
                            </span>
                            {isDayCompleted && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                                    ✓ Completed
                                </span>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-white">{progress}%</div>
                        <span className="text-xs text-gray-400">+{xp} XP</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col md:flex-row gap-8">
                {/* Topics List */}
                <div className="flex-1 space-y-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Today's Topics</h4>
                    <div className="space-y-3">
                        {topics.map((topic, idx) => {
                            const isChecked = completedTopics.includes(idx);
                            return (
                                <button
                                    key={idx}
                                    onClick={() => toggleTopic(idx)}
                                    className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left group ${isChecked
                                        ? 'bg-purple-500/10 border-purple-500/30'
                                        : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50'
                                        }`}
                                >
                                    <div className={`mt-1 transition-colors ${isChecked ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-400'}`}>
                                        {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                    </div>
                                    <span className={`text-sm ${isChecked ? 'text-gray-300 line-through decoration-purple-500/50' : 'text-gray-300'}`}>
                                        {topic}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Resources List */}
                {resources.length > 0 && (
                    <div className="w-full md:w-1/3 space-y-4">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Resources</h4>
                        <div className="space-y-3">
                            {resources.map((resource, idx) => (
                                <a
                                    key={idx}
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-3 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/60 transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {resource.type === 'video' ? <PlayCircle className="w-4 h-4 text-red-400" /> :
                                            resource.type === 'practice' ? <Code className="w-4 h-4 text-green-400" /> :
                                                <BookOpen className="w-4 h-4 text-blue-400" />}
                                        <span className="text-xs font-medium text-gray-400 capitalize">{resource.type}</span>
                                    </div>
                                    <h5 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                                        {resource.name}
                                    </h5>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer with actions */}
            <div className="p-4 border-t border-gray-700/50 flex flex-col sm:flex-row gap-3">
                {!isDayCompleted && allTopicsCompleted && (
                    <button
                        onClick={handleCompleteDay}
                        className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        Complete Day {displayDay}
                    </button>
                )}
                <button
                    onClick={() => router.push('/my-roadmap')}
                    className="flex-1 py-3 border border-purple-500/30 text-purple-400 font-semibold rounded-xl hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2"
                >
                    View Full Roadmap
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
