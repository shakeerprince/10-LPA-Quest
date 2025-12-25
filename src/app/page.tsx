'use client';

import { motion } from 'framer-motion';
import { CountdownTimer } from '@/components/dashboard/CountdownTimer';
import { FlameStreak } from '@/components/dashboard/FlameStreak';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { ActivityHeatmap } from '@/components/dashboard/ActivityHeatmap';
import { DailyQuote } from '@/components/dashboard/DailyQuote';
import { QuickStart } from '@/components/dashboard/QuickStart';
import { BadgesDisplay } from '@/components/dashboard/BadgesDisplay';
import { Sparkles } from 'lucide-react';

// Target date: July 1, 2026 (6 months from Jan 1, 2026)
const TARGET_DATE = new Date('2026-07-01T00:00:00');
const CHALLENGE_START = new Date('2026-01-01T00:00:00');

export default function Dashboard() {
  const today = new Date();
  const challengeStarted = today >= CHALLENGE_START;
  const daysUntilStart = Math.ceil((CHALLENGE_START.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Your journey to ₹10 LPA starts here</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              10 LPA Quest
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 mb-8"
          >
            6 Months • DSA + Development + System Design • One Dream Job
          </motion.p>

          {/* Countdown Section */}
          {!challengeStarted ? (
            <div className="space-y-4">
              <div className="text-lg text-yellow-400">
                🚀 Challenge starts in {daysUntilStart} days!
              </div>
              <CountdownTimer targetDate={CHALLENGE_START} title="🗓️ Days Until Challenge Begins" />
            </div>
          ) : (
            <CountdownTimer targetDate={TARGET_DATE} title="⏰ Time Remaining to Crack 10 LPA" />
          )}
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-6">
            <StatsGrid />
            <QuickStart />
            <ActivityHeatmap />
          </div>

          {/* Right Column - Streak & Quote */}
          <div className="space-y-6">
            <FlameStreak />
            <DailyQuote />
          </div>
        </div>

        {/* Badges Section */}
        <BadgesDisplay />

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center py-8"
        >
          <div className="glass-card rounded-2xl p-8 border border-purple-500/20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Quest? 🎮
            </h2>
            <p className="text-gray-400 mb-6">
              Every great developer started exactly where you are. The only difference between you
              and them is they started. Your 10 LPA journey begins with a single line of code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/roadmap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
              >
                View Skill Tree 🗺️
              </motion.a>
              <motion.a
                href="/quests"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-xl border border-purple-500/30 text-white font-semibold hover:bg-purple-500/10 transition-all"
              >
                Start Daily Quests ⚔️
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
