import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight, Lightbulb, Eye, CheckCircle } from 'lucide-react';
import BloomCard from '../components/cards/BloomCard';
import BloomButton from '../components/ui/BloomButton';
import ProgressBar from '../components/ui/ProgressBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getLesson } from '../api/lessons';
import type { Lesson } from '../types';

export default function MicroLesson() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState<'learn' | 'practice'>('learn');
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (id) {
      getLesson(id).then((l) => {
        setLesson(l || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <LoadingSpinner message="Opening your lesson..." />;
  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Lesson not found 🌿</p>
        <Link to="/journey" className="text-leaf-dark font-medium mt-2 inline-block">
          ← Back to Journey
        </Link>
      </div>
    );
  }

  const practiceQ = lesson.practiceQuestions[practiceIndex];

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    setSelected(optionIndex);
    setShowResult(true);
    if (optionIndex === practiceQ.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextPractice = () => {
    if (practiceIndex + 1 < lesson.practiceQuestions.length) {
      setPracticeIndex(practiceIndex + 1);
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
            <div className="text-6xl mb-4">🌸</div>
            <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Lesson Complete!</h1>
            <p className="text-gray-500 mb-4">
              You got {score} out of {lesson.practiceQuestions.length} practice questions right!
            </p>
            <div className="bg-pastel-green/10 rounded-xl p-4 mb-6 text-sm text-leaf-dark font-medium">
              🌟 {score === lesson.practiceQuestions.length
                ? "Perfect score! You've mastered this concept!"
                : "Great effort! Every step forward is progress!"}
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Link to="/journey" className="text-gray-400 hover:text-leaf-dark transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-leaf-dark" />
            {lesson.title}
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs bg-bloom-lavender/20 text-purple-700 px-2.5 py-0.5 rounded-full font-medium">
              {lesson.concept}
            </span>
            <span className="text-xs text-gray-400">⏱ {lesson.duration}</span>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCurrentSection('learn')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            currentSection === 'learn'
              ? 'bg-leaf-dark text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-pastel-green/10'
          }`}
        >
          📖 Learn
        </button>
        <button
          onClick={() => setCurrentSection('practice')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            currentSection === 'practice'
              ? 'bg-leaf-dark text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-pastel-green/10'
          }`}
        >
          ✏️ Practice ({practiceIndex + (showResult ? 1 : 0)}/{lesson.practiceQuestions.length})
        </button>
      </div>

      <AnimatePresence mode="wait">
        {currentSection === 'learn' ? (
          <motion.div
            key="learn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Notebook-style content */}
            <BloomCard hover={false} className="notebook-bg !p-6 sm:!p-8">
              <div className="prose prose-sm max-w-none">
                {lesson.content.split('\n\n').map((para, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {para.startsWith('**') && para.endsWith('**') ? (
                      <h3 className="font-heading font-bold text-gray-900 mt-4 mb-2 text-base">
                        {para.replace(/\*\*/g, '')}
                      </h3>
                    ) : para.includes('•') ? (
                      <ul className="space-y-1 my-2 ml-1">
                        {para.split('\n').filter(l => l.trim()).map((line, j) => (
                          <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-leaf-dark mt-0.5">•</span>
                            <span>{line.replace(/^[•]\s*/, '').replace(/\*\*/g, '')}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-700 leading-relaxed my-2">
                        {para.replace(/\*\*/g, '')}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Visual Example */}
              <div className="mt-6 sticky-note">
                <div className="flex items-start gap-2">
                  <Eye className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-800 mb-1">Visual Example</p>
                    <p className="text-sm text-gray-700">{lesson.visualExample}</p>
                  </div>
                </div>
              </div>

              {/* Continue to Practice */}
              <div className="mt-6 text-center">
                <BloomButton variant="primary" onClick={() => setCurrentSection('practice')}>
                  Ready to Practice! ✏️ <ArrowRight className="w-4 h-4" />
                </BloomButton>
              </div>
            </BloomCard>
          </motion.div>
        ) : (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Progress */}
            <div className="mb-4">
              <ProgressBar
                value={practiceIndex + (showResult ? 1 : 0)}
                max={lesson.practiceQuestions.length}
                showLabel
                label={`Question ${practiceIndex + 1} of ${lesson.practiceQuestions.length}`}
              />
            </div>

            <BloomCard hover={false} className="!p-6">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-5">
                {practiceQ.question}
              </h2>

              <div className="space-y-3 mb-5">
                {practiceQ.options.map((option, i) => {
                  let style = 'border-gray-200 hover:border-pastel-green/50';
                  if (showResult) {
                    if (i === practiceQ.correctAnswer) style = 'border-pastel-green bg-pastel-green/10';
                    else if (i === selected) style = 'border-peach bg-peach/10';
                    else style = 'border-gray-100 opacity-50';
                  } else if (i === selected) {
                    style = 'border-leaf-dark bg-pastel-green/10';
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
                      {showResult && i === practiceQ.correctAnswer && <CheckCircle className="w-4 h-4 ml-auto text-leaf-dark" />}
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
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-bloom-yellow/10 rounded-xl p-3 text-sm text-amber-800 mb-4"
                >
                  💡 {practiceQ.hint}
                </motion.div>
              )}

              {/* Result */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={`p-4 rounded-xl text-sm mb-4 ${
                    selected === practiceQ.correctAnswer
                      ? 'bg-pastel-green/10 border border-pastel-green/20'
                      : 'bg-bloom-yellow/10 border border-bloom-yellow/20'
                  }`}>
                    <p className="font-semibold mb-1">{practiceQ.encouragement}</p>
                    <p className="text-gray-600">{practiceQ.explanation}</p>
                  </div>
                  <BloomButton variant="primary" onClick={handleNextPractice} className="w-full">
                    {practiceIndex + 1 < lesson.practiceQuestions.length ? 'Next Question' : 'Finish Lesson'} <ArrowRight className="w-4 h-4" />
                  </BloomButton>
                </motion.div>
              )}
            </BloomCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
