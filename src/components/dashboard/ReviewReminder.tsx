'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Clock, Brain, ChevronRight, Check, X, Zap, AlertCircle } from 'lucide-react';
import { useRoadmapStore } from '@/store/useRoadmapStore';
import { useGamification } from '@/store/useGamification';
import { differenceInDays } from 'date-fns';

interface ReviewItem {
    dayNumber: number;
    title: string;
    completedAt: Date;
    reviewType: '1-day' | '3-day' | '7-day' | '30-day';
    daysOverdue: number;
    xpReward: number;
}

// Spaced repetition intervals in days
const REVIEW_INTERVALS = {
    '1-day': 1,
    '3-day': 3,
    '7-day': 7,
    '30-day': 30,
};

const REVIEW_XP = {
    '1-day': 10,
    '3-day': 15,
    '7-day': 25,
    '30-day': 50,
};

export function ReviewReminderCard() {
    const roadmap = useRoadmapStore((state) => state.roadmap);
    const completedDays = useRoadmapStore((state) => state.completedDays);
    const startDate = useRoadmapStore((state) => state.startDate);
    const { addXP } = useGamification();

    const [reviewedToday, setReviewedToday] = useState<number[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load reviewed items from localStorage
        const saved = localStorage.getItem('10lpa-reviewed-today');
        const savedDate = localStorage.getItem('10lpa-reviewed-date');
        const today = new Date().toDateString();

        if (saved && savedDate === today) {
            setReviewedToday(JSON.parse(saved));
        } else {
            // Reset for new day
            localStorage.setItem('10lpa-reviewed-date', today);
            localStorage.setItem('10lpa-reviewed-today', '[]');
        }
    }, []);

    // Calculate items that need review
    const reviewItems = useMemo<ReviewItem[]>(() => {
        if (!roadmap || !startDate) return [];

        const items: ReviewItem[] = [];
        const now = new Date();
        const start = new Date(startDate);

        completedDays.forEach(dayNum => {
            const day = roadmap.schedule.find(d => d.day === dayNum);
            if (!day || day.isRestDay) return;

            // Estimate completion date (simplified - assume linear progress)
            const completedAt = new Date(start);
            completedAt.setDate(completedAt.getDate() + dayNum - 1);

            const daysSinceCompletion = differenceInDays(now, completedAt);

            // Check each review interval
            Object.entries(REVIEW_INTERVALS).forEach(([type, interval]) => {
                // Check if this review window is active
                // E.g., 3-day review is due between day 3-6 after completion
                const windowStart = interval;
                const windowEnd = type === '30-day' ? 45 : interval + 3;

                if (daysSinceCompletion >= windowStart && daysSinceCompletion <= windowEnd) {
                    // Check if already reviewed for this interval
                    const reviewKey = `${dayNum}-${type}`;
                    const reviewed = localStorage.getItem(`10lpa-review-${reviewKey}`);

                    if (!reviewed) {
                        items.push({
                            dayNumber: dayNum,
                            title: day.title,
                            completedAt,
                            reviewType: type as ReviewItem['reviewType'],
                            daysOverdue: daysSinceCompletion - interval,
                            xpReward: REVIEW_XP[type as keyof typeof REVIEW_XP],
                        });
                    }
                }
            });
        });

        // Sort by overdue first, then by XP reward
        return items.sort((a, b) => b.daysOverdue - a.daysOverdue || b.xpReward - a.xpReward).slice(0, 5);
    }, [roadmap, completedDays, startDate]);

    const handleReview = (item: ReviewItem) => {
        // Mark as reviewed
        const reviewKey = `${item.dayNumber}-${item.reviewType}`;
        localStorage.setItem(`10lpa-review-${reviewKey}`, 'true');

        // Add XP
        addXP(item.xpReward);

        // Track reviewed today
        const newReviewed = [...reviewedToday, item.dayNumber];
        setReviewedToday(newReviewed);
        localStorage.setItem('10lpa-reviewed-today', JSON.stringify(newReviewed));
    };

    const handleSkip = (item: ReviewItem) => {
        // Mark as reviewed (skipped) to avoid nagging
        const reviewKey = `${item.dayNumber}-${item.reviewType}`;
        localStorage.setItem(`10lpa-review-${reviewKey}`, 'skipped');

        // Just update UI
        const newReviewed = [...reviewedToday, item.dayNumber];
        setReviewedToday(newReviewed);
        localStorage.setItem('10lpa-reviewed-today', JSON.stringify(newReviewed));
    };

    if (!mounted || reviewItems.length === 0) {
        return null;
    }

    const visibleItems = reviewItems.filter(item => !reviewedToday.includes(item.dayNumber));

    if (visibleItems.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-4 border border-green-500/30 bg-green-500/5"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">All Caught Up! ✨</h3>
                        <p className="text-sm text-gray-400">No topics to review right now</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-5 border border-purple-500/30"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">Spaced Repetition Review</h3>
                        <p className="text-sm text-gray-400">Reinforce what you've learned</p>
                    </div>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400">
                    {visibleItems.length} topic{visibleItems.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {visibleItems.map((item, index) => (
                        <motion.div
                            key={`${item.dayNumber}-${item.reviewType}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30"
                        >
                            {/* Icon */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.daysOverdue > 0
                                    ? 'bg-orange-500/20 text-orange-400'
                                    : 'bg-cyan-500/20 text-cyan-400'
                                }`}>
                                {item.daysOverdue > 0 ? (
                                    <AlertCircle className="w-4 h-4" />
                                ) : (
                                    <RefreshCw className="w-4 h-4" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white truncate">
                                        Day {item.dayNumber}: {item.title}
                                    </span>
                                    {item.daysOverdue > 0 && (
                                        <span className="text-xs px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 flex-shrink-0">
                                            {item.daysOverdue}d overdue
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{item.reviewType.replace('-', ' ')} review</span>
                                    <span className="text-yellow-400 flex items-center gap-1">
                                        <Zap className="w-3 h-3" />+{item.xpReward} XP
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleSkip(item)}
                                    className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                                    title="Skip for now"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleReview(item)}
                                    className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-colors"
                                    title="Mark as reviewed"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
                💡 Regular reviews improve long-term retention by up to 80%
            </p>
        </motion.div>
    );
}
