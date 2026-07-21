import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';
import BloomCard from '../components/cards/BloomCard';
import BloomButton from '../components/ui/BloomButton';
import ProgressBar from '../components/ui/ProgressBar';
import { lessons } from '../data/lessons';

export default function Practice() {
  // Use practice questions from lesson 3 (Algebra Basics) as the active practice
  const practiceLesson = lessons[2]; // l3
  const allQuestions = practiceLesson.practiceQuestions;

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  const question = allQuestions[currentQ];

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    setSelected(optionIndex);
    setShowResult(true);
    if (optionIndex === question.correctAnswer) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 < allQuestions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto pb-24 lg:pb-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <BloomCard className="text-center !p-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-6xl mb-4"
            >
              🏆
            </motion.div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Practice Complete!</h1>
            <p className="text-gray-500 mb-6">
              You scored <span className="font-bold text-leaf-dark">{score}/{allQuestions.length}</span>
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-pastel-green/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-leaf-dark">{score}</p>
                <p className="text-xs text-gray-500">Correct</p>
              </div>
              <div className="bg-bloom-yellow/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-amber-700">{allQuestions.length - score}</p>
                <p className="text-xs text-gray-500">To review</p>
              </div>
              <div className="bg-bloom-pink/10 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-pink-600">{Math.round((score / allQuestions.length) * 100)}%</p>
                <p className="text-xs text-gray-500">Accuracy</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/journey">
                <BloomButton variant="primary">Continue Journey <ArrowRight className="w-4 h-4" /></BloomButton>
              </Link>
              <Link to="/doubt">
                <BloomButton variant="outline">Ask a Doubt 💬</BloomButton>
              </Link>
            </div>
          </BloomCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-leaf-dark" />
          Practice: {practiceLesson.concept}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Test your understanding — hints are always available! 💡
        </p>
      </div>

      {/* Streak indicator */}
      {streak >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2 bg-bloom-yellow/20 px-4 py-2 rounded-full w-fit"
        >
          <span className="text-lg">🔥</span>
          <span className="text-sm font-semibold text-amber-700">{streak} in a row!</span>
        </motion.div>
      )}

      {/* Progress */}
      <div className="mb-6">
        <ProgressBar
          value={currentQ + (showResult ? 1 : 0)}
          max={allQuestions.length}
          showLabel
          label={`Question ${currentQ + 1} of ${allQuestions.length}`}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <BloomCard hover={false} className="!p-6">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">
              {question.question}
            </h2>

            <div className="space-y-3 mb-5">
              {question.options.map((option, i) => {
                let style = 'border-gray-200 hover:border-pastel-green/50';
                if (showResult) {
                  if (i === question.correctAnswer) style = 'border-pastel-green bg-pastel-green/10';
                  else if (i === selected) style = 'border-peach bg-peach/10';
                  else style = 'border-gray-100 opacity-50';
                }
                return (
                  <motion.button
                    key={i}
                    whileTap={!showResult ? { scale: 0.98 } : undefined}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3 ${style}`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                    {showResult && i === question.correctAnswer && <CheckCircle className="w-4 h-4 ml-auto text-leaf-dark" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Hint */}
            {!showResult && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1 mb-3"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHint ? 'Hide hint' : 'Need a hint?'}
              </button>
            )}
            {showHint && !showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-bloom-yellow/10 rounded-xl p-3 text-sm text-amber-800 mb-4"
              >
                💡 {question.hint}
              </motion.div>
            )}

            {/* Result */}
            {showResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className={`p-4 rounded-xl text-sm mb-4 ${
                  selected === question.correctAnswer
                    ? 'bg-pastel-green/10 border border-pastel-green/20'
                    : 'bg-bloom-yellow/10 border border-bloom-yellow/20'
                }`}>
                  <p className="font-semibold mb-1">{question.encouragement}</p>
                  <p className="text-gray-600">{question.explanation}</p>
                </div>
                <BloomButton variant="primary" onClick={handleNext} className="w-full">
                  {currentQ + 1 < allQuestions.length ? 'Next Question' : 'See Results'} <ArrowRight className="w-4 h-4" />
                </BloomButton>
              </motion.div>
            )}
          </BloomCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
