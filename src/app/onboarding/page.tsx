'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Rocket, Target, Clock, Building2, ChevronRight, ChevronLeft,
    Sparkles, Code, Server, Layers, Briefcase, Zap, CheckCircle2
} from 'lucide-react';
import { generateRoadmap, RoadmapRole, CompanyType, Timeframe } from '@/lib/roadmapGenerator';
import { useRoadmapStore } from '@/store/useRoadmapStore';

type Step = 'welcome' | 'role' | 'timeframe' | 'company' | 'complete';

const ROLES = [
    { id: 'full-stack', name: 'Full Stack Developer', icon: Layers, description: 'Frontend + Backend + Database' },
    { id: 'frontend', name: 'Frontend Developer', icon: Code, description: 'React, Next.js, UI/UX' },
    { id: 'backend', name: 'Backend Developer', icon: Server, description: 'APIs, Databases, System Design' },
    { id: 'sde', name: 'SDE (General)', icon: Briefcase, description: 'DSA focused, any stack' },
];

const TIMEFRAMES = [
    { id: '3_months', name: '3 Months', description: 'Intensive preparation', icon: Zap, intensity: 'High' },
    { id: '6_months', name: '6 Months', description: 'Balanced approach', icon: Clock, intensity: 'Moderate' },
];

const COMPANIES = [
    { id: 'FAANG', name: 'FAANG / Big Tech', description: 'Google, Amazon, Meta, etc.', color: 'from-blue-500 to-purple-500' },
    { id: 'Startups', name: 'Startups', description: 'Fast-paced, full-stack focus', color: 'from-orange-500 to-red-500' },
    { id: 'Service_Based', name: 'Service Based', description: 'TCS, Infosys, Wipro, etc.', color: 'from-green-500 to-teal-500' },
    { id: 'Mixed', name: 'Mixed / All Types', description: 'Balanced preparation', color: 'from-pink-500 to-violet-500' },
];

export default function OnboardingPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [step, setStep] = useState<Step>('welcome');
    const [selectedRole, setSelectedRole] = useState('full-stack');
    const [selectedTimeframe, setSelectedTimeframe] = useState('6_months');
    const [selectedCompany, setSelectedCompany] = useState('Mixed');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps: Step[] = ['welcome', 'role', 'timeframe', 'company', 'complete'];
    const currentStepIndex = steps.indexOf(step);

    const nextStep = () => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
            setStep(steps[nextIndex]);
        }
    };

    const prevStep = () => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setStep(steps[prevIndex]);
        }
    };

    const handleComplete = async () => {
        setIsSubmitting(true);
        try {
            // Calculate target date based on timeframe
            const startDate = new Date();
            const months = selectedTimeframe === '3_months' ? 3 : 6;
            const targetDate = new Date(startDate);
            targetDate.setMonth(targetDate.getMonth() + months);

            // Generate personalized roadmap based on onboarding answers
            const generatedRoadmap = generateRoadmap(
                selectedRole as RoadmapRole,
                selectedTimeframe as Timeframe,
                selectedCompany as CompanyType
            );

            // Store roadmap in Zustand (persisted to localStorage)
            useRoadmapStore.getState().setRoadmap(generatedRoadmap, startDate);

            // Save onboarding data to database
            await fetch('/api/user/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetRole: selectedRole,
                    timeframe: selectedTimeframe,
                    targetCompany: selectedCompany,
                    startDate: startDate.toISOString(),
                    targetDate: targetDate.toISOString(),
                    onboardingComplete: true,
                }),
            });

            setStep('complete');

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                router.push('/');
                router.refresh();
            }, 2000);
        } catch (error) {
            console.error('Onboarding error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800">
                <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                    {/* Welcome Step */}
                    {step === 'welcome' && (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-6"
                            >
                                <Rocket className="w-12 h-12 text-white" />
                            </motion.div>
                            <h1 className="text-4xl font-bold text-white mb-4">
                                Welcome{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}! 🎉
                            </h1>
                            <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                                Let&apos;s personalize your journey to crack that 10 LPA job!
                            </p>
                            <button
                                onClick={nextStep}
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all inline-flex items-center gap-2"
                            >
                                Let&apos;s Go! <ChevronRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* Role Step */}
                    {step === 'role' && (
                        <motion.div
                            key="role"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-white mb-2">What role are you targeting?</h2>
                                <p className="text-gray-400">This helps us customize your study plan</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {ROLES.map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`p-5 rounded-xl border-2 text-left transition-all ${selectedRole === role.id
                                            ? 'border-purple-500 bg-purple-500/10'
                                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                            }`}
                                    >
                                        <role.icon className={`w-8 h-8 mb-3 ${selectedRole === role.id ? 'text-purple-400' : 'text-gray-400'}`} />
                                        <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                                        <p className="text-sm text-gray-400">{role.description}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <button onClick={prevStep} className="px-6 py-3 text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronLeft className="w-5 h-5" /> Back
                                </button>
                                <button onClick={nextStep} className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
                                    Continue <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Timeframe Step */}
                    {step === 'timeframe' && (
                        <motion.div
                            key="timeframe"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-white mb-2">How much time do you have?</h2>
                                <p className="text-gray-400">We&apos;ll adjust the pace accordingly</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {TIMEFRAMES.map((tf) => (
                                    <button
                                        key={tf.id}
                                        onClick={() => setSelectedTimeframe(tf.id)}
                                        className={`p-6 rounded-xl border-2 text-left transition-all ${selectedTimeframe === tf.id
                                            ? 'border-cyan-500 bg-cyan-500/10'
                                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                            }`}
                                    >
                                        <tf.icon className={`w-10 h-10 mb-3 ${selectedTimeframe === tf.id ? 'text-cyan-400' : 'text-gray-400'}`} />
                                        <h3 className="text-xl font-semibold text-white">{tf.name}</h3>
                                        <p className="text-sm text-gray-400 mb-2">{tf.description}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${tf.intensity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                                            }`}>
                                            {tf.intensity} Intensity
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <button onClick={prevStep} className="px-6 py-3 text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronLeft className="w-5 h-5" /> Back
                                </button>
                                <button onClick={nextStep} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
                                    Continue <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Company Step */}
                    {step === 'company' && (
                        <motion.div
                            key="company"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <div className="text-center mb-8">
                                <Building2 className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-white mb-2">Target company type?</h2>
                                <p className="text-gray-400">Different companies need different prep strategies</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {COMPANIES.map((company) => (
                                    <button
                                        key={company.id}
                                        onClick={() => setSelectedCompany(company.id)}
                                        className={`p-5 rounded-xl border-2 text-left transition-all ${selectedCompany === company.id
                                            ? 'border-pink-500 bg-pink-500/10'
                                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${company.color} mb-3 flex items-center justify-center`}>
                                            <Building2 className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{company.name}</h3>
                                        <p className="text-sm text-gray-400">{company.description}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <button onClick={prevStep} className="px-6 py-3 text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <ChevronLeft className="w-5 h-5" /> Back
                                </button>
                                <button
                                    onClick={handleComplete}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Complete Setup'} <Sparkles className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Complete Step */}
                    {step === 'complete' && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-6"
                            >
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </motion.div>
                            <h1 className="text-4xl font-bold text-white mb-4">You&apos;re All Set! 🚀</h1>
                            <p className="text-xl text-gray-400 mb-4">
                                Your personalized journey begins now.
                            </p>
                            <p className="text-gray-500">Redirecting to dashboard...</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
