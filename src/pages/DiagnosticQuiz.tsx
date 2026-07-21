import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import BloomButton from '../components/ui/BloomButton';
import BloomCard from '../components/cards/BloomCard';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getQuizQuestions, submitQuiz } from '../api/quiz';
import type { QuizQuestion } from '../types';

export default function DiagnosticQuiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [result, setResult] = useState<{ message: string; encouragement: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuizQuestions().then((qs) => {
      // Filter to math-only for focused demo
      const mathQs = qs.filter(q => ['Fractions', 'Algebra', 'Geometry'].includes(q.concept));
      setQuestions(mathQs.length > 0 ? mathQs : qs.slice(0, 5));
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner message="Preparing your journey quiz..." />;

  const question = questions[currentQ];

  const handleSelect = (optionIndex: number) => {
    if (showExplanation) return;
    setSelected(optionIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected!];
    setAnswers(newAnswers);
    setSelected(null);
    setShowExplanation(false);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setQuizComplete(true);
      submitQuiz(newAnswers).then(setResult);
    }
  };

  if (quizComplete) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto pb-24 lg:pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BloomCard className="text-center !p-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-6xl mb-6"
            >
              🌸
            </motion.div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Wonderful! You Did It! 🎉
            </h1>
            {result && (
              <>
                <p className="text-gray-600 mb-2">{result.message}</p>
                <p className="text-sage font-medium mb-8">{result.encouragement}</p>
              </>
            )}
            <div className="bg-pastel-green/10 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-heading font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-leaf-dark" />
                Your Personalized Path is Ready
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Based on your responses, we've created a learning journey that starts exactly where you are.
                No rushing, no repeating — just the right next step.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-leaf-dark">
                  <CheckCircle className="w-4 h-4" />
                  <span>Concepts identified for strengthening</span>
                </div>
                <div className="flex items-center gap-2 text-leaf-dark">
                  <CheckCircle className="w-4 h-4" />
                  <span>Personalized micro-lessons queued</span>
                </div>
                <div className="flex items-center gap-2 text-leaf-dark">
                  <CheckCircle className="w-4 h-4" />
                  <span>Practice questions tailored for you</span>
                </div>
              </div>
            </div>
            <BloomButton size="lg" variant="primary" onClick={() => navigate('/journey')}>
              Start My Journey <ArrowRight className="w-5 h-5" />
            </BloomButton>
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
          <ClipboardCheck className="w-6 h-6 text-leaf-dark" />
          Let's Get to Know You 🌱
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          No scores, no pressure — just help us understand where to start your journey.
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <ProgressBar
          value={currentQ + 1}
          max={questions.length}
          showLabel
          label={`Question ${currentQ + 1} of ${questions.length}`}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <BloomCard hover={false} className="!p-6 sm:!p-8">
            {/* Concept Tag */}
            <div className="inline-flex items-center gap-1.5 bg-bloom-lavender/20 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
              📐 {question.concept}
            </div>

            <h2 className="font-heading text-lg sm:text-xl font-bold text-gray-900 mb-6">
              {question.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, i) => {
                const isSelected = selected === i;
                const isCorrect = question.correctAnswer === i;
                let optionStyle = 'border-gray-200 hover:border-pastel-green/50 hover:bg-pastel-green/5';

                if (showExplanation) {
                  if (isCorrect) {
                    optionStyle = 'border-pastel-green bg-pastel-green/10 text-leaf-dark';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-peach bg-peach/10 text-orange-700';
                  } else {
                    optionStyle = 'border-gray-100 opacity-50';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-leaf-dark bg-pastel-green/10';
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={!showExplanation ? { x: 4 } : undefined}
                    whileTap={!showExplanation ? { scale: 0.98 } : undefined}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${optionStyle}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      showExplanation && isCorrect
                        ? 'bg-pastel-green text-white'
                        : showExplanation && isSelected && !isCorrect
                        ? 'bg-peach text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm font-medium">{option}</span>
                    {showExplanation && isCorrect && <CheckCircle className="w-5 h-5 ml-auto text-leaf-dark" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className={`p-4 rounded-xl text-sm ${
                  selected === question.correctAnswer
                    ? 'bg-pastel-green/10 border border-pastel-green/30'
                    : 'bg-bloom-yellow/10 border border-bloom-yellow/30'
                }`}>
                  <p className="font-semibold mb-1">
                    {selected === question.correctAnswer ? '🌟 Wonderful!' : '💡 Great try!'}
                  </p>
                  <p className="text-gray-600">{question.explanation}</p>
                </div>
              </motion.div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <BloomButton size="lg" variant="primary" onClick={handleNext} className="w-full">
                  {currentQ + 1 < questions.length ? 'Next Question' : 'See My Journey'} <ArrowRight className="w-5 h-5" />
                </BloomButton>
              </motion.div>
            )}
          </BloomCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
