import type {
  AssessmentRecord,
  BlogPost,
  CodingProblem,
  CourseRecord,
  LeaderboardEntry,
  LsrwScoreboard,
  StudentProfile,
  TierDefinition,
  TrainingRecord,
  TypingSessionResult,
} from "@/lib/types";

export const studentProfile: StudentProfile = {
  name: "UDAY REDDY YASA",
  email: "student@university.edu",
  organization: "University of Technology",
  batch: "2028 Batch",
  studentId: "UR-2028-104",
  points: 9,
  role: "STUDENT",
};

export const tierDefinitions: TierDefinition[] = [
  { id: "rookie", name: "ROOKIE", minPoints: 0, maxPoints: 99, color: "#a78bfa", description: "Foundation stage" },
  { id: "explorer", name: "EXPLORER", minPoints: 100, maxPoints: 249, color: "#60a5fa", description: "Learning momentum" },
  { id: "achiever", name: "ACHIEVER", minPoints: 250, maxPoints: 499, color: "#34d399", description: "Consistent progress" },
  { id: "specialist", name: "SPECIALIST", minPoints: 500, maxPoints: 899, color: "#fbbf24", description: "Applied mastery" },
  { id: "master", name: "MASTER", minPoints: 900, maxPoints: 1499, color: "#fb7185", description: "High performance" },
  { id: "elite", name: "ELITE", minPoints: 1500, maxPoints: 9999, color: "#f97316", description: "Top performer" },
];

export const assessments: AssessmentRecord[] = [
  { id: "coding-two-sum", title: "Coding Assessment: Two Sum", category: "Screening Test", count: 1, description: "Write a function that returns the indices of two numbers that add up to a target.", status: "Open" },
  { id: "campus-2028", title: "2028_Campus_Assessments", category: "Screening Test", count: 28, description: "Campus aptitude and communication screening tests.", status: "Open" },
  { id: "qalr-2028", title: "QALR_2028", category: "Screening Test", count: 12, description: "Quantitative, analytical and language reasoning bundle.", status: "Scheduled" },
  { id: "verbal-screening", title: "Verbal Screening Round", category: "Screening Test", count: 6, description: "Reading comprehension and verbal reasoning practice.", status: "Open" },
  { id: "coding-screening", title: "Coding Screening Round", category: "Screening Test", count: 9, description: "Problem solving and coding basics.", status: "Open" },
  { id: "aptitude-weekly", title: "Aptitude Weekly Assessments", category: "Aptitude", count: 20, description: "Weekly aptitude drills for speed and accuracy.", status: "Open" },
  { id: "aptitude-mock", title: "Aptitude Mock Series", category: "Aptitude", count: 8, description: "Mock test series with detailed analytics.", status: "Completed" },
];

export const leaderboard: LeaderboardEntry[] = [
  { id: "ananya", name: "Ananya Rao", department: "CSE", points: 480, level: 5, completedAssessments: 18, codingScore: 92, weeklyProgress: 86 },
  { id: "rohit", name: "Rohit Sharma", department: "ECE", points: 455, level: 5, completedAssessments: 15, codingScore: 90, weeklyProgress: 83 },
  { id: "meera", name: "Meera Nair", department: "IT", points: 410, level: 4, completedAssessments: 14, codingScore: 88, weeklyProgress: 79 },
  { id: "karthik", name: "Karthik Iyer", department: "CSE", points: 360, level: 4, completedAssessments: 12, codingScore: 85, weeklyProgress: 74 },
  { id: "sneha", name: "Sneha Patel", department: "EEE", points: 290, level: 3, completedAssessments: 10, codingScore: 80, weeklyProgress: 72 },
  { id: "arjun", name: "Arjun Verma", department: "MECH", points: 210, level: 3, completedAssessments: 9, codingScore: 74, weeklyProgress: 66 },
  { id: "divya", name: "Divya Menon", department: "CSE", points: 150, level: 2, completedAssessments: 7, codingScore: 68, weeklyProgress: 62 },
  { id: "vikram", name: "Vikram Singh", department: "CSE", points: 96, level: 2, completedAssessments: 6, codingScore: 60, weeklyProgress: 54 },
  { id: "pooja", name: "Pooja Das", department: "IT", points: 40, level: 1, completedAssessments: 4, codingScore: 51, weeklyProgress: 45 },
  { id: "uday", name: "UDAY REDDY YASA", department: "CSE", points: 9, level: 1, completedAssessments: 1, codingScore: 42, weeklyProgress: 28 },
];

