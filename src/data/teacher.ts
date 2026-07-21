import type { TeacherDashboardData } from '../types';

export const teacherDashboardData: TeacherDashboardData = {
  stats: {
    studentsActive: 32,
    completionRate: 78,
    avgEngagement: 85,
    totalLessons: 156,
  },
  heatmap: [
    { concept: 'Fractions', needsAttention: 3, growing: 12, blooming: 17 },
    { concept: 'Algebra Basics', needsAttention: 8, growing: 15, blooming: 9 },
    { concept: 'Geometry', needsAttention: 5, growing: 18, blooming: 9 },
    { concept: 'Decimals', needsAttention: 2, growing: 8, blooming: 22 },
    { concept: 'Matter', needsAttention: 4, growing: 14, blooming: 14 },
    { concept: 'Plant Biology', needsAttention: 6, growing: 16, blooming: 10 },
    { concept: 'Physics Basics', needsAttention: 10, growing: 12, blooming: 10 },
    { concept: 'Linear Equations', needsAttention: 12, growing: 14, blooming: 6 },
  ],
  weeklyProgress: [
    { day: 'Mon', lessonsCompleted: 45, practicesDone: 62, doubtsAsked: 15 },
    { day: 'Tue', lessonsCompleted: 52, practicesDone: 70, doubtsAsked: 22 },
    { day: 'Wed', lessonsCompleted: 48, practicesDone: 58, doubtsAsked: 18 },
    { day: 'Thu', lessonsCompleted: 61, practicesDone: 78, doubtsAsked: 25 },
    { day: 'Fri', lessonsCompleted: 55, practicesDone: 72, doubtsAsked: 20 },
    { day: 'Sat', lessonsCompleted: 38, practicesDone: 45, doubtsAsked: 12 },
    { day: 'Sun', lessonsCompleted: 28, practicesDone: 35, doubtsAsked: 8 },
  ],
  mostAskedDoubts: [
    { question: 'How to add fractions with different denominators?', count: 18, concept: 'Fractions' },
    { question: 'How to solve equations with x on both sides?', count: 15, concept: 'Algebra' },
    { question: 'What is the difference between area and perimeter?', count: 12, concept: 'Geometry' },
    { question: 'Why is chlorophyll green?', count: 10, concept: 'Plant Biology' },
    { question: 'How does friction work?', count: 9, concept: 'Physics' },
  ],
  conceptDistribution: [
    { name: 'Blooming', value: 45, color: '#A8D5BA' },
    { name: 'Growing', value: 35, color: '#FFE5A0' },
    { name: 'Needs Nurturing', value: 20, color: '#FFDAB9' },
  ],
  growthInsights: [
    "🌱 12 students showed improvement in Fractions this week",
    "📈 Algebra engagement increased by 23% with the new practice format",
    "🌟 Average learning streak is now 8 days — the highest this month!",
    "💡 Students who use the AI Companion complete 40% more practice questions",
    "🎯 Geometry concepts are gaining momentum — 9 new 'blooming' students this week",
  ],
};
