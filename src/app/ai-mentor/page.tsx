'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Bot,
    Sparkles,
    Trash2,
    Settings,
    Key,
    X,
    Brain,
    Code,
    Briefcase,
    MessageCircle,
    Loader2,
    AlertCircle
} from 'lucide-react';
import { ChatMessage } from '@/components/ai/ChatMessage';
import { QuickPrompts } from '@/components/ai/QuickPrompts';
import { useAIChat, ChatMode } from '@/store/useAIChat';
import { sendMessageToGemini, ChatMessage as ChatMessageType } from '@/lib/gemini';

const modes = [
    { id: 'general', label: 'General', icon: MessageCircle, description: 'Ask anything!' },
    { id: 'dsa', label: 'DSA Helper', icon: Brain, description: 'Algorithms & Data Structures' },
    { id: 'code-review', label: 'Code Review', icon: Code, description: 'Get code feedback' },
    { id: 'interview', label: 'Interview Prep', icon: Briefcase, description: 'Practice interviews' },
];

export default function AIMentorPage() {
    const [input, setInput] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [tempApiKey, setTempApiKey] = useState('');
    const [promptCategory, setPromptCategory] = useState('dsa');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        messages,
        addMessage,
        clearMessages,
        mode,
        setMode,
        isLoading,
        setIsLoading,
        error,
        setError,
        apiKey,
        setApiKey,
    } = useAIChat();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        setTempApiKey(apiKey);
    }, [apiKey]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        if (!apiKey) {
            setShowSettings(true);
            setError('Please add your Gemini API key first!');
            return;
        }

        const userMessage: ChatMessageType = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        addMessage(userMessage);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await sendMessageToGemini(
                [...messages, userMessage],
                apiKey,
                mode
            );

            const assistantMessage: ChatMessageType = {
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            };

            addMessage(assistantMessage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const saveApiKey = () => {
        setApiKey(tempApiKey);
        setShowSettings(false);
        setError(null);
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 mb-4">
                        <Bot className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-gray-300">Your Personal AI Mentor</span>
                        <Sparkles className="w-4 h-4 text-teal-400" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                            AI Mentor 🤖
                        </span>
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Ask me anything about DSA, coding, system design, or interview prep.
                        I'm here to help you crack that 10 LPA job!
                    </p>
                </motion.div>

                {/* Mode Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-6"
                >
                    {modes.map((m) => {
                        const Icon = m.icon;
                        const isActive = mode === m.id;
                        return (
                            <motion.button
                                key={m.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setMode(m.id as ChatMode)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${isActive
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700/50'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="font-medium">{m.label}</span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Main Chat Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-2xl border border-gray-700/50 overflow-hidden"
                >
                    {/* Chat Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50 bg-gray-800/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">AI Mentor</h3>
                                <p className="text-xs text-gray-400">
                                    {modes.find((m) => m.id === mode)?.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={clearMessages}
                                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
                                title="Clear chat"
                            >
                                <Trash2 className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowSettings(true)}
                                className={`p-2 rounded-lg transition-colors ${apiKey
                                    ? 'text-emerald-400 hover:bg-emerald-500/20'
                                    : 'text-yellow-400 hover:bg-yellow-500/20'
                                    }`}
                                title="Settings"
                            >
                                <Settings className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="h-[400px] overflow-y-auto p-6 space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                                    <Sparkles className="w-10 h-10 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Ready to help you! 🚀
                                </h3>
                                <p className="text-gray-400 max-w-md">
                                    Ask me about DSA problems, code reviews, system design, or interview tips.
                                    Select a quick prompt below or type your own question!
                                </p>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <ChatMessage key={index} message={message} />
                            ))
                        )}

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-800/50 border border-gray-700/50">
                                    <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                                    <span className="text-gray-400">Thinking...</span>
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Error Display */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mx-6 mb-4 flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                        >
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </motion.div>
                    )}

                    {/* Quick Prompts */}
                    {messages.length === 0 && (
                        <div className="px-6 pb-4">
                            <QuickPrompts
                                onSelectPrompt={setInput}
                                activeCategory={promptCategory}
                                onCategoryChange={setPromptCategory}
                            />
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-700/50 bg-gray-800/20">
                        <div className="flex items-end gap-3">
                            <div className="flex-1 relative">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    rows={1}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 resize-none transition-all"
                                    style={{ minHeight: '48px', maxHeight: '120px' }}
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                            >
                                <Send className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* API Key Hint */}
                {!apiKey && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-center"
                    >
                        <button
                            onClick={() => setShowSettings(true)}
                            className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                            <Key className="w-4 h-4" />
                            Click here to add your free Gemini API key
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowSettings(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-700 p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-emerald-400" />
                                    AI Settings
                                </h2>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Gemini API Key
                                    </label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="password"
                                            value={tempApiKey}
                                            onChange={(e) => setTempApiKey(e.target.value)}
                                            placeholder="Enter your API key..."
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Get your free API key from{' '}
                                        <a
                                            href="https://aistudio.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-400 hover:underline"
                                        >
                                            aistudio.google.com
                                        </a>
                                        {' '}→ Click &quot;Get API key&quot; in sidebar
                                    </p>
                                </div>

                                {/* Rate Limit Info */}
                                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                                    <p className="text-xs text-yellow-400 font-medium mb-1">💡 Free Tier Limits</p>
                                    <p className="text-xs text-gray-400">
                                        The free Gemini API allows ~15 requests per minute.
                                        Wait a few seconds between messages to avoid rate limiting.
                                        For higher limits, consider upgrading in Google AI Studio.
                                    </p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={saveApiKey}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                                >
                                    Save API Key
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
