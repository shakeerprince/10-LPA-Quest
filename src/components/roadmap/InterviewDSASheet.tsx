'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    INTERVIEW_DSA_SHEET,
    getInterviewSheetStats,
    TopicGroup,
    InterviewProblem
} from '@/data/interviewDSASheet';
import { useGamification } from '@/store/useGamification';
import {
    ChevronDown,
    ChevronRight,
    Check,
    ExternalLink,
    Zap,
    Target,
    Trophy,
    Filter,
    BookOpen,
    BarChart3
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Problem Item Component
function ProblemItem({
    problem,
    isCompleted,
    onToggle
}: {
    problem: InterviewProblem;
    isCompleted: boolean;
    onToggle: () => void;
}) {
    const [showXP, setShowXP] = useState(false);

    const handleToggle = () => {
        if (!isCompleted) {
            setShowXP(true);
            confetti({
                particleCount: 20,
                spread: 50,
                origin: { y: 0.8 },
                colors: ['#8B5CF6', '#06B6D4', '#22C55E'],
            });
            setTimeout(() => setShowXP(false), 1000);
        }
        onToggle();
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-400 bg-green-400/10 border-green-500/30';
            case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-500/30';
            case 'Hard': return 'text-red-400 bg-red-400/10 border-red-500/30';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-500/30';
        }
    };

    return (
        <div
            className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isCompleted
                ? 'bg-green-500/10 border border-green-500/30'
                : 'bg-gray-800/30 border border-gray-700/30 hover:border-purple-500/30'
                }`}
        >
            {/* XP Popup */}
            <AnimatePresence>
                {showXP && (
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: 1, y: -20, scale: 1 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="absolute -top-2 right-2 text-sm font-bold text-green-400 z-10"
                    >
                        +{problem.xp} XP ⚡
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Checkbox */}
            <button
                onClick={handleToggle}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${isCompleted
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-600 hover:border-purple-500'
                    }`}
            >
                {isCompleted && <Check className="w-4 h-4 text-white" />}
            </button>

            {/* Problem Number */}
            <span className="text-xs text-gray-500 w-6 flex-shrink-0">#{problem.id}</span>

            {/* Problem Name */}
            <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 font-medium hover:text-purple-400 transition-colors flex items-center gap-1 group ${isCompleted ? 'text-gray-400 line-through' : 'text-white'
                    }`}
            >
                {problem.name}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Difficulty Badge */}
            <span className={`text-xs px-2 py-0.5 rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
            </span>

            {/* XP */}
            <span className="text-xs text-purple-400 flex items-center gap-1 flex-shrink-0">
                <Zap className="w-3 h-3" />
                {problem.xp}
            </span>
        </div>
    );
}

