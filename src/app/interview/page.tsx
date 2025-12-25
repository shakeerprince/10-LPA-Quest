'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/store/useGamification';
import { INTERVIEW_QUESTIONS, QUESTION_CATEGORIES, type InterviewQuestionData } from '@/data/interviewQuestions';
import {
    RotateCcw,
    Check,
    ChevronLeft,
    ChevronRight,
    Shuffle,
    Clock,
    Lightbulb,
    Filter,
    Play,
    Pause,
    Target
} from 'lucide-react';

function FlashCard({
    question,
    isPracticed,
    onMarkPracticed,
}: {
    question: InterviewQuestionData;
    isPracticed: boolean;
    onMarkPracticed: () => void;
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const category = QUESTION_CATEGORIES.find(c => c.id === question.category)!;

    const difficultyColor = {
        easy: 'text-green-400 bg-green-400/10',
        medium: 'text-yellow-400 bg-yellow-400/10',
        hard: 'text-red-400 bg-red-400/10',
    }[question.difficulty];

    return (
        <div className="perspective-1000 w-full max-w-2xl mx-auto">
            <motion.div
                className="relative w-full h-[400px] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                {/* Front of card */}
                <div
                    className="absolute inset-0 glass-card rounded-2xl p-8 border border-purple-500/30 flex flex-col backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <span className={`text-sm px-3 py-1 rounded-full ${category.bg} ${category.color}`}>
                            {category.icon} {category.label}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>
                            {question.difficulty}
                        </span>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-xl md:text-2xl font-semibold text-white text-center">
                            {question.question}
                        </p>
                    </div>

                    <div className="text-center text-gray-500 text-sm mt-4">
                        Click to reveal tips →
                    </div>

                    {isPracticed && (
                        <div className="absolute top-4 right-4">
                            <Check className="w-6 h-6 text-green-400" />
                        </div>
                    )}
                </div>

                {/* Back of card */}
                <div
                    className="absolute inset-0 glass-card rounded-2xl p-8 border border-cyan-500/30 flex flex-col backface-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-lg font-semibold text-white">Answer Tips</h3>
                    </div>

                    {question.framework && (
                        <div className="mb-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                            <span className="text-sm text-purple-400">Framework: {question.framework}</span>
                        </div>
                    )}

                    <ul className="space-y-2 flex-1 overflow-auto">
                        {question.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                                <span className="text-cyan-400 mt-1">•</span>
                                {tip}
                            </li>
                        ))}
                    </ul>

                    {question.sampleAnswer && (
                        <div className="mt-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                            <p className="text-sm text-gray-400 italic">"{question.sampleAnswer}"</p>
                        </div>
                    )}

                    <div className="text-center text-gray-500 text-sm mt-4">
                        Click to see question ←
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function MockTimer({ onComplete }: { onComplete: () => void }) {
    const [timeLeft, setTimeLeft] = useState(45);
    const [isRunning, setIsRunning] = useState(false);

    useState(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            onComplete();
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    });

    const resetTimer = () => {
        setTimeLeft(45);
        setIsRunning(false);
    };

    return (
        <div className="flex items-center gap-4">
            <div className={`text-2xl font-mono ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                0:{timeLeft.toString().padStart(2, '0')}
            </div>
            <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
                onClick={resetTimer}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
                <RotateCcw className="w-5 h-5" />
            </button>
        </div>
    );
}

export default function InterviewPage() {
    const { practicedQuestions, markQuestionPracticed } = useGamification();
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPracticedOnly, setShowPracticedOnly] = useState(false);

    const filteredQuestions = useMemo(() => {
        return INTERVIEW_QUESTIONS.filter((q) => {
            if (categoryFilter !== 'all' && q.category !== categoryFilter) return false;
            if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
            if (showPracticedOnly) {
                const practiced = practicedQuestions.find(p => p.id === q.id);
                if (!practiced?.practiced) return false;
            }
            return true;
        });
    }, [categoryFilter, difficultyFilter, showPracticedOnly, practicedQuestions]);

    const currentQuestion = filteredQuestions[currentIndex];
    const isPracticed = practicedQuestions.find(p => p.id === currentQuestion?.id)?.practiced || false;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
    };

    const handleShuffle = () => {
        setCurrentIndex(Math.floor(Math.random() * filteredQuestions.length));
    };

    const practicedCount = practicedQuestions.filter(p => p.practiced).length;
    const totalQuestions = INTERVIEW_QUESTIONS.length;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            🎤 Interview Prep
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        Practice common interview questions with flashcards
                    </p>
                </motion.div>

                {/* Progress Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl p-6 border border-purple-500/20"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">{practicedCount}/{totalQuestions}</div>
                                <p className="text-sm text-gray-400">Questions Practiced</p>
                            </div>
                            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(practicedCount / totalQuestions) * 100}%` }}
                                />
                            </div>
                        </div>
                        <MockTimer onComplete={() => { }} />
                    </div>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setCategoryFilter('all')}
                            className={`px-3 py-2 rounded-lg text-sm transition-all ${categoryFilter === 'all'
                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                }`}
                        >
                            All
                        </button>
                        {QUESTION_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setCategoryFilter(cat.id);
                                    setCurrentIndex(0);
                                }}
                                className={`px-3 py-2 rounded-lg text-sm transition-all ${categoryFilter === cat.id
                                        ? `${cat.bg} ${cat.color}`
                                        : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                    }`}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        {['all', 'easy', 'medium', 'hard'].map((diff) => (
                            <button
                                key={diff}
                                onClick={() => {
                                    setDifficultyFilter(diff);
                                    setCurrentIndex(0);
                                }}
                                className={`px-3 py-2 rounded-lg text-sm transition-all ${difficultyFilter === diff
                                        ? diff === 'all' ? 'bg-white/10 text-white' :
                                            diff === 'easy' ? 'bg-green-400/10 text-green-400' :
                                                diff === 'medium' ? 'bg-yellow-400/10 text-yellow-400' :
                                                    'bg-red-400/10 text-red-400'
                                        : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                    }`}
                            >
                                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowPracticedOnly(!showPracticedOnly)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-1 ${showPracticedOnly
                                ? 'bg-green-400/10 text-green-400'
                                : 'bg-gray-800/50 text-gray-400 hover:text-white'
                            }`}
                    >
                        <Check className="w-4 h-4" />
                        Practiced
                    </button>
                </div>

                {/* Flashcard */}
                {filteredQuestions.length > 0 && currentQuestion ? (
                    <>
                        <div className="text-center text-sm text-gray-500 mb-2">
                            Question {currentIndex + 1} of {filteredQuestions.length}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion.id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                <FlashCard
                                    question={currentQuestion}
                                    isPracticed={isPracticed}
                                    onMarkPracticed={() => markQuestionPracticed(currentQuestion.id)}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrev}
                                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleShuffle}
                                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                                title="Shuffle"
                            >
                                <Shuffle className="w-6 h-6" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => markQuestionPracticed(currentQuestion.id)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${isPracticed
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                    }`}
                            >
                                <Check className="w-5 h-5" />
                                {isPracticed ? 'Practiced!' : 'Mark as Practiced'}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNext}
                                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <Target className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No questions found</h3>
                        <p className="text-gray-500">Try adjusting your filters</p>
                    </motion.div>
                )}

                {/* Tips section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-xl p-6 border border-cyan-500/20"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        Interview Tips
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                        <div className="p-4 rounded-lg bg-gray-800/30">
                            <h4 className="font-medium text-white mb-2">STAR Method</h4>
                            <p><strong className="text-purple-400">S</strong>ituation → <strong className="text-cyan-400">T</strong>ask → <strong className="text-green-400">A</strong>ction → <strong className="text-orange-400">R</strong>esult</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-800/30">
                            <h4 className="font-medium text-white mb-2">Practice Out Loud</h4>
                            <p>Speaking your answers helps you sound natural and confident</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-800/30">
                            <h4 className="font-medium text-white mb-2">Quantify Impact</h4>
                            <p>Use numbers: "Improved performance by 40%"</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-800/30">
                            <h4 className="font-medium text-white mb-2">Be Specific</h4>
                            <p>Avoid vague answers. Give concrete examples</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
        </div>
    );
}