export const courses: CourseRecord[] = [
  { id: "dsa", title: "Data Structures & Algorithms", instructor: "Prof. R. Kumar", category: "Core", progress: 62, lessonsCompleted: 18, totalLessons: 29, status: "Continue" },
  { id: "web-dev", title: "Web Development", instructor: "Dr. S. Lakshmi", category: "Frontend", progress: 35, lessonsCompleted: 9, totalLessons: 25, status: "Continue" },
  { id: "dbms", title: "Database Management", instructor: "Prof. A. Reddy", category: "Database", progress: 80, lessonsCompleted: 16, totalLessons: 20, status: "Continue" },
  { id: "java", title: "Java Programming", instructor: "Dr. M. Rao", category: "Language", progress: 10, lessonsCompleted: 3, totalLessons: 22, status: "Not started" },
  { id: "python", title: "Python Programming", instructor: "Ms. K. Nair", category: "Language", progress: 54, lessonsCompleted: 12, totalLessons: 22, status: "Continue" },
  { id: "ai", title: "Artificial Intelligence", instructor: "Dr. A. Singh", category: "AI", progress: 91, lessonsCompleted: 20, totalLessons: 22, status: "Completed" },
];

export const trainings: TrainingRecord[] = [
  { id: "ml-bootcamp", title: "Machine Learning Bootcamp", trainer: "Dr. N. Sen", date: "Nov 18, 2026", duration: "3 weeks", status: "Registered" },
  { id: "cyber-security", title: "Cybersecurity Fundamentals", trainer: "Ms. V. Rao", date: "Nov 22, 2026", duration: "2 days", status: "Available" },
  { id: "cloud-architect", title: "Cloud Architecture Workshop", trainer: "Mr. T. Shah", date: "Dec 02, 2026", duration: "1 week", status: "Available" },
];

export const blogs: BlogPost[] = [
  { id: "campus-screening", title: "How to prepare for campus screening tests", category: "Placements", author: "Career Cell", publishedAt: "Sep 12, 2026", readTime: "5 min read" },
  { id: "big-o", title: "Understanding Big-O without the math", category: "Algorithms", author: "Prof. G. Menon", publishedAt: "Aug 21, 2026", readTime: "7 min read" },
  { id: "consistent-coders", title: "Ten habits of consistent coders", category: "Career", author: "Ananya Rao", publishedAt: "Aug 02, 2026", readTime: "4 min read" },
  { id: "sql-joins", title: "SQL joins explained with examples", category: "Databases", author: "Dr. S. Iyer", publishedAt: "Jul 15, 2026", readTime: "6 min read" },
];

export const codeProblems: CodingProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Arrays", "Hashing"],
    solved: true,
    statement: "Given an array of integers nums and a target, return indices of the two numbers such that they add up to the target.",
    input: "nums = [2,7,11,15], target = 9",
    output: "[0,1]",
    constraints: "2 <= nums.length <= 10^4; -10^9 <= nums[i] <= 10^9",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "2 + 7 = 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "2 + 4 = 6" },
    ],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Medium",
    tags: ["Stack", "Strings"],
    solved: false,
    statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    input: "s = '{[()]}'",
    output: "true",
    constraints: "1 <= s.length <= 10^4",
    examples: [
      { input: "s = '{[()]}'", output: "true", explanation: "All brackets are balanced." },
      { input: "s = '([)]'", output: "false", explanation: "The closing order is invalid." },
    ],
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Hard",
    tags: ["Sorting", "Intervals"],
    solved: false,
    statement: "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.",
    input: "[[1,3],[2,6],[8,10],[15,18]]",
    output: "[[1,6],[8,10],[15,18]]",
    constraints: "1 <= intervals.length <= 10^4",
    examples: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "The first two intervals overlap and are merged." },
    ],
  },
];

export const lsrwScores: LsrwScoreboard = {
  listening: 82,
  speaking: 76,
  reading: 88,
  writing: 81,
};

export const typingSession: TypingSessionResult = {
  duration: 60,
  wpm: 34,
  accuracy: 93,
  correctChars: 204,
  incorrectChars: 16,
  progress: 69,
};
