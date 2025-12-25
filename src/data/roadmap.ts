// 6-Month SDE Prep Roadmap with Striver & NeetCode Sheets
// Target: 10 LPA Job by July 2026

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Topic = {
    id: string;
    name: string;
    completed?: boolean;
    xp: number;
    difficulty: Difficulty;
    resources?: string[];
    problems?: number;
};

export type Module = {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    topics: Topic[];
};

export type Pillar = {
    id: string;
    name: string;
    description: string;
    color: string;
    gradient: string;
    modules: Module[];
};

// Helper to create topics with proper type for difficulty
const createTopics = (topics: Omit<Topic, 'completed'>[]): Topic[] =>
    topics;

export const ROADMAP: Pillar[] = [
    {
        id: 'dsa',
        name: 'DSA Mastery',
        description: 'Data Structures & Algorithms - The Foundation',
        color: '#8B5CF6',
        gradient: 'from-purple-500 to-violet-600',
        modules: [
            {
                id: 'dsa-basics',
                title: 'Basics & Patterns',
                description: 'Build strong fundamentals',
                icon: '📚',
                color: '#8B5CF6',
                topics: [
                    { id: 'time-complexity', name: 'Time & Space Complexity', xp: 20, difficulty: 'easy', problems: 10 },
                    { id: 'recursion', name: 'Recursion Fundamentals', xp: 30, difficulty: 'medium', problems: 15 },
                    { id: 'bit-manipulation', name: 'Bit Manipulation', xp: 30, difficulty: 'medium', problems: 12 },
                ],
            },
            {
                id: 'dsa-arrays',
                title: 'Arrays & Strings',
                description: 'Striver SDE Sheet - Arrays',
                icon: '📊',
                color: '#8B5CF6',
                topics: [
                    { id: 'arrays-easy', name: 'Arrays Easy (Two Sum, etc.)', xp: 30, difficulty: 'easy', problems: 15, resources: ['NeetCode 150', 'Striver SDE Sheet'] },
                    { id: 'arrays-medium', name: "Arrays Medium (Kadane's, etc.)", xp: 50, difficulty: 'medium', problems: 20 },
                    { id: 'two-pointers', name: 'Two Pointers Technique', xp: 40, difficulty: 'medium', problems: 15 },
                    { id: 'sliding-window', name: 'Sliding Window', xp: 50, difficulty: 'medium', problems: 12 },
                    { id: 'prefix-sum', name: 'Prefix Sum', xp: 30, difficulty: 'easy', problems: 10 },
                    { id: 'strings', name: 'String Manipulation', xp: 40, difficulty: 'medium', problems: 20 },
                ],
            },
            {
                id: 'dsa-hashing',
                title: 'Hashing & Maps',
                description: 'HashMaps, Sets, and Frequency Arrays',
                icon: '#️⃣',
                color: '#8B5CF6',
                topics: [
                    { id: 'hashmap-basics', name: 'HashMap Fundamentals', xp: 30, difficulty: 'easy', problems: 10 },
                    { id: 'frequency-count', name: 'Frequency Counting', xp: 30, difficulty: 'easy', problems: 12 },
                    { id: 'hashmap-medium', name: 'HashMap Medium Problems', xp: 50, difficulty: 'medium', problems: 15 },
                ],
            },
            {
                id: 'dsa-linked-list',
                title: 'Linked Lists',
                description: 'Singly, Doubly, and Circular Lists',
                icon: '🔗',
                color: '#8B5CF6',
                topics: [
                    { id: 'll-basics', name: 'Linked List Basics', xp: 30, difficulty: 'easy', problems: 10 },
                    { id: 'll-medium', name: 'Reverse, Cycle Detection', xp: 50, difficulty: 'medium', problems: 15 },
                    { id: 'll-hard', name: 'Merge, Clone with Random', xp: 80, difficulty: 'hard', problems: 8 },
                ],
            },
            {
                id: 'dsa-stacks-queues',
                title: 'Stacks & Queues',
                description: 'LIFO, FIFO, and Monotonic structures',
                icon: '📚',
                color: '#8B5CF6',
                topics: [
                    { id: 'stack-basics', name: 'Stack Fundamentals', xp: 20, difficulty: 'easy', problems: 8 },
                    { id: 'monotonic-stack', name: 'Monotonic Stack (NGE, etc.)', xp: 60, difficulty: 'medium', problems: 12 },
                    { id: 'queue-deque', name: 'Queue & Deque Problems', xp: 40, difficulty: 'medium', problems: 10 },
                ],
            },
            {
                id: 'dsa-trees',
                title: 'Trees',
                description: 'Binary Trees, BST, and Traversals',
                icon: '🌳',
                color: '#10B981',
                topics: [
                    { id: 'tree-traversals', name: 'Tree Traversals (In/Pre/Post/Level)', xp: 40, difficulty: 'easy', problems: 8 },
                    { id: 'bst', name: 'Binary Search Tree', xp: 50, difficulty: 'medium', problems: 15 },
                    { id: 'tree-medium', name: 'Tree Medium (LCA, Diameter)', xp: 60, difficulty: 'medium', problems: 20 },
                    { id: 'tree-hard', name: 'Tree Hard (Serialize, Morris)', xp: 100, difficulty: 'hard', problems: 10 },
                ],
            },
            {
                id: 'dsa-heaps',
                title: 'Heaps & Priority Queues',
                description: 'Min/Max Heaps and Top-K problems',
                icon: '⛰️',
                color: '#F59E0B',
                topics: [
                    { id: 'heap-basics', name: 'Heap Fundamentals', xp: 30, difficulty: 'easy', problems: 8 },
                    { id: 'top-k', name: 'Top K Elements Pattern', xp: 50, difficulty: 'medium', problems: 12 },
                    { id: 'heap-hard', name: 'Merge K Sorted, Median', xp: 80, difficulty: 'hard', problems: 8 },
                ],
            },
            {
                id: 'dsa-graphs',
                title: 'Graphs',
                description: 'BFS, DFS, Shortest Path, and Topological Sort',
                icon: '🕸️',
                color: '#EF4444',
                topics: [
                    { id: 'graph-basics', name: 'Graph Representation & BFS/DFS', xp: 50, difficulty: 'medium', problems: 15 },
                    { id: 'shortest-path', name: "Dijkstra's & Bellman-Ford", xp: 80, difficulty: 'hard', problems: 10 },
                    { id: 'topo-sort', name: 'Topological Sort', xp: 60, difficulty: 'medium', problems: 8 },
                    { id: 'union-find', name: 'Union-Find (DSU)', xp: 70, difficulty: 'medium', problems: 10 },
                    { id: 'mst', name: "MST (Prim's, Kruskal's)", xp: 80, difficulty: 'hard', problems: 6 },
                ],
            },
            {
                id: 'dsa-dp',
                title: 'Dynamic Programming',
                description: 'The Ultimate Boss Level - Striver DP Series',
                icon: '🧠',
                color: '#EC4899',
                topics: [
                    { id: 'dp-1d', name: '1D DP (Fibonacci, Climbing Stairs)', xp: 40, difficulty: 'easy', problems: 10 },
                    { id: 'dp-2d', name: '2D DP (Grid, LCS, LIS)', xp: 80, difficulty: 'medium', problems: 15 },
                    { id: 'dp-subsequences', name: 'DP on Subsequences', xp: 80, difficulty: 'medium', problems: 12 },
                    { id: 'dp-strings', name: 'DP on Strings', xp: 80, difficulty: 'medium', problems: 10 },
                    { id: 'dp-stocks', name: 'DP on Stocks', xp: 70, difficulty: 'medium', problems: 6 },
                    { id: 'dp-partition', name: 'Partition DP (MCM)', xp: 100, difficulty: 'hard', problems: 10 },
                ],
            },
            {
                id: 'dsa-backtracking',
                title: 'Backtracking',
                description: 'Permutations, Combinations, N-Queens',
                icon: '🔄',
                color: '#6366F1',
                topics: [
                    { id: 'backtrack-basics', name: 'Subsets & Permutations', xp: 50, difficulty: 'medium', problems: 10 },
                    { id: 'backtrack-hard', name: 'N-Queens, Sudoku Solver', xp: 100, difficulty: 'hard', problems: 6 },
                ],
            },
        ],
    },
    {
        id: 'development',
        name: 'Web Development',
        description: 'Full Stack Development Skills',
        color: '#06B6D4',
        gradient: 'from-cyan-500 to-blue-600',
        modules: [
            {
                id: 'dev-frontend-basics',
                title: 'Frontend Foundations',
                description: 'HTML, CSS, JavaScript Deep Dive',
                icon: '🎨',
                color: '#06B6D4',
                topics: [
                    { id: 'html-semantic', name: 'Semantic HTML & Accessibility', xp: 20, difficulty: 'easy' },
                    { id: 'css-advanced', name: 'CSS Flexbox, Grid, Animations', xp: 30, difficulty: 'medium' },
                    { id: 'js-fundamentals', name: 'JS Fundamentals (ES6+)', xp: 40, difficulty: 'medium' },
                    { id: 'js-async', name: 'Async JS (Promises, Async/Await)', xp: 50, difficulty: 'medium' },
                    { id: 'dom-events', name: 'DOM Manipulation & Events', xp: 30, difficulty: 'easy' },
                ],
            },
            {
                id: 'dev-react',
                title: 'React Mastery',
                description: 'Modern React with Hooks and Patterns',
                icon: '⚛️',
                color: '#06B6D4',
                topics: [
                    { id: 'react-basics', name: 'React Fundamentals & JSX', xp: 30, difficulty: 'easy' },
                    { id: 'react-hooks', name: 'Hooks (useState, useEffect, etc.)', xp: 50, difficulty: 'medium' },
                    { id: 'react-context', name: 'Context API & State Management', xp: 50, difficulty: 'medium' },
                    { id: 'react-router', name: 'React Router & Navigation', xp: 30, difficulty: 'easy' },
                    { id: 'react-forms', name: 'Forms & Validation', xp: 40, difficulty: 'medium' },
                    { id: 'react-performance', name: 'Performance Optimization', xp: 60, difficulty: 'hard' },
                ],
            },
            {
                id: 'dev-nextjs',
                title: 'Next.js & TypeScript',
                description: 'Production-Ready Full Stack Apps',
                icon: '▲',
                color: '#06B6D4',
                topics: [
                    { id: 'typescript', name: 'TypeScript Fundamentals', xp: 50, difficulty: 'medium' },
                    { id: 'nextjs-routing', name: 'Next.js App Router', xp: 40, difficulty: 'medium' },
                    { id: 'nextjs-ssr', name: 'SSR, SSG, ISR Explained', xp: 60, difficulty: 'hard' },
                    { id: 'nextjs-api', name: 'API Routes & Server Actions', xp: 50, difficulty: 'medium' },
                    { id: 'nextjs-auth', name: 'Authentication (NextAuth)', xp: 60, difficulty: 'hard' },
                ],
            },
            {
                id: 'dev-backend',
                title: 'Backend Development',
                description: 'Node.js, Express, and APIs',
                icon: '🖥️',
                color: '#10B981',
                topics: [
                    { id: 'nodejs', name: 'Node.js Fundamentals', xp: 40, difficulty: 'medium' },
                    { id: 'express', name: 'Express.js & REST APIs', xp: 50, difficulty: 'medium' },
                    { id: 'middleware', name: 'Middleware & Error Handling', xp: 40, difficulty: 'medium' },
                    { id: 'jwt-auth', name: 'JWT & Session Auth', xp: 50, difficulty: 'medium' },
                    { id: 'file-upload', name: 'File Uploads & Storage', xp: 40, difficulty: 'medium' },
                ],
            },
            {
                id: 'dev-database',
                title: 'Databases',
                description: 'SQL, NoSQL, and ORMs',
                icon: '🗃️',
                color: '#F59E0B',
                topics: [
                    { id: 'sql-basics', name: 'SQL Fundamentals', xp: 40, difficulty: 'medium' },
                    { id: 'sql-advanced', name: 'Joins, Subqueries, Indexes', xp: 60, difficulty: 'hard' },
                    { id: 'mongodb', name: 'MongoDB & Mongoose', xp: 50, difficulty: 'medium' },
                    { id: 'prisma', name: 'Prisma ORM', xp: 50, difficulty: 'medium' },
                    { id: 'postgres', name: 'PostgreSQL Deep Dive', xp: 60, difficulty: 'hard' },
                ],
            },
            {
                id: 'dev-projects',
                title: 'Portfolio Projects',
                description: 'Build Real-World Applications',
                icon: '🚀',
                color: '#EC4899',
                topics: [
                    { id: 'project-portfolio', name: 'Personal Portfolio Website', xp: 100, difficulty: 'medium' },
                    { id: 'project-ecommerce', name: 'E-Commerce Store', xp: 150, difficulty: 'hard' },
                    { id: 'project-social', name: 'Social Media App', xp: 150, difficulty: 'hard' },
                    { id: 'project-saas', name: 'SaaS Dashboard', xp: 150, difficulty: 'hard' },
                ],
            },
        ],
    },
    {
        id: 'cs-fundamentals',
        name: 'CS Fundamentals',
        description: 'System Design, OS, DBMS, and More',
        color: '#F97316',
        gradient: 'from-orange-500 to-red-600',
        modules: [
            {
                id: 'cs-system-design',
                title: 'System Design',
                description: 'Build Scalable Systems',
                icon: '🏗️',
                color: '#F97316',
                topics: [
                    { id: 'sd-basics', name: 'Scalability & Load Balancing', xp: 60, difficulty: 'medium' },
                    { id: 'sd-caching', name: 'Caching Strategies (Redis)', xp: 60, difficulty: 'medium' },
                    { id: 'sd-database', name: 'Database Design & Sharding', xp: 80, difficulty: 'hard' },
                    { id: 'sd-message-queue', name: 'Message Queues (Kafka, RabbitMQ)', xp: 70, difficulty: 'hard' },
                    { id: 'sd-microservices', name: 'Microservices Architecture', xp: 80, difficulty: 'hard' },
                    { id: 'sd-case-studies', name: 'Design Twitter/Uber/Netflix', xp: 100, difficulty: 'hard' },
                ],
            },
            {
                id: 'cs-os',
                title: 'Operating Systems',
                description: 'Process, Memory, and File Systems',
                icon: '💻',
                color: '#F97316',
                topics: [
                    { id: 'os-process', name: 'Process & Threads', xp: 50, difficulty: 'medium' },
                    { id: 'os-scheduling', name: 'CPU Scheduling', xp: 40, difficulty: 'medium' },
                    { id: 'os-sync', name: 'Synchronization & Deadlocks', xp: 60, difficulty: 'hard' },
                    { id: 'os-memory', name: 'Memory Management & Paging', xp: 50, difficulty: 'medium' },
                    { id: 'os-file', name: 'File Systems', xp: 40, difficulty: 'medium' },
                ],
            },
            {
                id: 'cs-dbms',
                title: 'DBMS Concepts',
                description: 'Database Theory and Internals',
                icon: '📀',
                color: '#F97316',
                topics: [
                    { id: 'dbms-normalization', name: 'Normalization (1NF-BCNF)', xp: 40, difficulty: 'medium' },
                    { id: 'dbms-transactions', name: 'Transactions & ACID', xp: 50, difficulty: 'medium' },
                    { id: 'dbms-indexing', name: 'Indexing (B+ Trees)', xp: 60, difficulty: 'hard' },
                    { id: 'dbms-concurrency', name: 'Concurrency Control', xp: 60, difficulty: 'hard' },
                ],
            },
            {
                id: 'cs-networking',
                title: 'Computer Networks',
                description: 'TCP/IP, HTTP, and WebSockets',
                icon: '🌐',
                color: '#F97316',
                topics: [
                    { id: 'net-osi', name: 'OSI Model & TCP/IP', xp: 40, difficulty: 'medium' },
                    { id: 'net-http', name: 'HTTP/HTTPS & REST', xp: 40, difficulty: 'medium' },
                    { id: 'net-dns', name: 'DNS & CDN', xp: 30, difficulty: 'easy' },
                    { id: 'net-websocket', name: 'WebSockets & Real-time', xp: 50, difficulty: 'medium' },
                ],
            },
            {
                id: 'cs-ai-basics',
                title: 'AI/ML Basics',
                description: 'Understanding AI in Development',
                icon: '🤖',
                color: '#8B5CF6',
                topics: [
                    { id: 'ai-intro', name: 'AI/ML Fundamentals', xp: 40, difficulty: 'medium' },
                    { id: 'ai-prompting', name: 'Prompt Engineering', xp: 30, difficulty: 'easy' },
                    { id: 'ai-integration', name: 'Integrating AI APIs (OpenAI)', xp: 50, difficulty: 'medium' },
                    { id: 'ai-vector-db', name: 'Vector Databases & RAG', xp: 60, difficulty: 'hard' },
                ],
            },
            {
                id: 'cs-interview',
                title: 'Interview Prep',
                description: 'Final Sprint to 10 LPA',
                icon: '🎯',
                color: '#EC4899',
                topics: [
                    { id: 'resume', name: 'Resume & LinkedIn Optimization', xp: 30, difficulty: 'easy' },
                    { id: 'mock-interviews', name: 'Mock Interviews (10+)', xp: 100, difficulty: 'hard' },
                    { id: 'hr-questions', name: 'HR & Behavioral Questions', xp: 40, difficulty: 'medium' },
                    { id: 'salary-negotiation', name: 'Salary Negotiation', xp: 30, difficulty: 'easy' },
                ],
            },
        ],
    },
];

