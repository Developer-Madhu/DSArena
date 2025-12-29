// Python Learning Track - Comprehensive coding problems organized by category

import { ProblemData } from './problemsData';

export const pythonProblemsData: ProblemData[] = [
  // ============================================================================
  // 🐍 1. PYTHON CORE (Coding Only)
  // ============================================================================
  
  // 🟢 Easy - Python Core
  {
    id: "python-core-reverse-number",
    slug: "reverse-number",
    title: "Reverse a Number Without Built-in Functions",
    category: "Python Core",
    difficulty: "easy",
    description: `Reverse the digits of an integer without using built-in functions like str() or reversed().

**Example:** Given n = 12345, return 54321.

Use mathematical operations (modulo and division) to extract and rebuild the number.`,
    inputFormat: "def reverseNumber(n: int) -> int:",
    outputFormat: "Return the reversed number. For negative numbers, reverse the digits and keep the sign.",
    constraints: "-10^9 <= n <= 10^9",
    starterCode: `def reverseNumber(n: int) -> int:
    # Your code here - don't use str() or reversed()
    pass

# Read input
n = int(input())
print(reverseNumber(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "12345", expectedOutput: "54321" },
      { input: "1000", expectedOutput: "1" },
      { input: "-123", expectedOutput: "-321" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "7", expectedOutput: "7" },
      { input: "100200", expectedOutput: "2001" },
      { input: "-1000", expectedOutput: "-1" },
      { input: "123456789", expectedOutput: "987654321" }
    ]
  },
  {
    id: "python-core-check-prime",
    slug: "check-prime",
    title: "Check if a Number is Prime",
    category: "Python Core",
    difficulty: "easy",
    description: `Determine whether a given number is prime.

**Example:** Given n = 7, return True because 7 is only divisible by 1 and itself.

A prime number is greater than 1 and has no divisors other than 1 and itself.`,
    inputFormat: "def isPrime(n: int) -> bool:",
    outputFormat: "Return True if n is prime, False otherwise.",
    constraints: "0 <= n <= 10^6",
    starterCode: `def isPrime(n: int) -> bool:
    # Your code here
    pass

# Read input
n = int(input())
print(isPrime(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "7", expectedOutput: "True" },
      { input: "4", expectedOutput: "False" },
      { input: "2", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "False" },
      { input: "1", expectedOutput: "False" },
      { input: "97", expectedOutput: "True" },
      { input: "100", expectedOutput: "False" },
      { input: "104729", expectedOutput: "True" }
    ]
  },
  {
    id: "python-core-factorial",
    slug: "factorial-iterative-recursive",
    title: "Find Factorial (Iterative & Recursive)",
    category: "Python Core",
    difficulty: "easy",
    description: `Calculate the factorial of a number using both iterative and recursive approaches.

**Example:** Given n = 5, return 120 because 5! = 5 × 4 × 3 × 2 × 1 = 120.

Return the result as: "iterative_result recursive_result"`,
    inputFormat: "def factorial(n: int) -> str:",
    outputFormat: "Return both results as 'iterative_result recursive_result'",
    constraints: "0 <= n <= 12",
    starterCode: `def factorialIterative(n: int) -> int:
    # Your iterative solution here
    pass

def factorialRecursive(n: int) -> int:
    # Your recursive solution here
    pass

# Read input
n = int(input())
print(f"{factorialIterative(n)} {factorialRecursive(n)}")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5", expectedOutput: "120 120" },
      { input: "0", expectedOutput: "1 1" },
      { input: "3", expectedOutput: "6 6" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1 1" },
      { input: "10", expectedOutput: "3628800 3628800" },
      { input: "7", expectedOutput: "5040 5040" },
      { input: "12", expectedOutput: "479001600 479001600" },
      { input: "2", expectedOutput: "2 2" }
    ]
  },
  {
    id: "python-core-char-frequency",
    slug: "character-frequency",
    title: "Count Frequency of Characters",
    category: "Python Core",
    difficulty: "easy",
    description: `Count the frequency of each character in a string and return as sorted output.

**Example:** Given s = "aabbcc", return "a:2 b:2 c:2".

Output should be sorted alphabetically by character.`,
    inputFormat: "def charFrequency(s: str) -> str:",
    outputFormat: "Return frequencies as 'char:count' pairs separated by spaces, sorted alphabetically.",
    constraints: "1 <= len(s) <= 10^4\ns contains only lowercase letters",
    starterCode: `def charFrequency(s: str) -> str:
    # Your code here
    pass

# Read input
s = input()
print(charFrequency(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "aabbcc", expectedOutput: "a:2 b:2 c:2" },
      { input: "hello", expectedOutput: "e:1 h:1 l:2 o:1" },
      { input: "a", expectedOutput: "a:1" }
    ],
    hiddenTestCases: [
      { input: "zzz", expectedOutput: "z:3" },
      { input: "abcabc", expectedOutput: "a:2 b:2 c:2" },
      { input: "programming", expectedOutput: "a:1 g:2 i:1 m:2 n:1 o:1 p:1 r:2" },
      { input: "aaa", expectedOutput: "a:3" },
      { input: "xyz", expectedOutput: "x:1 y:1 z:1" }
    ]
  },
  {
    id: "python-core-swap-without-temp",
    slug: "swap-without-temp",
    title: "Swap Two Numbers Without Temp Variable",
    category: "Python Core",
    difficulty: "easy",
    description: `Swap two numbers without using a temporary variable.

**Example:** Given a = 5 and b = 10, after swapping: a = 10 and b = 5.

You can use arithmetic operations or XOR.`,
    inputFormat: "def swap(a: int, b: int) -> tuple:",
    outputFormat: "Return the swapped values as 'b a' (original b first, then original a).",
    constraints: "-10^9 <= a, b <= 10^9",
    starterCode: `def swap(a: int, b: int) -> str:
    # Your code here - don't use a temp variable
    pass

# Read input
a, b = map(int, input().split())
print(swap(a, b))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 10", expectedOutput: "10 5" },
      { input: "1 2", expectedOutput: "2 1" },
      { input: "0 100", expectedOutput: "100 0" }
    ],
    hiddenTestCases: [
      { input: "-5 5", expectedOutput: "5 -5" },
      { input: "0 0", expectedOutput: "0 0" },
      { input: "1000000 -1000000", expectedOutput: "-1000000 1000000" },
      { input: "42 42", expectedOutput: "42 42" },
      { input: "-100 -200", expectedOutput: "-200 -100" }
    ]
  },

  // 🟡 Medium - Python Core
  {
    id: "python-core-find-duplicates",
    slug: "find-duplicate-elements",
    title: "Find Duplicate Elements in a List",
    category: "Python Core",
    difficulty: "medium",
    description: `Find all duplicate elements in a list.

**Example:** Given nums = [1, 2, 3, 2, 1, 4], return [1, 2] (sorted).

Return duplicates in sorted order.`,
    inputFormat: "def findDuplicates(nums: List[int]) -> List[int]:",
    outputFormat: "Return sorted list of duplicate elements.",
    constraints: "1 <= len(nums) <= 10^5\n-10^6 <= nums[i] <= 10^6",
    starterCode: `from typing import List

def findDuplicates(nums: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = findDuplicates(nums)
print(' '.join(map(str, result)) if result else 'None')`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 2 1 4", expectedOutput: "1 2" },
      { input: "1 2 3 4 5", expectedOutput: "None" },
      { input: "1 1 1 1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "5 5 5 5 5", expectedOutput: "5" },
      { input: "1 2 1 2 1 2", expectedOutput: "1 2" },
      { input: "10 20 30", expectedOutput: "None" },
      { input: "-1 -1 2 2", expectedOutput: "-1 2" },
      { input: "1", expectedOutput: "None" }
    ]
  },
  {
    id: "python-core-remove-duplicates-order",
    slug: "remove-duplicates-maintain-order",
    title: "Remove Duplicates While Maintaining Order",
    category: "Python Core",
    difficulty: "medium",
    description: `Remove duplicate elements from a list while preserving the original order of first occurrences.

**Example:** Given nums = [3, 1, 2, 1, 3, 4, 2], return [3, 1, 2, 4].

Don't use set() directly as it doesn't preserve order in older Python versions.`,
    inputFormat: "def removeDuplicates(nums: List[int]) -> List[int]:",
    outputFormat: "Return list with duplicates removed, maintaining first occurrence order.",
    constraints: "1 <= len(nums) <= 10^5",
    starterCode: `from typing import List

def removeDuplicates(nums: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = removeDuplicates(nums)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 1 2 1 3 4 2", expectedOutput: "3 1 2 4" },
      { input: "1 1 1 1", expectedOutput: "1" },
      { input: "1 2 3", expectedOutput: "1 2 3" }
    ],
    hiddenTestCases: [
      { input: "5", expectedOutput: "5" },
      { input: "1 2 3 4 5 1 2 3", expectedOutput: "1 2 3 4 5" },
      { input: "9 8 7 8 9 6", expectedOutput: "9 8 7 6" },
      { input: "1 1 2 2 3 3 4 4", expectedOutput: "1 2 3 4" },
      { input: "5 4 3 2 1", expectedOutput: "5 4 3 2 1" }
    ]
  },
  {
    id: "python-core-first-non-repeating",
    slug: "first-non-repeating-char",
    title: "Find First Non-Repeating Character",
    category: "Python Core",
    difficulty: "medium",
    description: `Find the first character in a string that doesn't repeat.

**Example:** Given s = "aabbccd", return 'd' because it's the first character that appears only once.

Return '-1' if all characters repeat.`,
    inputFormat: "def firstNonRepeating(s: str) -> str:",
    outputFormat: "Return the first non-repeating character or '-1'.",
    constraints: "1 <= len(s) <= 10^5\ns contains only lowercase letters",
    starterCode: `def firstNonRepeating(s: str) -> str:
    # Your code here
    pass

# Read input
s = input()
print(firstNonRepeating(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "aabbccd", expectedOutput: "d" },
      { input: "abcabc", expectedOutput: "-1" },
      { input: "leetcode", expectedOutput: "l" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "aabbcc", expectedOutput: "-1" },
      { input: "loveleetcode", expectedOutput: "v" },
      { input: "xxyz", expectedOutput: "y" },
      { input: "aab", expectedOutput: "b" }
    ]
  },
  {
    id: "python-core-check-anagram",
    slug: "check-anagram",
    title: "Check if Two Strings are Anagrams",
    category: "Python Core",
    difficulty: "medium",
    description: `Determine if two strings are anagrams of each other.

**Example:** Given s1 = "listen" and s2 = "silent", return True.

Anagrams have the same characters with the same frequencies.`,
    inputFormat: "def isAnagram(s1: str, s2: str) -> bool:",
    outputFormat: "Return True if s1 and s2 are anagrams, False otherwise.",
    constraints: "1 <= len(s1), len(s2) <= 10^5\nStrings contain only lowercase letters",
    starterCode: `def isAnagram(s1: str, s2: str) -> bool:
    # Your code here
    pass

# Read input
s1 = input()
s2 = input()
print(isAnagram(s1, s2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "listen\nsilent", expectedOutput: "True" },
      { input: "hello\nworld", expectedOutput: "False" },
      { input: "anagram\nnagaram", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "True" },
      { input: "ab\nba", expectedOutput: "True" },
      { input: "rat\ncar", expectedOutput: "False" },
      { input: "aab\naba", expectedOutput: "True" },
      { input: "abc\nabcd", expectedOutput: "False" }
    ]
  },
  {
    id: "python-core-custom-len",
    slug: "custom-len-function",
    title: "Implement Custom len() Function",
    category: "Python Core",
    difficulty: "medium",
    description: `Implement your own version of the len() function without using the built-in len().

**Example:** Given s = "hello", return 5.

Count elements by iterating through the iterable.`,
    inputFormat: "def customLen(iterable) -> int:",
    outputFormat: "Return the number of elements in the iterable.",
    constraints: "0 <= length <= 10^5",
    starterCode: `def customLen(iterable) -> int:
    # Your code here - don't use len()
    pass

# Read input
s = input()
print(customLen(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hello", expectedOutput: "5" },
      { input: "", expectedOutput: "0" },
      { input: "a", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "programming", expectedOutput: "11" },
      { input: "12345", expectedOutput: "5" },
      { input: "abcdefghij", expectedOutput: "10" },
      { input: "   ", expectedOutput: "3" },
      { input: "python is fun", expectedOutput: "13" }
    ]
  },

  // 🔴 Hard - Python Core
  {
    id: "python-core-lru-cache",
    slug: "lru-cache-implementation",
    title: "Implement LRU Cache",
    category: "Python Core",
    difficulty: "hard",
    description: `Design and implement a Least Recently Used (LRU) cache.

Operations:
- get(key): Return the value if key exists, else return -1
- put(key, value): Insert or update the value. Evict the least recently used item if capacity is exceeded.

**Example:** 
LRUCache(2) # capacity = 2
put(1, 1)
put(2, 2)
get(1) → 1
put(3, 3) # evicts key 2
get(2) → -1`,
    inputFormat: "Implement LRUCache class with get and put methods",
    outputFormat: "For each get operation, output the result on a new line.",
    constraints: "1 <= capacity <= 1000\n0 <= key, value <= 10^4",
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

# Read and process operations
capacity = int(input())
cache = LRUCache(capacity)
n = int(input())
results = []
for _ in range(n):
    op = input().split()
    if op[0] == 'get':
        results.append(str(cache.get(int(op[1]))))
    else:
        cache.put(int(op[1]), int(op[2]))
print('\\n'.join(results))`,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\n6\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3", expectedOutput: "1\n-1\n3" },
      { input: "1\n4\nput 1 1\nput 2 2\nget 1\nget 2", expectedOutput: "-1\n2" }
    ],
    hiddenTestCases: [
      { input: "2\n5\nput 1 10\nget 1\nput 2 20\nput 1 100\nget 1", expectedOutput: "10\n100" },
      { input: "3\n7\nput 1 1\nput 2 2\nput 3 3\nget 1\nput 4 4\nget 2\nget 4", expectedOutput: "1\n-1\n4" }
    ]
  },
  {
    id: "python-core-custom-hashmap",
    slug: "custom-hashmap",
    title: "Implement Custom HashMap",
    category: "Python Core",
    difficulty: "hard",
    description: `Design a HashMap without using built-in hash table libraries.

Implement:
- put(key, value): Insert or update
- get(key): Return value or -1
- remove(key): Remove the mapping

Handle collisions using chaining.`,
    inputFormat: "Implement MyHashMap class with put, get, remove methods",
    outputFormat: "For each get operation, output the result on a new line.",
    constraints: "0 <= key, value <= 10^6\nAt most 10^4 operations",
    starterCode: `class MyHashMap:
    def __init__(self):
        # Your code here
        pass
    
    def put(self, key: int, value: int) -> None:
        # Your code here
        pass
    
    def get(self, key: int) -> int:
        # Your code here
        pass
    
    def remove(self, key: int) -> None:
        # Your code here
        pass

# Read and process operations
hashmap = MyHashMap()
n = int(input())
results = []
for _ in range(n):
    op = input().split()
    if op[0] == 'put':
        hashmap.put(int(op[1]), int(op[2]))
    elif op[0] == 'get':
        results.append(str(hashmap.get(int(op[1]))))
    else:
        hashmap.remove(int(op[1]))
print('\\n'.join(results))`,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6\nput 1 1\nput 2 2\nget 1\nget 3\nput 2 1\nget 2", expectedOutput: "1\n-1\n1" }
    ],
    hiddenTestCases: [
      { input: "5\nput 1 100\nget 1\nremove 1\nget 1\nput 1 200", expectedOutput: "100\n-1" },
      { input: "4\nput 10 10\nput 20 20\nget 10\nget 20", expectedOutput: "10\n20" }
    ]
  },
  {
    id: "python-core-string-compression",
    slug: "string-compression",
    title: "Implement String Compression",
    category: "Python Core",
    difficulty: "hard",
    description: `Implement string compression using counts of repeated characters.

**Example:** Given s = "aabcccccaaa", return "a2b1c5a3".

If compressed string is not smaller, return original string.`,
    inputFormat: "def compress(s: str) -> str:",
    outputFormat: "Return compressed string or original if compression doesn't help.",
    constraints: "1 <= len(s) <= 10^5\ns contains only uppercase and lowercase letters",
    starterCode: `def compress(s: str) -> str:
    # Your code here
    pass

# Read input
s = input()
print(compress(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "aabcccccaaa", expectedOutput: "a2b1c5a3" },
      { input: "abc", expectedOutput: "abc" },
      { input: "aaa", expectedOutput: "a3" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "aa", expectedOutput: "aa" },
      { input: "aaabbbccc", expectedOutput: "a3b3c3" },
      { input: "aabbcc", expectedOutput: "aabbcc" },
      { input: "aaaaaaaaaabbbbbbbbbb", expectedOutput: "a10b10" }
    ]
  },

  // ============================================================================
  // 📊 2. ARRAYS / LISTS (Highest Frequency)
  // ============================================================================
  
  // 🟢 Easy - Arrays/Lists
  {
    id: "arrays-max-min",
    slug: "find-max-min-array",
    title: "Find Maximum and Minimum in Array",
    category: "Arrays/Lists",
    difficulty: "easy",
    description: `Find the maximum and minimum elements in an array.

**Example:** Given nums = [3, 1, 4, 1, 5, 9, 2, 6], return "1 9" (min max).

Do this in a single pass for efficiency.`,
    inputFormat: "def findMaxMin(nums: List[int]) -> str:",
    outputFormat: "Return 'min max' separated by space.",
    constraints: "1 <= len(nums) <= 10^5\n-10^9 <= nums[i] <= 10^9",
    starterCode: `from typing import List

def findMaxMin(nums: List[int]) -> str:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(findMaxMin(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 1 4 1 5 9 2 6", expectedOutput: "1 9" },
      { input: "1", expectedOutput: "1 1" },
      { input: "-5 -2 -10 -1", expectedOutput: "-10 -1" }
    ],
    hiddenTestCases: [
      { input: "5 5 5 5", expectedOutput: "5 5" },
      { input: "1 2 3 4 5", expectedOutput: "1 5" },
      { input: "100 -100", expectedOutput: "-100 100" },
      { input: "0 0 0", expectedOutput: "0 0" },
      { input: "1000000000 -1000000000", expectedOutput: "-1000000000 1000000000" }
    ]
  },
  {
    id: "arrays-reverse-in-place",
    slug: "reverse-array-in-place",
    title: "Reverse an Array In Place",
    category: "Arrays/Lists",
    difficulty: "easy",
    description: `Reverse an array in place without using extra space.

**Example:** Given nums = [1, 2, 3, 4, 5], modify it to [5, 4, 3, 2, 1].

Use two pointers from start and end.`,
    inputFormat: "def reverseArray(nums: List[int]) -> List[int]:",
    outputFormat: "Return the reversed array.",
    constraints: "1 <= len(nums) <= 10^5",
    starterCode: `from typing import List

def reverseArray(nums: List[int]) -> List[int]:
    # Your code here - modify in place
    pass

# Read input
nums = list(map(int, input().split()))
result = reverseArray(nums)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "5 4 3 2 1" },
      { input: "1", expectedOutput: "1" },
      { input: "1 2", expectedOutput: "2 1" }
    ],
    hiddenTestCases: [
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "1 1 1", expectedOutput: "1 1 1" },
      { input: "10 20 30 40 50", expectedOutput: "50 40 30 20 10" },
      { input: "-1 -2 -3", expectedOutput: "-3 -2 -1" },
      { input: "0 1 0 1 0", expectedOutput: "0 1 0 1 0" }
    ]
  },
  {
    id: "arrays-move-zeros",
    slug: "move-zeros-to-end",
    title: "Move All Zeros to End",
    category: "Arrays/Lists",
    difficulty: "easy",
    description: `Move all zeros to the end of the array while maintaining relative order of non-zero elements.

**Example:** Given nums = [0, 1, 0, 3, 12], return [1, 3, 12, 0, 0].

Do this in-place without making a copy of the array.`,
    inputFormat: "def moveZeros(nums: List[int]) -> List[int]:",
    outputFormat: "Return array with zeros moved to end.",
    constraints: "1 <= len(nums) <= 10^5",
    starterCode: `from typing import List

def moveZeros(nums: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = moveZeros(nums)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "0 1 0 3 12", expectedOutput: "1 3 12 0 0" },
      { input: "0", expectedOutput: "0" },
      { input: "1 2 3", expectedOutput: "1 2 3" }
    ],
    hiddenTestCases: [
      { input: "0 0 0", expectedOutput: "0 0 0" },
      { input: "1 0 2 0 3", expectedOutput: "1 2 3 0 0" },
      { input: "0 0 1", expectedOutput: "1 0 0" },
      { input: "1", expectedOutput: "1" },
      { input: "4 0 5 0 0 6", expectedOutput: "4 5 6 0 0 0" }
    ]
  },
  {
    id: "arrays-second-largest",
    slug: "find-second-largest",
    title: "Find Second Largest Element",
    category: "Arrays/Lists",
    difficulty: "easy",
    description: `Find the second largest element in an array.

**Example:** Given nums = [1, 2, 3, 4, 5], return 4.

Return -1 if no second largest exists (all elements same or only one element).`,
    inputFormat: "def secondLargest(nums: List[int]) -> int:",
    outputFormat: "Return the second largest element or -1.",
    constraints: "1 <= len(nums) <= 10^5",
    starterCode: `from typing import List

def secondLargest(nums: List[int]) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(secondLargest(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "4" },
      { input: "5 5 5", expectedOutput: "-1" },
      { input: "1", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "1 2", expectedOutput: "1" },
      { input: "10 10 9", expectedOutput: "9" },
      { input: "1 1 1 1 2", expectedOutput: "1" },
      { input: "-1 -2 -3", expectedOutput: "-2" },
      { input: "100 99 98 97", expectedOutput: "99" }
    ]
  },

  // 🟡 Medium - Arrays/Lists
  {
    id: "arrays-two-sum",
    slug: "two-sum",
    title: "Two Sum",
    category: "Arrays/Lists",
    difficulty: "medium",
    description: `Find two numbers in the array that add up to a target sum. Return their indices.

**Example:** Given nums = [2, 7, 11, 15] and target = 9, return [0, 1] because nums[0] + nums[1] = 9.

Each input has exactly one solution.`,
    inputFormat: "def twoSum(nums: List[int], target: int) -> List[int]:",
    outputFormat: "Return indices of two numbers as 'i j' (space-separated).",
    constraints: "2 <= len(nums) <= 10^4\n-10^9 <= nums[i] <= 10^9",
    starterCode: `from typing import List

def twoSum(nums: List[int], target: int) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
target = int(input())
result = twoSum(nums, target)
print(f"{result[0]} {result[1]}")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 7 11 15\n9", expectedOutput: "0 1" },
      { input: "3 2 4\n6", expectedOutput: "1 2" },
      { input: "3 3\n6", expectedOutput: "0 1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n9", expectedOutput: "3 4" },
      { input: "-1 -2 -3 -4 -5\n-8", expectedOutput: "2 4" },
      { input: "0 4 3 0\n0", expectedOutput: "0 3" },
      { input: "1 5 1 5\n10", expectedOutput: "1 3" },
      { input: "2 5 5 11\n10", expectedOutput: "1 2" }
    ]
  },
  {
    id: "arrays-missing-number",
    slug: "find-missing-number",
    title: "Find Missing Number in 1..n",
    category: "Arrays/Lists",
    difficulty: "medium",
    description: `Find the missing number in an array containing n distinct numbers from 0 to n.

**Example:** Given nums = [3, 0, 1], return 2.

Use mathematical formula or XOR for O(n) time and O(1) space.`,
    inputFormat: "def missingNumber(nums: List[int]) -> int:",
    outputFormat: "Return the missing number.",
    constraints: "1 <= len(nums) <= 10^4\nAll numbers are unique",
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
      { input: "1 2 3 4 5", expectedOutput: "0" },
      { input: "0 1 2 3 4", expectedOutput: "5" },
      { input: "0 2", expectedOutput: "1" }
    ]
  },
  {
    id: "arrays-rotate-k",
    slug: "rotate-array-k-positions",
    title: "Rotate Array by K Positions",
    category: "Arrays/Lists",
    difficulty: "medium",
    description: `Rotate an array to the right by k positions.

**Example:** Given nums = [1, 2, 3, 4, 5] and k = 2, return [4, 5, 1, 2, 3].

Handle cases where k > length of array.`,
    inputFormat: "def rotate(nums: List[int], k: int) -> List[int]:",
    outputFormat: "Return the rotated array.",
    constraints: "1 <= len(nums) <= 10^5\n0 <= k <= 10^5",
    starterCode: `from typing import List

def rotate(nums: List[int], k: int) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
k = int(input())
result = rotate(nums, k)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "4 5 1 2 3" },
      { input: "1 2 3\n1", expectedOutput: "3 1 2" },
      { input: "1 2 3\n3", expectedOutput: "1 2 3" }
    ],
    hiddenTestCases: [
      { input: "1\n0", expectedOutput: "1" },
      { input: "1 2\n3", expectedOutput: "2 1" },
      { input: "1 2 3 4 5 6 7\n10", expectedOutput: "5 6 7 1 2 3 4" },
      { input: "-1 -2 -3\n1", expectedOutput: "-3 -1 -2" },
      { input: "1 2 3 4 5\n0", expectedOutput: "1 2 3 4 5" }
    ]
  },
  {
    id: "arrays-merge-sorted",
    slug: "merge-two-sorted-arrays",
    title: "Merge Two Sorted Arrays",
    category: "Arrays/Lists",
    difficulty: "medium",
    description: `Merge two sorted arrays into one sorted array.

**Example:** Given nums1 = [1, 3, 5] and nums2 = [2, 4, 6], return [1, 2, 3, 4, 5, 6].

Use two pointers for O(n+m) solution.`,
    inputFormat: "def mergeSorted(nums1: List[int], nums2: List[int]) -> List[int]:",
    outputFormat: "Return the merged sorted array.",
    constraints: "0 <= len(nums1), len(nums2) <= 10^5",
    starterCode: `from typing import List

def mergeSorted(nums1: List[int], nums2: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
nums1 = list(map(int, input().split())) if input().strip() else []
nums2 = list(map(int, input().split())) if input().strip() else []
result = mergeSorted(nums1, nums2)
print(' '.join(map(str, result)) if result else '')`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 3 5\n2 4 6", expectedOutput: "1 2 3 4 5 6" },
      { input: "1\n2", expectedOutput: "1 2" },
      { input: "1 2 3\n", expectedOutput: "1 2 3" }
    ],
    hiddenTestCases: [
      { input: "\n1 2 3", expectedOutput: "1 2 3" },
      { input: "1 1 1\n1 1 1", expectedOutput: "1 1 1 1 1 1" },
      { input: "1 3 5 7\n2 4 6 8", expectedOutput: "1 2 3 4 5 6 7 8" },
      { input: "10 20\n5 15 25", expectedOutput: "5 10 15 20 25" },
      { input: "-5 -3 -1\n-4 -2 0", expectedOutput: "-5 -4 -3 -2 -1 0" }
    ]
  },
  {
    id: "arrays-kadane",
    slug: "kadanes-algorithm",
    title: "Kadane's Algorithm - Maximum Subarray Sum",
    category: "Arrays/Lists",
    difficulty: "medium",
    description: `Find the contiguous subarray with the maximum sum using Kadane's algorithm.

**Example:** Given nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4], return 6 (subarray [4, -1, 2, 1]).

Track current sum and maximum sum, reset current sum when it becomes negative.`,
    inputFormat: "def maxSubArray(nums: List[int]) -> int:",
    outputFormat: "Return the maximum sum of any contiguous subarray.",
    constraints: "1 <= len(nums) <= 10^5\n-10^4 <= nums[i] <= 10^4",
    starterCode: `from typing import List

def maxSubArray(nums: List[int]) -> int:
    # Your code here - use Kadane's algorithm
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

  // 🔴 Hard - Arrays/Lists
  {
    id: "arrays-trapping-rainwater",
    slug: "trapping-rainwater",
    title: "Trapping Rainwater",
    category: "Arrays/Lists",
    difficulty: "hard",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example:** Given height = [0,1,0,2,1,0,1,3,2,1,2,1], return 6.

For each position, water trapped = min(max_left, max_right) - height.`,
    inputFormat: "def trap(height: List[int]) -> int:",
    outputFormat: "Return the total amount of water trapped.",
    constraints: "0 <= len(height) <= 2 * 10^4\n0 <= height[i] <= 10^5",
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
      { input: "4 2 0 3 2 5", expectedOutput: "9" },
      { input: "1 2 3 4 5", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "5 4 3 2 1", expectedOutput: "0" },
      { input: "1", expectedOutput: "0" },
      { input: "2 0 2", expectedOutput: "2" },
      { input: "3 0 0 2 0 4", expectedOutput: "10" },
      { input: "0 0 0", expectedOutput: "0" }
    ]
  },
  {
    id: "arrays-max-product-subarray",
    slug: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    category: "Arrays/Lists",
    difficulty: "hard",
    description: `Find the contiguous subarray with the largest product.

**Example:** Given nums = [2, 3, -2, 4], return 6 (subarray [2, 3]).

Handle negative numbers - a negative times a negative is positive!`,
    inputFormat: "def maxProduct(nums: List[int]) -> int:",
    outputFormat: "Return the maximum product of any contiguous subarray.",
    constraints: "1 <= len(nums) <= 2 * 10^4\n-10 <= nums[i] <= 10",
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
      { input: "-2 0 -1", expectedOutput: "0" },
      { input: "-2 3 -4", expectedOutput: "24" }
    ],
    hiddenTestCases: [
      { input: "-2", expectedOutput: "-2" },
      { input: "0 2", expectedOutput: "2" },
      { input: "2 -5 -2 -4 3", expectedOutput: "24" },
      { input: "-1 -2 -3", expectedOutput: "6" },
      { input: "1 2 3 4 5", expectedOutput: "120" }
    ]
  },
  {
    id: "arrays-subarrays-with-sum",
    slug: "subarrays-with-given-sum",
    title: "Find All Subarrays With Given Sum",
    category: "Arrays/Lists",
    difficulty: "hard",
    description: `Count the number of subarrays that sum to a given target.

**Example:** Given nums = [1, 1, 1] and k = 2, return 2 (subarrays [1,1] at index 0-1 and 1-2).

Use prefix sum with hash map for O(n) solution.`,
    inputFormat: "def subarraySum(nums: List[int], k: int) -> int:",
    outputFormat: "Return the count of subarrays with sum equal to k.",
    constraints: "1 <= len(nums) <= 2 * 10^4\n-1000 <= nums[i] <= 1000\n-10^7 <= k <= 10^7",
    starterCode: `from typing import List

def subarraySum(nums: List[int], k: int) -> int:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
k = int(input())
print(subarraySum(nums, k))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 1 1\n2", expectedOutput: "2" },
      { input: "1 2 3\n3", expectedOutput: "2" },
      { input: "1\n0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 -1 0\n0", expectedOutput: "3" },
      { input: "0 0 0 0\n0", expectedOutput: "10" },
      { input: "1 2 3 4 5\n15", expectedOutput: "1" },
      { input: "-1 -1 1\n0", expectedOutput: "1" },
      { input: "3 4 7 2 -3 1 4 2\n7", expectedOutput: "4" }
    ]
  },
  {
    id: "arrays-longest-increasing-subsequence",
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    category: "Arrays/Lists",
    difficulty: "hard",
    description: `Find the length of the longest strictly increasing subsequence.

**Example:** Given nums = [10, 9, 2, 5, 3, 7, 101, 18], return 4 (subsequence [2, 3, 7, 101]).

Use dynamic programming with binary search for O(n log n) solution.`,
    inputFormat: "def lengthOfLIS(nums: List[int]) -> int:",
    outputFormat: "Return the length of the longest increasing subsequence.",
    constraints: "1 <= len(nums) <= 2500\n-10^4 <= nums[i] <= 10^4",
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
      { input: "1 2 3 4 5", expectedOutput: "5" },
      { input: "5 4 3 2 1", expectedOutput: "1" },
      { input: "3 10 2 1 20", expectedOutput: "3" },
      { input: "1 3 6 7 9 4 10 5 6", expectedOutput: "6" }
    ]
  },

  // ============================================================================
  // 🔤 3. STRINGS (Very Common)
  // ============================================================================
  
  // 🟢 Easy - Strings
  {
    id: "strings-reverse",
    slug: "reverse-string",
    title: "Reverse a String",
    category: "Strings",
    difficulty: "easy",
    description: `Reverse the given string.

**Example:** Given s = "hello", return "olleh".

You can use various approaches: two pointers, recursion, or built-in methods.`,
    inputFormat: "def reverseString(s: str) -> str:",
    outputFormat: "Return the reversed string.",
    constraints: "1 <= len(s) <= 10^5",
    starterCode: `def reverseString(s: str) -> str:
    # Your code here
    pass

# Read input
s = input()
print(reverseString(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "a", expectedOutput: "a" },
      { input: "ab", expectedOutput: "ba" }
    ],
    hiddenTestCases: [
      { input: "Python", expectedOutput: "nohtyP" },
      { input: "12345", expectedOutput: "54321" },
      { input: "racecar", expectedOutput: "racecar" },
      { input: "   ", expectedOutput: "   " },
      { input: "Hello World", expectedOutput: "dlroW olleH" }
    ]
  },
  {
    id: "strings-palindrome",
    slug: "check-string-palindrome",
    title: "Check if String is Palindrome",
    category: "Strings",
    difficulty: "easy",
    description: `Check if a string reads the same forwards and backwards.

**Example:** Given s = "racecar", return True.

Consider only alphanumeric characters and ignore case.`,
    inputFormat: "def isPalindrome(s: str) -> bool:",
    outputFormat: "Return True if palindrome, False otherwise.",
    constraints: "1 <= len(s) <= 2 * 10^5",
    starterCode: `def isPalindrome(s: str) -> bool:
    # Your code here
    pass

# Read input
s = input()
print(isPalindrome(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "racecar", expectedOutput: "True" },
      { input: "hello", expectedOutput: "False" },
      { input: "A man a plan a canal Panama", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "True" },
      { input: "ab", expectedOutput: "False" },
      { input: "Was it a car or a cat I saw", expectedOutput: "True" },
      { input: "No lemon no melon", expectedOutput: "True" },
      { input: "race a car", expectedOutput: "False" }
    ]
  },
  {
    id: "strings-count-vowels-consonants",
    slug: "count-vowels-consonants",
    title: "Count Vowels and Consonants",
    category: "Strings",
    difficulty: "easy",
    description: `Count the number of vowels and consonants in a string.

**Example:** Given s = "hello", return "2 3" (2 vowels, 3 consonants).

Only count alphabetic characters, ignore spaces and numbers.`,
    inputFormat: "def countVowelsConsonants(s: str) -> str:",
    outputFormat: "Return 'vowels consonants' separated by space.",
    constraints: "1 <= len(s) <= 10^5",
    starterCode: `def countVowelsConsonants(s: str) -> str:
    # Your code here
    pass

# Read input
s = input()
print(countVowelsConsonants(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hello", expectedOutput: "2 3" },
      { input: "aeiou", expectedOutput: "5 0" },
      { input: "xyz", expectedOutput: "0 3" }
    ],
    hiddenTestCases: [
      { input: "HELLO WORLD", expectedOutput: "3 7" },
      { input: "Python3", expectedOutput: "1 5" },
      { input: "a", expectedOutput: "1 0" },
      { input: "b", expectedOutput: "0 1" },
      { input: "AeIoU BcDfG", expectedOutput: "5 5" }
    ]
  },
  {
    id: "strings-remove-duplicates",
    slug: "remove-duplicate-characters",
    title: "Remove Duplicate Characters",
    category: "Strings",
    difficulty: "easy",
    description: `Remove duplicate characters from a string, keeping only the first occurrence.

**Example:** Given s = "programming", return "progamin".

Maintain the order of first occurrences.`,
    inputFormat: "def removeDuplicates(s: str) -> str:",
    outputFormat: "Return string with duplicates removed.",
    constraints: "1 <= len(s) <= 10^5",
    starterCode: `def removeDuplicates(s: str) -> str:
    # Your code here
    pass

# Read input
s = input()
print(removeDuplicates(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "programming", expectedOutput: "progamin" },
      { input: "hello", expectedOutput: "helo" },
      { input: "abc", expectedOutput: "abc" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "aaa", expectedOutput: "a" },
      { input: "abcabc", expectedOutput: "abc" },
      { input: "AABBCC", expectedOutput: "ABC" },
      { input: "aAbBcC", expectedOutput: "aAbBcC" }
    ]
  },

  // 🟡 Medium - Strings
  {
    id: "strings-longest-common-prefix",
    slug: "longest-common-prefix",
    title: "Longest Common Prefix",
    category: "Strings",
    difficulty: "medium",
    description: `Find the longest common prefix among an array of strings.

**Example:** Given strs = ["flower", "flow", "flight"], return "fl".

Return empty string if no common prefix exists.`,
    inputFormat: "def longestCommonPrefix(strs: List[str]) -> str:",
    outputFormat: "Return the longest common prefix or empty string.",
    constraints: "1 <= len(strs) <= 200\n0 <= len(strs[i]) <= 200",
    starterCode: `from typing import List

def longestCommonPrefix(strs: List[str]) -> str:
    # Your code here
    pass

# Read input
strs = input().split(',')
result = longestCommonPrefix(strs)
print(result if result else "")`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "flower,flow,flight", expectedOutput: "fl" },
      { input: "dog,racecar,car", expectedOutput: "" },
      { input: "interspecies,interstellar,interstate", expectedOutput: "inters" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "ab,ab,ab", expectedOutput: "ab" },
      { input: "abc,", expectedOutput: "" },
      { input: "prefix,prefixes,prefixing", expectedOutput: "prefix" },
      { input: "c,c", expectedOutput: "c" }
    ]
  },
  {
    id: "strings-first-unique-char",
    slug: "first-unique-character",
    title: "First Non-Repeating Character",
    category: "Strings",
    difficulty: "medium",
    description: `Find the index of the first non-repeating character in a string.

**Example:** Given s = "leetcode", return 0 (character 'l').

Return -1 if no unique character exists.`,
    inputFormat: "def firstUniqChar(s: str) -> int:",
    outputFormat: "Return the index of first unique character or -1.",
    constraints: "1 <= len(s) <= 10^5\ns contains only lowercase letters",
    starterCode: `def firstUniqChar(s: str) -> int:
    # Your code here
    pass

# Read input
s = input()
print(firstUniqChar(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "leetcode", expectedOutput: "0" },
      { input: "loveleetcode", expectedOutput: "2" },
      { input: "aabb", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "0" },
      { input: "cc", expectedOutput: "-1" },
      { input: "dddccdbba", expectedOutput: "8" },
      { input: "aadadaad", expectedOutput: "-1" },
      { input: "z", expectedOutput: "0" }
    ]
  },
  {
    id: "strings-count-substring",
    slug: "count-substring-occurrences",
    title: "Count Substring Occurrences",
    category: "Strings",
    difficulty: "medium",
    description: `Count how many times a substring appears in a string.

**Example:** Given s = "abababab" and sub = "aba", return 3.

Count overlapping occurrences.`,
    inputFormat: "def countSubstring(s: str, sub: str) -> int:",
    outputFormat: "Return the count of substring occurrences.",
    constraints: "1 <= len(s) <= 10^5\n1 <= len(sub) <= len(s)",
    starterCode: `def countSubstring(s: str, sub: str) -> int:
    # Your code here
    pass

# Read input
s = input()
sub = input()
print(countSubstring(s, sub))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "abababab\naba", expectedOutput: "3" },
      { input: "hello\nll", expectedOutput: "1" },
      { input: "aaaa\naa", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "test\ntest", expectedOutput: "1" },
      { input: "aaa\nb", expectedOutput: "0" },
      { input: "mississippi\nissi", expectedOutput: "2" },
      { input: "banana\nana", expectedOutput: "2" },
      { input: "abcabc\nabc", expectedOutput: "2" }
    ]
  },
  {
    id: "strings-rotation-check",
    slug: "check-string-rotation",
    title: "Check String Rotation",
    category: "Strings",
    difficulty: "medium",
    description: `Check if one string is a rotation of another.

**Example:** Given s1 = "waterbottle" and s2 = "erbottlewat", return True.

A rotation means characters are moved from beginning to end.`,
    inputFormat: "def isRotation(s1: str, s2: str) -> bool:",
    outputFormat: "Return True if s2 is a rotation of s1, False otherwise.",
    constraints: "1 <= len(s1), len(s2) <= 10^5",
    starterCode: `def isRotation(s1: str, s2: str) -> bool:
    # Your code here
    pass

# Read input
s1 = input()
s2 = input()
print(isRotation(s1, s2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "waterbottle\nerbottlewat", expectedOutput: "True" },
      { input: "hello\nlohel", expectedOutput: "True" },
      { input: "hello\nworld", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "True" },
      { input: "ab\nba", expectedOutput: "True" },
      { input: "abc\nbac", expectedOutput: "False" },
      { input: "rotation\ntationro", expectedOutput: "True" },
      { input: "abc\nabcd", expectedOutput: "False" }
    ]
  },

  // 🔴 Hard - Strings
  {
    id: "strings-longest-substring-no-repeat",
    slug: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    category: "Strings",
    difficulty: "hard",
    description: `Find the length of the longest substring without repeating characters.

**Example:** Given s = "abcabcbb", return 3 (substring "abc").

Use sliding window technique with hash map.`,
    inputFormat: "def lengthOfLongestSubstring(s: str) -> int:",
    outputFormat: "Return the length of the longest substring without repeating characters.",
    constraints: "0 <= len(s) <= 5 * 10^4\ns consists of English letters, digits, symbols, and spaces",
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
  {
    id: "strings-minimum-window-substring",
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    category: "Strings",
    difficulty: "hard",
    description: `Find the minimum window substring that contains all characters of pattern.

**Example:** Given s = "ADOBECODEBANC" and t = "ABC", return "BANC".

Return empty string if no such window exists.`,
    inputFormat: "def minWindow(s: str, t: str) -> str:",
    outputFormat: "Return the minimum window substring or empty string.",
    constraints: "1 <= len(s), len(t) <= 10^5\ns and t consist of uppercase and lowercase English letters",
    starterCode: `def minWindow(s: str, t: str) -> str:
    # Your code here
    pass

# Read input
s = input()
t = input()
print(minWindow(s, t))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC" },
      { input: "a\na", expectedOutput: "a" },
      { input: "a\naa", expectedOutput: "" }
    ],
    hiddenTestCases: [
      { input: "aa\naa", expectedOutput: "aa" },
      { input: "ab\nA", expectedOutput: "" },
      { input: "cabwefgewcwaefgcf\ncae", expectedOutput: "cwae" },
      { input: "bba\nab", expectedOutput: "ba" },
      { input: "abc\nabc", expectedOutput: "abc" }
    ]
  },
  {
    id: "strings-pattern-matching",
    slug: "basic-pattern-matching",
    title: "Pattern Matching (Basic)",
    category: "Strings",
    difficulty: "hard",
    description: `Implement basic pattern matching with '.' (matches any single character) and '*' (matches zero or more of the preceding element).

**Example:** Given s = "aab" and p = "c*a*b", return True.

'*' is always preceded by a valid character or '.'.`,
    inputFormat: "def isMatch(s: str, p: str) -> bool:",
    outputFormat: "Return True if pattern matches entire string, False otherwise.",
    constraints: "0 <= len(s) <= 20\n0 <= len(p) <= 30",
    starterCode: `def isMatch(s: str, p: str) -> bool:
    # Your code here
    pass

# Read input
s = input()
p = input()
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
      { input: "\n.*", expectedOutput: "True" },
      { input: "a\n", expectedOutput: "False" },
      { input: "ab\n.*c", expectedOutput: "False" }
    ]
  },

  // ============================================================================
  // 🔍 4. SEARCHING & SORTING
  // ============================================================================
  
  // 🟢 Easy - Searching & Sorting
  {
    id: "search-linear",
    slug: "linear-search",
    title: "Linear Search",
    category: "Searching & Sorting",
    difficulty: "easy",
    description: `Implement linear search to find an element in an array.

**Example:** Given arr = [1, 3, 5, 7, 9] and target = 5, return 2 (index).

Return -1 if element is not found.`,
    inputFormat: "def linearSearch(arr: List[int], target: int) -> int:",
    outputFormat: "Return the index of target or -1.",
    constraints: "1 <= len(arr) <= 10^4",
    starterCode: `from typing import List

def linearSearch(arr: List[int], target: int) -> int:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
target = int(input())
print(linearSearch(arr, target))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 3 5 7 9\n5", expectedOutput: "2" },
      { input: "1 2 3 4 5\n6", expectedOutput: "-1" },
      { input: "10 20 30\n10", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "0" },
      { input: "1 2 3\n3", expectedOutput: "2" },
      { input: "5 5 5 5\n5", expectedOutput: "0" },
      { input: "1 2 3 4 5 6 7 8 9 10\n10", expectedOutput: "9" },
      { input: "-1 -2 -3\n-2", expectedOutput: "1" }
    ]
  },
  {
    id: "search-binary",
    slug: "binary-search",
    title: "Binary Search",
    category: "Searching & Sorting",
    difficulty: "easy",
    description: `Implement binary search on a sorted array.

**Example:** Given arr = [1, 2, 3, 4, 5] and target = 3, return 2.

Return -1 if element is not found. Array is sorted in ascending order.`,
    inputFormat: "def binarySearch(arr: List[int], target: int) -> int:",
    outputFormat: "Return the index of target or -1.",
    constraints: "1 <= len(arr) <= 10^4\nArray is sorted in ascending order",
    starterCode: `from typing import List

def binarySearch(arr: List[int], target: int) -> int:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
target = int(input())
print(binarySearch(arr, target))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n3", expectedOutput: "2" },
      { input: "1 3 5 7 9\n6", expectedOutput: "-1" },
      { input: "2 4 6 8 10\n10", expectedOutput: "4" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "0" },
      { input: "1 2\n1", expectedOutput: "0" },
      { input: "1 2 3 4 5 6 7 8 9 10\n1", expectedOutput: "0" },
      { input: "-10 -5 0 5 10\n0", expectedOutput: "2" },
      { input: "1 2 3 4 5\n0", expectedOutput: "-1" }
    ]
  },

  // 🟡 Medium - Searching & Sorting
  {
    id: "sort-bubble",
    slug: "bubble-sort",
    title: "Bubble Sort",
    category: "Searching & Sorting",
    difficulty: "medium",
    description: `Implement bubble sort algorithm.

**Example:** Given arr = [64, 34, 25, 12, 22], return [12, 22, 25, 34, 64].

Repeatedly swap adjacent elements if they are in wrong order.`,
    inputFormat: "def bubbleSort(arr: List[int]) -> List[int]:",
    outputFormat: "Return the sorted array.",
    constraints: "1 <= len(arr) <= 10^3",
    starterCode: `from typing import List

def bubbleSort(arr: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
result = bubbleSort(arr)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "64 34 25 12 22", expectedOutput: "12 22 25 34 64" },
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "1 2 3 4 5" },
      { input: "3 3 3", expectedOutput: "3 3 3" },
      { input: "-5 -2 -10 -1", expectedOutput: "-10 -5 -2 -1" },
      { input: "10 9 8 7 6 5 4 3 2 1", expectedOutput: "1 2 3 4 5 6 7 8 9 10" },
      { input: "1 1", expectedOutput: "1 1" }
    ]
  },
  {
    id: "sort-selection",
    slug: "selection-sort",
    title: "Selection Sort",
    category: "Searching & Sorting",
    difficulty: "medium",
    description: `Implement selection sort algorithm.

**Example:** Given arr = [64, 25, 12, 22, 11], return [11, 12, 22, 25, 64].

Find the minimum element and swap it with the first unsorted position.`,
    inputFormat: "def selectionSort(arr: List[int]) -> List[int]:",
    outputFormat: "Return the sorted array.",
    constraints: "1 <= len(arr) <= 10^3",
    starterCode: `from typing import List

def selectionSort(arr: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
result = selectionSort(arr)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "64 25 12 22 11", expectedOutput: "11 12 22 25 64" },
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "1 2 3" },
      { input: "3 1 2", expectedOutput: "1 2 3" },
      { input: "0 0 0", expectedOutput: "0 0 0" },
      { input: "-3 -1 -2", expectedOutput: "-3 -2 -1" },
      { input: "100 50 25 75", expectedOutput: "25 50 75 100" }
    ]
  },
  {
    id: "sort-insertion",
    slug: "insertion-sort",
    title: "Insertion Sort",
    category: "Searching & Sorting",
    difficulty: "medium",
    description: `Implement insertion sort algorithm.

**Example:** Given arr = [12, 11, 13, 5, 6], return [5, 6, 11, 12, 13].

Build the sorted array one item at a time by inserting each element in its correct position.`,
    inputFormat: "def insertionSort(arr: List[int]) -> List[int]:",
    outputFormat: "Return the sorted array.",
    constraints: "1 <= len(arr) <= 10^3",
    starterCode: `from typing import List

def insertionSort(arr: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
result = insertionSort(arr)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "12 11 13 5 6", expectedOutput: "5 6 11 12 13" },
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "1 2 3" },
      { input: "3 2 1", expectedOutput: "1 2 3" },
      { input: "5 5 5", expectedOutput: "5 5 5" },
      { input: "-1 -3 -2", expectedOutput: "-3 -2 -1" },
      { input: "10 20 30 40", expectedOutput: "10 20 30 40" }
    ]
  },

  // 🔴 Hard - Searching & Sorting
  {
    id: "sort-merge",
    slug: "merge-sort",
    title: "Merge Sort",
    category: "Searching & Sorting",
    difficulty: "hard",
    description: `Implement merge sort algorithm using divide and conquer.

**Example:** Given arr = [38, 27, 43, 3, 9, 82, 10], return [3, 9, 10, 27, 38, 43, 82].

Divide the array, recursively sort, then merge.`,
    inputFormat: "def mergeSort(arr: List[int]) -> List[int]:",
    outputFormat: "Return the sorted array.",
    constraints: "1 <= len(arr) <= 10^5",
    starterCode: `from typing import List

def mergeSort(arr: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
result = mergeSort(arr)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "38 27 43 3 9 82 10", expectedOutput: "3 9 10 27 38 43 82" },
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "1 2 3 4 5" },
      { input: "5 1 4 2 8", expectedOutput: "1 2 4 5 8" },
      { input: "-5 -10 -1", expectedOutput: "-10 -5 -1" },
      { input: "100 50 75 25", expectedOutput: "25 50 75 100" },
      { input: "1 1 1 1", expectedOutput: "1 1 1 1" }
    ]
  },
  {
    id: "sort-quick",
    slug: "quick-sort",
    title: "Quick Sort",
    category: "Searching & Sorting",
    difficulty: "hard",
    description: `Implement quick sort algorithm using divide and conquer.

**Example:** Given arr = [10, 7, 8, 9, 1, 5], return [1, 5, 7, 8, 9, 10].

Choose a pivot, partition around it, then recursively sort.`,
    inputFormat: "def quickSort(arr: List[int]) -> List[int]:",
    outputFormat: "Return the sorted array.",
    constraints: "1 <= len(arr) <= 10^5",
    starterCode: `from typing import List

def quickSort(arr: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
result = quickSort(arr)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "10 7 8 9 1 5", expectedOutput: "1 5 7 8 9 10" },
      { input: "5 4 3 2 1", expectedOutput: "1 2 3 4 5" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "1 2 3 4 5" },
      { input: "3 6 8 10 1 2 1", expectedOutput: "1 1 2 3 6 8 10" },
      { input: "-5 -1 -10", expectedOutput: "-10 -5 -1" },
      { input: "50 30 40 20 10", expectedOutput: "10 20 30 40 50" },
      { input: "2 2 2", expectedOutput: "2 2 2" }
    ]
  },
  {
    id: "sort-count-inversions",
    slug: "count-inversions",
    title: "Count Inversions in Array",
    category: "Searching & Sorting",
    difficulty: "hard",
    description: `Count the number of inversions in an array. An inversion is a pair (i, j) where i < j but arr[i] > arr[j].

**Example:** Given arr = [2, 4, 1, 3, 5], return 3 (inversions: (2,1), (4,1), (4,3)).

Use modified merge sort for O(n log n) solution.`,
    inputFormat: "def countInversions(arr: List[int]) -> int:",
    outputFormat: "Return the number of inversions.",
    constraints: "1 <= len(arr) <= 10^5",
    starterCode: `from typing import List

def countInversions(arr: List[int]) -> int:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
print(countInversions(arr))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 4 1 3 5", expectedOutput: "3" },
      { input: "1 2 3 4 5", expectedOutput: "0" },
      { input: "5 4 3 2 1", expectedOutput: "10" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "0" },
      { input: "2 1", expectedOutput: "1" },
      { input: "1 20 6 4 5", expectedOutput: "5" },
      { input: "8 4 2 1", expectedOutput: "6" },
      { input: "1 1 1 1", expectedOutput: "0" }
    ]
  },

  // ============================================================================
  // 📦 5. STACK & QUEUE
  // ============================================================================
  
  // 🟢 Easy - Stack & Queue
  {
    id: "stack-using-list",
    slug: "implement-stack",
    title: "Implement Stack Using List",
    category: "Stack & Queue",
    difficulty: "easy",
    description: `Implement a stack with push, pop, peek, and isEmpty operations.

**Operations:**
- push x: Add x to top
- pop: Remove and return top element
- peek: Return top element without removing
- isEmpty: Check if stack is empty`,
    inputFormat: "Implement Stack class with push, pop, peek, isEmpty methods",
    outputFormat: "For pop and peek, output the result. For isEmpty, output True/False.",
    constraints: "1 <= n operations <= 10^4",
    starterCode: `class Stack:
    def __init__(self):
        # Your code here
        pass
    
    def push(self, x: int) -> None:
        # Your code here
        pass
    
    def pop(self) -> int:
        # Your code here
        pass
    
    def peek(self) -> int:
        # Your code here
        pass
    
    def isEmpty(self) -> bool:
        # Your code here
        pass

# Read and process operations
stack = Stack()
n = int(input())
results = []
for _ in range(n):
    op = input().split()
    if op[0] == 'push':
        stack.push(int(op[1]))
    elif op[0] == 'pop':
        results.append(str(stack.pop()))
    elif op[0] == 'peek':
        results.append(str(stack.peek()))
    else:
        results.append(str(stack.isEmpty()))
print('\\n'.join(results))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6\npush 1\npush 2\npeek\npop\npop\nisEmpty", expectedOutput: "2\n2\n1\nTrue" }
    ],
    hiddenTestCases: [
      { input: "3\nisEmpty\npush 5\nisEmpty", expectedOutput: "True\nFalse" },
      { input: "4\npush 10\npush 20\npop\npeek", expectedOutput: "20\n10" }
    ]
  },
  {
    id: "queue-using-list",
    slug: "implement-queue",
    title: "Implement Queue Using List",
    category: "Stack & Queue",
    difficulty: "easy",
    description: `Implement a queue with enqueue, dequeue, front, and isEmpty operations.

**Operations:**
- enqueue x: Add x to rear
- dequeue: Remove and return front element
- front: Return front element without removing
- isEmpty: Check if queue is empty`,
    inputFormat: "Implement Queue class with enqueue, dequeue, front, isEmpty methods",
    outputFormat: "For dequeue and front, output the result. For isEmpty, output True/False.",
    constraints: "1 <= n operations <= 10^4",
    starterCode: `class Queue:
    def __init__(self):
        # Your code here
        pass
    
    def enqueue(self, x: int) -> None:
        # Your code here
        pass
    
    def dequeue(self) -> int:
        # Your code here
        pass
    
    def front(self) -> int:
        # Your code here
        pass
    
    def isEmpty(self) -> bool:
        # Your code here
        pass

# Read and process operations
queue = Queue()
n = int(input())
results = []
for _ in range(n):
    op = input().split()
    if op[0] == 'enqueue':
        queue.enqueue(int(op[1]))
    elif op[0] == 'dequeue':
        results.append(str(queue.dequeue()))
    elif op[0] == 'front':
        results.append(str(queue.front()))
    else:
        results.append(str(queue.isEmpty()))
print('\\n'.join(results))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6\nenqueue 1\nenqueue 2\nfront\ndequeue\ndequeue\nisEmpty", expectedOutput: "1\n1\n2\nTrue" }
    ],
    hiddenTestCases: [
      { input: "3\nisEmpty\nenqueue 5\nisEmpty", expectedOutput: "True\nFalse" },
      { input: "4\nenqueue 10\nenqueue 20\ndequeue\nfront", expectedOutput: "10\n20" }
    ]
  },

  // 🟡 Medium - Stack & Queue
  {
    id: "stack-balanced-parentheses",
    slug: "balanced-parentheses",
    title: "Check Balanced Parentheses",
    category: "Stack & Queue",
    difficulty: "medium",
    description: `Check if a string of parentheses is balanced.

**Example:** Given s = "([{}])", return True.

Handle multiple types: (), [], {}.`,
    inputFormat: "def isBalanced(s: str) -> bool:",
    outputFormat: "Return True if balanced, False otherwise.",
    constraints: "0 <= len(s) <= 10^4\ns contains only ()[]{}",
    starterCode: `def isBalanced(s: str) -> bool:
    # Your code here
    pass

# Read input
s = input()
print(isBalanced(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "([{}])", expectedOutput: "True" },
      { input: "([)]", expectedOutput: "False" },
      { input: "", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "(", expectedOutput: "False" },
      { input: "()", expectedOutput: "True" },
      { input: "{[]}", expectedOutput: "True" },
      { input: "((()))", expectedOutput: "True" },
      { input: "([{]})", expectedOutput: "False" }
    ]
  },
  {
    id: "stack-reverse-string",
    slug: "reverse-string-using-stack",
    title: "Reverse String Using Stack",
    category: "Stack & Queue",
    difficulty: "medium",
    description: `Reverse a string using a stack data structure.

**Example:** Given s = "hello", return "olleh".

Push all characters to stack, then pop them all.`,
    inputFormat: "def reverseUsingStack(s: str) -> str:",
    outputFormat: "Return the reversed string.",
    constraints: "1 <= len(s) <= 10^5",
    starterCode: `def reverseUsingStack(s: str) -> str:
    # Your code here - must use stack approach
    pass

# Read input
s = input()
print(reverseUsingStack(s))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "a", expectedOutput: "a" },
      { input: "ab", expectedOutput: "ba" }
    ],
    hiddenTestCases: [
      { input: "Python", expectedOutput: "nohtyP" },
      { input: "12345", expectedOutput: "54321" },
      { input: "stack", expectedOutput: "kcats" },
      { input: "  ", expectedOutput: "  " },
      { input: "abba", expectedOutput: "abba" }
    ]
  },
  {
    id: "queue-using-two-stacks",
    slug: "queue-using-stacks",
    title: "Implement Queue Using Two Stacks",
    category: "Stack & Queue",
    difficulty: "medium",
    description: `Implement a queue using only two stacks.

**Operations:**
- enqueue x: Add x to rear
- dequeue: Remove and return front element

Use lazy transfer - only transfer when necessary.`,
    inputFormat: "Implement MyQueue class using two stacks",
    outputFormat: "For dequeue operations, output the result.",
    constraints: "1 <= n operations <= 10^4",
    starterCode: `class MyQueue:
    def __init__(self):
        # Your code here - use two stacks
        pass
    
    def enqueue(self, x: int) -> None:
        # Your code here
        pass
    
    def dequeue(self) -> int:
        # Your code here
        pass

# Read and process operations
queue = MyQueue()
n = int(input())
results = []
for _ in range(n):
    op = input().split()
    if op[0] == 'enqueue':
        queue.enqueue(int(op[1]))
    else:
        results.append(str(queue.dequeue()))
print('\\n'.join(results))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\nenqueue 1\nenqueue 2\ndequeue\nenqueue 3\ndequeue", expectedOutput: "1\n2" }
    ],
    hiddenTestCases: [
      { input: "4\nenqueue 10\ndequeue\nenqueue 20\ndequeue", expectedOutput: "10\n20" },
      { input: "6\nenqueue 1\nenqueue 2\nenqueue 3\ndequeue\ndequeue\ndequeue", expectedOutput: "1\n2\n3" }
    ]
  },

  // 🔴 Hard - Stack & Queue
  {
    id: "stack-next-greater-element",
    slug: "next-greater-element",
    title: "Next Greater Element",
    category: "Stack & Queue",
    difficulty: "hard",
    description: `Find the next greater element for each element in the array.

**Example:** Given arr = [4, 5, 2, 25], return [5, 25, 25, -1].

For each element, find the first greater element to its right. Return -1 if none exists.`,
    inputFormat: "def nextGreater(arr: List[int]) -> List[int]:",
    outputFormat: "Return array of next greater elements.",
    constraints: "1 <= len(arr) <= 10^5",
    starterCode: `from typing import List

def nextGreater(arr: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
arr = list(map(int, input().split()))
result = nextGreater(arr)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 5 2 25", expectedOutput: "5 25 25 -1" },
      { input: "13 7 6 12", expectedOutput: "-1 12 12 -1" },
      { input: "1 2 3 4", expectedOutput: "2 3 4 -1" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "-1" },
      { input: "5 4 3 2 1", expectedOutput: "-1 -1 -1 -1 -1" },
      { input: "1 3 2 4", expectedOutput: "3 4 4 -1" },
      { input: "6 8 0 1 3", expectedOutput: "8 -1 1 3 -1" },
      { input: "2 2 2", expectedOutput: "-1 -1 -1" }
    ]
  },
  {
    id: "stack-largest-rectangle-histogram",
    slug: "largest-rectangle-histogram",
    title: "Largest Rectangle in Histogram",
    category: "Stack & Queue",
    difficulty: "hard",
    description: `Find the largest rectangular area in a histogram.

**Example:** Given heights = [2, 1, 5, 6, 2, 3], return 10 (rectangle formed by heights[2] and heights[3]).

Use stack to track indices of increasing heights.`,
    inputFormat: "def largestRectangle(heights: List[int]) -> int:",
    outputFormat: "Return the area of the largest rectangle.",
    constraints: "1 <= len(heights) <= 10^5\n0 <= heights[i] <= 10^4",
    starterCode: `from typing import List

def largestRectangle(heights: List[int]) -> int:
    # Your code here
    pass

# Read input
heights = list(map(int, input().split()))
print(largestRectangle(heights))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 1 5 6 2 3", expectedOutput: "10" },
      { input: "2 4", expectedOutput: "4" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "6 2 5 4 5 1 6", expectedOutput: "12" },
      { input: "2 2 2 2", expectedOutput: "8" },
      { input: "1 2 3 4 5", expectedOutput: "9" },
      { input: "5 4 3 2 1", expectedOutput: "9" },
      { input: "3 6 5 7 4 8 1 0", expectedOutput: "20" }
    ]
  },
  {
    id: "stack-using-two-queues",
    slug: "stack-using-queues",
    title: "Implement Stack Using Two Queues",
    category: "Stack & Queue",
    difficulty: "hard",
    description: `Implement a stack using only two queues.

**Operations:**
- push x: Add x to top
- pop: Remove and return top element

Make either push or pop O(n) and the other O(1).`,
    inputFormat: "Implement MyStack class using two queues",
    outputFormat: "For pop operations, output the result.",
    constraints: "1 <= n operations <= 10^4",
    starterCode: `from collections import deque

class MyStack:
    def __init__(self):
        # Your code here - use two queues
        pass
    
    def push(self, x: int) -> None:
        # Your code here
        pass
    
    def pop(self) -> int:
        # Your code here
        pass

# Read and process operations
stack = MyStack()
n = int(input())
results = []
for _ in range(n):
    op = input().split()
    if op[0] == 'push':
        stack.push(int(op[1]))
    else:
        results.append(str(stack.pop()))
print('\\n'.join(results))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\npush 1\npush 2\npop\npush 3\npop", expectedOutput: "2\n3" }
    ],
    hiddenTestCases: [
      { input: "4\npush 10\npush 20\npop\npop", expectedOutput: "20\n10" },
      { input: "6\npush 1\npush 2\npush 3\npop\npop\npop", expectedOutput: "3\n2\n1" }
    ]
  },

  // ============================================================================
  // 🔗 6. LINKED LIST (Interview Favorite)
  // ============================================================================
  
  // 🟢 Easy - Linked List
  {
    id: "linkedlist-create-traverse",
    slug: "create-traverse-linked-list",
    title: "Create and Traverse Singly Linked List",
    category: "Linked List",
    difficulty: "easy",
    description: `Create a singly linked list from given values and traverse it.

**Example:** Given values = [1, 2, 3, 4, 5], create the list and return "1 -> 2 -> 3 -> 4 -> 5".

Implement Node class and linked list creation.`,
    inputFormat: "def createAndTraverse(values: List[int]) -> str:",
    outputFormat: "Return string representation 'val1 -> val2 -> ... -> valn'",
    constraints: "1 <= len(values) <= 10^4",
    starterCode: `from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def createAndTraverse(values: List[int]) -> str:
    # Your code here
    pass

# Read input
values = list(map(int, input().split()))
print(createAndTraverse(values))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "1 -> 2 -> 3 -> 4 -> 5" },
      { input: "1", expectedOutput: "1" },
      { input: "10 20", expectedOutput: "10 -> 20" }
    ],
    hiddenTestCases: [
      { input: "5 4 3 2 1", expectedOutput: "5 -> 4 -> 3 -> 2 -> 1" },
      { input: "100", expectedOutput: "100" },
      { input: "-1 -2 -3", expectedOutput: "-1 -> -2 -> -3" },
      { input: "0 0 0", expectedOutput: "0 -> 0 -> 0" },
      { input: "1 2 3", expectedOutput: "1 -> 2 -> 3" }
    ]
  },
  {
    id: "linkedlist-count-nodes",
    slug: "count-linked-list-nodes",
    title: "Count Nodes in Linked List",
    category: "Linked List",
    difficulty: "easy",
    description: `Count the number of nodes in a singly linked list.

**Example:** Given list 1 -> 2 -> 3 -> 4 -> 5, return 5.

Traverse the list and count each node.`,
    inputFormat: "def countNodes(values: List[int]) -> int:",
    outputFormat: "Return the count of nodes.",
    constraints: "0 <= len(values) <= 10^4",
    starterCode: `from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def countNodes(values: List[int]) -> int:
    # Your code here
    pass

# Read input
line = input().strip()
values = list(map(int, line.split())) if line else []
print(countNodes(values))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "5" },
      { input: "1", expectedOutput: "1" },
      { input: "", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "3" },
      { input: "10 20 30 40", expectedOutput: "4" },
      { input: "1 1 1 1 1 1", expectedOutput: "6" },
      { input: "100", expectedOutput: "1" },
      { input: "1 2", expectedOutput: "2" }
    ]
  },

  // 🟡 Medium - Linked List
  {
    id: "linkedlist-reverse",
    slug: "reverse-linked-list",
    title: "Reverse a Linked List",
    category: "Linked List",
    difficulty: "medium",
    description: `Reverse a singly linked list.

**Example:** Given 1 -> 2 -> 3 -> 4 -> 5, return 5 -> 4 -> 3 -> 2 -> 1.

Use three pointers: prev, current, next.`,
    inputFormat: "def reverseList(values: List[int]) -> str:",
    outputFormat: "Return the reversed list as string.",
    constraints: "0 <= len(values) <= 5000",
    starterCode: `from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(values: List[int]) -> str:
    # Your code here
    pass

# Read input
line = input().strip()
values = list(map(int, line.split())) if line else []
print(reverseList(values))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "5 -> 4 -> 3 -> 2 -> 1" },
      { input: "1 2", expectedOutput: "2 -> 1" },
      { input: "", expectedOutput: "" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2 3", expectedOutput: "3 -> 2 -> 1" },
      { input: "5 4 3 2 1", expectedOutput: "1 -> 2 -> 3 -> 4 -> 5" },
      { input: "10 20", expectedOutput: "20 -> 10" },
      { input: "1 1 1", expectedOutput: "1 -> 1 -> 1" }
    ]
  },
  {
    id: "linkedlist-find-middle",
    slug: "find-middle-linked-list",
    title: "Find Middle of Linked List",
    category: "Linked List",
    difficulty: "medium",
    description: `Find the middle node of a linked list.

**Example:** Given 1 -> 2 -> 3 -> 4 -> 5, return 3.

For even length lists, return the second middle node.
Use slow and fast pointer technique.`,
    inputFormat: "def findMiddle(values: List[int]) -> int:",
    outputFormat: "Return the value of the middle node.",
    constraints: "1 <= len(values) <= 10^4",
    starterCode: `from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def findMiddle(values: List[int]) -> int:
    # Your code here
    pass

# Read input
values = list(map(int, input().split()))
print(findMiddle(values))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "3" },
      { input: "1 2 3 4 5 6", expectedOutput: "4" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2", expectedOutput: "2" },
      { input: "1 2 3", expectedOutput: "2" },
      { input: "1 2 3 4", expectedOutput: "3" },
      { input: "10 20 30 40 50", expectedOutput: "30" },
      { input: "5 10 15 20 25 30 35", expectedOutput: "20" }
    ]
  },
  {
    id: "linkedlist-remove-nth-from-end",
    slug: "remove-nth-from-end",
    title: "Remove Nth Node From End",
    category: "Linked List",
    difficulty: "medium",
    description: `Remove the nth node from the end of a linked list.

**Example:** Given 1 -> 2 -> 3 -> 4 -> 5 and n = 2, return 1 -> 2 -> 3 -> 5.

Use two pointers with n nodes gap.`,
    inputFormat: "def removeNthFromEnd(values: List[int], n: int) -> str:",
    outputFormat: "Return the modified list as string.",
    constraints: "1 <= len(values) <= 30\n1 <= n <= len(values)",
    starterCode: `from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def removeNthFromEnd(values: List[int], n: int) -> str:
    # Your code here
    pass

# Read input
values = list(map(int, input().split()))
n = int(input())
print(removeNthFromEnd(values, n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "1 -> 2 -> 3 -> 5" },
      { input: "1\n1", expectedOutput: "" },
      { input: "1 2\n1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2\n2", expectedOutput: "2" },
      { input: "1 2 3\n3", expectedOutput: "2 -> 3" },
      { input: "1 2 3\n1", expectedOutput: "1 -> 2" },
      { input: "1 2 3 4 5\n5", expectedOutput: "2 -> 3 -> 4 -> 5" },
      { input: "10 20 30\n2", expectedOutput: "10 -> 30" }
    ]
  },

  // 🔴 Hard - Linked List
  {
    id: "linkedlist-detect-loop",
    slug: "detect-loop-linked-list",
    title: "Detect Loop in Linked List",
    category: "Linked List",
    difficulty: "hard",
    description: `Detect if a linked list has a cycle.

**Example:** Given 1 -> 2 -> 3 -> 4 -> 2 (cycle back to node 2), return True.

Use Floyd's cycle detection (slow and fast pointers).
Input: values and position where tail connects (0-indexed, -1 for no cycle).`,
    inputFormat: "def hasCycle(values: List[int], pos: int) -> bool:",
    outputFormat: "Return True if cycle exists, False otherwise.",
    constraints: "0 <= len(values) <= 10^4\n-1 <= pos < len(values)",
    starterCode: `from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def hasCycle(values: List[int], pos: int) -> bool:
    # Your code here
    pass

# Read input
values = list(map(int, input().split()))
pos = int(input())
print(hasCycle(values, pos))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 2 0 -4\n1", expectedOutput: "True" },
      { input: "1 2\n0", expectedOutput: "True" },
      { input: "1\n-1", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n-1", expectedOutput: "False" },
      { input: "1 2 3 4 5\n2", expectedOutput: "True" },
      { input: "1 2 3\n0", expectedOutput: "True" },
      { input: "1 2\n-1", expectedOutput: "False" },
      { input: "1\n0", expectedOutput: "True" }
    ]
  },
  {
    id: "linkedlist-merge-two-sorted",
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Linked Lists",
    category: "Linked List",
    difficulty: "hard",
    description: `Merge two sorted linked lists into one sorted list.

**Example:** Given 1 -> 2 -> 4 and 1 -> 3 -> 4, return 1 -> 1 -> 2 -> 3 -> 4 -> 4.

Use iterative or recursive approach.`,
    inputFormat: "def mergeLists(list1: List[int], list2: List[int]) -> str:",
    outputFormat: "Return the merged sorted list as string.",
    constraints: "0 <= len(list1), len(list2) <= 50",
    starterCode: `from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeLists(list1: List[int], list2: List[int]) -> str:
    # Your code here
    pass

# Read input
line1 = input().strip()
line2 = input().strip()
list1 = list(map(int, line1.split())) if line1 else []
list2 = list(map(int, line2.split())) if line2 else []
print(mergeLists(list1, list2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 4\n1 3 4", expectedOutput: "1 -> 1 -> 2 -> 3 -> 4 -> 4" },
      { input: "\n", expectedOutput: "" },
      { input: "\n0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2 3\n", expectedOutput: "1 -> 2 -> 3" },
      { input: "1\n2", expectedOutput: "1 -> 2" },
      { input: "5 10 15\n3 8 20", expectedOutput: "3 -> 5 -> 8 -> 10 -> 15 -> 20" },
      { input: "1 1 1\n1 1 1", expectedOutput: "1 -> 1 -> 1 -> 1 -> 1 -> 1" },
      { input: "2 4 6\n1 3 5", expectedOutput: "1 -> 2 -> 3 -> 4 -> 5 -> 6" }
    ]
  },
  {
    id: "linkedlist-intersection-point",
    slug: "intersection-two-lists",
    title: "Find Intersection Point of Two Linked Lists",
    category: "Linked List",
    difficulty: "hard",
    description: `Find the node where two linked lists intersect.

**Example:** List A: 4 -> 1 -> 8 -> 4 -> 5, List B: 5 -> 6 -> 1 -> 8 -> 4 -> 5
They intersect at node with value 8.

Return the value at intersection or -1 if no intersection.
Input format: list1 values, list2 values, skip1 (nodes before intersection in list1), skip2 (nodes before intersection in list2).`,
    inputFormat: "def getIntersection(list1: List[int], list2: List[int], skip1: int, skip2: int) -> int:",
    outputFormat: "Return the value at intersection or -1.",
    constraints: "0 <= len(lists) <= 3 * 10^4",
    starterCode: `from typing import List, Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def getIntersection(list1: List[int], list2: List[int], skip1: int, skip2: int) -> int:
    # Your code here
    pass

# Read input
list1 = list(map(int, input().split()))
list2 = list(map(int, input().split()))
skip1 = int(input())
skip2 = int(input())
print(getIntersection(list1, list2, skip1, skip2))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 1 8 4 5\n5 6 1 8 4 5\n2\n3", expectedOutput: "8" },
      { input: "1 9 1 2 4\n3 2 4\n3\n1", expectedOutput: "2" },
      { input: "2 6 4\n1 5\n3\n2", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3\n4 5 3\n2\n2", expectedOutput: "3" },
      { input: "1\n2\n1\n1", expectedOutput: "-1" },
      { input: "1 2 3 4 5\n6 7 3 4 5\n2\n2", expectedOutput: "3" }
    ]
  },

  // ============================================================================
  // 🌳 7. TREES
  // ============================================================================
  
  // 🟢 Easy - Trees
  {
    id: "tree-traversals",
    slug: "binary-tree-traversals",
    title: "Inorder, Preorder, Postorder Traversal",
    category: "Trees",
    difficulty: "easy",
    description: `Perform inorder, preorder, and postorder traversals of a binary tree.

**Example:** Given tree [1, 2, 3, 4, 5]:
- Inorder: 4 2 5 1 3
- Preorder: 1 2 4 5 3
- Postorder: 4 5 2 3 1

Input is level-order representation, 'null' for missing nodes.`,
    inputFormat: "def traversals(nodes: List[str]) -> str:",
    outputFormat: "Return 'inorder\\npreorder\\npostorder'",
    constraints: "0 <= number of nodes <= 100",
    starterCode: `from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def traversals(nodes: List[str]) -> str:
    # Your code here
    pass

# Read input
nodes = input().split()
print(traversals(nodes))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "4 2 5 1 3\n1 2 4 5 3\n4 5 2 3 1" },
      { input: "1", expectedOutput: "1\n1\n1" },
      { input: "1 2 3", expectedOutput: "2 1 3\n1 2 3\n2 3 1" }
    ],
    hiddenTestCases: [
      { input: "1 null 2 null 3", expectedOutput: "1 2 3\n1 2 3\n3 2 1" },
      { input: "3 1 4 null 2", expectedOutput: "1 2 3 4\n3 1 2 4\n2 1 4 3" },
      { input: "5 3 7 2 4 6 8", expectedOutput: "2 3 4 5 6 7 8\n5 3 2 4 7 6 8\n2 4 3 6 8 7 5" }
    ]
  },
  {
    id: "tree-height",
    slug: "binary-tree-height",
    title: "Find Height of Binary Tree",
    category: "Trees",
    difficulty: "easy",
    description: `Find the height of a binary tree.

**Example:** Given tree [1, 2, 3, 4, 5], height = 2.

Height is the number of edges from root to the deepest leaf.`,
    inputFormat: "def treeHeight(nodes: List[str]) -> int:",
    outputFormat: "Return the height of the tree.",
    constraints: "0 <= number of nodes <= 10^4",
    starterCode: `from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def treeHeight(nodes: List[str]) -> int:
    # Your code here
    pass

# Read input
line = input().strip()
nodes = line.split() if line else []
print(treeHeight(nodes))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "2" },
      { input: "1", expectedOutput: "0" },
      { input: "", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "1" },
      { input: "1 null 2 null 3", expectedOutput: "2" },
      { input: "3 9 20 null null 15 7", expectedOutput: "2" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "2" },
      { input: "1 2 null 3 null 4 null 5", expectedOutput: "4" }
    ]
  },

  // 🟡 Medium - Trees
  {
    id: "tree-is-balanced",
    slug: "check-balanced-tree",
    title: "Check if Binary Tree is Balanced",
    category: "Trees",
    difficulty: "medium",
    description: `Check if a binary tree is height-balanced.

**Example:** Given tree [3, 9, 20, null, null, 15, 7], return True.

A balanced tree has height difference of at most 1 between left and right subtrees for every node.`,
    inputFormat: "def isBalanced(nodes: List[str]) -> bool:",
    outputFormat: "Return True if balanced, False otherwise.",
    constraints: "0 <= number of nodes <= 5000",
    starterCode: `from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def isBalanced(nodes: List[str]) -> bool:
    # Your code here
    pass

# Read input
line = input().strip()
nodes = line.split() if line else []
print(isBalanced(nodes))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "True" },
      { input: "1 2 2 3 3 null null 4 4", expectedOutput: "False" },
      { input: "", expectedOutput: "True" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "True" },
      { input: "1 2 3", expectedOutput: "True" },
      { input: "1 2 null 3", expectedOutput: "True" },
      { input: "1 2 null 3 null 4", expectedOutput: "False" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "True" }
    ]
  },
  {
    id: "tree-lca",
    slug: "lowest-common-ancestor",
    title: "Lowest Common Ancestor (LCA)",
    category: "Trees",
    difficulty: "medium",
    description: `Find the lowest common ancestor of two nodes in a binary tree.

**Example:** Given tree [3, 5, 1, 6, 2, 0, 8] and nodes p=5, q=1, LCA is 3.

LCA is the deepest node that has both p and q as descendants.`,
    inputFormat: "def lowestCommonAncestor(nodes: List[str], p: int, q: int) -> int:",
    outputFormat: "Return the value of the LCA.",
    constraints: "Number of nodes in range [2, 10^5]\n-10^9 <= Node.val <= 10^9",
    starterCode: `from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowestCommonAncestor(nodes: List[str], p: int, q: int) -> int:
    # Your code here
    pass

# Read input
nodes = input().split()
p = int(input())
q = int(input())
print(lowestCommonAncestor(nodes, p, q))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 5 1 6 2 0 8 null null 7 4\n5\n1", expectedOutput: "3" },
      { input: "3 5 1 6 2 0 8 null null 7 4\n5\n4", expectedOutput: "5" },
      { input: "1 2\n1\n2", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "3 5 1\n5\n1", expectedOutput: "3" },
      { input: "1 2 3 4 5\n4\n5", expectedOutput: "2" },
      { input: "1 2 3 4 5 6 7\n6\n7", expectedOutput: "3" }
    ]
  },
  {
    id: "tree-level-order",
    slug: "level-order-traversal",
    title: "Level Order Traversal",
    category: "Trees",
    difficulty: "medium",
    description: `Perform level order (BFS) traversal of a binary tree.

**Example:** Given tree [3, 9, 20, null, null, 15, 7], return [[3], [9, 20], [15, 7]].

Use a queue to traverse level by level.`,
    inputFormat: "def levelOrder(nodes: List[str]) -> str:",
    outputFormat: "Return levels as 'level1|level2|...' where each level is space-separated values.",
    constraints: "0 <= number of nodes <= 2000",
    starterCode: `from typing import List, Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(nodes: List[str]) -> str:
    # Your code here
    pass

# Read input
line = input().strip()
nodes = line.split() if line else []
print(levelOrder(nodes))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "3|9 20|15 7" },
      { input: "1", expectedOutput: "1" },
      { input: "", expectedOutput: "" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "1|2 3" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "1|2 3|4 5 6 7" },
      { input: "1 null 2", expectedOutput: "1|2" },
      { input: "1 2 null 3", expectedOutput: "1|2|3" },
      { input: "5 4 7 3 null 6 8", expectedOutput: "5|4 7|3 6 8" }
    ]
  },

  // 🔴 Hard - Trees
  {
    id: "tree-diameter",
    slug: "diameter-binary-tree",
    title: "Diameter of Binary Tree",
    category: "Trees",
    difficulty: "hard",
    description: `Find the diameter (longest path) of a binary tree.

**Example:** Given tree [1, 2, 3, 4, 5], diameter = 3 (path: 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3).

Diameter is the number of edges on the longest path between any two nodes.`,
    inputFormat: "def diameterOfTree(nodes: List[str]) -> int:",
    outputFormat: "Return the diameter (number of edges).",
    constraints: "1 <= number of nodes <= 10^4",
    starterCode: `from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def diameterOfTree(nodes: List[str]) -> int:
    # Your code here
    pass

# Read input
nodes = input().split()
print(diameterOfTree(nodes))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "3" },
      { input: "1 2", expectedOutput: "1" },
      { input: "1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "2" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "4" },
      { input: "1 null 2 null 3 null 4", expectedOutput: "3" },
      { input: "4 2 6 1 3 5 7", expectedOutput: "4" },
      { input: "1 2 null 3 4", expectedOutput: "2" }
    ]
  },
  {
    id: "tree-serialize-deserialize",
    slug: "serialize-deserialize-tree",
    title: "Serialize and Deserialize Binary Tree",
    category: "Trees",
    difficulty: "hard",
    description: `Design an algorithm to serialize and deserialize a binary tree.

Serialization converts tree to string, deserialization reconstructs the tree.

**Example:** Tree [1, 2, 3, null, null, 4, 5] → "1,2,3,null,null,4,5"

Output the deserialized tree's level order to verify correctness.`,
    inputFormat: "def serializeDeserialize(nodes: List[str]) -> str:",
    outputFormat: "Return the serialized string.",
    constraints: "0 <= number of nodes <= 10^4",
    starterCode: `from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        # Your code here
        pass
    
    def deserialize(self, data: str) -> Optional[TreeNode]:
        # Your code here
        pass

def serializeDeserialize(nodes: List[str]) -> str:
    # Your code here
    pass

# Read input
line = input().strip()
nodes = line.split() if line else []
print(serializeDeserialize(nodes))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 null null 4 5", expectedOutput: "1,2,3,null,null,4,5" },
      { input: "", expectedOutput: "" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "1,2,3" },
      { input: "1 null 2", expectedOutput: "1,null,2" },
      { input: "5 4 7 3 null 6 8", expectedOutput: "5,4,7,3,null,6,8" }
    ]
  },
  {
    id: "tree-to-doubly-linked-list",
    slug: "tree-to-dll",
    title: "Convert Binary Tree to Doubly Linked List",
    category: "Trees",
    difficulty: "hard",
    description: `Convert a binary search tree to a sorted circular doubly linked list in-place.

**Example:** Given BST [4, 2, 5, 1, 3], convert to DLL: 1 <-> 2 <-> 3 <-> 4 <-> 5.

Return the DLL as a string of values in order.`,
    inputFormat: "def treeToDoublyList(nodes: List[str]) -> str:",
    outputFormat: "Return the DLL values as space-separated string.",
    constraints: "0 <= number of nodes <= 2000",
    starterCode: `from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def treeToDoublyList(nodes: List[str]) -> str:
    # Your code here
    pass

# Read input
line = input().strip()
nodes = line.split() if line else []
print(treeToDoublyList(nodes))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 2 5 1 3", expectedOutput: "1 2 3 4 5" },
      { input: "2 1 3", expectedOutput: "1 2 3" },
      { input: "", expectedOutput: "" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "5 3 7", expectedOutput: "3 5 7" },
      { input: "10 5 15 3 7 12 20", expectedOutput: "3 5 7 10 12 15 20" }
    ]
  },

  // ============================================================================
  // 🔁 8. RECURSION & BACKTRACKING
  // ============================================================================
  
  // 🟢 Easy - Recursion & Backtracking
  {
    id: "recursion-factorial",
    slug: "factorial-recursion",
    title: "Factorial Using Recursion",
    category: "Recursion & Backtracking",
    difficulty: "easy",
    description: `Calculate the factorial of a number using recursion.

**Example:** Given n = 5, return 120 (5! = 5 × 4 × 3 × 2 × 1).

Base case: 0! = 1! = 1.`,
    inputFormat: "def factorial(n: int) -> int:",
    outputFormat: "Return n!",
    constraints: "0 <= n <= 12",
    starterCode: `def factorial(n: int) -> int:
    # Your code here - use recursion
    pass

# Read input
n = int(input())
print(factorial(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5", expectedOutput: "120" },
      { input: "0", expectedOutput: "1" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "3", expectedOutput: "6" },
      { input: "7", expectedOutput: "5040" },
      { input: "10", expectedOutput: "3628800" },
      { input: "12", expectedOutput: "479001600" },
      { input: "2", expectedOutput: "2" }
    ]
  },
  {
    id: "recursion-fibonacci",
    slug: "fibonacci-recursion",
    title: "Fibonacci Using Recursion",
    category: "Recursion & Backtracking",
    difficulty: "easy",
    description: `Calculate the nth Fibonacci number using recursion.

**Example:** Given n = 6, return 8 (sequence: 0, 1, 1, 2, 3, 5, 8).

F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2).`,
    inputFormat: "def fibonacci(n: int) -> int:",
    outputFormat: "Return the nth Fibonacci number.",
    constraints: "0 <= n <= 30",
    starterCode: `def fibonacci(n: int) -> int:
    # Your code here - use recursion
    pass

