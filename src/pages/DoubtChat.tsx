import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles, Lightbulb } from 'lucide-react';
import { suggestedQuestions, initialMessages } from '../data/doubts';
import type { ChatMessage } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are Bloom, an AI learning companion for BloomAI — an adaptive microlearning platform for Indian school students (Class 6-8).

Your personality:
- Warm, patient, and encouraging
- You use simple language with relatable Indian examples (chai, cricket, festivals, everyday life)
- You NEVER label students as weak, below-level, or struggling
- You use emojis sparingly but warmly (🌱, 🌸, 💡, ✨)
- You always identify the ROOT CONCEPT behind a question before explaining

Your approach:
1. First, identify the core concept the student is confused about
2. Ask a gentle guiding question (Socratic method) before giving the full answer
3. Then explain step-by-step with real-life examples
4. Keep responses concise (under 200 words) for microlearning
5. End with encouragement

Subjects: Mathematics (Fractions, Algebra, Geometry) and Science (Matter, Plant Biology, Physics)
Curriculum: NCERT-aligned for Class 6-8

IMPORTANT: Never mention grades, scores, rankings, or levels. Focus on growth and understanding.`;

async function callGeminiAPI(messages: ChatMessage[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.error('VITE_GEMINI_API_KEY is not set in .env');
    return "I'm not configured yet — please set up the API key. 🔧";
  }

  try {
    const conversationHistory = messages.map(m => ({
      role: m.sender === 'ai' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Gemini API ${response.status}:`, errorBody);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having a small hiccup! 🌿 Could you try asking again?";
  } catch (error) {
    console.error('Gemini API error:', error);
    return "Oops! I need a moment to think. 🌱 Could you try asking again in a few seconds?";
  }
}

export default function DoubtChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([...initialMessages]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    // Call Gemini API
    const aiResponse = await callGeminiAPI(updatedMessages);

    const aiMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'ai',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-pastel-green/20">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-leaf-dark" />
          AI Doubt Companion 🌱
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Ask anything — no question is too simple! I'm here to help you understand.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] sm:max-w-[75%] ${
              msg.sender === 'student'
                ? 'bg-leaf-dark text-white rounded-2xl rounded-br-md'
                : 'bg-warm-white border border-pastel-green/20 rounded-2xl rounded-bl-md shadow-soft'
            } px-4 py-3`}>
              {msg.sender === 'ai' && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-leaf-dark" />
                  <span className="text-xs font-semibold text-leaf-dark">Bloom</span>
                </div>
              )}
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-warm-white border border-pastel-green/20 rounded-2xl rounded-bl-md px-5 py-4 shadow-soft">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-leaf-dark" />
                <span className="text-xs font-semibold text-leaf-dark">Bloom is thinking...</span>
              </div>
              <div className="flex gap-1.5">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-4 sm:px-6 pb-2">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-medium text-gray-500">Try asking:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 4).map((q, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => sendMessage(q)}
                className="text-xs bg-pastel-green/10 text-leaf-dark px-3 py-1.5 rounded-full hover:bg-pastel-green/20 transition-colors border border-pastel-green/20"
              >
                {q}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 border-t border-pastel-green/20 bg-warm-white pb-24 lg:pb-6">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your lessons..."
            disabled={isTyping}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-cream/50 focus:border-pastel-green focus:ring-2 focus:ring-pastel-green/20 outline-none transition-all text-sm disabled:opacity-50"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || isTyping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-leaf-dark text-white flex items-center justify-center hover:bg-sage transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
