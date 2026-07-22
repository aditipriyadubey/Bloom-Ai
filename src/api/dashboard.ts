import { delay } from '../lib/utils';
import { currentStudent } from '../data/students';
import { achievements } from '../data/achievements';
import { todaysJourney } from '../data/quiz';
import type { DashboardData } from '../types';

export async function getDashboard(): Promise<DashboardData> {
  await delay(300);

  // Override with user's login choices from localStorage
  const student = {
    ...currentStudent,
    name: localStorage.getItem('bloom_student_name') || currentStudent.name,
    avatar: localStorage.getItem('bloom_student_avatar') || currentStudent.avatar,
  };

  return {
    student,
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
      { label: 'Lessons Completed', value: student.lessonsCompleted, icon: '📚' },
      { label: 'Concepts Mastered', value: student.conceptsMastered, icon: '🌸' },
      { label: 'Learning Streak', value: `${student.streak} days`, icon: '🔥' },
      { label: 'Badges Earned', value: achievements.filter(a => a.earned).length, icon: '⭐' },
    ],
  };
}

