export type InterviewQuestionData = {
    id: string;
    question: string;
    category: 'behavioral' | 'technical' | 'system-design' | 'coding';
    difficulty: 'easy' | 'medium' | 'hard';
    tips: string[];
    sampleAnswer?: string;
    framework?: string;
};

export const INTERVIEW_QUESTIONS: InterviewQuestionData[] = [
    // Behavioral Questions (STAR Method)
    {
        id: 'beh-1',
        question: 'Tell me about yourself.',
        category: 'behavioral',
        difficulty: 'easy',
        framework: 'Present-Past-Future',
        tips: [
            'Keep it 2-3 minutes max',
            'Focus on professional journey',
            'End with why youre excited about this role',
            'Highlight relevant achievements',
        ],
        sampleAnswer: 'Im a software developer with X years of experience specializing in [tech stack]. Currently at [company], I lead/work on [project]. Previously, I [achievement]. Im excited about this role because [specific reason tied to company/role].',
    },
    {
        id: 'beh-2',
        question: 'Describe a challenging project you worked on.',
        category: 'behavioral',
        difficulty: 'medium',
        framework: 'STAR (Situation, Task, Action, Result)',
        tips: [
            'Pick a technically challenging project',
            'Quantify the impact if possible',
            'Highlight your specific contributions',
            'Mention lessons learned',
        ],
    },
    {
        id: 'beh-3',
        question: 'Tell me about a time you disagreed with your team.',
        category: 'behavioral',
        difficulty: 'medium',
        framework: 'STAR',
        tips: [
            'Show you can disagree professionally',
            'Focus on the resolution, not the conflict',
            'Demonstrate collaboration skills',
            'Never badmouth colleagues',
        ],
    },
    {
        id: 'beh-4',
        question: 'How do you handle tight deadlines?',
        category: 'behavioral',
        difficulty: 'easy',
        tips: [
            'Give a specific example',
            'Show prioritization skills',
            'Mention communication with stakeholders',
            'Discuss trade-off decisions',
        ],
    },
    {
        id: 'beh-5',
        question: 'Describe a time you failed and what you learned.',
        category: 'behavioral',
        difficulty: 'hard',
        framework: 'STAR + Reflection',
        tips: [
            'Be honest about a real failure',
            'Focus more on what you learned',
            'Show growth mindset',
            'Explain how you prevent similar issues now',
        ],
    },
    {
        id: 'beh-6',
        question: 'Why do you want to work here?',
        category: 'behavioral',
        difficulty: 'easy',
        tips: [
            'Research the company thoroughly',
            'Mention specific products/projects',
            'Connect to your career goals',
            'Show genuine enthusiasm',
        ],
    },
    {
        id: 'beh-7',
        question: 'Where do you see yourself in 5 years?',
        category: 'behavioral',
        difficulty: 'easy',
        tips: [
            'Show ambition but be realistic',
            'Align with companys growth opportunities',
            'Mention skills you want to develop',
            'Avoid mentioning other companies',
        ],
    },
    {
        id: 'beh-8',
        question: 'How do you stay updated with technology?',
        category: 'behavioral',
        difficulty: 'easy',
        tips: [
            'Mention specific resources (blogs, newsletters)',
            'Talk about side projects',
            'Mention communities you follow',
            'Show continuous learning mindset',
        ],
    },

    // Technical Questions
    {
        id: 'tech-1',
        question: 'Explain the difference between REST and GraphQL.',
        category: 'technical',
        difficulty: 'medium',
        tips: [
            'REST: Multiple endpoints, fixed data structure',
            'GraphQL: Single endpoint, flexible queries',
            'Mention over-fetching/under-fetching',
            'Use cases for each',
        ],
    },
    {
        id: 'tech-2',
        question: 'What is the difference between SQL and NoSQL databases?',
        category: 'technical',
        difficulty: 'medium',
        tips: [
            'SQL: Structured, ACID, relational',
            'NoSQL: Flexible schema, horizontal scaling',
            'Give examples (PostgreSQL vs MongoDB)',
            'Discuss when to use each',
        ],
    },
    {
        id: 'tech-3',
        question: 'Explain the concept of closures in JavaScript.',
        category: 'technical',
        difficulty: 'medium',
        tips: [
            'Function + its lexical environment',
            'Inner function accessing outer variables',
            'Use cases: data privacy, callbacks',
            'Give a code example',
        ],
        sampleAnswer: 'A closure is a function that has access to variables from its outer scope even after the outer function has returned. This creates a private scope for data.',
    },
    {
        id: 'tech-4',
        question: 'What is the event loop in JavaScript?',
        category: 'technical',
        difficulty: 'hard',
        tips: [
            'Call stack, task queue, microtask queue',
            'Explain async execution',
            'setTimeout vs Promise timing',
            'Draw a diagram if whiteboarding',
        ],
    },
    {
        id: 'tech-5',
        question: 'Explain React hooks and their benefits.',
        category: 'technical',
        difficulty: 'medium',
        tips: [
            'Replace class components',
            'useState, useEffect, useContext, etc.',
            'Better code organization',
            'Custom hooks for reusability',
        ],
    },
    {
        id: 'tech-6',
        question: 'What is the Virtual DOM?',
        category: 'technical',
        difficulty: 'easy',
        tips: [
            'In-memory representation of real DOM',
            'Diffing algorithm for efficient updates',
            'Batch updates for performance',
            'React reconciliation process',
        ],
    },
    {
        id: 'tech-7',
        question: 'Explain the concept of memoization.',
        category: 'technical',
        difficulty: 'medium',
        tips: [
            'Caching function results',
            'Avoid redundant calculations',
            'Space-time tradeoff',
            'React.memo, useMemo, useCallback',
        ],
    },
    {
        id: 'tech-8',
        question: 'What is TypeScript and why use it?',
        category: 'technical',
        difficulty: 'easy',
        tips: [
            'Static type checking',
            'Better IDE support and autocompletion',
            'Catch errors at compile time',
            'Improved code documentation',
        ],
    },

    // System Design Questions
    {
        id: 'sd-1',
        question: 'Design a URL shortener like bit.ly.',
        category: 'system-design',
        difficulty: 'medium',
        tips: [
            'Hash function or counter for short codes',
            'Database schema (URL, shortCode, created)',
            'Caching layer (Redis)',
            'Handle collisions and analytics',
        ],
    },
    {
        id: 'sd-2',
        question: 'Design a rate limiter.',
        category: 'system-design',
        difficulty: 'medium',
        tips: [
            'Token bucket or sliding window algorithm',
            'Redis for distributed systems',
            'Consider different granularities',
            'Handle edge cases (burst traffic)',
        ],
    },
    {
        id: 'sd-3',
        question: 'Design a chat application.',
        category: 'system-design',
        difficulty: 'hard',
        tips: [
            'WebSockets for real-time',
            'Message queue for reliability',
            'Database design for messages',
            'Consider group chats, read receipts',
        ],
    },
    {
        id: 'sd-4',
        question: 'Design a notification system.',
        category: 'system-design',
        difficulty: 'medium',
        tips: [
            'Push, email, SMS channels',
            'Message queue for async processing',
            'User preferences database',
            'Rate limiting and batching',
        ],
    },
    {
        id: 'sd-5',
        question: 'Design an API rate limiting system.',
        category: 'system-design',
        difficulty: 'medium',
        tips: [
            'Identify the rate limiting strategy',
            'Token bucket vs leaky bucket',
            'Distributed rate limiting challenges',
            'Response codes and retry headers',
        ],
    },
    {
        id: 'sd-6',
        question: 'Design a file storage service like Dropbox.',
        category: 'system-design',
        difficulty: 'hard',
        tips: [
            'Block-level deduplication',
            'Sync conflict resolution',
            'Metadata vs file storage',
            'CDN for downloads',
        ],
    },

    // Coding Questions (Conceptual)
    {
        id: 'code-1',
        question: 'How would you reverse a linked list?',
        category: 'coding',
        difficulty: 'easy',
        tips: [
            'Three pointers: prev, current, next',
            'Iterative vs recursive approach',
            'Time: O(n), Space: O(1) iterative',
            'Handle edge cases (empty, single node)',
        ],
    },
    {
        id: 'code-2',
        question: 'Explain how you would detect a cycle in a linked list.',
        category: 'coding',
        difficulty: 'medium',
        tips: [
            'Floyds cycle detection (tortoise and hare)',
            'Fast pointer moves 2x',
            'If they meet, cycle exists',
            'To find cycle start: reset one pointer',
        ],
    },
    {
        id: 'code-3',
        question: 'How would you find the kth largest element in an array?',
        category: 'coding',
        difficulty: 'medium',
        tips: [
            'Min heap of size k: O(n log k)',
            'QuickSelect: O(n) average',
            'Full sort: O(n log n)',
            'Consider space constraints',
        ],
    },
    {
        id: 'code-4',
        question: 'Explain BFS vs DFS and their use cases.',
        category: 'coding',
        difficulty: 'easy',
        tips: [
            'BFS: Level-order, shortest path (unweighted)',
            'DFS: Memory efficient, topological sort',
            'BFS uses queue, DFS uses stack/recursion',
            'Space complexity differences',
        ],
    },
    {
        id: 'code-5',
        question: 'How would you implement LRU Cache?',
        category: 'coding',
        difficulty: 'hard',
        tips: [
            'HashMap + Doubly Linked List',
            'O(1) get and put operations',
            'Move to front on access',
            'Remove from tail on capacity',
        ],
    },
    {
        id: 'code-6',
        question: 'Explain the two-pointer technique with examples.',
        category: 'coding',
        difficulty: 'easy',
        tips: [
            'Start/end pointers for sorted arrays',
            'Slow/fast for linked lists',
            'Two Sum, Container With Most Water',
            'Often reduces O(n²) to O(n)',
        ],
    },
    {
        id: 'code-7',
        question: 'How would you merge two sorted arrays?',
        category: 'coding',
        difficulty: 'easy',
        tips: [
            'Two pointers, one for each array',
            'Compare and add smaller element',
            'Handle remaining elements',
            'In-place if one array has extra space',
        ],
    },
    {
        id: 'code-8',
        question: 'Explain dynamic programming with an example.',
        category: 'coding',
        difficulty: 'hard',
        tips: [
            'Break problem into overlapping subproblems',
            'Memoization (top-down) or tabulation (bottom-up)',
            'Classic examples: Fibonacci, Knapsack',
            'Identify state and transitions',
        ],
    },
];

export const QUESTION_CATEGORIES = [
    { id: 'behavioral', label: 'Behavioral', icon: '🗣️', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'technical', label: 'Technical', icon: '⚙️', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'system-design', label: 'System Design', icon: '🏗️', color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'coding', label: 'Coding', icon: '💻', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
];