// DSA Sheet Resources
export const DSA_SHEETS = [
    {
        id: 'striver-sde',
        name: "Striver's SDE Sheet",
        description: '191 handpicked problems covering all important topics',
        url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/',
        problems: 191,
        icon: '🎯',
        color: '#EF4444',
    },
    {
        id: 'striver-a2z',
        name: "Striver's A2Z DSA Sheet",
        description: 'Complete DSA course with 450+ problems',
        url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
        problems: 455,
        icon: '📚',
        color: '#8B5CF6',
    },
    {
        id: 'neetcode-150',
        name: 'NeetCode 150',
        description: 'Curated list of 150 LeetCode problems by patterns',
        url: 'https://neetcode.io/practice',
        problems: 150,
        icon: '💡',
        color: '#10B981',
    },
    {
        id: 'neetcode-roadmap',
        name: 'NeetCode Roadmap',
        description: 'Visual roadmap with video explanations',
        url: 'https://neetcode.io/roadmap',
        problems: 150,
        icon: '🗺️',
        color: '#06B6D4',
    },
    {
        id: 'blind-75',
        name: 'Blind 75',
        description: 'The original 75 must-do LeetCode problems',
        url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions',
        problems: 75,
        icon: '👁️',
        color: '#F59E0B',
    },
    {
        id: 'love-babbar',
        name: "Love Babbar's DSA Sheet",
        description: '450 DSA problems for interview prep',
        url: 'https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/',
        problems: 450,
        icon: '❤️',
        color: '#EC4899',
    },
];

