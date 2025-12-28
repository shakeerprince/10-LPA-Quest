'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Target,
    ChevronDown,
    ChevronRight,
    CheckCircle2,
    Circle,
    Clock,
    Zap,
    Star,
    BookOpen,
    Code,
    TrendingUp,
    ExternalLink,
    Filter,
} from 'lucide-react';
import {
    DSA_PHASES,
    DSA_TOPICS,
    DSA_PATTERNS,
    ADVANCED_CONCEPTS,
    getTotalStats,
    getPatternsByTopic,
    type DSATopic,
    type DSAPattern,
    type Phase,
} from '@/data/dsaCalendar2026';
import { useGamification } from '@/store/useGamification';
import confetti from 'canvas-confetti';

// Difficulty badge component
function DifficultyBadge({ difficulty }: { difficulty: string }) {
    const colors: Record<string, string> = {
        'Easy': 'bg-green-500/20 text-green-400 border-green-500/30',
        'Easy–Medium': 'bg-lime-500/20 text-lime-400 border-lime-500/30',
        'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Medium–Hard': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
        'Hard': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return (
        <span className={`px-2 py-0.5 text-xs rounded-full border ${colors[difficulty] || colors['Medium']}`}>
            {difficulty}
        </span>
    );
}

// Importance stars component
function ImportanceStars({ importance }: { importance: number }) {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 ${i < importance ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                />
            ))}
        </div>
    );
}

