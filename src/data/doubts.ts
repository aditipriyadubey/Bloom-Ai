import type { Doubt, ChatMessage } from '../types';

export const suggestedQuestions: string[] = [
  "Can you explain fractions with a simple example?",
  "Why do we need algebra in real life?",
  "How does photosynthesis work?",
  "What's the difference between area and perimeter?",
  "Can you help me understand Newton's laws?",
  "What are the states of matter?",
  "How do I add fractions with different denominators?",
  "What is a variable in maths?",
];

export const doubtResponses: Record<string, string> = {
  "Can you explain fractions with a simple example?":
    "Of course! 🍕 Imagine you have a pizza cut into 4 equal slices. If you eat 1 slice, you've eaten 1/4 (one-fourth) of the pizza. The bottom number (4) tells us the total slices, and the top number (1) tells us how many you ate. Simple, right? If you ate 3 slices, that would be 3/4!",

  "Why do we need algebra in real life?":
    "Great question! 🤔 Algebra helps us solve everyday puzzles. For example: 'I have ₹500. After buying a book, I have ₹320 left. How much was the book?' That's algebra: 500 - x = 320, so x = ₹180! You also use it when figuring out how to split a restaurant bill, calculating savings goals, or even in cooking when you need to adjust recipes.",

  "How does photosynthesis work?":
    "Think of a plant as a tiny kitchen! 🌿☀️ The plant takes in water through its roots and carbon dioxide through tiny holes in its leaves (called stomata). Then, using sunlight as energy and chlorophyll (the green stuff) as the chef, it cooks up glucose (sugar) for food. The bonus? It releases oxygen for us to breathe! It's like the plant is making food and cleaning our air at the same time!",

  "What's the difference between area and perimeter?":
    "Think of it this way! 📐 **Perimeter** is like walking around the edge of a field — it's the total distance around the outside. **Area** is like the grass inside the field — it's the space covered. If you want to build a fence, you need perimeter. If you want to lay carpet, you need area! For a rectangle: Perimeter = 2×(length + width), Area = length × width.",

  "Can you help me understand Newton's laws?":
    "Let's make it fun! 🍎\n\n**1st Law (Lazy Law):** Things don't like to change. A ball won't move unless you kick it, and once rolling, it won't stop unless something (like friction) stops it.\n\n**2nd Law (The Push Law):** F = ma. Push harder → things speed up more. Heavier things are harder to push. Try pushing a bicycle vs. a car!\n\n**3rd Law (The Karma Law):** Every action has an equal and opposite reaction. Jump on a boat, and the boat moves backward!",

  "What are the states of matter?":
    "Everything around us exists in one of three main states! 🧪\n\n**Solid** (like your desk) — particles are packed tight, holds its shape\n**Liquid** (like water) — particles can slide around, takes the shape of its container\n**Gas** (like air) — particles zoom around freely, fills any space\n\nFun fact: Water is special because you see all three states every day — ice (solid), water (liquid), and steam from chai (gas)! ☕",

  "How do I add fractions with different denominators?":
    "It's like adding apples and oranges — you need to make them the same first! 🍎🍊\n\n**Step 1:** Find the LCM of the denominators\n**Step 2:** Convert both fractions\n**Step 3:** Add the numerators\n\nExample: 1/3 + 1/4\n• LCM of 3 and 4 = 12\n• 1/3 = 4/12 (multiply top and bottom by 4)\n• 1/4 = 3/12 (multiply top and bottom by 3)\n• 4/12 + 3/12 = **7/12** ✨",

  "What is a variable in maths?":
    "A variable is like a mystery box! 📦 It's a letter (usually x, y, or n) that stands for a number we don't know yet. Our job is to figure out what number is hiding inside!\n\nExample: If I say x + 3 = 7, the mystery is: 'what number plus 3 gives 7?' Open the box and... x = 4! 🎉\n\nVariables are super useful because they let us write rules that work for any number.",
};

export const defaultAIResponse = "That's a wonderful question! 🌱 Let me think about this... The best way to understand this concept is to break it down into smaller pieces. Think of it like building blocks — each piece connects to the next. Would you like me to explain it step by step with an example from everyday life?";

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg1',
    sender: 'ai',
    content: "Hi there! 🌱 I'm Bloom, your AI learning companion. I'm here to help you understand any concept better. Ask me anything — no question is too simple or too tricky! What would you like to explore today?",
    timestamp: new Date().toISOString(),
  },
];

export const mostAskedDoubts: Doubt[] = [
  {
    id: 'd1',
    question: 'How to add fractions with different denominators?',
    answer: 'Find the LCD, convert, then add numerators.',
    category: 'Fractions',
    timestamp: '2026-07-18T10:30:00Z',
  },
  {
    id: 'd2',
    question: 'What is the difference between area and perimeter?',
    answer: 'Area is the space inside, perimeter is the distance around.',
    category: 'Geometry',
    timestamp: '2026-07-17T14:20:00Z',
  },
  {
    id: 'd3',
    question: 'Why do plants need sunlight?',
    answer: 'Sunlight provides energy for photosynthesis to make food.',
    category: 'Plant Biology',
    timestamp: '2026-07-16T09:15:00Z',
  },
  {
    id: 'd4',
    question: 'How do I solve for x?',
    answer: 'Isolate x by doing opposite operations on both sides.',
    category: 'Algebra',
    timestamp: '2026-07-15T11:45:00Z',
  },
  {
    id: 'd5',
    question: 'What is Newton\'s third law?',
    answer: 'Every action has an equal and opposite reaction.',
    category: 'Physics',
    timestamp: '2026-07-14T16:00:00Z',
  },
];
