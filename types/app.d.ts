export type ModuleType = 'technical' | 'business' | 'process';

export interface Module {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  duration: number; // in minutes
  progress?: number; // 0-100
  chapters: Chapter[];
  prerequisites?: string[]; // module IDs
  certification?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Chapter {
  id: string;
  title: string;
  content: ChapterContent[];
  quiz?: Quiz;
}

export interface ChapterContent {
  type: 'text' | 'video' | 'diagram' | 'simulation';
  content: string;
  duration?: number; // in minutes
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'practical';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  moduleId: string;
  issueDate: Date;
  expiryDate?: Date;
  score: number;
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  progress: number;
  startDate: Date;
  lastAccessed: Date;
  completed: boolean;
  timeSpent: number; // in minutes
  quizScores: Record<string, number>;
}

export interface UserProfile extends User {
  role: 'student' | 'leader' | 'admin';
  department?: string;
  certificates: Certificate[];
  progress: UserProgress[];
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
    language: 'cs' | 'en';
  };
}
