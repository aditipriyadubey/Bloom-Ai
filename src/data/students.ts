import type { Student } from '../types';

export const students: Student[] = [
  {
    id: 's1',
    name: 'Aditi Sharma',
    avatar: '🌸',
    grade: 'Class 8',
    streak: 12,
    lessonsCompleted: 34,
    conceptsMastered: 18,
    joinedDate: '2026-03-15',
  },
  {
    id: 's2',
    name: 'Arjun Patel',
    avatar: '🌿',
    grade: 'Class 8',
    streak: 7,
    lessonsCompleted: 28,
    conceptsMastered: 14,
    joinedDate: '2026-04-02',
  },
  {
    id: 's3',
    name: 'Priya Reddy',
    avatar: '🌻',
    grade: 'Class 8',
    streak: 21,
    lessonsCompleted: 45,
    conceptsMastered: 22,
    joinedDate: '2026-02-10',
  },
  {
    id: 's4',
    name: 'Rohan Gupta',
    avatar: '🌱',
    grade: 'Class 8',
    streak: 5,
    lessonsCompleted: 19,
    conceptsMastered: 10,
    joinedDate: '2026-05-01',
  },
  {
    id: 's5',
    name: 'Meera Krishnan',
    avatar: '🌷',
    grade: 'Class 8',
    streak: 15,
    lessonsCompleted: 38,
    conceptsMastered: 20,
    joinedDate: '2026-03-28',
  },
];

export const currentStudent: Student = students[0];
