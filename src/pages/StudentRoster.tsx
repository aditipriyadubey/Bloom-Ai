import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';
import BloomCard from '../components/cards/BloomCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProgressBar from '../components/ui/ProgressBar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface ConceptScore {
  conceptId: string;
  conceptName: string;
  status: string;
  score: number;
}

interface StudentRow {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  streak: number;
  lessonsCompleted: number;
  conceptsMastered: number;
  avgMastery: number;
  conceptBreakdown: ConceptScore[];
}

export default function StudentRoster() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/teacher/students`)
      .then((res) => res.json())
      .then(setStudents)
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner message="Loading student roster..." />;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-7 h-7 text-blue-600" />
          Student Roster 📋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Individual student performance — see who needs nurturing and who's blooming.
        </p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <BloomCard delay={0.05} className="!p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 font-heading">{students.length}</p>
          <p className="text-xs text-gray-500">Total Students</p>
        </BloomCard>
        <BloomCard delay={0.1} className="!p-4 text-center">
          <p className="text-2xl font-bold text-leaf-dark font-heading">
            {students.length > 0 ? Math.round(students.reduce((s, st) => s + st.avgMastery, 0) / students.length) : 0}%
          </p>
          <p className="text-xs text-gray-500">Avg Mastery</p>
        </BloomCard>
        <BloomCard delay={0.15} className="!p-4 text-center">
          <p className="text-2xl font-bold text-amber-600 font-heading">
            {students.length > 0 ? Math.round(students.reduce((s, st) => s + st.streak, 0) / students.length) : 0}
          </p>
          <p className="text-xs text-gray-500">Avg Streak</p>
        </BloomCard>
      </div>

      {/* Student List */}
      {students.length === 0 ? (
        <BloomCard className="text-center !p-8">
          <p className="text-gray-400">No students registered yet.</p>
        </BloomCard>
      ) : (
        <div className="space-y-3">
          {students.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <BloomCard hover={false} className="!p-0 overflow-hidden">
                {/* Main Row */}
                <button
                  onClick={() => setExpandedId(expandedId === student.id ? null : student.id)}
                  className="w-full p-4 sm:p-5 flex items-center gap-4 text-left hover:bg-pastel-green/5 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-xl bg-pastel-green/20 flex items-center justify-center text-2xl flex-shrink-0">
                    {student.avatar}
                  </div>

                  {/* Name + Grade */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-sm text-gray-900 truncate">{student.name}</h3>
                    <p className="text-xs text-gray-400">{student.grade}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
                    <div className="text-center">
                      <p className="font-bold text-sm text-coral">{student.streak}🔥</p>
                      <p>Streak</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-sm text-blue-600">{student.lessonsCompleted}</p>
                      <p>Lessons</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-sm text-leaf-dark">{student.conceptsMastered}</p>
                      <p>Mastered</p>
                    </div>
                  </div>

                  {/* Mastery Badge */}
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    student.avgMastery >= 70
                      ? 'bg-pastel-green/20 text-leaf-dark'
                      : student.avgMastery >= 40
                      ? 'bg-bloom-yellow/20 text-amber-700'
                      : 'bg-peach/20 text-orange-700'
                  }`}>
                    {Math.round(student.avgMastery)}%
                  </div>

                  {/* Expand icon */}
                  {expandedId === student.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Expanded Concept Breakdown */}
                <AnimatePresence>
                  {expandedId === student.id && student.conceptBreakdown.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> Concept Breakdown
                        </h4>
                        <div className="space-y-2.5">
                          {student.conceptBreakdown.map((c) => (
                            <div key={c.conceptId}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                                  {c.status === 'bloomed' ? '🌸' : c.status === 'current' ? '🌿' : '🌱'}
                                  {c.conceptName}
                                </span>
                                <span className="text-xs text-gray-400">{Math.round(c.score)}%</span>
                              </div>
                              <ProgressBar
                                value={Math.round(c.score)}
                                max={100}
                                color={c.status === 'bloomed' ? 'bg-pastel-green' : c.status === 'current' ? 'bg-bloom-yellow' : 'bg-gray-200'}
                                height="h-1.5"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </BloomCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
