'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Trash2,
    Check,
    Code2,
    Hammer,
    BookOpen,
    Zap,
    Sparkles
} from 'lucide-react';
import { useGamification, type DailyQuest } from '@/store/useGamification';
import confetti from 'canvas-confetti';

const categories = [
    { id: 'coding', label: 'Coding', icon: Code2, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-500/30' },
    { id: 'building', label: 'Building', icon: Hammer, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-500/30' },
    { id: 'learning', label: 'Learning', icon: BookOpen, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-500/30' },
] as const;

const xpOptions = [
    { value: 10, label: 'Easy (+10 XP)', color: 'text-green-400' },
    { value: 30, label: 'Medium (+30 XP)', color: 'text-yellow-400' },
    { value: 100, label: 'Hard (+100 XP)', color: 'text-red-400' },
];

// XP Popup
function XPPopup({ xp, show }: { xp: number; show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -40, scale: 1.2 }}
                    exit={{ opacity: 0, y: -60 }}
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                >
                    <div className="text-4xl font-bold text-green-400 flex items-center gap-2 neon-text-cyan">
                        <Zap className="w-8 h-8" />
                        +{xp} XP
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Quest Item Component
function QuestItem({ quest, onComplete, onDelete }: {
    quest: DailyQuest;
    onComplete: () => void;
    onDelete: () => void;
}) {
    const [showXP, setShowXP] = useState(false);
    const category = categories.find(c => c.id === quest.category)!;
    const Icon = category.icon;

    const handleComplete = () => {
        if (!quest.completed) {
            setShowXP(true);
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8B5CF6', '#06B6D4', '#F97316', '#EC4899'],
            });
            setTimeout(() => setShowXP(false), 1500);
        }
        onComplete();
    };

    return (
        <>
            <XPPopup xp={quest.xp} show={showXP} />
            <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`relative p-4 rounded-xl border ${category.border} ${quest.completed
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-gray-800/30'
                    } transition-all duration-300`}
            >
                <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <button
                        onClick={handleComplete}
                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${quest.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-600 hover:border-purple-500 hover:bg-purple-500/10'
                            }`}
                    >
                        {quest.completed && <Check className="w-5 h-5 text-white" />}
                    </button>

                    {/* Category Icon */}
                    <div className={`p-2 rounded-lg ${category.bg}`}>
                        <Icon className={`w-5 h-5 ${category.color}`} />
                    </div>

                    {/* Quest Info */}
                    <div className="flex-1 min-w-0">
                        <div className={`font-medium ${quest.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                            {quest.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${category.bg} ${category.color}`}>
                                {category.label}
                            </span>
                            <span className="text-xs text-purple-400 flex items-center gap-1">
                                <Zap className="w-3 h-3" /> {quest.xp} XP
                            </span>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={onDelete}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Completed shine effect */}
                {quest.completed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-2 right-2"
                    >
                        <Sparkles className="w-5 h-5 text-green-400" />
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}

// Add Quest Form
function AddQuestForm({ onAdd }: { onAdd: (quest: Omit<DailyQuest, 'id' | 'completed' | 'createdAt'>) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'coding' | 'building' | 'learning'>('coding');
    const [xp, setXP] = useState(30);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({ title: title.trim(), category, xp });
        setTitle('');
        setIsOpen(false);
    };

    return (
        <div className="glass-card rounded-xl border border-purple-500/30 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors"
            >
                <div className="p-2 rounded-lg bg-purple-500/20">
                    <Plus className="w-5 h-5 text-purple-400" />
                </div>
                <span className="font-medium text-white">Add New Quest</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.form
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="border-t border-purple-500/20"
                    >
                        <div className="p-4 space-y-4">
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Quest Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Solve 5 LeetCode problems"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-500"
                                    autoFocus
                                />
                            </div>

                            {/* Category Selection */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Category</label>
                                <div className="flex gap-2">
                                    {categories.map((cat) => {
                                        const Icon = cat.icon;
                                        return (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setCategory(cat.id)}
                                                className={`flex-1 p-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${category === cat.id
                                                        ? `${cat.bg} ${cat.border} ${cat.color}`
                                                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                                <span className="text-sm">{cat.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* XP Selection */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Difficulty (XP Reward)</label>
                                <div className="flex gap-2">
                                    {xpOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setXP(option.value)}
                                            className={`flex-1 p-3 rounded-lg border transition-all ${xp === option.value
                                                    ? 'border-purple-500 bg-purple-500/10 text-white'
                                                    : 'border-gray-700 text-gray-400 hover:border-gray-600'
                                                }`}
                                        >
                                            <span className={`text-sm ${xp === option.value ? option.color : ''}`}>
                                                {option.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                            >
                                Add Quest ⚔️
                            </motion.button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function QuestsPage() {
    const { dailyQuests, addQuest, completeTask, removeQuest } = useGamification();

    const completedQuests = dailyQuests.filter(q => q.completed);
    const pendingQuests = dailyQuests.filter(q => !q.completed);
    const totalXP = completedQuests.reduce((sum, q) => sum + q.xp, 0);

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            ⚔️ Daily Quests
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        Complete quests to earn XP and maintain your streak. Every task brings you closer to 10 LPA!
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl p-4 border border-purple-500/20"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div>
                                <div className="text-2xl font-bold text-white">{completedQuests.length}/{dailyQuests.length}</div>
                                <div className="text-sm text-gray-400">Quests Completed</div>
                            </div>
                            <div className="h-10 w-px bg-gray-700" />
                            <div>
                                <div className="text-2xl font-bold text-green-400">+{totalXP} XP</div>
                                <div className="text-sm text-gray-400">Earned Today</div>
                            </div>
                        </div>
                        {dailyQuests.length > 0 && (
                            <div className="w-32">
                                <div className="text-xs text-gray-400 mb-1 text-right">
                                    {Math.round((completedQuests.length / dailyQuests.length) * 100)}% done
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(completedQuests.length / dailyQuests.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Add Quest Form */}
                <AddQuestForm onAdd={addQuest} />

                {/* Pending Quests */}
                {pendingQuests.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            📋 Pending Quests
                            <span className="text-sm text-gray-400 font-normal">({pendingQuests.length})</span>
                        </h2>
                        <AnimatePresence>
                            {pendingQuests.map((quest) => (
                                <QuestItem
                                    key={quest.id}
                                    quest={quest}
                                    onComplete={() => completeTask(quest.id)}
                                    onDelete={() => removeQuest(quest.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Completed Quests */}
                {completedQuests.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            ✅ Completed
                            <span className="text-sm text-gray-400 font-normal">({completedQuests.length})</span>
                        </h2>
                        <AnimatePresence>
                            {completedQuests.map((quest) => (
                                <QuestItem
                                    key={quest.id}
                                    quest={quest}
                                    onComplete={() => { }}
                                    onDelete={() => removeQuest(quest.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Empty State */}
                {dailyQuests.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="text-6xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No quests yet!</h3>
                        <p className="text-gray-400 mb-4">
                            Add your first daily quest above to start earning XP.
                        </p>
                        <p className="text-sm text-gray-500">
                            Tip: Start with &quot;Solve 2 LeetCode problems&quot; or &quot;Study 1 hour of DSA&quot;
                        </p>
                    </motion.div>
                )}

                {/* Suggested Quests */}
                <div className="glass-card rounded-xl p-6 border border-cyan-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        💡 Quest Ideas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { title: 'Solve 3 LeetCode Easy problems', category: 'coding' as const, xp: 30 },
                            { title: 'Solve 2 LeetCode Medium problems', category: 'coding' as const, xp: 30 },
                            { title: 'Complete 1 Striver SDE topic', category: 'coding' as const, xp: 30 },
                            { title: 'Build a React component', category: 'building' as const, xp: 30 },
                            { title: 'Study System Design for 1 hour', category: 'learning' as const, xp: 30 },
                            { title: 'Watch a DSA video tutorial', category: 'learning' as const, xp: 10 },
                            { title: 'Push code to GitHub', category: 'building' as const, xp: 10 },
                            { title: 'Complete a project feature', category: 'building' as const, xp: 100 },
                        ].map((suggestion, index) => {
                            const cat = categories.find(c => c.id === suggestion.category)!;
                            return (
                                <button
                                    key={index}
                                    onClick={() => addQuest(suggestion)}
                                    className={`p-3 rounded-lg border ${cat.border} text-left hover:bg-white/5 transition-colors group`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Plus className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                            {suggestion.title}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