// Daily motivational quotes
export const MOTIVATIONAL_QUOTES = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { quote: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
    { quote: "It's not a bug – it's an undocumented feature.", author: "Anonymous" },
    { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { quote: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
    { quote: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
    { quote: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { quote: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
    { quote: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" },
    { quote: "Knowledge is power.", author: "Francis Bacon" },
    { quote: "Deleted code is debugged code.", author: "Jeff Sickel" },
    { quote: "The most damaging phrase in the language is 'We've always done it this way.'", author: "Grace Hopper" },
    { quote: "Everyday brings new possibilities. Stay hungry, stay foolish.", author: "Steve Jobs" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "10 LPA is not a dream, it's a target. And targets are meant to be hit!", author: "You" },
    { quote: "Every expert was once a beginner.", author: "Helen Hayes" },
    { quote: "The harder you work, the luckier you get.", author: "Gary Player" },
    { quote: "Your limitation—it's only your imagination.", author: "Unknown" },
    { quote: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { quote: "Great things never come from comfort zones.", author: "Unknown" },
    { quote: "Dream it. Wish it. Do it.", author: "Unknown" },
    { quote: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
    { quote: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
    { quote: "Dream bigger. Do bigger.", author: "Unknown" },
];

// Get a consistent quote for the day
export const getDailyQuote = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
};

// Calculate total stats from roadmap
export const calculateRoadmapStats = (completedTopics: string[]) => {
    let totalTopics = 0;
    let totalXP = 0;
    let earnedXP = 0;
    let completedCount = 0;

    ROADMAP.forEach(pillar => {
        pillar.modules.forEach(module => {
            module.topics.forEach(topic => {
                totalTopics++;
                totalXP += topic.xp;
                if (completedTopics.includes(topic.id)) {
                    completedCount++;
                    earnedXP += topic.xp;
                }
            });
        });
    });

    return {
        totalTopics,
        completedTopics: completedCount,
        progressPercent: totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0,
        totalXP,
        earnedXP,
    };
};
