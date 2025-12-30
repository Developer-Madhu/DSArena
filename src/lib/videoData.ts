// Video data organized by topic from YouTube playlists
// Source: GeeksforGeeks YouTube Channel

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
}

export interface TopicSection {
  id: string;
  name: string;
  icon: string;
  color: string;
  playlistId: string;
  videos: VideoItem[];
}

export const topicSections: TopicSection[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    icon: 'LayoutGrid',
    color: 'blue',
    playlistId: 'PLqM7alHXFySEQDk2MDfbwEdjd2svVJH9p',
    videos: [
      { id: 'arr-1', title: 'WHAT IS ARRAY?', youtubeId: '3_x_Fb31NLE' },
      { id: 'arr-2', title: 'ARRAY PRACTICE PROBLEMS', youtubeId: 'J7EhXvnixRM' },
      { id: 'arr-3', title: 'Longest Span with same Sum in two Binary Arrays', youtubeId: 'xtfj4-r_Ahs' },
      { id: 'arr-4', title: 'Union and Intersection of two sorted arrays', youtubeId: 'EQQp4B_CU5Q' },
      { id: 'arr-5', title: 'Find the minimum distance between two numbers', youtubeId: 'hoceGcqQczM' },
      { id: 'arr-6', title: 'Leaders in an array', youtubeId: 'NyRZm1pzNmQ' },
      { id: 'arr-7', title: 'Majority Element', youtubeId: 'uwogtyFiDLg' },
      { id: 'arr-8', title: 'Find the Number Occurring Odd Number of Times', youtubeId: 'hySR1exD5PE' },
      { id: 'arr-9', title: 'Replace every element with the greatest element on right side', youtubeId: 'bLb8e83OK7o' },
      { id: 'arr-10', title: 'Find a Fixed Point in a given array', youtubeId: 'hASRzBXY5kY' },
      { id: 'arr-11', title: 'Maximum and minimum of an array using minimum comparisons', youtubeId: 'SXTb_GdpxTE' },
      { id: 'arr-12', title: 'Segregate 0s and 1s in an array', youtubeId: 'oaVwzYN6BP4' },
      { id: 'arr-13', title: 'Sort an array of 0s, 1s and 2s', youtubeId: 'oaVwzYN6BP4' },
      { id: 'arr-14', title: 'Largest Sum Contiguous Subarray', youtubeId: 'YxuK6A3SvTs' },
      { id: 'arr-15', title: 'Find the Missing Number', youtubeId: 'ZdBgMvHkLsk' },
      { id: 'arr-16', title: 'Search an element in a sorted and rotated array', youtubeId: 'uufaK2uLnSI' },
      { id: 'arr-17', title: 'Merge an array of size n into another array of size m+n', youtubeId: 'hVl2b3bLzBw' },
      { id: 'arr-18', title: 'Median of two sorted arrays', youtubeId: 'MHNTl_NvOj0' },
      { id: 'arr-19', title: 'Program for array rotation', youtubeId: 'utE_1ppU5DY' },
      { id: 'arr-20', title: 'Reversal algorithm for array rotation', youtubeId: 'gmu0RA5_zxs' },
    ],
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists',
    icon: 'Link',
    color: 'emerald',
    playlistId: 'PLqM7alHXFySH41ZxzrPNj2pAYPOI8ITe7',
    videos: [
      { id: 'll-1', title: 'WHAT IS LINKED LIST?', youtubeId: 'MCG7S2fGUeU' },
      { id: 'll-2', title: 'Linked List Set 1 (Introduction)', youtubeId: 'ge8iG7JecR4' },
      { id: 'll-3', title: 'Linked List Set 2 (Inserting a node)', youtubeId: 'zgCROSijBRw' },
      { id: 'll-4', title: 'Linked List Set 3 (Deleting a node)', youtubeId: 'DoNRZTumxB0' },
      { id: 'll-5', title: 'Linked List vs Array', youtubeId: 'QRpbNTKH6XY' },
      { id: 'll-6', title: 'Delete a Linked List node at a given position', youtubeId: 'BrjLWNuJ3HA' },
      { id: 'll-7', title: 'Flattening a Linked List', youtubeId: 'PSKZJDtitZw' },
      { id: 'll-8', title: 'Detection of Loop in a Linked List', youtubeId: 'Aup0kOWoMVg' },
      { id: 'll-9', title: 'Find Length of a Linked List', youtubeId: 'ZFJNgl5fL-M' },
      { id: 'll-10', title: 'Search an element in a Linked List', youtubeId: '1ysHKl_50s8' },
      { id: 'll-11', title: 'Nth node from the end of a Linked List', youtubeId: 'N_8BwXYJlHo' },
      { id: 'll-12', title: 'Middle of the Linked List', youtubeId: 'OLnI1UKAN3k' },
      { id: 'll-13', title: 'Write a function to count the number of times a given int occurs', youtubeId: 'JGXv4xdAaQ4' },
      { id: 'll-14', title: 'Reverse a linked list', youtubeId: 'O0By4Zq0OFc' },
      { id: 'll-15', title: 'Detect and Remove Loop in a Linked List', youtubeId: 'tqvjADNAG1c' },
      { id: 'll-16', title: 'Add two numbers represented by linked lists', youtubeId: 'RZpjNU2LMLE' },
      { id: 'll-17', title: 'Rotate a Linked List', youtubeId: '9VPm6nEbVPA' },
      { id: 'll-18', title: 'Merge two sorted linked lists', youtubeId: 'O0Gz-Z7Qc3s' },
    ],
  },
  {
    id: 'graphs',
    name: 'Graphs',
    icon: 'Network',
    color: 'purple',
    playlistId: 'PLqM7alHXFySEaZgcg7uRYJFBnYMLti-nh',
    videos: [
      { id: 'gr-1', title: 'GRAPH Data Structure', youtubeId: 'gTsoyORhqkg' },
      { id: 'gr-2', title: 'Graph Practice Problems', youtubeId: 'pCmsQVHYXK0' },
      { id: 'gr-3', title: 'Graph and its representations', youtubeId: '1n5XPFcvxds' },
      { id: 'gr-4', title: 'Breadth First Traversal for a Graph', youtubeId: '0u78hx-66Xk' },
      { id: 'gr-5', title: 'Applications of Breadth First Traversal', youtubeId: '-CzEI2r5OTs' },
      { id: 'gr-6', title: 'Depth First Traversal for a Graph', youtubeId: 'Y40bRyPQQr0' },
      { id: 'gr-7', title: 'Applications of Depth First Search', youtubeId: 'dE3wBxYobrU' },
      { id: 'gr-8', title: 'Length of shortest chain to reach a target word', youtubeId: '6pIC20wCm20' },
      { id: 'gr-9', title: 'Detect Cycle in a Directed Graph', youtubeId: 'rKQaZuoUR4M' },
      { id: 'gr-10', title: 'Detect cycle in an undirected graph', youtubeId: 'n_t0a_8H8VY' },
      { id: 'gr-11', title: 'Topological Sorting', youtubeId: 'Q9PIxaNGnig' },
      { id: 'gr-12', title: 'Check whether a given graph is Bipartite or not', youtubeId: '0ACfAqs8mm0' },
      { id: 'gr-13', title: 'Snake and Ladder Problem', youtubeId: 'aKj1CmKm29g' },
      { id: 'gr-14', title: 'Dijkstra\'s shortest path algorithm', youtubeId: 'XB4MIexjvY0' },
      { id: 'gr-15', title: 'Prim\'s Minimum Spanning Tree', youtubeId: 'xthRL0lcx2w' },
      { id: 'gr-16', title: 'Kruskal\'s Minimum Spanning Tree', youtubeId: '1xmU5JiWXIs' },
      { id: 'gr-17', title: 'Floyd Warshall Algorithm', youtubeId: 'oNI0rf2P9gE' },
      { id: 'gr-18', title: 'Bellman Ford Algorithm', youtubeId: 'FtN3BYH2Zes' },
    ],
  },
  {
    id: 'stacks',
    name: 'Stacks',
    icon: 'Layers',
    color: 'amber',
    playlistId: 'PLqM7alHXFySF7Lap-wi5qlaD8OEBx9RMV',
    videos: [
      { id: 'st-1', title: 'WHAT IS STACK?', youtubeId: 'lhhyE7NVcbg' },
      { id: 'st-2', title: 'Stack Practice Question (Parenthesis Checker)', youtubeId: '2ay2GCrmf9E' },
      { id: 'st-3', title: 'Stack Set 1 (Introduction)', youtubeId: 'vZEuSFXSMDI' },
      { id: 'st-4', title: 'Stack Set 2 (Infix to Postfix)', youtubeId: 'ysDharaQXkw' },
      { id: 'st-5', title: 'Stack Set 3 (Reverse a string using Stack)', youtubeId: 'jBY4JD25Iks' },
      { id: 'st-6', title: 'Stack Set 4 (Evaluation of Postfix Expression)', youtubeId: '_TGyjXjg04w' },
      { id: 'st-7', title: 'Next Greater Element', youtubeId: 'sgelJuvX1bU' },
      { id: 'st-8', title: 'The Stock Span Problem', youtubeId: 'g1USSZVWDsY' },
      { id: 'st-9', title: 'The Celebrity Problem', youtubeId: 'LtGnA5L6LIk' },
      { id: 'st-10', title: 'Implement two stacks in an array', youtubeId: 'S3ORZ4V6mDw' },
      { id: 'st-11', title: 'Implement Stack using Queues', youtubeId: 'Fz0AE_bEgLM' },
      { id: 'st-12', title: 'Design a stack with operations on middle element', youtubeId: 'uwZVBbeH8RM' },
      { id: 'st-13', title: 'How to efficiently implement k stacks in a single array', youtubeId: 'DxW7VAsdX0o' },
      { id: 'st-14', title: 'Sort a stack using recursion', youtubeId: 'MOGBRkkOhkY' },
      { id: 'st-15', title: 'Iterative Tower of Hanoi', youtubeId: '5_6nsViVM00' },
    ],
  },
  {
    id: 'queues',
    name: 'Queues',
    icon: 'ListOrdered',
    color: 'rose',
    playlistId: 'PLqM7alHXFySG6wgjVeEat_ouTIi0IBQ6D',
    videos: [
      { id: 'qu-1', title: 'WHAT IS QUEUE?', youtubeId: 'ypJwoz_SXTo' },
      { id: 'qu-2', title: 'QUEUE PRACTICE PROBLEMS', youtubeId: 'KG4dbF5xRig' },
      { id: 'qu-3', title: 'Queue Set 1 (Array Implementation)', youtubeId: 'q5oOYxfOD1c' },
      { id: 'qu-4', title: 'Queue Set 2 (Linked List Implementation)', youtubeId: 'C6KjYbAarYI' },
      { id: 'qu-5', title: 'Implement a Stack using Single Queue', youtubeId: 'hC1UplBFEj0' },
      { id: 'qu-6', title: 'Circular Queue (Introduction and Array Implementation)', youtubeId: 'eKxWdc1DVFE' },
      { id: 'qu-7', title: 'Reversing a Queue', youtubeId: 'aUU23JDaErs' },
      { id: 'qu-8', title: 'LRU Cache Implementation', youtubeId: 'S6IfqDXWa10' },
      { id: 'qu-9', title: 'Implement Queue using Stacks', youtubeId: 'lMgap8Yvg-8' },
      { id: 'qu-10', title: 'Deque (Introduction and Applications)', youtubeId: 'WJres9mgiAk' },
      { id: 'qu-11', title: 'Priority Queue (Introduction)', youtubeId: 'wptevk0bshY' },
      { id: 'qu-12', title: 'Interleave the first half of the queue with second half', youtubeId: 'vvq1FgVLCDs' },
      { id: 'qu-13', title: 'Sorting a Queue without extra space', youtubeId: 'JnLIDGMEEu8' },
    ],
  },
  {
    id: 'trees',
    name: 'Trees',
    icon: 'GitBranch',
    color: 'cyan',
    playlistId: 'PLqM7alHXFySHCXD7r1J0ky9Zg_GBB1dbk',
    videos: [
      { id: 'tr-1', title: 'Tree Traversals (Inorder, Preorder and Postorder)', youtubeId: 'IpyCqRmaKW4' },
      { id: 'tr-2', title: 'AVL Tree - Insertion', youtubeId: 'ygZMI2YIcvk' },
      { id: 'tr-3', title: 'Inorder Tree Traversal without Recursion', youtubeId: 'VsxLHGUqAKs' },
      { id: 'tr-4', title: 'Level Order Tree Traversal', youtubeId: 'kQ-aoKbGKSo' },
      { id: 'tr-5', title: 'Red Black Tree (Insertion)', youtubeId: 'YCo2-H2CL6Q' },
      { id: 'tr-6', title: 'Find the Maximum Depth or Height of a Tree', youtubeId: 'TQI_m32_AeU' },
      { id: 'tr-7', title: 'Lowest Common Ancestor in a BST', youtubeId: 'zlTsz-apm4U' },
      { id: 'tr-8', title: 'Binary Search Tree - Search and Insert', youtubeId: 'qYo8BVxtoH4' },
      { id: 'tr-9', title: 'Binary Search Tree - Delete', youtubeId: 'puyl7MBqPIg' },
      { id: 'tr-10', title: 'Check if a binary tree is BST or not', youtubeId: 'yEwSGhSsT0U' },
      { id: 'tr-11', title: 'Print Left View of a Binary Tree', youtubeId: 'eBdKNoW3VJg' },
      { id: 'tr-12', title: 'Print Right View of a Binary Tree', youtubeId: 'cdBxsiKFq1o' },
      { id: 'tr-13', title: 'Check for Balanced Binary Tree', youtubeId: 'OJ7bDuq4PYQ' },
      { id: 'tr-14', title: 'Diameter of a Binary Tree', youtubeId: '9bCqtsRXfXE' },
      { id: 'tr-15', title: 'Check if two trees are Mirror', youtubeId: '9jH2L2Ysxko' },
      { id: 'tr-16', title: 'Convert a Binary Tree into its Mirror Tree', youtubeId: 'vdwcCOHEqHs' },
      { id: 'tr-17', title: 'Symmetric Tree (Mirror Image of itself)', youtubeId: 'K7LyJTWr2yA' },
      { id: 'tr-18', title: 'Inorder Successor in BST', youtubeId: '5cPbNCrdotA' },
    ],
  },
];

// Helper to get total video count
export const getTotalVideoCount = () => 
  topicSections.reduce((acc, section) => acc + section.videos.length, 0);
