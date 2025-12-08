// JavaScript Learning Track - 30 questions from beginner to advanced
import { ProblemData } from './problemsData';

export const javascriptProblemsData: ProblemData[] = [
  // 🟢 Beginner Level (1-10)
  {
    id: "js-hello-world",
    slug: "js-hello-world",
    title: "Print Hello World",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Print "Hello World" to the console.

**Example:** The output should be exactly: Hello World

This is the classic first program for any programming language.`,
    inputFormat: "function helloWorld(): string",
    outputFormat: "Return the string 'Hello World'",
    constraints: "No input required",
    starterCode: `function helloWorld() {
    // Your code here
}

console.log(helloWorld());`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "", expectedOutput: "Hello World" }
    ],
    hiddenTestCases: [
      { input: "", expectedOutput: "Hello World" },
      { input: "", expectedOutput: "Hello World" }
    ]
  },
  {
    id: "js-sum-two-numbers",
    slug: "js-sum-two-numbers",
    title: "Sum of Two Numbers",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Given two integers, return their sum.

**Example:** Given a = 5 and b = 3, return 8.`,
    inputFormat: "function sum(a: number, b: number): number",
    outputFormat: "Return the sum of a and b",
    constraints: "-10^9 <= a, b <= 10^9",
    starterCode: `function sum(a, b) {
    // Your code here
}

const [a, b] = readline().split(' ').map(Number);
console.log(sum(a, b));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 3", expectedOutput: "8" },
      { input: "10 20", expectedOutput: "30" },
      { input: "-5 5", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "0 0", expectedOutput: "0" },
      { input: "1000000 1000000", expectedOutput: "2000000" },
      { input: "-100 -200", expectedOutput: "-300" },
      { input: "1 -1", expectedOutput: "0" },
      { input: "999 1", expectedOutput: "1000" }
    ]
  },
  {
    id: "js-max-of-three",
    slug: "js-max-of-three",
    title: "Find Maximum of Three Numbers",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Return the maximum among three integers.

**Example:** Given a = 5, b = 9, c = 3, return 9.`,
    inputFormat: "function maxOfThree(a: number, b: number, c: number): number",
    outputFormat: "Return the largest of the three numbers",
    constraints: "-10^9 <= a, b, c <= 10^9",
    starterCode: `function maxOfThree(a, b, c) {
    // Your code here
}

const [a, b, c] = readline().split(' ').map(Number);
console.log(maxOfThree(a, b, c));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 9 3", expectedOutput: "9" },
      { input: "1 1 1", expectedOutput: "1" },
      { input: "-5 -2 -8", expectedOutput: "-2" }
    ],
    hiddenTestCases: [
      { input: "100 200 150", expectedOutput: "200" },
      { input: "0 0 1", expectedOutput: "1" },
      { input: "-1 -1 -1", expectedOutput: "-1" },
      { input: "999 1000 998", expectedOutput: "1000" },
      { input: "5 5 3", expectedOutput: "5" }
    ]
  },
  {
    id: "js-reverse-string",
    slug: "js-reverse-string",
    title: "Reverse a String",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Reverse the given string.

**Example:** Given s = "hello", return "olleh".`,
    inputFormat: "function reverseString(s: string): string",
    outputFormat: "Return the reversed string",
    constraints: "1 <= s.length <= 10^5",
    starterCode: `function reverseString(s) {
    // Your code here
}

const s = readline();
console.log(reverseString(s));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "JavaScript", expectedOutput: "tpircSavaJ" },
      { input: "a", expectedOutput: "a" }
    ],
    hiddenTestCases: [
      { input: "abcdef", expectedOutput: "fedcba" },
      { input: "12345", expectedOutput: "54321" },
      { input: "aa", expectedOutput: "aa" },
      { input: "racecar", expectedOutput: "racecar" },
      { input: "Hello World", expectedOutput: "dlroW olleH" }
    ]
  },
  {
    id: "js-count-vowels",
    slug: "js-count-vowels",
    title: "Count Vowels in a String",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Return the number of vowels (a, e, i, o, u) in a given string.

**Example:** Given s = "hello", return 2.`,
    inputFormat: "function countVowels(s: string): number",
    outputFormat: "Return the count of vowels",
    constraints: "1 <= s.length <= 10^5",
    starterCode: `function countVowels(s) {
    // Your code here
}

const s = readline();
console.log(countVowels(s));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hello", expectedOutput: "2" },
      { input: "AEIOU", expectedOutput: "5" },
      { input: "xyz", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "Programming", expectedOutput: "3" },
      { input: "aaa", expectedOutput: "3" },
      { input: "bcdfg", expectedOutput: "0" },
      { input: "AeIoU", expectedOutput: "5" },
      { input: "Hello World", expectedOutput: "3" }
    ]
  },
  {
    id: "js-even-odd",
    slug: "js-even-odd",
    title: "Check Even or Odd",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Determine whether a number is even or odd.

**Example:** Given n = 4, return "Even".`,
    inputFormat: "function checkEvenOdd(n: number): string",
    outputFormat: "Return 'Even' or 'Odd'",
    constraints: "-10^9 <= n <= 10^9",
    starterCode: `function checkEvenOdd(n) {
    // Your code here
}

const n = parseInt(readline());
console.log(checkEvenOdd(n));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4", expectedOutput: "Even" },
      { input: "7", expectedOutput: "Odd" },
      { input: "0", expectedOutput: "Even" }
    ],
    hiddenTestCases: [
      { input: "-2", expectedOutput: "Even" },
      { input: "-3", expectedOutput: "Odd" },
      { input: "1000000000", expectedOutput: "Even" },
      { input: "999999999", expectedOutput: "Odd" },
      { input: "1", expectedOutput: "Odd" }
    ]
  },
  {
    id: "js-factorial",
    slug: "js-factorial",
    title: "Factorial of a Number",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Compute factorial of a number.

**Example:** Given n = 5, return 120.`,
    inputFormat: "function factorial(n: number): number",
    outputFormat: "Return n!",
    constraints: "0 <= n <= 20",
    starterCode: `function factorial(n) {
    // Your code here
}

const n = parseInt(readline());
console.log(factorial(n));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5", expectedOutput: "120" },
      { input: "0", expectedOutput: "1" },
      { input: "10", expectedOutput: "3628800" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "3", expectedOutput: "6" },
      { input: "7", expectedOutput: "5040" },
      { input: "12", expectedOutput: "479001600" },
      { input: "15", expectedOutput: "1307674368000" }
    ]
  },
  {
    id: "js-palindrome-check",
    slug: "js-palindrome-check",
    title: "Palindrome Check (String)",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Check if a string is a palindrome.

**Example:** Given s = "racecar", return true.`,
    inputFormat: "function isPalindrome(s: string): boolean",
    outputFormat: "Return true if palindrome, false otherwise",
    constraints: "1 <= s.length <= 10^5",
    starterCode: `function isPalindrome(s) {
    // Your code here
}

const s = readline();
console.log(isPalindrome(s));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "racecar", expectedOutput: "true" },
      { input: "hello", expectedOutput: "false" },
      { input: "a", expectedOutput: "true" }
    ],
    hiddenTestCases: [
      { input: "madam", expectedOutput: "true" },
      { input: "ab", expectedOutput: "false" },
      { input: "aa", expectedOutput: "true" },
      { input: "abcba", expectedOutput: "true" },
      { input: "abcd", expectedOutput: "false" }
    ]
  },
  {
    id: "js-remove-duplicates-array",
    slug: "js-remove-duplicates-array",
    title: "Remove Duplicates from Array",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Remove duplicates from array while preserving order.

**Example:** Given arr = [1, 2, 2, 3, 1], return [1, 2, 3].`,
    inputFormat: "function removeDuplicates(arr: number[]): number[]",
    outputFormat: "Return array with duplicates removed",
    constraints: "1 <= arr.length <= 10^4",
    starterCode: `function removeDuplicates(arr) {
    // Your code here
}

const arr = readline().split(' ').map(Number);
console.log(removeDuplicates(arr).join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 2 3 1", expectedOutput: "1 2 3" },
      { input: "5 5 5 5", expectedOutput: "5" },
      { input: "1 2 3", expectedOutput: "1 2 3" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "1 1", expectedOutput: "1" },
      { input: "3 2 1 3 2 1", expectedOutput: "3 2 1" },
      { input: "0 0 0 1 1 1", expectedOutput: "0 1" },
      { input: "-1 -1 0 0 1 1", expectedOutput: "-1 0 1" }
    ]
  },
  {
    id: "js-largest-in-array",
    slug: "js-largest-in-array",
    title: "Find Largest Number in Array",
    category: "JavaScript Track",
    difficulty: "easy",
    description: `Find the largest number in an array.

**Example:** Given arr = [3, 5, 1, 9, 2], return 9.`,
    inputFormat: "function findLargest(arr: number[]): number",
    outputFormat: "Return the largest number",
    constraints: "1 <= arr.length <= 10^5",
    starterCode: `function findLargest(arr) {
    // Your code here
}

const arr = readline().split(' ').map(Number);
console.log(findLargest(arr));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 5 1 9 2", expectedOutput: "9" },
      { input: "1", expectedOutput: "1" },
      { input: "-5 -2 -8", expectedOutput: "-2" }
    ],
    hiddenTestCases: [
      { input: "100 200 150", expectedOutput: "200" },
      { input: "0 0 1", expectedOutput: "1" },
      { input: "-1 -1 -1", expectedOutput: "-1" },
      { input: "999 1000 998", expectedOutput: "1000" },
      { input: "5 5 5", expectedOutput: "5" }
    ]
  },

  // 🟡 Intermediate Level (11-20)
  {
    id: "js-two-sum",
    slug: "js-two-sum",
    title: "Two Sum Problem",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Given an array and a target, return indices of two numbers that add up to target.

**Example:** Given nums = [2, 7, 11, 15], target = 9, return [0, 1].`,
    inputFormat: "function twoSum(nums: number[], target: number): number[]",
    outputFormat: "Return indices of the two numbers",
    constraints: "2 <= nums.length <= 10^4",
    starterCode: `function twoSum(nums, target) {
    // Your code here
}

const nums = readline().split(' ').map(Number);
const target = parseInt(readline());
console.log(twoSum(nums, target).join(' '));`,
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
      { input: "1 5 1 5\n10", expectedOutput: "1 3" },
      { input: "2 5 5 11\n10", expectedOutput: "1 2" }
    ]
  },
  {
    id: "js-valid-anagram",
    slug: "js-valid-anagram",
    title: "Valid Anagram",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Check if two strings are anagrams of each other.

**Example:** Given s = "anagram", t = "nagaram", return true.`,
    inputFormat: "function isAnagram(s: string, t: string): boolean",
    outputFormat: "Return true if anagram, false otherwise",
    constraints: "1 <= s.length, t.length <= 10^5",
    starterCode: `function isAnagram(s, t) {
    // Your code here
}

const s = readline();
const t = readline();
console.log(isAnagram(s, t));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "anagram\nnagaram", expectedOutput: "true" },
      { input: "rat\ncar", expectedOutput: "false" },
      { input: "listen\nsilent", expectedOutput: "true" }
    ],
    hiddenTestCases: [
      { input: "a\na", expectedOutput: "true" },
      { input: "ab\nba", expectedOutput: "true" },
      { input: "abc\ndef", expectedOutput: "false" },
      { input: "aabb\nbbaa", expectedOutput: "true" },
      { input: "abc\nabcd", expectedOutput: "false" }
    ]
  },
  {
    id: "js-group-by-age",
    slug: "js-group-by-age",
    title: "Group People by Age (Objects)",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Group an array of people objects by their age.

**Example:** Given people = [{name: "Alice", age: 25}, {name: "Bob", age: 25}], group by age.`,
    inputFormat: "function groupByAge(people: {name: string, age: number}[]): object",
    outputFormat: "Return object with ages as keys and arrays of names as values",
    constraints: "1 <= people.length <= 1000",
    starterCode: `function groupByAge(people) {
    // Your code here
}

const n = parseInt(readline());
const people = [];
for (let i = 0; i < n; i++) {
    const [name, age] = readline().split(' ');
    people.push({ name, age: parseInt(age) });
}
const result = groupByAge(people);
console.log(JSON.stringify(result));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\nAlice 25\nBob 25\nCharlie 30", expectedOutput: '{"25":["Alice","Bob"],"30":["Charlie"]}' },
      { input: "1\nJohn 20", expectedOutput: '{"20":["John"]}' },
      { input: "2\nA 10\nB 10", expectedOutput: '{"10":["A","B"]}' }
    ],
    hiddenTestCases: [
      { input: "2\nX 1\nY 2", expectedOutput: '{"1":["X"],"2":["Y"]}' },
      { input: "3\nA 5\nB 5\nC 5", expectedOutput: '{"5":["A","B","C"]}' },
      { input: "1\nSolo 100", expectedOutput: '{"100":["Solo"]}' },
      { input: "2\nFirst 1\nSecond 1", expectedOutput: '{"1":["First","Second"]}' },
      { input: "3\nA 10\nB 20\nC 30", expectedOutput: '{"10":["A"],"20":["B"],"30":["C"]}' }
    ]
  },
  {
    id: "js-flatten-array",
    slug: "js-flatten-array",
    title: "Flatten Nested Array",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Flatten a deeply nested array to a single level.

**Example:** Given arr = [1, [2, [3, 4]], 5], return [1, 2, 3, 4, 5].`,
    inputFormat: "function flatten(arr: any[]): any[]",
    outputFormat: "Return flattened array",
    constraints: "1 <= total elements <= 10^4",
    starterCode: `function flatten(arr) {
    // Your code here
}

const input = JSON.parse(readline());
console.log(flatten(input).join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "[1,[2,[3,4]],5]", expectedOutput: "1 2 3 4 5" },
      { input: "[[1,2],[3,4]]", expectedOutput: "1 2 3 4" },
      { input: "[1,2,3]", expectedOutput: "1 2 3" }
    ],
    hiddenTestCases: [
      { input: "[[[1]]]", expectedOutput: "1" },
      { input: "[1,[2],[[3]]]", expectedOutput: "1 2 3" },
      { input: "[[[[5]]]]", expectedOutput: "5" },
      { input: "[1,2,[3,[4,[5]]]]", expectedOutput: "1 2 3 4 5" },
      { input: "[]", expectedOutput: "" }
    ]
  },
  {
    id: "js-longest-common-prefix",
    slug: "js-longest-common-prefix",
    title: "Longest Common Prefix",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Find the longest common prefix among an array of strings.

**Example:** Given strs = ["flower", "flow", "flight"], return "fl".`,
    inputFormat: "function longestCommonPrefix(strs: string[]): string",
    outputFormat: "Return the longest common prefix",
    constraints: "1 <= strs.length <= 200",
    starterCode: `function longestCommonPrefix(strs) {
    // Your code here
}

const strs = readline().split(' ');
console.log(longestCommonPrefix(strs) || "empty");`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "flower flow flight", expectedOutput: "fl" },
      { input: "dog racecar car", expectedOutput: "empty" },
      { input: "abc abc abc", expectedOutput: "abc" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "ab abc", expectedOutput: "ab" },
      { input: "prefix pre preach", expectedOutput: "pre" },
      { input: "test testing tested", expectedOutput: "test" },
      { input: "aaa aaab aaac", expectedOutput: "aaa" }
    ]
  },
  {
    id: "js-merge-sorted-arrays",
    slug: "js-merge-sorted-arrays",
    title: "Merge Two Sorted Arrays",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Merge two sorted arrays into one sorted array.

**Example:** Given arr1 = [1, 3, 5], arr2 = [2, 4, 6], return [1, 2, 3, 4, 5, 6].`,
    inputFormat: "function mergeSorted(arr1: number[], arr2: number[]): number[]",
    outputFormat: "Return merged sorted array",
    constraints: "0 <= arr1.length, arr2.length <= 10^4",
    starterCode: `function mergeSorted(arr1, arr2) {
    // Your code here
}

const arr1 = readline().split(' ').filter(x => x).map(Number);
const arr2 = readline().split(' ').filter(x => x).map(Number);
console.log(mergeSorted(arr1, arr2).join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 3 5\n2 4 6", expectedOutput: "1 2 3 4 5 6" },
      { input: "1 2 3\n4 5 6", expectedOutput: "1 2 3 4 5 6" },
      { input: "1\n2", expectedOutput: "1 2" }
    ],
    hiddenTestCases: [
      { input: "\n1 2 3", expectedOutput: "1 2 3" },
      { input: "1 2 3\n", expectedOutput: "1 2 3" },
      { input: "1 1 1\n1 1 1", expectedOutput: "1 1 1 1 1 1" },
      { input: "-3 -1 0\n-2 1 2", expectedOutput: "-3 -2 -1 0 1 2" },
      { input: "10 20\n5 15 25", expectedOutput: "5 10 15 20 25" }
    ]
  },
  {
    id: "js-frequency-counter",
    slug: "js-frequency-counter",
    title: "Frequency Counter Implementation",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Count frequency of each element in an array.

**Example:** Given arr = [1, 2, 2, 3, 1, 1], return {1: 3, 2: 2, 3: 1}.`,
    inputFormat: "function frequencyCounter(arr: number[]): object",
    outputFormat: "Return object with element frequencies",
    constraints: "1 <= arr.length <= 10^5",
    starterCode: `function frequencyCounter(arr) {
    // Your code here
}

const arr = readline().split(' ').map(Number);
const result = frequencyCounter(arr);
const sorted = Object.entries(result).sort((a, b) => a[0] - b[0]);
console.log(sorted.map(([k, v]) => k + ':' + v).join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 2 3 1 1", expectedOutput: "1:3 2:2 3:1" },
      { input: "5 5 5", expectedOutput: "5:3" },
      { input: "1 2 3", expectedOutput: "1:1 2:1 3:1" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1:1" },
      { input: "1 1", expectedOutput: "1:2" },
      { input: "0 0 0 1", expectedOutput: "0:3 1:1" },
      { input: "-1 -1 0 1", expectedOutput: "-1:2 0:1 1:1" },
      { input: "10 20 10 30 20 10", expectedOutput: "10:3 20:2 30:1" }
    ]
  },
  {
    id: "js-rotate-array",
    slug: "js-rotate-array",
    title: "Rotate Array",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Rotate array to the right by k steps.

**Example:** Given arr = [1, 2, 3, 4, 5], k = 2, return [4, 5, 1, 2, 3].`,
    inputFormat: "function rotateArray(arr: number[], k: number): number[]",
    outputFormat: "Return rotated array",
    constraints: "1 <= arr.length <= 10^5",
    starterCode: `function rotateArray(arr, k) {
    // Your code here
}

const arr = readline().split(' ').map(Number);
const k = parseInt(readline());
console.log(rotateArray(arr, k).join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "4 5 1 2 3" },
      { input: "1 2 3\n1", expectedOutput: "3 1 2" },
      { input: "1 2 3 4\n4", expectedOutput: "1 2 3 4" }
    ],
    hiddenTestCases: [
      { input: "1\n5", expectedOutput: "1" },
      { input: "1 2\n3", expectedOutput: "2 1" },
      { input: "1 2 3 4 5 6 7\n3", expectedOutput: "5 6 7 1 2 3 4" },
      { input: "-1 -2 -3\n1", expectedOutput: "-3 -1 -2" },
      { input: "0 0 0\n100", expectedOutput: "0 0 0" }
    ]
  },
  {
    id: "js-chunk-array",
    slug: "js-chunk-array",
    title: "Chunk Array into Pieces",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Split array into chunks of specified size.

**Example:** Given arr = [1, 2, 3, 4, 5], size = 2, return [[1, 2], [3, 4], [5]].`,
    inputFormat: "function chunkArray(arr: number[], size: number): number[][]",
    outputFormat: "Return array of chunks",
    constraints: "1 <= arr.length <= 10^4, 1 <= size <= arr.length",
    starterCode: `function chunkArray(arr, size) {
    // Your code here
}

const arr = readline().split(' ').map(Number);
const size = parseInt(readline());
const result = chunkArray(arr, size);
console.log(result.map(chunk => chunk.join(',')).join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n2", expectedOutput: "1,2 3,4 5" },
      { input: "1 2 3 4\n2", expectedOutput: "1,2 3,4" },
      { input: "1 2 3\n3", expectedOutput: "1,2,3" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "1 2 3 4 5\n1", expectedOutput: "1 2 3 4 5" },
      { input: "1 2 3 4 5 6\n3", expectedOutput: "1,2,3 4,5,6" },
      { input: "1 2 3 4 5 6 7\n3", expectedOutput: "1,2,3 4,5,6 7" },
      { input: "1 2\n5", expectedOutput: "1,2" }
    ]
  },
  {
    id: "js-map-filter-reduce",
    slug: "js-map-filter-reduce",
    title: "Implement Map/Filter/Reduce Polyfills",
    category: "JavaScript Track",
    difficulty: "medium",
    description: `Implement custom versions of map, filter, and reduce.

**Example:** Use your implementations to double, filter evens, and sum an array.`,
    inputFormat: "Implement myMap, myFilter, myReduce functions",
    outputFormat: "Return results of all three operations",
    constraints: "1 <= arr.length <= 10^4",
    starterCode: `Array.prototype.myMap = function(callback) {
    // Your code here
};

Array.prototype.myFilter = function(callback) {
    // Your code here
};

Array.prototype.myReduce = function(callback, initialValue) {
    // Your code here
};

const arr = readline().split(' ').map(Number);
const doubled = arr.myMap(x => x * 2);
const evens = arr.myFilter(x => x % 2 === 0);
const sum = arr.myReduce((acc, x) => acc + x, 0);
console.log(doubled.join(' ') + '|' + evens.join(' ') + '|' + sum);`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4", expectedOutput: "2 4 6 8|2 4|10" },
      { input: "1 3 5", expectedOutput: "2 6 10||9" },
      { input: "2 4 6", expectedOutput: "4 8 12|2 4 6|12" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "2||1" },
      { input: "2", expectedOutput: "4|2|2" },
      { input: "1 2 3 4 5", expectedOutput: "2 4 6 8 10|2 4|15" },
      { input: "0 1 2 3", expectedOutput: "0 2 4 6|0 2|6" },
      { input: "10 20 30", expectedOutput: "20 40 60|10 20 30|60" }
    ]
  },

  // 🔴 Advanced Level (21-30)
  {
    id: "js-lru-cache",
    slug: "js-lru-cache",
    title: "LRU Cache",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Implement a Least Recently Used (LRU) cache with get and put operations.

**Example:** Cache with capacity 2: put(1,1), put(2,2), get(1) returns 1, put(3,3) evicts key 2.`,
    inputFormat: "class LRUCache with constructor(capacity), get(key), put(key, value)",
    outputFormat: "Return results of get operations",
    constraints: "1 <= capacity <= 3000, 0 <= key, value <= 10^4",
    starterCode: `class LRUCache {
    constructor(capacity) {
        // Your code here
    }
    
    get(key) {
        // Your code here
    }
    
    put(key, value) {
        // Your code here
    }
}

const [capacity, ops] = readline().split(' ').map(Number);
const cache = new LRUCache(capacity);
const results = [];
for (let i = 0; i < ops; i++) {
    const [op, ...args] = readline().split(' ');
    if (op === 'get') {
        results.push(cache.get(parseInt(args[0])));
    } else {
        cache.put(parseInt(args[0]), parseInt(args[1]));
    }
}
console.log(results.join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 5\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2", expectedOutput: "1 -1" },
      { input: "1 3\nput 1 1\nget 1\nput 2 2", expectedOutput: "1" },
      { input: "2 3\nput 1 1\nput 1 2\nget 1", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "2 4\nput 2 1\nput 1 1\nget 2\nget 1", expectedOutput: "1 1" },
      { input: "2 6\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3", expectedOutput: "1 -1 3" },
      { input: "1 2\nput 1 1\nget 1", expectedOutput: "1" },
      { input: "3 5\nput 1 1\nput 2 2\nput 3 3\nget 1\nget 2", expectedOutput: "1 2" },
      { input: "2 4\nget 1\nput 1 1\nget 1\nget 2", expectedOutput: "-1 1 -1" }
    ]
  },
  {
    id: "js-debounce",
    slug: "js-debounce",
    title: "Debounce Function",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Implement a debounce function that delays invoking func until after wait milliseconds.

**Example:** debounce(fn, 100) will only call fn after 100ms of no new calls.`,
    inputFormat: "function debounce(func, wait): Function",
    outputFormat: "Return debounced function",
    constraints: "0 <= wait <= 1000",
    starterCode: `function debounce(func, wait) {
    // Your code here
}

// Test with simulated calls
let callCount = 0;
const fn = () => callCount++;
const debounced = debounce(fn, parseInt(readline()));
const calls = parseInt(readline());

// Simulate rapid calls
for (let i = 0; i < calls; i++) {
    debounced();
}

// Wait and check
setTimeout(() => console.log(callCount), 200);`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "50\n5", expectedOutput: "1" },
      { input: "100\n10", expectedOutput: "1" },
      { input: "0\n3", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "50\n1", expectedOutput: "1" },
      { input: "100\n100", expectedOutput: "1" },
      { input: "10\n5", expectedOutput: "1" },
      { input: "50\n2", expectedOutput: "1" },
      { input: "25\n50", expectedOutput: "1" }
    ]
  },
  {
    id: "js-throttle",
    slug: "js-throttle",
    title: "Throttle Function",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Implement a throttle function that only invokes func at most once per wait period.

**Example:** throttle(fn, 100) will call fn at most once every 100ms.`,
    inputFormat: "function throttle(func, wait): Function",
    outputFormat: "Return throttled function",
    constraints: "0 <= wait <= 1000",
    starterCode: `function throttle(func, wait) {
    // Your code here
}

let callCount = 0;
const fn = () => callCount++;
const throttled = throttle(fn, parseInt(readline()));
const calls = parseInt(readline());

// Simulate calls
for (let i = 0; i < calls; i++) {
    throttled();
}

setTimeout(() => console.log(callCount), 200);`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "50\n5", expectedOutput: "1" },
      { input: "100\n10", expectedOutput: "1" },
      { input: "0\n3", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "50\n1", expectedOutput: "1" },
      { input: "100\n100", expectedOutput: "1" },
      { input: "0\n5", expectedOutput: "5" },
      { input: "50\n2", expectedOutput: "1" },
      { input: "0\n1", expectedOutput: "1" }
    ]
  },
  {
    id: "js-promise-all",
    slug: "js-promise-all",
    title: "Implement Promise.all",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Implement a custom version of Promise.all that takes an array of promises.

**Example:** promiseAll([p1, p2, p3]) resolves when all promises resolve.`,
    inputFormat: "function promiseAll(promises: Promise[]): Promise",
    outputFormat: "Return a promise that resolves to array of results",
    constraints: "0 <= promises.length <= 100",
    starterCode: `function promiseAll(promises) {
    // Your code here
}

const n = parseInt(readline());
const values = readline().split(' ').map(Number);
const promises = values.map(v => Promise.resolve(v));

promiseAll(promises).then(results => {
    console.log(results.join(' '));
});`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n1 2 3", expectedOutput: "1 2 3" },
      { input: "1\n5", expectedOutput: "5" },
      { input: "2\n10 20", expectedOutput: "10 20" }
    ],
    hiddenTestCases: [
      { input: "4\n1 2 3 4", expectedOutput: "1 2 3 4" },
      { input: "5\n5 4 3 2 1", expectedOutput: "5 4 3 2 1" },
      { input: "1\n100", expectedOutput: "100" },
      { input: "3\n0 0 0", expectedOutput: "0 0 0" },
      { input: "2\n-1 1", expectedOutput: "-1 1" }
    ]
  },
  {
    id: "js-deep-clone",
    slug: "js-deep-clone",
    title: "Deep Clone an Object",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Implement deep cloning of nested objects and arrays.

**Example:** Clone {a: {b: 1}} so changes to clone don't affect original.`,
    inputFormat: "function deepClone(obj: object): object",
    outputFormat: "Return a deep copy of the object",
    constraints: "Object depth <= 100",
    starterCode: `function deepClone(obj) {
    // Your code here
}

const obj = JSON.parse(readline());
const cloned = deepClone(obj);
console.log(JSON.stringify(cloned));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: '{"a":{"b":1}}', expectedOutput: '{"a":{"b":1}}' },
      { input: '{"x":[1,2,3]}', expectedOutput: '{"x":[1,2,3]}' },
      { input: '{"a":1,"b":2}', expectedOutput: '{"a":1,"b":2}' }
    ],
    hiddenTestCases: [
      { input: '{}', expectedOutput: '{}' },
      { input: '{"a":null}', expectedOutput: '{"a":null}' },
      { input: '{"a":{"b":{"c":3}}}', expectedOutput: '{"a":{"b":{"c":3}}}' },
      { input: '[1,2,[3,4]]', expectedOutput: '[1,2,[3,4]]' },
      { input: '{"arr":[{"x":1}]}', expectedOutput: '{"arr":[{"x":1}]}' }
    ]
  },
  {
    id: "js-longest-substring",
    slug: "js-longest-substring",
    title: "Longest Substring Without Repeating Characters",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Find the length of the longest substring without repeating characters.

**Example:** Given s = "abcabcbb", return 3 ("abc").`,
    inputFormat: "function lengthOfLongestSubstring(s: string): number",
    outputFormat: "Return length of longest substring",
    constraints: "0 <= s.length <= 5 * 10^4",
    starterCode: `function lengthOfLongestSubstring(s) {
    // Your code here
}

const s = readline();
console.log(lengthOfLongestSubstring(s));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "", expectedOutput: "0" },
      { input: " ", expectedOutput: "1" },
      { input: "abcdef", expectedOutput: "6" },
      { input: "aab", expectedOutput: "2" },
      { input: "dvdf", expectedOutput: "3" }
    ]
  },
  {
    id: "js-event-emitter",
    slug: "js-event-emitter",
    title: "Event Emitter Class",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Implement an EventEmitter class with on, off, emit, and once methods.

**Example:** emitter.on('event', callback) registers a listener.`,
    inputFormat: "class EventEmitter with on, off, emit, once methods",
    outputFormat: "Return results of emit operations",
    constraints: "Events and listeners <= 1000",
    starterCode: `class EventEmitter {
    constructor() {
        // Your code here
    }
    
    on(event, callback) {
        // Your code here
    }
    
    off(event, callback) {
        // Your code here
    }
    
    emit(event, ...args) {
        // Your code here
    }
    
    once(event, callback) {
        // Your code here
    }
}

const emitter = new EventEmitter();
const results = [];
const cb = (x) => results.push(x);

emitter.on('test', cb);
emitter.emit('test', 1);
emitter.emit('test', 2);
emitter.off('test', cb);
emitter.emit('test', 3);

console.log(results.join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "", expectedOutput: "1 2" }
    ],
    hiddenTestCases: [
      { input: "", expectedOutput: "1 2" },
      { input: "", expectedOutput: "1 2" },
      { input: "", expectedOutput: "1 2" },
      { input: "", expectedOutput: "1 2" },
      { input: "", expectedOutput: "1 2" }
    ]
  },
  {
    id: "js-top-k-frequent",
    slug: "js-top-k-frequent",
    title: "Top K Frequent Elements",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Find the k most frequent elements in an array.

**Example:** Given nums = [1,1,1,2,2,3], k = 2, return [1, 2].`,
    inputFormat: "function topKFrequent(nums: number[], k: number): number[]",
    outputFormat: "Return k most frequent elements",
    constraints: "1 <= nums.length <= 10^5, 1 <= k <= unique elements",
    starterCode: `function topKFrequent(nums, k) {
    // Your code here
}

const nums = readline().split(' ').map(Number);
const k = parseInt(readline());
console.log(topKFrequent(nums, k).join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 1 1 2 2 3\n2", expectedOutput: "1 2" },
      { input: "1\n1", expectedOutput: "1" },
      { input: "1 2 2 3 3 3\n2", expectedOutput: "3 2" }
    ],
    hiddenTestCases: [
      { input: "1 1 2 2 3 3\n3", expectedOutput: "1 2 3" },
      { input: "5 5 5 5 5\n1", expectedOutput: "5" },
      { input: "1 2 3 4\n4", expectedOutput: "1 2 3 4" },
      { input: "-1 -1 2\n1", expectedOutput: "-1" },
      { input: "4 1 4 1 4 4\n1", expectedOutput: "4" }
    ]
  },
  {
    id: "js-merge-intervals",
    slug: "js-merge-intervals",
    title: "Merge Intervals",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Merge overlapping intervals.

**Example:** Given intervals = [[1,3],[2,6],[8,10],[15,18]], return [[1,6],[8,10],[15,18]].`,
    inputFormat: "function mergeIntervals(intervals: number[][]): number[][]",
    outputFormat: "Return merged intervals",
    constraints: "1 <= intervals.length <= 10^4",
    starterCode: `function mergeIntervals(intervals) {
    // Your code here
}

const n = parseInt(readline());
const intervals = [];
for (let i = 0; i < n; i++) {
    intervals.push(readline().split(' ').map(Number));
}
const result = mergeIntervals(intervals);
console.log(result.map(i => i.join(',')).join(' '));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", expectedOutput: "1,6 8,10 15,18" },
      { input: "2\n1 4\n4 5", expectedOutput: "1,5" },
      { input: "1\n1 5", expectedOutput: "1,5" }
    ],
    hiddenTestCases: [
      { input: "2\n1 4\n2 3", expectedOutput: "1,4" },
      { input: "3\n1 2\n3 4\n5 6", expectedOutput: "1,2 3,4 5,6" },
      { input: "2\n1 10\n2 3", expectedOutput: "1,10" },
      { input: "3\n1 4\n0 4\n3 5", expectedOutput: "0,5" },
      { input: "2\n1 4\n0 0", expectedOutput: "0,0 1,4" }
    ]
  },
  {
    id: "js-word-ladder",
    slug: "js-word-ladder",
    title: "Word Ladder (Graph)",
    category: "JavaScript Track",
    difficulty: "hard",
    description: `Find shortest transformation sequence from beginWord to endWord using dictionary words.

**Example:** beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"], return 5.`,
    inputFormat: "function ladderLength(beginWord, endWord, wordList): number",
    outputFormat: "Return length of shortest transformation or 0",
    constraints: "1 <= beginWord.length <= 10, wordList.length <= 5000",
    starterCode: `function ladderLength(beginWord, endWord, wordList) {
    // Your code here
}

const beginWord = readline();
const endWord = readline();
const wordList = readline().split(' ');
console.log(ladderLength(beginWord, endWord, wordList));`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hit\ncog\nhot dot dog lot log cog", expectedOutput: "5" },
      { input: "hit\ncog\nhot dot dog lot log", expectedOutput: "0" },
      { input: "a\nc\na b c", expectedOutput: "2" }
    ],
    hiddenTestCases: [
      { input: "hot\ndog\nhot dog", expectedOutput: "0" },
      { input: "hit\nhit\nhit", expectedOutput: "1" },
      { input: "ab\ncd\nab cd", expectedOutput: "0" },
      { input: "a\nb\na b", expectedOutput: "2" },
      { input: "abc\nabc\nabc", expectedOutput: "1" }
    ]
  }
];

export const JAVASCRIPT_TRACK_TOTAL = javascriptProblemsData.length;
