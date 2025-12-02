// Complete problems dataset with descriptions, test cases, and metadata

export interface ProblemData {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  starterCode: string;
  timeLimitMs: number;
  memoryLimitMb: number;
  visibleTestCases: { input: string; expectedOutput: string }[];
  hiddenTestCases: { input: string; expectedOutput: string }[];
}

// Helper to determine difficulty based on problem complexity
const getDifficulty = (id: string): 'easy' | 'medium' | 'hard' => {
  const hardProblems = [
    'trapping-rain-water', 'minimum-window-substring', 'sliding-window-maximum',
    'largest-rectangle-in-histogram', 'median-two-sorted-arrays', 'merge-k-sorted-lists',
    'reverse-nodes-in-k-group', 'maximum-path-sum', 'serialize-deserialize',
    'n-queens', 'word-ladder', 'find-median-from-stream', 'word-search-ii',
    'alien-dictionary', 'burst-balloons', 'regular-expression-matching'
  ];
  const easyProblems = [
    'contains-duplicate', 'valid-anagram', 'two-sum', 'valid-palindrome',
    'best-time-to-buy-sell-stock', 'valid-parentheses', 'binary-search',
    'reverse-linked-list', 'merge-two-sorted-lists', 'invert-binary-tree',
    'maximum-depth', 'same-binary-tree', 'climbing-stairs', 'min-cost-climbing-stairs',
    'happy-number', 'plus-one', 'single-number', 'number-of-1-bits',
    'counting-bits', 'reverse-bits', 'missing-number', 'maximum-subarray'
  ];
  
  if (hardProblems.some(p => id.includes(p))) return 'hard';
  if (easyProblems.some(p => id.includes(p))) return 'easy';
  return 'medium';
};