# Read input
n = int(input())
print(fibonacci(n))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6", expectedOutput: "8" },
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "2", expectedOutput: "1" },
      { input: "10", expectedOutput: "55" },
      { input: "15", expectedOutput: "610" },
      { input: "20", expectedOutput: "6765" },
      { input: "5", expectedOutput: "5" }
    ]
  },

  // 🟡 Medium - Recursion & Backtracking
  {
    id: "backtracking-permutations",
    slug: "generate-permutations",
    title: "Generate All Permutations of String",
    category: "Recursion & Backtracking",
    difficulty: "medium",
    description: `Generate all permutations of a string.

**Example:** Given s = "abc", return ["abc", "acb", "bac", "bca", "cab", "cba"].

Use backtracking to swap characters and explore all possibilities.`,
    inputFormat: "def permutations(s: str) -> List[str]:",
    outputFormat: "Return permutations sorted and newline-separated.",
    constraints: "1 <= len(s) <= 8\nAll characters are unique lowercase letters",
    starterCode: `from typing import List

def permutations(s: str) -> List[str]:
    # Your code here
    pass

# Read input
s = input()
result = permutations(s)
print('\\n'.join(sorted(result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ab", expectedOutput: "ab\nba" },
      { input: "a", expectedOutput: "a" },
      { input: "abc", expectedOutput: "abc\nacb\nbac\nbca\ncab\ncba" }
    ],
    hiddenTestCases: [
      { input: "xy", expectedOutput: "xy\nyx" },
      { input: "123", expectedOutput: "123\n132\n213\n231\n312\n321" },
      { input: "abcd", expectedOutput: "abcd\nabdc\nacbd\nacdb\nadbc\nadcb\nbacd\nbadc\nbcad\nbcda\nbdac\nbdca\ncabd\ncadb\ncbad\ncbda\ncdab\ncdba\ndabc\ndacb\ndbac\ndbca\ndcab\ndcba" }
    ]
  },
  {
    id: "backtracking-subsets",
    slug: "generate-all-subsets",
    title: "Generate All Subsets",
    category: "Recursion & Backtracking",
    difficulty: "medium",
    description: `Generate all subsets (power set) of a list of distinct integers.

**Example:** Given nums = [1, 2, 3], return [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]].

