'use client';

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass-card border-t border-purple-500/20 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Main text */}
                    <motion.div
                        className="flex items-center gap-2 text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span>Made with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        </motion.div>
                        <span>and ☕ by</span>
                        <span className="font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Shakir
                        </span>
                    </motion.div>

                    {/* Target */}
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-gray-400">Target:</span>
                        <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent neon-text-cyan">
                            ₹10 LPA
                        </span>
                        <span className="text-2xl">🎯</span>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.effectivegatecpm.com/ragkag26v?key=8657aec80a4eb42b1228a4fa03bff3c8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            title="Special Offer"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </motion.div>
                </div>

                {/* Copyright */}
                <div className="mt-6 pt-6 border-t border-purple-500/10 text-center text-sm text-gray-500">
                    © {currentYear} 10 LPA Quest. All rights reserved. Let&apos;s crack that dream job! 🚀
                </div>
            </div>
        </footer>
    );
}
