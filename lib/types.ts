export type AppRole = "STUDENT" | "TRAINER" | "ADMIN";
export type AssessmentCategory = "Screening Test" | "Aptitude";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface StudentProfile {
  name: string;
  email: string;
  organization: string;
  batch: string;
  studentId: string;
  points: number;
  role: AppRole;
}

export interface TierDefinition {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  description: string;
}

export interface AssessmentRecord {
  id: string;
  title: string;
  category: AssessmentCategory;
  count: number;
  description: string;
  status: "Open" | "Scheduled" | "Completed";
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  department: string;
  points: number;
  level: number;
  completedAssessments: number;
  codingScore: number;
  weeklyProgress: number;
}

export interface CourseRecord {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  status: "Continue" | "Completed" | "Not started";
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  solved: boolean;
  statement: string;
  input: string;
  output: string;
  constraints: string;
  examples: Array<{ input: string; output: string; explanation: string }>;
}

export interface TrainingRecord {
  id: string;
  title: string;
  trainer: string;
  date: string;
  duration: string;
  status: "Registered" | "Available" | "Cancelled";
}

export interface LsrwScoreboard {
  listening: number;
  speaking: number;
  reading: number;
  writing: number;
}

export interface TypingSessionResult {
  duration: number;
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  progress: number;
}
