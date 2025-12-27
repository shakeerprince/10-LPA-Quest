// Curated "Mostly Asked Technical Interview Questions" DSA Sheet
// Source: https://docs.google.com/spreadsheets/d/1UMUPQptHICj3ihVFReS2aRGbY0fvTmyR9x2kmE6aHGs
// Credits: Dheeraj & Arvind Sharma

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface InterviewProblem {
    id: number;
    name: string;
    topic: string;
    difficulty: Difficulty;
    leetcodeUrl: string;
    completed?: boolean;
    xp: number;
}

export interface TopicGroup {
    id: string;
    name: string;
    icon: string;
    color: string;
    gradient: string;
    problems: InterviewProblem[];
}

// Helper to generate LeetCode URL from problem name
const getLeetCodeUrl = (name: string): string => {
    const slug = name
        .toLowerCase()
        .replace(/\s*\(.*?\)\s*/g, '') // Remove parentheses content
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .trim()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
    return `https://leetcode.com/problems/${slug}/`;
};

// XP values by difficulty
const XP_BY_DIFFICULTY: Record<Difficulty, number> = {
    'Easy': 15,
    'Medium': 25,
    'Hard': 40,
};

// The curated DSA sheet organized by topic
export const INTERVIEW_DSA_SHEET: TopicGroup[] = [
    {
        id: 'array',
        name: 'Arrays',
        icon: '📊',
        color: '#8B5CF6',
        gradient: 'from-purple-500 to-violet-600',
        problems: [
            { id: 1, name: 'Two Sum', topic: 'Array', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/two-sum/', xp: 15 },
            { id: 2, name: 'Two Sum II - Input Array Is Sorted', topic: 'Array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', xp: 25 },
            { id: 3, name: 'Contains Duplicate', topic: 'Array', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/', xp: 15 },
            { id: 4, name: 'Contains Duplicate II', topic: 'Array', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate-ii/', xp: 15 },
            { id: 5, name: 'Best Time to Buy and Sell Stock', topic: 'Array', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', xp: 15 },
            { id: 6, name: 'Maximum Product Subarray', topic: 'Array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/', xp: 25 },
            { id: 7, name: 'Search in Rotated Sorted Array', topic: 'Array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', xp: 25 },
            { id: 8, name: '3Sum', topic: 'Array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/3sum/', xp: 25 },
            { id: 9, name: 'Container With Most Water', topic: 'Array', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/', xp: 25 },
            { id: 10, name: 'Trapping Rain Water', topic: 'Array', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/', xp: 40 },
            { id: 11, name: 'Median of Two Sorted Arrays', topic: 'Array', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', xp: 40 },
        ],
    },
    {
        id: 'matrix',
        name: 'Matrix',
        icon: '🔢',
        color: '#06B6D4',
        gradient: 'from-cyan-500 to-blue-600',
        problems: [
            { id: 12, name: 'Set Matrix Zeroes', topic: 'Matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/', xp: 25 },
            { id: 13, name: 'Spiral Matrix', topic: 'Matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/', xp: 25 },
            { id: 14, name: 'Rotate Image', topic: 'Matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/rotate-image/', xp: 25 },
            { id: 15, name: 'Longest Increasing Path in a Matrix', topic: 'Matrix', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', xp: 40 },
            { id: 16, name: 'Word Search', topic: 'Matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/word-search/', xp: 25 },
            { id: 17, name: 'Valid Sudoku', topic: 'Matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/', xp: 25 },
            { id: 18, name: 'Game of Life', topic: 'Matrix', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/game-of-life/', xp: 25 },
        ],
    },
    {
        id: 'two-pointers',
        name: 'Two Pointers',
        icon: '👆👆',
        color: '#10B981',
        gradient: 'from-emerald-500 to-green-600',
        problems: [
            { id: 19, name: 'Valid Palindrome', topic: 'Two Pointers', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/', xp: 15 },
            { id: 20, name: 'Two Sum II - Input Array Is Sorted', topic: 'Two Pointers', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', xp: 25 },
            { id: 21, name: '3Sum', topic: 'Two Pointers', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/3sum/', xp: 25 },
            { id: 22, name: 'Container With Most Water', topic: 'Two Pointers', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/', xp: 25 },
            { id: 23, name: 'Trapping Rain Water', topic: 'Two Pointers', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/', xp: 40 },
        ],
    },
    {
        id: 'linked-list',
        name: 'Linked List',
        icon: '🔗',
        color: '#F59E0B',
        gradient: 'from-amber-500 to-orange-600',
        problems: [
            { id: 24, name: 'Add Two Numbers', topic: 'Linked List', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/', xp: 25 },
            { id: 25, name: 'Reverse Linked List', topic: 'Linked List', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/', xp: 15 },
            { id: 26, name: 'Linked List Cycle', topic: 'Linked List', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/', xp: 15 },
            { id: 27, name: 'Merge Two Sorted Lists', topic: 'Linked List', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', xp: 15 },
            { id: 28, name: 'Merge k Sorted Lists', topic: 'Linked List', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/', xp: 40 },
            { id: 29, name: 'Remove Nth Node From End of List', topic: 'Linked List', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', xp: 25 },
            { id: 30, name: 'Reorder List', topic: 'Linked List', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/reorder-list/', xp: 25 },
            { id: 31, name: 'Middle of the Linked List', topic: 'Linked List', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/', xp: 15 },
            { id: 32, name: 'Flatten Binary Tree to Linked List', topic: 'Linked List', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', xp: 25 },
            { id: 33, name: 'Reverse Nodes in k-Group', topic: 'Linked List', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', xp: 40 },
        ],
    },
    {
        id: 'sorting',
        name: 'Sorting',
        icon: '📈',
        color: '#EC4899',
        gradient: 'from-pink-500 to-rose-600',
        problems: [
            { id: 34, name: 'Merge Sorted Array', topic: 'Sorting', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/merge-sorted-array/', xp: 15 },
            { id: 35, name: 'Largest Number', topic: 'Sorting', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/largest-number/', xp: 25 },
            { id: 36, name: 'Sort List', topic: 'Sorting', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/sort-list/', xp: 25 },
            { id: 37, name: 'Sort Colors', topic: 'Sorting', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/sort-colors/', xp: 25 },
            { id: 38, name: 'Majority Element', topic: 'Sorting', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/majority-element/', xp: 15 },
        ],
    },
    {
        id: 'string',
        name: 'Strings',
        icon: '📝',
        color: '#6366F1',
        gradient: 'from-indigo-500 to-purple-600',
        problems: [
            { id: 39, name: 'Longest Substring Without Repeating Characters', topic: 'String', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', xp: 25 },
            { id: 40, name: 'Longest Repeating Character Replacement', topic: 'String', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/', xp: 25 },
            { id: 41, name: 'Fizz Buzz', topic: 'String', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/fizz-buzz/', xp: 15 },
            { id: 42, name: 'Longest Common Prefix', topic: 'String', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/longest-common-prefix/', xp: 15 },
            { id: 43, name: 'Minimum Window Substring', topic: 'String', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/', xp: 40 },
            { id: 44, name: 'Valid Anagram', topic: 'String', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/', xp: 15 },
            { id: 45, name: 'Group Anagrams', topic: 'String', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/', xp: 25 },
            { id: 46, name: 'Valid Parentheses', topic: 'String', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/', xp: 15 },
            { id: 47, name: 'Longest Palindromic Substring', topic: 'String', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/', xp: 25 },
            { id: 48, name: 'Letter Combinations of a Phone Number', topic: 'String', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', xp: 25 },
            { id: 49, name: 'Palindromic Substrings', topic: 'String', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/', xp: 25 },
            { id: 50, name: 'Palindrome Linked List', topic: 'String', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/palindrome-linked-list/', xp: 15 },
            { id: 51, name: 'Text Justification', topic: 'String', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/text-justification/', xp: 40 },
        ],
    },
    {
        id: 'stack',
        name: 'Stack',
        icon: '📚',
        color: '#EF4444',
        gradient: 'from-red-500 to-rose-600',
        problems: [
            { id: 52, name: 'Min Stack', topic: 'Stack', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/min-stack/', xp: 25 },
            { id: 53, name: 'Largest Rectangle in Histogram', topic: 'Stack', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', xp: 40 },
            { id: 54, name: 'Minimum Remove to Make Valid Parentheses', topic: 'Stack', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/', xp: 25 },
            { id: 55, name: 'Longest Valid Parentheses', topic: 'Stack', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/longest-valid-parentheses/', xp: 40 },
            { id: 56, name: 'Evaluate Reverse Polish Notation', topic: 'Stack', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', xp: 25 },
            { id: 57, name: 'Generate Parentheses', topic: 'Stack', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/', xp: 25 },
            { id: 58, name: 'Daily Temperatures', topic: 'Stack', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/', xp: 25 },
            { id: 59, name: 'Car Fleet', topic: 'Stack', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/car-fleet/', xp: 25 },
        ],
    },
    {
        id: 'heap',
        name: 'Heap / Priority Queue',
        icon: '⛰️',
        color: '#14B8A6',
        gradient: 'from-teal-500 to-cyan-600',
        problems: [
            { id: 60, name: 'Kth Largest Element in a Stream', topic: 'Heap', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', xp: 15 },
            { id: 61, name: 'Last Stone Weight', topic: 'Heap', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight/', xp: 15 },
            { id: 62, name: 'K Closest Points to Origin', topic: 'Heap', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/', xp: 25 },
            { id: 63, name: 'Kth Largest Element in an Array', topic: 'Heap', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', xp: 25 },
            { id: 64, name: 'Task Scheduler', topic: 'Heap', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/', xp: 25 },
            { id: 65, name: 'Design Twitter', topic: 'Heap', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/design-twitter/', xp: 25 },
            { id: 66, name: 'Find Median from Data Stream', topic: 'Heap', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/', xp: 40 },
        ],
    },
    {
        id: 'trees',
        name: 'Trees',
        icon: '🌳',
        color: '#22C55E',
        gradient: 'from-green-500 to-emerald-600',
        problems: [
            { id: 67, name: 'Invert Binary Tree', topic: 'Trees', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/', xp: 15 },
            { id: 68, name: 'Maximum Depth of Binary Tree', topic: 'Trees', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', xp: 15 },
            { id: 69, name: 'Diameter of Binary Tree', topic: 'Trees', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/', xp: 15 },
            { id: 70, name: 'Balanced Binary Tree', topic: 'Trees', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/balanced-binary-tree/', xp: 15 },
            { id: 71, name: 'Same Tree', topic: 'Trees', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/same-tree/', xp: 15 },
            { id: 72, name: 'Subtree of Another Tree', topic: 'Trees', difficulty: 'Easy', leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/', xp: 15 },
            { id: 73, name: 'Lowest Common Ancestor of a Binary Search Tree', topic: 'Trees', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', xp: 25 },
            { id: 74, name: 'Binary Tree Level Order Traversal', topic: 'Trees', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', xp: 25 },
            { id: 75, name: 'Binary Tree Right Side View', topic: 'Trees', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/', xp: 25 },
            { id: 76, name: 'Count Good Nodes in Binary Tree', topic: 'Trees', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', xp: 25 },
            { id: 77, name: 'Validate Binary Search Tree', topic: 'Trees', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/', xp: 25 },
            { id: 78, name: 'Kth Smallest Element in a BST', topic: 'Trees', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', xp: 25 },
            { id: 79, name: 'Construct Binary Tree from Preorder and Inorder Traversal', topic: 'Trees', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', xp: 25 },
            { id: 80, name: 'Binary Tree Maximum Path Sum', topic: 'Trees', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', xp: 40 },
            { id: 81, name: 'Serialize and Deserialize Binary Tree', topic: 'Trees', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', xp: 40 },
            { id: 82, name: 'Binary Tree Zigzag Level Order Traversal', topic: 'Trees', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', xp: 25 },
        ],
    },
    {
        id: 'trie',
        name: 'Trie',
        icon: '🔤',
        color: '#A855F7',
        gradient: 'from-purple-500 to-fuchsia-600',
        problems: [
            { id: 83, name: 'Implement Trie (Prefix Tree)', topic: 'Trie', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/', xp: 25 },
            { id: 84, name: 'Design Add and Search Words Data Structure', topic: 'Trie', difficulty: 'Medium', leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', xp: 25 },
            { id: 85, name: 'Word Search II', topic: 'Trie', difficulty: 'Hard', leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/', xp: 40 },
        ],
    },
];

// Calculate stats for the sheet
export const getInterviewSheetStats = (completedProblems: number[]) => {
    let totalProblems = 0;
    let totalXP = 0;
    let earnedXP = 0;
    let completedCount = 0;
    const byDifficulty = { Easy: { total: 0, completed: 0 }, Medium: { total: 0, completed: 0 }, Hard: { total: 0, completed: 0 } };

    INTERVIEW_DSA_SHEET.forEach(group => {
        group.problems.forEach(problem => {
            totalProblems++;
            totalXP += problem.xp;
            byDifficulty[problem.difficulty].total++;

            if (completedProblems.includes(problem.id)) {
                completedCount++;
                earnedXP += problem.xp;
                byDifficulty[problem.difficulty].completed++;
            }
        });
    });

    return {
        totalProblems,
        completedCount,
        progressPercent: Math.round((completedCount / totalProblems) * 100),
        totalXP,
        earnedXP,
        byDifficulty,
    };
};

// Get all problems as flat array
export const getAllInterviewProblems = (): InterviewProblem[] => {
    return INTERVIEW_DSA_SHEET.flatMap(group => group.problems);
};
