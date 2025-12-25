'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROADMAP, DSA_SHEETS, type Pillar, type Module, type Topic } from '@/data/roadmap';
import { useGamification } from '@/store/useGamification';
import {
    ChevronDown,
    ChevronRight,
    Check,
    Lock,
    ExternalLink,
    Zap,
    Target,
    BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

// XP popup component
function XPPopup({ xp, show }: { xp: number; show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -30, scale: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="absolute -top-2 right-0 text-sm font-bold text-green-400 z-10"
                >
                    +{xp} XP ⚡
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Topic Item Component
function TopicItem({ topic, onToggle, isCompleted }: {
    topic: Topic;
    onToggle: () => void;
    isCompleted: boolean;
}) {
    const [showXP, setShowXP] = useState(false);

    const handleToggle = () => {
        if (!isCompleted) {
            setShowXP(true);
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#8B5CF6', '#06B6D4', '#F97316'],
            });
            setTimeout(() => setShowXP(false), 1000);
        }
        onToggle();
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'text-green-400 bg-green-400/10';
            case 'medium': return 'text-yellow-400 bg-yellow-400/10';
            case 'hard': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    return (
        <motion.div
            layout
            className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${isCompleted
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-gray-800/30 border border-gray-700/30 hover:border-purple-500/30'
                }`}
        >
            <XPPopup xp={topic.xp} show={showXP} />

            <button
                onClick={handleToggle}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isCompleted
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-600 hover:border-purple-500'
                    }`}
            >
                {isCompleted && <Check className="w-4 h-4 text-white" />}
            </button>

            <div className="flex-1 min-w-0">
                <div className={`font-medium ${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>
                    {topic.name}
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                    </span>
                    <span className="text-xs text-purple-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {topic.xp} XP
                    </span>
                    {topic.problems && (
                        <span className="text-xs text-gray-500">
                            {topic.problems} problems
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Module Component
function ModuleCard({ module, pillarColor }: { module: Module; pillarColor: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { completedTopics, completeTopic, uncompleteTopic } = useGamification();

    const completedCount = module.topics.filter(t => completedTopics.includes(t.id)).length;
    const totalTopics = module.topics.length;
    const progressPercent = (completedCount / totalTopics) * 100;

    return (
        <motion.div
            layout
            className="glass-card rounded-xl border border-gray-700/30 overflow-hidden"
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
            >
                <div className="text-3xl">{module.icon}</div>
                <div className="flex-1 text-left">
                    <h3 className="font-semibold text-white">{module.title}</h3>
                    <p className="text-sm text-gray-400">{module.description}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-sm font-medium text-white">
                            {completedCount}/{totalTopics}
                        </div>
                        <div className="text-xs text-gray-500">completed</div>
                    </div>
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: pillarColor }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-700/30"
                    >
                        <div className="p-4 space-y-2">
                            {module.topics.map((topic) => (
                                <TopicItem
                                    key={topic.id}
                                    topic={topic}
                                    isCompleted={completedTopics.includes(topic.id)}
                                    onToggle={() => {
                                        if (completedTopics.includes(topic.id)) {
                                            uncompleteTopic(topic.id, topic.xp);
                                        } else {
                                            completeTopic(topic.id, topic.xp);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Pillar Section Component
function PillarSection({ pillar }: { pillar: Pillar }) {
    const { completedTopics } = useGamification();

    const totalTopics = pillar.modules.reduce((sum, m) => sum + m.topics.length, 0);
    const completedCount = pillar.modules.reduce(
        (sum, m) => sum + m.topics.filter(t => completedTopics.includes(t.id)).length,
        0
    );
    const progressPercent = totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            <div className={`p-6 rounded-2xl bg-gradient-to-r ${pillar.gradient} bg-opacity-10`}>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">{pillar.name}</h2>
                        <p className="text-gray-300 text-sm mt-1">{pillar.description}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">{Math.round(progressPercent)}%</div>
                        <div className="text-sm text-gray-300">{completedCount}/{totalTopics} topics</div>
                    </div>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white/80 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </div>
            </div>

            <div className="space-y-3">
                {pillar.modules.map((module) => (
                    <ModuleCard key={module.id} module={module} pillarColor={pillar.color} />
                ))}
            </div>
        </motion.div>
    );
}

// DSA Sheets Section
function DSASheetsSection() {
    return (
        <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                DSA Practice Sheets
            </h3>
            <p className="text-gray-400 text-sm mb-6">
                Curated problem lists from top educators. Pick one and master it!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DSA_SHEETS.map((sheet, index) => (
                    <motion.a
                        key={sheet.id}
                        href={sheet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl border border-gray-700/30 hover:border-purple-500/30 bg-gray-800/30 hover:bg-gray-800/50 transition-all group"
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-3xl">{sheet.icon}</div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                                    {sheet.name}
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h4>
                                <p className="text-xs text-gray-400 mt-1">{sheet.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span
                                        className="text-xs px-2 py-0.5 rounded-full"
                                        style={{ backgroundColor: `${sheet.color}20`, color: sheet.color }}
                                    >
                                        {sheet.problems} problems
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
}

export default function RoadmapPage() {
    const [activeTab, setActiveTab] = useState<string>('all');

    const tabs = [
        { id: 'all', label: 'All Pillars', icon: Target },
        ...ROADMAP.map(p => ({ id: p.id, label: p.name, icon: Target })),
    ];

    const filteredPillars = activeTab === 'all'
        ? ROADMAP
        : ROADMAP.filter(p => p.id === activeTab);

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            🗺️ Skill Tree
                        </span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Your complete roadmap to cracking a 10 LPA job. Track your progress through DSA,
                        Development, and CS Fundamentals. Check off topics as you master them!
                    </p>
                </motion.div>

                {/* DSA Sheets */}
                <DSASheetsSection />

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Pillars */}
                <div className="space-y-12">
                    {filteredPillars.map((pillar) => (
                        <PillarSection key={pillar.id} pillar={pillar} />
                    ))}
                </div>
            </div>
        </div>
    );
}