Use backtracking or iterative approach.`,
    inputFormat: "def subsets(nums: List[int]) -> List[List[int]]:",
    outputFormat: "Return subsets sorted by size, then lexicographically.",
    constraints: "1 <= len(nums) <= 10\nAll elements are unique",
    starterCode: `from typing import List

def subsets(nums: List[int]) -> List[List[int]]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = subsets(nums)
for subset in sorted(result, key=lambda x: (len(x), x)):
    print(' '.join(map(str, subset)) if subset else '[]')`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3", expectedOutput: "[]\n1\n2\n3\n1 2\n1 3\n2 3\n1 2 3" },
      { input: "0", expectedOutput: "[]\n0" },
      { input: "1 2", expectedOutput: "[]\n1\n2\n1 2" }
    ],
    hiddenTestCases: [
      { input: "5", expectedOutput: "[]\n5" },
      { input: "1 3 5", expectedOutput: "[]\n1\n3\n5\n1 3\n1 5\n3 5\n1 3 5" },
      { input: "2 4", expectedOutput: "[]\n2\n4\n2 4" }
    ]
  },

  // 🔴 Hard - Recursion & Backtracking
  {
    id: "backtracking-n-queens",
    slug: "n-queens-problem",
    title: "N-Queens Problem",
    category: "Recursion & Backtracking",
    difficulty: "hard",
    description: `Place n queens on an n×n chessboard such that no two queens attack each other.

