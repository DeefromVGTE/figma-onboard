export interface CognitiveExercise {
  id: string;
  title: string;
  type: "pattern-recognition" | "logic-puzzle" | "prioritization" | "scenario-judgment" | "time-management";
  description: string;
  task: any;
  correctAnswer?: any;
  timeLimit?: number; // in seconds
}

export const cognitiveExercises: CognitiveExercise[] = [
  {
    id: "pattern-1",
    title: "Code Pattern Recognition",
    type: "pattern-recognition",
    description: "Identify which code snippet follows a different pattern than the others",
    task: {
      patterns: [
        {
          id: "a",
          code: `function fetchUser(id) {\n  return api.get(\`/users/\${id}\`);\n}`
        },
        {
          id: "b",
          code: `function deleteUser(id) {\n  return api.delete(\`/users/\${id}\`);\n}`
        },
        {
          id: "c",
          code: `function updateUser(id, data) {\n  api.put(\`/users/\${id}\`, data);\n  return true;\n}`
        },
        {
          id: "d",
          code: `function createUser(data) {\n  return api.post('/users', data);\n}`
        }
      ],
      question: "Which function doesn't follow the same pattern as the others?"
    },
    correctAnswer: "c"
  },
  {
    id: "logic-1",
    title: "Bug Priority Logic",
    type: "logic-puzzle",
    description: "Solve a logic puzzle about bug prioritization",
    task: {
      scenario: "You receive 3 bug reports:\n\n1. Login page crashes for 5% of users\n2. Typo in footer copyright year\n3. Payment processing timeout for all users\n\nConstraints:\n- You can only fix 2 bugs today\n- Bug #3 requires 4 hours, Bug #1 requires 3 hours, Bug #2 requires 30 minutes\n- You have 5 hours available today\n- Your manager said 'user-facing payment issues are critical'\n- The team lead mentioned 'we should maintain a professional appearance'",
      question: "Which bugs should you prioritize and in what order?",
      options: [
        { id: "a", text: "Fix Bug #3 (payment) first, then Bug #2 (typo)" },
        { id: "b", text: "Fix Bug #3 (payment) first, then Bug #1 (login)" },
        { id: "c", text: "Fix Bug #1 (login) and Bug #2 (typo)" },
        { id: "d", text: "Fix Bug #1 (login) first, then Bug #3 (payment)" }
      ]
    },
    correctAnswer: "a"
  },
  {
    id: "priority-1",
    title: "Task Prioritization Matrix",
    type: "prioritization",
    description: "Drag and drop tasks into the correct priority quadrants",
    task: {
      tasks: [
        { id: 1, text: "Production server down", urgency: "high", importance: "high" },
        { id: 2, text: "Update team documentation", urgency: "low", importance: "high" },
        { id: 3, text: "Fix typo in email template", urgency: "low", importance: "low" },
        { id: 4, text: "Client demo in 1 hour - prep needed", urgency: "high", importance: "high" },
        { id: 5, text: "Respond to non-urgent Slack messages", urgency: "high", importance: "low" },
        { id: 6, text: "Plan next sprint architecture", urgency: "low", importance: "high" }
      ],
      quadrants: {
        "urgent-important": "Do First",
        "not-urgent-important": "Schedule",
        "urgent-not-important": "Delegate",
        "not-urgent-not-important": "Eliminate"
      }
    },
    correctAnswer: {
      "urgent-important": [1, 4],
      "not-urgent-important": [2, 6],
      "urgent-not-important": [5],
      "not-urgent-not-important": [3]
    }
  },
  {
    id: "scenario-1",
    title: "Team Conflict Resolution",
    type: "scenario-judgment",
    description: "Choose the best response to a workplace scenario",
    task: {
      scenario: "During a code review, a senior developer harshly criticizes your implementation approach in front of the entire team, saying 'This is completely wrong and shows a lack of understanding of basic principles.' The code works and passes all tests, but uses a different pattern than the team usually follows.",
      question: "What's the most professional response?",
      options: [
        {
          id: "a",
          text: "Defend your approach immediately and point out that the code works correctly",
          analysis: "Confrontational - may escalate tension"
        },
        {
          id: "b",
          text: "Thank them for the feedback, ask for specific guidance on the preferred pattern, and offer to refactor",
          analysis: "Professional and collaborative"
        },
        {
          id: "c",
          text: "Stay silent during the meeting, then message them privately later to express how their tone made you feel",
          analysis: "Avoidant - doesn't address the technical issue"
        },
        {
          id: "d",
          text: "Ask the team lead to intervene and mediate the discussion",
          analysis: "Escalates unnecessarily"
        }
      ]
    },
    correctAnswer: "b"
  },
  {
    id: "time-1",
    title: "Sprint Time Management",
    type: "time-management",
    description: "Allocate your time effectively across multiple tasks",
    task: {
      scenario: "You have 8 hours today. Allocate time across these tasks:",
      tasks: [
        { id: 1, name: "Feature development (critical)", estimatedTime: 4, priority: "high" },
        { id: 2, name: "Code review for teammate", estimatedTime: 1, priority: "medium" },
        { id: 3, name: "Bug fixes (minor)", estimatedTime: 2, priority: "low" },
        { id: 4, name: "Team standup meeting", estimatedTime: 0.5, priority: "high", required: true },
        { id: 5, name: "Update documentation", estimatedTime: 1.5, priority: "medium" },
        { id: 6, name: "Research new library", estimatedTime: 2, priority: "low" }
      ],
      question: "Drag the time slider for each task to allocate your 8 hours. Some tasks may get 0 hours.",
      totalHours: 8
    },
    correctAnswer: {
      // Optimal allocation prioritizes critical work and required meetings
      "1": 4,    // Feature development - high priority
      "2": 1,    // Code review - team collaboration
      "3": 1,    // Bug fixes - partial time
      "4": 0.5,  // Standup - required
      "5": 1,    // Documentation - important
      "6": 0.5   // Research - minimal time
    }
  }
];
