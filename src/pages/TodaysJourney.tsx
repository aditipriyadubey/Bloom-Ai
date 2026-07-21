import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Dumbbell, Coffee, ClipboardCheck, CheckCircle, Play } from 'lucide-react';
import BloomCard from '../components/cards/BloomCard';
import BloomButton from '../components/ui/BloomButton';
import ProgressBar from '../components/ui/ProgressBar';
import { todaysJourney } from '../data/quiz';

const stepIcons: Record<string, typeof BookOpen> = {
  lesson: BookOpen,
  practice: Dumbbell,
  quiz: ClipboardCheck,
  break: Coffee,
};

const stepEmoji: Record<string, string> = {
  lesson: '📖',
  practice: '💪',
  quiz: '📝',
  break: '☕',
};

export default function TodaysJourney() {
  const completedSteps = todaysJourney.filter(s => s.status === 'completed').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Compass className="w-7 h-7 text-leaf-dark" />
          Today's Learning Journey 🌿
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Your personalized path for today — take it at your own pace!
        </p>
      </motion.div>

      {/* Overall Progress */}
      <BloomCard delay={0.05} className="mb-6 !p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Daily Progress</span>
          <span className="text-sm font-bold text-leaf-dark">
            {completedSteps}/{todaysJourney.length} completed
          </span>
        </div>
        <ProgressBar value={completedSteps} max={todaysJourney.length} />
        <p className="text-xs text-sage mt-2">
          {completedSteps === todaysJourney.length
            ? "🌟 Amazing! You've completed everything today!"
            : `Keep going — you're doing wonderfully! 🌱`}
        </p>
      </BloomCard>

      {/* Journey Steps */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-pastel-green/30 hidden sm:block" />

        <div className="space-y-4">
          {todaysJourney.map((step, i) => {
            const StepIcon = stepIcons[step.type] || BookOpen;
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                {/* Step dot on the line */}
                <div className={`hidden sm:flex absolute left-4 top-6 w-4 h-4 rounded-full border-2 z-10 ${
                  isCompleted
                    ? 'bg-pastel-green border-leaf-dark'
                    : isCurrent
                    ? 'bg-bloom-yellow border-amber-500 animate-pulse-soft'
                    : 'bg-gray-100 border-gray-300'
                }`} />

                <div className={`sm:ml-14 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-pastel-green/5 border-pastel-green/20'
                    : isCurrent
                    ? 'bg-bloom-yellow/10 border-bloom-yellow/30 shadow-card'
                    : 'bg-warm-white border-gray-100 opacity-60'
                }`}>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? 'bg-pastel-green/20 text-leaf-dark'
                          : isCurrent
                          ? 'bg-bloom-yellow/30 text-amber-700'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-heading font-bold text-sm sm:text-base ${
                            isCompleted ? 'text-leaf-dark' : isCurrent ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </h3>
                          <span className="text-xs text-gray-400 flex-shrink-0">{step.duration}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">
                          {stepEmoji[step.type]} {step.concept}
                        </p>
                        <p className={`text-xs italic ${
                          isCompleted ? 'text-sage' : isCurrent ? 'text-amber-600' : 'text-gray-400'
                        }`}>
                          {step.encouragement}
                        </p>
                      </div>

                      {/* Action */}
                      {isCurrent && (
                        <Link to={step.type === 'lesson' ? '/lesson/l3' : step.type === 'practice' ? '/practice' : '/quiz'}>
                          <BloomButton size="sm" variant="primary">
                            <Play className="w-4 h-4" /> Start
                          </BloomButton>
                        </Link>
                      )}
                      {isCompleted && (
                        <span className="text-xs font-medium text-leaf-dark bg-pastel-green/20 px-2.5 py-1 rounded-full">
                          Done ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
