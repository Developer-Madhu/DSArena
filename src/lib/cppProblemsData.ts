// C++ Learning Track - 30 questions from beginner to advanced
import { ProblemData } from './problemsData';

export const cppProblemsData: ProblemData[] = [
  // 🟢 Beginner Level (1-10)
  {
    id: "cpp-basic-io",
    slug: "cpp-basic-io",
    title: "Basic Input & Output",
    category: "C++ Track",
    difficulty: "easy",
    description: `Read two integers and print their sum.

**Example:** Given a = 5, b = 3, output 8.`,
    inputFormat: "Two space-separated integers",
    outputFormat: "Print the sum",
    constraints: "-10^9 <= a, b <= 10^9",
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 3", expectedOutput: "8" },
      { input: "10 20", expectedOutput: "30" },
      { input: "-5 5", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "0 0", expectedOutput: "0" },
      { input: "1000000000 1000000000", expectedOutput: "2000000000" },
      { input: "-100 -200", expectedOutput: "-300" },
      { input: "1 -1", expectedOutput: "0" },
      { input: "999 1", expectedOutput: "1000" }
    ]
  },
  {
    id: "cpp-reverse-string",
    slug: "cpp-reverse-string",
    title: "Reverse a String",
    category: "C++ Track",
    difficulty: "easy",
    description: `Reverse the given string.

**Example:** Given s = "hello", return "olleh".`,
    inputFormat: "A string",
    outputFormat: "Reversed string",
    constraints: "1 <= s.length <= 10^5",
    starterCode: `#include <iostream>
#include <string>
using namespace std;

string reverseString(string s) {
    // Your code here
    return "";
}

int main() {
    string s;
    cin >> s;
    cout << reverseString(s) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "cpp", expectedOutput: "ppc" },
      { input: "a", expectedOutput: "a" }
    ],
    hiddenTestCases: [
      { input: "abcdef", expectedOutput: "fedcba" },
      { input: "12345", expectedOutput: "54321" },
      { input: "aa", expectedOutput: "aa" },
      { input: "racecar", expectedOutput: "racecar" },
      { input: "ab", expectedOutput: "ba" }
    ]
  },
  {
    id: "cpp-count-set-bits",
    slug: "cpp-count-set-bits",
    title: "Count Set Bits",
    category: "C++ Track",
    difficulty: "easy",
    description: `Count the number of 1 bits in the binary representation.

**Example:** Given n = 11, return 3 (binary: 1011).`,
    inputFormat: "An integer n",
    outputFormat: "Count of set bits",
    constraints: "0 <= n <= 10^9",
    starterCode: `#include <iostream>
using namespace std;

int countSetBits(int n) {
    // Your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << countSetBits(n) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "11", expectedOutput: "3" },
      { input: "0", expectedOutput: "0" },
      { input: "7", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "15", expectedOutput: "4" },
      { input: "16", expectedOutput: "1" },
      { input: "255", expectedOutput: "8" },
      { input: "1023", expectedOutput: "10" }
    ]
  },
  {
    id: "cpp-linear-search",
    slug: "cpp-linear-search",
    title: "Linear Search",
    category: "C++ Track",
    difficulty: "easy",
    description: `Find the index of target element in array using linear search.

**Example:** Given arr = [1, 2, 3, 4, 5], target = 3, return 2.`,
    inputFormat: "Array elements and target",
    outputFormat: "Index of target or -1",
    constraints: "1 <= arr.length <= 10^5",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int linearSearch(vector<int>& arr, int target) {
    // Your code here
    return -1;
}

int main() {
    int n, target;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cin >> target;
    cout << linearSearch(arr, target) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\n1 2 3 4 5\n3", expectedOutput: "2" },
      { input: "3\n10 20 30\n25", expectedOutput: "-1" },
      { input: "1\n5\n5", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "5\n1 2 3 4 5\n1", expectedOutput: "0" },
      { input: "5\n1 2 3 4 5\n5", expectedOutput: "4" },
      { input: "3\n-1 0 1\n0", expectedOutput: "1" },
      { input: "4\n5 5 5 5\n5", expectedOutput: "0" },
      { input: "2\n1 2\n3", expectedOutput: "-1" }
    ]
  },
  {
    id: "cpp-binary-decimal",
    slug: "cpp-binary-decimal",
    title: "Binary to Decimal Conversion",
    category: "C++ Track",
    difficulty: "easy",
    description: `Convert a binary string to decimal number.

**Example:** Given binary = "1010", return 10.`,
    inputFormat: "A binary string",
    outputFormat: "Decimal equivalent",
    constraints: "1 <= binary.length <= 30",
    starterCode: `#include <iostream>
#include <string>
using namespace std;

int binaryToDecimal(string binary) {
    // Your code here
    return 0;
}

int main() {
    string binary;
    cin >> binary;
    cout << binaryToDecimal(binary) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1010", expectedOutput: "10" },
      { input: "1111", expectedOutput: "15" },
      { input: "0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "10", expectedOutput: "2" },
      { input: "100", expectedOutput: "4" },
      { input: "11111111", expectedOutput: "255" },
      { input: "10000000", expectedOutput: "128" }
    ]
  },
  {
    id: "cpp-gcd",
    slug: "cpp-gcd",
    title: "GCD of Two Numbers",
    category: "C++ Track",
    difficulty: "easy",
    description: `Find the Greatest Common Divisor of two numbers.

**Example:** Given a = 12, b = 18, return 6.`,
    inputFormat: "Two integers a and b",
    outputFormat: "GCD of a and b",
    constraints: "1 <= a, b <= 10^9",
    starterCode: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    // Your code here
    return 0;
}

int main() {
    int a, b;
    cin >> a >> b;
    cout << gcd(a, b) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "12 18", expectedOutput: "6" },
      { input: "7 5", expectedOutput: "1" },
      { input: "100 25", expectedOutput: "25" }
    ],
    hiddenTestCases: [
      { input: "1 1", expectedOutput: "1" },
      { input: "10 10", expectedOutput: "10" },
      { input: "17 23", expectedOutput: "1" },
      { input: "48 36", expectedOutput: "12" },
      { input: "1000000000 500000000", expectedOutput: "500000000" }
    ]
  },
  {
    id: "cpp-armstrong",
    slug: "cpp-armstrong",
    title: "Check Armstrong Number",
    category: "C++ Track",
    difficulty: "easy",
    description: `Check if a number is an Armstrong number.

**Example:** 153 is Armstrong: 1^3 + 5^3 + 3^3 = 153.`,
    inputFormat: "An integer n",
    outputFormat: "true or false",
    constraints: "0 <= n <= 10^9",
    starterCode: `#include <iostream>
#include <cmath>
using namespace std;

bool isArmstrong(int n) {
    // Your code here
    return false;
}

int main() {
    int n;
    cin >> n;
    cout << (isArmstrong(n) ? "true" : "false") << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "153", expectedOutput: "true" },
      { input: "123", expectedOutput: "false" },
      { input: "370", expectedOutput: "true" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "true" },
      { input: "1", expectedOutput: "true" },
      { input: "9", expectedOutput: "true" },
      { input: "407", expectedOutput: "true" },
      { input: "100", expectedOutput: "false" }
    ]
  },
  {
    id: "cpp-matrix-addition",
    slug: "cpp-matrix-addition",
    title: "Matrix Addition",
    category: "C++ Track",
    difficulty: "easy",
    description: `Add two matrices of same dimensions.

**Example:** Add [[1,2],[3,4]] and [[5,6],[7,8]] = [[6,8],[10,12]].`,
    inputFormat: "Matrix dimensions and elements",
    outputFormat: "Resulting matrix",
    constraints: "1 <= rows, cols <= 100",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> addMatrices(vector<vector<int>>& a, vector<vector<int>>& b) {
    // Your code here
    return {};
}

int main() {
    int r, c;
    cin >> r >> c;
    vector<vector<int>> a(r, vector<int>(c)), b(r, vector<int>(c));
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            cin >> a[i][j];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            cin >> b[i][j];
    
    auto result = addMatrices(a, b);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++)
            cout << result[i][j] << (j < c-1 ? " " : "");
        cout << endl;
    }
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "2 2\n1 2\n3 4\n5 6\n7 8", expectedOutput: "6 8\n10 12" },
      { input: "1 3\n1 2 3\n4 5 6", expectedOutput: "5 7 9" },
      { input: "2 1\n1\n2\n3\n4", expectedOutput: "4\n6" }
    ],
    hiddenTestCases: [
      { input: "1 1\n5\n3", expectedOutput: "8" },
      { input: "2 2\n0 0\n0 0\n1 1\n1 1", expectedOutput: "1 1\n1 1" },
      { input: "2 2\n-1 -2\n-3 -4\n1 2\n3 4", expectedOutput: "0 0\n0 0" },
      { input: "3 2\n1 2\n3 4\n5 6\n6 5\n4 3\n2 1", expectedOutput: "7 7\n7 7\n7 7" },
      { input: "1 2\n10 20\n30 40", expectedOutput: "40 60" }
    ]
  },
  {
    id: "cpp-remove-duplicates-chars",
    slug: "cpp-remove-duplicates-chars",
    title: "Remove Duplicate Characters",
    category: "C++ Track",
    difficulty: "easy",
    description: `Remove duplicate characters from a string while preserving order.

**Example:** Given s = "programming", return "progamin".`,
    inputFormat: "A string",
    outputFormat: "String without duplicates",
    constraints: "1 <= s.length <= 10^5",
    starterCode: `#include <iostream>
#include <string>
#include <unordered_set>
using namespace std;

string removeDuplicates(string s) {
    // Your code here
    return "";
}

int main() {
    string s;
    cin >> s;
    cout << removeDuplicates(s) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "programming", expectedOutput: "progamin" },
      { input: "hello", expectedOutput: "helo" },
      { input: "aaa", expectedOutput: "a" }
    ],
    hiddenTestCases: [
      { input: "a", expectedOutput: "a" },
      { input: "ab", expectedOutput: "ab" },
      { input: "abba", expectedOutput: "ab" },
      { input: "abcabc", expectedOutput: "abc" },
      { input: "zzzzz", expectedOutput: "z" }
    ]
  },
  {
    id: "cpp-atoi",
    slug: "cpp-atoi",
    title: "String to Integer (atoi)",
    category: "C++ Track",
    difficulty: "easy",
    description: `Implement string to integer conversion.

**Example:** Given s = "42", return 42.`,
    inputFormat: "A string with optional sign and digits",
    outputFormat: "Integer value",
    constraints: "1 <= s.length <= 200",
    starterCode: `#include <iostream>
#include <string>
using namespace std;

int myAtoi(string s) {
    // Your code here
    return 0;
}

int main() {
    string s;
    getline(cin, s);
    cout << myAtoi(s) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "42", expectedOutput: "42" },
      { input: "   -42", expectedOutput: "-42" },
      { input: "4193 with words", expectedOutput: "4193" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "-0", expectedOutput: "0" },
      { input: "+1", expectedOutput: "1" },
      { input: "  123", expectedOutput: "123" },
      { input: "-123", expectedOutput: "-123" }
    ]
  },

  // 🟡 Intermediate Level (11-20)
  {
    id: "cpp-two-sum",
    slug: "cpp-two-sum",
    title: "Two Sum",
    category: "C++ Track",
    difficulty: "medium",
    description: `Find two numbers that add up to target.

**Example:** Given nums = [2, 7, 11, 15], target = 9, return [0, 1].`,
    inputFormat: "Array and target",
    outputFormat: "Indices of two numbers",
    constraints: "2 <= nums.length <= 10^4",
    starterCode: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}