// Topic Group Component
function TopicGroupCard({
    group,
    completedProblems,
    onToggleProblem
}: {
    group: TopicGroup;
    completedProblems: number[];
    onToggleProblem: (id: number, xp: number) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const completedCount = group.problems.filter(p => completedProblems.includes(p.id)).length;
    const totalCount = group.problems.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);
    const totalXP = group.problems.reduce((sum, p) => sum + p.xp, 0);
    const earnedXP = group.problems
        .filter(p => completedProblems.includes(p.id))
        .reduce((sum, p) => sum + p.xp, 0);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl border border-gray-700/30 overflow-hidden"
        >
            {/* Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-full p-4 flex items-center gap-4 text-left transition-colors ${completedCount === totalCount ? 'bg-green-500/5' : 'hover:bg-gray-800/50'
                    }`}
            >
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${group.color}20` }}
                >
                    {group.icon}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white">{group.name}</h3>
                        {completedCount === totalCount && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
                                <Trophy className="w-3 h-3" /> Complete!
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span>{completedCount}/{totalCount} solved</span>
                        <span className="text-yellow-400">{earnedXP}/{totalXP} XP</span>
                    </div>
                </div>

                {/* Progress */}
                <div className="hidden sm:flex items-center gap-3">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                backgroundColor: group.color,
                                width: `${progressPercent}%`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className="text-sm font-medium text-white w-10">{progressPercent}%</span>
                </div>

                {/* Expand Icon */}
                {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
            </button>

            {/* Problems List */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-700/30"
                    >
                        <div className="p-4 space-y-2">
                            {group.problems.map((problem) => (
                                <ProblemItem
                                    key={problem.id}
                                    problem={problem}
                                    isCompleted={completedProblems.includes(problem.id)}
                                    onToggle={() => onToggleProblem(problem.id, problem.xp)}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Main Component
export function InterviewDSASheetSection() {
    const { addXP } = useGamification();
    const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Store completed problem IDs
    const [completedProblems, setCompletedProblems] = useState<number[]>([]);

    // Fetch completed problems from database on mount
    useEffect(() => {
        setMounted(true);

        const fetchProgress = async () => {
            try {
                const response = await fetch('/api/dsa-progress');
                if (response.ok) {
                    const data = await response.json();
                    setCompletedProblems(data.completedProblems || []);
                }
            } catch (error) {
                console.error('Error fetching DSA progress:', error);
                // Fallback to localStorage if API fails
                const saved = localStorage.getItem('10lpa-interview-sheet-completed');
                if (saved) {
                    setCompletedProblems(JSON.parse(saved));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    const handleToggleProblem = async (id: number, xp: number) => {
        const isCompleting = !completedProblems.includes(id);

        // Optimistic update
        setCompletedProblems(prev =>
            isCompleting ? [...prev, id] : prev.filter(p => p !== id)
        );

        if (isCompleting) {
            addXP(xp);
        }

        // Save to database
        setSaving(true);
        try {
            const response = await fetch('/api/dsa-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ problemId: id, xp, isCompleting }),
            });

            if (response.ok) {
                const data = await response.json();
                // Sync with server state
                setCompletedProblems(data.completedProblems);
            } else {
                // Revert on error
                setCompletedProblems(prev =>
                    isCompleting ? prev.filter(p => p !== id) : [...prev, id]
                );
            }
        } catch (error) {
            console.error('Error saving DSA progress:', error);
            // Fallback: save to localStorage
            const newCompleted = isCompleting
                ? [...completedProblems, id]
                : completedProblems.filter(p => p !== id);
            localStorage.setItem('10lpa-interview-sheet-completed', JSON.stringify(newCompleted));
        } finally {
            setSaving(false);
        }
    };

    if (!mounted || loading) {
        return (
            <div className="glass-card rounded-2xl p-6 border border-purple-500/20 animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="h-32 bg-gray-700 rounded"></div>
            </div>
        );
    }

    const stats = getInterviewSheetStats(completedProblems);

    // Filter groups by difficulty
    const filteredGroups = INTERVIEW_DSA_SHEET.map(group => {
        if (difficultyFilter === 'all') return group;
        return {
            ...group,
            problems: group.problems.filter(p => p.difficulty === difficultyFilter),
        };
    }).filter(group => group.problems.length > 0);

    return (
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Target className="w-5 h-5 text-cyan-400" />
                        🔥 Top Interview Questions
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                        85 most-asked technical interview questions. Solve them all to maximize your chances!
                    </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4">
                    <div className="text-center px-4 py-2 rounded-xl bg-gray-800/50">
                        <div className="text-2xl font-bold text-white">{stats.completedCount}/{stats.totalProblems}</div>
                        <div className="text-xs text-gray-400">Solved</div>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-gray-800/50">
                        <div className="text-2xl font-bold text-yellow-400">{stats.earnedXP}</div>
                        <div className="text-xs text-gray-400">XP Earned</div>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-gray-800/50">
                        <div className="text-2xl font-bold text-purple-400">{stats.progressPercent}%</div>
                        <div className="text-xs text-gray-400">Complete</div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="text-white font-medium">{stats.progressPercent}%</span>
                </div>
                <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.progressPercent}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        Easy: {stats.byDifficulty.Easy.completed}/{stats.byDifficulty.Easy.total}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                        Medium: {stats.byDifficulty.Medium.completed}/{stats.byDifficulty.Medium.total}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                        Hard: {stats.byDifficulty.Hard.completed}/{stats.byDifficulty.Hard.total}
                    </span>
                </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400 mr-2">Filter:</span>
                {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
                    <button
                        key={diff}
                        onClick={() => setDifficultyFilter(diff)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${difficultyFilter === diff
                            ? diff === 'Easy' ? 'bg-green-500 text-white'
                                : diff === 'Medium' ? 'bg-yellow-500 text-black'
                                    : diff === 'Hard' ? 'bg-red-500 text-white'
                                        : 'bg-purple-500 text-white'
                            : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        {diff === 'all' ? 'All' : diff}
                    </button>
                ))}
            </div>

            {/* Topic Groups */}
            <div className="space-y-4">
                {filteredGroups.map((group) => (
                    <TopicGroupCard
                        key={group.id}
                        group={group}
                        completedProblems={completedProblems}
                        onToggleProblem={handleToggleProblem}
                    />
                ))}
            </div>

            {/* Credit */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-700/30">
                Curated by Dheeraj & Arvind Sharma •
                <a
                    href="https://docs.google.com/spreadsheets/d/1UMUPQptHICj3ihVFReS2aRGbY0fvTmyR9x2kmE6aHGs/edit?gid=0#gid=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline ml-1"
                >
                    View Original Sheet
                </a>
            </div>
        </div>
    );
}
