import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET - Fetch completed DSA sheet problems for the user
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

        // Return array of completed problem IDs (as numbers)
        const completedProblems = user.interviewProgress
            .filter(p => p.questionId.startsWith('dsa-problem-'))
            .map(p => parseInt(p.questionId.replace('dsa-problem-', ''), 10));

        return NextResponse.json({
            completedProblems,
            totalXP: user.totalXP,
        });
    } catch (error) {
        console.error('Error fetching DSA progress:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST - Toggle a problem's completion status
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { problemId, xp, isCompleting } = await req.json();

        if (typeof problemId !== 'number') {
            return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const questionId = `dsa-problem-${problemId}`;

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

        // Get updated completed problems
        const updatedProgress = await prisma.interviewProgress.findMany({
            where: {
                userId: user.id,
                questionId: { startsWith: 'dsa-problem-' },
            },
            select: { questionId: true },
        });

        const completedProblems = updatedProgress.map(p =>
            parseInt(p.questionId.replace('dsa-problem-', ''), 10)
        );

        const updatedUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { totalXP: true },
        });

        return NextResponse.json({
            success: true,
            completedProblems,
            totalXP: updatedUser?.totalXP || 0,
        });
    } catch (error) {
        console.error('Error updating DSA progress:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
