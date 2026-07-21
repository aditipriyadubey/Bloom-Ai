import type { ConceptNode } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function getLearningTree(): Promise<ConceptNode[]> {
  const response = await fetch(`${API_BASE_URL}/api/tree?student_id=s1`);
  if (!response.ok) {
    throw new Error('Failed to fetch learning tree concepts');
  }
  return response.json();
}