**Example:** For n = 4, one solution is:
.Q..
...Q
Q...
..Q.

Return the number of distinct solutions.`,
    inputFormat: "def solveNQueens(n: int) -> int:",
    outputFormat: "Return the count of distinct solutions.",
    constraints: "1 <= n <= 9",
    starterCode: `def solveNQueens(n: int) -> int:
    # Your code here
    pass

# Read input
n = int(input())
print(solveNQueens(n))`,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4", expectedOutput: "2" },
      { input: "1", expectedOutput: "1" },
      { input: "8", expectedOutput: "92" }
    ],
    hiddenTestCases: [
      { input: "2", expectedOutput: "0" },
      { input: "3", expectedOutput: "0" },
      { input: "5", expectedOutput: "10" },
      { input: "6", expectedOutput: "4" },
      { input: "7", expectedOutput: "40" }
    ]
  },
  {
    id: "backtracking-sudoku-solver",
    slug: "sudoku-solver",
    title: "Sudoku Solver",
    category: "Recursion & Backtracking",
    difficulty: "hard",
    description: `Solve a 9×9 Sudoku puzzle.

Each row, column, and 3×3 box must contain digits 1-9 without repetition.
Input has '0' for empty cells.

Output the solved grid row by row.`,
    inputFormat: "def solveSudoku(board: List[List[int]]) -> List[List[int]]:",
    outputFormat: "Return the solved Sudoku grid.",
    constraints: "The puzzle has exactly one solution",
    starterCode: `from typing import List

