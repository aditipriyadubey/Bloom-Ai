import type { ChatMessage } from '../types';
import { doubtResponses, defaultAIResponse } from '../data/doubts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function submitDoubt(question: string): Promise<ChatMessage> {
  // Fire and forget log to backend DB so teacher dashboard updates
  try {
    fetch(`${API_BASE_URL}/api/doubts/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: 's1',
        question: question,
        concept_id: 'c6',
      }),
    }).catch(() => {});
  } catch (e) {
    // Ignore offline log error
  }

  const response = doubtResponses[question] || defaultAIResponse;
  return {
    id: `msg-${Date.now()}`,
    sender: 'ai',
    content: response,
    timestamp: new Date().toISOString(),
  };
}
