'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompanyPrepState {
    selectedCompanyId: string | null;
    solvedQuestions: Record<string, string[]>;
    bookmarkedQuestions: string[];
    checklistItems: Record<string, boolean>;
    preferredCompanies: string[];
    theme: 'dark' | 'light';

    // Actions
    selectCompany: (id: string | null) => void;
    markQuestionSolved: (companyId: string, questionId: string) => void;
    unmarkQuestionSolved: (companyId: string, questionId: string) => void;
    toggleBookmark: (questionId: string) => void;
    toggleChecklistItem: (itemId: string) => void;
    addPreferredCompany: (companyId: string) => void;
    removePreferredCompany: (companyId: string) => void;
    setTheme: (theme: 'dark' | 'light') => void;
    toggleTheme: () => void;
    getCompanyProgress: (companyId: string, totalQuestions: number) => number;
}

export const useCompanyPrep = create<CompanyPrepState>()(
    persist(
        (set, get) => ({
            selectedCompanyId: null,
            solvedQuestions: {},
            bookmarkedQuestions: [],
            checklistItems: {},
            preferredCompanies: [],
            theme: 'dark',

            selectCompany: (id) => set({ selectedCompanyId: id }),

            markQuestionSolved: (companyId, questionId) =>
                set((state) => {
                    const current = state.solvedQuestions[companyId] || [];
                    if (current.includes(questionId)) return state;
                    return {
                        solvedQuestions: {
                            ...state.solvedQuestions,
                            [companyId]: [...current, questionId],
                        },
                    };
                }),

            unmarkQuestionSolved: (companyId, questionId) =>
                set((state) => {
                    const current = state.solvedQuestions[companyId] || [];
                    return {
                        solvedQuestions: {
                            ...state.solvedQuestions,
                            [companyId]: current.filter((id) => id !== questionId),
                        },
                    };
                }),

            toggleBookmark: (questionId) =>
                set((state) => ({
                    bookmarkedQuestions: state.bookmarkedQuestions.includes(questionId)
                        ? state.bookmarkedQuestions.filter((id) => id !== questionId)
                        : [...state.bookmarkedQuestions, questionId],
                })),

            toggleChecklistItem: (itemId) =>
                set((state) => ({
                    checklistItems: {
                        ...state.checklistItems,
                        [itemId]: !state.checklistItems[itemId],
                    },
                })),

            addPreferredCompany: (companyId) =>
                set((state) => ({
                    preferredCompanies: state.preferredCompanies.includes(companyId)
                        ? state.preferredCompanies
                        : [...state.preferredCompanies, companyId],
                })),

            removePreferredCompany: (companyId) =>
                set((state) => ({
                    preferredCompanies: state.preferredCompanies.filter((id) => id !== companyId),
                })),

            setTheme: (theme) => {
                if (typeof document !== 'undefined') {
                    document.documentElement.classList.remove('dark', 'light');
                    document.documentElement.classList.add(theme);
                }
                set({ theme });
            },

            toggleTheme: () => {
                const newTheme = get().theme === 'dark' ? 'light' : 'dark';
                if (typeof document !== 'undefined') {
                    document.documentElement.classList.remove('dark', 'light');
                    document.documentElement.classList.add(newTheme);
                }
                set({ theme: newTheme });
            },

            getCompanyProgress: (companyId, totalQuestions) => {
                const solved = get().solvedQuestions[companyId]?.length || 0;
                return totalQuestions > 0 ? Math.round((solved / totalQuestions) * 100) : 0;
            },
        }),
        {
            name: 'company-prep-storage',
            onRehydrateStorage: () => (state) => {
                if (state && typeof document !== 'undefined') {
                    document.documentElement.classList.remove('dark', 'light');
                    document.documentElement.classList.add(state.theme);
                }
            },
        }
    )
);
