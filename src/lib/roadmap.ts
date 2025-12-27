import { differenceInCalendarDays } from 'date-fns';
import { CURRICULA, CurriculumDay } from './curriculum';
import { User } from '@prisma/client';

export function getDailyTasks(user: User): {
    dayNumber: number;
    content: CurriculumDay | null;
    isRestDay: boolean;
} {
    if (!user.startDate) {
        return { dayNumber: 0, content: null, isRestDay: false };
    }

    const today = new Date();
    const startDate = new Date(user.startDate);

    // Day 1 starts on startDate. So if today == startDate, diff is 0, so we add 1.
    const dayNumber = Math.max(1, differenceInCalendarDays(today, startDate) + 1);

    // Simple logic: Rest day every 7th day
    const isRestDay = dayNumber % 7 === 0;

    const role = user.targetRole || 'full-stack';
    const curriculum = CURRICULA[role] || CURRICULA['full-stack'];

    // In a real app, we might want to loop via modulus if the user exceeds the predefined days
    // For now, we just return null if no content exists for that day (or maybe the last available day?)
    const content = curriculum[dayNumber] || null;

    return {
        dayNumber,
        content,
        isRestDay
    };
}
