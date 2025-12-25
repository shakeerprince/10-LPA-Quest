'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { COMPANIES, CompanyData, getServiceBasedCompanies, getDreamCompany } from '@/data/companyData';
import { COMPANY_QUESTIONS } from '@/data/companyQuestions';
import { useCompanyPrep } from '@/store/useCompanyPrep';
import {
    Search,
    Building2,
    TrendingUp,
    Star,
    ChevronRight,
    Filter,
    Briefcase,
    Code,
    Users,
    Heart,
    Sparkles
} from 'lucide-react';

function CompanyCard({ company }: { company: CompanyData }) {
    const { solvedQuestions, preferredCompanies, addPreferredCompany, removePreferredCompany } = useCompanyPrep();
    const questions = COMPANY_QUESTIONS.find(c => c.companyId === company.id)?.questions || [];
    const solved = solvedQuestions[company.id]?.length || 0;
    const progress = questions.length > 0 ? Math.round((solved / questions.length) * 100) : 0;
    const isPreferred = preferredCompanies.includes(company.id);

    const difficultyColor = {
        Easy: 'text-green-400 bg-green-400/10',
        Medium: 'text-yellow-400 bg-yellow-400/10',
        Hard: 'text-red-400 bg-red-400/10',
    }[company.difficulty];

    const tierColor = {
        FAANG: 'from-purple-500 to-pink-500',
        Tier1: 'from-cyan-500 to-blue-500',
        Tier2: 'from-green-500 to-teal-500',
        Startup: 'from-orange-500 to-yellow-500',
        Service: 'from-pink-500 to-rose-500',
    }[company.tier] || 'from-gray-500 to-gray-600';

    const isDream = company.isDreamCompany;

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className={`glass-card rounded-xl p-5 border transition-all relative group ${isDream
                ? 'border-green-500/50 ring-2 ring-green-500/20 shadow-lg shadow-green-500/10'
                : 'border-purple-500/20 hover:border-purple-500/40'
                }`}
        >
            <button
                onClick={(e) => {
                    e.preventDefault();
                    isPreferred ? removePreferredCompany(company.id) : addPreferredCompany(company.id);
                }}
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors z-10"
            >
                <Star className={`w-4 h-4 ${isPreferred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`} />
            </button>

            <Link href={`/company-prep/${company.id}`}>
                <div className="flex items-start gap-4">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: `${company.color}20`, border: `1px solid ${company.color}40` }}
                    >
                        {company.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">{company.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${tierColor} text-white`}>
                                {company.tier}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor}`}>
                                {company.difficulty}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-gray-400 mt-3 line-clamp-2">{company.description}</p>

                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="text-center p-2 rounded-lg bg-gray-800/50">
                        <div className="text-sm font-semibold text-white">{company.interviewRounds}</div>
                        <div className="text-xs text-gray-500">Rounds</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-gray-800/50">
                        <div className="text-sm font-semibold text-cyan-400">{questions.length}</div>
                        <div className="text-xs text-gray-500">Questions</div>
                    </div>
                </div>

                {questions.length > 0 && (
                    <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-purple-400">{progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                            />
                        </div>
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{company.avgCompensation.india}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </div>
            </Link>
        </motion.div>
    );
}

export default function CompanyPrepPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tierFilter, setTierFilter] = useState<string>('all');
    const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
    const { preferredCompanies } = useCompanyPrep();

    const filteredCompanies = useMemo(() => {
        return COMPANIES.filter((company) => {
            if (searchQuery && !company.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (tierFilter !== 'all' && company.tier !== tierFilter) return false;
            if (difficultyFilter !== 'all' && company.difficulty !== difficultyFilter) return false;
            return true;
        });
    }, [searchQuery, tierFilter, difficultyFilter]);

    const preferredCompanyList = COMPANIES.filter(c => preferredCompanies.includes(c.id));
    const serviceCompanies = getServiceBasedCompanies();
    const dreamCompany = getDreamCompany();

    const stats = {
        total: COMPANIES.length,
        faang: COMPANIES.filter(c => c.tier === 'FAANG').length,
        service: serviceCompanies.length,
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            🏢 Company-Wise Preparation
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Target specific companies with curated LeetCode questions, interview insights, and preparation checklists
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-3 gap-4"
                >
                    <div className="glass-card rounded-xl p-4 border border-purple-500/20 text-center">
                        <Building2 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                        <div className="text-sm text-gray-400">Companies</div>
                    </div>
                    <div className="glass-card rounded-xl p-4 border border-cyan-500/20 text-center">
                        <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stats.faang}</div>
                        <div className="text-sm text-gray-400">FAANG+</div>
                    </div>
                    <div className="glass-card rounded-xl p-4 border border-pink-500/20 text-center">
                        <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stats.service}</div>
                        <div className="text-sm text-gray-400">Service</div>
                    </div>
                </motion.div>

                {/* 💕 For My Girl - Service Based Companies Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl p-6 border-2 border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-rose-500/5"
                >
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-4">
                            <Heart className="w-5 h-5 text-pink-400" />
                            <span className="text-pink-400 font-medium">This is for you, my girl 💕</span>
                            <Sparkles className="w-5 h-5 text-pink-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Service-Based Companies
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Perfect for freshers! These companies have structured hiring, good training programs, and beginner-friendly interviews ✨
                        </p>
                    </div>

                    {/* Dream Company - Deloitte Special Card */}
                    {dreamCompany && (
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="mb-6"
                        >
                            <Link href={`/company-prep/${dreamCompany.id}`}>
                                <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/20 border-2 border-green-500/40 hover:border-green-400/60 transition-all group">
                                    {/* Sparkle decorations */}
                                    <div className="absolute top-2 right-2 text-2xl animate-pulse">✨</div>
                                    <div className="absolute bottom-2 left-2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💚</div>
                                    <div className="absolute top-1/2 right-4 text-xl animate-bounce">🌟</div>

                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <div
                                            className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl bg-green-500/20 border-2 border-green-500/40"
                                        >
                                            {dreamCompany.logo}
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium mb-2">
                                                <Star className="w-4 h-4 fill-yellow-400" /> DREAM COMPANY
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2">{dreamCompany.name}</h3>
                                            <p className="text-gray-300 mb-3">{dreamCompany.description}</p>
                                            {dreamCompany.specialMessage && (
                                                <p className="text-lg font-medium text-green-400 animate-pulse">
                                                    {dreamCompany.specialMessage}
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-400">{dreamCompany.avgCompensation.india}</div>
                                            <p className="text-sm text-gray-400">{dreamCompany.interviewRounds} Rounds</p>
                                            <div className="mt-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 font-medium group-hover:bg-green-500/30 transition-colors">
                                                Start Prep →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}

                    {/* Other Service Companies Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {serviceCompanies.filter(c => !c.isDreamCompany).map((company, index) => (
                            <motion.div
                                key={company.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <CompanyCard company={company} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Preferred Companies */}
                {preferredCompanyList.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400" />
                            Your Target Companies
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {preferredCompanyList.map((company) => (
                                <CompanyCard key={company.id} company={company} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={tierFilter}
                            onChange={(e) => setTierFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:border-purple-500 focus:outline-none"
                        >
                            <option value="all">All Tiers</option>
                            <option value="FAANG">FAANG</option>
                            <option value="Tier1">Tier 1</option>
                            <option value="Tier2">Tier 2</option>
                            <option value="Startup">Startup</option>
                            <option value="Service">💕 Service (For My Girl)</option>
                        </select>
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:border-purple-500 focus:outline-none"
                        >
                            <option value="all">All Difficulty</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>

                {/* All Companies Grid */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-purple-400" />
                        All Companies ({filteredCompanies.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCompanies.map((company, index) => (
                            <motion.div
                                key={company.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <CompanyCard company={company} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {filteredCompanies.length === 0 && (
                    <div className="text-center py-16">
                        <Code className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400">No companies found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
