const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function submitPractice(questionId: string, answer: number): Promise<{
  correct: boolean;
  message: string;
  newScore?: number;
  newStatus?: string;
}> {
  const response = await fetch(`${API_BASE_URL}/api/practice/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      student_id: 's1',
      question_id: questionId,
      answer: answer,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit practice answer');
  }

  return response.json();
}
