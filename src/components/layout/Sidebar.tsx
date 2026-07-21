import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  TreePine,
  MessageCircle,
  Dumbbell,
  GraduationCap,
  ClipboardCheck,
  Trophy,
  TrendingUp,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/journey', label: "Today's Journey", icon: Compass },
  { path: '/quiz', label: 'Diagnostic Quiz', icon: ClipboardCheck },
  { path: '/lesson/l3', label: 'Micro Lesson', icon: BookOpen },
  { path: '/practice', label: 'Practice', icon: Dumbbell },
  { path: '/tree', label: 'Learning Tree', icon: TreePine },
  { path: '/doubt', label: 'AI Companion', icon: MessageCircle },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
  { path: '/progress', label: 'Progress', icon: TrendingUp },
];

const teacherItem = { path: '/teacher', label: 'Teacher Dashboard', icon: GraduationCap };

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-warm-white border-r border-pastel-green/20 flex-col py-6 px-4 overflow-y-auto z-40">
        <div className="mb-6">
          <p className="text-xs font-semibold text-light-brown uppercase tracking-wider px-3 mb-3">
            Student
          </p>
          <nav className="flex flex-col gap-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-pastel-green/20 text-leaf-dark'
                      : 'text-gray-500 hover:bg-pastel-green/10 hover:text-leaf-dark'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-8 bg-leaf-dark rounded-r-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-pastel-green/20 pt-4 mt-auto">
          <p className="text-xs font-semibold text-light-brown uppercase tracking-wider px-3 mb-3">
            Teacher
          </p>
          <Link
            to={teacherItem.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              location.pathname === teacherItem.path
                ? 'bg-soft-blue/20 text-blue-700'
                : 'text-gray-500 hover:bg-soft-blue/10 hover:text-blue-700'
            }`}
          >
            <teacherItem.icon className="w-5 h-5 flex-shrink-0" />
            <span>{teacherItem.label}</span>
          </Link>
        </div>

        {/* Decorative plant */}
        <div className="mt-6 p-4 bg-pastel-green/10 rounded-2xl text-center">
          <div className="text-3xl mb-2">🌿</div>
          <p className="text-xs text-sage font-medium">Keep growing!</p>
          <p className="text-xs text-gray-400 mt-1">12 concepts mastered</p>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-warm-white border-t border-pastel-green/20 z-50 px-2 py-1">
        <div className="flex justify-around items-center">
          {[navItems[0], navItems[1], navItems[5], navItems[6]].map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-xs transition-colors ${
                  isActive ? 'text-leaf-dark' : 'text-gray-400'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label.split(' ').pop()}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
