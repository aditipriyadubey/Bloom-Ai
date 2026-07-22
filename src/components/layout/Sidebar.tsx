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
  Users,
} from 'lucide-react';
import { getAuth } from '../../api/auth';

const studentNavItems = [
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

const teacherNavItems = [
  { path: '/teacher', label: 'Class Dashboard', icon: GraduationCap },
  { path: '/teacher/students', label: 'Student Roster', icon: Users },
];

export default function Sidebar() {
  const location = useLocation();
  const auth = getAuth();
  const role = auth?.role || 'student';

  const navItems = role === 'teacher' ? teacherNavItems : studentNavItems;
  const sectionLabel = role === 'teacher' ? 'Teacher' : 'Student';
  const accentColor = role === 'teacher' ? 'soft-blue' : 'pastel-green';
  const activeTextColor = role === 'teacher' ? 'text-blue-700' : 'text-leaf-dark';
  const activeBg = role === 'teacher' ? 'bg-soft-blue/20' : 'bg-pastel-green/20';
  const hoverBg = role === 'teacher' ? 'hover:bg-soft-blue/10 hover:text-blue-700' : 'hover:bg-pastel-green/10 hover:text-leaf-dark';
  const indicatorColor = role === 'teacher' ? 'bg-blue-600' : 'bg-leaf-dark';

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-warm-white border-r border-pastel-green/20 flex-col py-6 px-4 overflow-y-auto z-40">
        <div className="mb-6">
          <p className="text-xs font-semibold text-light-brown uppercase tracking-wider px-3 mb-3">
            {sectionLabel}
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
                      ? `${activeBg} ${activeTextColor}`
                      : `text-gray-500 ${hoverBg}`
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className={`absolute left-0 w-1 h-8 ${indicatorColor} rounded-r-full`}
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

        {/* Decorative plant */}
        <div className={`mt-auto p-4 bg-${accentColor}/10 rounded-2xl text-center`}>
          <div className="text-3xl mb-2">{role === 'teacher' ? '👩‍🏫' : '🌿'}</div>
          <p className="text-xs text-sage font-medium">
            {role === 'teacher' ? 'Nurturing minds!' : 'Keep growing!'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {auth?.name || 'Explorer'}
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-warm-white border-t border-pastel-green/20 z-50 px-2 py-1">
        <div className="flex justify-around items-center">
          {(role === 'teacher'
            ? teacherNavItems
            : [studentNavItems[0], studentNavItems[1], studentNavItems[5], studentNavItems[6]]
          ).map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-xs transition-colors ${
                  isActive ? activeTextColor : 'text-gray-400'
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