def solveSudoku(board: List[List[int]]) -> List[List[int]]:
    # Your code here
    pass

# Read input
board = []
for _ in range(9):
    row = list(map(int, input().split()))
    board.append(row)
result = solveSudoku(board)
for row in result:
    print(' '.join(map(str, row)))`,
    timeLimitMs: 5000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 3 0 0 7 0 0 0 0\n6 0 0 1 9 5 0 0 0\n0 9 8 0 0 0 0 6 0\n8 0 0 0 6 0 0 0 3\n4 0 0 8 0 3 0 0 1\n7 0 0 0 2 0 0 0 6\n0 6 0 0 0 0 2 8 0\n0 0 0 4 1 9 0 0 5\n0 0 0 0 8 0 0 7 9", expectedOutput: "5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9" }
    ],
    hiddenTestCases: [
      { input: "0 0 0 2 6 0 7 0 1\n6 8 0 0 7 0 0 9 0\n1 9 0 0 0 4 5 0 0\n8 2 0 1 0 0 0 4 0\n0 0 4 6 0 2 9 0 0\n0 5 0 0 0 3 0 2 8\n0 0 9 3 0 0 0 7 4\n0 4 0 0 5 0 0 3 6\n7 0 3 0 1 8 0 0 0", expectedOutput: "4 3 5 2 6 9 7 8 1\n6 8 2 5 7 1 4 9 3\n1 9 7 8 3 4 5 6 2\n8 2 6 1 9 5 3 4 7\n3 7 4 6 8 2 9 1 5\n9 5 1 7 4 3 6 2 8\n5 1 9 3 2 6 8 7 4\n2 4 8 9 5 7 1 3 6\n7 6 3 4 1 8 2 5 9" }
    ]
  },
  {
    id: "backtracking-rat-in-maze",
    slug: "rat-in-maze",
    title: "Rat in a Maze",
    category: "Recursion & Backtracking",
    difficulty: "hard",
    description: `Find all paths for a rat to reach from (0,0) to (n-1,n-1) in a maze.

