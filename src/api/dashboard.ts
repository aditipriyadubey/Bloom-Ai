import { delay } from '../lib/utils';
import { currentStudent } from '../data/students';
import { achievements } from '../data/achievements';
import { todaysJourney } from '../data/quiz';
import type { DashboardData } from '../types';

export async function getDashboard(): Promise<DashboardData> {
  await delay(300);
  return {
    student: currentStudent,
    todaysJourney,
    achievements,
    recentActivity: [
      { action: 'Completed "Adding Fractions" lesson', time: '2 hours ago', icon: '📖' },
      { action: 'Earned "Practice Champion" badge', time: '3 hours ago', icon: '🏆' },
      { action: 'Asked 2 questions to AI Companion', time: '5 hours ago', icon: '💬' },
      { action: 'Completed Practice: Fractions', time: 'Yesterday', icon: '✅' },
      { action: 'Started "Algebra Basics" journey', time: 'Yesterday', icon: '🚀' },
    ],
    quickStats: [
      { label: 'Lessons Completed', value: currentStudent.lessonsCompleted, icon: '📚' },
      { label: 'Concepts Mastered', value: currentStudent.conceptsMastered, icon: '🌸' },
      { label: 'Learning Streak', value: `${currentStudent.streak} days`, icon: '🔥' },
      { label: 'Badges Earned', value: achievements.filter(a => a.earned).length, icon: '⭐' },
    ],
  };
}
