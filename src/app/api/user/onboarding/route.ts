import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { targetRole, timeframe, targetCompany, startDate, targetDate, onboardingComplete } = body;

        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                targetRole,
                timeframe,
                targetCompany,
                startDate: new Date(startDate),
                targetDate: new Date(targetDate),
                onboardingComplete,
            },
        });

        return NextResponse.json({
            message: 'Onboarding completed successfully',
            user: {
                id: user.id,
                targetRole: user.targetRole,
                timeframe: user.timeframe,
                targetCompany: user.targetCompany,
            }
        });
    } catch (error) {
        console.error('Onboarding error:', error);
        return NextResponse.json({ error: 'Failed to save onboarding data' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                onboardingComplete: true,
                targetRole: true,
                timeframe: true,
                targetCompany: true,
                startDate: true,
                targetDate: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching onboarding data:', error);
        return NextResponse.json({ error: 'Failed to fetch onboarding data' }, { status: 500 });
    }
}
