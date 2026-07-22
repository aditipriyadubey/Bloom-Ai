import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, ArrowRight, ArrowLeft } from 'lucide-react';
import BloomButton from '../components/ui/BloomButton';
import { teacherSignup, teacherLogin, saveAuth } from '../api/auth';

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
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
        result = await teacherSignup({ name: name.trim(), email, password });
      } else {
        result = await teacherLogin({ email, password });
      }
      saveAuth(result);
      navigate('/teacher');
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

        <div className="bg-warm-white rounded-3xl shadow-card p-8 border border-soft-blue/20">
          {/* Back link */}
          <Link to="/login" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <h1 className="font-heading text-2xl font-bold text-gray-900 text-center mb-1">
            {isSignup ? 'Create Teacher Account 👩‍🏫' : 'Teacher Login 👩‍🏫'}
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            {isSignup ? 'Join BloomAI as an educator' : 'Welcome back, educator!'}
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-peach/20 border border-peach/40 text-sm text-orange-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1.5">Your name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mrs. / Mr. ..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-cream/50 focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all text-sm"
                />
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.edu"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-cream/50 focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all text-sm"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-cream/50 focus:border-soft-blue focus:ring-2 focus:ring-soft-blue/20 outline-none transition-all text-sm"
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
              className="text-blue-600 font-semibold hover:underline"
            >
              {isSignup ? 'Login instead' : 'Sign up'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
