import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, BookOpen, GraduationCap } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

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
            Welcome to BloomAI! 🌱
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Choose how you'd like to continue
          </p>

          <div className="grid grid-cols-1 gap-4">
            {/* Student Card */}
            <motion.button
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login/student')}
              className="p-6 rounded-2xl bg-gradient-to-br from-pastel-green/20 to-pastel-green/5 border-2 border-pastel-green/30 text-left group hover:border-leaf-dark/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-pastel-green/30 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-leaf-dark" />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-bold text-lg text-gray-900 group-hover:text-leaf-dark transition-colors">
                    I'm a Student 📚
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Start learning, practice concepts, and grow your knowledge tree
                  </p>
                </div>
              </div>
            </motion.button>

            {/* Teacher Card */}
            <motion.button
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login/teacher')}
              className="p-6 rounded-2xl bg-gradient-to-br from-soft-blue/20 to-soft-blue/5 border-2 border-soft-blue/30 text-left group hover:border-blue-400/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-soft-blue/30 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    I'm a Teacher 👩‍🏫
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    View class insights, track student progress, and generate interventions
                  </p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