int main() {
    int n, target;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> target;
    auto result = twoSum(nums, target);
    cout << result[0] << " " << result[1] << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n2 7 11 15\n9", expectedOutput: "0 1" },
      { input: "3\n3 2 4\n6", expectedOutput: "1 2" },
      { input: "2\n3 3\n6", expectedOutput: "0 1" }
    ],
    hiddenTestCases: [
      { input: "5\n1 2 3 4 5\n9", expectedOutput: "3 4" },
      { input: "4\n-1 -2 -3 -4\n-6", expectedOutput: "1 3" },
      { input: "4\n0 4 3 0\n0", expectedOutput: "0 3" },
      { input: "4\n1 5 1 5\n10", expectedOutput: "1 3" },
      { input: "4\n2 5 5 11\n10", expectedOutput: "1 2" }
    ]
  },
  {
    id: "cpp-three-sum",
    slug: "cpp-three-sum",
    title: "3Sum",
    category: "C++ Track",
    difficulty: "medium",
    description: `Find all unique triplets that sum to zero.

**Example:** Given nums = [-1, 0, 1, 2, -1, -4], return [[-1, -1, 2], [-1, 0, 1]].`,
    inputFormat: "Array of integers",
    outputFormat: "List of triplets",
    constraints: "3 <= nums.length <= 3000",
    starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    // Your code here
    return {};
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    auto result = threeSum(nums);
    cout << result.size() << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6\n-1 0 1 2 -1 -4", expectedOutput: "2" },
      { input: "3\n0 0 0", expectedOutput: "1" },
      { input: "3\n1 2 -2", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "6\n-1 0 1 2 -1 -4", expectedOutput: "2" },
      { input: "4\n-2 0 1 1", expectedOutput: "1" },
      { input: "5\n1 -1 -1 0 1", expectedOutput: "1" },
      { input: "3\n0 0 0", expectedOutput: "1" },
      { input: "4\n1 2 3 4", expectedOutput: "0" }
    ]
  },
  {
    id: "cpp-lis",
    slug: "cpp-lis",
    title: "Longest Increasing Subsequence",
    category: "C++ Track",
    difficulty: "medium",
    description: `Find the length of the longest increasing subsequence.

**Example:** Given nums = [10, 9, 2, 5, 3, 7, 101, 18], return 4.`,
    inputFormat: "Array of integers",
    outputFormat: "Length of LIS",
    constraints: "1 <= nums.length <= 2500",
    starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    // Your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << lengthOfLIS(nums) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "8\n10 9 2 5 3 7 101 18", expectedOutput: "4" },
      { input: "4\n0 1 0 3", expectedOutput: "3" },
      { input: "5\n7 7 7 7 7", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "5\n1 2 3 4 5", expectedOutput: "5" },
      { input: "5\n5 4 3 2 1", expectedOutput: "1" },
      { input: "6\n1 3 6 7 9 4", expectedOutput: "5" },
      { input: "7\n2 1 5 3 6 4 8", expectedOutput: "4" }
    ]
  },
  {
    id: "cpp-kadane",
    slug: "cpp-kadane",
    title: "Kadane's Algorithm",
    category: "C++ Track",
    difficulty: "medium",
    description: `Find the maximum sum of a contiguous subarray.

**Example:** Given nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4], return 6.`,
    inputFormat: "Array of integers",
    outputFormat: "Maximum subarray sum",
    constraints: "1 <= nums.length <= 10^5",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << maxSubArray(nums) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6" },
      { input: "1\n1", expectedOutput: "1" },
      { input: "5\n5 4 -1 7 8", expectedOutput: "23" }
    ],
    hiddenTestCases: [
      { input: "1\n-1", expectedOutput: "-1" },
      { input: "3\n-2 -1 -3", expectedOutput: "-1" },
      { input: "5\n1 2 3 4 5", expectedOutput: "15" },
      { input: "4\n-1 -2 -3 -4", expectedOutput: "-1" },
      { input: "6\n1 -1 1 -1 1 -1", expectedOutput: "1" }
    ]
  },
  {
    id: "cpp-merge-k-lists",
    slug: "cpp-merge-k-lists",
    title: "Merge K Sorted Lists",
    category: "C++ Track",
    difficulty: "medium",
    description: `Merge k sorted linked lists into one sorted list.

**Example:** Given lists = [[1,4,5],[1,3,4],[2,6]], return [1,1,2,3,4,4,5,6].`,
    inputFormat: "K sorted lists",
    outputFormat: "Merged sorted list",
    constraints: "k == lists.length, 0 <= k <= 10^4",
    starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeKLists(vector<ListNode*>& lists) {
    // Your code here
    return nullptr;
}

int main() {
    int k;
    cin >> k;
    vector<ListNode*> lists(k);
    
    for (int i = 0; i < k; i++) {
        int n;
        cin >> n;
        if (n == 0) {
            lists[i] = nullptr;
            continue;
        }
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        for (int j = 0; j < n; j++) {
            int val;
            cin >> val;
            curr->next = new ListNode(val);
            curr = curr->next;
        }
        lists[i] = dummy->next;
    }
    
    ListNode* result = mergeKLists(lists);
    while (result) {
        cout << result->val;
        if (result->next) cout << " ";
        result = result->next;
    }
    cout << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n3\n1 4 5\n3\n1 3 4\n2\n2 6", expectedOutput: "1 1 2 3 4 4 5 6" },
      { input: "1\n3\n1 2 3", expectedOutput: "1 2 3" },
      { input: "2\n2\n1 3\n2\n2 4", expectedOutput: "1 2 3 4" }
    ],
    hiddenTestCases: [
      { input: "1\n0", expectedOutput: "" },
      { input: "0", expectedOutput: "" },
      { input: "2\n1\n1\n1\n2", expectedOutput: "1 2" },
      { input: "3\n1\n5\n1\n3\n1\n1", expectedOutput: "1 3 5" },
      { input: "2\n3\n1 1 1\n3\n2 2 2", expectedOutput: "1 1 1 2 2 2" }
    ]
  },
  {
    id: "cpp-inorder-iterative",
    slug: "cpp-inorder-iterative",
    title: "Inorder Traversal (Iterative)",
    category: "C++ Track",
    difficulty: "medium",
    description: `Perform iterative inorder traversal of a binary tree.

**Example:** Given tree [1,null,2,3], return [1,3,2].`,
    inputFormat: "Tree nodes in level order",
    outputFormat: "Inorder traversal result",
    constraints: "0 <= nodes <= 100",
    starterCode: `#include <iostream>
#include <vector>
#include <stack>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> inorderTraversal(TreeNode* root) {
    // Your code here - use iterative approach
    return {};
}

int main() {
    // Simplified input handling
    int val;
    if (cin >> val && val != -1) {
        TreeNode* root = new TreeNode(val);
        auto result = inorderTraversal(root);
        for (int i = 0; i < result.size(); i++) {
            cout << result[i];
            if (i < result.size() - 1) cout << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "5", expectedOutput: "5" },
      { input: "-1", expectedOutput: "" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
      { input: "10", expectedOutput: "10" },
      { input: "100", expectedOutput: "100" }
    ]
  },
  {
    id: "cpp-stack-using-queues",
    slug: "cpp-stack-using-queues",
    title: "Implement Stack using Queues",
    category: "C++ Track",
    difficulty: "medium",
    description: `Implement a stack using only two queues.

**Example:** push(1), push(2), pop() returns 2.`,
    inputFormat: "Stack operations",
    outputFormat: "Results of pop/top operations",
    constraints: "1 <= operations <= 100",
    starterCode: `#include <iostream>
#include <queue>
using namespace std;

class MyStack {
    queue<int> q1, q2;
public:
    void push(int x) {
        // Your code here
    }
    
    int pop() {
        // Your code here
        return 0;
    }
    
    int top() {
        // Your code here
        return 0;
    }
    
    bool empty() {
        // Your code here
        return true;
    }
};

int main() {
    MyStack stack;
    int n;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        string op;
        cin >> op;
        if (op == "push") {
            int x;
            cin >> x;
            stack.push(x);
        } else if (op == "pop") {
            cout << stack.pop() << " ";
        } else if (op == "top") {
            cout << stack.top() << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\npush 1\npush 2\npop\ntop", expectedOutput: "2 1" },
      { input: "3\npush 1\ntop\npop", expectedOutput: "1 1" },
      { input: "5\npush 1\npush 2\npush 3\npop\npop", expectedOutput: "3 2" }
    ],
    hiddenTestCases: [
      { input: "2\npush 5\ntop", expectedOutput: "5" },
      { input: "4\npush 1\npush 2\npop\npop", expectedOutput: "2 1" },
      { input: "3\npush 10\ntop\npop", expectedOutput: "10 10" },
      { input: "6\npush 1\npush 2\npush 3\npop\npop\npop", expectedOutput: "3 2 1" },
      { input: "2\npush 100\npop", expectedOutput: "100" }
    ]
  },
  {
    id: "cpp-trapping-rain",
    slug: "cpp-trapping-rain",
    title: "Trapping Rain Water",
    category: "C++ Track",
    difficulty: "medium",
    description: `Calculate how much water can be trapped after rain.

**Example:** Given height = [0,1,0,2,1,0,1,3,2,1,2,1], return 6.`,
    inputFormat: "Array of heights",
    outputFormat: "Total water trapped",
    constraints: "n == height.length, 1 <= n <= 2 * 10^4",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int trap(vector<int>& height) {
    // Your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> height(n);
    for (int i = 0; i < n; i++) cin >> height[i];
    cout << trap(height) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6" },
      { input: "6\n4 2 0 3 2 5", expectedOutput: "9" },
      { input: "3\n1 0 1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1\n5", expectedOutput: "0" },
      { input: "2\n1 2", expectedOutput: "0" },
      { input: "5\n5 4 3 2 1", expectedOutput: "0" },
      { input: "5\n1 2 3 2 1", expectedOutput: "0" },
      { input: "4\n3 0 0 3", expectedOutput: "6" }
    ]
  },
  {
    id: "cpp-top-k-frequent",
    slug: "cpp-top-k-frequent",
    title: "Top K Frequent Elements",
    category: "C++ Track",
    difficulty: "medium",
    description: `Find the k most frequent elements.

**Example:** Given nums = [1,1,1,2,2,3], k = 2, return [1, 2].`,
    inputFormat: "Array and k",
    outputFormat: "K most frequent elements",
    constraints: "1 <= nums.length <= 10^5",
    starterCode: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    // Your code here
    return {};
}

int main() {
    int n, k;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cin >> k;
    auto result = topKFrequent(nums, k);
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6\n1 1 1 2 2 3\n2", expectedOutput: "1 2" },
      { input: "1\n1\n1", expectedOutput: "1" },
      { input: "6\n1 2 2 3 3 3\n2", expectedOutput: "3 2" }
    ],
    hiddenTestCases: [
      { input: "6\n1 1 2 2 3 3\n3", expectedOutput: "1 2 3" },
      { input: "5\n5 5 5 5 5\n1", expectedOutput: "5" },
      { input: "4\n1 2 3 4\n4", expectedOutput: "1 2 3 4" },
      { input: "3\n-1 -1 2\n1", expectedOutput: "-1" },
      { input: "6\n4 1 4 1 4 4\n1", expectedOutput: "4" }
    ]
  },
  {
    id: "cpp-longest-consecutive",
    slug: "cpp-longest-consecutive",
    title: "Longest Consecutive Sequence",
    category: "C++ Track",
    difficulty: "medium",
    description: `Find the length of the longest consecutive elements sequence.

**Example:** Given nums = [100, 4, 200, 1, 3, 2], return 4.`,
    inputFormat: "Array of integers",
    outputFormat: "Length of longest consecutive sequence",
    constraints: "0 <= nums.length <= 10^5",
    starterCode: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    // Your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    cout << longestConsecutive(nums) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "6\n100 4 200 1 3 2", expectedOutput: "4" },
      { input: "9\n0 3 7 2 5 8 4 6 0", expectedOutput: "9" },
      { input: "0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "1" },
      { input: "5\n1 2 3 4 5", expectedOutput: "5" },
      { input: "5\n5 4 3 2 1", expectedOutput: "5" },
      { input: "4\n1 3 5 7", expectedOutput: "1" },
      { input: "6\n1 1 1 2 2 2", expectedOutput: "2" }
    ]
  },

  // 🔴 Advanced Level (21-30)
  {
    id: "cpp-dijkstra",
    slug: "cpp-dijkstra",
    title: "Dijkstra's Algorithm",
    category: "C++ Track",
    difficulty: "hard",
    description: `Implement Dijkstra's algorithm for shortest path.

**Example:** Find shortest distances from source to all nodes.`,
    inputFormat: "Graph edges with weights",
    outputFormat: "Shortest distances from source",
    constraints: "1 <= n <= 1000",
    starterCode: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int src) {
    // Your code here
    return {};
}

