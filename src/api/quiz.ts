import type { QuizQuestion } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  const response = await fetch(`${API_BASE_URL}/api/quiz/questions`);
  if (!response.ok) {
    throw new Error('Failed to fetch quiz questions');
  }
  return response.json();
}

export async function submitQuiz(answers: number[]): Promise<{
  message: string;
  encouragement: string;
}> {
  const response = await fetch(`${API_BASE_URL}/api/quiz/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      student_id: 's1', // Default active student in the hackathon prototype
      answers: answers,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit quiz');
  }
  return response.json();
}