The rat can move: Down (D), Left (L), Right (R), Up (U).
1 = open cell, 0 = blocked cell.

Return all paths sorted lexicographically.`,
    inputFormat: "def findPaths(maze: List[List[int]]) -> List[str]:",
    outputFormat: "Return all paths sorted, one per line.",
    constraints: "2 <= n <= 5\nmaze[0][0] = maze[n-1][n-1] = 1",
    starterCode: `from typing import List

def findPaths(maze: List[List[int]]) -> List[str]:
    # Your code here
    pass

# Read input
n = int(input())
maze = []
for _ in range(n):
    row = list(map(int, input().split()))
    maze.append(row)
result = findPaths(maze)
if result:
    print('\\n'.join(sorted(result)))
else:
    print("No path")`,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n1 0 0 0\n1 1 0 1\n1 1 0 0\n0 1 1 1", expectedOutput: "DDRDRR\nDDRURDRR" },
      { input: "2\n1 0\n1 1", expectedOutput: "DR" },
      { input: "3\n1 1 1\n1 1 1\n1 1 1", expectedOutput: "DDRR\nDRDR\nDRRD\nRDDR\nRDRD\nRRDD" }
    ],
    hiddenTestCases: [
      { input: "2\n1 1\n1 1", expectedOutput: "DR\nRD" },
      { input: "3\n1 0 0\n1 0 0\n1 1 1", expectedOutput: "DDRR" },
      { input: "2\n1 0\n0 1", expectedOutput: "No path" }
    ]
  },

  // ============================================================================
  // 🗂️ 9. HASHING / DICTIONARY BASED
  // ============================================================================
  
  // 🟢 Easy - Hashing
  {
    id: "hash-frequency-count",
    slug: "count-element-frequency",
    title: "Count Frequency of Elements",
    category: "Hashing",
    difficulty: "easy",
    description: `Count the frequency of each element in an array using a hash map.

