// Real-world technical challenges for skills assessment

export const technicalChallenges = [
  {
    id: "array-manipulation",
    title: "Array Manipulation",
    description: "Write a function that removes duplicates from an array while preserving order",
    difficulty: "easy" as const,
    language: "JavaScript",
    starterCode: `// Write a function called 'solve' that takes an array and returns a new array with duplicates removed
// Example: solve([1, 2, 2, 3, 4, 4, 5]) should return [1, 2, 3, 4, 5]

function solve(arr) {
  // Your code here
  
}`,
    testCases: [
      {
        input: [1, 2, 2, 3, 4, 4, 5],
        expectedOutput: [1, 2, 3, 4, 5],
        description: "Basic case with duplicates"
      },
      {
        input: [1, 1, 1, 1],
        expectedOutput: [1],
        description: "All duplicates"
      },
      {
        input: [1, 2, 3, 4, 5],
        expectedOutput: [1, 2, 3, 4, 5],
        description: "No duplicates"
      },
      {
        input: [],
        expectedOutput: [],
        description: "Empty array"
      }
    ]
  },
  {
    id: "string-palindrome",
    title: "Palindrome Checker",
    description: "Determine if a string is a palindrome (ignoring spaces, punctuation, and case)",
    difficulty: "easy" as const,
    language: "JavaScript",
    starterCode: `// Write a function called 'solve' that checks if a string is a palindrome
// Example: solve("A man, a plan, a canal: Panama") should return true

function solve(str) {
  // Your code here
  
}`,
    testCases: [
      {
        input: "racecar",
        expectedOutput: true,
        description: "Simple palindrome"
      },
      {
        input: "A man, a plan, a canal: Panama",
        expectedOutput: true,
        description: "Palindrome with spaces and punctuation"
      },
      {
        input: "hello",
        expectedOutput: false,
        description: "Not a palindrome"
      },
      {
        input: "",
        expectedOutput: true,
        description: "Empty string"
      }
    ]
  },
  {
    id: "data-transformation",
    title: "Data Transformation",
    description: "Transform an array of objects into a grouped structure",
    difficulty: "medium" as const,
    language: "JavaScript",
    starterCode: `// Write a function called 'solve' that groups objects by a specified key
// Example: 
// solve([{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}, {type: 'veg', name: 'carrot'}], 'type')
// should return: {fruit: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}], veg: [{type: 'veg', name: 'carrot'}]}

function solve(arr, key) {
  // Your code here
  
}`,
    testCases: [
      {
        input: [[{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}, {type: 'veg', name: 'carrot'}], 'type'],
        expectedOutput: {
          fruit: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}],
          veg: [{type: 'veg', name: 'carrot'}]
        },
        description: "Group by type"
      },
      {
        input: [[{age: 25, name: 'John'}, {age: 30, name: 'Jane'}, {age: 25, name: 'Bob'}], 'age'],
        expectedOutput: {
          25: [{age: 25, name: 'John'}, {age: 25, name: 'Bob'}],
          30: [{age: 30, name: 'Jane'}]
        },
        description: "Group by numeric key"
      }
    ]
  },
  {
    id: "async-api-handler",
    title: "Async API Handler",
    description: "Implement retry logic for failed API calls with exponential backoff",
    difficulty: "medium" as const,
    language: "JavaScript",
    starterCode: `// Write a function called 'solve' that retries a failed async operation
// It should take a function and max retries, and use exponential backoff (1s, 2s, 4s, etc.)
// For this test, the function will simulate API calls

async function solve(asyncFn, maxRetries) {
  // Your code here
  
}`,
    testCases: [
      {
        input: [
          async () => { throw new Error("fail"); },
          0
        ],
        expectedOutput: "error",
        description: "No retries, should fail"
      },
      {
        input: [
          (() => {
            let attempts = 0;
            return async () => {
              attempts++;
              if (attempts < 3) throw new Error("fail");
              return "success";
            };
          })(),
          3
        ],
        expectedOutput: "success",
        description: "Should succeed after retries"
      }
    ]
  },
  {
    id: "algorithm-optimization",
    title: "Find Two Sum",
    description: "Find two numbers in an array that add up to a target sum (optimize for O(n) time)",
    difficulty: "medium" as const,
    language: "JavaScript",
    starterCode: `// Write a function called 'solve' that finds two numbers that sum to target
// Return indices of the two numbers, or null if no solution exists
// Example: solve([2, 7, 11, 15], 9) should return [0, 1]

function solve(nums, target) {
  // Your code here
  
}`,
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        expectedOutput: [0, 1],
        description: "Basic case"
      },
      {
        input: [[3, 2, 4], 6],
        expectedOutput: [1, 2],
        description: "Non-adjacent numbers"
      },
      {
        input: [[3, 3], 6],
        expectedOutput: [0, 1],
        description: "Same number twice"
      },
      {
        input: [[1, 2, 3], 10],
        expectedOutput: null,
        description: "No solution"
      }
    ]
  },
  {
    id: "tree-traversal",
    title: "Binary Tree Traversal",
    description: "Implement breadth-first search on a binary tree",
    difficulty: "hard" as const,
    language: "JavaScript",
    starterCode: `// Write a function called 'solve' that performs BFS on a binary tree
// The tree is represented as: {value: number, left?: node, right?: node}
// Return values in level-order: [[root], [level1 nodes], [level2 nodes], ...]

function solve(root) {
  // Your code here
  
}`,
    testCases: [
      {
        input: {value: 1, left: {value: 2}, right: {value: 3}},
        expectedOutput: [[1], [2, 3]],
        description: "Simple tree"
      },
      {
        input: {
          value: 1,
          left: {value: 2, left: {value: 4}, right: {value: 5}},
          right: {value: 3}
        },
        expectedOutput: [[1], [2, 3], [4, 5]],
        description: "Unbalanced tree"
      },
      {
        input: null,
        expectedOutput: [],
        description: "Empty tree"
      }
    ]
  }
];

