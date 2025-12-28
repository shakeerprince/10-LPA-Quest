// DSA Calendar 2026 | Plan of Action
// Source: https://gist.github.com/PrinceSinghhub/2ac8a1216c638e559123262dae4f1c1f
// Credits: PrinceSinghhub

export type Difficulty = 'Easy' | 'Easy–Medium' | 'Medium' | 'Medium–Hard' | 'Hard';
export type Importance = 1 | 2 | 3 | 4 | 5;

export interface DSATopic {
    id: string;
    name: string;
    duration: string;
    minProblems: string;
    importance: Importance;
    difficulty: Difficulty;
    tags: string[];
    xp: number;
}

export interface DSAPattern {
    id: string;
    topic: string;
    pattern: string;
    duration: string;
    minProblems: string;
    importance: Importance;
    difficulty: Difficulty;
    tags: string[];
    xp: number;
}

export interface Phase {
    id: string;
    name: string;
    emoji: string;
    color: string;
    gradient: string;
    description: string;
    steps: {
        title: string;
        content: string[];
    }[];
}

// XP calculation based on difficulty and importance
const calculateXP = (difficulty: Difficulty, importance: Importance): number => {
    const difficultyMultiplier: Record<Difficulty, number> = {
        'Easy': 10,
        'Easy–Medium': 15,
        'Medium': 20,
        'Medium–Hard': 30,
        'Hard': 40,
    };
    return difficultyMultiplier[difficulty] * importance;
};

// Phase 1, 2, 3 data
export const DSA_PHASES: Phase[] = [
    {
        id: 'phase-1',
        name: 'Foundation Level Preparation',
        emoji: '🟢',
        color: '#22C55E',
        gradient: 'from-green-500 to-emerald-600',
        description: 'For beginners - build your programming foundation',
        steps: [
            {
                title: '✅ Step 1: Pick ONE Programming Language',
                content: [
                    'Choose one: C++ / Java / Python / JavaScript',
                    '❌ No language hopping',
                    '❌ No framework first',
                    'Learn: Variables, Conditions, Loops, Functions, Arrays, Strings, Basic Recursion',
                ],
            },
            {
                title: '✅ Step 2: Build Logical Thinking',
                content: [
                    'Start solving simple programming problems',
                    'Use 150 Programming Problems Sheet',
                    'Builds logical thinking & problem understanding',
                    '👉 Don\'t rush, Don\'t skip!',
                ],
            },
        ],
    },
    {
        id: 'phase-2',
        name: 'Data Structures & Algorithms',
        emoji: '🟡',
        color: '#EAB308',
        gradient: 'from-yellow-500 to-amber-600',
        description: 'Structured DSA learning - 3-4 months',
        steps: [
            {
                title: '🎯 Goals in this phase',
                content: [
                    'Understand DSA concepts',
                    'Learn patterns',
                    'Understand algorithm flow',
                    '❌ NOT memorizing solutions',
                ],
            },
            {
                title: '✅ What to Do',
                content: [
                    'Pick ONE high-quality DSA resource',
                    'Cover topics from 0 → advanced',
                    'Solve 300–400 quality problems',
                    'Focus on WHY solutions work',
                ],
            },
        ],
    },
    {
        id: 'phase-3',
        name: 'Problem-Solving Level',
        emoji: '🔴',
        color: '#EF4444',
        gradient: 'from-red-500 to-rose-600',
        description: 'THE REAL PREPARATION - 4-6 months',
        steps: [
            {
                title: '✅ What to Do Daily',
                content: [
                    'Solve POTD (Problem of the Day)',
                    'Solve random Easy & Medium problems',
                    '❌ Stop following sheets blindly',
                ],
            },
            {
                title: '🧠 Contest Strategy',
                content: [
                    'Start with 10–20 virtual contests',
                    'Focus on thinking under pressure',
                    'Time management & approach clarity',
                    'Then move to real contests',
                ],
            },
        ],
    },
];