**Example:** Given nums = [1, 2, 2, 3, 3, 3], return {1: 1, 2: 2, 3: 3}.

Output as "element:count" pairs sorted by element.`,
    inputFormat: "def countFrequency(nums: List[int]) -> str:",
    outputFormat: "Return 'elem:count' pairs sorted by element, space-separated.",
    constraints: "1 <= len(nums) <= 10^5",
    starterCode: `from typing import List

def countFrequency(nums: List[int]) -> str:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(countFrequency(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 2 3 3 3", expectedOutput: "1:1 2:2 3:3" },
      { input: "1 1 1 1", expectedOutput: "1:4" },
      { input: "5 4 3 2 1", expectedOutput: "1:1 2:1 3:1 4:1 5:1" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1:1" },
      { input: "1 2 1 2 1 2", expectedOutput: "1:3 2:3" },
      { input: "-1 -1 0 0 1 1", expectedOutput: "-1:2 0:2 1:2" },
      { input: "10 20 10 30 20 10", expectedOutput: "10:3 20:2 30:1" },
      { input: "5 5 5 5 5", expectedOutput: "5:5" }
    ]
  },
  {
    id: "hash-find-duplicates",
    slug: "find-duplicates-hashmap",
    title: "Find Duplicate Elements Using HashMap",
    category: "Hashing",
    difficulty: "easy",
    description: `Find all duplicate elements in an array using a hash map.

**Example:** Given nums = [1, 2, 3, 2, 1, 4], return [1, 2].

Return duplicates sorted in ascending order.`,
    inputFormat: "def findDuplicates(nums: List[int]) -> List[int]:",
    outputFormat: "Return sorted list of duplicates, space-separated.",
    constraints: "1 <= len(nums) <= 10^5",
    starterCode: `from typing import List

def findDuplicates(nums: List[int]) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
result = findDuplicates(nums)
print(' '.join(map(str, result)) if result else 'None')`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 2 1 4", expectedOutput: "1 2" },
      { input: "1 2 3 4 5", expectedOutput: "None" },
      { input: "1 1 1 1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "None" },
      { input: "1 2 1 2 3 3", expectedOutput: "1 2 3" },
      { input: "-1 -1 1 1", expectedOutput: "-1 1" },
      { input: "5 4 3 2 1", expectedOutput: "None" },
      { input: "10 20 10 30 20", expectedOutput: "10 20" }
    ]
  },

  // 🟡 Medium - Hashing
  {
    id: "hash-two-sum",
    slug: "two-sum-hashmap",
    title: "Two Sum Using HashMap",
    category: "Hashing",
    difficulty: "medium",
    description: `Find two numbers that add up to target using a hash map (O(n) solution).

**Example:** Given nums = [2, 7, 11, 15] and target = 9, return [0, 1].

Return indices of the two numbers.`,
    inputFormat: "def twoSum(nums: List[int], target: int) -> List[int]:",
    outputFormat: "Return indices as 'i j'.",
    constraints: "2 <= len(nums) <= 10^4\nExactly one solution exists",
    starterCode: `from typing import List

def twoSum(nums: List[int], target: int) -> List[int]:
    # Your code here - use hash map for O(n)
    pass

# Read input
nums = list(map(int, input().split()))
target = int(input())
result = twoSum(nums, target)
print(f"{result[0]} {result[1]}")`,
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
      { input: "0 4 3 0\n0", expectedOutput: "0 3" },
      { input: "1 5 5 11\n10", expectedOutput: "1 2" },
      { input: "2 5 5 11\n10", expectedOutput: "1 2" }
    ]
  },
  {
    id: "hash-group-anagrams",
    slug: "group-anagrams",
    title: "Group Anagrams",
    category: "Hashing",
    difficulty: "medium",
    description: `Group strings that are anagrams of each other.

**Example:** Given strs = ["eat", "tea", "tan", "ate", "nat", "bat"], 
return [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]].

Use sorted string as key in hash map.`,
    inputFormat: "def groupAnagrams(strs: List[str]) -> List[List[str]]:",
    outputFormat: "Return groups sorted, each group sorted, pipe-separated.",
    constraints: "1 <= len(strs) <= 10^4\n0 <= len(strs[i]) <= 100",
    starterCode: `from typing import List

def groupAnagrams(strs: List[str]) -> List[List[str]]:
    # Your code here
    pass

# Read input
strs = input().split(',')
result = groupAnagrams(strs)
sorted_result = sorted([sorted(group) for group in result])
for group in sorted_result:
    print(' '.join(group))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "eat,tea,tan,ate,nat,bat", expectedOutput: "ate eat tea\nbat\nnat tan" },
      { input: "", expectedOutput: "" },
      { input: "a", expectedOutput: "a" }
    ],
    hiddenTestCases: [
      { input: "ab,ba", expectedOutput: "ab ba" },
      { input: "abc,bca,cab,xyz", expectedOutput: "abc bca cab\nxyz" },
      { input: "a,b,c", expectedOutput: "a\nb\nc" },
      { input: "listen,silent,enlist", expectedOutput: "enlist listen silent" }
    ]
  },

  // 🔴 Hard - Hashing
  {
    id: "hash-longest-consecutive",
    slug: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    category: "Hashing",
    difficulty: "hard",
    description: `Find the length of the longest consecutive elements sequence.

**Example:** Given nums = [100, 4, 200, 1, 3, 2], return 4 (sequence [1, 2, 3, 4]).

Must run in O(n) time using hash set.`,
    inputFormat: "def longestConsecutive(nums: List[int]) -> int:",
    outputFormat: "Return the length of longest consecutive sequence.",
    constraints: "0 <= len(nums) <= 10^5",
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
      { input: "", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 2 3 4 5", expectedOutput: "5" },
      { input: "5 4 3 2 1", expectedOutput: "5" },
      { input: "1 3 5 7 9", expectedOutput: "1" },
      { input: "0 0 1 1 2 2", expectedOutput: "3" }
    ]
  },
  {
    id: "hash-subarray-zero-sum",
    slug: "subarray-with-zero-sum",
    title: "Subarray with Zero Sum",
    category: "Hashing",
    difficulty: "hard",
    description: `Check if there exists a subarray with sum equal to zero.

**Example:** Given nums = [4, 2, -3, 1, 6], return True (subarray [2, -3, 1]).

Use prefix sum with hash set for O(n) solution.`,
    inputFormat: "def hasZeroSumSubarray(nums: List[int]) -> bool:",
    outputFormat: "Return True if zero-sum subarray exists, False otherwise.",
    constraints: "1 <= len(nums) <= 10^5",
    starterCode: `from typing import List

def hasZeroSumSubarray(nums: List[int]) -> bool:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
print(hasZeroSumSubarray(nums))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 2 -3 1 6", expectedOutput: "True" },
      { input: "4 2 0 1 6", expectedOutput: "True" },
      { input: "1 2 3", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "True" },
      { input: "1 -1", expectedOutput: "True" },
      { input: "1 2 -3", expectedOutput: "True" },
      { input: "1 2 3 4 5", expectedOutput: "False" },
      { input: "-3 2 3 1 6", expectedOutput: "False" }
    ]
  },

  // ============================================================================
  // 🎯 10. MUST-HAVE "FINAL ROUND" PROBLEMS
  // ============================================================================
  
  {
    id: "final-lru-cache",
    slug: "lru-cache-final",
    title: "LRU Cache (Interview Classic)",
    category: "Must-Have Interview",
    difficulty: "hard",
    description: `Design and implement an LRU (Least Recently Used) cache.

Operations:
- get(key): Return value if exists, else -1. Marks as recently used.
- put(key, value): Insert or update. Evict LRU item if at capacity.

Both operations must be O(1) time complexity.`,
    inputFormat: "Implement LRUCache with O(1) get and put",
    outputFormat: "For get operations, output the result.",
    constraints: "1 <= capacity <= 3000\n0 <= key, value <= 10^4",
    starterCode: `class LRUCache:
    def __init__(self, capacity: int):
        # Your code here - use OrderedDict or custom DLL + HashMap
        pass
    
    def get(self, key: int) -> int:
        # Your code here
        pass
    
    def put(self, key: int, value: int) -> None:
        # Your code here
        pass

# Read and process operations
capacity = int(input())
cache = LRUCache(capacity)
n = int(input())
results = []
for _ in range(n):
    op = input().split()
    if op[0] == 'get':
        results.append(str(cache.get(int(op[1]))))
    else:
        cache.put(int(op[1]), int(op[2]))
print('\\n'.join(results))`,
    timeLimitMs: 3000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2\n7\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1", expectedOutput: "1\n-1\n-1" }
    ],
    hiddenTestCases: [
      { input: "2\n6\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3", expectedOutput: "1\n-1\n3" },
      { input: "1\n5\nput 1 1\nget 1\nput 2 2\nget 1\nget 2", expectedOutput: "1\n-1\n2" }
    ]
  },
  {
    id: "final-sliding-window-max",
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    category: "Must-Have Interview",
    difficulty: "hard",
    description: `Find the maximum element in each sliding window of size k.

**Example:** Given nums = [1,3,-1,-3,5,3,6,7] and k = 3, return [3,3,5,5,6,7].

Use monotonic deque for O(n) solution.`,
    inputFormat: "def maxSlidingWindow(nums: List[int], k: int) -> List[int]:",
    outputFormat: "Return the maximum in each window, space-separated.",
    constraints: "1 <= len(nums) <= 10^5\n1 <= k <= len(nums)",
    starterCode: `from typing import List
from collections import deque

def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    # Your code here
    pass

# Read input
nums = list(map(int, input().split()))
k = int(input())
result = maxSlidingWindow(nums, k)
print(' '.join(map(str, result)))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 3 -1 -3 5 3 6 7\n3", expectedOutput: "3 3 5 5 6 7" },
      { input: "1\n1", expectedOutput: "1" },
      { input: "1 -1\n1", expectedOutput: "1 -1" }
    ],
    hiddenTestCases: [
      { input: "9 11\n2", expectedOutput: "11" },
      { input: "4 -2\n2", expectedOutput: "4" },
      { input: "1 2 3 4 5\n2", expectedOutput: "2 3 4 5" },
      { input: "5 4 3 2 1\n3", expectedOutput: "5 4 3" },
      { input: "1 3 1 2 0 5\n3", expectedOutput: "3 3 2 5" }
    ]
  },
  {
    id: "final-median-two-arrays",
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    category: "Must-Have Interview",
    difficulty: "hard",
    description: `Find the median of two sorted arrays.

**Example:** Given nums1 = [1, 3] and nums2 = [2], return 2.0.

Must achieve O(log(min(m,n))) complexity using binary search.`,
    inputFormat: "def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:",
    outputFormat: "Return the median as a float.",
    constraints: "0 <= len(nums1), len(nums2) <= 1000\nArrays are sorted",
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
      { input: "1 2\n3 4", expectedOutput: "2.5" },
      { input: "0 0\n0 0", expectedOutput: "0.0" }
    ],
    hiddenTestCases: [
      { input: "\n1", expectedOutput: "1.0" },
      { input: "2\n", expectedOutput: "2.0" },
      { input: "1 2 3 4 5\n6 7 8 9 10", expectedOutput: "5.5" },
      { input: "1 3 5\n2 4 6", expectedOutput: "3.5" },
      { input: "1\n2 3 4 5 6", expectedOutput: "3.5" }
    ]
  },
  {
    id: "final-word-break",
    slug: "word-break-problem",
    title: "Word Break Problem",
    category: "Must-Have Interview",
    difficulty: "hard",
    description: `Determine if a string can be segmented into words from a dictionary.

**Example:** Given s = "leetcode" and wordDict = ["leet", "code"], return True.

Use dynamic programming for O(n²) or O(n*m) solution.`,
    inputFormat: "def wordBreak(s: str, wordDict: List[str]) -> bool:",
    outputFormat: "Return True if s can be segmented, False otherwise.",
    constraints: "1 <= len(s) <= 300\n1 <= len(wordDict) <= 1000",
    starterCode: `from typing import List

def wordBreak(s: str, wordDict: List[str]) -> bool:
    # Your code here
    pass

# Read input
s = input()
wordDict = input().split(',')
print(wordBreak(s, wordDict))`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "leetcode\nleet,code", expectedOutput: "True" },
      { input: "applepenapple\napple,pen", expectedOutput: "True" },
      { input: "catsandog\ncats,dog,sand,and,cat", expectedOutput: "False" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "True" },
      { input: "ab\na,b", expectedOutput: "True" },
      { input: "cars\ncar,ca,rs", expectedOutput: "True" },
      { input: "aaaaaaa\naaa,aaaa", expectedOutput: "True" },
      { input: "goalspecial\nspecial,goal,goals", expectedOutput: "True" }
    ]
  },
  {
    id: "final-kth-largest",
    slug: "kth-largest-element",
    title: "Kth Largest Element in Array",
    category: "Must-Have Interview",
    difficulty: "hard",
    description: `Find the kth largest element in an unsorted array.

**Example:** Given nums = [3,2,1,5,6,4] and k = 2, return 5.

Use Quickselect for O(n) average case or heap for O(n log k).`,
    inputFormat: "def findKthLargest(nums: List[int], k: int) -> int:",
    outputFormat: "Return the kth largest element.",
    constraints: "1 <= k <= len(nums) <= 10^5\n-10^4 <= nums[i] <= 10^4",
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
      { input: "3 2 3 1 2 4 5 5 6\n4", expectedOutput: "4" },
      { input: "1\n1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n1", expectedOutput: "5" },
      { input: "1 2 3 4 5\n5", expectedOutput: "1" },
      { input: "5 5 5 5 5\n3", expectedOutput: "5" },
      { input: "-1 -2 -3 -4 -5\n2", expectedOutput: "-2" },
      { input: "7 6 5 4 3 2 1\n4", expectedOutput: "4" }
    ]
  }
];

// Get all Python track problem IDs for certificate generation
export const getPythonTrackIds = (): string[] => {
  return pythonProblemsData.map(p => p.id);
};

export const PYTHON_TRACK_TOTAL = pythonProblemsData.length;

// Get problems by category
export const getPythonProblemsByCategory = (category: string): ProblemData[] => {
  return pythonProblemsData.filter(p => p.category === category);
};

// Get all categories
export const getPythonCategories = (): string[] => {
  const categories = new Set(pythonProblemsData.map(p => p.category));
  return Array.from(categories);
};
