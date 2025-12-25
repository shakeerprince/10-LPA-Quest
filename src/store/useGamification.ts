'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  condition: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
};

export type DailyQuest = {
  id: string;
  title: string;
  category: 'coding' | 'building' | 'learning';
  completed: boolean;
  xp: number;
  createdAt: string;
};

export type StudyDay = {
  date: string;
  hoursStudied: number;
  tasksCompleted: number;
  xpEarned: number;
};

export type PomodoroSession = {
  id: string;
  startTime: string;
  duration: number; // in minutes
  completed: boolean;
  xpEarned: number;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  category: 'dsa' | 'system-design' | 'behavioral' | 'development' | 'general';
  topicId?: string;
  createdAt: string;
  updatedAt: string;
};

export type WeeklyGoal = {
  id: string;
  weekStart: string;
  problemsTarget: number;
  problemsCompleted: number;
  hoursTarget: number;
  hoursCompleted: number;
  topicsTarget: number;
  topicsCompleted: number;
  achieved: boolean;
};

export type InterviewQuestion = {
  id: string;
  practiced: boolean;
  lastPracticedAt?: string;
};

interface GamificationState {
  // Core stats
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  hoursStudiedToday: number;
  previousLevel: number;
  showLevelUpModal: boolean;
  newLevel: number;

  // Daily quests
  dailyQuests: DailyQuest[];

  // Study history for heatmap
  studyHistory: StudyDay[];

  // Completed topics (topic IDs)
  completedTopics: string[];

  // Badges
  unlockedBadges: string[];

  // Pomodoro
  pomodoroSessions: PomodoroSession[];
  totalFocusMinutes: number;

  // Notes
  notes: Note[];

  // Weekly goals
  weeklyGoals: WeeklyGoal[];
  currentWeekGoal: WeeklyGoal | null;
  weeklyGoalStreak: number;

  // Interview prep
  practicedQuestions: InterviewQuestion[];

  // Actions
  addXP: (amount: number) => void;
  completeTask: (questId: string) => void;
  addQuest: (quest: Omit<DailyQuest, 'id' | 'completed' | 'createdAt'>) => void;
  removeQuest: (questId: string) => void;
  completeTopic: (topicId: string, xp: number) => void;
  uncompleteTopic: (topicId: string, xp: number) => void;
  updateHoursStudied: (hours: number) => void;
  updateStreak: () => void;
  unlockBadge: (badgeId: string) => void;
  resetDailyQuests: () => void;

  // Pomodoro actions
  addPomodoroSession: (session: Omit<PomodoroSession, 'id'>) => void;

  // Notes actions
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;

  // Goals actions
  setWeeklyGoal: (goal: Omit<WeeklyGoal, 'id' | 'achieved'>) => void;
  updateGoalProgress: (type: 'problems' | 'hours' | 'topics', amount: number) => void;

  // Interview actions
  markQuestionPracticed: (questionId: string) => void;

  // Level up actions
  closeLevelUpModal: () => void;
  checkLevelUp: () => void;
}

// Level titles based on progress
export const LEVEL_TITLES: Record<number, string> = {
  1: 'Script Kiddie',
  5: 'Code Apprentice',
  10: 'Bug Hunter',
  15: 'Algorithm Ninja',
  20: 'Data Wizard',
  25: 'System Thinker',
  30: 'Full Stack Warrior',
  35: 'Architecture Sage',
  40: 'Tech Lead',
  45: 'Principal Engineer',
  50: 'System Architect',
};

