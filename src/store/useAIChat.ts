import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '@/lib/gemini';

export type ChatMode = 'general' | 'dsa' | 'code-review' | 'interview';

interface AIState {
    // API Key
    apiKey: string;
    setApiKey: (key: string) => void;

    // Messages
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    clearMessages: () => void;

    // Chat mode
    mode: ChatMode;
    setMode: (mode: ChatMode) => void;

    // Loading state
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;

    // Error state
    error: string | null;
    setError: (error: string | null) => void;
}

export const useAIChat = create<AIState>()(
    persist(
        (set) => ({
            // API Key - stored in localStorage
            apiKey: '',
            setApiKey: (key) => set({ apiKey: key }),

            // Messages
            messages: [],
            addMessage: (message) =>
                set((state) => ({
                    messages: [...state.messages, message],
                })),
            clearMessages: () => set({ messages: [] }),

            // Chat mode
            mode: 'general',
            setMode: (mode) => set({ mode }),

            // Loading state
            isLoading: false,
            setIsLoading: (loading) => set({ isLoading: loading }),

            // Error state
            error: null,
            setError: (error) => set({ error }),
        }),
        {
            name: 'ai-chat-storage',
            partialize: (state) => ({
                apiKey: state.apiKey,
                messages: state.messages.slice(-50), // Keep last 50 messages
                mode: state.mode,
            }),
        }
    )
);
