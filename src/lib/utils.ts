import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function getRandomEncouragement(): string {
  const messages = [
    "You're doing great! 🌟",
    "Keep blooming! 🌸",
    "Amazing progress! 🌿",
    "You're on a roll! 🎯",
    "Wonderful effort! ✨",
    "Keep growing! 🌱",
    "You're shining! ☀️",
    "Fantastic work! 🌻",
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}
