import type { Lesson } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function getLessons(): Promise<Lesson[]> {
  const response = await fetch(`${API_BASE_URL}/api/lessons`);
  if (!response.ok) {
    throw new Error('Failed to fetch lessons');
  }
  return response.json();
}

export async function getLesson(id: string): Promise<Lesson | undefined> {
  const response = await fetch(`${API_BASE_URL}/api/lessons/${id}?student_id=s1`);
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch lesson ${id}`);
  }
  return response.json();
}