// All available badges with rarity
export const ALL_BADGES: Badge[] = [
  // Common (Easy to get)
  { id: 'first-task', name: 'First Blood', description: 'Complete your first task', icon: '🎯', condition: 'Complete 1 task', rarity: 'common' },
  { id: 'streak-3', name: 'Getting Warm', description: '3-day streak', icon: '🔥', condition: '3-day streak', rarity: 'common' },
  { id: 'first-pomodoro', name: 'Focus Initiate', description: 'Complete first pomodoro', icon: '🍅', condition: 'Complete 1 pomodoro', rarity: 'common' },
  { id: 'first-note', name: 'Note Taker', description: 'Create your first note', icon: '📝', condition: 'Create 1 note', rarity: 'common' },

  // Rare (Moderate effort)
  { id: 'streak-7', name: 'On Fire', description: '7-day streak', icon: '🔥', condition: '7-day streak', rarity: 'rare' },
  { id: 'xp-1000', name: 'Rising Star', description: 'Earn 1000 XP', icon: '⭐', condition: 'Earn 1000 XP', rarity: 'rare' },
  { id: 'pomodoro-10', name: 'Deep Focus', description: 'Complete 10 pomodoros', icon: '🎯', condition: 'Complete 10 pomodoros', rarity: 'rare' },
  { id: 'notes-10', name: 'Knowledge Keeper', description: 'Create 10 notes', icon: '📚', condition: 'Create 10 notes', rarity: 'rare' },
  { id: 'weekly-goal', name: 'Goal Getter', description: 'Complete a weekly goal', icon: '🎯', condition: 'Complete weekly goal', rarity: 'rare' },

  // Epic (Significant achievement)
  { id: 'streak-30', name: 'Unstoppable', description: '30-day streak', icon: '💪', condition: '30-day streak', rarity: 'epic' },
  { id: 'xp-5000', name: 'XP Master', description: 'Earn 5000 XP', icon: '🌟', condition: 'Earn 5000 XP', rarity: 'epic' },
  { id: 'arrays-master', name: 'Array Slayer', description: 'Complete all Array problems', icon: '📊', condition: 'Complete Arrays module', rarity: 'epic' },
  { id: 'trees-master', name: 'Tree Hugger', description: 'Complete all Tree problems', icon: '🌳', condition: 'Complete Trees module', rarity: 'epic' },
  { id: 'graphs-master', name: 'Graph Navigator', description: 'Complete all Graph problems', icon: '🕸️', condition: 'Complete Graphs module', rarity: 'epic' },
  { id: 'pomodoro-50', name: 'Focus Master', description: 'Complete 50 pomodoros', icon: '🧘', condition: 'Complete 50 pomodoros', rarity: 'epic' },
  { id: 'interview-ready', name: 'Interview Ready', description: 'Practice 50 interview questions', icon: '🎤', condition: 'Practice 50 questions', rarity: 'epic' },

  // Legendary (Major milestones)
  { id: 'xp-10000', name: 'Legend', description: 'Earn 10000 XP', icon: '👑', condition: 'Earn 10000 XP', rarity: 'legendary' },
  { id: 'dp-master', name: 'DP Wizard', description: 'Complete all DP problems', icon: '🧙', condition: 'Complete DP module', rarity: 'legendary' },
  { id: 'system-design', name: 'Architect', description: 'Complete System Design basics', icon: '🏗️', condition: 'Complete System Design', rarity: 'legendary' },
  { id: 'streak-100', name: 'Centurion', description: '100-day streak', icon: '🏆', condition: '100-day streak', rarity: 'legendary' },
  { id: 'goal-streak-10', name: 'Consistent Champion', description: 'Hit 10 weekly goals in a row', icon: '💎', condition: '10 weekly goal streak', rarity: 'legendary' },
];

// Calculate level from XP
export const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

// Calculate XP needed for next level
export const xpForNextLevel = (currentLevel: number): number => {
  return Math.pow(currentLevel, 2) * 100;
};

// Get level title
export const getLevelTitle = (level: number): string => {
  const thresholds = Object.keys(LEVEL_TITLES).map(Number).sort((a, b) => b - a);
  for (const threshold of thresholds) {
    if (level >= threshold) {
      return LEVEL_TITLES[threshold];
    }
  }
  return 'Novice';
};

// Get today's date string
const getTodayString = () => new Date().toISOString().split('T')[0];

// Get current week start (Monday)
const getWeekStart = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(now.setDate(diff)).toISOString().split('T')[0];
};

