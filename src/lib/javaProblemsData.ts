// Java Learning Track - 30 questions from beginner to advanced
import { ProblemData } from './problemsData';

export const javaProblemsData: ProblemData[] = [
  // 🟢 Beginner Level (1-10)
  {
    id: "java-hello-world",
    slug: "java-hello-world",
    title: "Hello World Program",
    category: "Java Track",
    difficulty: "easy",
    description: `Print "Hello World" to the console.

**Example:** The output should be exactly: Hello World`,
    inputFormat: "public static String helloWorld()",
    outputFormat: "Return 'Hello World'",
    constraints: "No input required",
    starterCode: `public class Solution {
    public static String helloWorld() {
        // Your code here
        return "";
    }
    
    public static void main(String[] args) {
        System.out.println(helloWorld());
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [{ input: "", expectedOutput: "Hello World" }],
    hiddenTestCases: [{ input: "", expectedOutput: "Hello World" }, { input: "", expectedOutput: "Hello World" }]
  },
  {
    id: "java-basic-calculator",
    slug: "java-basic-calculator",
    title: "Basic Calculator",
    category: "Java Track",
    difficulty: "easy",
    description: `Create a basic calculator that performs addition, subtraction, multiplication, and division.

**Example:** Given a = 10, b = 5, op = "+", return 15.`,
    inputFormat: "public static int calculate(int a, int b, String op)",
    outputFormat: "Return the result of the operation",
    constraints: "-10^9 <= a, b <= 10^9",
    starterCode: `import java.util.Scanner;

public class Solution {
    public static int calculate(int a, int b, String op) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        String op = sc.next();
        System.out.println(calculate(a, b, op));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "10 5 +", expectedOutput: "15" },
      { input: "10 5 -", expectedOutput: "5" },
      { input: "10 5 *", expectedOutput: "50" }
    ],
    hiddenTestCases: [
      { input: "10 5 /", expectedOutput: "2" },
      { input: "0 5 +", expectedOutput: "5" },
      { input: "-10 -5 +", expectedOutput: "-15" },
      { input: "100 10 /", expectedOutput: "10" },
      { input: "7 3 *", expectedOutput: "21" }
    ]
  },
  {
    id: "java-reverse-integer",
    slug: "java-reverse-integer",
    title: "Reverse an Integer",
    category: "Java Track",
    difficulty: "easy",
    description: `Reverse the digits of an integer.

**Example:** Given n = 123, return 321.`,
    inputFormat: "public static int reverse(int n)",
    outputFormat: "Return the reversed integer",
    constraints: "-10^9 <= n <= 10^9",
    starterCode: `import java.util.Scanner;

public class Solution {
    public static int reverse(int n) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(reverse(sc.nextInt()));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "123", expectedOutput: "321" },
      { input: "-123", expectedOutput: "-321" },
      { input: "120", expectedOutput: "21" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" },
      { input: "100", expectedOutput: "1" },
      { input: "-100", expectedOutput: "-1" },
      { input: "12345", expectedOutput: "54321" }
    ]
  },
  {
    id: "java-swap-numbers",
    slug: "java-swap-numbers",
    title: "Swap Two Numbers",
    category: "Java Track",
    difficulty: "easy",
    description: `Swap two numbers without using a temporary variable.

**Example:** Given a = 5, b = 10, return "10 5".`,
    inputFormat: "public static String swap(int a, int b)",
    outputFormat: "Return swapped values as 'b a'",
    constraints: "-10^9 <= a, b <= 10^9",
    starterCode: `import java.util.Scanner;

public class Solution {
    public static String swap(int a, int b) {
        // Your code here - don't use temp variable
        return "";
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(swap(sc.nextInt(), sc.nextInt()));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 10", expectedOutput: "10 5" },
      { input: "1 2", expectedOutput: "2 1" },
      { input: "-5 5", expectedOutput: "5 -5" }
    ],
    hiddenTestCases: [
      { input: "0 0", expectedOutput: "0 0" },
      { input: "100 200", expectedOutput: "200 100" },
      { input: "-1 -2", expectedOutput: "-2 -1" },
      { input: "999 1", expectedOutput: "1 999" },
      { input: "0 1", expectedOutput: "1 0" }
    ]
  },
  {
    id: "java-count-digits",
    slug: "java-count-digits",
    title: "Count Digits in Number",
    category: "Java Track",
    difficulty: "easy",
    description: `Count the number of digits in an integer.

**Example:** Given n = 12345, return 5.`,
    inputFormat: "public static int countDigits(int n)",
    outputFormat: "Return count of digits",
    constraints: "-10^9 <= n <= 10^9",
    starterCode: `import java.util.Scanner;

public class Solution {
    public static int countDigits(int n) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(countDigits(sc.nextInt()));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "12345", expectedOutput: "5" },
      { input: "0", expectedOutput: "1" },
      { input: "-123", expectedOutput: "3" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "1" },
      { input: "10", expectedOutput: "2" },
      { input: "1000000000", expectedOutput: "10" },
      { input: "-1000000000", expectedOutput: "10" },
      { input: "99", expectedOutput: "2" }
    ]
  },
  {
    id: "java-fibonacci",
    slug: "java-fibonacci",
    title: "Fibonacci Series",
    category: "Java Track",
    difficulty: "easy",
    description: `Generate Fibonacci series up to N terms.

**Example:** Given n = 7, return "0 1 1 2 3 5 8".`,
    inputFormat: "public static String fibonacci(int n)",
    outputFormat: "Return space-separated Fibonacci numbers",
    constraints: "1 <= n <= 30",
    starterCode: `import java.util.Scanner;

public class Solution {
    public static String fibonacci(int n) {
        // Your code here
        return "";
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(fibonacci(sc.nextInt()));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "7", expectedOutput: "0 1 1 2 3 5 8" },
      { input: "1", expectedOutput: "0" },
      { input: "5", expectedOutput: "0 1 1 2 3" }
    ],
    hiddenTestCases: [
      { input: "2", expectedOutput: "0 1" },
      { input: "10", expectedOutput: "0 1 1 2 3 5 8 13 21 34" },
      { input: "3", expectedOutput: "0 1 1" },
      { input: "8", expectedOutput: "0 1 1 2 3 5 8 13" },
      { input: "15", expectedOutput: "0 1 1 2 3 5 8 13 21 34 55 89 144 233 377" }
    ]
  },
  {
    id: "java-prime-check",
    slug: "java-prime-check",
    title: "Check Prime Number",
    category: "Java Track",
    difficulty: "easy",
    description: `Check if a number is prime.

**Example:** Given n = 7, return true.`,
    inputFormat: "public static boolean isPrime(int n)",
    outputFormat: "Return true if prime, false otherwise",
    constraints: "1 <= n <= 10^9",
    starterCode: `import java.util.Scanner;

public class Solution {
    public static boolean isPrime(int n) {
        // Your code here
        return false;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(isPrime(sc.nextInt()));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "7", expectedOutput: "true" },
      { input: "4", expectedOutput: "false" },
      { input: "2", expectedOutput: "true" }
    ],
    hiddenTestCases: [
      { input: "1", expectedOutput: "false" },
      { input: "17", expectedOutput: "true" },
      { input: "100", expectedOutput: "false" },
      { input: "97", expectedOutput: "true" },
      { input: "1000000007", expectedOutput: "true" }
    ]
  },
  {
    id: "java-array-sum",
    slug: "java-array-sum",
    title: "Sum of Array Elements",
    category: "Java Track",
    difficulty: "easy",
    description: `Calculate sum of all elements in an array.

**Example:** Given arr = [1, 2, 3, 4, 5], return 15.`,
    inputFormat: "public static int arraySum(int[] arr)",
    outputFormat: "Return sum of all elements",
    constraints: "1 <= arr.length <= 10^5",
    starterCode: `import java.util.Scanner;

public class Solution {
    public static int arraySum(int[] arr) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i]);
        }
        System.out.println(arraySum(arr));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5", expectedOutput: "15" },
      { input: "10 20 30", expectedOutput: "60" },
      { input: "-1 1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "0", expectedOutput: "0" },
      { input: "100", expectedOutput: "100" },
      { input: "-5 -10 -15", expectedOutput: "-30" },
      { input: "1 1 1 1 1", expectedOutput: "5" },
      { input: "1000 2000 3000", expectedOutput: "6000" }
    ]
  },
  {
    id: "java-second-largest",
    slug: "java-second-largest",
    title: "Find Second Largest Number",
    category: "Java Track",
    difficulty: "easy",
    description: `Find the second largest number in an array.

**Example:** Given arr = [5, 3, 8, 1, 9], return 8.`,
    inputFormat: "public static int secondLargest(int[] arr)",
    outputFormat: "Return second largest number",
    constraints: "2 <= arr.length <= 10^5",
    starterCode: `import java.util.Scanner;

public class Solution {
    public static int secondLargest(int[] arr) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int[] arr = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            arr[i] = Integer.parseInt(parts[i]);
        }
        System.out.println(secondLargest(arr));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5 3 8 1 9", expectedOutput: "8" },
      { input: "1 2", expectedOutput: "1" },
      { input: "10 10 9", expectedOutput: "9" }
    ],
    hiddenTestCases: [
      { input: "100 99 98", expectedOutput: "99" },
      { input: "-1 -2 -3", expectedOutput: "-2" },
      { input: "5 5 5 4", expectedOutput: "4" },
      { input: "1 2 3 4 5", expectedOutput: "4" },
      { input: "0 1", expectedOutput: "0" }
    ]
  },
  {
    id: "java-char-frequency",
    slug: "java-char-frequency",
    title: "Character Frequency Count",
    category: "Java Track",
    difficulty: "easy",
    description: `Count frequency of each character in a string.

**Example:** Given s = "hello", output each character with its count.`,
    inputFormat: "public static String charFrequency(String s)",
    outputFormat: "Return sorted frequency as 'char:count' per line",
    constraints: "1 <= s.length <= 10^5",
    starterCode: `import java.util.*;

public class Solution {
    public static String charFrequency(String s) {
        // Your code here
        return "";
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(charFrequency(sc.nextLine()));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hello", expectedOutput: "e:1\nh:1\nl:2\no:1" },
      { input: "aaa", expectedOutput: "a:3" },
      { input: "abc", expectedOutput: "a:1\nb:1\nc:1" }
    ],
    hiddenTestCases: [
      { input: "abba", expectedOutput: "a:2\nb:2" },
      { input: "programming", expectedOutput: "a:1\ng:2\ni:1\nm:2\nn:1\no:1\np:1\nr:2" },
      { input: "zzz", expectedOutput: "z:3" },
      { input: "a", expectedOutput: "a:1" },
      { input: "mississippi", expectedOutput: "i:4\nm:1\np:2\ns:4" }
    ]
  },

  // 🟡 Intermediate Level (11-20)
  {
    id: "java-two-sum",
    slug: "java-two-sum",
    title: "Two Sum",
    category: "Java Track",
    difficulty: "medium",
    description: `Find two numbers that add up to target.

**Example:** Given nums = [2, 7, 11, 15], target = 9, return [0, 1].`,
    inputFormat: "public static int[] twoSum(int[] nums, int target)",
    outputFormat: "Return indices of two numbers",
    constraints: "2 <= nums.length <= 10^4",
    starterCode: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i]);
        }
        int target = sc.nextInt();
        int[] result = twoSum(nums, target);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
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
    id: "java-valid-parentheses",
    slug: "java-valid-parentheses",
    title: "Valid Parentheses (Stack)",
    category: "Java Track",
    difficulty: "medium",
    description: `Check if parentheses are balanced using a stack.

**Example:** Given s = "()[]{}", return true.`,
    inputFormat: "public static boolean isValid(String s)",
    outputFormat: "Return true if valid, false otherwise",
    constraints: "1 <= s.length <= 10^4",
    starterCode: `import java.util.*;

public class Solution {
    public static boolean isValid(String s) {
        // Your code here
        return false;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(isValid(sc.nextLine()));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" },
      { input: "([)]", expectedOutput: "false" }
    ],
    hiddenTestCases: [
      { input: "()", expectedOutput: "true" },
      { input: "{[]}", expectedOutput: "true" },
      { input: "((()))", expectedOutput: "true" },
      { input: "(", expectedOutput: "false" },
      { input: ")(", expectedOutput: "false" }
    ]
  },
  {
    id: "java-queue-using-stacks",
    slug: "java-queue-using-stacks",
    title: "Implement Queue using Stacks",
    category: "Java Track",
    difficulty: "medium",
    description: `Implement a queue using two stacks.

