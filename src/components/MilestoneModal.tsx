'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Sparkles, Star, Award, Zap, Target, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MilestoneModalProps {
    isOpen: boolean;
    milestone: number; // 25, 50, 75, or 100
    onClose: () => void;
}

const MILESTONE_DATA: Record<number, {
    emoji: string;
    title: string;
    description: string;
    color: string;
    gradient: string;
    xpBonus: number;
}> = {
    25: {
        emoji: '🌱',
        title: 'Seedling Sprouted!',
        description: "You've completed 25% of your journey. The foundations are set!",
        color: 'text-green-400',
        gradient: 'from-green-500 to-emerald-500',
        xpBonus: 100,
    },
    50: {
        emoji: '🌿',
        title: 'Halfway Hero!',
        description: "50% done! You're building serious momentum. Keep crushing it!",
        color: 'text-cyan-400',
        gradient: 'from-cyan-500 to-blue-500',
        xpBonus: 250,
    },
    75: {
        emoji: '🌳',
        title: 'Thriving Master!',
        description: "75% complete! You're in the final stretch. Victory is near!",
        color: 'text-purple-400',
        gradient: 'from-purple-500 to-pink-500',
        xpBonus: 500,
    },
    100: {
        emoji: '🏆',
        title: 'LEGENDARY CHAMPION!',
        description: "You've completed your entire roadmap! You're ready to conquer that 10 LPA job!",
        color: 'text-yellow-400',
        gradient: 'from-yellow-500 to-orange-500',
        xpBonus: 1000,
    },
};

export function MilestoneModal({ isOpen, milestone, onClose }: MilestoneModalProps) {
    const [showContent, setShowContent] = useState(false);
    const data = MILESTONE_DATA[milestone] || MILESTONE_DATA[25];

    useEffect(() => {
        if (isOpen) {
            setShowContent(true);

            // Epic confetti celebration
            const duration = milestone === 100 ? 5000 : 3000;
            const end = Date.now() + duration;

            const colors = milestone === 100
                ? ['#FFD700', '#FFA500', '#FF6347', '#8B5CF6', '#06B6D4']
                : ['#8B5CF6', '#06B6D4', '#22C55E'];

            (function frame() {
                confetti({
                    particleCount: milestone === 100 ? 7 : 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors,
                });
                confetti({
                    particleCount: milestone === 100 ? 7 : 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        }
    }, [isOpen, milestone]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="relative w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`relative rounded-3xl border-2 border-white/20 overflow-hidden bg-gradient-to-br ${data.gradient} p-1`}>
                            <div className="bg-gray-900/95 rounded-3xl p-8 text-center relative overflow-hidden">
                                {/* Animated background stars */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-white rounded-full"
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                            }}
                                            animate={{
                                                opacity: [0.2, 1, 0.2],
                                                scale: [1, 1.5, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: Math.random() * 2,
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white/70" />
                                </button>

                                {/* Milestone badge */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="relative inline-block mb-6"
                                >
                                    <div className={`text-8xl filter drop-shadow-2xl`}>
                                        {data.emoji}
                                    </div>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                        className="absolute -inset-4 border-4 border-dashed border-white/20 rounded-full"
                                    />
                                </motion.div>

                                {/* Title */}
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className={`text-3xl font-bold ${data.color} mb-2`}
                                >
                                    {data.title}
                                </motion.h2>

                                {/* Milestone percentage */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: 'spring' }}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${data.gradient} text-white font-bold text-xl mb-4`}
                                >
                                    <Target className="w-5 h-5" />
                                    {milestone}% Complete
                                </motion.div>

                                {/* Description */}
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-300 mb-6"
                                >
                                    {data.description}
                                </motion.p>

                                {/* XP Bonus */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: 'spring' }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400"
                                >
                                    <Zap className="w-6 h-6" />
                                    <span className="text-2xl font-bold">+{data.xpBonus} XP</span>
                                    <span className="text-sm">Bonus!</span>
                                </motion.div>

                                {/* Achievement unlocked text */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-6 flex items-center justify-center gap-2 text-gray-500"
                                >
                                    <Award className="w-4 h-4" />
                                    <span className="text-sm">Achievement Unlocked</span>
                                </motion.div>

                                {/* Continue button */}
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className={`mt-6 w-full py-4 rounded-xl bg-gradient-to-r ${data.gradient} text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow`}
                                >
                                    Keep Going! 🚀
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook to track and trigger milestones
export function useMilestoneTracker(progressPercent: number) {
    const [lastMilestone, setLastMilestone] = useState<number>(0);
    const [showMilestone, setShowMilestone] = useState(false);
    const [currentMilestone, setCurrentMilestone] = useState(25);

    useEffect(() => {
        // Load last milestone from localStorage
        const saved = localStorage.getItem('10lpa-last-milestone');
        if (saved) {
            setLastMilestone(parseInt(saved, 10));
        }
    }, []);

    useEffect(() => {
        const milestones = [25, 50, 75, 100];

        for (const milestone of milestones) {
            if (progressPercent >= milestone && lastMilestone < milestone) {
                setCurrentMilestone(milestone);
                setShowMilestone(true);
                setLastMilestone(milestone);
                localStorage.setItem('10lpa-last-milestone', milestone.toString());
                break;
            }
        }
    }, [progressPercent, lastMilestone]);

    const closeMilestone = () => {
        setShowMilestone(false);
    };

    return {
        showMilestone,
        currentMilestone,
        closeMilestone,
    };
}
