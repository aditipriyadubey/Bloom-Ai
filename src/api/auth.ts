const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'teacher';
  grade?: string;
  streak?: number;
  lessonsCompleted?: number;
  conceptsMastered?: number;
}

export async function studentSignup(data: {
  name: string;
  email: string;
  password: string;
  avatar: string;
  grade: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/student/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Signup failed' }));
    throw new Error(err.detail || 'Signup failed');
  }
  return res.json();
}

export async function studentLogin(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/student/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(err.detail || 'Invalid email or password');
  }
  return res.json();
}

export async function teacherSignup(data: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/teacher/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Signup failed' }));
    throw new Error(err.detail || 'Signup failed');
  }
  return res.json();
}

export async function teacherLogin(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/teacher/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Login failed' }));
    throw new Error(err.detail || 'Invalid email or password');
  }
  return res.json();
}

// Helper to save/read/clear auth state
export function saveAuth(data: AuthResponse) {
  localStorage.setItem('bloom_auth', JSON.stringify(data));
  // Keep legacy keys for backward compat
  localStorage.setItem('bloom_student_name', data.name);
  localStorage.setItem('bloom_student_avatar', data.avatar);
}

export function getAuth(): AuthResponse | null {
  const raw = localStorage.getItem('bloom_auth');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem('bloom_auth');
  localStorage.removeItem('bloom_student_name');
  localStorage.removeItem('bloom_student_avatar');
}
