'use client';

import { useEffect, useState } from 'react';
import { MilestoneModal, useMilestoneTracker } from '@/components/MilestoneModal';
import { ReviewReminderCard } from '@/components/dashboard/ReviewReminder';
import { useRoadmapStore } from '@/store/useRoadmapStore';
import { useGamification } from '@/store/useGamification';

/**
 * Client-side wrapper that adds:
 * - Milestone celebration modals
 * - Spaced repetition review reminders
 * - Client-side roadmap integration
 */
export function DashboardEnhancements() {
    const [mounted, setMounted] = useState(false);
    const getProgress = useRoadmapStore((state) => state.getProgress);
    const roadmap = useRoadmapStore((state) => state.roadmap);
    const { addXP } = useGamification();

    useEffect(() => {
        setMounted(true);
    }, []);

    const progress = mounted ? getProgress() : { progressPercent: 0 };
    const { showMilestone, currentMilestone, closeMilestone } = useMilestoneTracker(progress.progressPercent);

    const handleMilestoneClose = () => {
        // Give XP bonus when closing milestone
        const xpBonuses: Record<number, number> = {
            25: 100,
            50: 250,
            75: 500,
            100: 1000,
        };
        const bonus = xpBonuses[currentMilestone] || 0;
        if (bonus > 0) {
            addXP(bonus);
        }
        closeMilestone();
    };

    if (!mounted) return null;

    return (
        <>
            {/* Milestone Modal */}
            <MilestoneModal
                isOpen={showMilestone}
                milestone={currentMilestone}
                onClose={handleMilestoneClose}
            />

            {/* Review Reminder Card - only show if roadmap exists */}
            {roadmap && (
                <div className="mt-6">
                    <ReviewReminderCard />
                </div>
            )}
        </>
    );
}

/**
 * Progress banner with dynamic roadmap info
 */
export function ProgressBanner() {
    const [mounted, setMounted] = useState(false);
    const roadmap = useRoadmapStore((state) => state.roadmap);
    const getProgress = useRoadmapStore((state) => state.getProgress);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !roadmap) return null;

    const progress = getProgress();
    const roleDisplay = roadmap.role.replace('-', ' ');
    const timeframeDisplay = roadmap.timeframe === '3_months' ? '3 Months' : '6 Months';
    const companyDisplay = roadmap.companyType.replace('_', ' ');

    return (
        <div className="text-center mb-4">
            <p className="text-lg text-gray-400">
                <span className="text-purple-400 font-semibold capitalize">{roleDisplay}</span>
                {' • '}
                <span className="text-cyan-400 font-semibold">{timeframeDisplay}</span>
                {' • '}
                <span className="text-pink-400 font-semibold">{companyDisplay}</span>
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-500">
                <span>Day {progress.completedCount + 1} of {progress.totalDays}</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                <span>{progress.progressPercent}% Complete</span>
            </div>
        </div>
    );
}