// Phase Card Component
function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl border border-gray-700/30 overflow-hidden"
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${phase.gradient} flex items-center justify-center text-xl`}
                    >
                        {phase.emoji}
                    </div>
                    <div className="text-left">
                        <h4 className="font-semibold text-white">PHASE {index + 1}: {phase.name}</h4>
                        <p className="text-sm text-gray-400">{phase.description}</p>
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-700/30"
                    >
                        <div className="p-4 space-y-4">
                            {phase.steps.map((step, stepIdx) => (
                                <div key={stepIdx} className="space-y-2">
                                    <h5 className="font-medium text-white">{step.title}</h5>
                                    <ul className="space-y-1 pl-4">
                                        {step.content.map((item, itemIdx) => (
                                            <li key={itemIdx} className="text-sm text-gray-400 flex items-start gap-2">
                                                <span className="text-purple-400 mt-1">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Topic Item Component
function TopicItem({
    topic,
    isCompleted,
    onToggle,
}: {
    topic: DSATopic;
    isCompleted: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-3 rounded-lg border transition-all cursor-pointer ${isCompleted
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-gray-800/30 border-gray-700/30 hover:border-purple-500/30'
                }`}
            onClick={onToggle}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                        <Circle className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                        <h5 className={`font-medium ${isCompleted ? 'text-green-300 line-through' : 'text-white'}`}>
                            {topic.name}
                        </h5>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {topic.duration}
                            </span>
                            <span className="text-xs text-gray-500">|</span>
                            <span className="text-xs text-gray-500">{topic.minProblems} problems</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <ImportanceStars importance={topic.importance} />
                    <DifficultyBadge difficulty={topic.difficulty} />
                    <span className="text-yellow-400 text-sm font-medium">+{topic.xp} XP</span>
                </div>
            </div>
            <div className="flex gap-1 mt-2">
                {topic.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-purple-500/10 text-purple-400 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

// Pattern Item Component
function PatternItem({
    pattern,
    isCompleted,
    onToggle,
}: {
    pattern: DSAPattern;
    isCompleted: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${isCompleted
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-gray-800/20 border-gray-700/20 hover:border-cyan-500/30'
                }`}
            onClick={onToggle}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                        <Circle className="w-4 h-4 text-gray-500" />
                    )}
                    <span className={`text-sm ${isCompleted ? 'text-green-300 line-through' : 'text-white'}`}>
                        {pattern.pattern}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{pattern.duration}</span>
                    <DifficultyBadge difficulty={pattern.difficulty} />
                    <span className="text-yellow-400 text-xs">+{pattern.xp}</span>
                </div>
            </div>
        </motion.div>
    );
}

// Pattern Group Component
function PatternGroup({
    topic,
    patterns,
    completedPatterns,
    onTogglePattern,
}: {
    topic: string;
    patterns: DSAPattern[];
    completedPatterns: string[];
    onTogglePattern: (id: string, xp: number) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const completedCount = patterns.filter((p) => completedPatterns.includes(p.id)).length;
    const progressPercent = Math.round((completedCount / patterns.length) * 100);

    return (
        <div className="border border-gray-700/30 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-3 flex items-center justify-between bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span className="font-medium text-white">{topic}</span>
                    <span className="text-xs text-gray-500">({patterns.length} patterns)</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className="text-xs text-gray-400">{completedCount}/{patterns.length}</span>
                    {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="p-3 space-y-2 border-t border-gray-700/30"
                    >
                        {patterns.map((pattern) => (
                            <PatternItem
                                key={pattern.id}
                                pattern={pattern}
                                isCompleted={completedPatterns.includes(pattern.id)}
                                onToggle={() => onTogglePattern(pattern.id, pattern.xp)}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Main Component
export function DSACalendar2026Section() {
    const { addXP } = useGamification();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'phases' | 'topics' | 'patterns'>('topics');
    const [completedTopics, setCompletedTopics] = useState<string[]>([]);
    const [completedPatterns, setCompletedPatterns] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch progress from API on mount
    useEffect(() => {
        setMounted(true);

        const fetchProgress = async () => {
            try {
                const response = await fetch('/api/dsa-calendar-progress');
                if (response.ok) {
                    const data = await response.json();
                    setCompletedTopics(data.completedTopics || []);
                    setCompletedPatterns(data.completedPatterns || []);
                }
            } catch (error) {
                console.error('Error fetching DSA Calendar progress:', error);
                // Fallback to localStorage
                const savedTopics = localStorage.getItem('10lpa-dsa-calendar-topics');
                const savedPatterns = localStorage.getItem('10lpa-dsa-calendar-patterns');
                if (savedTopics) setCompletedTopics(JSON.parse(savedTopics));
                if (savedPatterns) setCompletedPatterns(JSON.parse(savedPatterns));
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, []);

    const handleToggleTopic = async (id: string, xp: number) => {
        const isCompleting = !completedTopics.includes(id);

        // Optimistic update
        setCompletedTopics((prev) =>
            isCompleting ? [...prev, id] : prev.filter((t) => t !== id)
        );

        if (isCompleting) {
            addXP(xp);
            confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
        }

        // Save to API
        try {
            await fetch('/api/dsa-calendar-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'topic', id, xp, isCompleting }),
            });
        } catch (error) {
            // Fallback to localStorage
            const newCompleted = isCompleting
                ? [...completedTopics, id]
                : completedTopics.filter((t) => t !== id);
            localStorage.setItem('10lpa-dsa-calendar-topics', JSON.stringify(newCompleted));
        }
    };

    const handleTogglePattern = async (id: string, xp: number) => {
        const isCompleting = !completedPatterns.includes(id);

        // Optimistic update
        setCompletedPatterns((prev) =>
            isCompleting ? [...prev, id] : prev.filter((p) => p !== id)
        );

        if (isCompleting) {
            addXP(xp);
            confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 } });
        }

        // Save to API
        try {
            await fetch('/api/dsa-calendar-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'pattern', id, xp, isCompleting }),
            });
        } catch (error) {
            // Fallback to localStorage
            const newCompleted = isCompleting
                ? [...completedPatterns, id]
                : completedPatterns.filter((p) => p !== id);
            localStorage.setItem('10lpa-dsa-calendar-patterns', JSON.stringify(newCompleted));
        }
    };

    if (!mounted || loading) {
        return (
            <div className="glass-card rounded-2xl p-6 border border-orange-500/20 animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="h-32 bg-gray-700 rounded"></div>
            </div>
        );
    }

    const stats = getTotalStats(completedTopics, completedPatterns);
    const patternsByTopic = getPatternsByTopic();

    return (
        <div className="glass-card rounded-2xl p-6 border border-orange-500/20 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-400" />
                        📅 DSA Calendar 2026 | Plan of Action
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Complete roadmap from 0 → Advanced | 19 Topics + 60 Patterns | 6-10 months journey
                    </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4">
                    <div className="text-center px-4 py-2 rounded-xl bg-gray-800/50">
                        <div className="text-2xl font-bold text-white">
                            {stats.completedTopicsCount}/{stats.totalTopics}
                        </div>
                        <div className="text-xs text-gray-400">Topics</div>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-gray-800/50">
                        <div className="text-2xl font-bold text-cyan-400">
                            {stats.completedPatternsCount}/{stats.totalPatterns}
                        </div>
                        <div className="text-xs text-gray-400">Patterns</div>
                    </div>
                    <div className="text-center px-4 py-2 rounded-xl bg-gray-800/50">
                        <div className="text-2xl font-bold text-yellow-400">{stats.earnedXP}</div>
                        <div className="text-xs text-gray-400">XP Earned</div>
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
                        className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.progressPercent}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-700/30 pb-2">
                {[
                    { id: 'phases', label: '📚 Phases', icon: BookOpen },
                    { id: 'topics', label: '📊 Topics', icon: Target },
                    { id: 'patterns', label: '🎯 Patterns', icon: TrendingUp },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                : 'text-gray-400 hover:bg-gray-800/50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="space-y-4">
                {activeTab === 'phases' && (
                    <div className="space-y-3">
                        {DSA_PHASES.map((phase, idx) => (
                            <PhaseCard key={phase.id} phase={phase} index={idx} />
                        ))}

                        {/* Advanced Concepts */}
                        <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Advanced Concepts (Optional)
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {ADVANCED_CONCEPTS.map((concept, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                                    >
                                        {concept}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'topics' && (
                    <div className="space-y-2">
                        {DSA_TOPICS.map((topic) => (
                            <TopicItem
                                key={topic.id}
                                topic={topic}
                                isCompleted={completedTopics.includes(topic.id)}
                                onToggle={() => handleToggleTopic(topic.id, topic.xp)}
                            />
                        ))}
                    </div>
                )}

                {activeTab === 'patterns' && (
                    <div className="space-y-3">
                        {Object.entries(patternsByTopic).map(([topic, patterns]) => (
                            <PatternGroup
                                key={topic}
                                topic={topic}
                                patterns={patterns}
                                completedPatterns={completedPatterns}
                                onTogglePattern={handleTogglePattern}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Credit */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-700/30">
                Created by PrinceSinghhub •
                <a
                    href="https://gist.github.com/PrinceSinghhub/2ac8a1216c638e559123262dae4f1c1f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 hover:underline ml-1 inline-flex items-center gap-1"
                >
                    View Original Gist <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </div>
    );
}
