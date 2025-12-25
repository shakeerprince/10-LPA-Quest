'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { LevelUpModal } from '@/components/ui/LevelUpModal';
import { AIFloatingButton } from '@/components/ai/AIFloatingButton';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <LevelUpModal />
                <AIFloatingButton />
            </QueryClientProvider>
        </SessionProvider>
    );
}
