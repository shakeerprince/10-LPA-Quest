import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        // If user is authenticated but hasn't completed onboarding
        // redirect them to onboarding (except if already on onboarding page)
        if (token && !pathname.startsWith('/onboarding') && !pathname.startsWith('/auth') && !pathname.startsWith('/api')) {
            // We'll check onboarding status on client side since we can't easily 
            // access DB here without additional setup
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // Public routes that don't require auth
                const publicPaths = [
                    '/auth/signin',
                    '/auth/signup',
                    '/auth/error',
                    '/api/auth',
                    '/api/auth/register',
                ];

                // Check if the path is public
                const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

                if (isPublicPath) {
                    return true;
                }

                // All other routes require authentication
                return !!token;
            },
        },
        pages: {
            signIn: '/auth/signin',
            error: '/auth/error',
        },
    }
);

export const config = {
    matcher: [
        // Match all routes except static files and API routes that should be public
        '/((?!_next/static|_next/image|favicon.ico|ads.txt|robots.txt|public).*)',
    ],
};