// Chart 1: DSA Topics - 19 topics
export const DSA_TOPICS: DSATopic[] = [
    { id: 'topic-1', name: 'Time & Space Complexity', duration: '2–3 Days', minProblems: '10–15', importance: 5, difficulty: 'Easy', tags: ['Basics'], xp: 50 },
    { id: 'topic-2', name: 'Arrays', duration: '2 Weeks', minProblems: '40–50', importance: 5, difficulty: 'Easy–Medium', tags: ['Core', 'Foundation'], xp: 75 },
    { id: 'topic-3', name: 'Strings', duration: '1 Week', minProblems: '25–30', importance: 4, difficulty: 'Easy–Medium', tags: ['Core'], xp: 60 },
    { id: 'topic-4', name: 'Recursion Basics', duration: '5–7 Days', minProblems: '20–25', importance: 5, difficulty: 'Medium', tags: ['Core', 'Foundation'], xp: 100 },
    { id: 'topic-5', name: 'Linked List', duration: '1 Week', minProblems: '25–30', importance: 4, difficulty: 'Medium', tags: ['Core'], xp: 80 },
    { id: 'topic-6', name: 'Stack', duration: '5–7 Days', minProblems: '20–25', importance: 4, difficulty: 'Medium', tags: ['Core'], xp: 80 },
    { id: 'topic-7', name: 'Queue & Deque', duration: '3–4 Days', minProblems: '15–20', importance: 3, difficulty: 'Easy–Medium', tags: ['Core'], xp: 45 },
    { id: 'topic-8', name: 'Hashing', duration: '1 Week', minProblems: '25–30', importance: 5, difficulty: 'Medium', tags: ['Core', 'Foundation'], xp: 100 },
    { id: 'topic-9', name: 'Binary Search (Pattern)', duration: '1 Week', minProblems: '25–30', importance: 5, difficulty: 'Medium', tags: ['Core', 'Pattern'], xp: 100 },
    { id: 'topic-10', name: 'Binary Tree', duration: '2 Weeks', minProblems: '40–50', importance: 5, difficulty: 'Medium', tags: ['Core', 'Foundation'], xp: 100 },
    { id: 'topic-11', name: 'Binary Search Tree (BST)', duration: '5–7 Days', minProblems: '20–25', importance: 4, difficulty: 'Medium', tags: ['Core'], xp: 80 },
    { id: 'topic-12', name: 'Heap / Priority Queue', duration: '5–7 Days', minProblems: '20–25', importance: 4, difficulty: 'Medium', tags: ['Core'], xp: 80 },
    { id: 'topic-13', name: 'Greedy Algorithms', duration: '5–7 Days', minProblems: '20–25', importance: 4, difficulty: 'Medium', tags: ['Advanced'], xp: 80 },
    { id: 'topic-14', name: 'Backtracking', duration: '1 Week', minProblems: '20–25', importance: 4, difficulty: 'Medium–Hard', tags: ['Advanced'], xp: 120 },
    { id: 'topic-15', name: 'Dynamic Programming', duration: '3–4 Weeks', minProblems: '50–60', importance: 5, difficulty: 'Hard', tags: ['Core', 'Advanced'], xp: 200 },
    { id: 'topic-16', name: 'Graph Basics (BFS/DFS)', duration: '1 Week', minProblems: '25–30', importance: 5, difficulty: 'Medium', tags: ['Core', 'Foundation'], xp: 100 },
    { id: 'topic-17', name: 'Advanced Graphs (MST, SP, DAG)', duration: '2 Weeks', minProblems: '30–35', importance: 4, difficulty: 'Hard', tags: ['Advanced'], xp: 160 },
    { id: 'topic-18', name: 'Bit Manipulation', duration: '3–4 Days', minProblems: '15–20', importance: 3, difficulty: 'Easy–Medium', tags: ['Optional'], xp: 45 },
    { id: 'topic-19', name: 'Math & Number Theory', duration: '3–4 Days', minProblems: '10–15', importance: 2, difficulty: 'Easy', tags: ['Optional'], xp: 20 },
];

