// Complete NeetCode 150 style DSA Problems Dataset
import { ProblemData } from './problemsData';

export const dsaProblemsData: ProblemData[] = [
  // ==================== ARRAYS AND HASHING ====================
  {
    id: "arrays-encode-decode-strings",
    slug: "encode-decode-strings",
    title: "Encode and Decode Strings",
    category: "Arrays and Hashing",
    difficulty: "medium",
    description: `Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

**Example:** encode(["neet","code","love","you"]) could return "4#neet4#code4#love3#you", and decode would reverse it.

Use length prefixing: for each string, store its length followed by a delimiter and the string itself.`,
    inputFormat: "Implement encode(strs: List[str]) -> str and decode(s: str) -> List[str]",
    outputFormat: "encode returns a single string, decode returns the original list.",
    constraints: "0 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] contains any possible characters",
    starterCode: `from typing import List

def encode(strs: List[str]) -> str:
    # Your code here
    pass

def decode(s: str) -> List[str]:
    # Your code here
    pass

# Read input
strs = input().split(',') if input().strip() else []
encoded = encode(strs)
decoded = decode(encoded)
print(','.join(decoded) if decoded else "empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "neet,code,love,you", expectedOutput: "neet,code,love,you" },
      { input: "we,say,:,yes", expectedOutput: "we,say,:,yes" },
      { input: "", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "hello,world", expectedOutput: "hello,world" },
      { input: "1,2,3", expectedOutput: "1,2,3" },
      { input: "special#chars,here", expectedOutput: "special#chars,here" },
      { input: "a,b,c,d,e", expectedOutput: "a,b,c,d,e" }
    ]
  },
  {
    id: "arrays-valid-sudoku",
    slug: "valid-sudoku",
    title: "Valid Sudoku",
    category: "Arrays and Hashing",
    difficulty: "medium",
    description: `Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
- Each row must contain the digits 1-9 without repetition
- Each column must contain the digits 1-9 without repetition
- Each of the nine 3x3 sub-boxes must contain the digits 1-9 without repetition

Use hash sets to track seen numbers in each row, column, and 3x3 box.`,
    inputFormat: "def isValidSudoku(board: List[List[str]]) -> bool:",
    outputFormat: "Return True if the Sudoku board is valid, False otherwise.",
    constraints: "board.length == 9\nboard[i].length == 9\nboard[i][j] is a digit 1-9 or '.'",
    starterCode: `from typing import List

def isValidSudoku(board: List[List[str]]) -> bool:
    # Your code here
    pass

# Read input
board = []
for _ in range(9):
    row = input().split()
    board.append(row)
print(isValidSudoku(board))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9", expectedOutput: "True" },
      { input: "8 3 . . 7 . . . .\n6 . . 1 9 5 . . .\n. 9 8 . . . . 6 .\n8 . . . 6 . . . 3\n4 . . 8 . 3 . . 1\n7 . . . 2 . . . 6\n. 6 . . . . 2 8 .\n. . . 4 1 9 . . 5\n. . . . 8 . . 7 9", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: ". . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .", expectedOutput: "True" },
      { input: "1 2 3 4 5 6 7 8 9\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .\n. . . . . . . . .", expectedOutput: "True" }
    ]
  },

  // ==================== TWO POINTERS ====================
  {
    id: "two-pointers-two-sum-ii",
    slug: "two-sum-ii",
    title: "Two Sum II - Input Array Is Sorted",
    category: "Two Pointers",
    difficulty: "medium",
    description: `Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.

Return the indices of the two numbers (1-indexed) as [index1, index2].

**Example:** Given numbers = [2,7,11,15], target = 9, return [1,2] because numbers[0] + numbers[1] = 9.

Use two pointers at both ends. Move left pointer right if sum too small, right pointer left if sum too large.`,
    inputFormat: "def twoSum(numbers: List[int], target: int) -> List[int]:",
    outputFormat: "Return 1-indexed positions of the two numbers.",
    constraints: "2 <= numbers.length <= 3 * 10^4\n-1000 <= numbers[i] <= 1000\nnumbers is sorted in non-decreasing order",
    starterCode: `from typing import List

def twoSum(numbers: List[int], target: int) -> List[int]:
    # Your code here
    pass

# Read input
numbers = list(map(int, input().split()))
target = int(input())
result = twoSum(numbers, target)
print(result[0], result[1])`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 7 11 15\n9", expectedOutput: "1 2" },
      { input: "2 3 4\n6", expectedOutput: "1 3" },
      { input: "-1 0\n-1", expectedOutput: "1 2" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n9", expectedOutput: "4 5" },
      { input: "-3 -1 0 2 4\n1", expectedOutput: "2 4" },
      { input: "1 1\n2", expectedOutput: "1 2" }
    ]
  },
  {
    id: "two-pointers-trapping-rain-water",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    category: "Two Pointers",
    difficulty: "hard",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example:** Given height = [0,1,0,2,1,0,1,3,2,1,2,1], return 6.

Use two pointers with left_max and right_max. Water at each position = min(left_max, right_max) - height[i].`,
    inputFormat: "def trap(height: List[int]) -> int:",
    outputFormat: "Return the total amount of trapped rainwater.",
    constraints: "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
    starterCode: `from typing import List

def trap(height: List[int]) -> int:
    # Your code here
    pass

# Read input
height = list(map(int, input().split()))
print(trap(height))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6" },
      { input: "4 2 0 3 2 5", expectedOutput: "9" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "0" },
      { input: "5 4 3 2 1", expectedOutput: "0" },
      { input: "3 0 3", expectedOutput: "3" },
      { input: "0 0 0 0", expectedOutput: "0" },
      { input: "2 0 2", expectedOutput: "2" }
    ]
  },

  // ==================== SLIDING WINDOW ====================
  {
    id: "sliding-window-char-replacement",
    slug: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    category: "Sliding Window",
    difficulty: "medium",
    description: `You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

**Example:** Given s = "AABABBA", k = 1, return 4 (change one B to A to get "AAAA").

Sliding window: window is valid if (window_length - max_frequency) <= k.`,
    inputFormat: "def characterReplacement(s: str, k: int) -> int:",
    outputFormat: "Return the length of the longest valid substring.",
    constraints: "1 <= s.length <= 10^5\ns consists of only uppercase English letters\n0 <= k <= s.length",
    starterCode: `def characterReplacement(s: str, k: int) -> int:
    # Your code here
    pass

# Read input
s = input()
k = int(input())
print(characterReplacement(s, k))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ABAB\n2", expectedOutput: "4" },
      { input: "AABABBA\n1", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "AAAA\n0", expectedOutput: "4" },
      { input: "ABCD\n2", expectedOutput: "3" },
      { input: "A\n0", expectedOutput: "1" }
    ]
  },
  {
    id: "sliding-window-permutation-string",
    slug: "permutation-in-string",
    title: "Permutation In String",
    category: "Sliding Window",
    difficulty: "medium",
    description: `Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

A permutation of s1 is a string with the same characters in any order.

**Example:** Given s1 = "ab", s2 = "eidbaooo", return true because s2 contains "ba" which is a permutation of "ab".

Use sliding window of size len(s1). Compare character frequencies in the window with s1's frequencies.`,
    inputFormat: "def checkInclusion(s1: str, s2: str) -> bool:",
    outputFormat: "Return True if s2 contains a permutation of s1.",
    constraints: "1 <= s1.length, s2.length <= 10^4\ns1 and s2 consist of lowercase English letters",
    starterCode: `def checkInclusion(s1: str, s2: str) -> bool:
    # Your code here
    pass

# Read input
s1 = input()
s2 = input()
print(checkInclusion(s1, s2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ab\neidbaooo", expectedOutput: "True" },
      { input: "ab\neidboaoo", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "True" },
      { input: "abc\ncba", expectedOutput: "True" },
      { input: "adc\ndcda", expectedOutput: "True" }
    ]
  },
  {
    id: "sliding-window-minimum-window",
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    category: "Sliding Window",
    difficulty: "hard",
    description: `Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.

**Example:** Given s = "ADOBECODEBANC", t = "ABC", return "BANC".

Use sliding window with two pointers. Expand right to include all chars, then shrink left to find minimum.`,
    inputFormat: "def minWindow(s: str, t: str) -> str:",
    outputFormat: "Return the minimum window substring, or empty string if not found.",
    constraints: "1 <= s.length, t.length <= 10^5\ns and t consist of uppercase and lowercase English letters",
    starterCode: `def minWindow(s: str, t: str) -> str:
    # Your code here
    pass

# Read input
s = input()
t = input()
result = minWindow(s, t)
print(result if result else "empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC" },
      { input: "a\na", expectedOutput: "a" },
      { input: "a\naa", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "aa\naa", expectedOutput: "aa" },
      { input: "abc\nb", expectedOutput: "b" },
      { input: "cabefgecdaecf\ncae", expectedOutput: "aec" }
    ]
  },
  {
    id: "sliding-window-max",
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    category: "Sliding Window",
    difficulty: "hard",
    description: `You are given an array of integers nums, and there is a sliding window of size k which is moving from left to right. You can only see the k numbers in the window. Return the max sliding window.

**Example:** Given nums = [1,3,-1,-3,5,3,6,7], k = 3, return [3,3,5,5,6,7].

Use a monotonic decreasing deque to track indices of potential maximums.`,
    inputFormat: "def maxSlidingWindow(nums: List[int], k: int) -> List[int]:",
    outputFormat: "Return an array of the maximum values in each window.",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= nums.length",
    starterCode: `from typing import List
from collections import deque

def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
k = int(input())
result = maxSlidingWindow(nums, k)
print(" ".join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 3 -1 -3 5 3 6 7\n3", expectedOutput: "3 3 5 5 6 7" },
      { input: "1\n1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "2 3 4 5" },
      { input: "5 4 3 2 1\n3", expectedOutput: "5 4 3" },
      { input: "1 1 1 1\n2", expectedOutput: "1 1 1" }
    ]
  },

  // ==================== STACKS ====================
  {
    id: "stacks-evaluate-rpn",
    slug: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    category: "Stacks",
    difficulty: "medium",
    description: `Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix).

Valid operators are +, -, *, and /. Each operand may be an integer or another expression.

**Example:** Given tokens = ["2","1","+","3","*"], return 9 because ((2 + 1) * 3) = 9.

Use a stack: push numbers, pop two and apply operator when operator is encountered.`,
    inputFormat: "def evalRPN(tokens: List[str]) -> int:",
    outputFormat: "Return the evaluated result as an integer.",
    constraints: "1 <= tokens.length <= 10^4\nDivision truncates toward zero",
    starterCode: `from typing import List

def evalRPN(tokens: List[str]) -> int:
    # Your code here
    pass

