import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, ArrowRight } from 'lucide-react';
import BloomButton from '../components/ui/BloomButton';
import { useState } from 'react';

const avatars = [
  { emoji: '🌸', name: 'Cherry Blossom' },
  { emoji: '🌿', name: 'Fern' },
  { emoji: '🌻', name: 'Sunflower' },
  { emoji: '🌱', name: 'Sprout' },
  { emoji: '🌷', name: 'Tulip' },
  { emoji: '🦋', name: 'Butterfly' },
];

export default function Login() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [name, setName] = useState('');

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Sprout className="w-8 h-8 text-leaf-dark" />
          <span className="font-heading text-2xl font-bold text-leaf-dark">
            Bloom<span className="text-coral">AI</span>
          </span>
        </Link>

        <div className="bg-warm-white rounded-3xl shadow-card p-8 border border-pastel-green/20">
          <h1 className="font-heading text-2xl font-bold text-gray-900 text-center mb-2">
            Welcome, Explorer! 🌱
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Choose your avatar and start your learning journey
          </p>

          {/* Avatar Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-3">Pick your avatar</label>
            <div className="grid grid-cols-6 gap-2">
              {avatars.map((avatar, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(i)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                    selectedAvatar === i
                      ? 'bg-pastel-green/30 ring-2 ring-leaf-dark shadow-md'
                      : 'bg-gray-50 hover:bg-pastel-green/10'
                  }`}
                >
                  {avatar.emoji}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-600 mb-2">
              What should we call you?
            </label>
            <input
              id="studentName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-cream/50 focus:border-pastel-green focus:ring-2 focus:ring-pastel-green/20 outline-none transition-all text-sm"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-600 mb-3">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl bg-pastel-green/10 border-2 border-pastel-green/30 text-center"
              >
                <span className="text-2xl block mb-1">📚</span>
                <span className="text-sm font-semibold text-leaf-dark">Student</span>
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => navigate('/teacher')}
                className="p-4 rounded-xl bg-soft-blue/10 border-2 border-soft-blue/30 text-center"
              >
                <span className="text-2xl block mb-1">👩‍🏫</span>
                <span className="text-sm font-semibold text-blue-600">Teacher</span>
              </motion.button>
            </div>
          </div>

          {/* Login Button */}
          <BloomButton
            size="lg"
            variant="primary"
            onClick={handleLogin}
            className="w-full"
          >
            Start My Journey <ArrowRight className="w-5 h-5" />
          </BloomButton>

          <p className="text-xs text-gray-400 text-center mt-4">
            No signup needed — just pick a name and start learning! 🌿
          </p>
        </div>
      </motion.div>
    </div>
  );
}