**Example:** push(1), push(2), pop() returns 1, peek() returns 2.`,
    inputFormat: "class MyQueue with push, pop, peek, empty methods",
    outputFormat: "Return results of operations",
    constraints: "1 <= operations <= 100",
    starterCode: `import java.util.*;

class MyQueue {
    // Your code here
    
    public void push(int x) {
        // Your code here
    }
    
    public int pop() {
        // Your code here
        return 0;
    }
    
    public int peek() {
        // Your code here
        return 0;
    }
    
    public boolean empty() {
        // Your code here
        return true;
    }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        MyQueue queue = new MyQueue();
        int n = sc.nextInt();
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String op = sc.next();
            if (op.equals("push")) {
                queue.push(sc.nextInt());
            } else if (op.equals("pop")) {
                result.append(queue.pop()).append(" ");
            } else if (op.equals("peek")) {
                result.append(queue.peek()).append(" ");
            }
        }
        System.out.println(result.toString().trim());
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\npush 1\npush 2\npop\npeek", expectedOutput: "1 2" },
      { input: "3\npush 1\npop\npush 2", expectedOutput: "1" },
      { input: "5\npush 1\npush 2\npush 3\npop\npop", expectedOutput: "1 2" }
    ],
    hiddenTestCases: [
      { input: "2\npush 5\npeek", expectedOutput: "5" },
      { input: "4\npush 1\npush 2\npop\npop", expectedOutput: "1 2" },
      { input: "3\npush 10\npeek\npop", expectedOutput: "10 10" },
      { input: "6\npush 1\npush 2\npush 3\npop\npop\npop", expectedOutput: "1 2 3" },
      { input: "2\npush 100\npop", expectedOutput: "100" }
    ]
  },
  {
    id: "java-binary-search",
    slug: "java-binary-search",
    title: "Binary Search",
    category: "Java Track",
    difficulty: "medium",
    description: `Implement binary search to find target in sorted array.

**Example:** Given nums = [1, 2, 3, 4, 5], target = 3, return 2.`,
    inputFormat: "public static int binarySearch(int[] nums, int target)",
    outputFormat: "Return index of target or -1",
    constraints: "1 <= nums.length <= 10^4",
    starterCode: `import java.util.*;

public class Solution {
    public static int binarySearch(int[] nums, int target) {
        // Your code here
        return -1;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i]);
        }
        int target = sc.nextInt();
        System.out.println(binarySearch(nums, target));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 4 5\n3", expectedOutput: "2" },
      { input: "1 2 3 4 5\n6", expectedOutput: "-1" },
      { input: "1\n1", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "1 2 3 4 5\n1", expectedOutput: "0" },
      { input: "1 2 3 4 5\n5", expectedOutput: "4" },
      { input: "10 20 30 40 50\n30", expectedOutput: "2" },
      { input: "-5 -3 -1 0 2\n-3", expectedOutput: "1" },
      { input: "1 3 5 7 9\n8", expectedOutput: "-1" }
    ]
  },
  {
    id: "java-linked-list-cycle",
    slug: "java-linked-list-cycle",
    title: "Linked List Cycle Detection",
    category: "Java Track",
    difficulty: "medium",
    description: `Detect if a linked list has a cycle using Floyd's algorithm.

**Example:** Given a list with cycle, return true.`,
    inputFormat: "public static boolean hasCycle(ListNode head)",
    outputFormat: "Return true if cycle exists",
    constraints: "0 <= nodes <= 10^4",
    starterCode: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class Solution {
    public static boolean hasCycle(ListNode head) {
        // Your code here - use Floyd's algorithm
        return false;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int cyclePos = sc.nextInt();
        
        if (parts[0].equals("empty")) {
            System.out.println(hasCycle(null));
            return;
        }
        
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        ListNode cycleNode = null;
        
        for (int i = 0; i < parts.length; i++) {
            curr.next = new ListNode(Integer.parseInt(parts[i]));
            curr = curr.next;
            if (i == cyclePos) cycleNode = curr;
        }
        if (cyclePos >= 0) curr.next = cycleNode;
        
        System.out.println(hasCycle(dummy.next));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 2 0 -4\n1", expectedOutput: "true" },
      { input: "1 2\n0", expectedOutput: "true" },
      { input: "1\n-1", expectedOutput: "false" }
    ],
    hiddenTestCases: [
      { input: "empty\n-1", expectedOutput: "false" },
      { input: "1 2 3 4 5\n-1", expectedOutput: "false" },
      { input: "1 2 3 4 5\n0", expectedOutput: "true" },
      { input: "1\n0", expectedOutput: "true" },
      { input: "1 2 3\n2", expectedOutput: "true" }
    ]
  },
  {
    id: "java-remove-duplicates-linked-list",
    slug: "java-remove-duplicates-linked-list",
    title: "Remove Duplicates from Linked List",
    category: "Java Track",
    difficulty: "medium",
    description: `Remove duplicates from a sorted linked list.

**Example:** Given 1->1->2->3->3, return 1->2->3.`,
    inputFormat: "public static ListNode deleteDuplicates(ListNode head)",
    outputFormat: "Return head of deduplicated list",
    constraints: "0 <= nodes <= 300",
    starterCode: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class Solution {
    public static ListNode deleteDuplicates(ListNode head) {
        // Your code here
        return null;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        
        if (parts[0].equals("empty")) {
            System.out.println("empty");
            return;
        }
        
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String p : parts) {
            curr.next = new ListNode(Integer.parseInt(p));
            curr = curr.next;
        }
        
        ListNode result = deleteDuplicates(dummy.next);
        StringBuilder sb = new StringBuilder();
        while (result != null) {
            sb.append(result.val).append(" ");
            result = result.next;
        }
        System.out.println(sb.toString().trim());
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 1 2", expectedOutput: "1 2" },
      { input: "1 1 2 3 3", expectedOutput: "1 2 3" },
      { input: "1 1 1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "empty", expectedOutput: "empty" },
      { input: "1", expectedOutput: "1" },
      { input: "1 2 3", expectedOutput: "1 2 3" },
      { input: "0 0 0 0 0", expectedOutput: "0" },
      { input: "1 2 2 3 3 3", expectedOutput: "1 2 3" }
    ]
  },
  {
    id: "java-level-order-traversal",
    slug: "java-level-order-traversal",
    title: "Level Order Traversal (Tree)",
    category: "Java Track",
    difficulty: "medium",
    description: `Perform level order traversal of a binary tree.

**Example:** Given tree [3,9,20,null,null,15,7], return [[3],[9,20],[15,7]].`,
    inputFormat: "public static List<List<Integer>> levelOrder(TreeNode root)",
    outputFormat: "Return list of levels",
    constraints: "0 <= nodes <= 2000",
    starterCode: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Solution {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        // Your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        
        if (parts[0].equals("null")) {
            System.out.println("[]");
            return;
        }
        
        TreeNode root = new TreeNode(Integer.parseInt(parts[0]));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        
        while (!queue.isEmpty() && i < parts.length) {
            TreeNode node = queue.poll();
            if (i < parts.length && !parts[i].equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[i]));
                queue.offer(node.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[i]));
                queue.offer(node.right);
            }
            i++;
        }
        
        List<List<Integer>> result = levelOrder(root);
        System.out.println(result.toString().replace(", ", ","));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "[[3],[9,20],[15,7]]" },
      { input: "1", expectedOutput: "[[1]]" },
      { input: "null", expectedOutput: "[]" }
    ],
    hiddenTestCases: [
      { input: "1 2 3", expectedOutput: "[[1],[2,3]]" },
      { input: "1 2 null 3", expectedOutput: "[[1],[2],[3]]" },
      { input: "1 null 2 null 3", expectedOutput: "[[1],[2],[3]]" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "[[1],[2,3],[4,5,6,7]]" },
      { input: "5 4 8 11 null 13 4", expectedOutput: "[[5],[4,8],[11,13,4]]" }
    ]
  },
  {
    id: "java-longest-palindrome",
    slug: "java-longest-palindrome",
    title: "Longest Palindrome Substring",
    category: "Java Track",
    difficulty: "medium",
    description: `Find the longest palindromic substring.

**Example:** Given s = "babad", return "bab" or "aba".`,
    inputFormat: "public static String longestPalindrome(String s)",
    outputFormat: "Return longest palindrome substring",
    constraints: "1 <= s.length <= 1000",
    starterCode: `import java.util.*;

public class Solution {
    public static String longestPalindrome(String s) {
        // Your code here
        return "";
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(longestPalindrome(sc.nextLine()));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "babad", expectedOutput: "bab" },
      { input: "cbbd", expectedOutput: "bb" },
      { input: "a", expectedOutput: "a" }
    ],
    hiddenTestCases: [
      { input: "aa", expectedOutput: "aa" },
      { input: "ab", expectedOutput: "a" },
      { input: "racecar", expectedOutput: "racecar" },
      { input: "abcba", expectedOutput: "abcba" },
      { input: "abcd", expectedOutput: "a" }
    ]
  },
  {
    id: "java-next-greater-element",
    slug: "java-next-greater-element",
    title: "Next Greater Element",
    category: "Java Track",
    difficulty: "medium",
    description: `Find the next greater element for each element in the array.

**Example:** Given nums = [4, 1, 2], return [5, 2, -1] based on [1, 3, 4, 2].`,
    inputFormat: "public static int[] nextGreaterElement(int[] nums1, int[] nums2)",
    outputFormat: "Return array of next greater elements",
    constraints: "1 <= nums1.length <= nums2.length <= 1000",
    starterCode: `import java.util.*;

public class Solution {
    public static int[] nextGreaterElement(int[] nums1, int[] nums2) {
        // Your code here
        return new int[0];
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts1 = sc.nextLine().split(" ");
        String[] parts2 = sc.nextLine().split(" ");
        
        int[] nums1 = new int[parts1.length];
        int[] nums2 = new int[parts2.length];
        
        for (int i = 0; i < parts1.length; i++) nums1[i] = Integer.parseInt(parts1[i]);
        for (int i = 0; i < parts2.length; i++) nums2[i] = Integer.parseInt(parts2[i]);
        
        int[] result = nextGreaterElement(nums1, nums2);
        StringBuilder sb = new StringBuilder();
        for (int n : result) sb.append(n).append(" ");
        System.out.println(sb.toString().trim());
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 1 2\n1 3 4 2", expectedOutput: "-1 3 -1" },
      { input: "2 4\n1 2 3 4", expectedOutput: "3 -1" },
      { input: "1 3 5\n6 5 4 3 2 1", expectedOutput: "-1 -1 -1" }
    ],
    hiddenTestCases: [
      { input: "1\n1", expectedOutput: "-1" },
      { input: "1 2\n1 2", expectedOutput: "2 -1" },
      { input: "3\n1 2 3 4 5", expectedOutput: "4" },
      { input: "5 4 3\n1 2 3 4 5", expectedOutput: "-1 5 4" },
      { input: "2\n2 1", expectedOutput: "-1" }
    ]
  },
  {
    id: "java-missing-number",
    slug: "java-missing-number",
    title: "Find Missing Number",
    category: "Java Track",
    difficulty: "medium",
    description: `Find the missing number in an array containing n distinct numbers from 0 to n.

**Example:** Given nums = [3, 0, 1], return 2.`,
    inputFormat: "public static int missingNumber(int[] nums)",
    outputFormat: "Return the missing number",
    constraints: "1 <= nums.length <= 10^4",
    starterCode: `import java.util.*;

public class Solution {
    public static int missingNumber(int[] nums) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i]);
        }
        System.out.println(missingNumber(nums));
    }
}`,
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
      { input: "0 1 2 3 4 5 7", expectedOutput: "6" },
      { input: "1 2 3", expectedOutput: "0" },
      { input: "0 1 2", expectedOutput: "3" }
    ]
  },

  // 🔴 Advanced Level (21-30)
  {
    id: "java-kth-largest",
    slug: "java-kth-largest",
    title: "Kth Largest Element (Heap)",
    category: "Java Track",
    difficulty: "hard",
    description: `Find the kth largest element using a heap.

