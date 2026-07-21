import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, TreePine, Flame, Target } from 'lucide-react';
import BloomCard from '../components/cards/BloomCard';
import ProgressBar from '../components/ui/ProgressBar';
import { currentStudent } from '../data/students';
import { concepts } from '../data/concepts';
import { achievements } from '../data/achievements';

export default function Progress() {
  const bloomedCount = concepts.filter(c => c.status === 'bloomed').length;
  const earnedBadges = achievements.filter(a => a.earned).length;

  const weeklyData = [
    { day: 'Mon', lessons: 3, practice: 5 },
    { day: 'Tue', lessons: 2, practice: 4 },
    { day: 'Wed', lessons: 4, practice: 6 },
    { day: 'Thu', lessons: 3, practice: 3 },
    { day: 'Fri', lessons: 5, practice: 7 },
    { day: 'Sat', lessons: 2, practice: 3 },
    { day: 'Sun', lessons: 1, practice: 2 },
  ];
  const maxActivity = Math.max(...weeklyData.map(d => d.lessons + d.practice));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-leaf-dark" />
          Your Growth Story 📊
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Every step forward is progress — look at how far you've come!
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Flame, label: 'Day Streak', value: `${currentStudent.streak}`, color: 'text-coral', bg: 'bg-peach/20' },
          { icon: BookOpen, label: 'Lessons Done', value: `${currentStudent.lessonsCompleted}`, color: 'text-blue-600', bg: 'bg-soft-blue/20' },
          { icon: TreePine, label: 'Concepts Mastered', value: `${bloomedCount}`, color: 'text-leaf-dark', bg: 'bg-pastel-green/20' },
          { icon: Target, label: 'Badges Earned', value: `${earnedBadges}`, color: 'text-bloom-yellow', bg: 'bg-bloom-yellow/20' },
        ].map((stat, i) => (
          <BloomCard key={i} delay={i * 0.05} className="!p-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-xl font-bold text-gray-900 font-heading">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </BloomCard>
        ))}
      </div>

      {/* Concept Mastery */}
      <BloomCard delay={0.1} className="mb-6">
        <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-leaf-dark" />
          Concept Mastery
        </h2>
        <div className="space-y-3">
          {concepts.filter(c => c.status !== 'bud').map((concept) => (
            <div key={concept.id}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  {concept.status === 'bloomed' ? '🌸' : '🌿'} {concept.name}
                </span>
                <span className="text-xs text-gray-400">{concept.subject}</span>
              </div>
              <ProgressBar
                value={concept.status === 'bloomed' ? 100 : 55}
                max={100}
                color={concept.status === 'bloomed' ? 'bg-pastel-green' : 'bg-bloom-yellow'}
                height="h-2"
              />
            </div>
          ))}
        </div>
      </BloomCard>

      {/* Weekly Activity */}
      <BloomCard delay={0.15}>
        <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          📅 This Week's Activity
        </h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyData.map((day, i) => {
            const height = ((day.lessons + day.practice) / maxActivity) * 100;
            const lessonHeight = (day.lessons / (day.lessons + day.practice)) * height;
            const practiceHeight = height - lessonHeight;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end" style={{ height: 100 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${practiceHeight}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                    className="w-full bg-soft-blue/40 rounded-t-md"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${lessonHeight}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                    className="w-full bg-pastel-green rounded-t-md"
                  />
                </div>
                <span className={`text-xs font-medium ${
                  i === new Date().getDay() - 1 ? 'text-leaf-dark font-bold' : 'text-gray-400'
                }`}>
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-pastel-green" /> Lessons
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-soft-blue/40" /> Practice
          </span>
        </div>
      </BloomCard>
    </div>
  );
}
