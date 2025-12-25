'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/store/useGamification';
import {
    Play,
    Pause,
    RotateCcw,
    Coffee,
    Zap,
    Clock,
    CheckCircle,
    Settings,
    Volume2,
    VolumeX,
    SkipForward
} from 'lucide-react';
import confetti from 'canvas-confetti';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const TIMER_CONFIG = {
    work: { minutes: 25, label: 'Focus Time', color: 'from-purple-500 to-cyan-500', icon: Zap },
    shortBreak: { minutes: 5, label: 'Short Break', color: 'from-green-500 to-emerald-500', icon: Coffee },
    longBreak: { minutes: 15, label: 'Long Break', color: 'from-blue-500 to-indigo-500', icon: Coffee },
};

const XP_PER_POMODORO = 20;

function CircularTimer({ progress, timeString, mode }: { progress: number; timeString: string; mode: TimerMode }) {
    const circumference = 2 * Math.PI * 120;
    const strokeDashoffset = circumference * (1 - progress);
    const config = TIMER_CONFIG[mode];

    return (
        <div className="relative w-72 h-72">
            {/* Background glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${config.color} rounded-full blur-3xl opacity-20`} />

            {/* SVG Circle */}
            <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx="144"
                    cy="144"
                    r="120"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="12"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="144"
                    cy="144"
                    r="120"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 0.5 }}
                />
                {/* Gradient definition */}
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="50%" stopColor="#06B6D4" />
                        <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Timer display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-mono font-bold text-white">{timeString}</span>
                <span className="text-sm text-gray-400 mt-2">{config.label}</span>
            </div>
        </div>
    );
}

