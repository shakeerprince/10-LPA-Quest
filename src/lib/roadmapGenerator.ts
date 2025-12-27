// Dynamic Roadmap Generator based on onboarding answers
// Generates a personalized study plan based on role, timeframe, and company type

export type RoadmapRole = 'full-stack' | 'frontend' | 'backend' | 'sde';
export type CompanyType = 'FAANG' | 'Startups' | 'Service_Based' | 'Mixed';
export type Timeframe = '3_months' | '6_months';

export interface RoadmapResource {
    name: string;
    link: string;
    type: 'video' | 'article' | 'practice';
}

export interface RoadmapDay {
    day: number;
    week: number;
    month: number;
    phase: string;
    title: string;
    topics: string[];
    resources: RoadmapResource[];
    xp: number;
    isRestDay: boolean;
    category: 'dsa' | 'development' | 'cs-fundamentals' | 'project' | 'interview' | 'rest';
}

export interface GeneratedRoadmap {
    totalDays: number;
    role: RoadmapRole;
    companyType: CompanyType;
    timeframe: Timeframe;
    phases: string[];
    schedule: RoadmapDay[];
    createdAt: string;
}

// DSA Topics with resources
const DSA_CONTENT = {
    'time-complexity': {
        title: 'Time & Space Complexity',
        topics: ['Big O Notation', 'Best/Average/Worst Case', 'Space Complexity', 'Common complexities O(1), O(n), O(log n)'],
        resources: [
            { name: 'Striver: Time Complexity', link: 'https://takeuforward.org/data-structure/time-complexity-analysis/', type: 'article' as const },
            { name: 'Big O Cheatsheet', link: 'https://www.bigocheatsheet.com/', type: 'article' as const },
        ],
        xp: 25,
    },
    'arrays-basics': {
        title: 'Arrays Fundamentals',
        topics: ['Array Memory Layout', 'Dynamic Arrays', 'Basic Operations', 'Insertion & Deletion'],
        resources: [
            { name: 'LeetCode: Arrays', link: 'https://leetcode.com/explore/learn/card/fun-with-arrays/', type: 'practice' as const },
        ],
        xp: 30,
    },
    'two-pointers': {
        title: 'Two Pointers Technique',
        topics: ['Two Sum Variants', 'Reverse Array/String', 'Partitioning', 'Dutch National Flag'],
        resources: [
            { name: 'Two Pointers Patterns', link: 'https://leetcode.com/discuss/study-guide/1688903/', type: 'article' as const },
        ],
        xp: 40,
    },
    'sliding-window': {
        title: 'Sliding Window',
        topics: ['Fixed Size Window', 'Variable Size Window', 'String Problems', 'Maximum/Minimum Subarray'],
        resources: [
            { name: 'Sliding Window Patterns', link: 'https://leetcode.com/discuss/study-guide/657507/', type: 'article' as const },
        ],
        xp: 45,
    },
    'hashing': {
        title: 'Hashing & HashMaps',
        topics: ['Hash Function Basics', 'Collision Resolution', 'Sets vs Maps', 'Frequency Counting'],
        resources: [
            { name: 'Hashing Guide', link: 'https://www.geeksforgeeks.org/hashing-set-1-introduction/', type: 'article' as const },
        ],
        xp: 35,
    },
    'recursion': {
        title: 'Recursion Fundamentals',
        topics: ['Base Case & Recursive Step', 'Call Stack Visualization', 'Factorial & Fibonacci', 'Print Patterns'],
        resources: [
            { name: 'Striver: Recursion', link: 'https://takeuforward.org/recursion/introduction-to-recursion/', type: 'video' as const },
        ],
        xp: 40,
    },
    'backtracking': {
        title: 'Backtracking',
        topics: ['Subsets Generation', 'Permutations', 'Combination Sum', 'N-Queens Basics'],
        resources: [
            { name: 'Backtracking Patterns', link: 'https://leetcode.com/explore/learn/card/recursion-ii/', type: 'practice' as const },
        ],
        xp: 50,
    },
    'linked-list': {
        title: 'Linked Lists',
        topics: ['Singly Linked List', 'Reverse Linked List', 'Detect Cycle', 'Merge Two Lists'],
        resources: [
            { name: 'Linked List Guide', link: 'https://leetcode.com/explore/learn/card/linked-list/', type: 'practice' as const },
        ],
        xp: 40,
    },
    'stacks': {
        title: 'Stacks',
        topics: ['Stack Operations', 'Valid Parentheses', 'Next Greater Element', 'Monotonic Stack'],
        resources: [
            { name: 'Stack Problems', link: 'https://leetcode.com/explore/learn/card/stack/', type: 'practice' as const },
        ],
        xp: 35,
    },
    'queues': {
        title: 'Queues & Deque',
        topics: ['Queue Operations', 'Circular Queue', 'Deque', 'Sliding Window Maximum'],
        resources: [
            { name: 'Queue Guide', link: 'https://leetcode.com/explore/learn/card/queue-stack/', type: 'practice' as const },
        ],
        xp: 35,
    },
    'binary-search': {
        title: 'Binary Search',
        topics: ['Basic Binary Search', 'Search in Rotated Array', 'Find Peak', 'Search Space Reduction'],
        resources: [
            { name: 'Binary Search Patterns', link: 'https://leetcode.com/discuss/study-guide/786126/', type: 'article' as const },
        ],
        xp: 45,
    },
    'trees-basics': {
        title: 'Binary Trees Basics',
        topics: ['Tree Traversals (In/Pre/Post)', 'Level Order', 'Height & Depth', 'Tree Construction'],
        resources: [
            { name: 'Tree Traversal', link: 'https://leetcode.com/explore/learn/card/data-structure-tree/', type: 'practice' as const },
        ],
        xp: 40,
    },
    'bst': {
        title: 'Binary Search Trees',
        topics: ['BST Properties', 'Search & Insert', 'Delete Node', 'Validate BST'],
        resources: [
            { name: 'BST Guide', link: 'https://leetcode.com/explore/learn/card/introduction-to-data-structure-binary-search-tree/', type: 'practice' as const },
        ],
        xp: 45,
    },
    'trees-advanced': {
        title: 'Advanced Trees',
        topics: ['LCA', 'Diameter', 'Path Sum', 'Serialize/Deserialize'],
        resources: [
            { name: 'Tree Problems', link: 'https://leetcode.com/tag/tree/', type: 'practice' as const },
        ],
        xp: 55,
    },
    'heaps': {
        title: 'Heaps & Priority Queues',
        topics: ['Min/Max Heap', 'Heapify', 'Top K Elements', 'Merge K Sorted'],
        resources: [
            { name: 'Heap Guide', link: 'https://leetcode.com/explore/learn/card/heap/', type: 'practice' as const },
        ],
        xp: 50,
    },
    'graphs-basics': {
        title: 'Graph Fundamentals',
        topics: ['Graph Representation', 'BFS', 'DFS', 'Connected Components'],
        resources: [
            { name: 'Graph Guide', link: 'https://leetcode.com/explore/learn/card/graph/', type: 'practice' as const },
        ],
        xp: 50,
    },
    'graphs-advanced': {
        title: 'Advanced Graphs',
        topics: ['Dijkstra Algorithm', 'Topological Sort', 'Union Find', 'Cycle Detection'],
        resources: [
            { name: 'Graph Algorithms', link: 'https://cp-algorithms.com/graph/', type: 'article' as const },
        ],
        xp: 60,
    },
    'dp-1d': {
        title: '1D Dynamic Programming',
        topics: ['Fibonacci DP', 'Climbing Stairs', 'House Robber', 'Coin Change'],
        resources: [
            { name: 'DP Patterns', link: 'https://leetcode.com/discuss/study-guide/458695/', type: 'article' as const },
            { name: 'Striver DP Series', link: 'https://takeuforward.org/dynamic-programming/striver-dp-series-dynamic-programming-problems/', type: 'video' as const },
        ],
        xp: 45,
    },
    'dp-2d': {
        title: '2D Dynamic Programming',
        topics: ['Grid Problems', 'LCS', 'LIS', 'Edit Distance'],
        resources: [
            { name: 'DP on Grids', link: 'https://leetcode.com/tag/dynamic-programming/', type: 'practice' as const },
        ],
        xp: 55,
    },
    'dp-advanced': {
        title: 'Advanced DP',
        topics: ['DP on Strings', 'DP on Stocks', 'Partition DP', 'MCM Pattern'],
        resources: [
            { name: 'Advanced DP', link: 'https://takeuforward.org/dynamic-programming/', type: 'article' as const },
        ],
        xp: 65,
    },
    'bit-manipulation': {
        title: 'Bit Manipulation',
        topics: ['Bitwise Operators', 'Check Bit', 'Power of Two', 'XOR Tricks'],
        resources: [
            { name: 'Bit Manipulation', link: 'https://leetcode.com/tag/bit-manipulation/', type: 'practice' as const },
        ],
        xp: 35,
    },
    'greedy': {
        title: 'Greedy Algorithms',
        topics: ['Activity Selection', 'Fractional Knapsack', 'Job Scheduling', 'Huffman Coding'],
        resources: [
            { name: 'Greedy Algorithms', link: 'https://www.geeksforgeeks.org/greedy-algorithms/', type: 'article' as const },
        ],
        xp: 40,
    },
    'tries': {
        title: 'Tries (Prefix Trees)',
        topics: ['Trie Implementation', 'Word Search', 'Auto-complete', 'XOR Maximum'],
        resources: [
            { name: 'Trie Guide', link: 'https://leetcode.com/explore/learn/card/trie/', type: 'practice' as const },
        ],
        xp: 50,
    },
};