export const learningExercises = [
  {
    id: "visual-learning-1",
    type: "visual-pattern" as const,
    title: "Pattern Recognition",
    instruction: "This exercise helps us understand how you process visual information",
    task: {
      sequence: [
        "bg-blue-500 rounded-full",
        "bg-green-500 rounded-lg",
        "bg-red-500 rounded-full",
        "bg-purple-500 rounded-lg"
      ],
      options: [
        "bg-blue-500 rounded-full",
        "bg-yellow-500 rounded-lg",
        "bg-green-500 rounded-full",
        "bg-orange-500 rounded-lg"
      ]
    },
    correctAnswer: 0
  },
  {
    id: "problem-solving-1",
    type: "problem-solving" as const,
    title: "Approach Analysis",
    instruction: "Break down how you would solve this problem. The AI will observe your thought process.",
    task: {
      problem: "You need to build a user authentication system for a web application. The system must be secure, scalable, and user-friendly. How would you approach this?"
    },
    correctAnswer: [
      "Research industry best practices and security standards",
      "Choose authentication method (JWT, sessions, OAuth)",
      "Design database schema for users and credentials",
      "Implement password hashing and salting",
      "Add rate limiting and brute force protection",
      "Create user registration and login flows",
      "Implement password reset functionality",
      "Add multi-factor authentication option",
      "Test security vulnerabilities",
      "Document the authentication flow"
    ]
  },
  {
    id: "interactive-tutorial-1",
    type: "interactive-tutorial" as const,
    title: "Learning Through Interaction",
    instruction: "Go through this mini tutorial and answer questions. We'll observe how you engage with new material.",
    task: {
      pages: [
        {
          title: "Introduction to API Design",
          content: `<p>REST APIs use HTTP methods to perform operations:</p>
            <ul class="list-disc ml-6 space-y-1">
              <li><strong>GET</strong> - Retrieve data</li>
              <li><strong>POST</strong> - Create new data</li>
              <li><strong>PUT</strong> - Update existing data</li>
              <li><strong>DELETE</strong> - Remove data</li>
            </ul>`,
          question: "Which HTTP method would you use to update a user's profile?",
          options: ["GET", "POST", "PUT", "DELETE"]
        },
        {
          title: "RESTful Endpoints",
          content: `<p>Well-designed REST endpoints follow these patterns:</p>
            <ul class="list-disc ml-6 space-y-1">
              <li><code>/users</code> - Collection of users</li>
              <li><code>/users/:id</code> - Specific user</li>
              <li><code>/users/:id/posts</code> - User's posts</li>
            </ul>`,
          question: "What endpoint would retrieve all posts for user with ID 123?",
          options: [
            "/posts/user/123",
            "/users/123/posts",
            "/get-user-posts?id=123",
            "/api/posts?userId=123"
          ]
        },
        {
          title: "Status Codes",
          content: `<p>HTTP status codes communicate the result:</p>
            <ul class="list-disc ml-6 space-y-1">
              <li><strong>200</strong> - Success</li>
              <li><strong>201</strong> - Created</li>
              <li><strong>400</strong> - Bad Request</li>
              <li><strong>404</strong> - Not Found</li>
              <li><strong>500</strong> - Server Error</li>
            </ul>`,
          question: "What status code should you return when a user successfully creates a new post?",
          options: ["200", "201", "204", "301"]
        }
      ]
    },
    correctAnswer: {
      0: "PUT",
      1: "/users/123/posts",
      2: "201"
    }
  },
  {
    id: "debugging-1",
    type: "debugging" as const,
    title: "Bug Detection Exercise",
    instruction: "Find all the bugs in this code. The AI will observe how you approach debugging.",
    task: {
      code: `function calculateTotal(items) {
  let total = 0;
  
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  
  const tax = total * 0.08;
  const discount = total > 100 ? 10 : 0;
  
  return total + tax - discount;
}`
    },
    correctAnswer: [3] // Line 3: should be i < items.length, not <=
  },
  {
    id: "visual-learning-2",
    type: "visual-pattern" as const,
    title: "Sequence Completion",
    instruction: "Complete the logical sequence",
    task: {
      sequence: [
        "w-4 h-4 bg-cyan-500",
        "w-6 h-6 bg-cyan-500",
        "w-8 h-8 bg-cyan-500",
        "w-10 h-10 bg-cyan-500"
      ],
      options: [
        "w-10 h-10 bg-cyan-500",
        "w-12 h-12 bg-cyan-500",
        "w-8 h-8 bg-cyan-500",
        "w-14 h-14 bg-purple-500"
      ]
    },
    correctAnswer: 1
  }
];
