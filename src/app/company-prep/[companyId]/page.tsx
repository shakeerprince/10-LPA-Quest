'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getCompanyById } from '@/data/companyData';
import { getQuestionsByCompany, CompanyQuestion } from '@/data/companyQuestions';
import { getInsightsByCompany, CommunityInsight } from '@/data/communityInsights';
import { useCompanyPrep } from '@/store/useCompanyPrep';
import {
    ArrowLeft, ExternalLink, Check, Bookmark, Star, Clock,
    MessageSquare, DollarSign, Users, ChevronDown, ChevronUp,
    Filter, Lightbulb, AlertTriangle, Trophy, Target
} from 'lucide-react';

type TabId = 'overview' | 'questions' | 'process' | 'insights' | 'compensation';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <Target className="w-4 h-4" /> },
    { id: 'questions', label: 'Questions', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'process', label: 'Interview Process', icon: <Users className="w-4 h-4" /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'compensation', label: 'Compensation', icon: <DollarSign className="w-4 h-4" /> },
];

function QuestionItem({ question, companyId }: { question: CompanyQuestion; companyId: string }) {
    const { solvedQuestions, bookmarkedQuestions, markQuestionSolved, unmarkQuestionSolved, toggleBookmark } = useCompanyPrep();
    const isSolved = solvedQuestions[companyId]?.includes(question.id) || false;
    const isBookmarked = bookmarkedQuestions.includes(question.id);

    const difficultyColor = {
        Easy: 'text-green-400 bg-green-400/10',
        Medium: 'text-yellow-400 bg-yellow-400/10',
        Hard: 'text-red-400 bg-red-400/10',
    }[question.difficulty];

    return (
        <motion.div
            layout
            className={`p-4 rounded-xl border transition-all ${isSolved
                ? 'bg-green-500/10 border-green-500/30'
                : 'glass-card border-gray-700 hover:border-purple-500/30'
                }`}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                        onClick={() => isSolved ? unmarkQuestionSolved(companyId, question.id) : markQuestionSolved(companyId, question.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSolved ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-purple-500'
                            }`}
                    >
                        {isSolved && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <div className="flex-1 min-w-0">
                        <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-purple-400 font-medium truncate flex items-center gap-2"
                        >
                            {question.title}
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {question.topics.slice(0, 3).map((topic) => (
                                <span key={topic} className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>
                        {question.difficulty}
                    </span>
                    <button
                        onClick={() => toggleBookmark(question.id)}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function InsightCard({ insight }: { insight: CommunityInsight }) {
    const typeStyles = {
        tip: { icon: <Lightbulb className="w-4 h-4" />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
        experience: { icon: <MessageSquare className="w-4 h-4" />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        secret: { icon: <Star className="w-4 h-4" />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        negotiation: { icon: <DollarSign className="w-4 h-4" />, color: 'text-green-400', bg: 'bg-green-400/10' },
        warning: { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-400', bg: 'bg-red-400/10' },
    }[insight.type];

    return (
        <motion.div layout className="glass-card p-4 rounded-xl border border-gray-700">
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${typeStyles.bg}`}>
                    <span className={typeStyles.color}>{typeStyles.icon}</span>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{insight.title}</h4>
                        <span className="text-xs text-gray-500">via {insight.source}</span>
                    </div>
                    <p className="text-sm text-gray-400">{insight.content}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Trophy className="w-3 h-3" />
                        {insight.upvotes} upvotes
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function CompanyDetailPage() {
    const params = useParams();
    const companyId = params.companyId as string;
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [frequencyFilter, setFrequencyFilter] = useState<string>('all');
    const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

    const company = getCompanyById(companyId);
    const questions = getQuestionsByCompany(companyId);
    const insights = getInsightsByCompany(companyId);
    const { solvedQuestions } = useCompanyPrep();

    const filteredQuestions = useMemo(() => {
        return questions.filter((q) => {
            if (frequencyFilter !== 'all' && q.frequency !== frequencyFilter) return false;
            if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
            return true;
        });
    }, [questions, frequencyFilter, difficultyFilter]);

    const solvedCount = solvedQuestions[companyId]?.length || 0;
    const progress = questions.length > 0 ? Math.round((solvedCount / questions.length) * 100) : 0;

    if (!company) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Company not found</h1>
                    <Link href="/company-prep" className="text-purple-400 hover:underline">
                        ← Back to companies
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link href="/company-prep" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Companies
                    </Link>

                    <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div
                                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                                style={{ background: `${company.color}20`, border: `2px solid ${company.color}` }}
                            >
                                {company.logo}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-white mb-2">{company.name}</h1>
                                <p className="text-gray-400 mb-3">{company.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {company.interviewStyle.map((style) => (
                                        <span key={style} className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
                                            {style}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">{progress}%</div>
                                <p className="text-sm text-gray-400">{solvedCount}/{questions.length} solved</p>
                                <div className="w-32 h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                    : 'glass-card text-gray-400 hover:text-white'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        {activeTab === 'overview' && (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="glass-card rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between"><span className="text-gray-400">Interview Rounds</span><span className="text-white">{company.interviewRounds}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">Difficulty</span><span className="text-white">{company.difficulty}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">Tier</span><span className="text-white">{company.tier}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">Total Questions</span><span className="text-white">{questions.length}</span></div>
                                    </div>
                                </div>
                                <div className="glass-card rounded-xl p-6 border border-gray-700">
                                    <h3 className="text-lg font-semibold text-white mb-4">Compensation</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between"><span className="text-gray-400">India</span><span className="text-green-400 font-semibold">{company.avgCompensation.india}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-400">US</span><span className="text-cyan-400 font-semibold">{company.avgCompensation.us}</span></div>
                                    </div>
                                    <a href={company.careersUrl} target="_blank" rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                                        Visit Careers Page <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        )}

                        {activeTab === 'questions' && (
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <select value={frequencyFilter} onChange={(e) => setFrequencyFilter(e.target.value)}
                                        className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm">
                                        <option value="all">All Time</option>
                                        <option value="Last30Days">Last 30 Days</option>
                                        <option value="Last60Days">Last 60 Days</option>
                                        <option value="Last90Days">Last 90 Days</option>
                                    </select>
                                    <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}
                                        className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm">
                                        <option value="all">All Difficulty</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    {filteredQuestions.map((q) => (
                                        <QuestionItem key={q.id} question={q} companyId={companyId} />
                                    ))}
                                    {filteredQuestions.length === 0 && (
                                        <p className="text-center text-gray-500 py-8">No questions found for this filter</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'process' && insights?.interviewProcess && (
                            <div className="space-y-4">
                                {insights.interviewProcess.map((round, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                        className="glass-card rounded-xl p-5 border border-gray-700 relative">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">{i + 1}</div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white">{round.name}</h4>
                                                <p className="text-sm text-gray-400">{round.duration} • {round.description}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 pl-14">
                                            <p className="text-xs text-gray-500 mb-1">Tips:</p>
                                            <ul className="space-y-1">
                                                {round.tips.map((tip, j) => (
                                                    <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                                                        <span className="text-cyan-400">•</span> {tip}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'insights' && (
                            <div className="space-y-4">
                                {insights?.insights.map((insight) => (
                                    <InsightCard key={insight.id} insight={insight} />
                                ))}
                                {insights?.commonMistakes && (
                                    <div className="glass-card rounded-xl p-5 border border-red-500/20">
                                        <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" /> Common Mistakes
                                        </h4>
                                        <ul className="space-y-2">
                                            {insights.commonMistakes.map((m, i) => (
                                                <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                                                    <span className="text-red-400">✗</span> {m}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {!insights && <p className="text-center text-gray-500 py-8">No insights available yet</p>}
                            </div>
                        )}

                        {activeTab === 'compensation' && (
                            <div className="glass-card rounded-xl p-6 border border-gray-700">
                                <h3 className="text-xl font-semibold text-white mb-6">Compensation Overview</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                                        <h4 className="text-green-400 font-medium mb-2">India</h4>
                                        <div className="text-3xl font-bold text-white">{company.avgCompensation.india}</div>
                                        <p className="text-sm text-gray-400 mt-1">Total Compensation (Base + Stock + Bonus)</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
                                        <h4 className="text-cyan-400 font-medium mb-2">United States</h4>
                                        <div className="text-3xl font-bold text-white">{company.avgCompensation.us}</div>
                                        <p className="text-sm text-gray-400 mt-1">Total Compensation (Base + Stock + Bonus)</p>
                                    </div>
                                </div>
                                {insights?.negotiationTips && (
                                    <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                        <h4 className="text-purple-400 font-medium mb-3 flex items-center gap-2">
                                            <DollarSign className="w-4 h-4" /> Negotiation Tips
                                        </h4>
                                        <ul className="space-y-2">
                                            {insights.negotiationTips.map((tip, i) => (
                                                <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
                                                    <span className="text-purple-400">→</span> {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
