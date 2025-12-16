export type VideoItem = {
  id: string;
  title: string;
  youtubeId?: string;
  fileUrl?: string; // optional direct URL (mp4, webm) for native playback
  topic: string;
  description?: string;
};

export const videoLibrary: VideoItem[] = [
  // Linked Lists
  {
    id: 'll-1',
    topic: 'Linked Lists',
    title: 'Linked List Data Structure - Explained',
    youtubeId: 'njTh_OwMljA',
  },
  {
    id: 'll-2',
    topic: 'Linked Lists',
    title: 'Linked List problems & interview patterns',
    youtubeId: 'UaQxnl2jVnI',
  },

  // Stacks & Queues
  {
    id: 'st-1',
    topic: 'Stacks & Queues',
    title: 'Stacks and Queues - Implementation & Problems',
    youtubeId: 'wjI1WNcIntg',
  },

  // Trees
  {
    id: 'tree-1',
    topic: 'Trees',
    title: 'Binary Trees & Traversals',
    youtubeId: 'vRbi1Y3h1X0',
  },

  // Graphs
  {
    id: 'graph-1',
    topic: 'Graphs',
    title: 'Graph algorithms - BFS & DFS',
    youtubeId: 'pcKY4hjDrxk',
  },

  // DP
  {
    id: 'dp-1',
    topic: 'Dynamic Programming',
    title: 'Dynamic Programming - Beginner to Advanced',
    youtubeId: 'OQ5jsbhAv_M',
  },

  // Marker for automated playlist imports. Tools/scripts can insert generated items
  // between IMPORTED_VIDEOS_START and IMPORTED_VIDEOS_END. Do not remove these markers.
  // IMPORTED_VIDEOS_START

  {
    id: "yt-MCG7S2fGUeU",
    topic: "Linked Lists",
    title: "WHAT IS LINKED LIST? | Linked List Data Structures | DSA Course | GeeksforGeeks",
    youtubeId: "MCG7S2fGUeU",
    description: "Welcome to the next video of our DSA Course, where we dive into the LINKED LIST DATA STRUCTURE. \n\n💡 Discover the fundamental concepts, from understanding what linked lists are to exploring the dynamic memory allocation as compared to the contiguous memory allocation of arrays.\n\n🔗 Dive into the intricacies of creating nodes, the building blocks of linked lists. Witness the step-by-step process of creating a linked list of n nodes, gaining practical insights into implementation.\n\n💻 Elevate your knowledge on Data Structures as we break down the essentials of linked lists, laying the foundation for advanced algorithms and data manipulation.\n\n📚 Read More about Linked Lists: https://www.geeksforgeeks.org/data-structures/linked-list/\n\nhttps://www.geeksforgeeks.org/top-20-linked-list-interview-question/\n\n-------------------------------------------------------------------------\n\n⏰ Time Stamps:\n0:00 - Introduction to Linked List Data Structure\n1:28 - Memory Allocation of Linked List vs Arrays\n4:12 - Nodes in Linked List\n5:18 - Creating a Node in Linked List\n7:47 - How to Link Nodes\n12:00 - Creating a Linked List of 'N' Nodes\n\n-------------------------------------------------------------------------\n\n🔴 Check out the video on Queue Data Structures: https://youtu.be/ypJwoz_SXTo\n\n🔴 Check out the Full DSA Course Playlist: https://youtube.com/playlist?list=PLqM7alHXFySHWUSBXUW9eq-ajb2JLoFNS&si=m_4B8bdS8dSJ9W6m\n\n-------------------------------------------------------------------------\n\n📚 Explore Our Courses: https://practice.geeksforgeeks.org/courses?utm_source=youtube&utm_medium=main_channel&utm_campaign=dsa_new\n\n\n📖 Want to Learn more about Data Structures and Algorithms? \nCheck out our Data Structures and Algorithms - Self Paced Course Now!: https://www.geeksforgeeks.org/courses/dsa-self-paced?utm_source=youtube&utm_medium=main_channel&utm_campaign=dsa_new\n\n-------------------------------------------------------------------------\n\nFollow us for more fun, knowledge, and resources:\n\n💬 Twitter- https://twitter.com/geeksforgeeks \n🧑‍💼 LinkedIn- https://www.linkedin.com/company/geeksforgeeks\n📷 Instagram- https://www.instagram.com/geeks_for_geeks/?hl=en \n💌 Telegram- https://t.me/s/geeksforgeeks_official \n\n📱 Download GeeksforGeeks' Official App: https://geeksforgeeksapp.page.link/gfg-app\n\n\nRelated Queries:\nDSA course\nLinked List data structures \nLinked List in dsa\nDSA free course\nintroduction to Linked List\nLinked List implementation \nLinked List data structure interview question\nLinked List practice problems\nLinked List interview questions\nLinked List in c language\nLinked List in java\nLinked List in python\nfundamentals of Linked List \ngeeksforgeeks DSA\nLinked List data structure GFG\n\n\n#dsa #datastructures #linkedlist #implementationoflinkedlist #GeeksforGeeks #GfG #datastructuresandalgorithms #nodes #nodesinlinkedlist #pointerinlinkedlist #linklist",
  },
  {
    id: "yt-ge8iG7JecR4",
    topic: "Linked Lists",
    title: "Linked List | Set 1 (Introduction) | GeeksforGeeks",
    youtubeId: "ge8iG7JecR4",
    description: "The explanation for the article: http://quiz.geeksforgeeks.org/linked-list-set-1-introduction/\n\nThis video is contributed by Harshit Jain.\n#geeksforgeeks",
  },
  {
    id: "yt-zgCROSijBRw",
    topic: "Linked Lists",
    title: "Linked List | Set 2 (Inserting a node) | GeeksforGeeks",
    youtubeId: "zgCROSijBRw",
    description: "The explanation for the article: http://quiz.geeksforgeeks.org/linked-list-set-2-inserting-a-node/\n\nThis video is contributed by Harshit Jain.\n#geeksforgeeks",
  },
  {
    id: "yt-DoNRZTumxB0",
    topic: "Linked Lists",
    title: "Linked List | Set 3 (Deleting a node) | GeeksforGeeks",
    youtubeId: "DoNRZTumxB0",
    description: "The explanation for the article: http://quiz.geeksforgeeks.org/linked-list-set-3-deleting-node/\n\nThis video is contributed by Harshit Jain.\n#geeksforgeeks",
  },
  {
    id: "yt-QRpbNTKH6XY",
    topic: "Linked Lists",
    title: "Linked List vs Array | GeeksforGeeks",
    youtubeId: "QRpbNTKH6XY",
    description: "Explanation for the article: http://www.geeksforgeeks.org/linked-list-vs-array/\n\nRead More: https://www.geeksforgeeks.org/linked-list-vs-array/\n\nThis video is contributed by Harshit Jain.\n#geeksforgeeks",
  },
  {
    id: "yt-BrjLWNuJ3HA",
    topic: "Linked Lists",
    title: "Delete a Linked List node at a given position | GeeksforGeeks",
    youtubeId: "BrjLWNuJ3HA",
    description: "Explanation for the article: http://quiz.geeksforgeeks.org/delete-a-linked-list-node-at-a-given-position/\n\nThis video is contributed by Harshit Jain.",
  },
  {
    id: "yt-PSKZJDtitZw",
    topic: "Linked Lists",
    title: "Flattening a Linked List | GeeksforGeeks",
    youtubeId: "PSKZJDtitZw",
    description: "Explanation for the article: http://www.geeksforgeeks.org/flattening-a-linked-list/\n\nThis video is contributed by Harshit Jain.",
  },
  {
    id: "yt-Aup0kOWoMVg",
    topic: "Linked Lists",
    title: "Detection of Loop in a Linked List |  D E Shaw & Co Interview Questions | GeeksforGeeks",
    youtubeId: "Aup0kOWoMVg",
    description: "Explanation for the article: http://www.geeksforgeeks.org/write-a-c-function-to-detect-loop-in-a-linked-list/\n\nRead More: https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/\n\nThis video is contributed by Pratik Agrawal.",
  },
  {
    id: "yt-kX_OJsOcK8Q",
    topic: "Linked Lists",
    title: "Find Length of a Linked List (Iterative and Recursive) | GeeksforGeeks",
    youtubeId: "kX_OJsOcK8Q",
    description: "Explanation for the article: http://quiz.geeksforgeeks.org/find-length-of-a-linked-list-iterative-and-recursive/\n\nRead More: https://www.geeksforgeeks.org/find-length-of-a-linked-list-iterative-and-recursive/\n\nThis video is contributed by Harsh Agarwal.",
  },
  {
    id: "yt-iyOh1IWXnq4",
    topic: "Linked Lists",
    title: "Write a function to get Nth node in a Linked List | GeeksforGeeks",
    youtubeId: "iyOh1IWXnq4",
    description: "Explanation for the article: http://www.geeksforgeeks.org/write-a-function-to-get-nth-node-in-a-linked-list/\n\nThis video is contributed by Harsh Agarwal.",
  },
  {
    id: "yt-bbbnyIDHeR8",
    topic: "Linked Lists",
    title: "Write a recursive function to print reverse of a Linked List | GeeksforGeeks",
    youtubeId: "bbbnyIDHeR8",
    description: "Explanation for the article: http://www.geeksforgeeks.org/write-a-recursive-function-to-print-reverse-of-a-linked-list/\n\nThis video is contributed by Harsh Agarwal.",
  },
  {
    id: "yt-7sikRsNcqgM",
    topic: "Linked Lists",
    title: "Search an element in a Linked List (Iterative and Recursive) | GeeksforGeeks",
    youtubeId: "7sikRsNcqgM",
    description: "Explanation for the article: http://quiz.geeksforgeeks.org/search-an-element-in-a-linked-list-iterative-and-recursive/\n\nThis video is contributed by Harsh Agarwal.",
  },
  {
    id: "yt-aV3s3fkriWY",
    topic: "Linked Lists",
    title: "Write a function to delete a Linked List | GeeksforGeeks",
    youtubeId: "aV3s3fkriWY",
    description: "Explanation for the article: http://www.geeksforgeeks.org/write-a-function-to-delete-a-linked-list/\n\nThis video is contributed by Pratik Agarwal.",
  },
  {
    id: "yt-_BG9rjkAXj8",
    topic: "Linked Lists",
    title: "Detect and Remove Loop in a Linked List | GeeksforGeeks",
    youtubeId: "_BG9rjkAXj8",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/detect-and-remove-loop-in-a-linked-list/\n\nPractice Problem Online Judge: http://practice.geeksforgeeks.org/problems/remove-loop-in-linked-list/1\n\nSoundtrack: Aretes by Kevin MacLeod\n\nRead More: https://www.geeksforgeeks.org/detect-and-remove-loop-in-a-linked-list/\n\nThis video is contributed by Ishant Periwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-LLPuC5kWD8U",
    topic: "Linked Lists",
    title: "Add two numbers represented by Linked Lists | Set 1 | GeeksforGeeks",
    youtubeId: "LLPuC5kWD8U",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-lists/\n\nRelated Article: http://www.geeksforgeeks.org/sum-of-two-linked-lists/\n\nhttps://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-list/\n\n\nPractice Problem Online Judge: http://practice.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1\n\nThis video is contributed by Ishant Periwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-V4ZHvhvVmSE",
    topic: "Linked Lists",
    title: "Swap nodes in a linked list without swapping data | GeeksforGeeks",
    youtubeId: "V4ZHvhvVmSE",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/swap-nodes-in-a-linked-list-without-swapping-data/\n\nRead More: https://www.geeksforgeeks.org/swap-nodes-in-a-linked-list-without-swapping-data/\n\nThis video is contributed by Aditi Bainss\n\nPlease Like, Comment and Share the Video among your friends.\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-odUJXFJR6Q4",
    topic: "Linked Lists",
    title: "Merge two sorted linked lists | GeeksforGeeks",
    youtubeId: "odUJXFJR6Q4",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/merge-two-sorted-linked-lists/\n\nPractice Problem Online Judge: http://practice.geeksforgeeks.org/problems/merge-two-sorted-linked-lists/1\n\nRead More: https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/\n\nSoundtrack: Take You Home Tonight by Vibe Tracks\n\nThis video is contributed by Ishant Periwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-D7y_hoT_YZI",
    topic: "Linked Lists",
    title: "Reversing a linked list | GeeksforGeeks",
    youtubeId: "D7y_hoT_YZI",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/reverse-a-linked-list/\n\nPractice Problem Online Judge: http://practice.geeksforgeeks.org/problems/reverse-a-linked-list/1\n\nRead More: https://www.geeksforgeeks.org/reverse-a-linked-list/\n\nSoundtrack: Sunday Drive by Silent Partner\n\nThis video is contributed by Ishant Periwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-BrmGrIPGbgk",
    topic: "Linked Lists",
    title: "Find the middle of a given linked list | GeeksforGeeks",
    youtubeId: "BrmGrIPGbgk",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/\n\nPractice Problem Online Judge: http://practice.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1\n\nRead More: https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/\n\nThis video is contributed by Aditi Bainss\n\nPlease Like, Comment and Share the Video among your friends.\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt--g3KauAWofw",
    topic: "Linked Lists",
    title: "Count the number of times a given int occurs in a Linked List | GeeksforGeeks",
    youtubeId: "-g3KauAWofw",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/write-a-function-that-counts-the-number-of-times-a-given-int-occurs-in-a-linked-list/\n\nPractice Problem Online Judge: http://practice.geeksforgeeks.org/problems/occurence-of-an-integer-in-a-linked-list/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-8kbcUeJDUGA",
    topic: "Linked Lists",
    title: "Convert a given Binary Tree to Doubly Linked List | Set 2 | GeeksforGeeks",
    youtubeId: "8kbcUeJDUGA",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/convert-a-given-binary-tree-to-doubly-linked-list-set-2/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/binary-tree-to-dll/1\n\nThis video is contributed by Anant Patni\n\nPlease Like, Comment and Share the Video among your friends.\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-DSfnJ3iF1U4",
    topic: "Linked Lists",
    title: "Compare two strings represented as linked lists | GeeksforGeeks",
    youtubeId: "DSfnJ3iF1U4",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/compare-two-strings-represented-as-linked-lists/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/compare-two-linked-lists/1\n\nThis video is contributed by Rahul Agrawal\n\nPlease Like, Comment and Share the Video among your friends.\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-IT60llgYHn0",
    topic: "Linked Lists",
    title: "Check whether the length of given linked list is Even or Odd | GeeksforGeeks",
    youtubeId: "IT60llgYHn0",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/check-whether-the-length-of-given-linked-list-is-even-or-odd/\n\nPractice Problem Online Judge:\nhttps://practice.geeksforgeeks.org/problems/linked-list-length-even-or-odd/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-4-3TU2FRs70",
    topic: "Linked Lists",
    title: "Sort a linked list of 0s, 1s and 2s | GeeksforGeeks",
    youtubeId: "4-3TU2FRs70",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/sort-a-linked-list-of-0s-1s-or-2s/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-mMRwCeWPI1c",
    topic: "Linked Lists",
    title: "Find smallest and largest elements in singly linked list | GeeksforGeeks",
    youtubeId: "mMRwCeWPI1c",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/find-smallest-largest-elements-singly-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-j3Kd06VfJhw",
    topic: "Linked Lists",
    title: "Remove duplicates from a sorted linked list | GeeksforGeeks",
    youtubeId: "j3Kd06VfJhw",
    description: "Find Complete Code at GeeksforGeeks Article: http://www.geeksforgeeks.org/remove-duplicates-from-a-sorted-linked-list/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/remove-duplicate-element-from-sorted-linked-list/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-LNryat2UNXo",
    topic: "Linked Lists",
    title: "Find modular node in a linked list | GeeksforGeeks",
    youtubeId: "LNryat2UNXo",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/find-modular-node-linked-list/\n\nPractice Problem Online Judge:\nhttps://practice.geeksforgeeks.org/problems/modular-node/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-3HRCz3w-7rw",
    topic: "Linked Lists",
    title: "Delete middle of linked list | GeeksforGeeks",
    youtubeId: "3HRCz3w-7rw",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/delete-middle-of-linked-list/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/delete-middle-of-linked-list/1\n\nRead More: https://www.geeksforgeeks.org/delete-middle-of-linked-list/\n\nThis video is contributed by Rahul Agrawal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-vNa7-4aGxCI",
    topic: "Linked Lists",
    title: "Move last element to front of a given Linked List | GeeksforGeeks",
    youtubeId: "vNa7-4aGxCI",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/move-last-element-to-front-of-a-given-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-lOQ-hZLje2s",
    topic: "Linked Lists",
    title: "Insert a whole linked list into other at k-th position | GeeksforGeeks",
    youtubeId: "lOQ-hZLje2s",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/insert-whole-linked-list-k-th-position/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-rCdGb1ufHUA",
    topic: "Linked Lists",
    title: "Make middle node head in a linked list | GeeksforGeeks",
    youtubeId: "rCdGb1ufHUA",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/make-middle-node-head-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-sqdrHv4Yw6c",
    topic: "Linked Lists",
    title: "Count rotations in sorted and rotated linked list | GeeksforGeeks",
    youtubeId: "sqdrHv4Yw6c",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/count-rotations-sorted-rotated-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-bN8nk4ZXzK0",
    topic: "Linked Lists",
    title: "Pairwise swap elements of a given linked list | GeeksforGeeks",
    youtubeId: "bN8nk4ZXzK0",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/pairwise-swap-elements-of-a-given-linked-list/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/pairwise-swap-elements-of-a-linked-list-by-swapping-data/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-Ga9iLtMKhKo",
    topic: "Linked Lists",
    title: "Check if a linked list of strings forms a palindrome | GeeksforGeeks",
    youtubeId: "Ga9iLtMKhKo",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/check-linked-list-strings-form-palindrome/\n\nPractice Problem Online Judge:\nhttps://practice.geeksforgeeks.org/problems/linked-list-of-strings-forms-a-palindrome/1\n\nRead More: https://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-4fyh_ddRyRE",
    topic: "Linked Lists",
    title: "Delete a linked list using recursion | GeeksforGeeks",
    youtubeId: "4fyh_ddRyRE",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/delete-linked-list-using-recursion/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-ZgeHNHo2RAM",
    topic: "Linked Lists",
    title: "Make a loop at k-th position in a linked list | GeeksforGeeks",
    youtubeId: "ZgeHNHo2RAM",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/make-loop-k-th-position-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-E8V0mFt4KBA",
    topic: "Linked Lists",
    title: "Identical Linked Lists | GeeksforGeeks",
    youtubeId: "E8V0mFt4KBA",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/identical-linked-lists/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/identical-linked-lists/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-XVm27KGy4Fw",
    topic: "Linked Lists",
    title: "Multiply two numbers represented by Linked Lists | GeeksforGeeks",
    youtubeId: "XVm27KGy4Fw",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/multiply-two-numbers-represented-linked-lists/\n\nPractice Problem Online Judge:\nhttps://practice.geeksforgeeks.org/problems/multiply-two-linked-lists/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-tWtq2nd7sI4",
    topic: "Linked Lists",
    title: "Rotate a Linked List | GeeksforGeeks",
    youtubeId: "tWtq2nd7sI4",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/rotate-a-linked-list/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/rotate-a-linked-list/1\n\nThis video is contributed by\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-yOjQS7rdkQQ",
    topic: "Linked Lists",
    title: "Delete a node whose pointer/reference is given in a singly linked list | GeeksforGeeks",
    youtubeId: "yOjQS7rdkQQ",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/given-only-a-pointer-to-a-node-to-be-deleted-in-a-singly-linked-list-how-do-you-delete-it/\n\nPractice Problem Online Judge:\nhttps://practice.geeksforgeeks.org/problems/delete-without-head-pointer/1\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-EWkox1WR4VU",
    topic: "Linked Lists",
    title: "Recursive function to delete k-th node from linked list | GeeksforGeeks",
    youtubeId: "EWkox1WR4VU",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/recursive-function-delete-k-th-node-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-lnA26dsi3IU",
    topic: "Linked Lists",
    title: "First non-repeating integer in a linked list | GeeksforGeeks",
    youtubeId: "lnA26dsi3IU",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/first-non-repeating-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-hLz1HXsuyvw",
    topic: "Linked Lists",
    title: "Convert singly linked list into circular linked list | GeeksforGeeks",
    youtubeId: "hLz1HXsuyvw",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/convert-singly-linked-list-circular-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-n6AMo1qFPlA",
    topic: "Linked Lists",
    title: "Find the length of loop in linked list | GeeksforGeeks",
    youtubeId: "n6AMo1qFPlA",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/find-length-of-loop-in-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-hH4XI0INmNg",
    topic: "Linked Lists",
    title: "Sort linked list which is already sorted on absolute values | GeeksforGeeks",
    youtubeId: "hH4XI0INmNg",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/sort-linked-list-already-sorted-absolute-values/\n\nRead More: https://www.geeksforgeeks.org/sort-linked-list-already-sorted-absolute-values/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-htsTNo6n9Uc",
    topic: "Linked Lists",
    title: "Print the alternate nodes of linked list (Iterative Method)  | GeeksforGeeks",
    youtubeId: "htsTNo6n9Uc",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/print-alternate-nodes-linked-listiterative-method/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-q5_qDnl7pSo",
    topic: "Linked Lists",
    title: "Delete alternate nodes of a Linked List | GeeksforGeeks",
    youtubeId: "q5_qDnl7pSo",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/delete-alternate-nodes-of-a-linked-list/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/delete-alternate-nodes/1\n\nRead More: https://www.geeksforgeeks.org/delete-alternate-nodes-of-a-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-TXRoiRMWiOE",
    topic: "Linked Lists",
    title: "Sort a linked list of 0s, 1s and 2s by changing links | GeeksforGeeks",
    youtubeId: "TXRoiRMWiOE",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/sort-linked-list-0s-1s-2s-changing-links/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1\n\nRead More: https://www.geeksforgeeks.org/sort-a-linked-list-of-0s-1s-or-2s/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-ksyUny54Avk",
    topic: "Linked Lists",
    title: "Print alternate nodes of a linked list using recursion | GeeksforGeeks",
    youtubeId: "ksyUny54Avk",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/print-alternate-nodes-linked-list-using-recursion/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-ybT1uiWQYAs",
    topic: "Linked Lists",
    title: "Reverse each word in a linked list node | GeeksforGeeks",
    youtubeId: "ybT1uiWQYAs",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/reverse-word-linked-list-node/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-XqwllvAx8NY",
    topic: "Linked Lists",
    title: "Circular Linked List | Set 1 (Introduction and Applications) | GeeksforGeeks",
    youtubeId: "XqwllvAx8NY",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/circular-linked-list/\n\nRead More: https://www.geeksforgeeks.org/circular-linked-list/\n\nThis video is contributed by Rahul Agarwal\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-ANbJdUBIVRU",
    topic: "Linked Lists",
    title: "Sorted insert for circular linked list | GeeksforGeeks",
    youtubeId: "ANbJdUBIVRU",
    description: "Find Complete Code at GeeksforGeeks Article: https://www.geeksforgeeks.org/sorted-insert-for-circular-linked-list/\n\nPractice Problem Online Judge: https://practice.geeksforgeeks.org/problems/sorted-insert-for-circular-linked-list/1\n\nRead More: https://www.geeksforgeeks.org/sorted-insert-for-circular-linked-list/\n\nThis video is contributed by Komal Kungwani\n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-utc8bwTDjLk",
    topic: "Linked Lists",
    title: "Add 1 to a number represented as linked list | GeeksforGeeks",
    youtubeId: "utc8bwTDjLk",
    description: "Explanation for the article: http://www.geeksforgeeks.org/add-1-number-represented-linked-list/\nRead More: https://www.geeksforgeeks.org/add-1-number-represented-linked-list/\n\nThis video is contributed by Harshit Jain.",
  },
  {
    id: "yt-PpY_C_NSNwk",
    topic: "Linked Lists",
    title: "Delete N nodes after M nodes of a linked list | GeeksforGeeks",
    youtubeId: "PpY_C_NSNwk",
    description: "Explanation for the article: http://www.geeksforgeeks.org/delete-n-nodes-after-m-nodes-of-a-linked-list/\n\nThis video is contributed by Harshit Jain.",
  },
  {
    id: "yt-IUKRzbJac9o",
    topic: "Linked Lists",
    title: "Rearrange a linked list such that all even and odd positioned nodes are together | GeeksforGeeks",
    youtubeId: "IUKRzbJac9o",
    description: "Explanation for the article: http://www.geeksforgeeks.org/rearrange-a-linked-list-such-that-all-even-and-odd-positioned-nodes-are-together/\n\nRead More: https://www.geeksforgeeks.org/rearrange-a-linked-list-such-that-all-even-and-odd-positioned-nodes-are-together/\nThis video is contributed by Harshit Jain.",
  },
  {
    id: "yt-k9x5UjTYi5I",
    topic: "Linked Lists",
    title: "Decimal Equivalent of Binary Linked List | GeeksforGeeks",
    youtubeId: "k9x5UjTYi5I",
    description: "Explanation for the article: http://www.geeksforgeeks.org/decimal-equivalent-of-binary-linked-list/\n\nThis video is contributed by Harshit Jain.",
  },
  {
    id: "yt-ce2rnhkNLzU",
    topic: "Linked Lists",
    title: "Check if a linked list is Circular Linked List | GeeksforGeeks",
    youtubeId: "ce2rnhkNLzU",
    description: "Explanation for the article: http://www.geeksforgeeks.org/check-if-a-linked-list-is-circular-linked-list/\nRead more: https://www.geeksforgeeks.org/check-if-a-linked-list-is-circular-linked-list/\n\nThis video is contributed by Harshit Jain.",
  },
  {
    id: "yt-TnV34Lfdk7k",
    topic: "Linked Lists",
    title: "LINKED LIST PRACTICE QUESTIONS | Operations on Linked List | DSA Problems | GeeksforGeeks",
    youtubeId: "TnV34Lfdk7k",
    description: "Dive into the world of Linked List Data Structures and solve some important Linked List Practice Questions. This will not only help you understand the concepts of linked list but will also help you strengthen your base so that you can solve more complex problems.\n\n🔴 Make sure you watch the previous video on Linked List form our DSA Course: https://www.youtube.com/watch?v=MCG7S2fGUeU&list=PLqM7alHXFySHWUSBXUW9eq-ajb2JLoFNS&index=3&t=153s\n\nWe will be implementing the following operations on linked list:\n\n00:00 - Introduction\n00:45 - Creating a linked list\n10:04 - Traversal of Linked List\n16:06 - Inserting a Node at nth position in linked list\n28:54 - Deleting a Node at nth position form a linked list\n43:35 - Solve it yourself - self practice\n\n-------------------------------------------------------------------------\n\n🔴 DSA Course Playlist: https://youtube.com/playlist?list=PLqM7alHXFySHWUSBXUW9eq-ajb2JLoFNS&si=m_4B8bdS8dSJ9W6m\n\n🔴 How much Maths is Needed for Programming: https://www.youtube.com/watch?v=NvB0IaR8TTI&t=278s\n\n🔴 C++ vs Java vs Python: https://www.youtube.com/watch?v=s28JOUvfLPA&t=819s\n\n-------------------------------------------------------------------------\n\nData Structures and Algorithms - Self Paced: https://www.geeksforgeeks.org/courses/dsa-self-paced?utm_source=youtube&utm_medium=main_channel&utm_campaign=dsa_new\n\n📚 Explore Our Courses: https://practice.geeksforgeeks.org/courses?utm_source=youtube&utm_medium=main_channel&utm_campaign=dsa_new\n\n-------------------------------------------------------------------------\n\nFollow us for more fun, knowledge, and resources:\n\n💬 Twitter- https://twitter.com/geeksforgeeks \n🧑‍💼 LinkedIn- https://www.linkedin.com/company/geeksforgeeks\n📷 Instagram- https://www.instagram.com/geeks_for_geeks/?hl=en \n💌 Telegram- https://t.me/s/geeksforgeeks_official \n\n📱 Download GeeksforGeeks' Official App: https://geeksforgeeksapp.page.link/gfg-app\n\nRelated Queries:\nlinked list Data Structures\nlinked list interview questions\nlinked list practice problems\nInterview questions on linked list data structure\nlinked list DSA problems\nsolving linked list problems\noperations on linked list\n\n\n#GeeksforGeeks #GfG #datastructures #linkedlist #linkedlistpracticequestions #linkedlistturorials #practiceproblems #dsatutorials #linkedlistquestions #linkedlistinterviewproblems #datastructuresandalgorithms #dsa",
  },
  {
    id: "yt-T4bY72lCQac",
    topic: "Linked Lists",
    title: "Dynamic Programming | Set 10 (0-1 Knapsack Problem) | GeeksforGeeks",
    youtubeId: "T4bY72lCQac",
    description: "Explanation for the article: http://www.geeksforgeeks.org/dynamic-programming-set-10-0-1-knapsack-problem/\n\nThis video is contributed by Sephiri.",
  },
  {
    id: "yt-SsmNI3Mlp0I",
    topic: "Linked Lists",
    title: "Microsoft's Most asked Interview Questions (Part 1) | GeeksforGeeks",
    youtubeId: "SsmNI3Mlp0I",
    description: "Find Complete Interview Experience at: https://www.geeksforgeeks.org/microsofts-asked-interview-questions/  \n\nPlease Like, Comment and Share the Video among your friends.\n\nInstall our Android App:\nhttps://play.google.com/store/apps/details?id=free.programming.programming&hl=en\n\nIf you wish, translate into local language and help us reach millions of other geeks:\nhttp://www.youtube.com/timedtext_cs_panel?c=UC0RhatS1pyxInC00YKjjBqQ&tab=2\n\nFollow us on Facebook:\nhttps://www.facebook.com/GfGVideos/\n\nAnd Twitter:\nhttps://twitter.com/gfgvideos\n\n\nAlso, Subscribe if you haven't already! :)",
  },
  {
    id: "yt-Q9PIxaNGnig",
    topic: "Linked Lists",
    title: "Topological Sorting | GeeksforGeeks",
    youtubeId: "Q9PIxaNGnig",
    description: "Explanation for the article: http://www.geeksforgeeks.org/topological-sorting/\n\nRead More: https://www.geeksforgeeks.org/topological-sorting/\n\nThis video is contributed by Illuminati.",
  },
  {
    id: "yt-OexQs_cYgAQ",
    topic: "Linked Lists",
    title: "Largest Sum Contiguous Subarray | D E Shaw & Co Interview Questions | GeeksforGeeks",
    youtubeId: "OexQs_cYgAQ",
    description: "Find complete code at GeeksforGeeks article: http://www.geeksforgeeks.org/largest-sum-contiguous-subarray/\n\nPractice Problem Online Judge: http://practice.geeksforgeeks.org/problems/kadanes-algorithm/0\nThis video is contributed by Harshit Jain.",
  },
// IMPORTED_VIDEOS_END
];

export const topics = ['Linked Lists', 'Stacks & Queues', 'Trees', 'Graphs', 'Dynamic Programming'];

// Optional playlist links per topic (external YouTube playlist URLs)
export const topicPlaylists: Record<string, string> = {
  'Linked Lists': 'https://youtube.com/playlist?list=PLqM7alHXFySH41ZxzrPNj2pAYPOI8ITe7&si=DimItKuE0T8isBou',
};

export function getVideosByTopicSlug(slug: string) {
  const normalized = slug.replace(/-/g, ' ').toLowerCase();
  return videoLibrary.filter((v) => v.topic.toLowerCase() === normalized);
}

export function getTopicNameFromSlug(slug: string) {
  const normalized = slug.replace(/-/g, ' ').toLowerCase();
  const found = topics.find((t) => t.toLowerCase() === normalized);
  return found || slug;
}
