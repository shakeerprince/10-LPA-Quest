'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function CheckError() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    let errorMessage = 'An unknown error occurred';
    if (error === 'Configuration') {
        errorMessage = 'There is a problem with the server configuration. Please check if your environment variables are set correctly.';
    } else if (error === 'AccessDenied') {
        errorMessage = 'Access denied. You do not have permission to sign in.';
    } else if (error === 'Verification') {
        errorMessage = 'The verification token has expired or has already been used.';
    }

    return (
        <div className="text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-2">Authentication Error</h2>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            {error && (
                <div className="bg-gray-800/50 p-3 rounded mb-6 text-xs text-gray-500 font-mono">
                    Code: {error}
                </div>
            )}
        </div>
    );
}

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-white mb-2">Oops!</h1>

                <Suspense fallback={<p className="text-gray-400 text-center">Loading error details...</p>}>
                    <CheckError />
                </Suspense>

                <div className="mt-6">
                    <Link
                        href="/auth/signin"
                        className="block w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white text-center font-medium rounded-lg transition-colors"
                    >
                        Back to Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
