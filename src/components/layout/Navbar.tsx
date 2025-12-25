'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Map,
    ListTodo,
    BookOpen,
    Trophy,
    Menu,
    X,
    Timer,
    FileText,
    BarChart3,
    Target,
    Mic,
    ChevronDown,
    Bot,
    Building2,
    Sun,
    Moon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGamification, calculateLevel, getLevelTitle } from '@/store/useGamification';
import { useCompanyPrep } from '@/store/useCompanyPrep';
import { UserMenu } from '@/components/auth/UserMenu';


const mainNavLinks = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/roadmap', label: 'Skill Tree', icon: Map },
    { href: '/quests', label: 'Quests', icon: ListTodo },
    { href: '/company-prep', label: 'Companies', icon: Building2, special: true },
    { href: '/ai-mentor', label: 'AI Mentor', icon: Bot },
    { href: '/pomodoro', label: 'Pomodoro', icon: Timer },
];

const moreNavLinks = [
    { href: '/achievements', label: 'Achievements', icon: Trophy },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/notes', label: 'Notes', icon: FileText },
    { href: '/interview', label: 'Interview', icon: Mic },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/resources', label: 'Resources', icon: BookOpen },
];

const allNavLinks = [...mainNavLinks, ...moreNavLinks];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const { totalXP, currentStreak } = useGamification();
    const { theme, toggleTheme } = useCompanyPrep();
    const level = calculateLevel(totalXP);
    const title = getLevelTitle(level);

    // Sync theme on mount
    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <nav className="sticky top-0 z-50 glass-card border-b border-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            className="text-2xl"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            🎯
                        </motion.div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            10 LPA Quest
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {mainNavLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            const isSpecial = 'special' in link && link.special;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${isSpecial && !isActive
                                        ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/50'
                                        : isActive
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className={`absolute inset-0 rounded-lg border ${isSpecial
                                                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30'
                                                : 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30'
                                                }`}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <Icon className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10 text-sm font-medium">{link.label}</span>
                                    {isSpecial && !isActive && (
                                        <span className="relative z-10 text-xs">🤖</span>
                                    )}
                                </Link>
                            );
                        })}

                        {/* More Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowMore(!showMore)}
                                onBlur={() => setTimeout(() => setShowMore(false), 200)}
                                className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-all duration-300 ${moreNavLinks.some(l => l.href === pathname)
                                    ? 'text-white bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span className="text-sm font-medium">More</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showMore && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 py-2 glass-card rounded-xl border border-purple-500/20 shadow-xl"
                                    >
                                        {moreNavLinks.map((link) => {
                                            const Icon = link.icon;
                                            const isActive = pathname === link.href;

                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    onClick={() => setShowMore(false)}
                                                    className={`flex items-center gap-3 px-4 py-2 transition-colors ${isActive
                                                        ? 'text-white bg-purple-500/20'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                        }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span className="text-sm">{link.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Stats Badge */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg glass-card border border-purple-500/30 hover:border-purple-500/50 transition-all"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-yellow-400" />
                            ) : (
                                <Moon className="w-4 h-4 text-purple-500" />
                            )}
                        </button>
                        <Link
                            href="/achievements"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-purple-500/30 hover:border-purple-500/50 transition-colors"
                        >
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium">Lv.{level}</span>
                            <span className="text-xs text-gray-400 hidden xl:inline">{title}</span>
                        </Link>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-orange-500/30">
                            <span className="text-lg">🔥</span>
                            <span className="text-sm font-medium">{currentStreak}</span>
                        </div>
                        {/* User Menu */}
                        <UserMenu />
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden glass-card border-t border-purple-500/20 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                            {allNavLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname === link.href;

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                            ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{link.label}</span>
                                    </Link>
                                );
                            })}

                            {/* Mobile Stats */}
                            <div className="flex items-center gap-4 pt-4 border-t border-purple-500/20">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-purple-500/30">
                                    <Trophy className="w-4 h-4 text-yellow-400" />
                                    <span className="text-sm font-medium">Lv.{level}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-orange-500/30">
                                    <span className="text-lg">🔥</span>
                                    <span className="text-sm font-medium">{currentStreak} day streak</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
