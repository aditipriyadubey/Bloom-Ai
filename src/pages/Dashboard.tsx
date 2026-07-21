import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, TreePine, MessageCircle, Compass, Trophy,
  TrendingUp,
} from 'lucide-react';
import BloomCard from '../components/cards/BloomCard';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getDashboard } from '../api/dashboard';
import { getGreeting, getRandomEncouragement } from '../lib/utils';
import type { DashboardData } from '../types';

const quickActions = [
  { label: "Today's Journey", icon: Compass, path: '/journey', color: 'bg-bloom-yellow/20 text-amber-700' },
  { label: 'Micro Lesson', icon: BookOpen, path: '/lesson/l3', color: 'bg-soft-blue/20 text-blue-600' },
  { label: 'Learning Tree', icon: TreePine, path: '/tree', color: 'bg-pastel-green/20 text-leaf-dark' },
  { label: 'Ask a Doubt', icon: MessageCircle, path: '/doubt', color: 'bg-bloom-pink/20 text-pink-600' },
];

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getDashboard().then(setData);
  }, []);

  if (!data) return <LoadingSpinner message="Preparing your garden..." />;

  const { student, todaysJourney, achievements, recentActivity, quickStats } = data;
  const completedSteps = todaysJourney.filter(s => s.status === 'completed').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto pb-24 lg:pb-8">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">
          {getGreeting()}, {student.name}! {student.avatar}
        </h1>
        <p className="text-gray-500 mt-1">{getRandomEncouragement()}</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {quickStats.map((stat, i) => (
          <BloomCard key={i} delay={i * 0.05} className="!p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-lg font-bold text-gray-900 font-heading">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </BloomCard>
        ))}
      </div>

      {/* Today's Progress + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Progress */}
        <BloomCard delay={0.1} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-leaf-dark" />
              Today's Journey
            </h2>
            <Link to="/journey" className="text-sm font-medium text-leaf-dark hover:text-sage transition-colors">
              View all →
            </Link>
          </div>
          <ProgressBar
            value={completedSteps}
            max={todaysJourney.length}
            showLabel
            label={`${completedSteps} of ${todaysJourney.length} steps completed`}
          />
          <div className="mt-4 space-y-2">
            {todaysJourney.slice(0, 4).map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-2.5 rounded-xl text-sm transition-colors ${
                  step.status === 'completed'
                    ? 'bg-pastel-green/10 text-leaf-dark'
                    : step.status === 'current'
                    ? 'bg-bloom-yellow/15 text-amber-800 font-medium'
                    : 'text-gray-400'
                }`}
              >
                <span className="text-lg">
                  {step.status === 'completed' ? '✅' : step.status === 'current' ? '📖' : '⏳'}
                </span>
                <span className="flex-1">{step.title}</span>
                <span className="text-xs text-gray-400">{step.duration}</span>
              </div>
            ))}
          </div>
        </BloomCard>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-1">Quick Actions</h2>
          {quickActions.map((action, i) => (
            <Link key={i} to={action.path}>
              <BloomCard delay={0.15 + i * 0.05} className="!p-3.5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{action.label}</span>
                </div>
              </BloomCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Achievements Preview + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <BloomCard delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-bloom-yellow" />
              Achievements
            </h2>
            <Link to="/achievements" className="text-sm font-medium text-leaf-dark hover:text-sage transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {achievements.slice(0, 5).map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.15 }}
                className={`w-full aspect-square rounded-xl flex items-center justify-center text-2xl ${
                  badge.earned
                    ? 'bg-bloom-yellow/20'
                    : 'bg-gray-100 opacity-40 grayscale'
                }`}
                title={badge.title}
              >
                {badge.icon}
              </motion.div>
            ))}
          </div>
        </BloomCard>

        {/* Recent Activity */}
        <BloomCard delay={0.25}>
          <h2 className="font-heading text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-sage" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-lg">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-700">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </BloomCard>
      </div>
    </div>
  );
}
