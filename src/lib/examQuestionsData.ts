// Rephrased exam questions - same logic as Python Core but different presentation
// These questions test the same concepts but are worded differently

import { ProblemData } from './problemsData';

export const examQuestionsData: ProblemData[] = [
  // ============================================================================
  // 🎯 EXAM QUESTIONS - Rephrased versions of Python Core problems
  // Same logic, different presentation
  // ============================================================================

  // Easy - Digit Reversal (based on reverse-number)
  {
    id: "exam-digit-reversal",
    slug: "exam-digit-reversal",
    title: "Mirror the Digits",
    category: "Python Core",
    difficulty: "easy",
    description: `You are given an integer. Your task is to flip all its digits to create a mirror image of the number.

**Challenge:** Do NOT convert the number to a string. Use only mathematical operations.

**Scenario:** Imagine you're building a license plate reader that needs to handle reversed images from mirrors.

**Example:** 
- Input: 12345 → Mirror: 54321
- Input: -678 → Mirror: -876 (the negative sign stays)
- Input: 1000 → Mirror: 1 (leading zeros are dropped)`,
    inputFormat: "def mirrorDigits(num: int) -> int:",
    outputFormat: "Return the mirrored number. Preserve the sign for negatives.",
    constraints: "-10^9 <= num <= 10^9",
    starterCode: `def mirrorDigits(num: int) -> int:
    # Use only math operations (%, //)
    # Do not use str(), reversed(), or similar
    pass

# Read input
num = int(input())
print(mirrorDigits(num))`,
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

  // Easy - Primality Test (based on check-prime)
  {
    id: "exam-primality-test",
    slug: "exam-primality-test",
    title: "Is It Indivisible?",
    category: "Python Core",
    difficulty: "easy",
    description: `Determine if a given positive integer is a prime number.

**Recall:** A prime has exactly two distinct divisors: 1 and itself.

**Real-world use:** Cryptographic systems rely heavily on prime numbers for security.

**Your Task:** Return True if the number is prime, False otherwise.

**Edge cases to consider:**
- 0 and 1 are NOT prime
- 2 is the smallest prime
- Optimize by only checking up to √n`,
    inputFormat: "def isIndivisible(n: int) -> bool:",
    outputFormat: "Return True if n is prime, False otherwise.",
    constraints: "0 <= n <= 10^6",
    starterCode: `def isIndivisible(n: int) -> bool:
    # Check if n is a prime number
    # Remember: primes are > 1 and divisible only by 1 and themselves
    pass

# Read input
n = int(input())
print(isIndivisible(n))`,
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

  // Easy - Factorial Both Ways (based on factorial)
  {
    id: "exam-factorial-both-ways",
    slug: "exam-factorial-both-ways",
    title: "Calculate n! Two Ways",
    category: "Python Core",
    difficulty: "easy",
    description: `Implement factorial calculation using TWO different approaches in the same solution.

**Part 1:** Use a loop (iterative approach)
**Part 2:** Use function calling itself (recursive approach)

**Definition:** n! = n × (n-1) × (n-2) × ... × 2 × 1
Special case: 0! = 1

**Output Format:** Print both results separated by a space: "iterative_result recursive_result"

**Example:** For n=5 → "120 120"`,
    inputFormat: "def factorialLoop(n: int) -> int: and def factorialRecursive(n: int) -> int:",
    outputFormat: "Return 'iterative_result recursive_result' as a string",
    constraints: "0 <= n <= 12",
    starterCode: `def factorialLoop(n: int) -> int:
    # Use a for/while loop
    pass

def factorialRecursive(n: int) -> int:
    # Call this function within itself
    pass

# Read input
n = int(input())
print(f"{factorialLoop(n)} {factorialRecursive(n)}")`,
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

  // Easy - Letter Counter (based on char-frequency)
  {
    id: "exam-letter-counter",
    slug: "exam-letter-counter",
    title: "Frequency Analyzer",
    category: "Strings",
    difficulty: "easy",
    description: `Build a letter frequency analyzer for a text string.

**Task:** Count how many times each character appears and output them in alphabetical order.

**Output Format:** Each character followed by its count, separated by spaces.
Format: "a:count b:count c:count ..."

**Example:**
- "aabbcc" → "a:2 b:2 c:2"
- "hello" → "e:1 h:1 l:2 o:1"

**Note:** Assume input contains only lowercase letters.`,
    inputFormat: "def analyzeFrequency(text: str) -> str:",
    outputFormat: "Return alphabetically sorted 'char:count' pairs joined by spaces.",
    constraints: "1 <= len(text) <= 10^4\ntext contains only lowercase letters",
    starterCode: `def analyzeFrequency(text: str) -> str:
    # Count each letter and sort alphabetically
    pass

# Read input
text = input()
print(analyzeFrequency(text))`,
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

  // Easy - Value Exchange (based on swap-without-temp)
  {
    id: "exam-value-exchange",
    slug: "exam-value-exchange",
    title: "Swap Without Extra Space",
    category: "Python Core",
    difficulty: "easy",
    description: `Exchange the values of two variables WITHOUT creating a third temporary variable.

**Allowed approaches:**
- Arithmetic: Addition and subtraction
- Bitwise: XOR operation

**NOT allowed:** Creating a temp/helper variable to hold one value.

**Output:** Print the swapped values as "new_a new_b" (which is original "b a")

**Example:** If a=5, b=10 → After swap: a=10, b=5 → Output: "10 5"`,
    inputFormat: "def exchange(a: int, b: int) -> str:",
    outputFormat: "Return the swapped values as 'new_a new_b'",
    constraints: "-10^9 <= a, b <= 10^9",
    starterCode: `def exchange(a: int, b: int) -> str:
    # Swap values without using a temporary variable
    # Hint: Try a = a + b, b = a - b, a = a - b
    # Or use XOR: a ^= b; b ^= a; a ^= b
    pass

# Read input
a, b = map(int, input().split())
print(exchange(a, b))`,
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

  // Medium - Duplicate Finder (based on find-duplicates)
  {
    id: "exam-duplicate-finder",
    slug: "exam-duplicate-finder",
    title: "Spot the Repeaters",
    category: "Arrays/Lists",
    difficulty: "medium",
    description: `You're analyzing a dataset and need to identify which values appear more than once.

**Task:** Given a list of integers, find all elements that occur at least twice.

**Output Format:** 
- Return duplicates in sorted order
- If no duplicates exist, return "None"

**Example:** 
- [1, 2, 3, 2, 1, 4] → "1 2" (both 1 and 2 repeat)
- [1, 2, 3, 4, 5] → "None" (all unique)`,
    inputFormat: "def spotRepeaters(nums: List[int]) -> List[int]:",
    outputFormat: "Return sorted list of duplicates, or 'None' if empty.",
    constraints: "1 <= len(nums) <= 10^5\n-10^6 <= nums[i] <= 10^6",
    starterCode: `from typing import List

def spotRepeaters(nums: List[int]) -> List[int]:
    # Find elements appearing more than once
    pass

# Read input
nums = list(map(int, input().split()))
result = spotRepeaters(nums)
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

  // Medium - Order Preserving Unique (based on remove-duplicates-order)
  {
    id: "exam-unique-order",
    slug: "exam-unique-order",
    title: "Keep First Occurrence Only",
    category: "Arrays/Lists",
    difficulty: "medium",
    description: `Clean a list by removing duplicate entries while preserving the original order of first appearances.

**Key Requirement:** The order of elements should match their first occurrence in the input.

**Example:**
- [3, 1, 2, 1, 3, 4, 2] → [3, 1, 2, 4]
  - 3 appears first at index 0
  - 1 appears first at index 1
  - 2 appears first at index 2
  - 4 appears first at index 5

**Tip:** A simple set won't preserve order. Think about how to track "seen" elements.`,
    inputFormat: "def keepFirstOnly(nums: List[int]) -> List[int]:",
    outputFormat: "Return list with duplicates removed, keeping first occurrence order.",
    constraints: "1 <= len(nums) <= 10^5",
    starterCode: `from typing import List

def keepFirstOnly(nums: List[int]) -> List[int]:
    # Remove duplicates while maintaining order
    pass

# Read input
nums = list(map(int, input().split()))
result = keepFirstOnly(nums)
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

  // Medium - Unique Character (based on first-non-repeating)
  {
    id: "exam-unique-char",
    slug: "exam-unique-char",
    title: "First Lonely Letter",
    category: "Strings",
    difficulty: "medium",
    description: `In a string, find the first character that appears exactly once.

**Scenario:** You're building a spell-checker that highlights unique characters.

**Rules:**
- Return the first character that appears only once
- If every character repeats, return "-1"
- Consider only lowercase letters

**Examples:**
- "aabbccd" → "d" (first unique)
- "abcabc" → "-1" (all repeat)
- "leetcode" → "l" (l appears once and comes first)`,
    inputFormat: "def firstLonely(s: str) -> str:",
    outputFormat: "Return the first non-repeating character or '-1'.",
    constraints: "1 <= len(s) <= 10^5\ns contains only lowercase letters",
    starterCode: `def firstLonely(s: str) -> str:
    # Find the first character appearing exactly once
    pass

# Read input
s = input()
print(firstLonely(s))`,
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

  // Medium - Anagram Checker (based on check-anagram)
  {
    id: "exam-anagram-checker",
    slug: "exam-anagram-checker",
    title: "Are They Rearrangements?",
    category: "Strings",
    difficulty: "medium",
    description: `Two words are anagrams if one can be formed by rearranging the letters of the other.

**Examples of Anagrams:**
- "listen" ↔ "silent" ✓
- "triangle" ↔ "integral" ✓
- "hello" ↔ "world" ✗

**Task:** Return True if the two input strings are anagrams, False otherwise.

**Hint:** Anagrams have identical character frequencies.`,
    inputFormat: "def areRearrangements(s1: str, s2: str) -> bool:",
    outputFormat: "Return True if s1 and s2 are anagrams, False otherwise.",
    constraints: "1 <= len(s1), len(s2) <= 10^5\nStrings contain only lowercase letters",
    starterCode: `def areRearrangements(s1: str, s2: str) -> bool:
    # Check if s1 and s2 are anagrams
    pass

# Read input
s1 = input()
s2 = input()
print(areRearrangements(s1, s2))`,
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

  // Medium - Custom Length (based on custom-len)
  {
    id: "exam-custom-length",
    slug: "exam-custom-length",
    title: "Count Without len()",
    category: "Python Core",
    difficulty: "medium",
    description: `Implement your own length-counting function without using Python's built-in len().

**The Challenge:** How do you count items without the standard function?

**Approach:** Iterate through the collection and increment a counter.

**Works for:** Strings, lists, tuples - any iterable.

**Example:** "hello" has 5 characters`,
    inputFormat: "def countLength(iterable) -> int:",
    outputFormat: "Return the number of elements/characters.",
    constraints: "0 <= length <= 10^5",
    starterCode: `def countLength(iterable) -> int:
    # Count elements without using len()
    pass

# Read input
s = input()
print(countLength(s))`,
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

  // Hard - LRU Cache (based on lru-cache)
  {
    id: "exam-lru-cache",
    slug: "exam-lru-cache",
    title: "Build a Smart Cache",
    category: "Hashing",
    difficulty: "hard",
    description: `Design a cache with a limited size that evicts the Least Recently Used item when full.

**Operations:**
- get(key): Retrieve value (returns -1 if not found). This counts as "using" the key.
- put(key, value): Add or update. If at capacity, evict the least recently used item first.

**Example with capacity=2:**
1. put(1, 1) → cache: {1:1}
2. put(2, 2) → cache: {1:1, 2:2}
3. get(1) → returns 1, cache: {2:2, 1:1} (1 is now most recent)
4. put(3, 3) → evicts key 2, cache: {1:1, 3:3}
5. get(2) → returns -1 (was evicted)`,
    inputFormat: "Implement SmartCache class with get and put methods",
    outputFormat: "For each get operation, output the result on a new line.",
    constraints: "1 <= capacity <= 1000\n0 <= key, value <= 10^4",
    starterCode: `class SmartCache:
    def __init__(self, capacity: int):
        # Initialize your cache
        pass
    
    def get(self, key: int) -> int:
        # Return value or -1, update recency
        pass
    
    def put(self, key: int, value: int) -> None:
        # Insert/update, evict LRU if needed
        pass

# Read and process operations
capacity = int(input())
cache = SmartCache(capacity)
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

  // Hard - HashMap Implementation (based on custom-hashmap)
  {
    id: "exam-hashmap-impl",
    slug: "exam-hashmap-impl",
    title: "Build Your Own Dictionary",
    category: "Hashing",
    difficulty: "hard",
    description: `Implement a hash map (dictionary) from scratch without using Python's dict.

**Operations to implement:**
- put(key, value): Insert or update a key-value pair
- get(key): Retrieve value or return -1 if not found
- remove(key): Delete the key-value pair

**Collision Handling:** When two keys hash to the same bucket, use chaining (linked list or array at each bucket).

**Think about:**
- How to compute a hash: key % bucket_size
- How to handle collisions at the same hash index`,
    inputFormat: "Implement HashTable class with put, get, remove methods",
    outputFormat: "For each get operation, output the result on a new line.",
    constraints: "0 <= key, value <= 10^6\nAt most 10^4 operations",
    starterCode: `class HashTable:
    def __init__(self):
        # Initialize buckets
        pass
    
    def put(self, key: int, value: int) -> None:
        # Insert or update
        pass
    
    def get(self, key: int) -> int:
        # Return value or -1
        pass
    
    def remove(self, key: int) -> None:
        # Delete key
        pass

# Read and process operations
table = HashTable()
n = int(input())
results = []
for _ in range(n):
    op = input().split()
    if op[0] == 'put':
        table.put(int(op[1]), int(op[2]))
    elif op[0] == 'get':
        results.append(str(table.get(int(op[1]))))
    else:
        table.remove(int(op[1]))
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
  }
];