// Development Topics
const DEV_CONTENT = {
    'html-css': {
        title: 'HTML5 & CSS3 Fundamentals',
        topics: ['Semantic HTML', 'Box Model', 'Flexbox', 'CSS Grid'],
        resources: [
            { name: 'MDN HTML', link: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', type: 'article' as const },
            { name: 'Flexbox Guide', link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'article' as const },
        ],
        xp: 25,
    },
    'js-basics': {
        title: 'JavaScript Fundamentals',
        topics: ['Variables & Types', 'Functions & Scope', 'Hoisting', 'Closures'],
        resources: [
            { name: 'JavaScript.info', link: 'https://javascript.info/', type: 'article' as const },
            { name: 'Namaste JS', link: 'https://www.youtube.com/watch?v=pN6jk0uUrD8', type: 'video' as const },
        ],
        xp: 35,
    },
    'js-advanced': {
        title: 'Advanced JavaScript',
        topics: ['Promises & Async/Await', 'Event Loop', 'Prototypes', 'ES6+ Features'],
        resources: [
            { name: 'Async JS', link: 'https://javascript.info/async', type: 'article' as const },
        ],
        xp: 45,
    },
    'react-basics': {
        title: 'React Fundamentals',
        topics: ['Components & JSX', 'Props & State', 'Event Handling', 'Conditional Rendering'],
        resources: [
            { name: 'React Docs', link: 'https://react.dev/learn', type: 'article' as const },
        ],
        xp: 40,
    },
    'react-hooks': {
        title: 'React Hooks',
        topics: ['useState', 'useEffect', 'useContext', 'useRef & useMemo'],
        resources: [
            { name: 'Hooks Guide', link: 'https://react.dev/reference/react', type: 'article' as const },
        ],
        xp: 45,
    },
    'react-advanced': {
        title: 'Advanced React Patterns',
        topics: ['Custom Hooks', 'Performance Optimization', 'Code Splitting', 'Error Boundaries'],
        resources: [
            { name: 'React Patterns', link: 'https://reactpatterns.com/', type: 'article' as const },
        ],
        xp: 55,
    },
    'typescript': {
        title: 'TypeScript',
        topics: ['Types & Interfaces', 'Generics', 'Type Guards', 'Utility Types'],
        resources: [
            { name: 'TS Docs', link: 'https://www.typescriptlang.org/docs/', type: 'article' as const },
        ],
        xp: 45,
    },
    'nextjs': {
        title: 'Next.js',
        topics: ['App Router', 'Server Components', 'API Routes', 'Data Fetching'],
        resources: [
            { name: 'Next.js Docs', link: 'https://nextjs.org/docs', type: 'article' as const },
        ],
        xp: 50,
    },
    'nodejs': {
        title: 'Node.js',
        topics: ['Node Fundamentals', 'File System', 'Streams', 'Event Emitter'],
        resources: [
            { name: 'Node.js Docs', link: 'https://nodejs.org/docs/latest/api/', type: 'article' as const },
        ],
        xp: 40,
    },
    'express': {
        title: 'Express.js',
        topics: ['Routing', 'Middleware', 'Error Handling', 'REST APIs'],
        resources: [
            { name: 'Express Guide', link: 'https://expressjs.com/en/guide/routing.html', type: 'article' as const },
        ],
        xp: 45,
    },
    'databases': {
        title: 'Database Fundamentals',
        topics: ['SQL Basics', 'Joins', 'Indexes', 'Transactions'],
        resources: [
            { name: 'SQL Tutorial', link: 'https://www.w3schools.com/sql/', type: 'article' as const },
        ],
        xp: 40,
    },
    'mongodb': {
        title: 'MongoDB & Mongoose',
        topics: ['Documents & Collections', 'CRUD Operations', 'Aggregation', 'Mongoose Schema'],
        resources: [
            { name: 'MongoDB Docs', link: 'https://www.mongodb.com/docs/', type: 'article' as const },
        ],
        xp: 45,
    },
    'prisma': {
        title: 'Prisma ORM',
        topics: ['Schema Definition', 'Migrations', 'Queries', 'Relations'],
        resources: [
            { name: 'Prisma Docs', link: 'https://www.prisma.io/docs', type: 'article' as const },
        ],
        xp: 40,
    },
    'auth': {
        title: 'Authentication',
        topics: ['JWT', 'Sessions', 'OAuth', 'NextAuth'],
        resources: [
            { name: 'NextAuth Docs', link: 'https://next-auth.js.org/', type: 'article' as const },
        ],
        xp: 50,
    },
    'testing': {
        title: 'Testing',
        topics: ['Unit Testing', 'Integration Testing', 'Jest', 'React Testing Library'],
        resources: [
            { name: 'Testing Library', link: 'https://testing-library.com/docs/', type: 'article' as const },
        ],
        xp: 45,
    },
    'git': {
        title: 'Git & Version Control',
        topics: ['Git Basics', 'Branching', 'Merge vs Rebase', 'Git Workflow'],
        resources: [
            { name: 'Git Guide', link: 'https://www.atlassian.com/git/tutorials', type: 'article' as const },
        ],
        xp: 30,
    },
};

// CS Fundamentals
const CS_CONTENT = {
    'os-processes': {
        title: 'OS: Processes & Threads',
        topics: ['Process States', 'Context Switching', 'Threads vs Processes', 'Multithreading'],
        resources: [
            { name: 'Operating Systems', link: 'https://www.geeksforgeeks.org/operating-systems/', type: 'article' as const },
        ],
        xp: 40,
    },
    'os-memory': {
        title: 'OS: Memory Management',
        topics: ['Virtual Memory', 'Paging', 'Segmentation', 'Page Replacement'],
        resources: [
            { name: 'Memory Management', link: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/', type: 'article' as const },
        ],
        xp: 45,
    },
    'os-sync': {
        title: 'OS: Synchronization',
        topics: ['Mutex & Semaphores', 'Deadlocks', 'Race Conditions', 'Producer-Consumer'],
        resources: [
            { name: 'Process Synchronization', link: 'https://www.geeksforgeeks.org/introduction-of-process-synchronization/', type: 'article' as const },
        ],
        xp: 50,
    },
    'dbms-basics': {
        title: 'DBMS Fundamentals',
        topics: ['ER Diagrams', 'Normalization', 'Keys', 'Schema Design'],
        resources: [
            { name: 'DBMS Guide', link: 'https://www.geeksforgeeks.org/dbms/', type: 'article' as const },
        ],
        xp: 40,
    },
    'dbms-transactions': {
        title: 'DBMS: Transactions & ACID',
        topics: ['ACID Properties', 'Transaction States', 'Isolation Levels', 'Concurrency Control'],
        resources: [
            { name: 'Transactions', link: 'https://www.geeksforgeeks.org/transaction-in-dbms/', type: 'article' as const },
        ],
        xp: 45,
    },
    'networking': {
        title: 'Computer Networks',
        topics: ['OSI Model', 'TCP/IP', 'HTTP/HTTPS', 'DNS'],
        resources: [
            { name: 'Networks Guide', link: 'https://www.geeksforgeeks.org/computer-network-tutorials/', type: 'article' as const },
        ],
        xp: 40,
    },
    'system-design-basics': {
        title: 'System Design Basics',
        topics: ['Scalability', 'Load Balancing', 'Caching', 'CDN'],
        resources: [
            { name: 'System Design Primer', link: 'https://github.com/donnemartin/system-design-primer', type: 'article' as const },
        ],
        xp: 50,
    },
    'system-design-advanced': {
        title: 'Advanced System Design',
        topics: ['Database Sharding', 'Message Queues', 'Microservices', 'CAP Theorem'],
        resources: [
            { name: 'System Design Interview', link: 'https://www.youtube.com/c/SystemDesignInterview', type: 'video' as const },
        ],
        xp: 60,
    },
    'design-patterns': {
        title: 'Design Patterns',
        topics: ['Singleton', 'Factory', 'Observer', 'Strategy'],
        resources: [
            { name: 'Design Patterns', link: 'https://refactoring.guru/design-patterns', type: 'article' as const },
        ],
        xp: 45,
    },
    'oops': {
        title: 'OOP Concepts',
        topics: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
        resources: [
            { name: 'OOP Guide', link: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/', type: 'article' as const },
        ],
        xp: 35,
    },
};

// Interview Prep
const INTERVIEW_CONTENT = {
    'resume': {
        title: 'Resume Building',
        topics: ['ATS Optimization', 'Project Descriptions', 'Quantifying Impact', 'Keywords'],
        resources: [
            { name: 'Resume Guide', link: 'https://www.techinterviewhandbook.org/resume/', type: 'article' as const },
        ],
        xp: 30,
    },
    'behavioral': {
        title: 'Behavioral Questions',
        topics: ['STAR Method', 'Tell Me About Yourself', 'Conflict Resolution', 'Leadership'],
        resources: [
            { name: 'Behavioral Interview', link: 'https://www.techinterviewhandbook.org/behavioral-interview/', type: 'article' as const },
        ],
        xp: 35,
    },
    'mock-interview': {
        title: 'Mock Interview Practice',
        topics: ['DSA Mock', 'System Design Mock', 'Behavioral Mock', 'Feedback Analysis'],
        resources: [
            { name: 'Pramp', link: 'https://www.pramp.com/', type: 'practice' as const },
        ],
        xp: 50,
    },
    'salary-negotiation': {
        title: 'Salary Negotiation',
        topics: ['Market Research', 'Counter Offers', 'Benefits Negotiation', 'BATNA'],
        resources: [
            { name: 'Negotiation Guide', link: 'https://www.levels.fyi/', type: 'article' as const },
        ],
        xp: 30,
    },
};

// Project Topics
const PROJECT_CONTENT = {
    'portfolio': {
        title: 'Portfolio Website',
        topics: ['Design', 'Implementation', 'Deployment', 'SEO'],
        resources: [
            { name: 'Portfolio Ideas', link: 'https://www.freecodecamp.org/news/web-developer-portfolio/', type: 'article' as const },
        ],
        xp: 100,
    },
    'fullstack-app': {
        title: 'Full Stack Application',
        topics: ['Planning', 'Frontend', 'Backend', 'Database'],
        resources: [
            { name: 'Project Ideas', link: 'https://www.youtube.com/results?search_query=fullstack+project', type: 'video' as const },
        ],
        xp: 150,
    },
    'api-project': {
        title: 'REST API Project',
        topics: ['API Design', 'Authentication', 'Documentation', 'Testing'],
        resources: [
            { name: 'API Design', link: 'https://www.restapitutorial.com/', type: 'article' as const },
        ],
        xp: 100,
    },
};

// Get content distribution based on role and company type
function getContentDistribution(role: RoadmapRole, companyType: CompanyType): {
    dsa: number;
    dev: number;
    cs: number;
    projects: number;
} {
    // Base distributions by role (percentages)
    const baseDistributions: Record<RoadmapRole, { dsa: number; dev: number; cs: number; projects: number }> = {
        'sde': { dsa: 55, dev: 15, cs: 25, projects: 5 },
        'full-stack': { dsa: 25, dev: 45, cs: 15, projects: 15 },
        'frontend': { dsa: 20, dev: 55, cs: 10, projects: 15 },
        'backend': { dsa: 30, dev: 40, cs: 20, projects: 10 },
    };

    const dist = { ...baseDistributions[role] };

    // Adjust based on company type
    switch (companyType) {
        case 'FAANG':
            dist.dsa += 10;
            dist.dev -= 5;
            dist.cs += 5;
            dist.projects -= 10;
            break;
        case 'Startups':
            dist.dsa -= 10;
            dist.dev += 5;
            dist.projects += 10;
            dist.cs -= 5;
            break;
        case 'Service_Based':
            // Balanced, slight CS increase
            dist.cs += 5;
            dist.dsa -= 5;
            break;
        // 'Mixed' keeps base distribution
    }

    return dist;
}

// Generate content order for a role
function getContentOrder(role: RoadmapRole, companyType: CompanyType): string[] {
    const dsaOrder = [
        'time-complexity', 'arrays-basics', 'two-pointers', 'sliding-window', 'hashing',
        'recursion', 'binary-search', 'linked-list', 'stacks', 'queues',
        'trees-basics', 'bst', 'trees-advanced', 'heaps',
        'graphs-basics', 'graphs-advanced',
        'dp-1d', 'dp-2d', 'dp-advanced',
        'backtracking', 'bit-manipulation', 'greedy', 'tries'
    ];

    const devOrder = [
        'html-css', 'js-basics', 'js-advanced', 'git',
        'react-basics', 'react-hooks', 'react-advanced',
        'typescript', 'nextjs',
        'nodejs', 'express', 'databases', 'mongodb', 'prisma', 'auth', 'testing'
    ];

    const csOrder = [
        'oops', 'dbms-basics', 'dbms-transactions',
        'os-processes', 'os-memory', 'os-sync',
        'networking', 'design-patterns',
        'system-design-basics', 'system-design-advanced'
    ];

    const interviewOrder = ['resume', 'behavioral', 'mock-interview', 'salary-negotiation'];
    const projectOrder = ['portfolio', 'fullstack-app', 'api-project'];

    // Return all content in a logical order
    if (role === 'sde' || companyType === 'FAANG') {
        return [...dsaOrder, ...csOrder, ...devOrder.slice(0, 8), ...interviewOrder];
    } else if (role === 'frontend') {
        return [...devOrder.slice(0, 10), ...dsaOrder.slice(0, 12), ...projectOrder, ...csOrder.slice(0, 4), ...interviewOrder];
    } else if (role === 'backend') {
        return [...devOrder.slice(6), ...dsaOrder.slice(0, 15), ...csOrder, ...projectOrder.slice(0, 2), ...interviewOrder];
    } else {
        // full-stack
        return [...devOrder, ...dsaOrder.slice(0, 15), ...projectOrder, ...csOrder.slice(0, 6), ...interviewOrder];
    }
}

// Get all content by key
function getContentByKey(key: string): { title: string; topics: string[]; resources: RoadmapResource[]; xp: number; category: RoadmapDay['category'] } | null {
    if (key in DSA_CONTENT) {
        return { ...DSA_CONTENT[key as keyof typeof DSA_CONTENT], category: 'dsa' };
    }
    if (key in DEV_CONTENT) {
        return { ...DEV_CONTENT[key as keyof typeof DEV_CONTENT], category: 'development' };
    }
    if (key in CS_CONTENT) {
        return { ...CS_CONTENT[key as keyof typeof CS_CONTENT], category: 'cs-fundamentals' };
    }
    if (key in INTERVIEW_CONTENT) {
        return { ...INTERVIEW_CONTENT[key as keyof typeof INTERVIEW_CONTENT], category: 'interview' };
    }
    if (key in PROJECT_CONTENT) {
        return { ...PROJECT_CONTENT[key as keyof typeof PROJECT_CONTENT], category: 'project' };
    }
    return null;
}

// Get phase name based on progress
function getPhase(dayNumber: number, totalDays: number): string {
    const progress = dayNumber / totalDays;
    if (progress <= 0.15) return 'Foundation';
    if (progress <= 0.35) return 'Core Concepts';
    if (progress <= 0.55) return 'Advanced Patterns';
    if (progress <= 0.75) return 'System Design & Projects';
    if (progress <= 0.90) return 'Interview Prep';
    return 'Final Sprint';
}

/**
 * Generate a personalized roadmap based on user's onboarding answers
 */
export function generateRoadmap(
    role: RoadmapRole,
    timeframe: Timeframe,
    companyType: CompanyType
): GeneratedRoadmap {
    const totalDays = timeframe === '3_months' ? 90 : 180;
    const topicsPerDay = timeframe === '3_months' ? 1.5 : 1; // More intensive for 3 months
    const restDayInterval = timeframe === '3_months' ? 6 : 7; // Rest every 6th day for 3mo, 7th for 6mo

    const contentOrder = getContentOrder(role, companyType);
    const schedule: RoadmapDay[] = [];

    let contentIndex = 0;
    let dayCounter = 1;

    const phases = ['Foundation', 'Core Concepts', 'Advanced Patterns', 'System Design & Projects', 'Interview Prep', 'Final Sprint'];

    while (dayCounter <= totalDays) {
        const isRestDay = dayCounter % restDayInterval === 0;
        const week = Math.ceil(dayCounter / 7);
        const month = Math.ceil(dayCounter / 30);

        if (isRestDay) {
            schedule.push({
                day: dayCounter,
                week,
                month,
                phase: getPhase(dayCounter, totalDays),
                title: 'Rest & Review Day',
                topics: ['Review previous topics', 'Practice weak areas', 'Take a break'],
                resources: [],
                xp: 20,
                isRestDay: true,
                category: 'rest',
            });
        } else {
            // Get content for this day
            const contentKey = contentOrder[contentIndex % contentOrder.length];
            const content = getContentByKey(contentKey);

            if (content) {
                schedule.push({
                    day: dayCounter,
                    week,
                    month,
                    phase: getPhase(dayCounter, totalDays),
                    title: content.title,
                    topics: content.topics,
                    resources: content.resources,
                    xp: content.xp,
                    isRestDay: false,
                    category: content.category,
                });
            } else {
                // Fallback if content not found
                schedule.push({
                    day: dayCounter,
                    week,
                    month,
                    phase: getPhase(dayCounter, totalDays),
                    title: 'Practice Day',
                    topics: ['Review concepts', 'Solve practice problems', 'Build small features'],
                    resources: [],
                    xp: 25,
                    isRestDay: false,
                    category: 'dsa',
                });
            }
            contentIndex++;
        }

        dayCounter++;
    }

    return {
        totalDays,
        role,
        companyType,
        timeframe,
        phases,
        schedule,
        createdAt: new Date().toISOString(),
    };
}

/**
 * Get a specific day's content from a generated roadmap
 */
export function getDayFromRoadmap(roadmap: GeneratedRoadmap, dayNumber: number): RoadmapDay | null {
    return roadmap.schedule.find(d => d.day === dayNumber) || null;
}

/**
 * Calculate roadmap progress
 */
export function calculateRoadmapProgress(roadmap: GeneratedRoadmap, completedDays: number[]): {
    completedCount: number;
    totalDays: number;
    progressPercent: number;
    totalXP: number;
    earnedXP: number;
} {
    const completedCount = completedDays.length;
    const totalDays = roadmap.totalDays;
    const progressPercent = Math.round((completedCount / totalDays) * 100);

    const totalXP = roadmap.schedule.reduce((sum, day) => sum + day.xp, 0);
    const earnedXP = roadmap.schedule
        .filter(day => completedDays.includes(day.day))
        .reduce((sum, day) => sum + day.xp, 0);

    return {
        completedCount,
        totalDays,
        progressPercent,
        totalXP,
        earnedXP,
    };
}
