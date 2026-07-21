import type { TeacherDashboardData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function getTeacherDashboard(): Promise<TeacherDashboardData> {
  const response = await fetch(`${API_BASE_URL}/api/teacher/dashboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch teacher dashboard data');
  }
  return response.json();
}

export async function generateIntervention(concept: string): Promise<{
  title: string;
  description: string;
  targetConcept: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}> {
  const response = await fetch(`${API_BASE_URL}/api/teacher/intervention`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ concept }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate intervention activity');
  }

  return response.json();
}
