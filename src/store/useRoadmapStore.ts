'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { differenceInCalendarDays } from 'date-fns';
import {
    GeneratedRoadmap,
    RoadmapDay,
    calculateRoadmapProgress,
    getDayFromRoadmap
} from '@/lib/roadmapGenerator';

interface RoadmapState {
    // Core roadmap data
    roadmap: GeneratedRoadmap | null;
    startDate: string | null;
    completedDays: number[];

    // Computed/derived state
    currentDay: number;

    // Actions
    setRoadmap: (roadmap: GeneratedRoadmap, startDate: Date) => void;
    clearRoadmap: () => void;
    completeDay: (dayNumber: number) => void;
    uncompleteDay: (dayNumber: number) => void;

    // Getters (as functions)
    getCurrentDayContent: () => RoadmapDay | null;
    getDayContent: (dayNumber: number) => RoadmapDay | null;
    getProgress: () => {
        completedCount: number;
        totalDays: number;
        progressPercent: number;
        totalXP: number;
        earnedXP: number;
    };
    getWeekDays: (weekNumber: number) => RoadmapDay[];
    getPhaseProgress: () => Record<string, { completed: number; total: number }>;
}

export const useRoadmapStore = create<RoadmapState>()(
    persist(
        (set, get) => ({
            roadmap: null,
            startDate: null,
            completedDays: [],
            currentDay: 1,

            setRoadmap: (roadmap, startDate) => {
                set({
                    roadmap,
                    startDate: startDate.toISOString(),
                    completedDays: [],
                    currentDay: 1,
                });
            },

            clearRoadmap: () => {
                set({
                    roadmap: null,
                    startDate: null,
                    completedDays: [],
                    currentDay: 1,
                });
            },

            completeDay: (dayNumber) => {
                set((state) => {
                    if (state.completedDays.includes(dayNumber)) {
                        return state;
                    }
                    return {
                        completedDays: [...state.completedDays, dayNumber],
                    };
                });
            },

            uncompleteDay: (dayNumber) => {
                set((state) => ({
                    completedDays: state.completedDays.filter((d) => d !== dayNumber),
                }));
            },

            getCurrentDayContent: () => {
                const state = get();
                if (!state.roadmap || !state.startDate) return null;

                const today = new Date();
                const startDate = new Date(state.startDate);
                const dayNumber = Math.max(1, differenceInCalendarDays(today, startDate) + 1);

                // Clamp to roadmap bounds
                const clampedDay = Math.min(dayNumber, state.roadmap.totalDays);

                return getDayFromRoadmap(state.roadmap, clampedDay);
            },

            getDayContent: (dayNumber) => {
                const state = get();
                if (!state.roadmap) return null;
                return getDayFromRoadmap(state.roadmap, dayNumber);
            },

            getProgress: () => {
                const state = get();
                if (!state.roadmap) {
                    return {
                        completedCount: 0,
                        totalDays: 0,
                        progressPercent: 0,
                        totalXP: 0,
                        earnedXP: 0,
                    };
                }
                return calculateRoadmapProgress(state.roadmap, state.completedDays);
            },

            getWeekDays: (weekNumber) => {
                const state = get();
                if (!state.roadmap) return [];
                return state.roadmap.schedule.filter((day) => day.week === weekNumber);
            },

            getPhaseProgress: () => {
                const state = get();
                if (!state.roadmap) return {};

                const progress: Record<string, { completed: number; total: number }> = {};

                state.roadmap.schedule.forEach((day) => {
                    if (!progress[day.phase]) {
                        progress[day.phase] = { completed: 0, total: 0 };
                    }
                    progress[day.phase].total++;
                    if (state.completedDays.includes(day.day)) {
                        progress[day.phase].completed++;
                    }
                });

                return progress;
            },
        }),
        {
            name: '10lpa-roadmap-storage',
            partialize: (state) => ({
                roadmap: state.roadmap,
                startDate: state.startDate,
                completedDays: state.completedDays,
            }),
        }
    )
);

// Hook to get current day number
export function useCurrentDay(): number {
    const startDate = useRoadmapStore((state) => state.startDate);
    const roadmap = useRoadmapStore((state) => state.roadmap);

    if (!startDate || !roadmap) return 1;

    const today = new Date();
    const start = new Date(startDate);
    const dayNumber = Math.max(1, differenceInCalendarDays(today, start) + 1);

    return Math.min(dayNumber, roadmap.totalDays);
}

// Hook to check if a specific day is completed
export function useIsDayCompleted(dayNumber: number): boolean {
    return useRoadmapStore((state) => state.completedDays.includes(dayNumber));
}
