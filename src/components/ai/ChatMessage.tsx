'use client';

import { motion } from 'framer-motion';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { ChatMessage as ChatMessageType } from '@/lib/gemini';

interface ChatMessageProps {
    message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === 'user';

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Simple markdown-like rendering for code blocks
    const renderContent = (content: string) => {
        const parts = content.split(/(```[\s\S]*?```)/g);

        return parts.map((part, index) => {
            if (part.startsWith('```')) {
                const lines = part.split('\n');
                const language = lines[0].replace('```', '').trim();
                const code = lines.slice(1, -1).join('\n');

                return (
                    <div key={index} className="my-3 rounded-lg overflow-hidden bg-gray-900/80 border border-gray-700">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
                            <span className="text-xs text-gray-400 font-mono">{language || 'code'}</span>
                            <button
                                onClick={() => copyToClipboard(code)}
                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-sm">
                            <code className="text-gray-300 font-mono">{code}</code>
                        </pre>
                    </div>
                );
            }

            // Handle inline code
            const inlineCodeParts = part.split(/(`[^`]+`)/g);
            return (
                <span key={index}>
                    {inlineCodeParts.map((inlinePart, i) => {
                        if (inlinePart.startsWith('`') && inlinePart.endsWith('`')) {
                            return (
                                <code
                                    key={i}
                                    className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-sm"
                                >
                                    {inlinePart.slice(1, -1)}
                                </code>
                            );
                        }
                        // Handle bold text
                        const boldParts = inlinePart.split(/(\*\*[^*]+\*\*)/g);
                        return boldParts.map((boldPart, j) => {
                            if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                                return <strong key={`${i}-${j}`} className="font-semibold text-white">{boldPart.slice(2, -2)}</strong>;
                            }
                            return <span key={`${i}-${j}`}>{boldPart}</span>;
                        });
                    })}
                </span>
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
        >
            {/* Avatar */}
            <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser
                        ? 'bg-gradient-to-br from-purple-500 to-cyan-500'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                    }`}
            >
                {isUser ? (
                    <User className="w-4 h-4 text-white" />
                ) : (
                    <Bot className="w-4 h-4 text-white" />
                )}
            </div>

            {/* Message Bubble */}
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                        ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30'
                        : 'bg-gray-800/50 border border-gray-700/50'
                    }`}
            >
                <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {renderContent(message.content)}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        </motion.div>
    );
}
