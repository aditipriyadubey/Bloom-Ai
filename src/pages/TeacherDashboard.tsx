import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, Users, BookOpen, TrendingUp, MessageCircle,
  Lightbulb, BarChart3, Sparkles, X
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import BloomCard from '../components/cards/BloomCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getTeacherDashboard, generateIntervention } from '../api/teacher';
import type { TeacherDashboardData } from '../types';

interface InterventionData {
  title: string;
  description: string;
  targetConcept: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

export default function TeacherDashboard() {
  const [data, setData] = useState<TeacherDashboardData | null>(null);
  const [activeIntervention, setActiveIntervention] = useState<InterventionData | null>(null);
  const [generatingConcept, setGeneratingConcept] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = () => {
      getTeacherDashboard().then(setData).catch(() => {});
    };

    fetchDashboard();
    const interval = setInterval(fetchDashboard, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateActivity = async (conceptName: string) => {
    setGeneratingConcept(conceptName);
    try {
      const res = await generateIntervention(conceptName);
      setActiveIntervention(res);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingConcept(null);
    }
  };

  if (!data) return <LoadingSpinner message="Loading class insights..." />;

  const { stats, heatmap, weeklyProgress, mostAskedDoubts, conceptDistribution, growthInsights } = data;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-blue-600" />
          Teacher Dashboard 👩‍🏫
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Nurture-focused insights — see where your students need you most.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Users, label: 'Active Students', value: stats.studentsActive, color: 'text-blue-600', bg: 'bg-soft-blue/20' },
          { icon: TrendingUp, label: 'Completion Rate', value: `${stats.completionRate}%`, color: 'text-leaf-dark', bg: 'bg-pastel-green/20' },
          { icon: BarChart3, label: 'Avg Engagement', value: `${stats.avgEngagement}%`, color: 'text-amber-600', bg: 'bg-bloom-yellow/20' },
          { icon: BookOpen, label: 'Total Lessons', value: stats.totalLessons, color: 'text-coral', bg: 'bg-peach/20' },
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

      {/* Concept Heatmap + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Concept Heatmap */}
        <BloomCard delay={0.1} className="lg:col-span-2">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
            🌡️ Concept Understanding Heatmap
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            See which concepts need nurturing — not who's behind, but what needs attention.
          </p>
          <div className="space-y-4">
            {heatmap.map((concept, i) => {
              const total = concept.needsAttention + concept.growing + concept.blooming;
              return (
                <motion.div
                  key={concept.concept}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="p-3 rounded-xl hover:bg-gray-50/80 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                    <span className="text-sm font-semibold text-gray-800">{concept.concept}</span>
                    <div className="flex items-center gap-2">
                      {concept.needsAttention >= 1 && (
                        <span className="text-xs bg-peach/30 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                          🌱 Needs nurturing
                        </span>
                      )}
                      <button
                        onClick={() => handleGenerateActivity(concept.concept)}
                        disabled={generatingConcept === concept.concept}
                        className="text-xs bg-leaf-dark/10 text-leaf-dark hover:bg-leaf-dark hover:text-white px-2.5 py-1 rounded-full font-medium transition-all flex items-center gap-1 shadow-xs"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {generatingConcept === concept.concept ? 'Generating...' : 'Generate 5-Min Activity'}
                      </button>
                    </div>
                  </div>
                  <div className="flex h-4 rounded-full overflow-hidden bg-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(concept.blooming / total) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                      className="bg-pastel-green h-full"
                      title={`${concept.blooming} blooming`}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(concept.growing / total) * 100}%` }}
                      transition={{ delay: 0.35 + i * 0.05, duration: 0.6 }}
                      className="bg-bloom-yellow h-full"
                      title={`${concept.growing} growing`}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(concept.needsAttention / total) * 100}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                      className="bg-peach h-full"
                      title={`${concept.needsAttention} needs attention`}
                    />
                  </div>
                  <div className="flex gap-4 mt-1.5 text-xs text-gray-500 font-medium">
                    <span>🌸 {concept.blooming} Bloomed</span>
                    <span>🌿 {concept.growing} Growing</span>
                    <span>🌱 {concept.needsAttention} Needs Nurturing</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-pastel-green" /> Blooming</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-bloom-yellow" /> Growing</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-peach" /> Needs Nurturing</span>
          </div>
        </BloomCard>

        {/* Concept Distribution Pie */}
        <BloomCard delay={0.15}>
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-4">Class Overview</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conceptDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={300}
                  animationDuration={800}
                >
                  {conceptDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FEFCF8',
                    border: '1px solid #A8D5BA33',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {conceptDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-semibold text-gray-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </BloomCard>
      </div>

      {/* Weekly Progress Chart + Most Asked Doubts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Chart */}
        <BloomCard delay={0.2}>
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            📈 Weekly Activity
          </h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProgress}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FEFCF8',
                    border: '1px solid #A8D5BA33',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="lessonsCompleted" fill="#A8D5BA" radius={[4, 4, 0, 0]} name="Lessons" />
                <Bar dataKey="practicesDone" fill="#A7C7E7" radius={[4, 4, 0, 0]} name="Practice" />
                <Bar dataKey="doubtsAsked" fill="#FFE5A0" radius={[4, 4, 0, 0]} name="Doubts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </BloomCard>

        {/* Most Asked Doubts */}
        <BloomCard delay={0.25}>
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-bloom-yellow" />
            Most Asked Doubts
          </h2>
          <div className="space-y-3">
            {mostAskedDoubts.map((doubt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-bloom-yellow/5 border border-bloom-yellow/15"
              >
                <div className="w-8 h-8 rounded-lg bg-bloom-yellow/20 flex items-center justify-center text-xs font-bold text-amber-700 flex-shrink-0">
                  {doubt.count}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium">{doubt.question}</p>
                  <span className="text-xs text-gray-400">{doubt.concept}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </BloomCard>
      </div>

      {/* Growth Insights */}
      <BloomCard delay={0.3}>
        <h2 className="font-heading text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Growth Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {growthInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              className="p-3 rounded-xl bg-pastel-green/5 border border-pastel-green/15 text-sm text-gray-700"
            >
              {insight}
            </motion.div>
          ))}
        </div>
      </BloomCard>

      {/* Micro-Intervention Modal */}
      {activeIntervention && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-gray-100"
          >
            <button
              onClick={() => setActiveIntervention(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 bg-pastel-green/20 text-leaf-dark px-3 py-1 rounded-full text-xs font-semibold mb-3">
              🌱 Targeted Intervention • {activeIntervention.targetConcept}
            </div>

            <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
              {activeIntervention.title}
            </h3>

            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl mb-6 leading-relaxed border border-gray-100">
              {activeIntervention.description}
            </p>

            <h4 className="font-heading text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Remedial Practice Questions (3-5 Min)
            </h4>

            <div className="space-y-4">
              {activeIntervention.questions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-warm-white">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-2">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded-lg border ${
                          optIdx === q.correctAnswer
                            ? 'border-pastel-green bg-pastel-green/10 text-leaf-dark font-medium'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 italic">💡 {q.explanation}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveIntervention(null)}
                className="bg-leaf-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-leaf-dark/90 transition-all shadow-xs"
              >
                Close & Assign to Group
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
