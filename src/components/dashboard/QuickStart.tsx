'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Swords, Code2, Building2 } from 'lucide-react';

const quickLinks = [
    {
        title: 'Practice DSA',
        description: 'Solve problems from Striver & NeetCode sheets',
        icon: Swords,
        href: '/roadmap?pillar=dsa',
        color: 'from-purple-500 to-violet-600',
        borderColor: 'border-purple-500/30',
        iconBg: 'bg-purple-500/20',
    },
    {
        title: 'Build Projects',
        description: 'Create portfolio-worthy applications',
        icon: Code2,
        href: '/roadmap?pillar=development',
        color: 'from-cyan-500 to-blue-600',
        borderColor: 'border-cyan-500/30',
        iconBg: 'bg-cyan-500/20',
    },
    {
        title: 'System Design',
        description: 'Learn scalability & architecture patterns',
        icon: Building2,
        href: '/roadmap?pillar=cs-fundamentals',
        color: 'from-orange-500 to-red-600',
        borderColor: 'border-orange-500/30',
        iconBg: 'bg-orange-500/20',
    },
];

export function QuickStart() {
    return (
        <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                🚀 Quick Start
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickLinks.map((link, index) => {
                    const Icon = link.icon;

                    return (
                        <motion.div
                            key={link.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className={`block p-4 rounded-xl border ${link.borderColor} bg-gradient-to-br from-gray-900/50 to-gray-800/30 hover:from-gray-800/50 hover:to-gray-700/30 transition-all duration-300 group`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${link.iconBg}`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                                            {link.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1">{link.description}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
