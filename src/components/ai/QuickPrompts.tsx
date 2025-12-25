'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Briefcase, Lightbulb, Sparkles } from 'lucide-react';
import { QUICK_PROMPTS } from '@/lib/gemini';

interface QuickPromptsProps {
    onSelectPrompt: (prompt: string) => void;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { id: 'dsa', label: 'DSA', icon: Brain, color: 'from-purple-500 to-violet-500' },
    { id: 'webdev', label: 'Web Dev', icon: Code, color: 'from-cyan-500 to-blue-500' },
    { id: 'systemDesign', label: 'System Design', icon: Lightbulb, color: 'from-amber-500 to-orange-500' },
    { id: 'interview', label: 'Interview', icon: Briefcase, color: 'from-emerald-500 to-teal-500' },
];

export function QuickPrompts({ onSelectPrompt, activeCategory, onCategoryChange }: QuickPromptsProps) {
    const prompts = QUICK_PROMPTS[activeCategory as keyof typeof QUICK_PROMPTS] || [];

    return (
        <div className="space-y-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;

                    return (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {category.label}
                        </motion.button>
                    );
                })}
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2">
                {prompts.map((prompt, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectPrompt(prompt)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/50 text-sm text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                    >
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        {prompt}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