int main() {
    int n, m, src;
    cin >> n >> m >> src;
    
    vector<vector<pair<int,int>>> adj(n);
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }
    
    auto result = dijkstra(n, adj, src);
    for (int i = 0; i < n; i++) {
        cout << result[i];
        if (i < n - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 5 0\n0 1 1\n0 2 4\n1 2 2\n1 3 6\n2 3 3", expectedOutput: "0 1 3 6" },
      { input: "3 3 0\n0 1 1\n1 2 2\n0 2 4", expectedOutput: "0 1 3" },
      { input: "2 1 0\n0 1 5", expectedOutput: "0 5" }
    ],
    hiddenTestCases: [
      { input: "1 0 0", expectedOutput: "0" },
      { input: "3 2 0\n0 1 1\n0 2 2", expectedOutput: "0 1 2" },
      { input: "4 4 0\n0 1 1\n1 2 1\n2 3 1\n0 3 10", expectedOutput: "0 1 2 3" },
      { input: "3 3 1\n0 1 2\n1 2 3\n0 2 7", expectedOutput: "2 0 3" },
      { input: "2 2 0\n0 1 1\n1 0 1", expectedOutput: "0 1" }
    ]
  },
  {
    id: "cpp-floyd-warshall",
    slug: "cpp-floyd-warshall",
    title: "Floyd–Warshall Algorithm",
    category: "C++ Track",
    difficulty: "hard",
    description: `Implement Floyd-Warshall algorithm for all-pairs shortest path.

**Example:** Find shortest paths between all pairs of vertices.`,
    inputFormat: "Adjacency matrix with weights",
    outputFormat: "Shortest path matrix",
    constraints: "1 <= n <= 100",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

const int INF = 1e9;

void floydWarshall(vector<vector<int>>& dist) {
    // Your code here
}

int main() {
    int n;
    cin >> n;
    
    vector<vector<int>> dist(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> dist[i][j];
            if (dist[i][j] == -1) dist[i][j] = INF;
        }
    }
    
    floydWarshall(dist);
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (dist[i][j] >= INF) cout << "-1";
            else cout << dist[i][j];
            if (j < n - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3\n0 3 -1\n-1 0 1\n4 -1 0", expectedOutput: "0 3 4\n5 0 1\n4 7 0" },
      { input: "2\n0 1\n1 0", expectedOutput: "0 1\n1 0" },
      { input: "1\n0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "3\n0 1 1\n1 0 1\n1 1 0", expectedOutput: "0 1 1\n1 0 1\n1 1 0" },
      { input: "2\n0 5\n5 0", expectedOutput: "0 5\n5 0" },
      { input: "3\n0 1 -1\n-1 0 2\n-1 -1 0", expectedOutput: "0 1 3\n-1 0 2\n-1 -1 0" },
      { input: "2\n0 -1\n-1 0", expectedOutput: "0 -1\n-1 0" },
      { input: "3\n0 2 5\n2 0 3\n5 3 0", expectedOutput: "0 2 5\n2 0 3\n5 3 0" }
    ]
  },
  {
    id: "cpp-kmp",
    slug: "cpp-kmp",
    title: "KMP Pattern Matching",
    category: "C++ Track",
    difficulty: "hard",
    description: `Implement KMP algorithm for pattern matching.

**Example:** Find all occurrences of pattern in text.`,
    inputFormat: "Text and pattern strings",
    outputFormat: "All starting indices of pattern",
    constraints: "1 <= text.length, pattern.length <= 10^5",
    starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> kmpSearch(string text, string pattern) {
    // Your code here
    return {};
}

int main() {
    string text, pattern;
    cin >> text >> pattern;
    
    auto result = kmpSearch(text, pattern);
    if (result.empty()) {
        cout << "-1" << endl;
    } else {
        for (int i = 0; i < result.size(); i++) {
            cout << result[i];
            if (i < result.size() - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ababcababc\nabc", expectedOutput: "2 7" },
      { input: "aaaaaa\naa", expectedOutput: "0 1 2 3 4" },
      { input: "hello\nworld", expectedOutput: "-1" }
    ],
    hiddenTestCases: [
      { input: "abc\nabc", expectedOutput: "0" },
      { input: "aaaa\na", expectedOutput: "0 1 2 3" },
      { input: "abcdef\nxyz", expectedOutput: "-1" },
      { input: "aaa\naaaa", expectedOutput: "-1" },
      { input: "abababab\nab", expectedOutput: "0 2 4 6" }
    ]
  },
  {
    id: "cpp-trie",
    slug: "cpp-trie",
    title: "Trie Implementation",
    category: "C++ Track",
    difficulty: "hard",
    description: `Implement a Trie (prefix tree) with insert, search, and startsWith.

**Example:** insert("apple"), search("apple") returns true.`,
    inputFormat: "Trie operations",
    outputFormat: "Results of search/startsWith",
    constraints: "1 <= word.length <= 2000",
    starterCode: `#include <iostream>
#include <string>
using namespace std;

class Trie {
public:
    Trie() {
        // Your code here
    }
    
    void insert(string word) {
        // Your code here
    }
    
    bool search(string word) {
        // Your code here
        return false;
    }
    
    bool startsWith(string prefix) {
        // Your code here
        return false;
    }
};

int main() {
    Trie trie;
    int n;
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        string op, word;
        cin >> op >> word;
        if (op == "insert") {
            trie.insert(word);
        } else if (op == "search") {
            cout << (trie.search(word) ? "true" : "false") << " ";
        } else if (op == "startsWith") {
            cout << (trie.startsWith(word) ? "true" : "false") << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app", expectedOutput: "true false true" },
      { input: "3\ninsert hello\nsearch hello\nsearch world", expectedOutput: "true false" },
      { input: "4\ninsert a\ninsert ab\nsearch a\nsearch ab", expectedOutput: "true true" }
    ],
    hiddenTestCases: [
      { input: "2\ninsert test\nsearch test", expectedOutput: "true" },
      { input: "3\ninsert abc\nstartsWith a\nstartsWith d", expectedOutput: "true false" },
      { input: "4\ninsert ab\ninsert abc\nsearch ab\nsearch abc", expectedOutput: "true true" },
      { input: "3\ninsert hello\nstartsWith he\nstartsWith hi", expectedOutput: "true false" },
      { input: "2\nsearch nothing\nstartsWith no", expectedOutput: "false false" }
    ]
  },
  {
    id: "cpp-lru-cache",
    slug: "cpp-lru-cache",
    title: "LRU Cache",
    category: "C++ Track",
    difficulty: "hard",
    description: `Implement a Least Recently Used (LRU) cache.

**Example:** LRUCache(2), put(1,1), put(2,2), get(1) returns 1.`,
    inputFormat: "Cache operations",
    outputFormat: "Results of get operations",
    constraints: "1 <= capacity <= 3000",
    starterCode: `#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
public:
    LRUCache(int capacity) {
        // Your code here
    }
    
    int get(int key) {
        // Your code here
        return -1;
    }
    
    void put(int key, int value) {
        // Your code here
    }
};

int main() {
    int capacity, ops;
    cin >> capacity >> ops;
    
    LRUCache cache(capacity);
    
    for (int i = 0; i < ops; i++) {
        string op;
        cin >> op;
        if (op == "get") {
            int key;
            cin >> key;
            cout << cache.get(key) << " ";
        } else {
            int key, value;
            cin >> key >> value;
            cache.put(key, value);
        }
    }
    cout << endl;
    return 0;
}`,
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
    id: "cpp-segment-tree",
    slug: "cpp-segment-tree",
    title: "Segment Tree Build & Query",
    category: "C++ Track",
    difficulty: "hard",
    description: `Implement a segment tree for range sum queries.

**Example:** Build tree for [1, 3, 5, 7, 9], query(1, 3) returns 15.`,
    inputFormat: "Array and queries",
    outputFormat: "Query results",
    constraints: "1 <= n <= 10^5",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

class SegmentTree {
    vector<int> tree;
    int n;
    
public:
    SegmentTree(vector<int>& arr) {
        // Your code here
    }
    
    int query(int l, int r) {
        // Your code here
        return 0;
    }
    
    void update(int idx, int val) {
        // Your code here
    }
};

int main() {
    int n, q;
    cin >> n >> q;
    
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    
    SegmentTree st(arr);
    
    for (int i = 0; i < q; i++) {
        string op;
        cin >> op;
        if (op == "query") {
            int l, r;
            cin >> l >> r;
            cout << st.query(l, r) << " ";
        } else {
            int idx, val;
            cin >> idx >> val;
            st.update(idx, val);
        }
    }
    cout << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 2\n1 3 5 7 9\nquery 1 3\nquery 0 4", expectedOutput: "15 25" },
      { input: "3 2\n1 2 3\nquery 0 2\nquery 1 1", expectedOutput: "6 2" },
      { input: "4 3\n2 4 6 8\nquery 0 3\nupdate 2 10\nquery 0 3", expectedOutput: "20 24" }
    ],
    hiddenTestCases: [
      { input: "1 1\n5\nquery 0 0", expectedOutput: "5" },
      { input: "3 3\n1 2 3\nquery 0 0\nquery 1 1\nquery 2 2", expectedOutput: "1 2 3" },
      { input: "5 2\n0 0 0 0 0\nquery 0 4\nquery 2 3", expectedOutput: "0 0" },
      { input: "4 2\n1 1 1 1\nquery 0 3\nquery 1 2", expectedOutput: "4 2" },
      { input: "3 2\n10 20 30\nquery 0 1\nquery 1 2", expectedOutput: "30 50" }
    ]
  },
  {
    id: "cpp-fenwick-tree",
    slug: "cpp-fenwick-tree",
    title: "Binary Indexed Tree (Fenwick)",
    category: "C++ Track",
    difficulty: "hard",
    description: `Implement a Binary Indexed Tree (Fenwick Tree) for prefix sums.

**Example:** Build BIT for [1, 2, 3, 4], query(3) returns 6.`,
    inputFormat: "Array and queries",
    outputFormat: "Query results",
    constraints: "1 <= n <= 10^5",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

class BIT {
    vector<int> tree;
    int n;
    
public:
    BIT(int n) {
        // Your code here
    }
    
    void update(int i, int delta) {
        // Your code here
    }
    
    int query(int i) {
        // Your code here - prefix sum from 0 to i
        return 0;
    }
};

int main() {
    int n, q;
    cin >> n >> q;
    
    BIT bit(n);
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        bit.update(i, x);
    }
    
    for (int i = 0; i < q; i++) {
        string op;
        cin >> op;
        if (op == "query") {
            int idx;
            cin >> idx;
            cout << bit.query(idx) << " ";
        } else {
            int idx, delta;
            cin >> idx >> delta;
            bit.update(idx, delta);
        }
    }
    cout << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 2\n1 2 3 4\nquery 3\nquery 1", expectedOutput: "10 3" },
      { input: "3 2\n5 3 7\nquery 2\nquery 0", expectedOutput: "15 5" },
      { input: "4 3\n1 1 1 1\nquery 3\nupdate 2 5\nquery 3", expectedOutput: "4 9" }
    ],
    hiddenTestCases: [
      { input: "1 1\n5\nquery 0", expectedOutput: "5" },
      { input: "3 3\n1 2 3\nquery 0\nquery 1\nquery 2", expectedOutput: "1 3 6" },
      { input: "4 2\n0 0 0 0\nquery 3\nquery 0", expectedOutput: "0 0" },
      { input: "5 2\n1 0 1 0 1\nquery 4\nquery 2", expectedOutput: "3 2" },
      { input: "3 3\n10 20 30\nquery 0\nquery 1\nquery 2", expectedOutput: "10 30 60" }
    ]
  },
  {
    id: "cpp-n-queens",
    slug: "cpp-n-queens",
    title: "Backtracking – N Queens",
    category: "C++ Track",
    difficulty: "hard",
    description: `Solve the N-Queens puzzle using backtracking.

**Example:** For n = 4, find all valid placements.`,
    inputFormat: "An integer n",
    outputFormat: "Number of solutions",
    constraints: "1 <= n <= 9",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int solveNQueens(int n) {
    // Your code here
    return 0;
}

int main() {
    int n;
    cin >> n;
    cout << solveNQueens(n) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
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
    id: "cpp-min-window-substring",
    slug: "cpp-min-window-substring",
    title: "Minimum Window Substring",
    category: "C++ Track",
    difficulty: "hard",
    description: `Find the minimum window in s that contains all characters of t.

**Example:** Given s = "ADOBECODEBANC", t = "ABC", return "BANC".`,
    inputFormat: "Two strings s and t",
    outputFormat: "Minimum window substring or empty",
    constraints: "1 <= s.length, t.length <= 10^5",
    starterCode: `#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

string minWindow(string s, string t) {
    // Your code here
    return "";
}

int main() {
    string s, t;
    cin >> s >> t;
    string result = minWindow(s, t);
    cout << (result.empty() ? "empty" : result) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "ADOBECODEBANC\nABC", expectedOutput: "BANC" },
      { input: "a\na", expectedOutput: "a" },
      { input: "a\naa", expectedOutput: "empty" }
    ],
    hiddenTestCases: [
      { input: "ab\nb", expectedOutput: "b" },
      { input: "abc\nabc", expectedOutput: "abc" },
      { input: "aa\naa", expectedOutput: "aa" },
      { input: "ab\na", expectedOutput: "a" },
      { input: "cabwefgewcwaefgcf\ncae", expectedOutput: "cwae" }
    ]
  },
  {
    id: "cpp-allocate-pages",
    slug: "cpp-allocate-pages",
    title: "Allocate Minimum Pages (Binary Search)",
    category: "C++ Track",
    difficulty: "hard",
    description: `Allocate books to students to minimize maximum pages.

**Example:** Given pages = [12, 34, 67, 90], students = 2, return 113.`,
    inputFormat: "Array of pages and number of students",
    outputFormat: "Minimum of maximum pages",
    constraints: "1 <= n <= 10^5, 1 <= students <= n",
    starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int allocateBooks(vector<int>& pages, int students) {
    // Your code here
    return 0;
}

int main() {
    int n, students;
    cin >> n;
    vector<int> pages(n);
    for (int i = 0; i < n; i++) cin >> pages[i];
    cin >> students;
    cout << allocateBooks(pages, students) << endl;
    return 0;
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n12 34 67 90\n2", expectedOutput: "113" },
      { input: "3\n10 20 30\n2", expectedOutput: "30" },
      { input: "4\n10 20 30 40\n4", expectedOutput: "40" }
    ],
    hiddenTestCases: [
      { input: "1\n100\n1", expectedOutput: "100" },
      { input: "5\n10 10 10 10 10\n5", expectedOutput: "10" },
      { input: "5\n10 10 10 10 10\n1", expectedOutput: "50" },
      { input: "3\n5 10 15\n3", expectedOutput: "15" },
      { input: "4\n25 25 25 25\n2", expectedOutput: "50" }
    ]
  }
];

export const CPP_TRACK_TOTAL = cppProblemsData.length;
