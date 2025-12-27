export type CurriculumDay = {
    day: number;
    title: string;
    topics: string[];
    resources: { title: string; url: string; type: 'video' | 'article' | 'practice' }[];
};

export type RoleCurriculum = Record<number, CurriculumDay>;

const FULL_STACK_CURRICULUM: RoleCurriculum = {
    1: {
        day: 1,
        title: "HTML5 Semantics & SEO",
        topics: [
            "Semantic HTML tags (header, nav, main, article, section, footer)",
            "Meta tags and SEO basics",
            "Accessibility best practices (ARIA, alt text)",
            "Document structure and DOM tree"
        ],
        resources: [
            { title: "MDN: HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started", type: "article" },
            { title: "HTML5 Semantics", url: "https://www.youtube.com/watch?v=kCwJP80gq7I", type: "video" }
        ]
    },
    2: {
        day: 2,
        title: "CSS3 Fundamentals & Flexbox",
        topics: [
            "Box Model (margin, padding, border)",
            "Specificty and Cascade",
            "Flexbox Layout (container, items, axes)",
            "CSS Units (rem, em, vh, vw, %)"
        ],
        resources: [
            { title: "CSS Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type: "article" },
            { title: "Flexbox Froggy Game", url: "https://flexboxfroggy.com/", type: "practice" }
        ]
    },
    3: {
        day: 3,
        title: "CSS Grid & Responsive Design",
        topics: [
            "CSS Grid Layout (template-columns, areas)",
            "Media Queries & Breakpoints",
            "Mobile-first approach",
            "Responsive images"
        ],
        resources: [
            { title: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", type: "article" },
            { title: "Grid Garden Game", url: "https://cssgridgarden.com/", type: "practice" }
        ]
    },
    4: {
        day: 4,
        title: "JavaScript Basics: Variables & Types",
        topics: [
            "let, const, var differences",
            "Primitive types vs Reference types",
            "Type coercion and conversion",
            "String methods and Template Literals"
        ],
        resources: [
            { title: "JS Fundamentals", url: "https://javascript.info/first-steps", type: "article" },
            { title: "Namaste JavaScript Ep 1", url: "https://www.youtube.com/watch?v=pN6jk0uUrD8", type: "video" }
        ]
    },
    5: {
        day: 5,
        title: "JS Logic & Control Flow",
        topics: [
            "If/Else, Switch statements",
            "Loops (for, while, do-while)",
            "Functions (Declaration, Expression, Arrow)",
            "Scope and Hoisting"
        ],
        resources: [
            { title: "Namaste JS: Hoisting", url: "https://www.youtube.com/watch?v=Fnlnw8uY6jo", type: "video" },
            { title: "Functions in JS", url: "https://javascript.info/function-basics", type: "article" }
        ]
    },
    // ... Mock data continues for other days (representing a database seed)
};

const SDE_CURRICULUM: RoleCurriculum = {
    1: {
        day: 1,
        title: "Time & Space Complexity",
        topics: [
            "Big O Notation",
            "Best, Average, Worst Case",
            "Space Complexity Analysis",
            "Common complexities (O(1), O(n), O(log n))"
        ],
        resources: [
            { title: "Striver's Time Complexity", url: "https://takeuforward.org/data-structure/time-complexity-analysis/", type: "article" },
            { title: "Big O Cheatsheet", url: "https://www.bigocheatsheet.com/", type: "article" }
        ]
    },
    2: {
        day: 2,
        title: "Arrays & Dynamic Arrays",
        topics: [
            "Array Memory Layout",
            "Dynamic Array Implementation",
            "Basic Operations (Insert, Delete, Access)",
            "Sliding Window Technique Intro"
        ],
        resources: [
            { title: "Arrays - LeetCode Explore", url: "https://leetcode.com/explore/learn/card/fun-with-arrays/", type: "practice" }
        ]
    },
    3: {
        day: 3,
        title: "Two Pointers Technique",
        topics: [
            "Two Sum II",
            "Reverse String / Array",
            "Partitioning Logic",
            "Dutch National Flag Algorithm"
        ],
        resources: [
            { title: "Two Pointers Patterns", url: "https://leetcode.com/discuss/study-guide/1688903/Solved-all-two-pointers-problems-in-100-days", type: "article" }
        ]
    },
    4: {
        day: 4,
        title: "Recursion Basic",
        topics: [
            "Base Case & Recursive Step",
            "Stack Overflow",
            "Recursive Tree Visualization",
            "Factorial / Fibonacci"
        ],
        resources: [
            { title: "Recursion by Striver", url: "https://takeuforward.org/recursion/introduction-to-recursion/", type: "video" }
        ]
    },
    5: {
        day: 5,
        title: "Hashing & Maps",
        topics: [
            "Hash Function Basics",
            "Collision Resolution (Chaining vs Open Addressing)",
            "Sets vs Maps",
            "Frequency Counting Pattern"
        ],
        resources: [
            { title: "Hashing Basics", url: "https://cp-algorithms.com/string/string-hashing.html", type: "article" }
        ]
    }
};

export const CURRICULA: Record<string, RoleCurriculum> = {
    'full-stack': FULL_STACK_CURRICULUM,
    'frontend': FULL_STACK_CURRICULUM, // Reusing for mock
    'backend': FULL_STACK_CURRICULUM, // Reusing for mock
    'sde': SDE_CURRICULUM,
};