export const problemsData: ProblemData[] = [
  // Arrays and Hashing
  {
    id: "arrays-contains-duplicate",
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    category: "Arrays and Hashing",
    difficulty: "easy",
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

**Example:** Given nums = [1, 2, 3, 1], the answer is true because 1 appears twice at indices 0 and 3.

This problem tests your understanding of hash sets for O(n) lookup. The naive approach would compare each pair of elements (O(n²)), but using a set allows us to check for duplicates in a single pass.`,
    inputFormat: "def containsDuplicate(nums: List[int]) -> bool:",
    outputFormat: "Return True if any value appears at least twice, False otherwise.",
    constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
    starterCode: `from typing import List

def containsDuplicate(nums: List[int]) -> bool:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(containsDuplicate(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 1", expectedOutput: "True" },
      { input: "1 2 3 4", expectedOutput: "False" },
      { input: "1 1 1 3 3 4 3 2 4 2", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "False" },
      { input: "1 1", expectedOutput: "True" },
      { input: "0 0 0 0 0", expectedOutput: "True" },
      { input: "-1 -2 -3 -1", expectedOutput: "True" },
      { input: "1000000000 -1000000000", expectedOutput: "False" }
    ]
  },
  {
    id: "arrays-valid-anagram",
    slug: "valid-anagram",
    title: "Valid Anagram",
    category: "Arrays and Hashing",
    difficulty: "easy",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.

**Example:** Given s = "anagram", t = "nagaram", return true because both contain the same characters with the same frequencies.

This problem can be solved by counting character frequencies using a hash map or array.`,
    inputFormat: "def isAnagram(s: str, t: str) -> bool:",
    outputFormat: "Return True if t is an anagram of s, False otherwise.",
    constraints: "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters",
    starterCode: `def isAnagram(s: str, t: str) -> bool:
    # Your code here
    pass

# Read input
s = input()
t = input()
print(isAnagram(s, t))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "anagram\nnagaram", expectedOutput: "True" },
      { input: "rat\ncar", expectedOutput: "False" },
      { input: "listen\nsilent", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "True" },
      { input: "ab\nba", expectedOutput: "True" },
      { input: "abc\nabc", expectedOutput: "True" },
      { input: "abc\nabcd", expectedOutput: "False" },
      { input: "aacc\nccac", expectedOutput: "False" }
    ]
  },
  {
    id: "arrays-two-sum",
    slug: "two-sum",
    title: "Two Sum",
    category: "Arrays and Hashing",
    difficulty: "easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example:** Given nums = [2, 7, 11, 15], target = 9, return [0, 1] because nums[0] + nums[1] = 2 + 7 = 9.

Use a hash map to store each number's index as you iterate. For each number, check if (target - current) exists in the map.`,
    inputFormat: "def twoSum(nums: List[int], target: int) -> List[int]:",
    outputFormat: "Return a list of two indices that add up to target.",
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
    starterCode: `from typing import List

def twoSum(nums: List[int], target: int) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
target = int(input())
result = twoSum(nums, target)
print(result[0], result[1])`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 7 11 15\n9", expectedOutput: "0 1" },
      { input: "3 2 4\n6", expectedOutput: "1 2" },
      { input: "3 3\n6", expectedOutput: "0 1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n9", expectedOutput: "3 4" },
      { input: "-1 -2 -3 -4\n-6", expectedOutput: "1 3" },
      { input: "0 0\n0", expectedOutput: "0 1" },
      { input: "1 5 8 3 9 2\n11", expectedOutput: "2 4" },
      { input: "100 200 300\n400", expectedOutput: "0 2" }
    ]
  },
  {
    id: "arrays-group-anagrams",
    slug: "group-anagrams",
    title: "Group Anagrams",
    category: "Arrays and Hashing",
    difficulty: "medium",
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

**Example:** Given strs = ["eat","tea","tan","ate","nat","bat"], return [["bat"],["nat","tan"],["ate","eat","tea"]].

All anagrams share the same sorted character sequence. Use this as a key in a hash map to group them together.`,
    inputFormat: "def groupAnagrams(strs: List[str]) -> List[List[str]]:",
    outputFormat: "Return a list of groups, where each group contains anagrams.",
    constraints: "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters",
    starterCode: `from typing import List

def groupAnagrams(strs: List[str]) -> List[List[str]]:
    # Your code here
    pass

# Read input
strs = input().split()
result = groupAnagrams(strs)
# Sort for consistent output
result = [sorted(group) for group in result]
result.sort(key=lambda x: (len(x), x[0] if x else ""))
for group in result:
    print(" ".join(group))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "eat tea tan ate nat bat", expectedOutput: "bat\nnat tan\nate eat tea" },
      { input: "a", expectedOutput: "a" },
      { input: "", expectedOutput: "" }
    ],
    hiddenTestCases: [
      { input: "abc bca cab xyz zyx", expectedOutput: "abc bca cab\nxyz zyx" },
      { input: "listen silent enlist", expectedOutput: "enlist listen silent" },
      { input: "ab ba ab ba", expectedOutput: "ab ab ba ba" },
      { input: "aaa aaa aaa", expectedOutput: "aaa aaa aaa" },
      { input: "z y x w v", expectedOutput: "v\nw\nx\ny\nz" }
    ]
  },
  {
    id: "arrays-top-k-frequent-elements",
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    category: "Arrays and Hashing",
    difficulty: "medium",
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

**Example:** Given nums = [1,1,1,2,2,3], k = 2, return [1,2] because 1 appears 3 times and 2 appears 2 times.

Count frequencies using a hash map, then use bucket sort or a heap to find the top k elements efficiently.`,
    inputFormat: "def topKFrequent(nums: List[int], k: int) -> List[int]:",
    outputFormat: "Return a list of the k most frequent elements.",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\nk is in the range [1, number of unique elements]",
    starterCode: `from typing import List

def topKFrequent(nums: List[int], k: int) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
k = int(input())
result = sorted(topKFrequent(nums, k))
print(" ".join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 1 1 2 2 3\n2", expectedOutput: "1 2" },
      { input: "1\n1", expectedOutput: "1" },
      { input: "4 1 -1 2 -1 2 3\n2", expectedOutput: "-1 2" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n5", expectedOutput: "1 2 3 4 5" },
      { input: "5 5 5 5 1 1 1 2 2 3\n1", expectedOutput: "5" },
      { input: "-5 -5 -5 -1 -1 0\n2", expectedOutput: "-5 -1" },
      { input: "1 1 2 2 3 3 4 4\n4", expectedOutput: "1 2 3 4" },
      { input: "100 100 200 200 200\n1", expectedOutput: "200" }
    ]
  },
  {
    id: "arrays-product-of-array-except-self",
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    category: "Arrays and Hashing",
    difficulty: "medium",
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

You must solve it without using division and in O(n) time.

**Example:** Given nums = [1,2,3,4], return [24,12,8,6] because answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, etc.

Use prefix and suffix products: for each position, multiply all elements to its left by all elements to its right.`,
    inputFormat: "def productExceptSelf(nums: List[int]) -> List[int]:",
    outputFormat: "Return an array where each element is the product of all other elements.",
    constraints: "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix fits in a 32-bit integer",
    starterCode: `from typing import List

def productExceptSelf(nums: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = productExceptSelf(nums)
print(" ".join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4", expectedOutput: "24 12 8 6" },
      { input: "-1 1 0 -3 3", expectedOutput: "0 0 9 0 0" },
      { input: "2 3", expectedOutput: "3 2" }
    ],
    hiddenTestCases: [
      { input: "1 1 1 1", expectedOutput: "1 1 1 1" },
      { input: "0 0 0", expectedOutput: "0 0 0" },
      { input: "5 4 3 2 1", expectedOutput: "24 30 40 60 120" },
      { input: "-1 -1 -1 -1", expectedOutput: "-1 -1 -1 -1" },
      { input: "10 20", expectedOutput: "20 10" }
    ]
  },
  {
    id: "arrays-longest-consecutive-sequence",
    slug: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    category: "Arrays and Hashing",
    difficulty: "medium",
    description: `Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

**Example:** Given nums = [100,4,200,1,3,2], return 4 because the longest consecutive sequence is [1,2,3,4].

Use a hash set for O(1) lookups. For each number, only start counting a sequence if num-1 doesn't exist (meaning num is the start of a sequence).`,
    inputFormat: "def longestConsecutive(nums: List[int]) -> int:",
    outputFormat: "Return the length of the longest consecutive sequence.",
    constraints: "0 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
    starterCode: `from typing import List

def longestConsecutive(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
line = input().strip()
nums = list(map(int, line.split())) if line else []
print(longestConsecutive(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "100 4 200 1 3 2", expectedOutput: "4" },
      { input: "0 3 7 2 5 8 4 6 0 1", expectedOutput: "9" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "", expectedOutput: "0" },
      { input: "1 2 3 4 5", expectedOutput: "5" },
      { input: "5 4 3 2 1", expectedOutput: "5" },
      { input: "-5 -4 -3 0 1 2", expectedOutput: "3" },
      { input: "1 1 1 1", expectedOutput: "1" }
    ]
  },

  // Two Pointers
  {
    id: "two-pointers-valid-palindrome",
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    category: "Two Pointers",
    difficulty: "easy",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

**Example:** Given s = "A man, a plan, a canal: Panama", return true because after cleaning it becomes "amanaplanacanalpanama" which is a palindrome.

Use two pointers starting from both ends, skipping non-alphanumeric characters and comparing case-insensitively.`,
    inputFormat: "def isPalindrome(s: str) -> bool:",
    outputFormat: "Return True if s is a palindrome, False otherwise.",
    constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters",
    starterCode: `def isPalindrome(s: str) -> bool:
    # Your code here
    pass

# Read input
s = input()
print(isPalindrome(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "A man, a plan, a canal: Panama", expectedOutput: "True" },
      { input: "race a car", expectedOutput: "False" },
      { input: " ", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "True" },
      { input: "ab", expectedOutput: "False" },
      { input: "aa", expectedOutput: "True" },
      { input: "Aa", expectedOutput: "True" },
      { input: ".,", expectedOutput: "True" }
    ]
  },
  {
    id: "two-pointers-three-sum",
    slug: "3sum",
    title: "3Sum",
    category: "Two Pointers",
    difficulty: "medium",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

The solution set must not contain duplicate triplets.

**Example:** Given nums = [-1,0,1,2,-1,-4], return [[-1,-1,2],[-1,0,1]].

Sort the array first. For each element, use two pointers to find pairs that sum to its negation. Skip duplicates carefully.`,
    inputFormat: "def threeSum(nums: List[int]) -> List[List[int]]:",
    outputFormat: "Return a list of all unique triplets that sum to zero.",
    constraints: "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
    starterCode: `from typing import List

def threeSum(nums: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = threeSum(nums)
result.sort()
for triplet in result:
    print(" ".join(map(str, triplet)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "-1 0 1 2 -1 -4", expectedOutput: "-1 -1 2\n-1 0 1" },
      { input: "0 1 1", expectedOutput: "" },
      { input: "0 0 0", expectedOutput: "0 0 0" }
    ],
    hiddenTestCases: [
      { input: "-2 0 1 1 2", expectedOutput: "-2 0 2\n-2 1 1" },
      { input: "1 2 -2 -1", expectedOutput: "-2 1 1" },
      { input: "-4 -1 -1 0 1 2", expectedOutput: "-1 -1 2\n-1 0 1" },
      { input: "3 0 -2 -1 1 2", expectedOutput: "-2 -1 3\n-2 0 2\n-1 0 1" },
      { input: "-1 -1 -1 2", expectedOutput: "-1 -1 2" }
    ]
  },
  {
    id: "two-pointers-container-with-most-water",
    slug: "container-with-most-water",
    title: "Container With Most Water",
    category: "Two Pointers",
    difficulty: "medium",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

**Example:** Given height = [1,8,6,2,5,4,8,3,7], return 49 (between indices 1 and 8, area = min(8,7) * 7 = 49).

Use two pointers at both ends. Move the pointer with smaller height inward, as that's the only way to potentially find a larger area.`,
    inputFormat: "def maxArea(height: List[int]) -> int:",
    outputFormat: "Return the maximum amount of water a container can store.",
    constraints: "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
    starterCode: `from typing import List

def maxArea(height: List[int]) -> int:
    # Your code here
    pass

# Read input
height = list(map(int, input().split()))
print(maxArea(height))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 8 6 2 5 4 8 3 7", expectedOutput: "49" },
      { input: "1 1", expectedOutput: "1" },
      { input: "4 3 2 1 4", expectedOutput: "16" }
    ],
    hiddenTestCases: [
      { input: "1 2 1", expectedOutput: "2" },
      { input: "2 3 4 5 18 17 6", expectedOutput: "17" },
      { input: "1 8 100 2 100 4 8 3 7", expectedOutput: "200" },
      { input: "10 10 10 10", expectedOutput: "30" },
      { input: "1 2 3 4 5 25", expectedOutput: "25" }
    ]
  },

  // Sliding Window
  {
    id: "sliding-window-best-time-to-buy-sell-stock",
    slug: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy And Sell Stock",
    category: "Sliding Window",
    difficulty: "easy",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

**Example:** Given prices = [7,1,5,3,6,4], return 5 because buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Track the minimum price seen so far. For each day, calculate potential profit if selling today and update max profit.`,
    inputFormat: "def maxProfit(prices: List[int]) -> int:",
    outputFormat: "Return the maximum profit you can achieve, or 0 if no profit is possible.",
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    starterCode: `from typing import List

def maxProfit(prices: List[int]) -> int:
    # Your code here
    pass

# Read input
prices = list(map(int, input().split()))
print(maxProfit(prices))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "7 1 5 3 6 4", expectedOutput: "5" },
      { input: "7 6 4 3 1", expectedOutput: "0" },
      { input: "2 4 1", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "0" },
      { input: "1 2", expectedOutput: "1" },
      { input: "2 1", expectedOutput: "0" },
      { input: "3 3 3 3", expectedOutput: "0" },
      { input: "1 2 3 4 5", expectedOutput: "4" }
    ]
  },
  {
    id: "sliding-window-longest-substring-without-repeating",
    slug: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    category: "Sliding Window",
    difficulty: "medium",
    description: `Given a string s, find the length of the longest substring without repeating characters.

**Example:** Given s = "abcabcbb", return 3 because "abc" is the longest substring without repeating characters.

Use a sliding window with a hash set to track characters in the current window. Expand right, shrink left when duplicate found.`,
    inputFormat: "def lengthOfLongestSubstring(s: str) -> int:",
    outputFormat: "Return the length of the longest substring without repeating characters.",
    constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces",
    starterCode: `def lengthOfLongestSubstring(s: str) -> int:
    # Your code here
    pass

# Read input
s = input()
print(lengthOfLongestSubstring(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "", expectedOutput: "0" },
      { input: "a", expectedOutput: "1" },
      { input: "au", expectedOutput: "2" },
      { input: "dvdf", expectedOutput: "3" },
      { input: "abcdefg", expectedOutput: "7" }
    ]
  },

  // Stacks
  {
    id: "stacks-valid-parentheses",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    category: "Stacks",
    difficulty: "easy",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

A string is valid if:
- Open brackets must be closed by the same type of brackets
- Open brackets must be closed in the correct order
- Every close bracket has a corresponding open bracket of the same type

**Example:** Given s = "()[]{}", return true. Given s = "(]", return false.

Use a stack: push opening brackets, pop and match for closing brackets.`,
    inputFormat: "def isValid(s: str) -> bool:",
    outputFormat: "Return True if the string has valid parentheses, False otherwise.",
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'",
    starterCode: `def isValid(s: str) -> bool:
    # Your code here
    pass

# Read input
s = input()
print(isValid(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "()", expectedOutput: "True" },
      { input: "()[]{}", expectedOutput: "True" },
      { input: "(]", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "(", expectedOutput: "False" },
      { input: ")", expectedOutput: "False" },
      { input: "{[]}", expectedOutput: "True" },
      { input: "([)]", expectedOutput: "False" },
      { input: "((((()))))", expectedOutput: "True" }
    ]
  },
  {
    id: "stacks-min-stack",
    slug: "min-stack",
    title: "Min Stack",
    category: "Stacks",
    difficulty: "medium",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class with:
- push(val) — Pushes the element val onto the stack
- pop() — Removes the element on the top of the stack
- top() — Gets the top element of the stack
- getMin() — Retrieves the minimum element in the stack

**Example:** After push(-2), push(0), push(-3), getMin() returns -3. After pop(), getMin() returns -2.

Store pairs of (value, currentMin) or use two stacks: one for values, one for minimums.`,
    inputFormat: "Implement MinStack class with push, pop, top, getMin methods",
    outputFormat: "Process operations and output results of top() and getMin() calls.",
    constraints: "-2^31 <= val <= 2^31 - 1\nMethods pop, top and getMin will always be called on non-empty stacks\nAt most 3 * 10^4 calls will be made to push, pop, top, and getMin",
    starterCode: `class MinStack:
    def __init__(self):
        # Your code here
        pass

    def push(self, val: int) -> None:
        # Your code here
        pass

    def pop(self) -> None:
        # Your code here
        pass

    def top(self) -> int:
        # Your code here
        pass

    def getMin(self) -> int:
        # Your code here
        pass

# Process operations
stack = MinStack()
n = int(input())
for _ in range(n):
    op = input().split()
    if op[0] == "push":
        stack.push(int(op[1]))
    elif op[0] == "pop":
        stack.pop()
    elif op[0] == "top":
        print(stack.top())
    elif op[0] == "getMin":
        print(stack.getMin())`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", expectedOutput: "-3\n0\n-2" },
      { input: "5\npush 1\npush 2\ntop\ngetMin\npop", expectedOutput: "2\n1" },
      { input: "4\npush 0\npush 1\ngetMin\ntop", expectedOutput: "0\n1" }
    ],
    hiddenTestCases: [
      { input: "3\npush 5\ntop\ngetMin", expectedOutput: "5\n5" },
      { input: "6\npush -1\npush -2\npush -3\ngetMin\npop\ngetMin", expectedOutput: "-3\n-2" },
      { input: "5\npush 2\npush 2\ngetMin\npop\ngetMin", expectedOutput: "2\n2" },
      { input: "4\npush 10\npush 5\npop\ngetMin", expectedOutput: "10" },
      { input: "6\npush 1\npush 2\npush 3\ntop\npop\ntop", expectedOutput: "3\n2" }
    ]
  },

  // Binary Search
  {
    id: "binary-search-binary-search",
    slug: "binary-search",
    title: "Binary Search",
    category: "Binary Search",
    difficulty: "easy",
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

**Example:** Given nums = [-1,0,3,5,9,12], target = 9, return 4 because nums[4] = 9.

Classic binary search: compare middle element with target, narrow search range accordingly.`,
    inputFormat: "def search(nums: List[int], target: int) -> int:",
    outputFormat: "Return the index of target if found, -1 otherwise.",
    constraints: "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll elements in nums are unique\nnums is sorted in ascending order",
    starterCode: `from typing import List

def search(nums: List[int], target: int) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
target = int(input())
print(search(nums, target))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "-1 0 3 5 9 12\n9", expectedOutput: "4" },
      { input: "-1 0 3 5 9 12\n2", expectedOutput: "-1" },
      { input: "5\n5", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n1", expectedOutput: "0" },
      { input: "1 2 3 4 5\n5", expectedOutput: "4" },
      { input: "1 2 3 4 5\n3", expectedOutput: "2" },
      { input: "1 2 3 4 5\n6", expectedOutput: "-1" },
      { input: "-10 -5 0 5 10\n-5", expectedOutput: "1" }
    ]
  },

  // Linked List
  {
    id: "linked-list-reverse-linked-list",
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    category: "Linked List",
    difficulty: "easy",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example:** Given head = [1,2,3,4,5], return [5,4,3,2,1].

Iterate through the list, reversing pointers as you go. Keep track of previous, current, and next nodes.`,
    inputFormat: "def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:",
    outputFormat: "Return the head of the reversed linked list.",
    constraints: "The number of nodes in the list is in the range [0, 5000]\n-5000 <= Node.val <= 5000",
    starterCode: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:
    # Your code here
    pass

# Helper functions
def buildList(vals):
    if not vals:
        return None
    head = ListNode(vals[0])
    curr = head
    for v in vals[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

def printList(head):
    vals = []
    while head:
        vals.append(str(head.val))
        head = head.next
    print(" ".join(vals) if vals else "empty")

# Read input
line = input().strip()
vals = list(map(int, line.split())) if line else []
head = buildList(vals)
result = reverseList(head)
printList(result)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "5 4 3 2 1" },
      { input: "1 2", expectedOutput: "2 1" },
      { input: "", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 1 1", expectedOutput: "1 1 1" },
      { input: "-1 0 1", expectedOutput: "1 0 -1" },
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "100", expectedOutput: "100" }
    ]
  },
  {
    id: "linked-list-merge-two-sorted-lists",
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    category: "Linked List",
    difficulty: "easy",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

**Example:** Given list1 = [1,2,4], list2 = [1,3,4], return [1,1,2,3,4,4].

Use a dummy head and compare nodes from both lists, always choosing the smaller one.`,
    inputFormat: "def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:",
    outputFormat: "Return the head of the merged sorted linked list.",
    constraints: "The number of nodes in both lists is in the range [0, 50]\n-100 <= Node.val <= 100\nBoth list1 and list2 are sorted in non-decreasing order",
    starterCode: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    # Your code here
    pass

# Helper functions
def buildList(vals):
    if not vals:
        return None
    head = ListNode(vals[0])
    curr = head
    for v in vals[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head

def printList(head):
    vals = []
    while head:
        vals.append(str(head.val))
        head = head.next
    print(" ".join(vals) if vals else "empty")

# Read input
line1 = input().strip()
line2 = input().strip()
vals1 = list(map(int, line1.split())) if line1 else []
vals2 = list(map(int, line2.split())) if line2 else []
list1 = buildList(vals1)
list2 = buildList(vals2)
result = mergeTwoLists(list1, list2)
printList(result)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 4\n1 3 4", expectedOutput: "1 1 2 3 4 4" },
      { input: "\n", expectedOutput: "empty" },
      { input: "\n0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2 3\n4 5 6", expectedOutput: "1 2 3 4 5 6" },
      { input: "1\n2", expectedOutput: "1 2" },
      { input: "2\n1", expectedOutput: "1 2" },
      { input: "-3 -1 0\n-2 1 2", expectedOutput: "-3 -2 -1 0 1 2" },
      { input: "1 1 1\n1 1 1", expectedOutput: "1 1 1 1 1 1" }
    ]
  },

  // Trees
  {
    id: "trees-invert-binary-tree",
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    category: "Trees",
    difficulty: "easy",
    description: `Given the root of a binary tree, invert the tree, and return its root.

**Example:** Given root = [4,2,7,1,3,6,9], return [4,7,2,9,6,3,1]. The left and right children of every node are swapped.

Recursively swap the left and right children of each node. Base case: if node is null, return null.`,
    inputFormat: "def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:",
    outputFormat: "Return the root of the inverted tree.",
    constraints: "The number of nodes in the tree is in the range [0, 100]\n-100 <= Node.val <= 100",
    starterCode: `from typing import Optional, List
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    # Your code here
    pass

# Helper functions
def buildTree(vals):
    if not vals or vals[0] == "null":
        return None
    root = TreeNode(int(vals[0]))
    queue = deque([root])
    i = 1
    while queue and i < len(vals):
        node = queue.popleft()
        if i < len(vals) and vals[i] != "null":
            node.left = TreeNode(int(vals[i]))
            queue.append(node.left)
        i += 1
        if i < len(vals) and vals[i] != "null":
            node.right = TreeNode(int(vals[i]))
            queue.append(node.right)
        i += 1
    return root

def treeToList(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node:
            result.append(str(node.val))
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append("null")
    while result and result[-1] == "null":
        result.pop()
    return result

# Read input
line = input().strip()
vals = line.split() if line else []
root = buildTree(vals)
result = invertTree(root)
output = treeToList(result)
print(" ".join(output) if output else "empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 2 7 1 3 6 9", expectedOutput: "4 7 2 9 6 3 1" },
      { input: "2 1 3", expectedOutput: "2 3 1" },
      { input: "", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2", expectedOutput: "1 null 2" },
      { input: "1 null 2", expectedOutput: "1 2" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "1 3 2 7 6 5 4" },
      { input: "5 3 7 2 4 6 8", expectedOutput: "5 7 3 8 6 4 2" }
    ]
  },
  {
    id: "trees-maximum-depth",
    slug: "maximum-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    category: "Trees",
    difficulty: "easy",
    description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example:** Given root = [3,9,20,null,null,15,7], return 3.

Recursively compute the depth: max(depth(left), depth(right)) + 1. Base case: null node has depth 0.`,
    inputFormat: "def maxDepth(root: Optional[TreeNode]) -> int:",
    outputFormat: "Return the maximum depth of the binary tree.",
    constraints: "The number of nodes in the tree is in the range [0, 10^4]\n-100 <= Node.val <= 100",
    starterCode: `from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxDepth(root: Optional[TreeNode]) -> int:
    # Your code here
    pass

# Helper function
def buildTree(vals):
    if not vals or vals[0] == "null":
        return None
    root = TreeNode(int(vals[0]))
    queue = deque([root])
    i = 1
    while queue and i < len(vals):
        node = queue.popleft()
        if i < len(vals) and vals[i] != "null":
            node.left = TreeNode(int(vals[i]))
            queue.append(node.left)
        i += 1
        if i < len(vals) and vals[i] != "null":
            node.right = TreeNode(int(vals[i]))
            queue.append(node.right)
        i += 1
    return root

# Read input
line = input().strip()
vals = line.split() if line else []
root = buildTree(vals)
print(maxDepth(root))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "3" },
      { input: "1 null 2", expectedOutput: "2" },
      { input: "", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2 3", expectedOutput: "2" },
      { input: "1 2 null 3 null 4", expectedOutput: "4" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "3" },
      { input: "1 null 2 null 3 null 4 null 5", expectedOutput: "5" }
    ]
  },

  // Dynamic Programming
  {
    id: "dp1-climbing-stairs",
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    category: "1D Dynamic Programming",
    difficulty: "easy",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example:** Given n = 3, return 3 because there are three ways: 1+1+1, 1+2, 2+1.

This is the Fibonacci sequence! dp[i] = dp[i-1] + dp[i-2] with dp[1]=1, dp[2]=2.`,
    inputFormat: "def climbStairs(n: int) -> int:",
    outputFormat: "Return the number of distinct ways to climb to the top.",
    constraints: "1 <= n <= 45",
    starterCode: `def climbStairs(n: int) -> int:
    # Your code here
    pass

# Read input
n = int(input())
print(climbStairs(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
      { input: "4", expectedOutput: "5" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "5", expectedOutput: "8" },
      { input: "10", expectedOutput: "89" },
      { input: "20", expectedOutput: "10946" },
      { input: "45", expectedOutput: "1836311903" }
    ]
  },
  {
    id: "dp1-house-robber",
    slug: "house-robber",
    title: "House Robber",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Example:** Given nums = [2,7,9,3,1], return 12 because rob houses 1, 3, and 5 (0-indexed: 0, 2, 4) for 2+9+1=12.

dp[i] = max(dp[i-1], dp[i-2] + nums[i]) — either skip this house or rob it.`,
    inputFormat: "def rob(nums: List[int]) -> int:",
    outputFormat: "Return the maximum amount of money you can rob.",
    constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
    starterCode: `from typing import List

def rob(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(rob(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 1", expectedOutput: "4" },
      { input: "2 7 9 3 1", expectedOutput: "12" },
      { input: "2 1 1 2", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2", expectedOutput: "2" },
      { input: "2 1", expectedOutput: "2" },
      { input: "1 3 1 3 100", expectedOutput: "103" },
      { input: "100 1 1 100", expectedOutput: "200" }
    ]
  },
  {
    id: "dp1-coin-change",
    slug: "coin-change",
    title: "Coin Change",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up, return -1.

**Example:** Given coins = [1,2,5], amount = 11, return 3 because 11 = 5 + 5 + 1.

dp[i] = min coins needed for amount i. For each coin, dp[i] = min(dp[i], dp[i-coin] + 1).`,
    inputFormat: "def coinChange(coins: List[int], amount: int) -> int:",
    outputFormat: "Return the fewest number of coins needed, or -1 if impossible.",
    constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
    starterCode: `from typing import List

def coinChange(coins: List[int], amount: int) -> int:
    # Your code here
    pass

# Read input
coins = list(map(int, input().split()))
amount = int(input())
print(coinChange(coins, amount))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 5\n11", expectedOutput: "3" },
      { input: "2\n3", expectedOutput: "-1" },
      { input: "1\n0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "1\n100", expectedOutput: "100" },
      { input: "1 5 10 25\n30", expectedOutput: "2" },
      { input: "2 5 10\n3", expectedOutput: "-1" },
      { input: "186 419 83 408\n6249", expectedOutput: "20" }
    ]
  },

  // Greedy
  {
    id: "greedy-maximum-subarray",
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    category: "Greedy",
    difficulty: "easy",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

**Example:** Given nums = [-2,1,-3,4,-1,2,1,-5,4], return 6 because [4,-1,2,1] has the largest sum = 6.

Kadane's algorithm: track current sum, reset to 0 when negative. Track maximum sum seen.`,
    inputFormat: "def maxSubArray(nums: List[int]) -> int:",
    outputFormat: "Return the largest sum of any contiguous subarray.",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    starterCode: `from typing import List

def maxSubArray(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(maxSubArray(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6" },
      { input: "1", expectedOutput: "1" },
      { input: "5 4 -1 7 8", expectedOutput: "23" }
    ],
    hiddenTestCases: [
      { input: "-1", expectedOutput: "-1" },
      { input: "-2 -1", expectedOutput: "-1" },
      { input: "1 2 3 4 5", expectedOutput: "15" },
      { input: "-1 -2 -3 -4", expectedOutput: "-1" },
      { input: "1 -1 1 -1 1", expectedOutput: "1" }
    ]
  },

  // Bit Manipulation
  {
    id: "bit-single-number",
    slug: "single-number",
    title: "Single Number",
    category: "Bit Manipulation",
    difficulty: "easy",
    description: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example:** Given nums = [4,1,2,1,2], return 4.

XOR all numbers together. Since a XOR a = 0 and a XOR 0 = a, all pairs cancel out leaving the single number.`,
    inputFormat: "def singleNumber(nums: List[int]) -> int:",
    outputFormat: "Return the element that appears only once.",
    constraints: "1 <= nums.length <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4\nEach element appears twice except for one",
    starterCode: `from typing import List

def singleNumber(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(singleNumber(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 2 1", expectedOutput: "1" },
      { input: "4 1 2 1 2", expectedOutput: "4" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "-1 -1 -2", expectedOutput: "-2" },
      { input: "0 1 0", expectedOutput: "1" },
      { input: "5 3 5 3 7", expectedOutput: "7" },
      { input: "100 200 100", expectedOutput: "200" },
      { input: "-5 -5 10 10 0", expectedOutput: "0" }
    ]
  },

  // ============ ADVANCED GRAPH ============
  {
    id: 51,
    title: "Network Delay Time",
    description: "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.\n\nWe will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.\n\nThis is a classic shortest path problem that can be solved using Dijkstra's algorithm.",
    inputFormat: "First line: n (number of nodes), k (starting node)\nFollowing lines: edges as 'u v w' (source, target, weight)",
    outputFormat: "Return the minimum time for all nodes to receive the signal, or -1 if impossible.",
    constraints: "1 <= k <= n <= 100\n1 <= times.length <= 6000\n1 <= ui, vi <= n\n1 <= wi <= 100",
    starterCode: `from typing import List
import heapq

def networkDelayTime(times: List[List[int]], n: int, k: int) -> int:
    # Your code here
    pass

# Read input
n, k = map(int, input().split())
times = []
m = int(input())
for _ in range(m):
    u, v, w = map(int, input().split())
    times.append([u, v, w])
print(networkDelayTime(times, n, k))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 2\n3\n2 1 1\n2 3 1\n3 4 1", expectedOutput: "2" },
      { input: "2 1\n1\n1 2 1", expectedOutput: "1" },
      { input: "2 2\n1\n1 2 1", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "3 1\n3\n1 2 1\n2 3 2\n1 3 4", expectedOutput: "3" },
      { input: "1 1\n0", expectedOutput: "0" },
      { input: "4 1\n4\n1 2 1\n1 3 2\n2 4 3\n3 4 1", expectedOutput: "3" },
      { input: "5 1\n6\n1 2 1\n1 3 2\n2 4 1\n3 4 1\n4 5 1\n2 5 5", expectedOutput: "3" },
      { input: "3 1\n2\n1 2 1\n1 3 1", expectedOutput: "1" }
    ]
  },
  {
    id: 52,
    title: "Swim in Rising Water",
    description: "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).\n\nThe rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t.\n\nYou can swim infinite distances in zero time. Return the least time until you can reach the bottom right square (n - 1, n - 1) starting from the top left square (0, 0).",
    inputFormat: "First line: n (grid size)\nFollowing n lines: n space-separated integers representing the grid",
    outputFormat: "Return the minimum time to swim from top-left to bottom-right.",
    constraints: "n == grid.length\nn == grid[i].length\n1 <= n <= 50\n0 <= grid[i][j] < n^2",
    starterCode: `from typing import List
import heapq

def swimInWater(grid: List[List[int]]) -> int:
    # Your code here
    pass

# Read input
n = int(input())
grid = []
for _ in range(n):
    row = list(map(int, input().split()))
    grid.append(row)
print(swimInWater(grid))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\n0 2\n1 3", expectedOutput: "3" },
      { input: "3\n0 1 2\n3 4 5\n6 7 8", expectedOutput: "8" },
      { input: "1\n0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "3\n3 2 1\n6 5 4\n9 8 7", expectedOutput: "8" },
      { input: "4\n0 1 2 3\n4 5 6 7\n8 9 10 11\n12 13 14 15", expectedOutput: "15" },
      { input: "2\n3 1\n2 0", expectedOutput: "3" },
      { input: "3\n0 3 6\n1 4 7\n2 5 8", expectedOutput: "8" },
      { input: "2\n0 1\n2 3", expectedOutput: "3" }
    ]
  },
  {
    id: 53,
    title: "Alien Dictionary",
    description: "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.\n\nYou are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.\n\nDerive the order of letters in this language, and return it. If the order is invalid, return an empty string. If there are multiple valid orders, return any of them.",
    inputFormat: "First line: number of words\nFollowing lines: one word per line",
    outputFormat: "Return a string containing the order of characters in the alien language.",
    constraints: "1 <= words.length <= 100\n1 <= words[i].length <= 100\nwords[i] consists of only lowercase English letters",
    starterCode: `from typing import List
from collections import defaultdict, deque

def alienOrder(words: List[str]) -> str:
    # Your code here
    pass

# Read input
n = int(input())
words = [input().strip() for _ in range(n)]
print(alienOrder(words))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\nwrt\nwrf\ner", expectedOutput: "wertf" },
      { input: "2\nz\nx", expectedOutput: "zx" },
      { input: "2\nz\nz", expectedOutput: "z" }
    ],
    hiddenTestCases: [
      { input: "2\nabc\nab", expectedOutput: "" },
      { input: "1\na", expectedOutput: "a" },
      { input: "3\na\nb\nc", expectedOutput: "abc" },
      { input: "4\nba\nbc\nac\ndc", expectedOutput: "badc" },
      { input: "2\nab\ncd", expectedOutput: "abcd" }
    ]
  },
  {
    id: 54,
    title: "Cheapest Flights Within K Stops",
    description: "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei.\n\nYou are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.",
    inputFormat: "First line: n src dst k\nSecond line: number of flights\nFollowing lines: from to price",
    outputFormat: "Return the cheapest price with at most k stops, or -1 if impossible.",
    constraints: "1 <= n <= 100\n0 <= flights.length <= (n * (n - 1) / 2)\n0 <= src, dst, k < n",
    starterCode: `from typing import List
import heapq

def findCheapestPrice(n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    # Your code here
    pass

# Read input
n, src, dst, k = map(int, input().split())
m = int(input())
flights = []
for _ in range(m):
    f, t, p = map(int, input().split())
    flights.append([f, t, p])
print(findCheapestPrice(n, flights, src, dst, k))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 0 3 1\n5\n0 1 100\n1 2 100\n2 0 100\n1 3 600\n2 3 200", expectedOutput: "700" },
      { input: "3 0 2 1\n3\n0 1 100\n1 2 100\n0 2 500", expectedOutput: "200" },
      { input: "3 0 2 0\n3\n0 1 100\n1 2 100\n0 2 500", expectedOutput: "500" }
    ],
    hiddenTestCases: [
      { input: "4 0 3 2\n4\n0 1 1\n1 2 1\n2 3 1\n0 3 100", expectedOutput: "3" },
      { input: "2 0 1 0\n1\n0 1 5", expectedOutput: "5" },
      { input: "3 0 2 1\n0", expectedOutput: "-1" },
      { input: "5 0 4 2\n6\n0 1 1\n1 2 1\n2 3 1\n3 4 1\n0 4 100\n1 4 50", expectedOutput: "51" },
      { input: "4 0 3 1\n3\n0 1 10\n1 3 10\n0 2 5", expectedOutput: "20" }
    ]
  },
  {
    id: 55,
    title: "Reconstruct Itinerary",
    description: "You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.\n\nAll of the tickets belong to a man who departs from 'JFK', thus, the itinerary must begin with 'JFK'. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order.\n\nYou may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.",
    inputFormat: "First line: number of tickets\nFollowing lines: from to",
    outputFormat: "Return the reconstructed itinerary as space-separated airports.",
    constraints: "1 <= tickets.length <= 300\ntickets[i].length == 2\nfromi.length == toi.length == 3",
    starterCode: `from typing import List
from collections import defaultdict

def findItinerary(tickets: List[List[str]]) -> List[str]:
    # Your code here
    pass

# Read input
n = int(input())
tickets = []
for _ in range(n):
    f, t = input().split()
    tickets.append([f, t])
print(' '.join(findItinerary(tickets)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\nMUC LHR\nJFK MUC\nSFO SJC", expectedOutput: "JFK MUC LHR" },
      { input: "4\nJFK SFO\nJFK ATL\nSFO ATL\nATL JFK", expectedOutput: "JFK ATL JFK SFO ATL" },
      { input: "2\nJFK KUL\nJFK NRT", expectedOutput: "JFK KUL" }
    ],
    hiddenTestCases: [
      { input: "1\nJFK NYC", expectedOutput: "JFK NYC" },
      { input: "3\nJFK AAA\nAAA BBB\nBBB JFK", expectedOutput: "JFK AAA BBB JFK" },
      { input: "5\nJFK A\nA B\nB C\nC D\nD JFK", expectedOutput: "JFK A B C D JFK" },
      { input: "3\nJFK A\nJFK B\nA JFK", expectedOutput: "JFK A JFK B" },
      { input: "2\nJFK A\nA B", expectedOutput: "JFK A B" }
    ]
  },

  // ============ MORE 2D DYNAMIC PROGRAMMING ============
  {
    id: 56,
    title: "Unique Paths",
    description: "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\n\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    inputFormat: "Single line containing m and n separated by space.",
    outputFormat: "Return the number of unique paths.",
    constraints: "1 <= m, n <= 100",
    starterCode: `def uniquePaths(m: int, n: int) -> int:
    # Your code here
    pass

# Read input
m, n = map(int, input().split())
print(uniquePaths(m, n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 7", expectedOutput: "28" },
      { input: "3 2", expectedOutput: "3" },
      { input: "1 1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "7 3", expectedOutput: "28" },
      { input: "10 10", expectedOutput: "48620" },
      { input: "5 5", expectedOutput: "70" },
      { input: "1 10", expectedOutput: "1" },
      { input: "2 2", expectedOutput: "2" }
    ]
  },
  {
    id: 57,
    title: "Unique Paths II",
    description: "You are given an m x n integer array grid. There is a robot initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right.\n\nAn obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.\n\nReturn the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    inputFormat: "First line: m n\nFollowing m lines: n space-separated integers (0 or 1)",
    outputFormat: "Return the number of unique paths avoiding obstacles.",
    constraints: "m == grid.length\nn == grid[i].length\n1 <= m, n <= 100\ngrid[i][j] is 0 or 1",
    starterCode: `from typing import List

def uniquePathsWithObstacles(obstacleGrid: List[List[int]]) -> int:
    # Your code here
    pass

# Read input
m, n = map(int, input().split())
grid = []
for _ in range(m):
    row = list(map(int, input().split()))
    grid.append(row)
print(uniquePathsWithObstacles(grid))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 3\n0 0 0\n0 1 0\n0 0 0", expectedOutput: "2" },
      { input: "2 2\n0 1\n0 0", expectedOutput: "1" },
      { input: "1 1\n0", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 1\n1", expectedOutput: "0" },
      { input: "3 3\n0 0 0\n0 0 0\n0 0 0", expectedOutput: "6" },
      { input: "2 3\n0 0 0\n0 0 0", expectedOutput: "3" },
      { input: "3 3\n1 0 0\n0 0 0\n0 0 0", expectedOutput: "0" },
      { input: "3 3\n0 0 0\n0 0 0\n0 0 1", expectedOutput: "0" }
    ]
  },
  {
    id: 58,
    title: "Longest Common Subsequence",
    description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\n\nFor example, 'ace' is a subsequence of 'abcde'. A common subsequence of two strings is a subsequence that is common to both strings.",
    inputFormat: "Two lines containing text1 and text2.",
    outputFormat: "Return the length of the longest common subsequence.",
    constraints: "1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters",
    starterCode: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    # Your code here
    pass

# Read input
text1 = input().strip()
text2 = input().strip()
print(longestCommonSubsequence(text1, text2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "abcde\nace", expectedOutput: "3" },
      { input: "abc\nabc", expectedOutput: "3" },
      { input: "abc\ndef", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "1" },
      { input: "abcdefghij\nacegi", expectedOutput: "5" },
      { input: "bsbininm\njmjkbkjkv", expectedOutput: "1" },
      { input: "oxcpqrsvwf\nshmtulqrypy", expectedOutput: "2" },
      { input: "aaaaaa\naaa", expectedOutput: "3" }
    ]
  },
  {
    id: 59,
    title: "Best Time to Buy and Sell Stock with Cooldown",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nFind the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:\n\nAfter you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).\n\nNote: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).",
    inputFormat: "Single line of space-separated integers representing prices.",
    outputFormat: "Return the maximum profit.",
    constraints: "1 <= prices.length <= 5000\n0 <= prices[i] <= 1000",
    starterCode: `from typing import List

def maxProfit(prices: List[int]) -> int:
    # Your code here
    pass

# Read input
prices = list(map(int, input().split()))
print(maxProfit(prices))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 0 2", expectedOutput: "3" },
      { input: "1", expectedOutput: "0" },
      { input: "1 2", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "2 1", expectedOutput: "0" },
      { input: "1 2 3 4 5", expectedOutput: "4" },
      { input: "7 6 4 3 1", expectedOutput: "0" },
      { input: "1 4 2 7", expectedOutput: "6" },
      { input: "2 1 4", expectedOutput: "3" }
    ]
  },
  {
    id: 60,
    title: "Coin Change II",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.\n\nYou may assume that you have an infinite number of each kind of coin.\n\nThe answer is guaranteed to fit into a signed 32-bit integer.",
    inputFormat: "First line: amount\nSecond line: space-separated coin denominations",
    outputFormat: "Return the number of combinations.",
    constraints: "1 <= coins.length <= 300\n1 <= coins[i] <= 5000\n0 <= amount <= 5000",
    starterCode: `from typing import List

def change(amount: int, coins: List[int]) -> int:
    # Your code here
    pass

# Read input
amount = int(input())
coins = list(map(int, input().split()))
print(change(amount, coins))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\n1 2 5", expectedOutput: "4" },
      { input: "3\n2", expectedOutput: "0" },
      { input: "10\n10", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "0\n1 2", expectedOutput: "1" },
      { input: "100\n1 5 10 25", expectedOutput: "242" },
      { input: "5\n1", expectedOutput: "1" },
      { input: "7\n2 3 5", expectedOutput: "2" },
      { input: "500\n1 2 5", expectedOutput: "12701" }
    ]
  },
  {
    id: 61,
    title: "Target Sum",
    description: "You are given an integer array nums and an integer target.\n\nYou want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.\n\nFor example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression '+2-1'.\n\nReturn the number of different expressions that you can build, which evaluates to target.",
    inputFormat: "First line: target\nSecond line: space-separated integers",
    outputFormat: "Return the number of expressions that evaluate to target.",
    constraints: "1 <= nums.length <= 20\n0 <= nums[i] <= 1000\n0 <= sum(nums[i]) <= 1000\n-1000 <= target <= 1000",
    starterCode: `from typing import List

def findTargetSumWays(nums: List[int], target: int) -> int:
    # Your code here
    pass

# Read input
target = int(input())
nums = list(map(int, input().split()))
print(findTargetSumWays(nums, target))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n1 1 1 1 1", expectedOutput: "5" },
      { input: "1\n1", expectedOutput: "1" },
      { input: "2\n1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "0\n0 0 0 0 0", expectedOutput: "32" },
      { input: "1000\n1000", expectedOutput: "1" },
      { input: "-1\n1", expectedOutput: "1" },
      { input: "0\n1 1", expectedOutput: "2" },
      { input: "5\n1 2 3 4 5", expectedOutput: "3" }
    ]
  },
  {
    id: 62,
    title: "Interleaving String",
    description: "Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.\n\nAn interleaving of two strings s and t is a configuration where s and t are divided into n and m non-empty substrings respectively, such that:\n\ns = s1 + s2 + ... + sn\nt = t1 + t2 + ... + tm\n|n - m| <= 1\nThe interleaving is s1 + t1 + s2 + t2 + s3 + t3 + ... or t1 + s1 + t2 + s2 + t3 + s3 + ...",
    inputFormat: "Three lines containing s1, s2, and s3.",
    outputFormat: "Return True or False.",
    constraints: "0 <= s1.length, s2.length <= 100\n0 <= s3.length <= 200\ns1, s2, and s3 consist of lowercase English letters",
    starterCode: `def isInterleave(s1: str, s2: str, s3: str) -> bool:
    # Your code here
    pass

# Read input
s1 = input().strip()
s2 = input().strip()
s3 = input().strip()
print(isInterleave(s1, s2, s3))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "aabcc\ndbbca\naadbbcbcac", expectedOutput: "True" },
      { input: "aabcc\ndbbca\naadbbbaccc", expectedOutput: "False" },
      { input: "\n\n", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "a\nb\nab", expectedOutput: "True" },
      { input: "a\nb\nba", expectedOutput: "True" },
      { input: "abc\ndef\nadbecf", expectedOutput: "True" },
      { input: "abc\ndef\nabcdef", expectedOutput: "True" },
      { input: "a\n\na", expectedOutput: "True" }
    ]
  },
  {
    id: 63,
    title: "Edit Distance",
    description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character\n\nThis is also known as the Levenshtein distance.",
    inputFormat: "Two lines containing word1 and word2.",
    outputFormat: "Return the minimum number of operations.",
    constraints: "0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters",
    starterCode: `def minDistance(word1: str, word2: str) -> int:
    # Your code here
    pass

# Read input
word1 = input().strip()
word2 = input().strip()
print(minDistance(word1, word2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "horse\nros", expectedOutput: "3" },
      { input: "intention\nexecution", expectedOutput: "5" },
      { input: "\n", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "0" },
      { input: "abc\nabc", expectedOutput: "0" },
      { input: "abc\n", expectedOutput: "3" },
      { input: "\nabc", expectedOutput: "3" },
      { input: "kitten\nsitting", expectedOutput: "3" }
    ]
  },
  {
    id: 64,
    title: "Burst Balloons",
    description: "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.\n\nIf you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.\n\nReturn the maximum coins you can collect by bursting the balloons wisely.",
    inputFormat: "Single line of space-separated integers representing nums.",
    outputFormat: "Return the maximum coins.",
    constraints: "n == nums.length\n1 <= n <= 300\n0 <= nums[i] <= 100",
    starterCode: `from typing import List

def maxCoins(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(maxCoins(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 1 5 8", expectedOutput: "167" },
      { input: "1 5", expectedOutput: "10" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "9 76 64 21", expectedOutput: "116718" },
      { input: "7 9 8 0 7 1 3 5 5 2", expectedOutput: "1582" },
      { input: "1 2 3 4 5", expectedOutput: "110" },
      { input: "5", expectedOutput: "5" },
      { input: "1 1 1 1", expectedOutput: "4" }
    ]
  },
  {
    id: 65,
    title: "Regular Expression Matching",
    description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n\n'.' Matches any single character.\n'*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).",
    inputFormat: "Two lines containing s and p.",
    outputFormat: "Return True or False.",
    constraints: "1 <= s.length <= 20\n1 <= p.length <= 20\ns contains only lowercase English letters\np contains only lowercase English letters, '.', and '*'",
    starterCode: `def isMatch(s: str, p: str) -> bool:
    # Your code here
    pass

# Read input
s = input().strip()
p = input().strip()
print(isMatch(s, p))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "aa\na", expectedOutput: "False" },
      { input: "aa\na*", expectedOutput: "True" },
      { input: "ab\n.*", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "aab\nc*a*b", expectedOutput: "True" },
      { input: "mississippi\nmis*is*p*.", expectedOutput: "False" },
      { input: "a\nab*", expectedOutput: "True" },
      { input: "aaa\na*a", expectedOutput: "True" },
      { input: "ab\n.*c", expectedOutput: "False" }
    ]
  },

  // ============ MORE GRAPHS ============
  {
    id: 66,
    title: "Course Schedule",
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\n\nReturn true if you can finish all courses. Otherwise, return false.\n\nThis problem can be solved using topological sort to detect cycles in a directed graph.",
    inputFormat: "First line: numCourses, number of prerequisites\nFollowing lines: ai bi pairs",
    outputFormat: "Return True or False.",
    constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2",
    starterCode: `from typing import List

def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
    # Your code here
    pass

# Read input
numCourses, n = map(int, input().split())
prerequisites = []
for _ in range(n):
    a, b = map(int, input().split())
    prerequisites.append([a, b])
print(canFinish(numCourses, prerequisites))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 1\n1 0", expectedOutput: "True" },
      { input: "2 2\n1 0\n0 1", expectedOutput: "False" },
      { input: "1 0", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "3 2\n1 0\n2 1", expectedOutput: "True" },
      { input: "4 4\n1 0\n2 1\n3 2\n0 3", expectedOutput: "False" },
      { input: "5 4\n1 0\n2 0\n3 1\n4 2", expectedOutput: "True" },
      { input: "3 3\n0 1\n1 2\n2 0", expectedOutput: "False" },
      { input: "2 0", expectedOutput: "True" }
    ]
  },
  {
    id: 67,
    title: "Course Schedule II",
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.",
    inputFormat: "First line: numCourses, number of prerequisites\nFollowing lines: ai bi pairs",
    outputFormat: "Return space-separated course order or empty line if impossible.",
    constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= numCourses * (numCourses - 1)",
    starterCode: `from typing import List

def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    # Your code here
    pass

# Read input
numCourses, n = map(int, input().split())
prerequisites = []
for _ in range(n):
    a, b = map(int, input().split())
    prerequisites.append([a, b])
result = findOrder(numCourses, prerequisites)
print(' '.join(map(str, result)) if result else '')`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 1\n1 0", expectedOutput: "0 1" },
      { input: "4 4\n1 0\n2 0\n3 1\n3 2", expectedOutput: "0 1 2 3" },
      { input: "1 0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "2 2\n1 0\n0 1", expectedOutput: "" },
      { input: "3 2\n1 0\n2 1", expectedOutput: "0 1 2" },
      { input: "3 0", expectedOutput: "0 1 2" },
      { input: "4 3\n1 0\n2 0\n3 0", expectedOutput: "0 1 2 3" },
      { input: "5 4\n1 0\n2 1\n3 2\n4 3", expectedOutput: "0 1 2 3 4" }
    ]
  },
  {
    id: 68,
    title: "Redundant Connection",
    description: "In this problem, a tree is an undirected graph that is connected and has no cycles.\n\nYou are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed.\n\nReturn an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.",
    inputFormat: "First line: number of edges\nFollowing lines: u v pairs",
    outputFormat: "Return the redundant edge as 'u v'.",
    constraints: "n == edges.length\n3 <= n <= 1000\nedges[i].length == 2\n1 <= ai < bi <= n",
    starterCode: `from typing import List

def findRedundantConnection(edges: List[List[int]]) -> List[int]:
    # Your code here
    pass

# Read input
n = int(input())
edges = []
for _ in range(n):
    u, v = map(int, input().split())
    edges.append([u, v])
result = findRedundantConnection(edges)
print(f"{result[0]} {result[1]}")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n1 2\n1 3\n2 3", expectedOutput: "2 3" },
      { input: "5\n1 2\n2 3\n3 4\n1 4\n1 5", expectedOutput: "1 4" },
      { input: "3\n1 2\n2 3\n1 3", expectedOutput: "1 3" }
    ],
    hiddenTestCases: [
      { input: "4\n1 2\n2 3\n3 4\n4 2", expectedOutput: "4 2" },
      { input: "4\n1 2\n1 3\n1 4\n2 3", expectedOutput: "2 3" },
      { input: "5\n1 2\n2 3\n3 4\n4 5\n5 3", expectedOutput: "5 3" },
      { input: "4\n1 2\n3 4\n1 4\n2 3", expectedOutput: "2 3" },
      { input: "6\n1 2\n2 3\n3 4\n4 5\n5 6\n6 3", expectedOutput: "6 3" }
    ]
  },
  {
    id: 69,
    title: "Word Ladder",
    description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n\n- Every adjacent pair of words differs by a single letter.\n- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\n- sk == endWord\n\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    inputFormat: "First line: beginWord\nSecond line: endWord\nThird line: space-separated wordList",
    outputFormat: "Return the length of shortest transformation sequence, or 0 if impossible.",
    constraints: "1 <= beginWord.length <= 10\nendWord.length == beginWord.length\n1 <= wordList.length <= 5000",
    starterCode: `from typing import List
from collections import deque

def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
    # Your code here
    pass

# Read input
beginWord = input().strip()
endWord = input().strip()
wordList = input().strip().split()
print(ladderLength(beginWord, endWord, wordList))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hit\ncog\nhot dot dog lot log cog", expectedOutput: "5" },
      { input: "hit\ncog\nhot dot dog lot log", expectedOutput: "0" },
      { input: "a\nc\na b c", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "hot\ndog\nhot dog", expectedOutput: "0" },
      { input: "hit\nhot\nhot", expectedOutput: "2" },
      { input: "ab\ncd\nab ac ad bd cd", expectedOutput: "4" },
      { input: "cat\ndog\ncat bat bag dag dog", expectedOutput: "5" },
      { input: "a\nb\nb", expectedOutput: "2" }
    ]
  },
  {
    id: 70,
    title: "Accounts Merge",
    description: "Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.\n\nNow, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people.\n\nAfter merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order.",
    inputFormat: "First line: number of accounts\nFollowing lines: name email1 email2 ...",
    outputFormat: "Merged accounts, one per line: name email1 email2 ... (emails sorted)",
    constraints: "1 <= accounts.length <= 1000\n2 <= accounts[i].length <= 10\n1 <= accounts[i][j].length <= 30",
    starterCode: `from typing import List

def accountsMerge(accounts: List[List[str]]) -> List[List[str]]:
    # Your code here
    pass

# Read input
n = int(input())
accounts = []
for _ in range(n):
    parts = input().strip().split()
    accounts.append(parts)
result = accountsMerge(accounts)
for acc in sorted(result):
    print(' '.join(acc))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\nJohn johnsmith@mail.com john_newyork@mail.com\nJohn johnsmith@mail.com john00@mail.com\nMary mary@mail.com\nJohn johnnybravo@mail.com", expectedOutput: "John john00@mail.com john_newyork@mail.com johnsmith@mail.com\nJohn johnnybravo@mail.com\nMary mary@mail.com" },
      { input: "2\nGabe gate@mail.com\nKevin kevin@mail.com", expectedOutput: "Gabe gate@mail.com\nKevin kevin@mail.com" },
      { input: "1\nAlex alex@mail.com", expectedOutput: "Alex alex@mail.com" }
    ],
    hiddenTestCases: [
      { input: "3\nA a@m.com b@m.com\nA b@m.com c@m.com\nA d@m.com", expectedOutput: "A a@m.com b@m.com c@m.com\nA d@m.com" },
      { input: "2\nA a@m.com\nA a@m.com b@m.com", expectedOutput: "A a@m.com b@m.com" },
      { input: "3\nX x@m.com\nY y@m.com\nZ z@m.com", expectedOutput: "X x@m.com\nY y@m.com\nZ z@m.com" },
      { input: "2\nA a@m.com b@m.com\nB b@m.com c@m.com", expectedOutput: "A a@m.com b@m.com c@m.com" },
      { input: "1\nTest t1@m.com t2@m.com t3@m.com", expectedOutput: "Test t1@m.com t2@m.com t3@m.com" }
    ]
  },

  // ============ MORE HEAPS / PRIORITY QUEUE ============
  {
    id: 71,
    title: "Kth Largest Element in an Array",
    description: "Given an integer array nums and an integer k, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.\n\nCan you solve it without sorting?",
    inputFormat: "First line: k\nSecond line: space-separated integers",
    outputFormat: "Return the kth largest element.",
    constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    starterCode: `from typing import List
import heapq

def findKthLargest(nums: List[int], k: int) -> int:
    # Your code here
    pass

# Read input
k = int(input())
nums = list(map(int, input().split()))
print(findKthLargest(nums, k))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\n3 2 1 5 6 4", expectedOutput: "5" },
      { input: "4\n3 2 3 1 2 4 5 5 6", expectedOutput: "4" },
      { input: "1\n1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1\n1 2 3 4 5", expectedOutput: "5" },
      { input: "5\n1 2 3 4 5", expectedOutput: "1" },
      { input: "3\n-1 -2 -3 -4 -5", expectedOutput: "-3" },
      { input: "2\n1 1 1 1 2", expectedOutput: "1" },
      { input: "1\n99 100 101", expectedOutput: "101" }
    ]
  },
  {
    id: 72,
    title: "Task Scheduler",
    description: "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\n\nHowever, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.\n\nReturn the least number of units of times that the CPU will take to finish all the given tasks.",
    inputFormat: "First line: n (cooldown period)\nSecond line: space-separated task characters",
    outputFormat: "Return the minimum time units to complete all tasks.",
    constraints: "1 <= task.length <= 10^4\ntasks[i] is upper-case English letter\n0 <= n <= 100",
    starterCode: `from typing import List
import heapq
from collections import Counter

def leastInterval(tasks: List[str], n: int) -> int:
    # Your code here
    pass

# Read input
n = int(input())
tasks = input().strip().split()
print(leastInterval(tasks, n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\nA A A B B B", expectedOutput: "8" },
      { input: "0\nA A A B B B", expectedOutput: "6" },
      { input: "2\nA A A A A A B C D E F G", expectedOutput: "16" }
    ],
    hiddenTestCases: [
      { input: "1\nA A B B", expectedOutput: "4" },
      { input: "3\nA A A", expectedOutput: "9" },
      { input: "0\nA B C D", expectedOutput: "4" },
      { input: "1\nA B A B A B", expectedOutput: "6" },
      { input: "2\nA B C A B C", expectedOutput: "6" }
    ]
  },
  {
    id: 73,
    title: "Design Twitter",
    description: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.\n\nImplement the Twitter class:\n- Twitter() Initializes your twitter object.\n- postTweet(userId, tweetId) Composes a new tweet with ID tweetId by the user userId.\n- getNewsFeed(userId) Retrieves the 10 most recent tweet IDs in the user's news feed.\n- follow(followerId, followeeId) The user with ID followerId started following the user with ID followeeId.\n- unfollow(followerId, followeeId) The user with ID followerId started unfollowing the user with ID followeeId.",
    inputFormat: "First line: number of operations\nFollowing lines: operation arguments",
    outputFormat: "For getNewsFeed operations, print space-separated tweet IDs or 'empty' if none.",
    constraints: "1 <= userId, followerId, followeeId, tweetId <= 500\nAll the tweets have unique IDs\nAt most 3 * 10^4 calls to postTweet, getNewsFeed, follow, and unfollow",
    starterCode: `from typing import List
import heapq
from collections import defaultdict

class Twitter:
    def __init__(self):
        # Your code here
        pass

    def postTweet(self, userId: int, tweetId: int) -> None:
        # Your code here
        pass

    def getNewsFeed(self, userId: int) -> List[int]:
        # Your code here
        pass

    def follow(self, followerId: int, followeeId: int) -> None:
        # Your code here
        pass

    def unfollow(self, followerId: int, followeeId: int) -> None:
        # Your code here
        pass

# Process operations
twitter = Twitter()
n = int(input())
for _ in range(n):
    parts = input().strip().split()
    op = parts[0]
    if op == 'postTweet':
        twitter.postTweet(int(parts[1]), int(parts[2]))
    elif op == 'getNewsFeed':
        result = twitter.getNewsFeed(int(parts[1]))
        print(' '.join(map(str, result)) if result else 'empty')
    elif op == 'follow':
        twitter.follow(int(parts[1]), int(parts[2]))
    elif op == 'unfollow':
        twitter.unfollow(int(parts[1]), int(parts[2]))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6\npostTweet 1 5\ngetNewsFeed 1\nfollow 1 2\npostTweet 2 6\ngetNewsFeed 1\nunfollow 1 2", expectedOutput: "5\n6 5" },
      { input: "3\npostTweet 1 1\npostTweet 1 2\ngetNewsFeed 1", expectedOutput: "2 1" },
      { input: "2\ngetNewsFeed 1\npostTweet 1 1", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "4\nfollow 1 2\npostTweet 2 1\ngetNewsFeed 1\nunfollow 1 2", expectedOutput: "1" },
      { input: "5\npostTweet 1 1\npostTweet 1 2\npostTweet 1 3\npostTweet 1 4\ngetNewsFeed 1", expectedOutput: "4 3 2 1" },
      { input: "3\nfollow 1 1\npostTweet 1 1\ngetNewsFeed 1", expectedOutput: "1" },
      { input: "4\npostTweet 2 1\nfollow 1 2\nfollow 1 2\ngetNewsFeed 1", expectedOutput: "1" },
      { input: "3\npostTweet 1 1\nunfollow 1 2\ngetNewsFeed 1", expectedOutput: "1" }
    ]
  },
  {
    id: 74,
    title: "Find Median from Data Stream",
    description: "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the MedianFinder class:\n- MedianFinder() initializes the MedianFinder object.\n- addNum(int num) adds the integer num from the data stream to the data structure.\n- findMedian() returns the median of all elements so far.",
    inputFormat: "First line: number of operations\nFollowing lines: 'add num' or 'median'",
    outputFormat: "For median operations, print the median (as float with 1 decimal place).",
    constraints: "-10^5 <= num <= 10^5\nThere will be at least one element before calling findMedian\nAt most 5 * 10^4 calls to addNum and findMedian",
    starterCode: `import heapq

class MedianFinder:
    def __init__(self):
        # Your code here
        pass

    def addNum(self, num: int) -> None:
        # Your code here
        pass

    def findMedian(self) -> float:
        # Your code here
        pass

# Process operations
mf = MedianFinder()
n = int(input())
for _ in range(n):
    parts = input().strip().split()
    if parts[0] == 'add':
        mf.addNum(int(parts[1]))
    elif parts[0] == 'median':
        print(f"{mf.findMedian():.1f}")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\nadd 1\nadd 2\nmedian\nadd 3\nmedian", expectedOutput: "1.5\n2.0" },
      { input: "3\nadd 1\nadd 1\nmedian", expectedOutput: "1.0" },
      { input: "2\nadd 5\nmedian", expectedOutput: "5.0" }
    ],
    hiddenTestCases: [
      { input: "4\nadd 1\nadd 2\nadd 3\nmedian", expectedOutput: "2.0" },
      { input: "6\nadd 6\nadd 10\nadd 2\nadd 6\nadd 5\nmedian", expectedOutput: "6.0" },
      { input: "4\nadd -1\nadd -2\nadd -3\nmedian", expectedOutput: "-2.0" },
      { input: "3\nadd 0\nadd 0\nmedian", expectedOutput: "0.0" },
      { input: "5\nadd 1\nadd 3\nadd 5\nadd 7\nmedian", expectedOutput: "4.0" }
    ]
  },

  // ============ MORE INTERVALS ============
  {
    id: 75,
    title: "Insert Interval",
    description: "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti.\n\nYou are also given an interval newInterval = [start, end] that represents the start and end of another interval.\n\nInsert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).\n\nReturn intervals after the insertion.",
    inputFormat: "First line: newInterval start end\nSecond line: number of intervals\nFollowing lines: start end pairs",
    outputFormat: "Merged intervals, one per line.",
    constraints: "0 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^5",
    starterCode: `from typing import List

def insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
start, end = map(int, input().split())
newInterval = [start, end]
n = int(input())
intervals = []
for _ in range(n):
    s, e = map(int, input().split())
    intervals.append([s, e])
result = insert(intervals, newInterval)
for interval in result:
    print(f"{interval[0]} {interval[1]}")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 5\n3\n1 3\n6 9\n10 12", expectedOutput: "1 5\n6 9\n10 12" },
      { input: "4 8\n5\n1 2\n3 5\n6 7\n8 10\n12 16", expectedOutput: "1 2\n3 10\n12 16" },
      { input: "5 7\n0", expectedOutput: "5 7" }
    ],
    hiddenTestCases: [
      { input: "1 5\n1\n6 8", expectedOutput: "1 5\n6 8" },
      { input: "0 0\n1\n1 5", expectedOutput: "0 0\n1 5" },
      { input: "0 10\n3\n1 2\n3 4\n5 6", expectedOutput: "0 10" },
      { input: "3 4\n2\n1 2\n5 6", expectedOutput: "1 2\n3 4\n5 6" },
      { input: "1 1\n2\n0 0\n2 2", expectedOutput: "0 0\n1 1\n2 2" }
    ]
  },
  {
    id: 76,
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    inputFormat: "First line: number of intervals\nFollowing lines: start end pairs",
    outputFormat: "Merged intervals, one per line.",
    constraints: "1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^4",
    starterCode: `from typing import List

def merge(intervals: List[List[int]]) -> List[List[int]]:
    # Your code here
    pass

# Read input
n = int(input())
intervals = []
for _ in range(n):
    s, e = map(int, input().split())
    intervals.append([s, e])
result = merge(intervals)
for interval in result:
    print(f"{interval[0]} {interval[1]}")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", expectedOutput: "1 6\n8 10\n15 18" },
      { input: "2\n1 4\n4 5", expectedOutput: "1 5" },
      { input: "1\n1 1", expectedOutput: "1 1" }
    ],
    hiddenTestCases: [
      { input: "3\n1 4\n2 3\n3 4", expectedOutput: "1 4" },
      { input: "2\n1 4\n5 6", expectedOutput: "1 4\n5 6" },
      { input: "4\n1 4\n0 4\n3 5\n6 7", expectedOutput: "0 5\n6 7" },
      { input: "3\n1 10\n2 3\n4 5", expectedOutput: "1 10" },
      { input: "2\n1 4\n0 0", expectedOutput: "0 0\n1 4" }
    ]
  },
  {
    id: 77,
    title: "Non-overlapping Intervals",
    description: "Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
    inputFormat: "First line: number of intervals\nFollowing lines: start end pairs",
    outputFormat: "Return the minimum number of intervals to remove.",
    constraints: "1 <= intervals.length <= 10^5\nintervals[i].length == 2\n-5 * 10^4 <= starti < endi <= 5 * 10^4",
    starterCode: `from typing import List

def eraseOverlapIntervals(intervals: List[List[int]]) -> int:
    # Your code here
    pass

# Read input
n = int(input())
intervals = []
for _ in range(n):
    s, e = map(int, input().split())
    intervals.append([s, e])
print(eraseOverlapIntervals(intervals))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n1 2\n2 3\n3 4\n1 3", expectedOutput: "1" },
      { input: "3\n1 2\n1 2\n1 2", expectedOutput: "2" },
      { input: "2\n1 2\n2 3", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1\n1 2", expectedOutput: "0" },
      { input: "3\n0 2\n1 3\n2 4", expectedOutput: "1" },
      { input: "4\n1 100\n11 22\n1 11\n2 12", expectedOutput: "2" },
      { input: "3\n-52 31\n-73 -26\n82 97", expectedOutput: "1" },
      { input: "4\n1 2\n2 3\n3 4\n4 5", expectedOutput: "0" }
    ]
  },
  {
    id: 78,
    title: "Meeting Rooms II",
    description: "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
    inputFormat: "First line: number of intervals\nFollowing lines: start end pairs",
    outputFormat: "Return the minimum number of conference rooms required.",
    constraints: "1 <= intervals.length <= 10^4\n0 <= starti < endi <= 10^6",
    starterCode: `from typing import List
import heapq

def minMeetingRooms(intervals: List[List[int]]) -> int:
    # Your code here
    pass

# Read input
n = int(input())
intervals = []
for _ in range(n):
    s, e = map(int, input().split())
    intervals.append([s, e])
print(minMeetingRooms(intervals))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n0 30\n5 10\n15 20\n25 35", expectedOutput: "2" },
      { input: "2\n7 10\n2 4", expectedOutput: "1" },
      { input: "3\n0 10\n0 10\n0 10", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1\n1 5", expectedOutput: "1" },
      { input: "3\n1 5\n5 10\n10 15", expectedOutput: "1" },
      { input: "4\n1 10\n2 7\n3 19\n8 12", expectedOutput: "3" },
      { input: "5\n0 5\n1 6\n2 7\n3 8\n4 9", expectedOutput: "5" },
      { input: "2\n1 2\n2 3", expectedOutput: "1" }
    ]
  },

  // ============ MORE BIT MANIPULATION ============
  {
    id: 79,
    title: "Counting Bits",
    description: "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    inputFormat: "Single integer n.",
    outputFormat: "Space-separated integers representing the count of 1 bits for 0 to n.",
    constraints: "0 <= n <= 10^5",
    starterCode: `from typing import List

def countBits(n: int) -> List[int]:
    # Your code here
    pass

# Read input
n = int(input())
result = countBits(n)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2", expectedOutput: "0 1 1" },
      { input: "5", expectedOutput: "0 1 1 2 1 2" },
      { input: "0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "0 1" },
      { input: "7", expectedOutput: "0 1 1 2 1 2 2 3" },
      { input: "10", expectedOutput: "0 1 1 2 1 2 2 3 1 2 2" },
      { input: "15", expectedOutput: "0 1 1 2 1 2 2 3 1 2 2 3 2 3 3 4" },
      { input: "3", expectedOutput: "0 1 1 2" }
    ]
  },
  {
    id: 80,
    title: "Missing Number",
    description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    inputFormat: "Single line of space-separated integers.",
    outputFormat: "Return the missing number.",
    constraints: "n == nums.length\n1 <= n <= 10^4\n0 <= nums[i] <= n\nAll the numbers of nums are unique",
    starterCode: `from typing import List

def missingNumber(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(missingNumber(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 0 1", expectedOutput: "2" },
      { input: "0 1", expectedOutput: "2" },
      { input: "9 6 4 2 3 5 7 0 1", expectedOutput: "8" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "1" },
      { input: "1", expectedOutput: "0" },
      { input: "1 0 3", expectedOutput: "2" },
      { input: "0 1 2 3 4 5 6 7 9", expectedOutput: "8" },
      { input: "2 0 1 4", expectedOutput: "3" }
    ]
  },
  {
    id: 81,
    title: "Sum of Two Integers",
    description: "Given two integers a and b, return the sum of the two integers without using the operators + and -.\n\nHint: Use bit manipulation with XOR for sum without carry and AND with left shift for the carry.",
    inputFormat: "Two integers a and b separated by space.",
    outputFormat: "Return the sum of a and b.",
    constraints: "-1000 <= a, b <= 1000",
    starterCode: `def getSum(a: int, b: int) -> int:
    # Your code here
    pass

# Read input
a, b = map(int, input().split())
print(getSum(a, b))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2", expectedOutput: "3" },
      { input: "2 3", expectedOutput: "5" },
      { input: "-1 1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "0 0", expectedOutput: "0" },
      { input: "-1 -1", expectedOutput: "-2" },
      { input: "100 200", expectedOutput: "300" },
      { input: "-5 3", expectedOutput: "-2" },
      { input: "7 -10", expectedOutput: "-3" }
    ]
  },
  {
    id: 82,
    title: "Reverse Bits",
    description: "Reverse bits of a given 32 bits unsigned integer.\n\nNote that in some languages, such as Java, there is no unsigned integer type. The input will be given as a signed integer type. It should not affect your implementation.",
    inputFormat: "Single line containing a 32-bit unsigned integer.",
    outputFormat: "Return the reversed bits as an unsigned integer.",
    constraints: "The input must be a binary string of length 32",
    starterCode: `def reverseBits(n: int) -> int:
    # Your code here
    pass

# Read input
n = int(input())
print(reverseBits(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "43261596", expectedOutput: "964176192" },
      { input: "4294967293", expectedOutput: "3221225471" },
      { input: "1", expectedOutput: "2147483648" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "2147483648", expectedOutput: "1" },
      { input: "4294967295", expectedOutput: "4294967295" },
      { input: "2", expectedOutput: "1073741824" },
      { input: "256", expectedOutput: "8388608" }
    ]
  },

  // ============ MORE 1D DP ============
  {
    id: 83,
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    inputFormat: "Single integer n.",
    outputFormat: "Return the number of distinct ways to climb to the top.",
    constraints: "1 <= n <= 45",
    starterCode: `def climbStairs(n: int) -> int:
    # Your code here
    pass

# Read input
n = int(input())
print(climbStairs(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "4", expectedOutput: "5" },
      { input: "5", expectedOutput: "8" },
      { input: "10", expectedOutput: "89" },
      { input: "20", expectedOutput: "10946" },
      { input: "45", expectedOutput: "1836311903" }
    ]
  },
  {
    id: 84,
    title: "Min Cost Climbing Stairs",
    description: "You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.\n\nYou can either start from the step with index 0, or the step with index 1.\n\nReturn the minimum cost to reach the top of the floor.",
    inputFormat: "Single line of space-separated integers representing costs.",
    outputFormat: "Return the minimum cost to reach the top.",
    constraints: "2 <= cost.length <= 1000\n0 <= cost[i] <= 999",
    starterCode: `from typing import List

def minCostClimbingStairs(cost: List[int]) -> int:
    # Your code here
    pass

# Read input
cost = list(map(int, input().split()))
print(minCostClimbingStairs(cost))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "10 15 20", expectedOutput: "15" },
      { input: "1 100 1 1 1 100 1 1 100 1", expectedOutput: "6" },
      { input: "0 0 0 0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2", expectedOutput: "1" },
      { input: "10 10", expectedOutput: "10" },
      { input: "0 1 2 3", expectedOutput: "2" },
      { input: "1 2 3", expectedOutput: "2" },
      { input: "5 5 5 5 5", expectedOutput: "10" }
    ]
  },
  {
    id: 85,
    title: "House Robber",
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    inputFormat: "Single line of space-separated integers representing money in each house.",
    outputFormat: "Return the maximum amount you can rob.",
    constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
    starterCode: `from typing import List

def rob(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(rob(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 1", expectedOutput: "4" },
      { input: "2 7 9 3 1", expectedOutput: "12" },
      { input: "2 1 1 2", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2", expectedOutput: "2" },
      { input: "2 1", expectedOutput: "2" },
      { input: "1 3 1 3 100", expectedOutput: "103" },
      { input: "0 0 0 0 0", expectedOutput: "0" }
    ]
  },
  {
    id: 86,
    title: "House Robber II",
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.\n\nNote: Since houses are arranged in a circle, the first and last houses are adjacent.",
    inputFormat: "Single line of space-separated integers representing money in each house.",
    outputFormat: "Return the maximum amount you can rob.",
    constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 1000",
    starterCode: `from typing import List

def rob(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(rob(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 3 2", expectedOutput: "3" },
      { input: "1 2 3 1", expectedOutput: "4" },
      { input: "1 2 3", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2", expectedOutput: "2" },
      { input: "0", expectedOutput: "0" },
      { input: "1 3 1 3 100", expectedOutput: "103" },
      { input: "200 3 140 20 10", expectedOutput: "340" }
    ]
  },
  {
    id: 87,
    title: "Longest Palindromic Substring",
    description: "Given a string s, return the longest palindromic substring in s.\n\nA palindrome is a string that reads the same forward and backward.",
    inputFormat: "Single line containing the string s.",
    outputFormat: "Return the longest palindromic substring.",
    constraints: "1 <= s.length <= 1000\ns consist of only digits and English letters",
    starterCode: `def longestPalindrome(s: str) -> str:
    # Your code here
    pass

# Read input
s = input().strip()
print(longestPalindrome(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "babad", expectedOutput: "bab" },
      { input: "cbbd", expectedOutput: "bb" },
      { input: "a", expectedOutput: "a" }
    ],
    hiddenTestCases: [
      { input: "ac", expectedOutput: "a" },
      { input: "aaaa", expectedOutput: "aaaa" },
      { input: "abcba", expectedOutput: "abcba" },
      { input: "aacabdkacaa", expectedOutput: "aca" },
      { input: "bb", expectedOutput: "bb" }
    ]
  },
  {
    id: 88,
    title: "Palindromic Substrings",
    description: "Given a string s, return the number of palindromic substrings in it.\n\nA string is a palindrome when it reads the same backward as forward.\n\nA substring is a contiguous sequence of characters within the string.",
    inputFormat: "Single line containing the string s.",
    outputFormat: "Return the number of palindromic substrings.",
    constraints: "1 <= s.length <= 1000\ns consists of lowercase English letters",
    starterCode: `def countSubstrings(s: str) -> int:
    # Your code here
    pass

# Read input
s = input().strip()
print(countSubstrings(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "abc", expectedOutput: "3" },
      { input: "aaa", expectedOutput: "6" },
      { input: "a", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "aba", expectedOutput: "4" },
      { input: "abba", expectedOutput: "6" },
      { input: "abcba", expectedOutput: "7" },
      { input: "aaaa", expectedOutput: "10" },
      { input: "abcd", expectedOutput: "4" }
    ]
  },
  {
    id: 89,
    title: "Decode Ways",
    description: "A message containing letters from A-Z can be encoded into numbers using the following mapping:\n\n'A' -> '1'\n'B' -> '2'\n...\n'Z' -> '26'\n\nGiven a string s containing only digits, return the number of ways to decode it.\n\nThe answer is guaranteed to fit in a 32-bit integer.",
    inputFormat: "Single line containing the encoded string.",
    outputFormat: "Return the number of ways to decode the message.",
    constraints: "1 <= s.length <= 100\ns contains only digits and may contain leading zero(s)",
    starterCode: `def numDecodings(s: str) -> int:
    # Your code here
    pass

# Read input
s = input().strip()
print(numDecodings(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "12", expectedOutput: "2" },
      { input: "226", expectedOutput: "3" },
      { input: "06", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "10", expectedOutput: "1" },
      { input: "27", expectedOutput: "1" },
      { input: "11106", expectedOutput: "2" },
      { input: "111111", expectedOutput: "13" }
    ]
  },
  {
    id: 90,
    title: "Coin Change",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.",
    inputFormat: "First line: amount\nSecond line: space-separated coin denominations",
    outputFormat: "Return the minimum number of coins, or -1 if impossible.",
    constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
    starterCode: `from typing import List

def coinChange(coins: List[int], amount: int) -> int:
    # Your code here
    pass

# Read input
amount = int(input())
coins = list(map(int, input().split()))
print(coinChange(coins, amount))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "11\n1 2 5", expectedOutput: "3" },
      { input: "3\n2", expectedOutput: "-1" },
      { input: "0\n1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "100\n1 5 10 25", expectedOutput: "4" },
      { input: "6249\n186 419 83 408", expectedOutput: "20" },
      { input: "27\n2 5 10 1", expectedOutput: "4" },
      { input: "10\n3 5", expectedOutput: "2" }
    ]
  },

  // ============ MORE BACKTRACKING ============
  {
    id: 91,
    title: "Subsets",
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
    inputFormat: "Single line of space-separated integers.",
    outputFormat: "Each subset on a new line, space-separated. Empty subset as 'empty'.",
    constraints: "1 <= nums.length <= 10\n-10 <= nums[i] <= 10\nAll the numbers of nums are unique",
    starterCode: `from typing import List

def subsets(nums: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = subsets(nums)
for subset in sorted(result, key=lambda x: (len(x), x)):
    if subset:
        print(' '.join(map(str, subset)))
    else:
        print('empty')`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3", expectedOutput: "empty\n1\n2\n3\n1 2\n1 3\n2 3\n1 2 3" },
      { input: "0", expectedOutput: "empty\n0" },
      { input: "1 2", expectedOutput: "empty\n1\n2\n1 2" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "empty\n1" },
      { input: "1 2 3 4", expectedOutput: "empty\n1\n2\n3\n4\n1 2\n1 3\n1 4\n2 3\n2 4\n3 4\n1 2 3\n1 2 4\n1 3 4\n2 3 4\n1 2 3 4" },
      { input: "-1 0 1", expectedOutput: "empty\n-1\n0\n1\n-1 0\n-1 1\n0 1\n-1 0 1" },
      { input: "5 6", expectedOutput: "empty\n5\n6\n5 6" },
      { input: "2 3 4", expectedOutput: "empty\n2\n3\n4\n2 3\n2 4\n3 4\n2 3 4" }
    ]
  },
  {
    id: 92,
    title: "Combination Sum",
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.\n\nThe same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
    inputFormat: "First line: target\nSecond line: space-separated candidates",
    outputFormat: "Each combination on a new line, space-separated and sorted.",
    constraints: "1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\nAll elements of candidates are distinct\n1 <= target <= 40",
    starterCode: `from typing import List

def combinationSum(candidates: List[int], target: int) -> List[List[int]]:
    # Your code here
    pass

# Read input
target = int(input())
candidates = list(map(int, input().split()))
result = combinationSum(candidates, target)
for combo in sorted(result):
    print(' '.join(map(str, combo)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "7\n2 3 6 7", expectedOutput: "2 2 3\n7" },
      { input: "8\n2 3 5", expectedOutput: "2 2 2 2\n2 3 3\n3 5" },
      { input: "1\n2", expectedOutput: "" }
    ],
    hiddenTestCases: [
      { input: "4\n2", expectedOutput: "2 2" },
      { input: "3\n2 3", expectedOutput: "3" },
      { input: "5\n1 2", expectedOutput: "1 1 1 1 1\n1 1 1 2\n1 2 2" },
      { input: "10\n2 5 10", expectedOutput: "2 2 2 2 2\n5 5\n10" },
      { input: "6\n2 3", expectedOutput: "2 2 2\n3 3" }
    ]
  },
  {
    id: 93,
    title: "Permutations",
    description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    inputFormat: "Single line of space-separated integers.",
    outputFormat: "Each permutation on a new line, space-separated.",
    constraints: "1 <= nums.length <= 6\n-10 <= nums[i] <= 10\nAll the integers of nums are unique",
    starterCode: `from typing import List

def permute(nums: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = permute(nums)
for perm in sorted(result):
    print(' '.join(map(str, perm)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3", expectedOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1" },
      { input: "0 1", expectedOutput: "0 1\n1 0" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2", expectedOutput: "1 2\n2 1" },
      { input: "-1 0 1", expectedOutput: "-1 0 1\n-1 1 0\n0 -1 1\n0 1 -1\n1 -1 0\n1 0 -1" },
      { input: "5", expectedOutput: "5" },
      { input: "2 3", expectedOutput: "2 3\n3 2" },
      { input: "1 2 3 4", expectedOutput: "1 2 3 4\n1 2 4 3\n1 3 2 4\n1 3 4 2\n1 4 2 3\n1 4 3 2\n2 1 3 4\n2 1 4 3\n2 3 1 4\n2 3 4 1\n2 4 1 3\n2 4 3 1\n3 1 2 4\n3 1 4 2\n3 2 1 4\n3 2 4 1\n3 4 1 2\n3 4 2 1\n4 1 2 3\n4 1 3 2\n4 2 1 3\n4 2 3 1\n4 3 1 2\n4 3 2 1" }
    ]
  },
  {
    id: 94,
    title: "Subsets II",
    description: "Given an integer array nums that may contain duplicates, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
    inputFormat: "Single line of space-separated integers.",
    outputFormat: "Each subset on a new line, space-separated. Empty subset as 'empty'.",
    constraints: "1 <= nums.length <= 10\n-10 <= nums[i] <= 10",
    starterCode: `from typing import List

def subsetsWithDup(nums: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = subsetsWithDup(nums)
seen = set()
unique_result = []
for subset in result:
    key = tuple(sorted(subset))
    if key not in seen:
        seen.add(key)
        unique_result.append(subset)
for subset in sorted(unique_result, key=lambda x: (len(x), x)):
    if subset:
        print(' '.join(map(str, sorted(subset))))
    else:
        print('empty')`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 2", expectedOutput: "empty\n1\n2\n1 2\n2 2\n1 2 2" },
      { input: "0", expectedOutput: "empty\n0" },
      { input: "1 1", expectedOutput: "empty\n1\n1 1" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "empty\n1" },
      { input: "1 1 1", expectedOutput: "empty\n1\n1 1\n1 1 1" },
      { input: "1 2 1", expectedOutput: "empty\n1\n2\n1 1\n1 2\n1 1 2" },
      { input: "4 4 4 1 4", expectedOutput: "empty\n1\n4\n1 4\n4 4\n1 4 4\n4 4 4\n1 4 4 4\n4 4 4 4\n1 4 4 4 4" },
      { input: "2 2", expectedOutput: "empty\n2\n2 2" }
    ]
  },
  {
    id: 95,
    title: "Combination Sum II",
    description: "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.\n\nEach number in candidates may only be used once in the combination.\n\nNote: The solution set must not contain duplicate combinations.",
    inputFormat: "First line: target\nSecond line: space-separated candidates",
    outputFormat: "Each combination on a new line, space-separated and sorted.",
    constraints: "1 <= candidates.length <= 100\n1 <= candidates[i] <= 50\n1 <= target <= 30",
    starterCode: `from typing import List

def combinationSum2(candidates: List[int], target: int) -> List[List[int]]:
    # Your code here
    pass

# Read input
target = int(input())
candidates = list(map(int, input().split()))
result = combinationSum2(candidates, target)
for combo in sorted(result):
    print(' '.join(map(str, combo)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "8\n10 1 2 7 6 1 5", expectedOutput: "1 1 6\n1 2 5\n1 7\n2 6" },
      { input: "5\n2 5 2 1 2", expectedOutput: "1 2 2\n5" },
      { input: "1\n1 1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "3\n1 1 1 1 1", expectedOutput: "1 1 1" },
      { input: "4\n2 2", expectedOutput: "2 2" },
      { input: "10\n1 2 3 4 5", expectedOutput: "1 2 3 4\n1 4 5\n2 3 5" },
      { input: "6\n1 2 3", expectedOutput: "1 2 3" },
      { input: "7\n3 4", expectedOutput: "3 4" }
    ]
  },
  {
    id: 96,
    title: "Word Search",
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.\n\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.",
    inputFormat: "First line: word\nSecond line: m n\nFollowing m lines: n characters space-separated",
    outputFormat: "Return True or False.",
    constraints: "m == board.length\nn = board[i].length\n1 <= m, n <= 6\n1 <= word.length <= 15",
    starterCode: `from typing import List

def exist(board: List[List[str]], word: str) -> bool:
    # Your code here
    pass

# Read input
word = input().strip()
m, n = map(int, input().split())
board = []
for _ in range(m):
    row = input().strip().split()
    board.append(row)
print(exist(board, word))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ABCCED\n3 4\nA B C E\nS F C S\nA D E E", expectedOutput: "True" },
      { input: "SEE\n3 4\nA B C E\nS F C S\nA D E E", expectedOutput: "True" },
      { input: "ABCB\n3 4\nA B C E\nS F C S\nA D E E", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "A\n1 1\nA", expectedOutput: "True" },
      { input: "AB\n1 2\nA B", expectedOutput: "True" },
      { input: "AAA\n2 2\nA A\nA A", expectedOutput: "True" },
      { input: "ABCD\n2 2\nA B\nC D", expectedOutput: "False" },
      { input: "B\n1 1\nA", expectedOutput: "False" }
    ]
  },
  {
    id: 97,
    title: "Palindrome Partitioning",
    description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.\n\nA palindrome string is a string that reads the same backward as forward.",
    inputFormat: "Single line containing the string s.",
    outputFormat: "Each partition on a new line, substrings space-separated.",
    constraints: "1 <= s.length <= 16\ns contains only lowercase English letters",
    starterCode: `from typing import List

def partition(s: str) -> List[List[str]]:
    # Your code here
    pass

# Read input
s = input().strip()
result = partition(s)
for part in sorted(result):
    print(' '.join(part))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "aab", expectedOutput: "a a b\naa b" },
      { input: "a", expectedOutput: "a" },
      { input: "ab", expectedOutput: "a b" }
    ],
    hiddenTestCases: [
      { input: "aa", expectedOutput: "a a\naa" },
      { input: "aaa", expectedOutput: "a a a\na aa\naa a\naaa" },
      { input: "aba", expectedOutput: "a b a\naba" },
      { input: "abc", expectedOutput: "a b c" },
      { input: "abba", expectedOutput: "a b b a\na bb a\nabba" }
    ]
  },
  {
    id: 98,
    title: "Letter Combinations of a Phone Number",
    description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nMapping (like on telephone buttons):\n2 -> abc, 3 -> def, 4 -> ghi, 5 -> jkl, 6 -> mno, 7 -> pqrs, 8 -> tuv, 9 -> wxyz",
    inputFormat: "Single line containing the digits string.",
    outputFormat: "Each combination on a new line, sorted.",
    constraints: "0 <= digits.length <= 4\ndigits[i] is a digit in the range ['2', '9']",
    starterCode: `from typing import List

def letterCombinations(digits: str) -> List[str]:
    # Your code here
    pass

# Read input
digits = input().strip()
result = letterCombinations(digits)
if result:
    for combo in sorted(result):
        print(combo)
else:
    print('empty')`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "23", expectedOutput: "ad\nae\naf\nbd\nbe\nbf\ncd\nce\ncf" },
      { input: "", expectedOutput: "empty" },
      { input: "2", expectedOutput: "a\nb\nc" }
    ],
    hiddenTestCases: [
      { input: "9", expectedOutput: "w\nx\ny\nz" },
      { input: "7", expectedOutput: "p\nq\nr\ns" },
      { input: "22", expectedOutput: "aa\nab\nac\nba\nbb\nbc\nca\ncb\ncc" },
      { input: "234", expectedOutput: "adg\nadh\nadi\naeg\naeh\naei\nafg\nafh\nafi\nbdg\nbdh\nbdi\nbeg\nbeh\nbei\nbfg\nbfh\nbfi\ncdg\ncdh\ncdi\nceg\nceh\ncei\ncfg\ncfh\ncfi" },
      { input: "5", expectedOutput: "j\nk\nl" }
    ]
  },
  {
    id: 99,
    title: "N-Queens",
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.",
    inputFormat: "Single integer n.",
    outputFormat: "Number of solutions on first line, then each solution as n lines of the board.",
    constraints: "1 <= n <= 9",
    starterCode: `from typing import List

def solveNQueens(n: int) -> List[List[str]]:
    # Your code here
    pass

# Read input
n = int(input())
result = solveNQueens(n)
print(len(result))
for solution in result:
    for row in solution:
        print(row)
    print()`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4", expectedOutput: "2\n.Q..\n...Q\nQ...\n..Q.\n\n..Q.\nQ...\n...Q\n.Q..\n" },
      { input: "1", expectedOutput: "1\nQ\n" },
      { input: "2", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "3", expectedOutput: "0" },
      { input: "5", expectedOutput: "10\nQ....\n..Q..\n....Q\n.Q...\n...Q.\n\nQ....\n...Q.\n.Q...\n....Q\n..Q..\n\n.Q...\n...Q.\nQ....\n..Q..\n....Q\n\n.Q...\n....Q\n..Q..\nQ....\n...Q.\n\n..Q..\nQ....\n...Q.\n.Q...\n....Q\n\n..Q..\n....Q\n.Q...\n...Q.\nQ....\n\n...Q.\nQ....\n..Q..\n....Q\n.Q...\n\n...Q.\n.Q...\n....Q\n..Q..\nQ....\n\n....Q\n.Q...\n...Q.\nQ....\n..Q..\n\n....Q\n..Q..\nQ....\n...Q.\n.Q...\n" },
      { input: "6", expectedOutput: "4\n.Q....\n...Q..\n.....Q\nQ.....\n..Q...\n....Q.\n\n..Q...\n.....Q\n.Q....\n....Q.\nQ.....\n...Q..\n\n...Q..\nQ.....\n....Q.\n.Q....\n.....Q\n..Q...\n\n....Q.\n..Q...\nQ.....\n.....Q\n...Q..\n.Q....\n" },
      { input: "7", expectedOutput: "40" },
      { input: "8", expectedOutput: "92" }
    ]
  },
  {
    id: 100,
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.\n\nThis is a classic problem that can be solved using Kadane's algorithm.",
    inputFormat: "Single line of space-separated integers.",
    outputFormat: "Return the largest sum.",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    starterCode: `from typing import List

def maxSubArray(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(maxSubArray(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6" },
      { input: "1", expectedOutput: "1" },
      { input: "5 4 -1 7 8", expectedOutput: "23" }
    ],
    hiddenTestCases: [
      { input: "-1", expectedOutput: "-1" },
      { input: "-2 -1", expectedOutput: "-1" },
      { input: "1 2 3 4 5", expectedOutput: "15" },
      { input: "-1 -2 -3 -4", expectedOutput: "-1" },
      { input: "1 -1 1 -1 1", expectedOutput: "1" }
    ]
  }
];

// Topic mapping for database seeding
export const topicsData = [
  { name: "Arrays and Hashing", slug: "arrays-hashing", icon: "Hash", displayOrder: 1 },
  { name: "Two Pointers", slug: "two-pointers", icon: "ArrowLeftRight", displayOrder: 2 },
  { name: "Sliding Window", slug: "sliding-window", icon: "PanelLeft", displayOrder: 3 },
  { name: "Stacks", slug: "stacks", icon: "Layers", displayOrder: 4 },
  { name: "Binary Search", slug: "binary-search", icon: "Search", displayOrder: 5 },
  { name: "Linked List", slug: "linked-list", icon: "Link", displayOrder: 6 },
  { name: "Trees", slug: "trees", icon: "GitBranch", displayOrder: 7 },
  { name: "Maths and Geometry", slug: "maths-geometry", icon: "Calculator", displayOrder: 8 },
  { name: "Backtracking", slug: "backtracking", icon: "RotateCcw", displayOrder: 9 },
  { name: "Graphs", slug: "graphs", icon: "Network", displayOrder: 10 },
  { name: "Priority Queues & Heaps", slug: "heaps", icon: "BarChart3", displayOrder: 11 },
  { name: "Tries", slug: "tries", icon: "TreeDeciduous", displayOrder: 12 },
  { name: "Advanced Graph", slug: "advanced-graph", icon: "Workflow", displayOrder: 13 },
  { name: "1D Dynamic Programming", slug: "dp-1d", icon: "TrendingUp", displayOrder: 14 },
  { name: "2D Dynamic Programming", slug: "dp-2d", icon: "Grid3X3", displayOrder: 15 },
  { name: "Greedy", slug: "greedy", icon: "Zap", displayOrder: 16 },
  { name: "Intervals", slug: "intervals", icon: "Calendar", displayOrder: 17 },
  { name: "Bit Manipulation", slug: "bit-manipulation", icon: "Binary", displayOrder: 18 }
];

// Admin emails that should be redirected to admin portal
export const ADMIN_EMAILS = [
  "vijay.siruvuru@gmail.com",
  "madhuatomix@gmail.com"
];
