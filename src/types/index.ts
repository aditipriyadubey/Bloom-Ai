// ============================================================
// BloomAI — TypeScript Types
// ============================================================

export interface Student {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  streak: number;
  lessonsCompleted: number;
  conceptsMastered: number;
  joinedDate: string;
}

export interface Lesson {
  id: string;
  title: string;
  concept: string;
  subject: string;
  duration: string;
  content: string;
  visualExample: string;
  practiceQuestions: PracticeQuestion[];
  hints: string[];
  order: number;
}

export interface ConceptNode {
  id: string;
  name: string;
  subject: string;
  status: 'bloomed' | 'current' | 'bud';
  x: number;
  y: number;
  branch: string;
  lessonId?: string;
  connections: string[];
  score?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  encouragement: string;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  category: string;
}

export interface Doubt {
  id: string;
  question: string;
  answer: string;
  category: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'ai';
  content: string;
  timestamp: string;
}

export interface JourneyStep {
  id: string;
  title: string;
  type: 'lesson' | 'practice' | 'quiz' | 'break';
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  concept: string;
  encouragement: string;
}

export interface TeacherStats {
  studentsActive: number;
  completionRate: number;
  avgEngagement: number;
  totalLessons: number;
}

export interface ConceptHeatmap {
  concept: string;
  needsAttention: number;
  growing: number;
  blooming: number;
}

export interface WeeklyProgress {
  day: string;
  lessonsCompleted: number;
  practicesDone: number;
  doubtsAsked: number;
}

export interface TeacherDashboardData {
  stats: TeacherStats;
  heatmap: ConceptHeatmap[];
  weeklyProgress: WeeklyProgress[];
  mostAskedDoubts: { question: string; count: number; concept: string }[];
  conceptDistribution: { name: string; value: number; color: string }[];
  growthInsights: string[];
}

export interface DashboardData {
  student: Student;
  todaysJourney: JourneyStep[];
  achievements: Achievement[];
  recentActivity: { action: string; time: string; icon: string }[];
  quickStats: { label: string; value: string | number; icon: string }[];
}
