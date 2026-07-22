import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, ArrowRight, ArrowLeft } from 'lucide-react';
import BloomButton from '../components/ui/BloomButton';
import { studentSignup, studentLogin, saveAuth } from '../api/auth';

const avatars = [
  { emoji: '🌸', name: 'Cherry Blossom' },
  { emoji: '🌿', name: 'Fern' },
  { emoji: '🌻', name: 'Sunflower' },
  { emoji: '🌱', name: 'Sprout' },
  { emoji: '🌷', name: 'Tulip' },
  { emoji: '🦋', name: 'Butterfly' },
];

export default function StudentLogin() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isSignup) {
        result = await studentSignup({
          name: name.trim() || 'Explorer',
          email,
          password,
          avatar: avatars[selectedAvatar].emoji,
          grade: 'Class 8',
        });
      } else {
        result = await studentLogin({ email, password });
      }
      saveAuth(result);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
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
          {/* Back link */}
          <Link to="/login" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-leaf-dark transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <h1 className="font-heading text-2xl font-bold text-gray-900 text-center mb-1">
            {isSignup ? 'Create Student Account 🌱' : 'Student Login 📚'}
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            {isSignup ? 'Start your learning journey today' : 'Welcome back, explorer!'}
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-peach/20 border border-peach/40 text-sm text-orange-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Avatar + Name (signup only) */}
            {isSignup && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Pick your avatar</label>
                  <div className="grid grid-cols-6 gap-2">
                    {avatars.map((avatar, i) => (
                      <motion.button
                        key={i}
                        type="button"
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

                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1.5">Your name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-cream/50 focus:border-pastel-green focus:ring-2 focus:ring-pastel-green/20 outline-none transition-all text-sm"
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-cream/50 focus:border-pastel-green focus:ring-2 focus:ring-pastel-green/20 outline-none transition-all text-sm"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
                minLength={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-cream/50 focus:border-pastel-green focus:ring-2 focus:ring-pastel-green/20 outline-none transition-all text-sm"
              />
            </div>

            <BloomButton type="submit" size="lg" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'} <ArrowRight className="w-5 h-5" />
            </BloomButton>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            {isSignup ? 'Already have an account?' : "New here?"}{' '}
            <button
              onClick={() => { setIsSignup(!isSignup); setError(''); }}
              className="text-leaf-dark font-semibold hover:underline"
            >
              {isSignup ? 'Login instead' : 'Sign up'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