// Chart 2: DSA Patterns - 90+ patterns organized by topic
export const DSA_PATTERNS: DSAPattern[] = [
    // Array Patterns
    { id: 'pat-1', topic: 'Array', pattern: 'Two Pointers', duration: '2–3 Days', minProblems: '15–20', importance: 5, difficulty: 'Easy', tags: ['Pattern', 'Core'], xp: 50 },
    { id: 'pat-2', topic: 'Array', pattern: 'Sliding Window', duration: '2 Days', minProblems: '10–15', importance: 5, difficulty: 'Easy', tags: ['Pattern', 'Core'], xp: 50 },
    { id: 'pat-3', topic: 'Array', pattern: 'Prefix Sums', duration: '1–2 Days', minProblems: '8–10', importance: 4, difficulty: 'Easy', tags: ['Pattern'], xp: 40 },
    { id: 'pat-4', topic: 'Array', pattern: 'Difference Array', duration: '1 Day', minProblems: '5–6', importance: 4, difficulty: 'Easy', tags: ['Pattern'], xp: 40 },
    { id: 'pat-5', topic: 'Array', pattern: 'Merge Intervals', duration: '2 Days', minProblems: '10–12', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-6', topic: 'Array', pattern: 'Subarray / Subsequence', duration: '2 Days', minProblems: '10–12', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-7', topic: 'Array', pattern: "Kadane's Algorithm", duration: '1 Day', minProblems: '5–6', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-8', topic: 'Array', pattern: 'Cyclic Sort Pattern', duration: '1 Day', minProblems: '5–6', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-9', topic: 'Array', pattern: 'Dutch National Flag', duration: '1 Day', minProblems: '4–5', importance: 3, difficulty: 'Medium', tags: ['Pattern'], xp: 60 },

    // Binary Search Patterns
    { id: 'pat-10', topic: 'Binary Search', pattern: 'Basic Binary Search', duration: '1–2 Days', minProblems: '8–10', importance: 5, difficulty: 'Easy', tags: ['Pattern', 'Core'], xp: 50 },
    { id: 'pat-11', topic: 'Binary Search', pattern: 'Range Search', duration: '1 Day', minProblems: '5–6', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-12', topic: 'Binary Search', pattern: 'Allocation Problems', duration: '2 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-13', topic: 'Binary Search', pattern: 'Binary Search on Answer', duration: '2 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium–Hard', tags: ['Pattern', 'Core'], xp: 150 },
    { id: 'pat-14', topic: 'Binary Search', pattern: 'First True / Last False', duration: '1 Day', minProblems: '4–5', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-15', topic: 'Binary Search', pattern: 'Peak Finding', duration: '1 Day', minProblems: '4–5', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },

    // String Patterns
    { id: 'pat-16', topic: 'String', pattern: 'Two Pointers', duration: '1–2 Days', minProblems: '8–10', importance: 4, difficulty: 'Easy', tags: ['Pattern'], xp: 40 },
    { id: 'pat-17', topic: 'String', pattern: 'Sliding Window', duration: '1–2 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-18', topic: 'String', pattern: 'HashMap / Frequency', duration: '2 Days', minProblems: '10–12', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-19', topic: 'String', pattern: 'Anagram Pattern', duration: '1 Day', minProblems: '5–6', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-20', topic: 'String', pattern: 'Trie Based Problems', duration: '2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },

    // Recursion Patterns
    { id: 'pat-21', topic: 'Recursion', pattern: 'Basic Recursive Functions', duration: '1–2 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-22', topic: 'Recursion', pattern: 'Divide & Conquer', duration: '1–2 Days', minProblems: '6–8', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-23', topic: 'Recursion', pattern: 'Backtracking', duration: '2–3 Days', minProblems: '10–12', importance: 5, difficulty: 'Medium–Hard', tags: ['Pattern', 'Core'], xp: 150 },
    { id: 'pat-24', topic: 'Recursion', pattern: 'Recursion → DP Conversion', duration: '1–2 Days', minProblems: '6–8', importance: 5, difficulty: 'Hard', tags: ['Pattern', 'Core'], xp: 200 },

    // Linked List Patterns
    { id: 'pat-25', topic: 'Linked List', pattern: 'Fast & Slow Pointers', duration: '2 Days', minProblems: '10–12', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-26', topic: 'Linked List', pattern: 'In-Place Reversal', duration: '1–2 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-27', topic: 'Linked List', pattern: 'Dummy Node Technique', duration: '1 Day', minProblems: '5–6', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-28', topic: 'Linked List', pattern: 'Merge & Intersection', duration: '1 Day', minProblems: '5–6', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },

    // Stack/Queue Patterns
    { id: 'pat-29', topic: 'Stack', pattern: 'Monotonic Stack', duration: '2 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-30', topic: 'Stack', pattern: 'Histogram Pattern', duration: '1–2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-31', topic: 'Stack', pattern: 'Next Greater/Smaller', duration: '1 Day', minProblems: '6–8', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-32', topic: 'Stack', pattern: 'Expression Evaluation', duration: '1–2 Days', minProblems: '6–8', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-33', topic: 'Queue', pattern: 'Monotonic Queue', duration: '2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },

    // Tree Patterns
    { id: 'pat-34', topic: 'Tree', pattern: 'Traversals', duration: '2 Days', minProblems: '10–12', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-35', topic: 'Tree', pattern: 'Construction', duration: '2 Days', minProblems: '8–10', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-36', topic: 'Tree', pattern: 'Path Sum / Root to Leaf', duration: '1–2 Days', minProblems: '6–8', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-37', topic: 'Tree', pattern: 'LCA & Diameter', duration: '2 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-38', topic: 'Tree', pattern: 'Tree Views (Top/Bottom)', duration: '1 Day', minProblems: '4–5', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },

    // Heap Patterns
    { id: 'pat-39', topic: 'Heap', pattern: 'Kth Largest/Smallest', duration: '1–2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-40', topic: 'Heap', pattern: 'Top K Frequent', duration: '1 Day', minProblems: '5–6', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-41', topic: 'Heap', pattern: 'Merge K Lists', duration: '1 Day', minProblems: '4–5', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-42', topic: 'Heap', pattern: 'Sliding Window Max/Min', duration: '1 Day', minProblems: '4–5', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-43', topic: 'Heap', pattern: 'Streaming Data (Median)', duration: '1–2 Days', minProblems: '4–6', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },

    // DP Patterns
    { id: 'pat-44', topic: 'DP', pattern: 'Basic Dynamic Programming', duration: '2–3 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-45', topic: 'DP', pattern: 'Optimal Substructure', duration: '1–2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-46', topic: 'DP', pattern: 'DP on Subsequences', duration: '2 Days', minProblems: '8–10', importance: 5, difficulty: 'Hard', tags: ['Pattern', 'Core'], xp: 200 },
    { id: 'pat-47', topic: 'DP', pattern: 'Knapsack Problems', duration: '3 Days', minProblems: '10–12', importance: 5, difficulty: 'Hard', tags: ['Pattern', 'Core'], xp: 200 },
    { id: 'pat-48', topic: 'DP', pattern: 'Interval / Range DP', duration: '2 Days', minProblems: '6–8', importance: 4, difficulty: 'Hard', tags: ['Pattern'], xp: 160 },
    { id: 'pat-49', topic: 'DP', pattern: 'Counting DP', duration: '2 Days', minProblems: '6–8', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-50', topic: 'DP', pattern: 'DP on Trees', duration: '2 Days', minProblems: '6–8', importance: 4, difficulty: 'Hard', tags: ['Pattern', 'Advanced'], xp: 160 },
    { id: 'pat-51', topic: 'DP', pattern: 'Bitmask DP', duration: '2 Days', minProblems: '5–6', importance: 4, difficulty: 'Hard', tags: ['Pattern', 'Advanced'], xp: 160 },

    // Graph Patterns
    { id: 'pat-52', topic: 'Graph', pattern: 'Connected Components', duration: '1–2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-53', topic: 'Graph', pattern: 'Grid-Based BFS/DFS', duration: '1–2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-54', topic: 'Graph', pattern: 'Multi-Source BFS', duration: '1 Day', minProblems: '4–5', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-55', topic: 'Graph', pattern: 'Cycle Detection', duration: '1–2 Days', minProblems: '6–8', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-56', topic: 'Graph', pattern: 'Bipartite Graph Check', duration: '1 Day', minProblems: '4–5', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-57', topic: 'Graph', pattern: 'Shortest Path (BFS/Dijkstra)', duration: '2–3 Days', minProblems: '8–10', importance: 5, difficulty: 'Medium–Hard', tags: ['Pattern', 'Core'], xp: 150 },
    { id: 'pat-58', topic: 'Graph', pattern: 'Union-Find (DSU)', duration: '1–2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
    { id: 'pat-59', topic: 'Graph', pattern: 'Minimum Spanning Tree', duration: '2 Days', minProblems: '6–8', importance: 4, difficulty: 'Medium', tags: ['Pattern'], xp: 80 },
    { id: 'pat-60', topic: 'Graph', pattern: 'DAG / Topological Sort', duration: '1–2 Days', minProblems: '6–8', importance: 5, difficulty: 'Medium', tags: ['Pattern', 'Core'], xp: 100 },
];

// Advanced Concepts
export const ADVANCED_CONCEPTS = [
    'Segment Tree & Fenwick Tree (BIT)',
    'Disjoint Set Union (Union-Find)',
    'KMP & Rabin-Karp Algorithm',
    'Number Theory & Mathematics',
    'Advanced Graph Algorithms (Tarjan\'s, Floyd-Warshall)',
    'Suffix Array & Suffix Tree',
    'Mo\'s Algorithm',
    'Game Theory (Grundy numbers, Nim Game)',
    'Trie + Bit Manipulation',
    'Heavy-Light Decomposition (HLD)',
];

// Calculate total XP available
export const getTotalStats = (completedTopics: string[], completedPatterns: string[]) => {
    const totalTopicsXP = DSA_TOPICS.reduce((sum, t) => sum + t.xp, 0);
    const totalPatternsXP = DSA_PATTERNS.reduce((sum, p) => sum + p.xp, 0);

    const earnedTopicsXP = DSA_TOPICS
        .filter(t => completedTopics.includes(t.id))
        .reduce((sum, t) => sum + t.xp, 0);
    const earnedPatternsXP = DSA_PATTERNS
        .filter(p => completedPatterns.includes(p.id))
        .reduce((sum, p) => sum + p.xp, 0);

    return {
        totalTopics: DSA_TOPICS.length,
        completedTopicsCount: completedTopics.length,
        totalPatterns: DSA_PATTERNS.length,
        completedPatternsCount: completedPatterns.length,
        totalXP: totalTopicsXP + totalPatternsXP,
        earnedXP: earnedTopicsXP + earnedPatternsXP,
        progressPercent: Math.round(
            ((completedTopics.length + completedPatterns.length) /
                (DSA_TOPICS.length + DSA_PATTERNS.length)) * 100
        ),
    };
};

// Group patterns by topic
export const getPatternsByTopic = () => {
    const grouped: Record<string, DSAPattern[]> = {};
    DSA_PATTERNS.forEach(pattern => {
        if (!grouped[pattern.topic]) {
            grouped[pattern.topic] = [];
        }
        grouped[pattern.topic].push(pattern);
    });
    return grouped;
};
