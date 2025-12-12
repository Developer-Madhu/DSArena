// Complete problems dataset with descriptions, test cases, and metadata
import { pythonProblemsData } from './pythonProblemsData';
import { javascriptProblemsData } from './javascriptProblemsData';
import { javaProblemsData } from './javaProblemsData';
import { cppProblemsData } from './cppProblemsData';

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
  language?: 'python' | 'javascript' | 'java' | 'cpp' | 'go' | 'rust' | 'csharp' | 'ruby' | 'swift' | 'kotlin';
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
  { name: "Bit Manipulation", slug: "bit-manipulation", icon: "Binary", displayOrder: 18 },
  { name: "Python Track", slug: "python-track", icon: "Code", displayOrder: 19 }
];

// Combined problems data including all language tracks with explicit language fields
export const allProblemsData: ProblemData[] = [
  ...problemsData.map(p => ({ ...p, language: 'python' as const })), // DSA uses Python
  ...pythonProblemsData.map(p => ({ ...p, language: 'python' as const })),
  ...javascriptProblemsData.map(p => ({ ...p, language: 'javascript' as const })),
  ...javaProblemsData.map(p => ({ ...p, language: 'java' as const })),
  ...cppProblemsData.map(p => ({ ...p, language: 'cpp' as const }))
];
