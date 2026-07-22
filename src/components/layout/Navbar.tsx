import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { getAuth, clearAuth } from '../../api/auth';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = location.pathname === '/';
  const isLoginPage = location.pathname.startsWith('/login');

  const auth = getAuth();
  const role = auth?.role;

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-warm-white/90 backdrop-blur-sm border-b border-pastel-green/20 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Sprout className="w-8 h-8 text-leaf-dark" />
          </motion.div>
          <span className="font-heading text-2xl font-bold text-leaf-dark">
            Bloom<span className="text-coral">AI</span>
          </span>
        </Link>

        {/* Desktop links — Landing page */}
        {isLanding && (
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-leaf-dark transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-leaf-dark transition-colors">How it Works</a>
            <a href="#benefits" className="text-sm font-medium text-gray-600 hover:text-leaf-dark transition-colors">Benefits</a>
            <Link
              to="/login"
              className="px-5 py-2 bg-leaf-dark text-white rounded-full text-sm font-semibold hover:bg-sage transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}

        {/* Desktop links — App pages (not landing, not login) */}
        {!isLanding && !isLoginPage && (
          <div className="hidden md:flex items-center gap-4">
            {/* Role badge */}
            {role === 'teacher' ? (
              <div className="flex items-center gap-2 bg-soft-blue/30 px-3 py-1.5 rounded-full">
                <span className="text-lg">👩‍🏫</span>
                <span className="text-sm font-semibold text-blue-700">Teacher</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-bloom-yellow/30 px-3 py-1.5 rounded-full">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-semibold text-light-brown">
                  {auth?.streak || 0} day streak
                </span>
              </div>
            )}

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-pastel-green/30 flex items-center justify-center text-lg">
              {auth?.avatar || '🌱'}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-peach/20 text-gray-400 hover:text-orange-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-pastel-green/10"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-warm-white border-b border-pastel-green/20 px-4 pb-4"
        >
          {isLanding ? (
            <div className="flex flex-col gap-3">
              <a href="#features" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>How it Works</a>
              <Link to="/login" className="px-5 py-2 bg-leaf-dark text-white rounded-full text-sm font-semibold text-center" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {role === 'teacher' ? (
                <>
                  <Link to="/teacher" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link to="/teacher/students" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Student Roster</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link to="/journey" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Today's Journey</Link>
                  <Link to="/tree" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>Learning Tree</Link>
                  <Link to="/doubt" className="text-sm font-medium text-gray-600 py-2" onClick={() => setMobileOpen(false)}>AI Companion</Link>
                </>
              )}
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="text-sm font-medium text-orange-600 py-2 text-left"
              >
                Logout
              </button>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
}
