import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

// Get user's completed topics
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const progress = await prisma.taskProgress.findMany({
            where: { userId: session.user.id },
            select: {
                topicId: true,
                completedAt: true,
                xpEarned: true,
            },
            orderBy: { completedAt: 'desc' },
        });

        return NextResponse.json({
            completedTopics: progress.map(p => p.topicId),
            progress,
        });
    } catch (error) {
        console.error('Error fetching progress:', error);
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }
}

// Mark topic as complete
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { topicId, xp = 0 } = await request.json();

        if (!topicId) {
            return NextResponse.json({ error: 'Topic ID is required' }, { status: 400 });
        }

        // Create progress record and update user XP in a transaction
        const [progress, user] = await prisma.$transaction([
            prisma.taskProgress.upsert({
                where: {
                    userId_topicId: {
                        userId: session.user.id,
                        topicId,
                    },
                },
                create: {
                    userId: session.user.id,
                    topicId,
                    xpEarned: xp,
                },
                update: {
                    completedAt: new Date(),
                    xpEarned: xp,
                },
            }),
            prisma.user.update({
                where: { id: session.user.id },
                data: {
                    totalXP: { increment: xp },
                    lastActiveDate: new Date(),
                },
            }),
        ]);

        return NextResponse.json({
            message: 'Topic marked as complete',
            progress,
            newTotalXP: user.totalXP,
        });
    } catch (error) {
        console.error('Error saving progress:', error);
        return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 });
    }
}

// Unmark topic as complete
export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { topicId, xp = 0 } = await request.json();

        if (!topicId) {
            return NextResponse.json({ error: 'Topic ID is required' }, { status: 400 });
        }

        // Delete progress and decrement XP
        await prisma.$transaction([
            prisma.taskProgress.delete({
                where: {
                    userId_topicId: {
                        userId: session.user.id,
                        topicId,
                    },
                },
            }),
            prisma.user.update({
                where: { id: session.user.id },
                data: {
                    totalXP: { decrement: xp },
                },
            }),
        ]);

        return NextResponse.json({ message: 'Topic unmarked' });
    } catch (error) {
        console.error('Error removing progress:', error);
        return NextResponse.json({ error: 'Failed to remove progress' }, { status: 500 });
    }
}
