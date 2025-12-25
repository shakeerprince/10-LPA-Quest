'use client';

import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Code2, Server, Brain, FileText } from 'lucide-react';
import { DSA_SHEETS } from '@/data/roadmap';

const resources = {
    dsa: [
        { name: 'LeetCode', url: 'https://leetcode.com', description: 'Practice coding problems', icon: '⚡' },
        { name: 'Codeforces', url: 'https://codeforces.com', description: 'Competitive programming', icon: '🏆' },
        { name: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org', description: 'DSA theory & practice', icon: '📚' },
        { name: 'HackerRank', url: 'https://www.hackerrank.com', description: 'Skill assessments', icon: '💻' },
        { name: 'InterviewBit', url: 'https://www.interviewbit.com', description: 'Interview prep platform', icon: '🎯' },
    ],
    systemDesign: [
        { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', description: 'Comprehensive SD guide', icon: '📖' },
        { name: 'ByteByteGo', url: 'https://bytebytego.com', description: 'Visual system design', icon: '🎨' },
        { name: 'Grokking SD', url: 'https://www.designgurus.io/course/grokking-the-system-design-interview', description: 'Popular SD course', icon: '🎓' },
        { name: 'High Scalability', url: 'http://highscalability.com', description: 'Real-world architectures', icon: '🏗️' },
    ],
    development: [
        { name: 'React Docs', url: 'https://react.dev', description: 'Official React documentation', icon: '⚛️' },
        { name: 'Next.js Docs', url: 'https://nextjs.org/docs', description: 'Next.js documentation', icon: '▲' },
        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Web technology reference', icon: '🌐' },
        { name: 'TypeScript Docs', url: 'https://www.typescriptlang.org/docs/', description: 'TypeScript handbook', icon: '📘' },
        { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org', description: 'Free coding courses', icon: '🏕️' },
    ],
    youtube: [
        { name: 'Striver (take U forward)', url: 'https://www.youtube.com/@takeUforward', description: 'Best for DSA in India', icon: '🎬' },
        { name: 'NeetCode', url: 'https://www.youtube.com/@NeetCode', description: 'LeetCode solutions', icon: '💡' },
        { name: 'Fireship', url: 'https://www.youtube.com/@Fireship', description: 'Quick tech tutorials', icon: '🔥' },
        { name: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia', description: 'Web development', icon: '🌟' },
        { name: 'Gaurav Sen', url: 'https://www.youtube.com/@gaborsen', description: 'System Design', icon: '🧠' },
    ],
};

const cheatsheets = [
    {
        title: 'Big-O Complexity',
        content: `
**Time Complexity:**
- O(1) - Constant: Array access, HashMap lookup
- O(log n) - Logarithmic: Binary Search
- O(n) - Linear: Simple loops
- O(n log n) - Linearithmic: Merge Sort, Quick Sort (avg)
- O(n²) - Quadratic: Nested loops
- O(2ⁿ) - Exponential: Recursive Fibonacci

**Space Complexity:**
- In-place algorithms: O(1)
- Recursive calls: O(n) stack space
- Creating new data structures: O(n)
    `,
    },
    {
        title: 'Common Patterns',
        content: `
**Two Pointers:** Start/end or slow/fast
**Sliding Window:** Fixed or variable size
**Binary Search:** Sorted arrays, search space
**BFS/DFS:** Tree/Graph traversal
**Dynamic Programming:** Overlapping subproblems
**Backtracking:** Permutations, combinations
**Union-Find:** Connected components
**Monotonic Stack:** Next greater element
    `,
    },
    {
        title: 'System Design Basics',
        content: `
**Scalability Concepts:**
- Horizontal vs Vertical Scaling
- Load Balancing (Round Robin, Least Connections)
- Caching (Redis, Memcached)
- Database Sharding
- CDN for static content

**Database:**
- SQL vs NoSQL
- CAP Theorem
- ACID Properties
- Indexing & Partitioning

**Communication:**
- REST vs GraphQL
- WebSockets for real-time
- Message Queues (Kafka, RabbitMQ)
    `,
    },
    {
        title: 'React Essentials',
        content: `
**Hooks:**
- useState: Component state
- useEffect: Side effects
- useContext: Global state
- useMemo/useCallback: Optimization
- useRef: DOM access/persist value

**Patterns:**
- Container/Presentational
- Compound Components
- Render Props
- Custom Hooks

**Performance:**
- React.memo()
- Lazy loading
- Code splitting
    `,
    },
];

function ResourceCard({ name, url, description, icon }: { name: string; url: string; description: string; icon: string }) {
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl border border-gray-700/30 hover:border-purple-500/30 bg-gray-800/30 hover:bg-gray-800/50 transition-all group flex items-center gap-3"
        >
            <div className="text-2xl">{icon}</div>
            <div className="flex-1">
                <div className="font-medium text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                    {name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs text-gray-400">{description}</div>
            </div>
        </motion.a>
    );
}

function CheatsheetCard({ title, content }: { title: string; content: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6 border border-purple-500/20"
        >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                {title}
            </h3>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-gray-900/50 p-4 rounded-lg overflow-x-auto">
                {content.trim()}
            </pre>
        </motion.div>
    );
}

export default function ResourcesPage() {
    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            📚 Resources & Cheatsheets
                        </span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Curated resources to help you on your 10 LPA journey. Quick reference cheatsheets for interviews!
                    </p>
                </motion.div>

                {/* DSA Sheets */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Code2 className="w-6 h-6 text-purple-400" />
                        DSA Practice Sheets
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {DSA_SHEETS.map((sheet) => (
                            <motion.a
                                key={sheet.id}
                                href={sheet.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                className="p-4 rounded-xl border border-gray-700/30 hover:border-purple-500/30 bg-gray-800/30 hover:bg-gray-800/50 transition-all group"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-3xl">{sheet.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                                            {sheet.name}
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </h3>
                                        <p className="text-xs text-gray-400 mt-1">{sheet.description}</p>
                                        <span
                                            className="inline-block text-xs px-2 py-0.5 rounded-full mt-2"
                                            style={{ backgroundColor: `${sheet.color}20`, color: sheet.color }}
                                        >
                                            {sheet.problems} problems
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>

                {/* Cheatsheets */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-cyan-400" />
                        Quick Reference Cheatsheets
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cheatsheets.map((sheet, index) => (
                            <CheatsheetCard key={index} {...sheet} />
                        ))}
                    </div>
                </section>

                {/* YouTube Channels */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        🎬 YouTube Channels
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resources.youtube.map((resource, index) => (
                            <ResourceCard key={index} {...resource} />
                        ))}
                    </div>
                </section>

                {/* DSA Resources */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Code2 className="w-6 h-6 text-purple-400" />
                        DSA Practice Platforms
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resources.dsa.map((resource, index) => (
                            <ResourceCard key={index} {...resource} />
                        ))}
                    </div>
                </section>

                {/* System Design */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Server className="w-6 h-6 text-orange-400" />
                        System Design Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resources.systemDesign.map((resource, index) => (
                            <ResourceCard key={index} {...resource} />
                        ))}
                    </div>
                </section>

                {/* Development */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <Brain className="w-6 h-6 text-cyan-400" />
                        Development Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resources.development.map((resource, index) => (
                            <ResourceCard key={index} {...resource} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
