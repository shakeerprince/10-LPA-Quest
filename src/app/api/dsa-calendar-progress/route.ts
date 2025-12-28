import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET - Fetch completed DSA Calendar topics and patterns for the user
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                interviewProgress: {
                    where: {
                        OR: [
                            { questionId: { startsWith: 'dsa-calendar-topic-' } },
                            { questionId: { startsWith: 'dsa-calendar-pattern-' } },
                        ],
                    },
                    select: {
                        questionId: true,
                        lastPracticedAt: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Separate topics and patterns
        const completedTopics = user.interviewProgress
            .filter(p => p.questionId.startsWith('dsa-calendar-topic-'))
            .map(p => p.questionId.replace('dsa-calendar-topic-', ''));

        const completedPatterns = user.interviewProgress
            .filter(p => p.questionId.startsWith('dsa-calendar-pattern-'))
            .map(p => p.questionId.replace('dsa-calendar-pattern-', ''));

        return NextResponse.json({
            completedTopics,
            completedPatterns,
            totalXP: user.totalXP,
        });
    } catch (error) {
        console.error('Error fetching DSA Calendar progress:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST - Toggle a topic or pattern's completion status
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { type, id, xp, isCompleting } = await req.json();

        if (!type || !id || (type !== 'topic' && type !== 'pattern')) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const questionId = `dsa-calendar-${type}-${id}`;

        if (isCompleting) {
            // Mark as completed
            await prisma.interviewProgress.upsert({
                where: {
                    userId_questionId: {
                        userId: user.id,
                        questionId,
                    },
                },
                create: {
                    userId: user.id,
                    questionId,
                    practiced: true,
                },
                update: {
                    practiced: true,
                    lastPracticedAt: new Date(),
                },
            });

            // Add XP to user
            if (xp && typeof xp === 'number') {
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        totalXP: { increment: xp },
                    },
                });
            }
        } else {
            // Mark as uncompleted (delete the record)
            await prisma.interviewProgress.deleteMany({
                where: {
                    userId: user.id,
                    questionId,
                },
            });
        }

        // Get updated progress
        const updatedProgress = await prisma.interviewProgress.findMany({
            where: {
                userId: user.id,
                OR: [
                    { questionId: { startsWith: 'dsa-calendar-topic-' } },
                    { questionId: { startsWith: 'dsa-calendar-pattern-' } },
                ],
            },
            select: { questionId: true },
        });

        const completedTopics = updatedProgress
            .filter(p => p.questionId.startsWith('dsa-calendar-topic-'))
            .map(p => p.questionId.replace('dsa-calendar-topic-', ''));

        const completedPatterns = updatedProgress
            .filter(p => p.questionId.startsWith('dsa-calendar-pattern-'))
            .map(p => p.questionId.replace('dsa-calendar-pattern-', ''));

        const updatedUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { totalXP: true },
        });

        return NextResponse.json({
            success: true,
            completedTopics,
            completedPatterns,
            totalXP: updatedUser?.totalXP || 0,
        });
    } catch (error) {
        console.error('Error updating DSA Calendar progress:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
