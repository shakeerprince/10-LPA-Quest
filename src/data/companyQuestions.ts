export type CompanyQuestion = {
    id: string;
    title: string;
    leetcodeUrl: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topics: string[];
    frequency: 'Last30Days' | 'Last60Days' | 'Last90Days' | 'AllTime';
    acceptance: number;
};

export type CompanyQuestions = {
    companyId: string;
    questions: CompanyQuestion[];
};

// Sample questions for major companies - organized by company
export const COMPANY_QUESTIONS: CompanyQuestions[] = [
    {
        companyId: 'google',
        questions: [
            { id: 'g1', title: 'Two Sum', leetcodeUrl: 'https://leetcode.com/problems/two-sum', difficulty: 'Easy', topics: ['Array', 'Hash Table'], frequency: 'AllTime', acceptance: 49 },
            { id: 'g2', title: 'LRU Cache', leetcodeUrl: 'https://leetcode.com/problems/lru-cache', difficulty: 'Medium', topics: ['Hash Table', 'Linked List', 'Design'], frequency: 'Last30Days', acceptance: 40 },
            { id: 'g3', title: 'Merge K Sorted Lists', leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists', difficulty: 'Hard', topics: ['Linked List', 'Heap'], frequency: 'Last60Days', acceptance: 48 },
            { id: 'g4', title: 'Word Break', leetcodeUrl: 'https://leetcode.com/problems/word-break', difficulty: 'Medium', topics: ['DP', 'Trie'], frequency: 'Last30Days', acceptance: 45 },
            { id: 'g5', title: 'Number of Islands', leetcodeUrl: 'https://leetcode.com/problems/number-of-islands', difficulty: 'Medium', topics: ['DFS', 'BFS', 'Graph'], frequency: 'AllTime', acceptance: 55 },
            { id: 'g6', title: 'Median of Two Sorted Arrays', leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays', difficulty: 'Hard', topics: ['Binary Search', 'Array'], frequency: 'Last90Days', acceptance: 35 },
            { id: 'g7', title: 'Longest Substring Without Repeating', leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', difficulty: 'Medium', topics: ['Sliding Window', 'Hash Table'], frequency: 'Last30Days', acceptance: 33 },
            { id: 'g8', title: 'Valid Parentheses', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses', difficulty: 'Easy', topics: ['Stack', 'String'], frequency: 'AllTime', acceptance: 40 },
            { id: 'g9', title: 'Course Schedule', leetcodeUrl: 'https://leetcode.com/problems/course-schedule', difficulty: 'Medium', topics: ['Graph', 'Topological Sort'], frequency: 'Last60Days', acceptance: 45 },
            { id: 'g10', title: 'Serialize and Deserialize Binary Tree', leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree', difficulty: 'Hard', topics: ['Tree', 'DFS', 'Design'], frequency: 'Last30Days', acceptance: 54 },
        ]
    },
    {
        companyId: 'amazon',
        questions: [
            { id: 'a1', title: 'Two Sum', leetcodeUrl: 'https://leetcode.com/problems/two-sum', difficulty: 'Easy', topics: ['Array', 'Hash Table'], frequency: 'AllTime', acceptance: 49 },
            { id: 'a2', title: 'Best Time to Buy and Sell Stock', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', difficulty: 'Easy', topics: ['Array', 'DP'], frequency: 'Last30Days', acceptance: 54 },
            { id: 'a3', title: 'Min Stack', leetcodeUrl: 'https://leetcode.com/problems/min-stack', difficulty: 'Medium', topics: ['Stack', 'Design'], frequency: 'Last60Days', acceptance: 51 },
            { id: 'a4', title: 'Trapping Rain Water', leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water', difficulty: 'Hard', topics: ['Array', 'Two Pointers', 'Stack'], frequency: 'Last30Days', acceptance: 58 },
            { id: 'a5', title: 'Merge Intervals', leetcodeUrl: 'https://leetcode.com/problems/merge-intervals', difficulty: 'Medium', topics: ['Array', 'Sorting'], frequency: 'AllTime', acceptance: 45 },
            { id: 'a6', title: 'Rotting Oranges', leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges', difficulty: 'Medium', topics: ['BFS', 'Matrix'], frequency: 'Last30Days', acceptance: 52 },
            { id: 'a7', title: 'K Closest Points to Origin', leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin', difficulty: 'Medium', topics: ['Heap', 'Sorting'], frequency: 'Last60Days', acceptance: 66 },
            { id: 'a8', title: 'Word Ladder', leetcodeUrl: 'https://leetcode.com/problems/word-ladder', difficulty: 'Hard', topics: ['BFS', 'Hash Table'], frequency: 'Last90Days', acceptance: 36 },
        ]
    },
    {
        companyId: 'microsoft',
        questions: [
            { id: 'm1', title: 'Reverse Linked List', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list', difficulty: 'Easy', topics: ['Linked List'], frequency: 'AllTime', acceptance: 72 },
            { id: 'm2', title: 'Add Two Numbers', leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers', difficulty: 'Medium', topics: ['Linked List', 'Math'], frequency: 'Last30Days', acceptance: 39 },
            { id: 'm3', title: 'Binary Tree Level Order Traversal', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal', difficulty: 'Medium', topics: ['Tree', 'BFS'], frequency: 'Last60Days', acceptance: 62 },
            { id: 'm4', title: 'Longest Palindromic Substring', leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring', difficulty: 'Medium', topics: ['String', 'DP'], frequency: 'Last30Days', acceptance: 32 },
            { id: 'm5', title: 'Maximum Subarray', leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray', difficulty: 'Medium', topics: ['Array', 'DP'], frequency: 'AllTime', acceptance: 49 },
            { id: 'm6', title: 'Valid BST', leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree', difficulty: 'Medium', topics: ['Tree', 'DFS'], frequency: 'Last60Days', acceptance: 31 },
        ]
    },
    {
        companyId: 'meta',
        questions: [
            { id: 'f1', title: 'Valid Palindrome', leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome', difficulty: 'Easy', topics: ['String', 'Two Pointers'], frequency: 'AllTime', acceptance: 43 },
            { id: 'f2', title: 'Move Zeroes', leetcodeUrl: 'https://leetcode.com/problems/move-zeroes', difficulty: 'Easy', topics: ['Array', 'Two Pointers'], frequency: 'Last30Days', acceptance: 60 },
            { id: 'f3', title: '3Sum', leetcodeUrl: 'https://leetcode.com/problems/3sum', difficulty: 'Medium', topics: ['Array', 'Two Pointers', 'Sorting'], frequency: 'Last30Days', acceptance: 32 },
            { id: 'f4', title: 'Product of Array Except Self', leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self', difficulty: 'Medium', topics: ['Array', 'Prefix Sum'], frequency: 'Last60Days', acceptance: 64 },
            { id: 'f5', title: 'Subarray Sum Equals K', leetcodeUrl: 'https://leetcode.com/problems/subarray-sum-equals-k', difficulty: 'Medium', topics: ['Array', 'Hash Table', 'Prefix Sum'], frequency: 'Last30Days', acceptance: 43 },
            { id: 'f6', title: 'Binary Tree Right Side View', leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view', difficulty: 'Medium', topics: ['Tree', 'BFS', 'DFS'], frequency: 'Last60Days', acceptance: 61 },
        ]
    },
    {
        companyId: 'flipkart',
        questions: [
            { id: 'fl1', title: 'Longest Common Subsequence', leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence', difficulty: 'Medium', topics: ['DP', 'String'], frequency: 'Last30Days', acceptance: 58 },
            { id: 'fl2', title: 'Clone Graph', leetcodeUrl: 'https://leetcode.com/problems/clone-graph', difficulty: 'Medium', topics: ['Graph', 'BFS', 'DFS'], frequency: 'Last60Days', acceptance: 50 },
            { id: 'fl3', title: 'Coin Change', leetcodeUrl: 'https://leetcode.com/problems/coin-change', difficulty: 'Medium', topics: ['DP', 'BFS'], frequency: 'AllTime', acceptance: 41 },
            { id: 'fl4', title: 'Next Permutation', leetcodeUrl: 'https://leetcode.com/problems/next-permutation', difficulty: 'Medium', topics: ['Array', 'Two Pointers'], frequency: 'Last30Days', acceptance: 37 },
            { id: 'fl5', title: 'Edit Distance', leetcodeUrl: 'https://leetcode.com/problems/edit-distance', difficulty: 'Medium', topics: ['DP', 'String'], frequency: 'Last90Days', acceptance: 53 },
        ]
    },
    {
        companyId: 'uber',
        questions: [
            { id: 'u1', title: 'Design Tic-Tac-Toe', leetcodeUrl: 'https://leetcode.com/problems/design-tic-tac-toe', difficulty: 'Medium', topics: ['Design', 'Matrix'], frequency: 'Last30Days', acceptance: 57 },
            { id: 'u2', title: 'Meeting Rooms II', leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii', difficulty: 'Medium', topics: ['Heap', 'Sorting', 'Two Pointers'], frequency: 'Last30Days', acceptance: 50 },
            { id: 'u3', title: 'Group Anagrams', leetcodeUrl: 'https://leetcode.com/problems/group-anagrams', difficulty: 'Medium', topics: ['Hash Table', 'String', 'Sorting'], frequency: 'AllTime', acceptance: 66 },
            { id: 'u4', title: 'Find All Anagrams', leetcodeUrl: 'https://leetcode.com/problems/find-all-anagrams-in-a-string', difficulty: 'Medium', topics: ['Sliding Window', 'Hash Table'], frequency: 'Last60Days', acceptance: 48 },
        ]
    },
    {
        companyId: 'razorpay',
        questions: [
            { id: 'r1', title: 'Implement Trie', leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree', difficulty: 'Medium', topics: ['Trie', 'Design'], frequency: 'Last60Days', acceptance: 60 },
            { id: 'r2', title: 'LRU Cache', leetcodeUrl: 'https://leetcode.com/problems/lru-cache', difficulty: 'Medium', topics: ['Design', 'Hash Table', 'Linked List'], frequency: 'Last30Days', acceptance: 40 },
            { id: 'r3', title: 'Min Stack', leetcodeUrl: 'https://leetcode.com/problems/min-stack', difficulty: 'Medium', topics: ['Stack', 'Design'], frequency: 'AllTime', acceptance: 51 },
        ]
    },
    {
        companyId: 'stripe',
        questions: [
            { id: 's1', title: 'Text Justification', leetcodeUrl: 'https://leetcode.com/problems/text-justification', difficulty: 'Hard', topics: ['String', 'Simulation'], frequency: 'Last30Days', acceptance: 36 },
            { id: 's2', title: 'Design Hit Counter', leetcodeUrl: 'https://leetcode.com/problems/design-hit-counter', difficulty: 'Medium', topics: ['Design', 'Queue'], frequency: 'Last60Days', acceptance: 67 },
            { id: 's3', title: 'Rate Limiter', leetcodeUrl: 'https://leetcode.com/problems/logger-rate-limiter', difficulty: 'Easy', topics: ['Hash Table', 'Design'], frequency: 'Last30Days', acceptance: 75 },
        ]
    },
    // Apple
    {
        companyId: 'apple',
        questions: [
            { id: 'ap1', title: 'Valid Anagram', leetcodeUrl: 'https://leetcode.com/problems/valid-anagram', difficulty: 'Easy', topics: ['Hash Table', 'String'], frequency: 'AllTime', acceptance: 62 },
            { id: 'ap2', title: 'First Bad Version', leetcodeUrl: 'https://leetcode.com/problems/first-bad-version', difficulty: 'Easy', topics: ['Binary Search'], frequency: 'Last30Days', acceptance: 43 },
            { id: 'ap3', title: 'Roman to Integer', leetcodeUrl: 'https://leetcode.com/problems/roman-to-integer', difficulty: 'Easy', topics: ['Hash Table', 'String'], frequency: 'Last60Days', acceptance: 58 },
            { id: 'ap4', title: 'Letter Combinations of Phone', leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number', difficulty: 'Medium', topics: ['Backtracking', 'String'], frequency: 'Last30Days', acceptance: 55 },
        ]
    },
    // Netflix
    {
        companyId: 'netflix',
        questions: [
            { id: 'n1', title: 'Encode and Decode Strings', leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings', difficulty: 'Medium', topics: ['String', 'Design'], frequency: 'Last30Days', acceptance: 45 },
            { id: 'n2', title: 'Design Search Autocomplete', leetcodeUrl: 'https://leetcode.com/problems/design-search-autocomplete-system', difficulty: 'Hard', topics: ['Trie', 'Design'], frequency: 'Last60Days', acceptance: 48 },
            { id: 'n3', title: 'Top K Frequent Elements', leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements', difficulty: 'Medium', topics: ['Heap', 'Hash Table'], frequency: 'AllTime', acceptance: 64 },
        ]
    },
    // LinkedIn
    {
        companyId: 'linkedin',
        questions: [
            { id: 'l1', title: 'Nested List Weight Sum', leetcodeUrl: 'https://leetcode.com/problems/nested-list-weight-sum', difficulty: 'Medium', topics: ['DFS', 'BFS'], frequency: 'Last30Days', acceptance: 83 },
            { id: 'l2', title: 'Can Place Flowers', leetcodeUrl: 'https://leetcode.com/problems/can-place-flowers', difficulty: 'Easy', topics: ['Array', 'Greedy'], frequency: 'Last60Days', acceptance: 33 },
            { id: 'l3', title: 'Maximum Product Subarray', leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray', difficulty: 'Medium', topics: ['Array', 'DP'], frequency: 'AllTime', acceptance: 34 },
            { id: 'l4', title: 'Shortest Word Distance', leetcodeUrl: 'https://leetcode.com/problems/shortest-word-distance', difficulty: 'Easy', topics: ['Array', 'String'], frequency: 'Last30Days', acceptance: 65 },
        ]
    },
    // Adobe
    {
        companyId: 'adobe',
        questions: [
            { id: 'ad1', title: 'Spiral Matrix', leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix', difficulty: 'Medium', topics: ['Array', 'Matrix'], frequency: 'Last30Days', acceptance: 43 },
            { id: 'ad2', title: 'String to Integer (atoi)', leetcodeUrl: 'https://leetcode.com/problems/string-to-integer-atoi', difficulty: 'Medium', topics: ['String'], frequency: 'Last60Days', acceptance: 16 },
            { id: 'ad3', title: 'Search in Rotated Sorted Array', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array', difficulty: 'Medium', topics: ['Binary Search'], frequency: 'AllTime', acceptance: 38 },
        ]
    },
    // Atlassian
    {
        companyId: 'atlassian',
        questions: [
            { id: 'at1', title: 'Word Search', leetcodeUrl: 'https://leetcode.com/problems/word-search', difficulty: 'Medium', topics: ['Backtracking', 'Matrix'], frequency: 'Last30Days', acceptance: 40 },
            { id: 'at2', title: 'Design File System', leetcodeUrl: 'https://leetcode.com/problems/design-file-system', difficulty: 'Medium', topics: ['Trie', 'Design'], frequency: 'Last60Days', acceptance: 60 },
            { id: 'at3', title: 'Kth Largest Element', leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array', difficulty: 'Medium', topics: ['Heap', 'Sorting'], frequency: 'AllTime', acceptance: 65 },
        ]
    },
    // Swiggy
    {
        companyId: 'swiggy',
        questions: [
            { id: 'sw1', title: 'Jump Game', leetcodeUrl: 'https://leetcode.com/problems/jump-game', difficulty: 'Medium', topics: ['Array', 'Greedy'], frequency: 'Last30Days', acceptance: 38 },
            { id: 'sw2', title: 'Set Matrix Zeroes', leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes', difficulty: 'Medium', topics: ['Matrix'], frequency: 'Last60Days', acceptance: 50 },
            { id: 'sw3', title: 'Sort Colors', leetcodeUrl: 'https://leetcode.com/problems/sort-colors', difficulty: 'Medium', topics: ['Array', 'Two Pointers'], frequency: 'AllTime', acceptance: 56 },
        ]
    },
    // Zomato
    {
        companyId: 'zomato',
        questions: [
            { id: 'z1', title: 'Container With Most Water', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water', difficulty: 'Medium', topics: ['Two Pointers'], frequency: 'Last30Days', acceptance: 54 },
            { id: 'z2', title: 'Rotate Image', leetcodeUrl: 'https://leetcode.com/problems/rotate-image', difficulty: 'Medium', topics: ['Matrix'], frequency: 'Last60Days', acceptance: 69 },
            { id: 'z3', title: 'Find Peak Element', leetcodeUrl: 'https://leetcode.com/problems/find-peak-element', difficulty: 'Medium', topics: ['Binary Search'], frequency: 'AllTime', acceptance: 46 },
        ]
    },
    // PhonePe
    {
        companyId: 'phonepe',
        questions: [
            { id: 'pp1', title: 'House Robber', leetcodeUrl: 'https://leetcode.com/problems/house-robber', difficulty: 'Medium', topics: ['DP'], frequency: 'Last30Days', acceptance: 48 },
            { id: 'pp2', title: 'Climbing Stairs', leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs', difficulty: 'Easy', topics: ['DP'], frequency: 'AllTime', acceptance: 51 },
            { id: 'pp3', title: 'Unique Paths', leetcodeUrl: 'https://leetcode.com/problems/unique-paths', difficulty: 'Medium', topics: ['DP', 'Matrix'], frequency: 'Last60Days', acceptance: 62 },
        ]
    },
    // CRED
    {
        companyId: 'cred',
        questions: [
            { id: 'cr1', title: 'Design Twitter', leetcodeUrl: 'https://leetcode.com/problems/design-twitter', difficulty: 'Medium', topics: ['Design', 'Heap'], frequency: 'Last30Days', acceptance: 35 },
            { id: 'cr2', title: 'Decode Ways', leetcodeUrl: 'https://leetcode.com/problems/decode-ways', difficulty: 'Medium', topics: ['DP', 'String'], frequency: 'Last60Days', acceptance: 32 },
            { id: 'cr3', title: 'Combination Sum', leetcodeUrl: 'https://leetcode.com/problems/combination-sum', difficulty: 'Medium', topics: ['Backtracking'], frequency: 'AllTime', acceptance: 67 },
        ]
    },
    // ===== SERVICE-BASED COMPANIES =====
    // Deloitte - Dream Company ✨
    {
        companyId: 'deloitte',
        questions: [
            { id: 'd1', title: 'Reverse String', leetcodeUrl: 'https://leetcode.com/problems/reverse-string', difficulty: 'Easy', topics: ['String', 'Two Pointers'], frequency: 'AllTime', acceptance: 75 },
            { id: 'd2', title: 'Palindrome Number', leetcodeUrl: 'https://leetcode.com/problems/palindrome-number', difficulty: 'Easy', topics: ['Math'], frequency: 'AllTime', acceptance: 53 },
            { id: 'd3', title: 'FizzBuzz', leetcodeUrl: 'https://leetcode.com/problems/fizz-buzz', difficulty: 'Easy', topics: ['Math', 'String'], frequency: 'Last30Days', acceptance: 68 },
            { id: 'd4', title: 'Single Number', leetcodeUrl: 'https://leetcode.com/problems/single-number', difficulty: 'Easy', topics: ['Bit Manipulation'], frequency: 'AllTime', acceptance: 70 },
            { id: 'd5', title: 'Remove Duplicates from Sorted Array', leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array', difficulty: 'Easy', topics: ['Array'], frequency: 'AllTime', acceptance: 50 },
            { id: 'd6', title: 'Missing Number', leetcodeUrl: 'https://leetcode.com/problems/missing-number', difficulty: 'Easy', topics: ['Array', 'Math'], frequency: 'Last60Days', acceptance: 61 },
            { id: 'd7', title: 'Power of Two', leetcodeUrl: 'https://leetcode.com/problems/power-of-two', difficulty: 'Easy', topics: ['Bit Manipulation'], frequency: 'Last30Days', acceptance: 45 },
            { id: 'd8', title: 'Merge Sorted Array', leetcodeUrl: 'https://leetcode.com/problems/merge-sorted-array', difficulty: 'Easy', topics: ['Array', 'Two Pointers'], frequency: 'AllTime', acceptance: 45 },
        ]
    },
    // TCS
    {
        companyId: 'tcs',
        questions: [
            { id: 't1', title: 'Two Sum', leetcodeUrl: 'https://leetcode.com/problems/two-sum', difficulty: 'Easy', topics: ['Array', 'Hash Table'], frequency: 'AllTime', acceptance: 49 },
            { id: 't2', title: 'Reverse Integer', leetcodeUrl: 'https://leetcode.com/problems/reverse-integer', difficulty: 'Medium', topics: ['Math'], frequency: 'AllTime', acceptance: 27 },
            { id: 't3', title: 'Valid Palindrome', leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome', difficulty: 'Easy', topics: ['String'], frequency: 'Last30Days', acceptance: 43 },
            { id: 't4', title: 'Contains Duplicate', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate', difficulty: 'Easy', topics: ['Array', 'Hash Table'], frequency: 'AllTime', acceptance: 61 },
            { id: 't5', title: 'Maximum Subarray', leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray', difficulty: 'Medium', topics: ['Array', 'DP'], frequency: 'Last60Days', acceptance: 49 },
        ]
    },
    // Infosys
    {
        companyId: 'infosys',
        questions: [
            { id: 'i1', title: 'Plus One', leetcodeUrl: 'https://leetcode.com/problems/plus-one', difficulty: 'Easy', topics: ['Array', 'Math'], frequency: 'AllTime', acceptance: 43 },
            { id: 'i2', title: 'Length of Last Word', leetcodeUrl: 'https://leetcode.com/problems/length-of-last-word', difficulty: 'Easy', topics: ['String'], frequency: 'Last30Days', acceptance: 40 },
            { id: 'i3', title: 'Add Binary', leetcodeUrl: 'https://leetcode.com/problems/add-binary', difficulty: 'Easy', topics: ['String', 'Math'], frequency: 'AllTime', acceptance: 51 },
            { id: 'i4', title: 'Sqrt(x)', leetcodeUrl: 'https://leetcode.com/problems/sqrtx', difficulty: 'Easy', topics: ['Binary Search', 'Math'], frequency: 'Last60Days', acceptance: 37 },
            { id: 'i5', title: 'Pascal Triangle', leetcodeUrl: 'https://leetcode.com/problems/pascals-triangle', difficulty: 'Easy', topics: ['Array', 'DP'], frequency: 'AllTime', acceptance: 68 },
        ]
    },
    // Cognizant
    {
        companyId: 'cognizant',
        questions: [
            { id: 'c1', title: 'Best Time to Buy and Sell Stock', leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', difficulty: 'Easy', topics: ['Array', 'DP'], frequency: 'AllTime', acceptance: 54 },
            { id: 'c2', title: 'Linked List Cycle', leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle', difficulty: 'Easy', topics: ['Linked List', 'Two Pointers'], frequency: 'Last30Days', acceptance: 45 },
            { id: 'c3', title: 'Intersection of Two Linked Lists', leetcodeUrl: 'https://leetcode.com/problems/intersection-of-two-linked-lists', difficulty: 'Easy', topics: ['Linked List'], frequency: 'AllTime', acceptance: 53 },
            { id: 'c4', title: 'Majority Element', leetcodeUrl: 'https://leetcode.com/problems/majority-element', difficulty: 'Easy', topics: ['Array'], frequency: 'Last60Days', acceptance: 63 },
        ]
    },
    // Wipro
    {
        companyId: 'wipro',
        questions: [
            { id: 'w1', title: 'Happy Number', leetcodeUrl: 'https://leetcode.com/problems/happy-number', difficulty: 'Easy', topics: ['Math', 'Hash Table'], frequency: 'AllTime', acceptance: 54 },
            { id: 'w2', title: 'Isomorphic Strings', leetcodeUrl: 'https://leetcode.com/problems/isomorphic-strings', difficulty: 'Easy', topics: ['String', 'Hash Table'], frequency: 'Last30Days', acceptance: 42 },
            { id: 'w3', title: 'Number of 1 Bits', leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits', difficulty: 'Easy', topics: ['Bit Manipulation'], frequency: 'AllTime', acceptance: 64 },
            { id: 'w4', title: 'Reverse Bits', leetcodeUrl: 'https://leetcode.com/problems/reverse-bits', difficulty: 'Easy', topics: ['Bit Manipulation'], frequency: 'Last60Days', acceptance: 51 },
        ]
    },
    // Accenture
    {
        companyId: 'accenture',
        questions: [
            { id: 'ac1', title: 'Move Zeroes', leetcodeUrl: 'https://leetcode.com/problems/move-zeroes', difficulty: 'Easy', topics: ['Array', 'Two Pointers'], frequency: 'AllTime', acceptance: 60 },
            { id: 'ac2', title: 'First Unique Character', leetcodeUrl: 'https://leetcode.com/problems/first-unique-character-in-a-string', difficulty: 'Easy', topics: ['String', 'Hash Table'], frequency: 'Last30Days', acceptance: 59 },
            { id: 'ac3', title: 'Ransom Note', leetcodeUrl: 'https://leetcode.com/problems/ransom-note', difficulty: 'Easy', topics: ['String', 'Hash Table'], frequency: 'AllTime', acceptance: 56 },
            { id: 'ac4', title: 'Find the Difference', leetcodeUrl: 'https://leetcode.com/problems/find-the-difference', difficulty: 'Easy', topics: ['String', 'Bit Manipulation'], frequency: 'Last60Days', acceptance: 60 },
        ]
    },
    // Capgemini
    {
        companyId: 'capgemini',
        questions: [
            { id: 'cp1', title: 'Symmetric Tree', leetcodeUrl: 'https://leetcode.com/problems/symmetric-tree', difficulty: 'Easy', topics: ['Tree', 'BFS', 'DFS'], frequency: 'AllTime', acceptance: 52 },
            { id: 'cp2', title: 'Maximum Depth of Binary Tree', leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree', difficulty: 'Easy', topics: ['Tree', 'DFS'], frequency: 'Last30Days', acceptance: 73 },
            { id: 'cp3', title: 'Invert Binary Tree', leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree', difficulty: 'Easy', topics: ['Tree', 'DFS'], frequency: 'AllTime', acceptance: 72 },
            { id: 'cp4', title: 'Path Sum', leetcodeUrl: 'https://leetcode.com/problems/path-sum', difficulty: 'Easy', topics: ['Tree', 'DFS'], frequency: 'Last60Days', acceptance: 48 },
        ]
    },
    // Tech Mahindra
    {
        companyId: 'techmahindra',
        questions: [
            { id: 'tm1', title: 'Search Insert Position', leetcodeUrl: 'https://leetcode.com/problems/search-insert-position', difficulty: 'Easy', topics: ['Binary Search'], frequency: 'AllTime', acceptance: 42 },
            { id: 'tm2', title: 'Count and Say', leetcodeUrl: 'https://leetcode.com/problems/count-and-say', difficulty: 'Medium', topics: ['String'], frequency: 'Last30Days', acceptance: 50 },
            { id: 'tm3', title: 'Implement strStr()', leetcodeUrl: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string', difficulty: 'Easy', topics: ['String'], frequency: 'AllTime', acceptance: 37 },
            { id: 'tm4', title: 'Valid Parentheses', leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses', difficulty: 'Easy', topics: ['Stack', 'String'], frequency: 'Last60Days', acceptance: 40 },
        ]
    },
    // Oracle
    {
        companyId: 'oracle',
        questions: [
            { id: 'or1', title: 'N-th Tribonacci Number', leetcodeUrl: 'https://leetcode.com/problems/n-th-tribonacci-number', difficulty: 'Easy', topics: ['DP', 'Math'], frequency: 'AllTime', acceptance: 63 },
            { id: 'or2', title: 'Pow(x, n)', leetcodeUrl: 'https://leetcode.com/problems/powx-n', difficulty: 'Medium', topics: ['Math', 'Recursion'], frequency: 'Last30Days', acceptance: 32 },
            { id: 'or3', title: 'Integer to Roman', leetcodeUrl: 'https://leetcode.com/problems/integer-to-roman', difficulty: 'Medium', topics: ['String', 'Math'], frequency: 'Last60Days', acceptance: 60 },
        ]
    },
    // Salesforce
    {
        companyId: 'salesforce',
        questions: [
            { id: 'sf1', title: 'Flatten Nested List Iterator', leetcodeUrl: 'https://leetcode.com/problems/flatten-nested-list-iterator', difficulty: 'Medium', topics: ['Design', 'Stack'], frequency: 'Last30Days', acceptance: 60 },
            { id: 'sf2', title: 'Find Median from Data Stream', leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream', difficulty: 'Hard', topics: ['Heap', 'Design'], frequency: 'Last60Days', acceptance: 51 },
            { id: 'sf3', title: 'Serialize and Deserialize BST', leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-bst', difficulty: 'Medium', topics: ['Tree', 'Design'], frequency: 'AllTime', acceptance: 56 },
        ]
    },
    // Airbnb
    {
        companyId: 'airbnb',
        questions: [
            { id: 'ab1', title: 'Alien Dictionary', leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary', difficulty: 'Hard', topics: ['Graph', 'Topological Sort'], frequency: 'Last30Days', acceptance: 35 },
            { id: 'ab2', title: 'Pour Water', leetcodeUrl: 'https://leetcode.com/problems/pour-water', difficulty: 'Medium', topics: ['Array', 'Simulation'], frequency: 'Last60Days', acceptance: 46 },
            { id: 'ab3', title: 'Display Pages', leetcodeUrl: 'https://leetcode.com/problems/display-table-of-food-orders-in-a-restaurant', difficulty: 'Medium', topics: ['Hash Table', 'Sorting'], frequency: 'AllTime', acceptance: 68 },
        ]
    },
];

export const getQuestionsByCompany = (companyId: string): CompanyQuestion[] => {
    const company = COMPANY_QUESTIONS.find(c => c.companyId === companyId);
    return company?.questions || [];
};

export const getQuestionsByFrequency = (companyId: string, frequency: CompanyQuestion['frequency']): CompanyQuestion[] => {
    const questions = getQuestionsByCompany(companyId);
    return questions.filter(q => q.frequency === frequency);
};

export const getQuestionsByDifficulty = (companyId: string, difficulty: CompanyQuestion['difficulty']): CompanyQuestion[] => {
    const questions = getQuestionsByCompany(companyId);
    return questions.filter(q => q.difficulty === difficulty);
};