export default function PomodoroPage() {
    const { addPomodoroSession, pomodoroSessions, totalFocusMinutes, addXP } = useGamification();

    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(TIMER_CONFIG.work.minutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
    const [showSettings, setShowSettings] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [customMinutes, setCustomMinutes] = useState({
        work: 25,
        shortBreak: 5,
        longBreak: 15,
    });

    const totalSeconds = customMinutes[mode] * 60;
    const progress = 1 - timeLeft / totalSeconds;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const playSound = useCallback(() => {
        if (soundEnabled && typeof window !== 'undefined') {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp6ckIh7cWNcVlNWXWZxfYqWn6CckoZ5bWJaVFNYYGx6iJafoZ2Ui3xvY1xXVlpeanuKmKGhn5SHem1hW1dXXGRwfoyaoKCdlId6bmJcWFldZXF/jZqgoZ6Ug3luYltYWV1lc4KQnaCgnpWIe3BoY19eY2t4hpOeoKCelYl+dGtnZGRnbnmGkpuenZuUinhxbGlnaW13goyVm5yamJGHfXZxb3BydnyEi5KVlZORioJ8d3V0dXh7gIeNkZOTkY2HgXt4d3d5fICEiY2PkI+MiIN/e3l4eXt+goaJjI2NjImFgX57enl6fH+ChYiKi4qIhYJ/fHt6e3x+gYOGiImJiIaCf3x7enp7fX+ChIaHh4eFg4B+fHt7fH1/gYOFhoaGhYOBfnx7e3x9f4GCg4WFhYSDgX9+fXx8fX5/gIGCg4ODg4KBf359fX19fn9/gIGBgoKCgYF/fn19fX1+f4CAgYGBgYGAf35+fX19fn5/gICAgYGBgIB/fn5+fn5+f3+AgICAgICAf39+fn5+fn5/f4CAgICAgH9/f35+fn5+f39/gICAgIB/f39/fn5+fn9/f3+AgICAgH9/f35+fn5/f39/gICAgIB/f39/fn5+f39/f4CAgICAgH9/f39+fn9/f39/gICAgICAf39/f35+f39/f3+AgICAgIB/f39/fn5/f39/f4CAgICAf39/f39+fn9/f39/gICAgICAf39/f39/f39/f3+AgICAgIB/f39/f39/f39/f4CAgICAf39/f39/f39/f39/gICAgIB/f39/f39/f39/f3+AgICAf39/f39/f39/f39/f4CAgIB/f39/f39/f39/f39/gICAgH9/f39/f39/f39/f3+AgICAgH9/f39/f39/f39/f4CAgIB/f39/f39/f39/f39/gICAgH9/f39/f39/f39/f3+AgICAf39/f39/f39/f39/f4CAgIB/f39/f39/f39/f39/gICAgH9/f39/f39/f39/f3+AgICAf39/f39/f39/f39/f4CAgIB/f39/f39/f39/f3+AgA==');
            audio.play().catch(() => { });
        }
    }, [soundEnabled]);

    const handleComplete = useCallback(() => {
        playSound();

        if (mode === 'work') {
            // Complete a pomodoro
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#8B5CF6', '#06B6D4', '#10B981'],
            });

            addPomodoroSession({
                startTime: new Date(Date.now() - customMinutes.work * 60 * 1000).toISOString(),
                duration: customMinutes.work,
                completed: true,
                xpEarned: XP_PER_POMODORO,
            });

            setPomodorosCompleted((prev) => prev + 1);

            // Switch to break
            if ((pomodorosCompleted + 1) % 4 === 0) {
                setMode('longBreak');
                setTimeLeft(customMinutes.longBreak * 60);
            } else {
                setMode('shortBreak');
                setTimeLeft(customMinutes.shortBreak * 60);
            }
        } else {
            // Break complete, back to work
            setMode('work');
            setTimeLeft(customMinutes.work * 60);
        }

        setIsRunning(false);
    }, [mode, pomodorosCompleted, customMinutes, addPomodoroSession, playSound]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (isRunning && timeLeft === 0) {
            handleComplete();
        }

        return () => clearInterval(interval);
    }, [isRunning, timeLeft, handleComplete]);

    const handleModeChange = (newMode: TimerMode) => {
        setMode(newMode);
        setTimeLeft(customMinutes[newMode] * 60);
        setIsRunning(false);
    };

    const handleReset = () => {
        setTimeLeft(customMinutes[mode] * 60);
        setIsRunning(false);
    };

    const todaysSessions = pomodoroSessions.filter(
        (s) => s.startTime.split('T')[0] === new Date().toISOString().split('T')[0] && s.completed
    );

    const config = TIMER_CONFIG[mode];
    const Icon = config.icon;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                            🍅 Pomodoro Timer
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        Stay focused and earn {XP_PER_POMODORO} XP for each completed session!
                    </p>
                </motion.div>

                {/* Mode Tabs */}
                <div className="flex justify-center gap-2">
                    {(Object.keys(TIMER_CONFIG) as TimerMode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => handleModeChange(m)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === m
                                    ? `bg-gradient-to-r ${TIMER_CONFIG[m].color} text-white`
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                }`}
                        >
                            {TIMER_CONFIG[m].label}
                        </button>
                    ))}
                </div>

                {/* Timer */}
                <motion.div
                    key={mode}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex justify-center"
                >
                    <CircularTimer progress={progress} timeString={formatTime(timeLeft)} mode={mode} />
                </motion.div>

                {/* Controls */}
                <div className="flex justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsRunning(!isRunning)}
                        className={`p-4 rounded-full bg-gradient-to-r ${config.color} text-white shadow-lg`}
                    >
                        {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleReset}
                        className="p-4 rounded-full bg-gray-800 text-gray-400 hover:text-white"
                    >
                        <RotateCcw className="w-8 h-8" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleComplete}
                        className="p-4 rounded-full bg-gray-800 text-gray-400 hover:text-white"
                        title="Skip"
                    >
                        <SkipForward className="w-8 h-8" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-4 rounded-full bg-gray-800 text-gray-400 hover:text-white"
                    >
                        {soundEnabled ? <Volume2 className="w-8 h-8" /> : <VolumeX className="w-8 h-8" />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-4 rounded-full bg-gray-800 text-gray-400 hover:text-white"
                    >
                        <Settings className="w-8 h-8" />
                    </motion.button>
                </div>

                {/* Settings Panel */}
                <AnimatePresence>
                    {showSettings && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="glass-card rounded-xl p-6 border border-purple-500/20"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4">Timer Settings</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {(Object.keys(customMinutes) as TimerMode[]).map((key) => (
                                    <div key={key}>
                                        <label className="block text-sm text-gray-400 mb-2 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1')}
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="60"
                                            value={customMinutes[key]}
                                            onChange={(e) => {
                                                const value = Math.max(1, Math.min(60, parseInt(e.target.value) || 1));
                                                setCustomMinutes((prev) => ({ ...prev, [key]: value }));
                                                if (key === mode && !isRunning) {
                                                    setTimeLeft(value * 60);
                                                }
                                            }}
                                            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-purple-500 outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-xl p-6 border border-purple-500/20 text-center"
                    >
                        <div className="text-3xl font-bold text-white">{pomodorosCompleted}</div>
                        <p className="text-sm text-gray-400 mt-1">Sessions Today (this tab)</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card rounded-xl p-6 border border-cyan-500/20 text-center"
                    >
                        <div className="text-3xl font-bold text-cyan-400">{todaysSessions.length}</div>
                        <p className="text-sm text-gray-400 mt-1">Total Sessions Today</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-xl p-6 border border-green-500/20 text-center"
                    >
                        <div className="text-3xl font-bold text-green-400">{Math.floor(totalFocusMinutes / 60)}h {totalFocusMinutes % 60}m</div>
                        <p className="text-sm text-gray-400 mt-1">Total Focus Time</p>
                    </motion.div>
                </div>

                {/* Session history */}
                <div className="glass-card rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-400" />
                        Recent Sessions
                    </h3>
                    {pomodoroSessions.length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No sessions completed yet. Start your first pomodoro above!</p>
                    ) : (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {pomodoroSessions
                                .slice()
                                .reverse()
                                .slice(0, 10)
                                .map((session) => (
                                    <div
                                        key={session.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30"
                                    >
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400" />
                                            <div>
                                                <p className="text-sm text-white">{session.duration} min session</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(session.startTime).toLocaleDateString()} at{' '}
                                                    {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-green-400">+{session.xpEarned} XP</span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