**Example:** Given nums = [3,2,1,5,6,4], k = 2, return 5.`,
    inputFormat: "public static int findKthLargest(int[] nums, int k)",
    outputFormat: "Return kth largest element",
    constraints: "1 <= k <= nums.length <= 10^5",
    starterCode: `import java.util.*;

public class Solution {
    public static int findKthLargest(int[] nums, int k) {
        // Your code here - use heap
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i]);
        }
        int k = sc.nextInt();
        System.out.println(findKthLargest(nums, k));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "3 2 1 5 6 4\n2", expectedOutput: "5" },
      { input: "3 2 3 1 2 4 5 5 6\n4", expectedOutput: "4" },
      { input: "1\n1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "7 6 5 4 3 2 1\n5", expectedOutput: "3" },
      { input: "1 2 3 4 5\n1", expectedOutput: "5" },
      { input: "5 5 5 5 5\n3", expectedOutput: "5" },
      { input: "-1 -2 -3 -4\n2", expectedOutput: "-2" },
      { input: "1 2\n2", expectedOutput: "1" }
    ]
  },
  {
    id: "java-serialize-tree",
    slug: "java-serialize-tree",
    title: "Serialize & Deserialize Binary Tree",
    category: "Java Track",
    difficulty: "hard",
    description: `Design an algorithm to serialize and deserialize a binary tree.

**Example:** Serialize tree to string and back to tree.`,
    inputFormat: "String serialize(TreeNode root), TreeNode deserialize(String data)",
    outputFormat: "Verify serialization/deserialization works correctly",
    constraints: "0 <= nodes <= 10^4",
    starterCode: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Solution {
    public static String serialize(TreeNode root) {
        // Your code here
        return "";
    }
    
    public static TreeNode deserialize(String data) {
        // Your code here
        return null;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().split(" ");
        
        if (parts[0].equals("null")) {
            System.out.println("null");
            return;
        }
        
        TreeNode root = new TreeNode(Integer.parseInt(parts[0]));
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int i = 1;
        
        while (!queue.isEmpty() && i < parts.length) {
            TreeNode node = queue.poll();
            if (i < parts.length && !parts[i].equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[i]));
                queue.offer(node.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[i]));
                queue.offer(node.right);
            }
            i++;
        }
        
        String serialized = serialize(root);
        TreeNode result = deserialize(serialized);
        System.out.println(serialize(result));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "1 2 3 null null 4 5", expectedOutput: "1,2,3,null,null,4,5" },
      { input: "null", expectedOutput: "null" },
      { input: "1", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1 2", expectedOutput: "1,2" },
      { input: "1 null 2", expectedOutput: "1,null,2" },
      { input: "1 2 3", expectedOutput: "1,2,3" },
      { input: "5 4 6 3 null null 7", expectedOutput: "5,4,6,3,null,null,7" },
      { input: "1 2 3 4 5 6 7", expectedOutput: "1,2,3,4,5,6,7" }
    ]
  },
  {
    id: "java-word-ladder-ii",
    slug: "java-word-ladder-ii",
    title: "Word Ladder II",
    category: "Java Track",
    difficulty: "hard",
    description: `Find all shortest transformation sequences from beginWord to endWord.

**Example:** beginWord = "hit", endWord = "cog", return all shortest paths.`,
    inputFormat: "List<List<String>> findLadders(String begin, String end, List<String> wordList)",
    outputFormat: "Return all shortest transformation sequences",
    constraints: "1 <= wordList.length <= 1000",
    starterCode: `import java.util.*;

public class Solution {
    public static List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        // Your code here
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String beginWord = sc.nextLine();
        String endWord = sc.nextLine();
        List<String> wordList = Arrays.asList(sc.nextLine().split(" "));
        
        List<List<String>> result = findLadders(beginWord, endWord, wordList);
        if (result.isEmpty()) {
            System.out.println("[]");
        } else {
            System.out.println(result.size());
        }
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "hit\ncog\nhot dot dog lot log cog", expectedOutput: "2" },
      { input: "hit\ncog\nhot dot dog lot log", expectedOutput: "[]" },
      { input: "a\nc\na b c", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "red\ntax\nted tex red tax tad", expectedOutput: "2" },
      { input: "abc\nabc\nabc", expectedOutput: "1" },
      { input: "hot\ndog\nhot dog", expectedOutput: "[]" },
      { input: "a\nb\na b", expectedOutput: "1" },
      { input: "qa\nsq\nsi go se qm qu ma mi su qi sq", expectedOutput: "[]" }
    ]
  },
  {
    id: "java-topological-sort",
    slug: "java-topological-sort",
    title: "Topological Sort (Graph)",
    category: "Java Track",
    difficulty: "hard",
    description: `Perform topological sort on a directed acyclic graph.

**Example:** Given n = 4, edges = [[1,0],[2,0],[3,1],[3,2]], return [0,1,2,3] or [0,2,1,3].`,
    inputFormat: "public static int[] topologicalSort(int n, int[][] edges)",
    outputFormat: "Return nodes in topological order or empty if cycle exists",
    constraints: "1 <= n <= 2000",
    starterCode: `import java.util.*;

public class Solution {
    public static int[] topologicalSort(int n, int[][] edges) {
        // Your code here
        return new int[0];
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        sc.nextLine();
        
        int[][] edges = new int[m][2];
        for (int i = 0; i < m; i++) {
            String[] parts = sc.nextLine().split(" ");
            edges[i][0] = Integer.parseInt(parts[0]);
            edges[i][1] = Integer.parseInt(parts[1]);
        }
        
        int[] result = topologicalSort(n, edges);
        if (result.length == 0) {
            System.out.println("cycle");
        } else {
            StringBuilder sb = new StringBuilder();
            for (int r : result) sb.append(r).append(" ");
            System.out.println(sb.toString().trim());
        }
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4 4\n1 0\n2 0\n3 1\n3 2", expectedOutput: "0 1 2 3" },
      { input: "2 1\n1 0", expectedOutput: "0 1" },
      { input: "2 2\n0 1\n1 0", expectedOutput: "cycle" }
    ],
    hiddenTestCases: [
      { input: "1 0", expectedOutput: "0" },
      { input: "3 2\n1 0\n2 1", expectedOutput: "0 1 2" },
      { input: "3 3\n0 1\n1 2\n2 0", expectedOutput: "cycle" },
      { input: "4 3\n0 1\n0 2\n0 3", expectedOutput: "1 2 3 0" },
      { input: "2 0", expectedOutput: "0 1" }
    ]
  },
  {
    id: "java-dijkstra",
    slug: "java-dijkstra",
    title: "Dijkstra's Algorithm",
    category: "Java Track",
    difficulty: "hard",
    description: `Implement Dijkstra's algorithm to find shortest path.

**Example:** Find shortest distances from source to all nodes.`,
    inputFormat: "public static int[] dijkstra(int n, int[][] edges, int src)",
    outputFormat: "Return array of shortest distances",
    constraints: "1 <= n <= 1000",
    starterCode: `import java.util.*;

public class Solution {
    public static int[] dijkstra(int n, int[][] edges, int src) {
        // Your code here
        return new int[0];
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int src = sc.nextInt();
        sc.nextLine();
        
        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            String[] parts = sc.nextLine().split(" ");
            edges[i][0] = Integer.parseInt(parts[0]);
            edges[i][1] = Integer.parseInt(parts[1]);
            edges[i][2] = Integer.parseInt(parts[2]);
        }
        
        int[] result = dijkstra(n, edges, src);
        StringBuilder sb = new StringBuilder();
        for (int r : result) sb.append(r).append(" ");
        System.out.println(sb.toString().trim());
    }
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
    id: "java-singleton",
    slug: "java-singleton",
    title: "Thread-safe Singleton",
    category: "Java Track",
    difficulty: "hard",
    description: `Implement a thread-safe singleton pattern.

**Example:** Multiple getInstance() calls return same instance.`,
    inputFormat: "class Singleton with getInstance() method",
    outputFormat: "Verify singleton behavior",
    constraints: "Multiple threads may call getInstance()",
    starterCode: `public class Singleton {
    // Your code here - implement thread-safe singleton
    
    public static Singleton getInstance() {
        // Your code here
        return null;
    }
    
    public int getValue() {
        return hashCode();
    }
}

class Solution {
    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();
        System.out.println(s1 == s2);
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "", expectedOutput: "true" }
    ],
    hiddenTestCases: [
      { input: "", expectedOutput: "true" },
      { input: "", expectedOutput: "true" },
      { input: "", expectedOutput: "true" },
      { input: "", expectedOutput: "true" },
      { input: "", expectedOutput: "true" }
    ]
  },
  {
    id: "java-producer-consumer",
    slug: "java-producer-consumer",
    title: "Producer–Consumer Problem",
    category: "Java Track",
    difficulty: "hard",
    description: `Implement the producer-consumer pattern with blocking queue.

**Example:** Producer adds items, consumer removes them thread-safely.`,
    inputFormat: "class BlockingQueue with put() and take() methods",
    outputFormat: "Verify thread-safe operations",
    constraints: "1 <= capacity <= 100",
    starterCode: `import java.util.concurrent.*;

class BlockingQueue<T> {
    // Your code here
    
    public BlockingQueue(int capacity) {
        // Your code here
    }
    
    public void put(T item) throws InterruptedException {
        // Your code here
    }
    
    public T take() throws InterruptedException {
        // Your code here
        return null;
    }
}

public class Solution {
    public static void main(String[] args) throws Exception {
        BlockingQueue<Integer> queue = new BlockingQueue<>(2);
        queue.put(1);
        queue.put(2);
        System.out.println(queue.take() + " " + queue.take());
    }
}`,
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
    id: "java-min-cost-connect-points",
    slug: "java-min-cost-connect-points",
    title: "Min Cost to Connect Points",
    category: "Java Track",
    difficulty: "hard",
    description: `Find minimum cost to connect all points using Manhattan distance.

**Example:** Given points = [[0,0],[2,2],[3,10],[5,2],[7,0]], return 20.`,
    inputFormat: "public static int minCostConnectPoints(int[][] points)",
    outputFormat: "Return minimum cost",
    constraints: "1 <= points.length <= 1000",
    starterCode: `import java.util.*;

public class Solution {
    public static int minCostConnectPoints(int[][] points) {
        // Your code here - use Prim's or Kruskal's
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();
        
        int[][] points = new int[n][2];
        for (int i = 0; i < n; i++) {
            String[] parts = sc.nextLine().split(" ");
            points[i][0] = Integer.parseInt(parts[0]);
            points[i][1] = Integer.parseInt(parts[1]);
        }
        
        System.out.println(minCostConnectPoints(points));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\n0 0\n2 2\n3 10\n5 2\n7 0", expectedOutput: "20" },
      { input: "3\n0 0\n1 1\n1 0", expectedOutput: "2" },
      { input: "1\n0 0", expectedOutput: "0" }
    ],
    hiddenTestCases: [
      { input: "2\n0 0\n1 1", expectedOutput: "2" },
      { input: "4\n0 0\n1 0\n2 0\n3 0", expectedOutput: "3" },
      { input: "3\n0 0\n0 1\n0 2", expectedOutput: "2" },
      { input: "4\n0 0\n0 1\n1 0\n1 1", expectedOutput: "3" },
      { input: "2\n-5 -5\n5 5", expectedOutput: "20" }
    ]
  },
  {
    id: "java-median-stream",
    slug: "java-median-stream",
    title: "Median of Data Stream",
    category: "Java Track",
    difficulty: "hard",
    description: `Design a data structure to find median from a data stream.

**Example:** addNum(1), addNum(2), findMedian() returns 1.5.`,
    inputFormat: "class MedianFinder with addNum() and findMedian()",
    outputFormat: "Return median after operations",
    constraints: "-10^5 <= num <= 10^5",
    starterCode: `import java.util.*;

class MedianFinder {
    // Your code here
    
    public MedianFinder() {
        // Your code here
    }
    
    public void addNum(int num) {
        // Your code here
    }
    
    public double findMedian() {
        // Your code here
        return 0.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        MedianFinder mf = new MedianFinder();
        int n = sc.nextInt();
        
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String op = sc.next();
            if (op.equals("add")) {
                mf.addNum(sc.nextInt());
            } else {
                result.append(mf.findMedian()).append(" ");
            }
        }
        System.out.println(result.toString().trim());
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "5\nadd 1\nadd 2\nfind\nadd 3\nfind", expectedOutput: "1.5 2.0" },
      { input: "3\nadd 5\nadd 10\nfind", expectedOutput: "7.5" },
      { input: "2\nadd 1\nfind", expectedOutput: "1.0" }
    ],
    hiddenTestCases: [
      { input: "4\nadd 2\nadd 3\nadd 4\nfind", expectedOutput: "3.0" },
      { input: "6\nadd 1\nadd 2\nadd 3\nadd 4\nadd 5\nfind", expectedOutput: "3.0" },
      { input: "3\nadd -1\nadd -2\nfind", expectedOutput: "-1.5" },
      { input: "4\nadd 0\nadd 0\nadd 0\nfind", expectedOutput: "0.0" },
      { input: "5\nadd 10\nadd 20\nadd 30\nadd 40\nfind", expectedOutput: "25.0" }
    ]
  },
  {
    id: "java-interval-scheduling",
    slug: "java-interval-scheduling",
    title: "Interval Scheduling Optimization",
    category: "Java Track",
    difficulty: "hard",
    description: `Find maximum number of non-overlapping intervals.

**Example:** Given intervals = [[1,2],[2,3],[3,4],[1,3]], return 3.`,
    inputFormat: "public static int maxNonOverlapping(int[][] intervals)",
    outputFormat: "Return max count of non-overlapping intervals",
    constraints: "1 <= intervals.length <= 10^5",
    starterCode: `import java.util.*;

public class Solution {
    public static int maxNonOverlapping(int[][] intervals) {
        // Your code here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();
        
        int[][] intervals = new int[n][2];
        for (int i = 0; i < n; i++) {
            String[] parts = sc.nextLine().split(" ");
            intervals[i][0] = Integer.parseInt(parts[0]);
            intervals[i][1] = Integer.parseInt(parts[1]);
        }
        
        System.out.println(maxNonOverlapping(intervals));
    }
}`,
    timeLimitMs: 2000,
    memoryLimitMb: 256,
    visibleTestCases: [
      { input: "4\n1 2\n2 3\n3 4\n1 3", expectedOutput: "3" },
      { input: "3\n1 2\n1 2\n1 2", expectedOutput: "1" },
      { input: "2\n1 3\n2 4", expectedOutput: "1" }
    ],
    hiddenTestCases: [
      { input: "1\n1 2", expectedOutput: "1" },
      { input: "3\n1 2\n3 4\n5 6", expectedOutput: "3" },
      { input: "4\n0 1\n1 2\n2 3\n3 4", expectedOutput: "4" },
      { input: "3\n0 10\n1 2\n3 4", expectedOutput: "2" },
      { input: "5\n1 5\n2 3\n4 6\n6 7\n8 9", expectedOutput: "4" }
    ]
  }
];

export const JAVA_TRACK_TOTAL = javaProblemsData.length;
