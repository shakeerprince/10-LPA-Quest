'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '@/store/useGamification';

// Generate the last 180 days (6 months)
const generateDateRange = () => {
    const dates: string[] = [];
    const today = new Date();

    for (let i = 179; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }

    return dates;
};

// Get color based on activity level
const getActivityColor = (level: number) => {
    if (level === 0) return 'bg-gray-800/50';
    if (level === 1) return 'bg-purple-900/60';
    if (level === 2) return 'bg-purple-700/70';
    if (level === 3) return 'bg-purple-500/80';
    return 'bg-purple-400';
};

const getActivityLevel = (xp: number, hours: number): number => {
    const score = xp + hours * 10;
    if (score === 0) return 0;
    if (score < 50) return 1;
    if (score < 100) return 2;
    if (score < 200) return 3;
    return 4;
};

export function ActivityHeatmap() {
    const { studyHistory } = useGamification();
    const dateRange = useMemo(() => generateDateRange(), []);

    // Create a map for quick lookup
    const activityMap = useMemo(() => {
        const map = new Map<string, { xp: number; hours: number }>();
        studyHistory.forEach((day) => {
            map.set(day.date, { xp: day.xpEarned, hours: day.hoursStudied });
        });
        return map;
    }, [studyHistory]);

    // Group dates by week
    const weeks = useMemo(() => {
        const result: string[][] = [];
        let currentWeek: string[] = [];

        // Find the starting day of the week for the first date
        const firstDate = new Date(dateRange[0]);
        const startPadding = firstDate.getDay();

        // Add padding for days before the first date
        for (let i = 0; i < startPadding; i++) {
            currentWeek.push('');
        }

        dateRange.forEach((date) => {
            currentWeek.push(date);
            if (currentWeek.length === 7) {
                result.push(currentWeek);
                currentWeek = [];
            }
        });

        // Add remaining days
        if (currentWeek.length > 0) {
            result.push(currentWeek);
        }

        return result;
    }, [dateRange]);

    // Calculate stats
    const totalDaysActive = studyHistory.length;
    const totalXPFromHeatmap = studyHistory.reduce((sum, day) => sum + day.xpEarned, 0);

    return (
        <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    📊 Activity Heatmap
                    <span className="text-xs text-gray-400 font-normal">(Last 6 months)</span>
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{totalDaysActive} days active</span>
                    <span>{totalXPFromHeatmap.toLocaleString()} XP earned</span>
                </div>
            </div>

            {/* Day labels */}
            <div className="flex gap-1 mb-2">
                <div className="w-8" /> {/* Spacer for month labels */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-xs text-gray-500 w-3 text-center">
                        {day[0]}
                    </div>
                ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-1 overflow-x-auto pb-2">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((date, dayIndex) => {
                            if (!date) {
                                return <div key={dayIndex} className="w-3 h-3" />;
                            }

                            const activity = activityMap.get(date);
                            const level = activity
                                ? getActivityLevel(activity.xp, activity.hours)
                                : 0;
                            const colorClass = getActivityColor(level);

                            const dateObj = new Date(date);
                            const formattedDate = dateObj.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            });

                            return (
                                <motion.div
                                    key={date}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: weekIndex * 0.01 }}
                                    className={`w-3 h-3 rounded-sm ${colorClass} cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-purple-400`}
                                    title={`${formattedDate}: ${activity?.xp || 0} XP, ${activity?.hours || 0}h studied`}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4">
                <span className="text-xs text-gray-500">Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
                    />
                ))}
                <span className="text-xs text-gray-500">More</span>
            </div>
        </div>
    );
}