export const useGamification = create<GamificationState>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      hoursStudiedToday: 0,
      previousLevel: 1,
      showLevelUpModal: false,
      newLevel: 1,
      dailyQuests: [],
      studyHistory: [],
      completedTopics: [],
      unlockedBadges: [],
      pomodoroSessions: [],
      totalFocusMinutes: 0,
      notes: [],
      weeklyGoals: [],
      currentWeekGoal: null,
      weeklyGoalStreak: 0,
      practicedQuestions: [],

      addXP: (amount) => {
        set((state) => {
          const newXP = state.totalXP + amount;
          const badges = [...state.unlockedBadges];

          // Check XP badges
          if (newXP >= 1000 && !badges.includes('xp-1000')) badges.push('xp-1000');
          if (newXP >= 5000 && !badges.includes('xp-5000')) badges.push('xp-5000');
          if (newXP >= 10000 && !badges.includes('xp-10000')) badges.push('xp-10000');

          return { totalXP: newXP, unlockedBadges: badges };
        });

        get().checkLevelUp();
      },

      completeTask: (questId) => {
        set((state) => {
          const quest = state.dailyQuests.find((q) => q.id === questId);
          if (!quest || quest.completed) return state;

          const updatedQuests = state.dailyQuests.map((q) =>
            q.id === questId ? { ...q, completed: true } : q
          );

          const today = getTodayString();
          const existingDay = state.studyHistory.find((d) => d.date === today);
          let updatedHistory = [...state.studyHistory];

          if (existingDay) {
            updatedHistory = updatedHistory.map((d) =>
              d.date === today
                ? { ...d, tasksCompleted: d.tasksCompleted + 1, xpEarned: d.xpEarned + quest.xp }
                : d
            );
          } else {
            updatedHistory.push({
              date: today,
              hoursStudied: state.hoursStudiedToday,
              tasksCompleted: 1,
              xpEarned: quest.xp,
            });
          }

          const badges = [...state.unlockedBadges];
          if (!badges.includes('first-task')) badges.push('first-task');

          return {
            dailyQuests: updatedQuests,
            totalXP: state.totalXP + quest.xp,
            studyHistory: updatedHistory,
            unlockedBadges: badges,
          };
        });

        get().updateStreak();
        get().checkLevelUp();
      },

      addQuest: (quest) => {
        set((state) => ({
          dailyQuests: [
            ...state.dailyQuests,
            {
              ...quest,
              id: crypto.randomUUID(),
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ],
        }));
      },

      removeQuest: (questId) => {
        set((state) => ({
          dailyQuests: state.dailyQuests.filter((q) => q.id !== questId),
        }));
      },

      completeTopic: (topicId, xp) => {
        set((state) => {
          if (state.completedTopics.includes(topicId)) return state;

          // Update goal progress
          const currentGoal = state.currentWeekGoal;
          let updatedGoal = currentGoal;
          if (currentGoal) {
            updatedGoal = {
              ...currentGoal,
              topicsCompleted: currentGoal.topicsCompleted + 1,
              achieved: currentGoal.topicsCompleted + 1 >= currentGoal.topicsTarget &&
                currentGoal.problemsCompleted >= currentGoal.problemsTarget &&
                currentGoal.hoursCompleted >= currentGoal.hoursTarget,
            };
          }

          return {
            completedTopics: [...state.completedTopics, topicId],
            totalXP: state.totalXP + xp,
            currentWeekGoal: updatedGoal,
          };
        });

        get().updateStreak();
        get().checkLevelUp();
      },

      uncompleteTopic: (topicId, xp) => {
        set((state) => ({
          completedTopics: state.completedTopics.filter((id) => id !== topicId),
          totalXP: Math.max(0, state.totalXP - xp),
        }));
      },

      updateHoursStudied: (hours) => {
        set((state) => {
          const today = getTodayString();
          const existingDay = state.studyHistory.find((d) => d.date === today);
          let updatedHistory = [...state.studyHistory];

          if (existingDay) {
            updatedHistory = updatedHistory.map((d) =>
              d.date === today ? { ...d, hoursStudied: hours } : d
            );
          } else {
            updatedHistory.push({
              date: today,
              hoursStudied: hours,
              tasksCompleted: 0,
              xpEarned: 0,
            });
          }

          return {
            hoursStudiedToday: hours,
            studyHistory: updatedHistory,
          };
        });

        get().updateStreak();
      },

      updateStreak: () => {
        set((state) => {
          const today = getTodayString();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayString = yesterday.toISOString().split('T')[0];

          let newStreak = state.currentStreak;
          const badges = [...state.unlockedBadges];

          if (state.lastActiveDate === today) {
            return state;
          } else if (state.lastActiveDate === yesterdayString) {
            newStreak = state.currentStreak + 1;
          } else if (state.lastActiveDate === null) {
            newStreak = 1;
          } else {
            newStreak = 1;
          }

          // Check streak badges
          if (newStreak >= 3 && !badges.includes('streak-3')) badges.push('streak-3');
          if (newStreak >= 7 && !badges.includes('streak-7')) badges.push('streak-7');
          if (newStreak >= 30 && !badges.includes('streak-30')) badges.push('streak-30');
          if (newStreak >= 100 && !badges.includes('streak-100')) badges.push('streak-100');

          return {
            currentStreak: newStreak,
            longestStreak: Math.max(state.longestStreak, newStreak),
            lastActiveDate: today,
            unlockedBadges: badges,
          };
        });
      },

      unlockBadge: (badgeId) => {
        set((state) => {
          if (state.unlockedBadges.includes(badgeId)) return state;
          return { unlockedBadges: [...state.unlockedBadges, badgeId] };
        });
      },

      resetDailyQuests: () => {
        set((state) => ({
          dailyQuests: state.dailyQuests.map((q) => ({ ...q, completed: false })),
          hoursStudiedToday: 0,
        }));
      },

      // Pomodoro actions
      addPomodoroSession: (session) => {
        set((state) => {
          const newSession = {
            ...session,
            id: crypto.randomUUID(),
          };

          const badges = [...state.unlockedBadges];
          const sessionCount = state.pomodoroSessions.filter(s => s.completed).length + (session.completed ? 1 : 0);

          if (sessionCount >= 1 && !badges.includes('first-pomodoro')) badges.push('first-pomodoro');
          if (sessionCount >= 10 && !badges.includes('pomodoro-10')) badges.push('pomodoro-10');
          if (sessionCount >= 50 && !badges.includes('pomodoro-50')) badges.push('pomodoro-50');

          return {
            pomodoroSessions: [...state.pomodoroSessions, newSession],
            totalFocusMinutes: state.totalFocusMinutes + (session.completed ? session.duration : 0),
            totalXP: state.totalXP + session.xpEarned,
            unlockedBadges: badges,
          };
        });

        get().updateStreak();
        get().checkLevelUp();
      },

      // Notes actions
      addNote: (note) => {
        set((state) => {
          const now = new Date().toISOString();
          const newNote = {
            ...note,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
          };

          const badges = [...state.unlockedBadges];
          const noteCount = state.notes.length + 1;

          if (noteCount >= 1 && !badges.includes('first-note')) badges.push('first-note');
          if (noteCount >= 10 && !badges.includes('notes-10')) badges.push('notes-10');

          return {
            notes: [...state.notes, newNote],
            unlockedBadges: badges,
          };
        });
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }));
      },

      // Goals actions
      setWeeklyGoal: (goal) => {
        set((state) => {
          const newGoal: WeeklyGoal = {
            ...goal,
            id: crypto.randomUUID(),
            achieved: false,
          };

          return {
            weeklyGoals: [...state.weeklyGoals, newGoal],
            currentWeekGoal: newGoal,
          };
        });
      },

      updateGoalProgress: (type, amount) => {
        set((state) => {
          if (!state.currentWeekGoal) return state;

          const goal = { ...state.currentWeekGoal };

          if (type === 'problems') {
            goal.problemsCompleted = Math.min(goal.problemsCompleted + amount, goal.problemsTarget);
          } else if (type === 'hours') {
            goal.hoursCompleted = Math.min(goal.hoursCompleted + amount, goal.hoursTarget);
          } else if (type === 'topics') {
            goal.topicsCompleted = Math.min(goal.topicsCompleted + amount, goal.topicsTarget);
          }

          // Check if goal achieved
          const wasAchieved = goal.achieved;
          goal.achieved = goal.problemsCompleted >= goal.problemsTarget &&
            goal.hoursCompleted >= goal.hoursTarget &&
            goal.topicsCompleted >= goal.topicsTarget;

          let badges = [...state.unlockedBadges];
          let goalStreak = state.weeklyGoalStreak;

          if (!wasAchieved && goal.achieved) {
            if (!badges.includes('weekly-goal')) badges.push('weekly-goal');
            goalStreak += 1;
            if (goalStreak >= 10 && !badges.includes('goal-streak-10')) badges.push('goal-streak-10');
          }

          return {
            currentWeekGoal: goal,
            weeklyGoals: state.weeklyGoals.map((g) => g.id === goal.id ? goal : g),
            unlockedBadges: badges,
            weeklyGoalStreak: goalStreak,
          };
        });
      },

      // Interview actions
      markQuestionPracticed: (questionId) => {
        set((state) => {
          const existing = state.practicedQuestions.find((q) => q.id === questionId);
          let updated: InterviewQuestion[];

          if (existing) {
            updated = state.practicedQuestions.map((q) =>
              q.id === questionId ? { ...q, practiced: true, lastPracticedAt: new Date().toISOString() } : q
            );
          } else {
            updated = [...state.practicedQuestions, {
              id: questionId,
              practiced: true,
              lastPracticedAt: new Date().toISOString(),
            }];
          }

          const badges = [...state.unlockedBadges];
          const practicedCount = updated.filter((q) => q.practiced).length;

          if (practicedCount >= 50 && !badges.includes('interview-ready')) badges.push('interview-ready');

          return {
            practicedQuestions: updated,
            unlockedBadges: badges,
          };
        });

        get().updateStreak();
      },

      // Level up actions
      closeLevelUpModal: () => {
        set({ showLevelUpModal: false });
      },

      checkLevelUp: () => {
        set((state) => {
          const currentLevel = calculateLevel(state.totalXP);
          if (currentLevel > state.previousLevel) {
            return {
              previousLevel: currentLevel,
              showLevelUpModal: true,
              newLevel: currentLevel,
            };
          }
          return state;
        });
      },
    }),
    {
      name: '10lpa-quest-storage',
    }
  )
);