# Read input
tokens = input().split()
print(evalRPN(tokens))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 1 + 3 *", expectedOutput: "9" },
      { input: "4 13 5 / +", expectedOutput: "6" },
      { input: "10 6 9 3 + -11 * / * 17 + 5 +", expectedOutput: "22" }
    ],
    hiddenTestCases: [
      { input: "3 4 +", expectedOutput: "7" },
      { input: "5 2 -", expectedOutput: "3" },
      { input: "6 2 /", expectedOutput: "3" }
    ]
  },
  {
    id: "stacks-generate-parentheses",
    slug: "generate-parentheses",
    title: "Generate Parentheses",
    category: "Stacks",
    difficulty: "medium",
    description: `Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

**Example:** Given n = 3, return ["((()))","(()())","(())()","()(())","()()()"].

Use backtracking: add '(' if open count < n, add ')' if close count < open count.`,
    inputFormat: "def generateParenthesis(n: int) -> List[str]:",
    outputFormat: "Return all combinations of well-formed parentheses.",
    constraints: "1 <= n <= 8",
    starterCode: `from typing import List

def generateParenthesis(n: int) -> List[str]:
    # Your code here
    pass

# Read input
n = int(input())
result = generateParenthesis(n)
for p in sorted(result):
    print(p)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3", expectedOutput: "((()))\n(()())\n(())()\n()(())\n()()()" },
      { input: "1", expectedOutput: "()" }
    ],
    hiddenTestCases: [
      { input: "2", expectedOutput: "(())\n()()" },
      { input: "4", expectedOutput: "(((())))\n((()()))\n((())())\n((()))()\n(()(()))\n(()()())\n(()())()\n(())(())\n(())()()\n()((()))\n()(()())\n()(())()\n()()(())\n()()()()" }
    ]
  },
  {
    id: "stacks-daily-temperatures",
    slug: "daily-temperatures",
    title: "Daily Temperatures",
    category: "Stacks",
    difficulty: "medium",
    description: `Given an array of integers temperatures representing daily temperatures, return an array where answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.

**Example:** Given temperatures = [73,74,75,71,69,72,76,73], return [1,1,4,2,1,1,0,0].

Use a monotonic decreasing stack of indices. Pop and calculate distance when a warmer day is found.`,
    inputFormat: "def dailyTemperatures(temperatures: List[int]) -> List[int]:",
    outputFormat: "Return array of days to wait for warmer temperature.",
    constraints: "1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100",
    starterCode: `from typing import List

def dailyTemperatures(temperatures: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
temperatures = list(map(int, input().split()))
result = dailyTemperatures(temperatures)
print(" ".join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "73 74 75 71 69 72 76 73", expectedOutput: "1 1 4 2 1 1 0 0" },
      { input: "30 40 50 60", expectedOutput: "1 1 1 0" },
      { input: "30 60 90", expectedOutput: "1 1 0" }
    ],
    hiddenTestCases: [
      { input: "90 80 70 60", expectedOutput: "0 0 0 0" },
      { input: "50 50 50 50", expectedOutput: "0 0 0 0" },
      { input: "40 50 30 60", expectedOutput: "1 2 1 0" }
    ]
  },
  {
    id: "stacks-car-fleet",
    slug: "car-fleet",
    title: "Car Fleet",
    category: "Stacks",
    difficulty: "medium",
    description: `There are n cars going to the same destination along a one-lane road. Return the number of car fleets that will arrive at the destination.

A car fleet is some non-empty set of cars driving at the same position and same speed. A single car is also a car fleet.

Sort by position, then use a stack to merge cars that catch up to the one ahead.`,
    inputFormat: "def carFleet(target: int, position: List[int], speed: List[int]) -> int:",
    outputFormat: "Return the number of car fleets.",
    constraints: "n == position.length == speed.length\n1 <= n <= 10^5",
    starterCode: `from typing import List

def carFleet(target: int, position: List[int], speed: List[int]) -> int:
    # Your code here
    pass

# Read input
target = int(input())
position = list(map(int, input().split()))
speed = list(map(int, input().split()))
print(carFleet(target, position, speed))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "12\n10 8 0 5 3\n2 4 1 1 3", expectedOutput: "3" },
      { input: "10\n3\n3", expectedOutput: "1" },
      { input: "100\n0 2 4\n4 2 1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "10\n0 4 2\n2 1 3", expectedOutput: "1" },
      { input: "10\n6 8\n3 2", expectedOutput: "2" }
    ]
  },
  {
    id: "stacks-largest-rectangle",
    slug: "largest-rectangle-in-histogram",
    title: "Largest Rectangle In Histogram",
    category: "Stacks",
    difficulty: "hard",
    description: `Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

**Example:** Given heights = [2,1,5,6,2,3], return 10.

Use a monotonic increasing stack. When a smaller bar is encountered, pop and calculate areas.`,
    inputFormat: "def largestRectangleArea(heights: List[int]) -> int:",
    outputFormat: "Return the area of the largest rectangle.",
    constraints: "1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4",
    starterCode: `from typing import List

def largestRectangleArea(heights: List[int]) -> int:
    # Your code here
    pass

# Read input
heights = list(map(int, input().split()))
print(largestRectangleArea(heights))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 1 5 6 2 3", expectedOutput: "10" },
      { input: "2 4", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 1 1 1", expectedOutput: "4" },
      { input: "6 2 5 4 5 1 6", expectedOutput: "12" }
    ]
  },

  // ==================== BINARY SEARCH ====================
  {
    id: "binary-search-2d-matrix",
    slug: "search-2d-matrix",
    title: "Search a 2D Matrix",
    category: "Binary Search",
    difficulty: "medium",
    description: `Write an efficient algorithm that searches for a value target in an m x n integer matrix. This matrix has the following properties:
- Integers in each row are sorted from left to right
- The first integer of each row is greater than the last integer of the previous row

Treat the 2D matrix as a 1D sorted array and apply binary search.`,
    inputFormat: "def searchMatrix(matrix: List[List[int]], target: int) -> bool:",
    outputFormat: "Return True if target is found, False otherwise.",
    constraints: "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 100",
    starterCode: `from typing import List

def searchMatrix(matrix: List[List[int]], target: int) -> bool:
    # Your code here
    pass

# Read input
import sys
lines = sys.stdin.read().strip().split('\\n')
matrix = []
for line in lines[:-1]:
    matrix.append(list(map(int, line.split())))
target = int(lines[-1])
print(searchMatrix(matrix, target))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 3 5 7\n10 11 16 20\n23 30 34 60\n3", expectedOutput: "True" },
      { input: "1 3 5 7\n10 11 16 20\n23 30 34 60\n13", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "True" },
      { input: "1 2 3\n0", expectedOutput: "False" },
      { input: "1 2\n3 4\n4", expectedOutput: "True" }
    ]
  },
  {
    id: "binary-search-koko-bananas",
    slug: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    category: "Binary Search",
    difficulty: "medium",
    description: `Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. Koko can eat at most k bananas per hour.

Return the minimum integer k such that she can eat all the bananas within h hours.

Binary search on the eating speed k. For each k, calculate total hours needed.`,
    inputFormat: "def minEatingSpeed(piles: List[int], h: int) -> int:",
    outputFormat: "Return the minimum eating speed.",
    constraints: "1 <= piles.length <= 10^4\npiles.length <= h <= 10^9\n1 <= piles[i] <= 10^9",
    starterCode: `from typing import List
import math

def minEatingSpeed(piles: List[int], h: int) -> int:
    # Your code here
    pass

# Read input
piles = list(map(int, input().split()))
h = int(input())
print(minEatingSpeed(piles, h))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 6 7 11\n8", expectedOutput: "4" },
      { input: "30 11 23 4 20\n5", expectedOutput: "30" },
      { input: "30 11 23 4 20\n6", expectedOutput: "23" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "1000000000\n2", expectedOutput: "500000000" }
    ]
  },
  {
    id: "binary-search-rotated-min",
    slug: "find-minimum-rotated-sorted-array",
    title: "Find Minimum In Rotated Sorted Array",
    category: "Binary Search",
    difficulty: "medium",
    description: `Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element.

**Example:** Given nums = [3,4,5,1,2], return 1.

Use binary search. Compare mid with right: if nums[mid] > nums[right], minimum is in right half.`,
    inputFormat: "def findMin(nums: List[int]) -> int:",
    outputFormat: "Return the minimum element.",
    constraints: "n == nums.length\n1 <= n <= 5000\nAll integers are unique",
    starterCode: `from typing import List

def findMin(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(findMin(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 4 5 1 2", expectedOutput: "1" },
      { input: "4 5 6 7 0 1 2", expectedOutput: "0" },
      { input: "11 13 15 17", expectedOutput: "11" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "2 1", expectedOutput: "1" },
      { input: "1 2 3 4 5", expectedOutput: "1" }
    ]
  },
  {
    id: "binary-search-rotated-search",
    slug: "search-in-rotated-sorted-array",
    title: "Search In Rotated Sorted Array",
    category: "Binary Search",
    difficulty: "medium",
    description: `Given the rotated sorted array nums and an integer target, return the index of target, or -1 if not found.

**Example:** Given nums = [4,5,6,7,0,1,2], target = 0, return 4.

Binary search with extra logic to determine which half is sorted and whether target is in that half.`,
    inputFormat: "def search(nums: List[int], target: int) -> int:",
    outputFormat: "Return the index of target, or -1 if not found.",
    constraints: "1 <= nums.length <= 5000\nAll values are unique",
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
      { input: "4 5 6 7 0 1 2\n0", expectedOutput: "4" },
      { input: "4 5 6 7 0 1 2\n3", expectedOutput: "-1" },
      { input: "1\n0", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "0" },
      { input: "3 1\n1", expectedOutput: "1" },
      { input: "1 3\n3", expectedOutput: "1" }
    ]
  },
  {
    id: "binary-search-time-based-kv",
    slug: "time-based-key-value-store",
    title: "Time Based Key Value Store",
    category: "Binary Search",
    difficulty: "medium",
    description: `Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement set(key, value, timestamp) and get(key, timestamp).

Use a hashmap with sorted lists of (timestamp, value) pairs. Binary search in get().`,
    inputFormat: "Implement TimeMap class with set and get methods",
    outputFormat: "Return values for get operations.",
    constraints: "1 <= key.length, value.length <= 100\ntimestamps are strictly increasing for set calls",
    starterCode: `class TimeMap:
    def __init__(self):
        # Your code here
        pass

    def set(self, key: str, value: str, timestamp: int) -> None:
        # Your code here
        pass

    def get(self, key: str, timestamp: int) -> str:
        # Your code here
        pass

# Process operations
tm = TimeMap()
n = int(input())
for _ in range(n):
    op = input().split()
    if op[0] == "set":
        tm.set(op[1], op[2], int(op[3]))
    else:
        result = tm.get(op[1], int(op[2]))
        print(result if result else "")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\nset foo bar 1\nget foo 1\nget foo 3\nset foo bar2 4", expectedOutput: "bar\nbar" },
      { input: "3\nset love high 10\nset love low 20\nget love 15", expectedOutput: "high" }
    ],
    hiddenTestCases: [
      { input: "2\nset a b 1\nget a 0", expectedOutput: "" },
      { input: "3\nset x y 5\nset x z 10\nget x 7", expectedOutput: "y" }
    ]
  },
  {
    id: "binary-search-median-two-arrays",
    slug: "median-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    category: "Binary Search",
    difficulty: "hard",
    description: `Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Binary search on the smaller array to find the correct partition point.`,
    inputFormat: "def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:",
    outputFormat: "Return the median as a float.",
    constraints: "nums1.length == m, nums2.length == n\n0 <= m, n <= 1000\nm + n >= 1",
    starterCode: `from typing import List

def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    # Your code here
    pass

# Read input
line1 = input().strip()
line2 = input().strip()
nums1 = list(map(int, line1.split())) if line1 else []
nums2 = list(map(int, line2.split())) if line2 else []
print(findMedianSortedArrays(nums1, nums2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 3\n2", expectedOutput: "2.0" },
      { input: "1 2\n3 4", expectedOutput: "2.5" }
    ],
    hiddenTestCases: [
      { input: "\n1", expectedOutput: "1.0" },
      { input: "2\n", expectedOutput: "2.0" },
      { input: "1 2 3 4 5\n6 7 8 9 10", expectedOutput: "5.5" }
    ]
  },

  // ==================== LINKED LIST ====================
  {
    id: "linked-list-reorder-list",
    slug: "reorder-list",
    title: "Reorder List",
    category: "Linked List",
    difficulty: "medium",
    description: `Given the head of a singly linked list, reorder it to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...

Do not return anything, modify head in-place instead.

Find middle, reverse second half, then merge the two halves alternately.`,
    inputFormat: "def reorderList(head: Optional[ListNode]) -> None:",
    outputFormat: "Modify the list in-place.",
    constraints: "The number of nodes in the list is in the range [1, 5 * 10^4]",
    starterCode: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reorderList(head: Optional[ListNode]) -> None:
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
reorderList(head)
printList(head)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4", expectedOutput: "1 4 2 3" },
      { input: "1 2 3 4 5", expectedOutput: "1 5 2 4 3" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2", expectedOutput: "1 2" },
      { input: "1 2 3", expectedOutput: "1 3 2" }
    ]
  },
  {
    id: "linked-list-remove-nth",
    slug: "remove-nth-node-from-end",
    title: "Remove Nth Node From End of List",
    category: "Linked List",
    difficulty: "medium",
    description: `Given the head of a linked list, remove the nth node from the end and return its head.

**Example:** Given head = [1,2,3,4,5], n = 2, return [1,2,3,5].

Use two pointers with n nodes apart. When fast reaches end, slow is at the node before the one to remove.`,
    inputFormat: "def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:",
    outputFormat: "Return the head of the modified list.",
    constraints: "The number of nodes in the list is sz\n1 <= sz <= 30\n1 <= n <= sz",
    starterCode: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:
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
n = int(input())
head = buildList(vals)
result = removeNthFromEnd(head, n)
printList(result)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "1 2 3 5" },
      { input: "1\n1", expectedOutput: "empty" },
      { input: "1 2\n1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2\n2", expectedOutput: "2" },
      { input: "1 2 3\n3", expectedOutput: "2 3" }
    ]
  },
  {
    id: "linked-list-copy-random",
    slug: "copy-list-random-pointer",
    title: "Copy List With Random Pointer",
    category: "Linked List",
    difficulty: "medium",
    description: `A linked list is given where each node contains an additional random pointer which could point to any node or null. Construct a deep copy of the list.

Use a hashmap to map original nodes to their copies, then set next and random pointers.`,
    inputFormat: "def copyRandomList(head: Optional[Node]) -> Optional[Node]:",
    outputFormat: "Return the head of the deep copied list.",
    constraints: "0 <= n <= 1000\n-10^4 <= Node.val <= 10^4",
    starterCode: `from typing import Optional

class Node:
    def __init__(self, x: int, next=None, random=None):
        self.val = x
        self.next = next
        self.random = random

def copyRandomList(head: Optional[Node]) -> Optional[Node]:
    # Your code here
    pass

# Simplified test
print("Implemented")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "", expectedOutput: "Implemented" }
    ],
    hiddenTestCases: []
  },
  {
    id: "linked-list-add-two-numbers",
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    category: "Linked List",
    difficulty: "medium",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order.

Add the two numbers and return the sum as a linked list.

**Example:** Given l1 = [2,4,3], l2 = [5,6,4], return [7,0,8] because 342 + 465 = 807.

Simulate addition digit by digit with carry.`,
    inputFormat: "def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:",
    outputFormat: "Return the sum as a linked list.",
    constraints: "The number of nodes in each linked list is in the range [1, 100]",
    starterCode: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
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
    print(" ".join(vals))

# Read input
l1_vals = list(map(int, input().split()))
l2_vals = list(map(int, input().split()))
l1 = buildList(l1_vals)
l2 = buildList(l2_vals)
result = addTwoNumbers(l1, l2)
printList(result)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 4 3\n5 6 4", expectedOutput: "7 0 8" },
      { input: "0\n0", expectedOutput: "0" },
      { input: "9 9 9 9 9 9 9\n9 9 9 9", expectedOutput: "8 9 9 9 0 0 0 1" }
    ],
    hiddenTestCases: [
      { input: "1\n9 9 9", expectedOutput: "0 0 0 1" },
      { input: "5\n5", expectedOutput: "0 1" }
    ]
  },
  {
    id: "linked-list-cycle",
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    category: "Linked List",
    difficulty: "easy",
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

Return true if there is a cycle, false otherwise.

Use Floyd's Cycle Detection (tortoise and hare): slow moves 1 step, fast moves 2 steps. If they meet, there's a cycle.`,
    inputFormat: "def hasCycle(head: Optional[ListNode]) -> bool:",
    outputFormat: "Return True if cycle exists, False otherwise.",
    constraints: "The number of nodes is in the range [0, 10^4]",
    starterCode: `from typing import Optional

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def hasCycle(head: Optional[ListNode]) -> bool:
    # Your code here
    pass

# Simplified test - no cycle
vals = list(map(int, input().split())) if input().strip() else []
if not vals:
    print(False)
else:
    head = ListNode(vals[0])
    curr = head
    for v in vals[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    print(hasCycle(head))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4", expectedOutput: "False" },
      { input: "", expectedOutput: "False" }
    ],
    hiddenTestCases: []
  },
  {
    id: "linked-list-find-duplicate",
    slug: "find-duplicate-number",
    title: "Find The Duplicate Number",
    category: "Linked List",
    difficulty: "medium",
    description: `Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, there is only one repeated number. Find it.

You must solve it without modifying the array and using only constant extra space.

Use Floyd's Cycle Detection treating array as linked list where nums[i] points to index nums[i].`,
    inputFormat: "def findDuplicate(nums: List[int]) -> int:",
    outputFormat: "Return the duplicate number.",
    constraints: "1 <= n <= 10^5\nnums.length == n + 1\n1 <= nums[i] <= n",
    starterCode: `from typing import List

def findDuplicate(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(findDuplicate(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 3 4 2 2", expectedOutput: "2" },
      { input: "3 1 3 4 2", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1 1", expectedOutput: "1" },
      { input: "2 2 2 2 2", expectedOutput: "2" }
    ]
  },
  {
    id: "linked-list-lru-cache",
    slug: "lru-cache",
    title: "LRU Cache",
    category: "Linked List",
    difficulty: "medium",
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement get(key) and put(key, value) with O(1) time complexity.

Use a hashmap for O(1) access combined with a doubly linked list to track recency.`,
    inputFormat: "Implement LRUCache class with get and put methods",
    outputFormat: "Return values for get operations, -1 if key not found.",
    constraints: "1 <= capacity <= 3000\n0 <= key, value <= 10^4",
    starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        # Your code here
        pass

    def get(self, key: int) -> int:
        # Your code here
        pass

    def put(self, key: int, value: int) -> None:
        # Your code here
        pass

# Process operations
capacity = int(input())
cache = LRUCache(capacity)
n = int(input())
for _ in range(n):
    op = input().split()
    if op[0] == "put":
        cache.put(int(op[1]), int(op[2]))
    else:
        print(cache.get(int(op[1])))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\n7\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1", expectedOutput: "1\n-1\n-1" }
    ],
    hiddenTestCases: [
      { input: "1\n3\nput 1 1\nput 2 2\nget 1", expectedOutput: "-1" }
    ]
  },
  {
    id: "linked-list-merge-k-sorted",
    slug: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    category: "Linked List",
    difficulty: "hard",
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Use a min-heap to always get the smallest current element across all lists.`,
    inputFormat: "def mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:",
    outputFormat: "Return the head of the merged sorted list.",
    constraints: "k == lists.length\n0 <= k <= 10^4\nlists[i] is sorted in ascending order",
    starterCode: `from typing import List, Optional
import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
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
k = int(input())
lists = []
for _ in range(k):
    line = input().strip()
    vals = list(map(int, line.split())) if line else []
    lists.append(buildList(vals))
result = mergeKLists(lists)
printList(result)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n1 4 5\n1 3 4\n2 6", expectedOutput: "1 1 2 3 4 4 5 6" },
      { input: "0", expectedOutput: "empty" },
      { input: "1\n", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "2\n1\n2", expectedOutput: "1 2" },
      { input: "2\n1 2 3\n4 5 6", expectedOutput: "1 2 3 4 5 6" }
    ]
  },
  {
    id: "linked-list-reverse-k-group",
    slug: "reverse-nodes-in-k-group",
    title: "Reverse Nodes In K Group",
    category: "Linked List",
    difficulty: "hard",
    description: `Given the head of a linked list, reverse the nodes of the list k at a time.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes should remain as is.

Count k nodes, reverse them, connect to previous group, repeat.`,
    inputFormat: "def reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:",
    outputFormat: "Return the modified list.",
    constraints: "1 <= k <= n <= 5000",
    starterCode: `from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:
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
    print(" ".join(vals))

# Read input
vals = list(map(int, input().split()))
k = int(input())
head = buildList(vals)
result = reverseKGroup(head, k)
printList(result)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "2 1 4 3 5" },
      { input: "1 2 3 4 5\n3", expectedOutput: "3 2 1 4 5" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4\n4", expectedOutput: "4 3 2 1" },
      { input: "1\n1", expectedOutput: "1" }
    ]
  },

  // ==================== TREES (Additional) ====================
  {
    id: "trees-diameter",
    slug: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    category: "Trees",
    difficulty: "easy",
    description: `Given the root of a binary tree, return the length of the diameter of the tree.

The diameter is the length of the longest path between any two nodes (measured in number of edges).

DFS to find max depth of each subtree. Diameter at each node = left_depth + right_depth.`,
    inputFormat: "def diameterOfBinaryTree(root: Optional[TreeNode]) -> int:",
    outputFormat: "Return the diameter (number of edges).",
    constraints: "The number of nodes in the tree is in the range [1, 10^4]",
    starterCode: `from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameterOfBinaryTree(root: Optional[TreeNode]) -> int:
    # Your code here
    pass

# Helper to build tree
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
vals = input().split()
root = buildTree(vals)
print(diameterOfBinaryTree(root))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "3" },
      { input: "1 2", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "0" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "4" }
    ]
  },
  {
    id: "trees-balanced",
    slug: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    category: "Trees",
    difficulty: "easy",
    description: `Given a binary tree, determine if it is height-balanced.

A height-balanced binary tree is defined as a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

DFS that returns -1 if unbalanced, otherwise returns height.`,
    inputFormat: "def isBalanced(root: Optional[TreeNode]) -> bool:",
    outputFormat: "Return True if balanced, False otherwise.",
    constraints: "The number of nodes in the tree is in the range [0, 5000]",
    starterCode: `from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isBalanced(root: Optional[TreeNode]) -> bool:
    # Your code here
    pass

# Helper to build tree
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
print(isBalanced(root))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "True" },
      { input: "1 2 2 3 3 null null 4 4", expectedOutput: "False" },
      { input: "", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "True" },
      { input: "1 2 null 3", expectedOutput: "False" }
    ]
  },
  {
    id: "trees-same-tree",
    slug: "same-binary-tree",
    title: "Same Binary Tree",
    category: "Trees",
    difficulty: "easy",
    description: `Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical and the nodes have the same values.

Recursively compare: both null = true, one null = false, values equal and subtrees equal = true.`,
    inputFormat: "def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:",
    outputFormat: "Return True if same, False otherwise.",
    constraints: "The number of nodes in both trees is in the range [0, 100]",
    starterCode: `from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    # Your code here
    pass

# Helper
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
line1 = input().strip()
line2 = input().strip()
vals1 = line1.split() if line1 else []
vals2 = line2.split() if line2 else []
p = buildTree(vals1)
q = buildTree(vals2)
print(isSameTree(p, q))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3\n1 2 3", expectedOutput: "True" },
      { input: "1 2\n1 null 2", expectedOutput: "False" },
      { input: "1 2 1\n1 1 2", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "\n", expectedOutput: "True" },
      { input: "1\n1", expectedOutput: "True" }
    ]
  },
  {
    id: "trees-subtree",
    slug: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    category: "Trees",
    difficulty: "easy",
    description: `Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values as subRoot.

Check if trees are same at every node of root. If not same, check left and right subtrees.`,
    inputFormat: "def isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:",
    outputFormat: "Return True if subRoot is a subtree of root.",
    constraints: "The number of nodes in root is in the range [1, 2000]\nThe number of nodes in subRoot is in the range [1, 1000]",
    starterCode: `from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
    # Your code here
    pass

# Helper
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
vals1 = input().split()
vals2 = input().split()
root = buildTree(vals1)
subRoot = buildTree(vals2)
print(isSubtree(root, subRoot))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 4 5 1 2\n4 1 2", expectedOutput: "True" },
      { input: "3 4 5 1 2 null null null null 0\n4 1 2", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1 1\n1", expectedOutput: "True" }
    ]
  },
  {
    id: "trees-lca-bst",
    slug: "lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of a Binary Search Tree",
    category: "Trees",
    difficulty: "medium",
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes.

**Example:** Given root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8, return 6.

Use BST property: if both p and q are smaller, go left; if both larger, go right; otherwise current node is LCA.`,
    inputFormat: "def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:",
    outputFormat: "Return the LCA node.",
    constraints: "The number of nodes in the tree is in the range [2, 10^5]\nAll Node.val are unique",
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    # Your code here
    pass

# Helper
def buildTree(vals):
    if not vals or vals[0] == "null":
        return None, {}
    nodes = {}
    root = TreeNode(int(vals[0]))
    nodes[int(vals[0])] = root
    queue = deque([root])
    i = 1
    while queue and i < len(vals):
        node = queue.popleft()
        if i < len(vals) and vals[i] != "null":
            node.left = TreeNode(int(vals[i]))
            nodes[int(vals[i])] = node.left
            queue.append(node.left)
        i += 1
        if i < len(vals) and vals[i] != "null":
            node.right = TreeNode(int(vals[i]))
            nodes[int(vals[i])] = node.right
            queue.append(node.right)
        i += 1
    return root, nodes

# Read input
vals = input().split()
p_val, q_val = map(int, input().split())
root, nodes = buildTree(vals)
p = nodes[p_val]
q = nodes[q_val]
result = lowestCommonAncestor(root, p, q)
print(result.val)`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6 2 8 0 4 7 9 null null 3 5\n2 8", expectedOutput: "6" },
      { input: "6 2 8 0 4 7 9 null null 3 5\n2 4", expectedOutput: "2" },
      { input: "2 1\n2 1", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "3 1 4 null 2\n1 2", expectedOutput: "1" }
    ]
  },
  {
    id: "trees-level-order",
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    category: "Trees",
    difficulty: "medium",
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values (from left to right, level by level).

Use BFS with a queue. Process all nodes at current level, then move to next level.`,
    inputFormat: "def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:",
    outputFormat: "Return a list of lists, each containing node values at that level.",
    constraints: "The number of nodes in the tree is in the range [0, 2000]",
    starterCode: `from typing import Optional, List
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
    # Your code here
    pass

# Helper
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
result = levelOrder(root)
for level in result:
    print(" ".join(map(str, level)))
if not result:
    print("empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "3\n9 20\n15 7" },
      { input: "1", expectedOutput: "1" },
      { input: "", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5 6 7", expectedOutput: "1\n2 3\n4 5 6 7" }
    ]
  },
  {
    id: "trees-right-side-view",
    slug: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    category: "Trees",
    difficulty: "medium",
    description: `Given the root of a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.

BFS: take the last node of each level. Or DFS: visit right child first, track depth.`,
    inputFormat: "def rightSideView(root: Optional[TreeNode]) -> List[int]:",
    outputFormat: "Return list of visible node values from right side.",
    constraints: "The number of nodes in the tree is in the range [0, 100]",
    starterCode: `from typing import Optional, List
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def rightSideView(root: Optional[TreeNode]) -> List[int]:
    # Your code here
    pass

# Helper
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
result = rightSideView(root)
print(" ".join(map(str, result)) if result else "empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 null 5 null 4", expectedOutput: "1 3 4" },
      { input: "1 null 3", expectedOutput: "1 3" },
      { input: "", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "1 2", expectedOutput: "1 2" }
    ]
  },
  {
    id: "trees-count-good-nodes",
    slug: "count-good-nodes-binary-tree",
    title: "Count Good Nodes In Binary Tree",
    category: "Trees",
    difficulty: "medium",
    description: `Given a binary tree root, a node X is good if the path from root to X has no node with a value greater than X.

Return the number of good nodes.

DFS tracking the maximum value seen on the path. Node is good if its value >= max.`,
    inputFormat: "def goodNodes(root: TreeNode) -> int:",
    outputFormat: "Return the count of good nodes.",
    constraints: "The number of nodes in the tree is in the range [1, 10^5]",
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def goodNodes(root: TreeNode) -> int:
    # Your code here
    pass

# Helper
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
vals = input().split()
root = buildTree(vals)
print(goodNodes(root))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 1 4 3 null 1 5", expectedOutput: "4" },
      { input: "3 3 null 4 2", expectedOutput: "3" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "2 1 3", expectedOutput: "2" }
    ]
  },
  {
    id: "trees-validate-bst",
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    category: "Trees",
    difficulty: "medium",
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as:
- Left subtree contains only nodes with keys less than the node's key
- Right subtree contains only nodes with keys greater than the node's key
- Both subtrees are valid BSTs

DFS with min/max bounds that tighten as you go down.`,
    inputFormat: "def isValidBST(root: Optional[TreeNode]) -> bool:",
    outputFormat: "Return True if valid BST, False otherwise.",
    constraints: "The number of nodes in the tree is in the range [1, 10^4]",
    starterCode: `from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isValidBST(root: Optional[TreeNode]) -> bool:
    # Your code here
    pass

# Helper
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
vals = input().split()
root = buildTree(vals)
print(isValidBST(root))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 1 3", expectedOutput: "True" },
      { input: "5 1 4 null null 3 6", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "True" },
      { input: "5 4 6 null null 3 7", expectedOutput: "False" }
    ]
  },
  {
    id: "trees-kth-smallest-bst",
    slug: "kth-smallest-element-bst",
    title: "Kth Smallest Element In a BST",
    category: "Trees",
    difficulty: "medium",
    description: `Given the root of a binary search tree and an integer k, return the kth smallest value in the tree.

Inorder traversal of BST gives sorted order. Count nodes until you reach k.`,
    inputFormat: "def kthSmallest(root: Optional[TreeNode], k: int) -> int:",
    outputFormat: "Return the kth smallest value.",
    constraints: "1 <= k <= n <= 10^4",
    starterCode: `from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kthSmallest(root: Optional[TreeNode], k: int) -> int:
    # Your code here
    pass

# Helper
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
vals = input().split()
k = int(input())
root = buildTree(vals)
print(kthSmallest(root, k))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 1 4 null 2\n1", expectedOutput: "1" },
      { input: "5 3 6 2 4 null null 1\n3", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "2 1 3\n2", expectedOutput: "2" }
    ]
  },
  {
    id: "trees-construct-preorder-inorder",
    slug: "construct-binary-tree-preorder-inorder",
    title: "Construct Binary Tree From Preorder And Inorder Traversal",
    category: "Trees",
    difficulty: "medium",
    description: `Given two integer arrays preorder and inorder where preorder is the preorder traversal and inorder is the inorder traversal of a binary tree, construct and return the binary tree.

First element of preorder is root. Find it in inorder to determine left and right subtrees. Recursively build.`,
    inputFormat: "def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:",
    outputFormat: "Return the root of the constructed tree.",
    constraints: "1 <= preorder.length <= 3000\npreorder.length == inorder.length\nValues are unique",
    starterCode: `from typing import Optional, List
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
    # Your code here
    pass

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
preorder = list(map(int, input().split()))
inorder = list(map(int, input().split()))
root = buildTree(preorder, inorder)
output = treeToList(root)
print(" ".join(output))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 9 20 15 7\n9 3 15 20 7", expectedOutput: "3 9 20 null null 15 7" },
      { input: "-1\n-1", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "1 2\n2 1", expectedOutput: "1 2" }
    ]
  },
  {
    id: "trees-max-path-sum",
    slug: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    category: "Trees",
    difficulty: "hard",
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. A path can start and end at any node.

Return the maximum path sum of any path.

DFS returning max path sum ending at current node. At each node, consider path through current node as potential max.`,
    inputFormat: "def maxPathSum(root: Optional[TreeNode]) -> int:",
    outputFormat: "Return the maximum path sum.",
    constraints: "The number of nodes in the tree is in the range [1, 3 * 10^4]\n-1000 <= Node.val <= 1000",
    starterCode: `from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxPathSum(root: Optional[TreeNode]) -> int:
    # Your code here
    pass

# Helper
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
vals = input().split()
root = buildTree(vals)
print(maxPathSum(root))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3", expectedOutput: "6" },
      { input: "-10 9 20 null null 15 7", expectedOutput: "42" }
    ],
    hiddenTestCases: [
      { input: "-3", expectedOutput: "-3" },
      { input: "2 -1", expectedOutput: "2" }
    ]
  },
  {
    id: "trees-serialize-deserialize",
    slug: "serialize-deserialize-binary-tree",
    title: "Serialize And Deserialize Binary Tree",
    category: "Trees",
    difficulty: "hard",
    description: `Design an algorithm to serialize a binary tree to a string and deserialize that string back to the original tree.

Use level-order traversal with "null" markers for missing children. Reverse the process for deserialization.`,
    inputFormat: "Implement serialize(root) and deserialize(data) functions",
    outputFormat: "serialize returns a string, deserialize returns the original tree.",
    constraints: "The number of nodes in the tree is in the range [0, 10^4]",
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def serialize(root) -> str:
    # Your code here
    pass

def deserialize(data) -> TreeNode:
    # Your code here
    pass

# Test
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

line = input().strip()
vals = line.split() if line else []
root = buildTree(vals)
serialized = serialize(root)
deserialized = deserialize(serialized)
# Verify by serializing again
print(serialize(deserialized) if deserialized else "empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 null null 4 5", expectedOutput: "1,2,3,null,null,4,5" },
      { input: "", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" }
    ]
  },

  // ==================== MATHS AND GEOMETRY ====================
  {
    id: "math-rotate-image",
    slug: "rotate-image",
    title: "Rotate Image",
    category: "Maths and Geometry",
    difficulty: "medium",
    description: `You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise in-place.

Transpose the matrix (swap rows and columns), then reverse each row.`,
    inputFormat: "def rotate(matrix: List[List[int]]) -> None:",
    outputFormat: "Modify the matrix in-place.",
    constraints: "n == matrix.length == matrix[i].length\n1 <= n <= 20",
    starterCode: `from typing import List

def rotate(matrix: List[List[int]]) -> None:
    # Your code here
    pass

# Read input
n = int(input())
matrix = []
for _ in range(n):
    matrix.append(list(map(int, input().split())))
rotate(matrix)
for row in matrix:
    print(" ".join(map(str, row)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "7 4 1\n8 5 2\n9 6 3" },
      { input: "2\n1 2\n3 4", expectedOutput: "3 1\n4 2" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" }
    ]
  },
  {
    id: "math-spiral-matrix",
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    category: "Maths and Geometry",
    difficulty: "medium",
    description: `Given an m x n matrix, return all elements of the matrix in spiral order.

Traverse right, then down, then left, then up. Shrink boundaries after each direction.`,
    inputFormat: "def spiralOrder(matrix: List[List[int]]) -> List[int]:",
    outputFormat: "Return elements in spiral order.",
    constraints: "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 10",
    starterCode: `from typing import List

def spiralOrder(matrix: List[List[int]]) -> List[int]:
    # Your code here
    pass

# Read input
m = int(input())
matrix = []
for _ in range(m):
    matrix.append(list(map(int, input().split())))
result = spiralOrder(matrix)
print(" ".join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expectedOutput: "1 2 3 6 9 8 7 4 5" },
      { input: "3\n1 2 3 4\n5 6 7 8\n9 10 11 12", expectedOutput: "1 2 3 4 8 12 11 10 9 5 6 7" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "1\n1 2 3", expectedOutput: "1 2 3" }
    ]
  },
  {
    id: "math-set-matrix-zeroes",
    slug: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    category: "Maths and Geometry",
    difficulty: "medium",
    description: `Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's. Do it in-place.

Use first row and column as markers. Iterate twice: first to mark, then to set zeroes.`,
    inputFormat: "def setZeroes(matrix: List[List[int]]) -> None:",
    outputFormat: "Modify the matrix in-place.",
    constraints: "m == matrix.length\nn == matrix[0].length\n1 <= m, n <= 200",
    starterCode: `from typing import List

def setZeroes(matrix: List[List[int]]) -> None:
    # Your code here
    pass

# Read input
m = int(input())
matrix = []
for _ in range(m):
    matrix.append(list(map(int, input().split())))
setZeroes(matrix)
for row in matrix:
    print(" ".join(map(str, row)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n1 1 1\n1 0 1\n1 1 1", expectedOutput: "1 0 1\n0 0 0\n1 0 1" },
      { input: "3\n0 1 2 0\n3 4 5 2\n1 3 1 5", expectedOutput: "0 0 0 0\n0 4 5 0\n0 3 1 0" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "1\n0", expectedOutput: "0" }
    ]
  },
  {
    id: "math-happy-number",
    slug: "happy-number",
    title: "Happy Number",
    category: "Maths and Geometry",
    difficulty: "easy",
    description: `Write an algorithm to determine if a number n is happy.

A happy number is defined by replacing the number by the sum of the squares of its digits until it equals 1 or loops endlessly.

Use a hash set to detect cycles, or use Floyd's cycle detection.`,
    inputFormat: "def isHappy(n: int) -> bool:",
    outputFormat: "Return True if n is a happy number.",
    constraints: "1 <= n <= 2^31 - 1",
    starterCode: `def isHappy(n: int) -> bool:
    # Your code here
    pass

# Read input
n = int(input())
print(isHappy(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "19", expectedOutput: "True" },
      { input: "2", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "True" },
      { input: "7", expectedOutput: "True" },
      { input: "4", expectedOutput: "False" }
    ]
  },
  {
    id: "math-plus-one",
    slug: "plus-one",
    title: "Plus One",
    category: "Maths and Geometry",
    difficulty: "easy",
    description: `Given a large integer represented as an integer array digits, increment the large integer by one and return the resulting array.

Start from the rightmost digit. Add 1, handle carry. If carry remains after all digits, prepend 1.`,
    inputFormat: "def plusOne(digits: List[int]) -> List[int]:",
    outputFormat: "Return the resulting array after adding one.",
    constraints: "1 <= digits.length <= 100\n0 <= digits[i] <= 9",
    starterCode: `from typing import List

def plusOne(digits: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
digits = list(map(int, input().split()))
result = plusOne(digits)
print(" ".join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3", expectedOutput: "1 2 4" },
      { input: "4 3 2 1", expectedOutput: "4 3 2 2" },
      { input: "9", expectedOutput: "1 0" }
    ],
    hiddenTestCases: [
      { input: "9 9 9", expectedOutput: "1 0 0 0" },
      { input: "0", expectedOutput: "1" }
    ]
  },
  {
    id: "math-pow",
    slug: "pow-x-n",
    title: "Pow(x, n)",
    category: "Maths and Geometry",
    difficulty: "medium",
    description: `Implement pow(x, n), which calculates x raised to the power n.

Use binary exponentiation: x^n = (x^(n/2))^2 for even n, x * x^(n-1) for odd n. Handle negative exponents.`,
    inputFormat: "def myPow(x: float, n: int) -> float:",
    outputFormat: "Return x raised to the power n.",
    constraints: "-100.0 < x < 100.0\n-2^31 <= n <= 2^31-1",
    starterCode: `def myPow(x: float, n: int) -> float:
    # Your code here
    pass

# Read input
x = float(input())
n = int(input())
result = myPow(x, n)
print(f"{result:.5f}")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2.00000\n10", expectedOutput: "1024.00000" },
      { input: "2.10000\n3", expectedOutput: "9.26100" },
      { input: "2.00000\n-2", expectedOutput: "0.25000" }
    ],
    hiddenTestCases: [
      { input: "1.00000\n2147483647", expectedOutput: "1.00000" },
      { input: "0.00001\n2147483647", expectedOutput: "0.00000" }
    ]
  },
  {
    id: "math-multiply-strings",
    slug: "multiply-strings",
    title: "Multiply Strings",
    category: "Maths and Geometry",
    difficulty: "medium",
    description: `Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also as a string.

Simulate multiplication digit by digit. Result[i+j] and result[i+j+1] are affected by num1[i] * num2[j].`,
    inputFormat: "def multiply(num1: str, num2: str) -> str:",
    outputFormat: "Return the product as a string.",
    constraints: "1 <= num1.length, num2.length <= 200\nnum1 and num2 consist of digits only",
    starterCode: `def multiply(num1: str, num2: str) -> str:
    # Your code here
    pass

# Read input
num1 = input()
num2 = input()
print(multiply(num1, num2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\n3", expectedOutput: "6" },
      { input: "123\n456", expectedOutput: "56088" }
    ],
    hiddenTestCases: [
      { input: "0\n0", expectedOutput: "0" },
      { input: "999\n999", expectedOutput: "998001" }
    ]
  },
  {
    id: "math-detect-squares",
    slug: "detect-squares",
    title: "Detect Squares",
    category: "Maths and Geometry",
    difficulty: "medium",
    description: `Design an algorithm that:
- Adds new points to a data structure
- Counts the number of ways to form axis-aligned squares with a given point

For a query point, find all points with same x or y. For each, try to form a square.`,
    inputFormat: "Implement DetectSquares class with add and count methods",
    outputFormat: "count returns the number of valid squares.",
    constraints: "point.length == 2\n0 <= x, y <= 1000",
    starterCode: `from typing import List
from collections import defaultdict

class DetectSquares:
    def __init__(self):
        # Your code here
        pass

    def add(self, point: List[int]) -> None:
        # Your code here
        pass

    def count(self, point: List[int]) -> int:
        # Your code here
        pass

# Process operations
ds = DetectSquares()
n = int(input())
for _ in range(n):
    parts = input().split()
    if parts[0] == "add":
        ds.add([int(parts[1]), int(parts[2])])
    else:
        print(ds.count([int(parts[1]), int(parts[2])]))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "7\nadd 3 10\nadd 11 2\nadd 3 2\ncount 11 10\ncount 14 8\nadd 11 2\ncount 11 10", expectedOutput: "1\n0\n2" }
    ],
    hiddenTestCases: []
  },

  // ==================== BACKTRACKING ====================
  {
    id: "backtracking-subsets",
    slug: "subsets",
    title: "Subsets",
    category: "Backtracking",
    difficulty: "medium",
    description: `Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets.

Backtracking: for each element, choose to include or exclude it. Base case: processed all elements.`,
    inputFormat: "def subsets(nums: List[int]) -> List[List[int]]:",
    outputFormat: "Return all subsets.",
    constraints: "1 <= nums.length <= 10\n-10 <= nums[i] <= 10\nAll numbers are unique",
    starterCode: `from typing import List

def subsets(nums: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = subsets(nums)
result.sort(key=lambda x: (len(x), x))
for subset in result:
    print(" ".join(map(str, subset)) if subset else "[]")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3", expectedOutput: "[]\n1\n2\n3\n1 2\n1 3\n2 3\n1 2 3" },
      { input: "0", expectedOutput: "[]\n0" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "[]\n1" }
    ]
  },
  {
    id: "backtracking-combination-sum",
    slug: "combination-sum",
    title: "Combination Sum",
    category: "Backtracking",
    difficulty: "medium",
    description: `Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.

The same number may be chosen unlimited number of times.

Backtracking with option to include same element again or move to next.`,
    inputFormat: "def combinationSum(candidates: List[int], target: int) -> List[List[int]]:",
    outputFormat: "Return all unique combinations that sum to target.",
    constraints: "1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\n1 <= target <= 40",
    starterCode: `from typing import List

def combinationSum(candidates: List[int], target: int) -> List[List[int]]:
    # Your code here
    pass

# Read input
candidates = list(map(int, input().split()))
target = int(input())
result = combinationSum(candidates, target)
result.sort()
for combo in result:
    print(" ".join(map(str, combo)))
if not result:
    print("empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 3 6 7\n7", expectedOutput: "2 2 3\n7" },
      { input: "2 3 5\n8", expectedOutput: "2 2 2 2\n2 3 3\n3 5" },
      { input: "2\n1", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "1\n2", expectedOutput: "1 1" }
    ]
  },
  {
    id: "backtracking-permutations",
    slug: "permutations",
    title: "Permutations",
    category: "Backtracking",
    difficulty: "medium",
    description: `Given an array nums of distinct integers, return all the possible permutations.

Backtracking: choose each unused element as the next in the permutation.`,
    inputFormat: "def permute(nums: List[int]) -> List[List[int]]:",
    outputFormat: "Return all permutations.",
    constraints: "1 <= nums.length <= 6\n-10 <= nums[i] <= 10\nAll integers are unique",
    starterCode: `from typing import List

def permute(nums: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = permute(nums)
result.sort()
for perm in result:
    print(" ".join(map(str, perm)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3", expectedOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1" },
      { input: "0 1", expectedOutput: "0 1\n1 0" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2", expectedOutput: "1 2\n2 1" }
    ]
  },
  {
    id: "backtracking-subsets-ii",
    slug: "subsets-ii",
    title: "Subsets II",
    category: "Backtracking",
    difficulty: "medium",
    description: `Given an integer array nums that may contain duplicates, return all possible subsets. The solution set must not contain duplicate subsets.

Sort the array first. Skip duplicates at the same level of recursion.`,
    inputFormat: "def subsetsWithDup(nums: List[int]) -> List[List[int]]:",
    outputFormat: "Return all unique subsets.",
    constraints: "1 <= nums.length <= 10\n-10 <= nums[i] <= 10",
    starterCode: `from typing import List

def subsetsWithDup(nums: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = subsetsWithDup(nums)
result.sort(key=lambda x: (len(x), x))
for subset in result:
    print(" ".join(map(str, subset)) if subset else "[]")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 2", expectedOutput: "[]\n1\n2\n1 2\n2 2\n1 2 2" },
      { input: "0", expectedOutput: "[]\n0" }
    ],
    hiddenTestCases: [
      { input: "1 1", expectedOutput: "[]\n1\n1 1" }
    ]
  },
  {
    id: "backtracking-combination-sum-ii",
    slug: "combination-sum-ii",
    title: "Combination Sum II",
    category: "Backtracking",
    difficulty: "medium",
    description: `Given a collection of candidate numbers and a target, find all unique combinations where candidates sum to target. Each number may only be used once.

Sort first, then skip duplicates at each recursion level.`,
    inputFormat: "def combinationSum2(candidates: List[int], target: int) -> List[List[int]]:",
    outputFormat: "Return all unique combinations.",
    constraints: "1 <= candidates.length <= 100\n1 <= candidates[i] <= 50\n1 <= target <= 30",
    starterCode: `from typing import List

def combinationSum2(candidates: List[int], target: int) -> List[List[int]]:
    # Your code here
    pass

# Read input
candidates = list(map(int, input().split()))
target = int(input())
result = combinationSum2(candidates, target)
result.sort()
for combo in result:
    print(" ".join(map(str, combo)))
if not result:
    print("empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "10 1 2 7 6 1 5\n8", expectedOutput: "1 1 6\n1 2 5\n1 7\n2 6" },
      { input: "2 5 2 1 2\n5", expectedOutput: "1 2 2\n5" }
    ],
    hiddenTestCases: [
      { input: "1 1 1 1 1\n3", expectedOutput: "1 1 1" }
    ]
  },
  {
    id: "backtracking-word-search",
    slug: "word-search",
    title: "Word Search",
    category: "Backtracking",
    difficulty: "medium",
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically).

DFS from each cell. Mark visited cells temporarily. Backtrack by unmarking.`,
    inputFormat: "def exist(board: List[List[str]], word: str) -> bool:",
    outputFormat: "Return True if word exists in the grid.",
    constraints: "m == board.length\nn == board[i].length\n1 <= m, n <= 6\n1 <= word.length <= 15",
    starterCode: `from typing import List

def exist(board: List[List[str]], word: str) -> bool:
    # Your code here
    pass

# Read input
m = int(input())
board = []
for _ in range(m):
    board.append(list(input().split()))
word = input()
print(exist(board, word))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\nA B C E\nS F C S\nA D E E\nABCCED", expectedOutput: "True" },
      { input: "3\nA B C E\nS F C S\nA D E E\nSEE", expectedOutput: "True" },
      { input: "3\nA B C E\nS F C S\nA D E E\nABCB", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1\nA\nA", expectedOutput: "True" },
      { input: "1\nA\nB", expectedOutput: "False" }
    ]
  },
  {
    id: "backtracking-palindrome-partition",
    slug: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    category: "Backtracking",
    difficulty: "medium",
    description: `Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning.

Backtracking: try each prefix. If palindrome, recurse on suffix.`,
    inputFormat: "def partition(s: str) -> List[List[str]]:",
    outputFormat: "Return all palindrome partitions.",
    constraints: "1 <= s.length <= 16\ns contains only lowercase English letters",
    starterCode: `from typing import List

def partition(s: str) -> List[List[str]]:
    # Your code here
    pass

# Read input
s = input()
result = partition(s)
for part in result:
    print(" ".join(part))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "aab", expectedOutput: "a a b\naa b" },
      { input: "a", expectedOutput: "a" }
    ],
    hiddenTestCases: [
      { input: "aa", expectedOutput: "a a\naa" }
    ]
  },
  {
    id: "backtracking-letter-combinations",
    slug: "letter-combinations-phone-number",
    title: "Letter Combinations of a Phone Number",
    category: "Backtracking",
    difficulty: "medium",
    description: `Given a string containing digits from 2-9, return all possible letter combinations that the number could represent (phone keypad mapping).

Backtracking: for each digit, try each letter it maps to.`,
    inputFormat: "def letterCombinations(digits: str) -> List[str]:",
    outputFormat: "Return all possible letter combinations.",
    constraints: "0 <= digits.length <= 4\ndigits[i] is a digit in the range ['2', '9']",
    starterCode: `from typing import List

def letterCombinations(digits: str) -> List[str]:
    # Your code here
    pass

# Read input
digits = input()
result = letterCombinations(digits)
print(" ".join(sorted(result)) if result else "empty")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "23", expectedOutput: "ad ae af bd be bf cd ce cf" },
      { input: "", expectedOutput: "empty" },
      { input: "2", expectedOutput: "a b c" }
    ],
    hiddenTestCases: [
      { input: "9", expectedOutput: "w x y z" }
    ]
  },
  {
    id: "backtracking-n-queens",
    slug: "n-queens",
    title: "N Queens",
    category: "Backtracking",
    difficulty: "hard",
    description: `Place n queens on an n x n chessboard such that no two queens attack each other.

Return all distinct solutions.

Backtracking with sets to track columns and diagonals under attack.`,
    inputFormat: "def solveNQueens(n: int) -> List[List[str]]:",
    outputFormat: "Return all solutions as board configurations.",
    constraints: "1 <= n <= 9",
    starterCode: `from typing import List

def solveNQueens(n: int) -> List[List[str]]:
    # Your code here
    pass

# Read input
n = int(input())
result = solveNQueens(n)
print(len(result))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4", expectedOutput: "2" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "8", expectedOutput: "92" },
      { input: "5", expectedOutput: "10" }
    ]
  },

  // ==================== GRAPHS ====================
  {
    id: "graphs-number-of-islands",
    slug: "number-of-islands",
    title: "Number of Islands",
    category: "Graphs",
    difficulty: "medium",
    description: `Given an m x n 2D binary grid representing a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.

DFS/BFS from each unvisited land cell. Mark visited cells. Count connected components.`,
    inputFormat: "def numIslands(grid: List[List[str]]) -> int:",
    outputFormat: "Return the number of islands.",
    constraints: "m == grid.length\nn == grid[i].length\n1 <= m, n <= 300",
    starterCode: `from typing import List

def numIslands(grid: List[List[str]]) -> int:
    # Your code here
    pass

# Read input
m = int(input())
grid = []
for _ in range(m):
    grid.append(list(input().split()))
print(numIslands(grid))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", expectedOutput: "1" },
      { input: "4\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "1\n0", expectedOutput: "0" }
    ]
  },
  {
    id: "graphs-max-area-island",
    slug: "max-area-of-island",
    title: "Max Area of Island",
    category: "Graphs",
    difficulty: "medium",
    description: `Given a binary matrix grid of 0's and 1's, return the area of the largest island.

An island is a group of 1's connected 4-directionally.

DFS from each land cell, counting cells. Track maximum.`,
    inputFormat: "def maxAreaOfIsland(grid: List[List[int]]) -> int:",
    outputFormat: "Return the maximum island area.",
    constraints: "m == grid.length\nn == grid[i].length\n1 <= m, n <= 50",
    starterCode: `from typing import List

def maxAreaOfIsland(grid: List[List[int]]) -> int:
    # Your code here
    pass

# Read input
m = int(input())
grid = []
for _ in range(m):
    grid.append(list(map(int, input().split())))
print(maxAreaOfIsland(grid))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n0 0 1 0 0 0 0 1 0 0 0 0 0\n0 0 0 0 0 0 0 1 1 1 0 0 0\n0 1 1 0 1 0 0 0 0 0 0 0 0\n0 1 0 0 1 1 0 0 1 0 1 0 0", expectedOutput: "6" },
      { input: "1\n0 0 0 0 0 0 0 0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" }
    ]
  },
  {
    id: "graphs-clone-graph",
    slug: "clone-graph",
    title: "Clone Graph",
    category: "Graphs",
    difficulty: "medium",
    description: `Given a reference of a node in a connected undirected graph, return a deep copy of the graph.

Use a hashmap to map original nodes to cloned nodes. BFS or DFS to traverse and clone.`,
    inputFormat: "def cloneGraph(node: Optional[Node]) -> Optional[Node]:",
    outputFormat: "Return the cloned graph.",
    constraints: "The number of nodes is in the range [0, 100]",
    starterCode: `from typing import Optional

class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node: Optional[Node]) -> Optional[Node]:
    # Your code here
    pass

# Simplified test
print("Implemented")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "", expectedOutput: "Implemented" }
    ],
    hiddenTestCases: []
  },
  {
    id: "graphs-rotting-oranges",
    slug: "rotting-oranges",
    title: "Rotting Oranges",
    category: "Graphs",
    difficulty: "medium",
    description: `In a grid, 0 = empty, 1 = fresh orange, 2 = rotten orange. Every minute, adjacent fresh oranges become rotten.

Return the minimum minutes until no fresh oranges, or -1 if impossible.

Multi-source BFS from all rotten oranges simultaneously. Count minutes.`,
    inputFormat: "def orangesRotting(grid: List[List[int]]) -> int:",
    outputFormat: "Return the minimum minutes, or -1 if impossible.",
    constraints: "m == grid.length\nn == grid[i].length\n1 <= m, n <= 10",
    starterCode: `from typing import List
from collections import deque

def orangesRotting(grid: List[List[int]]) -> int:
    # Your code here
    pass

# Read input
m = int(input())
grid = []
for _ in range(m):
    grid.append(list(map(int, input().split())))
print(orangesRotting(grid))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n2 1 1\n1 1 0\n0 1 1", expectedOutput: "4" },
      { input: "3\n2 1 1\n0 1 1\n1 0 1", expectedOutput: "-1" },
      { input: "1\n0 2", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1\n2", expectedOutput: "0" },
      { input: "1\n1", expectedOutput: "-1" }
    ]
  },
  {
    id: "graphs-course-schedule",
    slug: "course-schedule",
    title: "Course Schedule",
    category: "Graphs",
    difficulty: "medium",
    description: `There are numCourses courses labeled 0 to numCourses-1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates you must take course bi before course ai.

Return true if you can finish all courses.

Detect cycle in directed graph using DFS with visited states or topological sort.`,
    inputFormat: "def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:",
    outputFormat: "Return True if all courses can be finished.",
    constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000",
    starterCode: `from typing import List

def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
    # Your code here
    pass

# Read input
numCourses = int(input())
n = int(input())
prerequisites = []
for _ in range(n):
    a, b = map(int, input().split())
    prerequisites.append([a, b])
print(canFinish(numCourses, prerequisites))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\n1\n1 0", expectedOutput: "True" },
      { input: "2\n2\n1 0\n0 1", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1\n0", expectedOutput: "True" },
      { input: "3\n2\n0 1\n2 1", expectedOutput: "True" }
    ]
  },
  {
    id: "graphs-course-schedule-ii",
    slug: "course-schedule-ii",
    title: "Course Schedule II",
    category: "Graphs",
    difficulty: "medium",
    description: `Return the ordering of courses you should take to finish all courses. If there are multiple valid orderings, return any of them. If impossible, return an empty array.

Topological sort using DFS or Kahn's algorithm (BFS with indegrees).`,
    inputFormat: "def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:",
    outputFormat: "Return a valid course ordering, or empty array if impossible.",
    constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= numCourses * (numCourses - 1)",
    starterCode: `from typing import List
from collections import deque, defaultdict

def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    # Your code here
    pass

# Read input
numCourses = int(input())
n = int(input())
prerequisites = []
for _ in range(n):
    a, b = map(int, input().split())
    prerequisites.append([a, b])
result = findOrder(numCourses, prerequisites)
print(" ".join(map(str, result)) if result else "impossible")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\n1\n1 0", expectedOutput: "0 1" },
      { input: "4\n4\n1 0\n2 0\n3 1\n3 2", expectedOutput: "0 1 2 3" },
      { input: "1\n0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "2\n2\n0 1\n1 0", expectedOutput: "impossible" }
    ]
  },
  {
    id: "graphs-word-ladder",
    slug: "word-ladder",
    title: "Word Ladder",
    category: "Graphs",
    difficulty: "hard",
    description: `Given beginWord, endWord, and a wordList, return the number of words in the shortest transformation sequence from beginWord to endWord.

A transformation changes one letter at a time, and each transformed word must exist in the wordList.

BFS from beginWord. For each word, try all single-letter transformations.`,
    inputFormat: "def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:",
    outputFormat: "Return the length of shortest transformation sequence, or 0 if none exists.",
    constraints: "1 <= beginWord.length <= 10\nendWord.length == beginWord.length\n1 <= wordList.length <= 5000",
    starterCode: `from typing import List
from collections import deque

def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
    # Your code here
    pass

# Read input
beginWord = input()
endWord = input()
wordList = input().split()
print(ladderLength(beginWord, endWord, wordList))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hit\ncog\nhot dot dog lot log cog", expectedOutput: "5" },
      { input: "hit\ncog\nhot dot dog lot log", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "a\nc\na b c", expectedOutput: "2" }
    ]
  },

  // ==================== PRIORITY QUEUES & HEAPS ====================
  {
    id: "heap-kth-largest-stream",
    slug: "kth-largest-element-stream",
    title: "Kth Largest Element In a Stream",
    category: "Priority Queues & Heaps",
    difficulty: "easy",
    description: `Design a class to find the kth largest element in a stream.

Implement add(val) which returns the kth largest element.

Use a min-heap of size k. The root is always the kth largest.`,
    inputFormat: "Implement KthLargest class with add method",
    outputFormat: "add returns the kth largest element.",
    constraints: "1 <= k <= 10^4\n0 <= nums.length <= 10^4",
    starterCode: `from typing import List
import heapq

class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        # Your code here
        pass

    def add(self, val: int) -> int:
        # Your code here
        pass

# Process operations
k = int(input())
nums = list(map(int, input().split())) if input().strip() else []
kl = KthLargest(k, nums)
n = int(input())
for _ in range(n):
    val = int(input())
    print(kl.add(val))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n4 5 8 2\n\n5\n3\n5\n10\n9\n4", expectedOutput: "4\n5\n5\n8\n8" }
    ],
    hiddenTestCases: []
  },
  {
    id: "heap-last-stone-weight",
    slug: "last-stone-weight",
    title: "Last Stone Weight",
    category: "Priority Queues & Heaps",
    difficulty: "easy",
    description: `You are given an array of integers stones where stones[i] is the weight of the ith stone.

Repeatedly smash the two heaviest stones. If they're equal, both destroyed. Otherwise, the heavier one becomes the difference.

Use a max-heap (negate values for Python's min-heap).`,
    inputFormat: "def lastStoneWeight(stones: List[int]) -> int:",
    outputFormat: "Return the weight of the last remaining stone, or 0 if none left.",
    constraints: "1 <= stones.length <= 30\n1 <= stones[i] <= 1000",
    starterCode: `from typing import List
import heapq

def lastStoneWeight(stones: List[int]) -> int:
    # Your code here
    pass

# Read input
stones = list(map(int, input().split()))
print(lastStoneWeight(stones))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 7 4 1 8 1", expectedOutput: "1" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "2 2", expectedOutput: "0" },
      { input: "1 3", expectedOutput: "2" }
    ]
  },
  {
    id: "heap-k-closest-points",
    slug: "k-closest-points-to-origin",
    title: "K Closest Points to Origin",
    category: "Priority Queues & Heaps",
    difficulty: "medium",
    description: `Given an array of points and an integer k, return the k closest points to the origin (0, 0).

Use a max-heap of size k (store negative distances) or quickselect.`,
    inputFormat: "def kClosest(points: List[List[int]], k: int) -> List[List[int]]:",
    outputFormat: "Return k closest points in any order.",
    constraints: "1 <= k <= points.length <= 10^4",
    starterCode: `from typing import List
import heapq

def kClosest(points: List[List[int]], k: int) -> List[List[int]]:
    # Your code here
    pass

# Read input
n = int(input())
points = []
for _ in range(n):
    x, y = map(int, input().split())
    points.append([x, y])
k = int(input())
result = kClosest(points, k)
for p in sorted(result):
    print(p[0], p[1])`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n1 3\n-2 2\n2 -2\n1", expectedOutput: "-2 2" },
      { input: "2\n3 3\n5 -1\n2", expectedOutput: "3 3\n5 -1" }
    ],
    hiddenTestCases: [
      { input: "1\n0 0\n1", expectedOutput: "0 0" }
    ]
  },
  {
    id: "heap-kth-largest-array",
    slug: "kth-largest-element-array",
    title: "Kth Largest Element In An Array",
    category: "Priority Queues & Heaps",
    difficulty: "medium",
    description: `Given an integer array nums and an integer k, return the kth largest element.

Use a min-heap of size k, or quickselect for average O(n).`,
    inputFormat: "def findKthLargest(nums: List[int], k: int) -> int:",
    outputFormat: "Return the kth largest element.",
    constraints: "1 <= k <= nums.length <= 10^5",
    starterCode: `from typing import List
import heapq

def findKthLargest(nums: List[int], k: int) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
k = int(input())
print(findKthLargest(nums, k))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 2 1 5 6 4\n2", expectedOutput: "5" },
      { input: "3 2 3 1 2 4 5 5 6\n4", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "1 2 3 4 5\n1", expectedOutput: "5" }
    ]
  },
  {
    id: "heap-task-scheduler",
    slug: "task-scheduler",
    title: "Task Scheduler",
    category: "Priority Queues & Heaps",
    difficulty: "medium",
    description: `Given an array of tasks and a non-negative integer n (cooling time between same tasks), return the least number of units of time needed.

Greedy: always execute the task with the most remaining count. Use max-heap and queue for cooling.`,
    inputFormat: "def leastInterval(tasks: List[str], n: int) -> int:",
    outputFormat: "Return the minimum time units needed.",
    constraints: "1 <= tasks.length <= 10^4\n0 <= n <= 100",
    starterCode: `from typing import List
from collections import Counter
import heapq

def leastInterval(tasks: List[str], n: int) -> int:
    # Your code here
    pass

# Read input
tasks = list(input().split())
n = int(input())
print(leastInterval(tasks, n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "A A A B B B\n2", expectedOutput: "8" },
      { input: "A A A B B B\n0", expectedOutput: "6" },
      { input: "A A A A A A B C D E F G\n2", expectedOutput: "16" }
    ],
    hiddenTestCases: [
      { input: "A\n0", expectedOutput: "1" },
      { input: "A B\n2", expectedOutput: "2" }
    ]
  },
  {
    id: "heap-find-median-stream",
    slug: "find-median-from-data-stream",
    title: "Find Median From Data Stream",
    category: "Priority Queues & Heaps",
    difficulty: "hard",
    description: `Design a data structure that supports adding integers and finding the median.

Use two heaps: max-heap for lower half, min-heap for upper half. Balance sizes after each insert.`,
    inputFormat: "Implement MedianFinder class with addNum and findMedian methods",
    outputFormat: "findMedian returns the current median.",
    constraints: "-10^5 <= num <= 10^5\nThere will be at least one element before findMedian is called",
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
    op = input().split()
    if op[0] == "add":
        mf.addNum(int(op[1]))
    else:
        print(mf.findMedian())`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6\nadd 1\nadd 2\nfind\nadd 3\nfind\nadd 4", expectedOutput: "1.5\n2.0" }
    ],
    hiddenTestCases: []
  },

  // ==================== 1D DYNAMIC PROGRAMMING (Additional) ====================
  {
    id: "dp1-min-cost-climbing-stairs",
    slug: "min-cost-climbing-stairs",
    title: "Min Cost Climbing Stairs",
    category: "1D Dynamic Programming",
    difficulty: "easy",
    description: `You are given an integer array cost where cost[i] is the cost of ith step. You can start from step 0 or 1.

Return the minimum cost to reach the top of the floor.

dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])`,
    inputFormat: "def minCostClimbingStairs(cost: List[int]) -> int:",
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
      { input: "1 100 1 1 1 100 1 1 100 1", expectedOutput: "6" }
    ],
    hiddenTestCases: [
      { input: "0 0 0 0", expectedOutput: "0" },
      { input: "1 2", expectedOutput: "1" }
    ]
  },
  {
    id: "dp1-house-robber-ii",
    slug: "house-robber-ii",
    title: "House Robber II",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `All houses are arranged in a circle. Adjacent houses cannot be robbed, and the first and last houses are adjacent.

Return the maximum amount of money you can rob.

Run house robber on [0, n-2] and [1, n-1], take the max.`,
    inputFormat: "def rob(nums: List[int]) -> int:",
    outputFormat: "Return the maximum amount.",
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
      { input: "1 2", expectedOutput: "2" }
    ]
  },
  {
    id: "dp1-longest-palindromic-substring",
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `Given a string s, return the longest palindromic substring in s.

Expand around center for each character (odd and even length palindromes).`,
    inputFormat: "def longestPalindrome(s: str) -> str:",
    outputFormat: "Return the longest palindromic substring.",
    constraints: "1 <= s.length <= 1000",
    starterCode: `def longestPalindrome(s: str) -> str:
    # Your code here
    pass

# Read input
s = input()
print(longestPalindrome(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "babad", expectedOutput: "bab" },
      { input: "cbbd", expectedOutput: "bb" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "ac", expectedOutput: "a" }
    ]
  },
  {
    id: "dp1-palindromic-substrings",
    slug: "palindromic-substrings",
    title: "Palindromic Substrings",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `Given a string s, return the number of palindromic substrings in it.

Expand around each center (for both odd and even length palindromes) and count.`,
    inputFormat: "def countSubstrings(s: str) -> int:",
    outputFormat: "Return the count of palindromic substrings.",
    constraints: "1 <= s.length <= 1000",
    starterCode: `def countSubstrings(s: str) -> int:
    # Your code here
    pass

# Read input
s = input()
print(countSubstrings(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "abc", expectedOutput: "3" },
      { input: "aaa", expectedOutput: "6" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "1" },
      { input: "ab", expectedOutput: "2" }
    ]
  },
  {
    id: "dp1-decode-ways",
    slug: "decode-ways",
    title: "Decode Ways",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `A message containing letters A-Z can be encoded to numbers 1-26. Given a string s of digits, return the number of ways to decode it.

dp[i] = ways to decode first i characters. Add dp[i-1] if valid single digit, add dp[i-2] if valid two digits.`,
    inputFormat: "def numDecodings(s: str) -> int:",
    outputFormat: "Return the number of ways to decode.",
    constraints: "1 <= s.length <= 100\ns contains only digits",
    starterCode: `def numDecodings(s: str) -> int:
    # Your code here
    pass

# Read input
s = input()
print(numDecodings(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "12", expectedOutput: "2" },
      { input: "226", expectedOutput: "3" },
      { input: "06", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "10", expectedOutput: "1" },
      { input: "27", expectedOutput: "1" }
    ]
  },
  {
    id: "dp1-max-product-subarray",
    slug: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `Given an integer array nums, find a contiguous subarray that has the largest product.

Track both max and min products ending at each position (negatives can flip).`,
    inputFormat: "def maxProduct(nums: List[int]) -> int:",
    outputFormat: "Return the largest product.",
    constraints: "1 <= nums.length <= 2 * 10^4\n-10 <= nums[i] <= 10",
    starterCode: `from typing import List

def maxProduct(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(maxProduct(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 3 -2 4", expectedOutput: "6" },
      { input: "-2 0 -1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "-2", expectedOutput: "-2" },
      { input: "-2 -3", expectedOutput: "6" },
      { input: "0 2", expectedOutput: "2" }
    ]
  },
  {
    id: "dp1-word-break",
    slug: "word-break",
    title: "Word Break",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `Given a string s and a dictionary wordDict, return true if s can be segmented into dictionary words.

dp[i] = true if s[:i] can be segmented. Check all j < i: dp[i] = dp[j] and s[j:i] in wordDict.`,
    inputFormat: "def wordBreak(s: str, wordDict: List[str]) -> bool:",
    outputFormat: "Return True if s can be segmented.",
    constraints: "1 <= s.length <= 300\n1 <= wordDict.length <= 1000",
    starterCode: `from typing import List

def wordBreak(s: str, wordDict: List[str]) -> bool:
    # Your code here
    pass

# Read input
s = input()
wordDict = input().split()
print(wordBreak(s, wordDict))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "leetcode\nleet code", expectedOutput: "True" },
      { input: "applepenapple\napple pen", expectedOutput: "True" },
      { input: "catsandog\ncats dog sand and cat", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "True" },
      { input: "ab\na b", expectedOutput: "True" }
    ]
  },
  {
    id: "dp1-longest-increasing-subsequence",
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.

O(n^2): dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i].
O(n log n): Use binary search with a tails array.`,
    inputFormat: "def lengthOfLIS(nums: List[int]) -> int:",
    outputFormat: "Return the length of the longest increasing subsequence.",
    constraints: "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
    starterCode: `from typing import List

def lengthOfLIS(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(lengthOfLIS(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "10 9 2 5 3 7 101 18", expectedOutput: "4" },
      { input: "0 1 0 3 2 3", expectedOutput: "4" },
      { input: "7 7 7 7 7 7 7", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2 3 4 5", expectedOutput: "5" }
    ]
  },
  {
    id: "dp1-partition-equal-subset-sum",
    slug: "partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    category: "1D Dynamic Programming",
    difficulty: "medium",
    description: `Given an integer array nums, return true if you can partition the array into two subsets with equal sum.

This is a 0/1 knapsack problem where target = sum/2. dp[j] = true if sum j is achievable.`,
    inputFormat: "def canPartition(nums: List[int]) -> bool:",
    outputFormat: "Return True if partition is possible.",
    constraints: "1 <= nums.length <= 200\n1 <= nums[i] <= 100",
    starterCode: `from typing import List

def canPartition(nums: List[int]) -> bool:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(canPartition(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 5 11 5", expectedOutput: "True" },
      { input: "1 2 3 5", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1 1", expectedOutput: "True" },
      { input: "1 2 5", expectedOutput: "False" }
    ]
  },

  // ==================== 2D DYNAMIC PROGRAMMING ====================
  {
    id: "dp2-unique-paths",
    slug: "unique-paths",
    title: "Unique Paths",
    category: "2D Dynamic Programming",
    difficulty: "medium",
    description: `A robot is on an m x n grid. It can only move right or down. How many unique paths are there to reach the bottom-right corner from the top-left?

dp[i][j] = dp[i-1][j] + dp[i][j-1]. Or use math: C(m+n-2, n-1).`,
    inputFormat: "def uniquePaths(m: int, n: int) -> int:",
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
      { input: "3 2", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1 1", expectedOutput: "1" },
      { input: "7 3", expectedOutput: "28" }
    ]
  },
  {
    id: "dp2-longest-common-subsequence",
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    category: "2D Dynamic Programming",
    difficulty: "medium",
    description: `Given two strings text1 and text2, return the length of their longest common subsequence.

dp[i][j] = LCS of text1[:i] and text2[:j].
If chars match: dp[i][j] = dp[i-1][j-1] + 1. Else: max(dp[i-1][j], dp[i][j-1]).`,
    inputFormat: "def longestCommonSubsequence(text1: str, text2: str) -> int:",
    outputFormat: "Return the length of LCS.",
    constraints: "1 <= text1.length, text2.length <= 1000",
    starterCode: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    # Your code here
    pass

# Read input
text1 = input()
text2 = input()
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
      { input: "a\nb", expectedOutput: "0" }
    ]
  },
  {
    id: "dp2-buy-sell-stock-cooldown",
    slug: "best-time-buy-sell-stock-cooldown",
    title: "Best Time to Buy And Sell Stock With Cooldown",
    category: "2D Dynamic Programming",
    difficulty: "medium",
    description: `You can buy and sell a stock multiple times with a 1-day cooldown after selling.

Track three states: holding stock, sold today (cooldown), not holding (can buy).`,
    inputFormat: "def maxProfit(prices: List[int]) -> int:",
    outputFormat: "Return the maximum profit.",
    constraints: "1 <= prices.length <= 5000",
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
      { input: "1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2", expectedOutput: "1" },
      { input: "2 1", expectedOutput: "0" }
    ]
  },
  {
    id: "dp2-coin-change-ii",
    slug: "coin-change-ii",
    title: "Coin Change II",
    category: "2D Dynamic Programming",
    difficulty: "medium",
    description: `Return the number of combinations that make up the amount using coins.

dp[i][j] = ways to make amount j using first i coin types.
dp[i][j] = dp[i-1][j] + dp[i][j-coins[i-1]]`,
    inputFormat: "def change(amount: int, coins: List[int]) -> int:",
    outputFormat: "Return the number of combinations.",
    constraints: "1 <= coins.length <= 300\n0 <= amount <= 5000",
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
      { input: "1\n1", expectedOutput: "1" }
    ]
  },
  {
    id: "dp2-target-sum",
    slug: "target-sum",
    title: "Target Sum",
    category: "2D Dynamic Programming",
    difficulty: "medium",
    description: `Given an array nums and a target, return the number of ways to assign + or - to make the sum equal to target.

Convert to subset sum: find count of subsets with sum = (total + target) / 2.`,
    inputFormat: "def findTargetSumWays(nums: List[int], target: int) -> int:",
    outputFormat: "Return the number of ways.",
    constraints: "1 <= nums.length <= 20\n0 <= nums[i] <= 1000\n-1000 <= target <= 1000",
    starterCode: `from typing import List

def findTargetSumWays(nums: List[int], target: int) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
target = int(input())
print(findTargetSumWays(nums, target))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 1 1 1 1\n3", expectedOutput: "5" },
      { input: "1\n1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "0 0 0 0 0\n0", expectedOutput: "32" }
    ]
  },
  {
    id: "dp2-edit-distance",
    slug: "edit-distance",
    title: "Edit Distance",
    category: "2D Dynamic Programming",
    difficulty: "medium",
    description: `Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) to convert word1 to word2.

dp[i][j] = min operations to convert word1[:i] to word2[:j].
If chars match: dp[i-1][j-1]. Else: 1 + min(insert, delete, replace).`,
    inputFormat: "def minDistance(word1: str, word2: str) -> int:",
    outputFormat: "Return the minimum edit distance.",
    constraints: "0 <= word1.length, word2.length <= 500",
    starterCode: `def minDistance(word1: str, word2: str) -> int:
    # Your code here
    pass

# Read input
word1 = input()
word2 = input()
print(minDistance(word1, word2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "horse\nros", expectedOutput: "3" },
      { input: "intention\nexecution", expectedOutput: "5" }
    ],
    hiddenTestCases: [
      { input: "\n", expectedOutput: "0" },
      { input: "a\n", expectedOutput: "1" },
      { input: "\na", expectedOutput: "1" }
    ]
  },

  // ==================== GREEDY ====================
  {
    id: "greedy-jump-game",
    slug: "jump-game",
    title: "Jump Game",
    category: "Greedy",
    difficulty: "medium",
    description: `Given an array nums where nums[i] is the maximum jump length from index i, return true if you can reach the last index.

Greedy: track the farthest reachable index. If current index > farthest, return false.`,
    inputFormat: "def canJump(nums: List[int]) -> bool:",
    outputFormat: "Return True if you can reach the last index.",
    constraints: "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5",
    starterCode: `from typing import List

def canJump(nums: List[int]) -> bool:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(canJump(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 3 1 1 4", expectedOutput: "True" },
      { input: "3 2 1 0 4", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "True" },
      { input: "1 0", expectedOutput: "True" },
      { input: "0 1", expectedOutput: "False" }
    ]
  },
  {
    id: "greedy-jump-game-ii",
    slug: "jump-game-ii",
    title: "Jump Game II",
    category: "Greedy",
    difficulty: "medium",
    description: `Given an array nums, return the minimum number of jumps to reach the last index. You can always reach the last index.

Greedy BFS: count jumps at each "level" (range of reachable indices).`,
    inputFormat: "def jump(nums: List[int]) -> int:",
    outputFormat: "Return the minimum number of jumps.",
    constraints: "1 <= nums.length <= 10^4\n0 <= nums[i] <= 1000",
    starterCode: `from typing import List

def jump(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(jump(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 3 1 1 4", expectedOutput: "2" },
      { input: "2 3 0 1 4", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1 2", expectedOutput: "1" }
    ]
  },
  {
    id: "greedy-gas-station",
    slug: "gas-station",
    title: "Gas Station",
    category: "Greedy",
    difficulty: "medium",
    description: `There are n gas stations in a circle. You start with an empty tank at some station and want to complete the circuit.

If total gas >= total cost, a solution exists. Find the starting point where tank never goes negative.`,
    inputFormat: "def canCompleteCircuit(gas: List[int], cost: List[int]) -> int:",
    outputFormat: "Return the starting station index, or -1 if impossible.",
    constraints: "n == gas.length == cost.length\n1 <= n <= 10^5",
    starterCode: `from typing import List

def canCompleteCircuit(gas: List[int], cost: List[int]) -> int:
    # Your code here
    pass

# Read input
gas = list(map(int, input().split()))
cost = list(map(int, input().split()))
print(canCompleteCircuit(gas, cost))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n3 4 5 1 2", expectedOutput: "3" },
      { input: "2 3 4\n3 4 3", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "5\n4", expectedOutput: "0" },
      { input: "1 2\n2 1", expectedOutput: "1" }
    ]
  },
  {
    id: "greedy-hand-of-straights",
    slug: "hand-of-straights",
    title: "Hand of Straights",
    category: "Greedy",
    difficulty: "medium",
    description: `Given an array hand and a group size groupSize, return true if you can rearrange the hand into groups of consecutive cards.

Sort and greedily form groups starting from the smallest card.`,
    inputFormat: "def isNStraightHand(hand: List[int], groupSize: int) -> bool:",
    outputFormat: "Return True if possible to form groups.",
    constraints: "1 <= hand.length <= 10^4\n0 <= hand[i] <= 10^9\n1 <= groupSize <= hand.length",
    starterCode: `from typing import List
from collections import Counter

def isNStraightHand(hand: List[int], groupSize: int) -> bool:
    # Your code here
    pass

# Read input
hand = list(map(int, input().split()))
groupSize = int(input())
print(isNStraightHand(hand, groupSize))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 6 2 3 4 7 8\n3", expectedOutput: "True" },
      { input: "1 2 3 4 5\n4", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "True" },
      { input: "1 2 3 4 5 6\n2", expectedOutput: "False" }
    ]
  },
  {
    id: "greedy-partition-labels",
    slug: "partition-labels",
    title: "Partition Labels",
    category: "Greedy",
    difficulty: "medium",
    description: `Partition the string into as many parts as possible so that each letter appears in at most one part.

For each character, find its last occurrence. Extend current partition to include all last occurrences.`,
    inputFormat: "def partitionLabels(s: str) -> List[int]:",
    outputFormat: "Return a list of partition sizes.",
    constraints: "1 <= s.length <= 500\ns consists of lowercase English letters",
    starterCode: `from typing import List

def partitionLabels(s: str) -> List[int]:
    # Your code here
    pass

# Read input
s = input()
result = partitionLabels(s)
print(" ".join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ababcbacadefegdehijhklij", expectedOutput: "9 7 8" },
      { input: "eccbbbbdec", expectedOutput: "10" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "1" },
      { input: "abc", expectedOutput: "1 1 1" }
    ]
  },
  {
    id: "greedy-valid-parenthesis-string",
    slug: "valid-parenthesis-string",
    title: "Valid Parenthesis String",
    category: "Greedy",
    difficulty: "medium",
    description: `Given a string containing '(', ')' and '*', where '*' can be '(' or ')' or empty, return true if the string is valid.

Track min and max possible open count. Valid if 0 is within [min, max] at the end.`,
    inputFormat: "def checkValidString(s: str) -> bool:",
    outputFormat: "Return True if the string can be valid.",
    constraints: "1 <= s.length <= 100",
    starterCode: `def checkValidString(s: str) -> bool:
    # Your code here
    pass

# Read input
s = input()
print(checkValidString(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "()", expectedOutput: "True" },
      { input: "(*)", expectedOutput: "True" },
      { input: "(*))", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "*", expectedOutput: "True" },
      { input: "(", expectedOutput: "False" },
      { input: ")", expectedOutput: "False" }
    ]
  },

  // ==================== INTERVALS ====================
  {
    id: "intervals-insert",
    slug: "insert-interval",
    title: "Insert Interval",
    category: "Intervals",
    difficulty: "medium",
    description: `Given a list of non-overlapping intervals sorted by start time and a new interval, insert the new interval and merge if necessary.

Add non-overlapping intervals before new interval. Merge overlapping intervals. Add remaining intervals.`,
    inputFormat: "def insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:",
    outputFormat: "Return the new list of intervals.",
    constraints: "0 <= intervals.length <= 10^4\nintervals[i].length == 2",
    starterCode: `from typing import List

def insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
n = int(input())
intervals = []
for _ in range(n):
    a, b = map(int, input().split())
    intervals.append([a, b])
start, end = map(int, input().split())
result = insert(intervals, [start, end])
for interval in result:
    print(interval[0], interval[1])`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\n1 2\n3 5\n6 7\n8 10\n12 16\n4 8", expectedOutput: "1 2\n3 10\n12 16" },
      { input: "2\n1 3\n6 9\n2 5", expectedOutput: "1 5\n6 9" }
    ],
    hiddenTestCases: [
      { input: "0\n5 7", expectedOutput: "5 7" },
      { input: "1\n1 5\n2 3", expectedOutput: "1 5" }
    ]
  },
  {
    id: "intervals-merge",
    slug: "merge-intervals",
    title: "Merge Intervals",
    category: "Intervals",
    difficulty: "medium",
    description: `Given an array of intervals, merge all overlapping intervals.

Sort by start time. Merge consecutive intervals if they overlap (current.start <= prev.end).`,
    inputFormat: "def merge(intervals: List[List[int]]) -> List[List[int]]:",
    outputFormat: "Return the merged intervals.",
    constraints: "1 <= intervals.length <= 10^4",
    starterCode: `from typing import List

def merge(intervals: List[List[int]]) -> List[List[int]]:
    # Your code here
    pass

# Read input
n = int(input())
intervals = []
for _ in range(n):
    a, b = map(int, input().split())
    intervals.append([a, b])
result = merge(intervals)
for interval in result:
    print(interval[0], interval[1])`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", expectedOutput: "1 6\n8 10\n15 18" },
      { input: "2\n1 4\n4 5", expectedOutput: "1 5" }
    ],
    hiddenTestCases: [
      { input: "1\n1 2", expectedOutput: "1 2" }
    ]
  },
  {
    id: "intervals-non-overlapping",
    slug: "non-overlapping-intervals",
    title: "Non Overlapping Intervals",
    category: "Intervals",
    difficulty: "medium",
    description: `Given an array of intervals, return the minimum number of intervals to remove to make the rest non-overlapping.

Sort by end time. Greedily keep intervals with earliest end times (activity selection).`,
    inputFormat: "def eraseOverlapIntervals(intervals: List[List[int]]) -> int:",
    outputFormat: "Return the minimum number of intervals to remove.",
    constraints: "1 <= intervals.length <= 10^5",
    starterCode: `from typing import List

def eraseOverlapIntervals(intervals: List[List[int]]) -> int:
    # Your code here
    pass

# Read input
n = int(input())
intervals = []
for _ in range(n):
    a, b = map(int, input().split())
    intervals.append([a, b])
print(eraseOverlapIntervals(intervals))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n1 2\n2 3\n3 4\n1 3", expectedOutput: "1" },
      { input: "3\n1 2\n1 2\n1 2", expectedOutput: "2" },
      { input: "2\n1 2\n2 3", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1\n1 2", expectedOutput: "0" }
    ]
  },
  {
    id: "intervals-meeting-rooms",
    slug: "meeting-rooms",
    title: "Meeting Rooms",
    category: "Intervals",
    difficulty: "easy",
    description: `Given an array of meeting time intervals, determine if a person could attend all meetings.

Sort by start time. Check if any meeting starts before the previous one ends.`,
    inputFormat: "def canAttendMeetings(intervals: List[List[int]]) -> bool:",
    outputFormat: "Return True if a person can attend all meetings.",
    constraints: "0 <= intervals.length <= 10^4",
    starterCode: `from typing import List

def canAttendMeetings(intervals: List[List[int]]) -> bool:
    # Your code here
    pass

# Read input
n = int(input())
intervals = []
for _ in range(n):
    a, b = map(int, input().split())
    intervals.append([a, b])
print(canAttendMeetings(intervals))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n0 30\n5 10\n15 20", expectedOutput: "False" },
      { input: "2\n7 10\n2 4", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "True" },
      { input: "1\n1 2", expectedOutput: "True" }
    ]
  },
  {
    id: "intervals-meeting-rooms-ii",
    slug: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    category: "Intervals",
    difficulty: "medium",
    description: `Given an array of meeting time intervals, find the minimum number of conference rooms required.

Use a min-heap of end times, or sort start and end times separately and use two pointers.`,
    inputFormat: "def minMeetingRooms(intervals: List[List[int]]) -> int:",
    outputFormat: "Return the minimum number of conference rooms.",
    constraints: "1 <= intervals.length <= 10^4",
    starterCode: `from typing import List
import heapq

def minMeetingRooms(intervals: List[List[int]]) -> int:
    # Your code here
    pass

# Read input
n = int(input())
intervals = []
for _ in range(n):
    a, b = map(int, input().split())
    intervals.append([a, b])
print(minMeetingRooms(intervals))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n0 30\n5 10\n15 20", expectedOutput: "2" },
      { input: "2\n7 10\n2 4", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1\n1 2", expectedOutput: "1" },
      { input: "4\n0 1\n1 2\n2 3\n3 4", expectedOutput: "1" }
    ]
  },

  // ==================== BIT MANIPULATION ====================
  {
    id: "bit-number-of-1-bits",
    slug: "number-of-1-bits",
    title: "Number of 1 Bits",
    category: "Bit Manipulation",
    difficulty: "easy",
    description: `Write a function that takes an unsigned integer and returns the number of '1' bits (Hamming weight).

Count 1 bits: n & (n-1) removes the lowest set bit. Count iterations.`,
    inputFormat: "def hammingWeight(n: int) -> int:",
    outputFormat: "Return the number of 1 bits.",
    constraints: "The input is a 32-bit unsigned integer",
    starterCode: `def hammingWeight(n: int) -> int:
    # Your code here
    pass

# Read input
n = int(input())
print(hammingWeight(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "11", expectedOutput: "3" },
      { input: "128", expectedOutput: "1" },
      { input: "4294967293", expectedOutput: "31" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" },
      { input: "255", expectedOutput: "8" }
    ]
  },
  {
    id: "bit-counting-bits",
    slug: "counting-bits",
    title: "Counting Bits",
    category: "Bit Manipulation",
    difficulty: "easy",
    description: `Given an integer n, return an array where ans[i] is the number of 1's in the binary representation of i for 0 <= i <= n.

DP: dp[i] = dp[i >> 1] + (i & 1), or dp[i] = dp[i & (i-1)] + 1.`,
    inputFormat: "def countBits(n: int) -> List[int]:",
    outputFormat: "Return an array of 1-bit counts.",
    constraints: "0 <= n <= 10^5",
    starterCode: `from typing import List

def countBits(n: int) -> List[int]:
    # Your code here
    pass

# Read input
n = int(input())
result = countBits(n)
print(" ".join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2", expectedOutput: "0 1 1" },
      { input: "5", expectedOutput: "0 1 1 2 1 2" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "0 1" }
    ]
  },
  {
    id: "bit-reverse-bits",
    slug: "reverse-bits",
    title: "Reverse Bits",
    category: "Bit Manipulation",
    difficulty: "easy",
    description: `Reverse bits of a given 32 bits unsigned integer.

Process each bit: shift result left, add lowest bit of n, shift n right.`,
    inputFormat: "def reverseBits(n: int) -> int:",
    outputFormat: "Return the reversed integer.",
    constraints: "The input is a 32-bit unsigned integer",
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
      { input: "4294967293", expectedOutput: "3221225471" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "2147483648" }
    ]
  },
  {
    id: "bit-missing-number",
    slug: "missing-number",
    title: "Missing Number",
    category: "Bit Manipulation",
    difficulty: "easy",
    description: `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing.

XOR all numbers with all indices (0 to n). Pairs cancel out leaving the missing number.`,
    inputFormat: "def missingNumber(nums: List[int]) -> int:",
    outputFormat: "Return the missing number.",
    constraints: "n == nums.length\n1 <= n <= 10^4\nAll numbers are unique",
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
      { input: "1", expectedOutput: "0" }
    ]
  },
  {
    id: "bit-sum-two-integers",
    slug: "sum-of-two-integers",
    title: "Sum of Two Integers",
    category: "Bit Manipulation",
    difficulty: "medium",
    description: `Given two integers a and b, return their sum without using + or -.

Use bitwise operations: XOR gives sum without carry, AND shifted left gives carry. Repeat until no carry.`,
    inputFormat: "def getSum(a: int, b: int) -> int:",
    outputFormat: "Return a + b.",
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
      { input: "2 3", expectedOutput: "5" }
    ],
    hiddenTestCases: [
      { input: "0 0", expectedOutput: "0" },
      { input: "-1 1", expectedOutput: "0" }
    ]
  },
  {
    id: "bit-reverse-integer",
    slug: "reverse-integer",
    title: "Reverse Integer",
    category: "Bit Manipulation",
    difficulty: "medium",
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing causes overflow, return 0.

Pop digits from x, push to result. Check overflow before each push.`,
    inputFormat: "def reverse(x: int) -> int:",
    outputFormat: "Return the reversed integer, or 0 if overflow.",
    constraints: "-2^31 <= x <= 2^31 - 1",
    starterCode: `def reverse(x: int) -> int:
    # Your code here
    pass

# Read input
x = int(input())
print(reverse(x))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "123", expectedOutput: "321" },
      { input: "-123", expectedOutput: "-321" },
      { input: "120", expectedOutput: "21" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1534236469", expectedOutput: "0" }
    ]
  }
];

export const DSA_PROBLEMS_TOTAL = dsaProblemsData.length;
