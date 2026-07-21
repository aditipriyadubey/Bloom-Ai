import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';
import BloomCard from '../components/cards/BloomCard';
import { achievements } from '../data/achievements';

const categoryLabels: Record<string, string> = {
  milestones: '🎯 Milestones',
  engagement: '💬 Engagement',
  streaks: '🔥 Streaks',
  mastery: '🌳 Mastery',
  subject: '📚 Subject',
  fun: '🎨 Fun',
};

export default function Achievements() {
  const earned = achievements.filter(a => a.earned);
  const locked = achievements.filter(a => !a.earned);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-7 h-7 text-bloom-yellow" />
          Achievements 🏆
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Every step forward counts! Here's your collection of wins.
        </p>
      </motion.div>

      {/* Stats */}
      <BloomCard delay={0.05} className="mb-6 !p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-leaf-dark font-heading">{earned.length}/{achievements.length}</p>
            <p className="text-sm text-gray-500">Achievements earned</p>
          </div>
          <div className="flex -space-x-1">
            {earned.slice(0, 6).map((a) => (
              <motion.div
                key={a.id}
                whileHover={{ scale: 1.3, zIndex: 10 }}
                className="w-10 h-10 rounded-full bg-bloom-yellow/20 flex items-center justify-center text-lg border-2 border-warm-white"
              >
                {a.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </BloomCard>

      {/* Earned */}
      <h2 className="font-heading font-bold text-lg text-gray-900 mb-3">✨ Earned</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {earned.map((achievement, i) => (
          <BloomCard key={achievement.id} delay={0.1 + i * 0.05} className="!p-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                className="w-12 h-12 rounded-xl bg-bloom-yellow/20 flex items-center justify-center text-2xl flex-shrink-0"
              >
                {achievement.icon}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-sm text-gray-900">{achievement.title}</h3>
                <p className="text-xs text-gray-500">{achievement.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-pastel-green bg-pastel-green/10 px-2 py-0.5 rounded-full">
                    {categoryLabels[achievement.category] || achievement.category}
                  </span>
                  {achievement.earnedDate && (
                    <span className="text-xs text-gray-400">
                      {new Date(achievement.earnedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </BloomCard>
        ))}
      </div>

      {/* Locked */}
      <h2 className="font-heading font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
        <Lock className="w-4 h-4 text-gray-400" /> Coming Soon
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {locked.map((achievement, i) => (
          <BloomCard key={achievement.id} delay={0.1 + i * 0.05} className="!p-4 opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl grayscale flex-shrink-0">
                {achievement.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-sm text-gray-600">{achievement.title}</h3>
                <p className="text-xs text-gray-400">{achievement.description}</p>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {categoryLabels[achievement.category] || achievement.category}
                </span>
              </div>
            </div>
          </BloomCard>
        ))}
      </div>
    </div>
  );
}
