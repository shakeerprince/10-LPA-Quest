import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

// Get user's gamification stats
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                currentLevel: true,
                totalXP: true,
                currentStreak: true,
                longestStreak: true,
                lastActiveDate: true,
                totalFocusMinutes: true,
                weeklyGoalStreak: true,
            },
        });

        // Get badge count
        const badgeCount = await prisma.userBadge.count({
            where: { userId: session.user.id },
        });

        // Get completed topics count
        const completedTopics = await prisma.taskProgress.count({
            where: { userId: session.user.id },
        });

        return NextResponse.json({
            ...user,
            badgeCount,
            completedTopics,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

// Update user stats (XP, streak, etc.)
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            addXP,
            currentStreak,
            longestStreak,
            totalFocusMinutes,
            lastActiveDate,
        } = body;

        const updateData: Record<string, unknown> = {};

        if (addXP) {
            updateData.totalXP = { increment: addXP };
        }
        if (currentStreak !== undefined) {
            updateData.currentStreak = currentStreak;
        }
        if (longestStreak !== undefined) {
            updateData.longestStreak = longestStreak;
        }
        if (totalFocusMinutes !== undefined) {
            updateData.totalFocusMinutes = { increment: totalFocusMinutes };
        }
        if (lastActiveDate) {
            updateData.lastActiveDate = new Date(lastActiveDate);
        }

        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: updateData,
            select: {
                totalXP: true,
                currentStreak: true,
                longestStreak: true,
                totalFocusMinutes: true,
                lastActiveDate: true,
            },
        });

        // Calculate level from XP
        const level = Math.floor(user.totalXP / 1000) + 1;

        // Update level if changed
        await prisma.user.update({
            where: { id: session.user.id },
            data: { currentLevel: level },
        });

        return NextResponse.json({
            ...user,
            currentLevel: level,
        });
    } catch (error) {
        console.error('Error updating stats:', error);
        return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
    }
}
