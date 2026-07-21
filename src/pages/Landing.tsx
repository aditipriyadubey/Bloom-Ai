import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import {
  Sprout, Brain, TreePine, MessageCircle, BookOpen, Users, Sparkles,
  ArrowRight, Star, Zap, Shield, Heart, CheckCircle,
} from 'lucide-react';
import BloomButton from '../components/ui/BloomButton';
import BloomCard from '../components/cards/BloomCard';
import Footer from '../components/layout/Footer';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const features = [
  { icon: Brain, title: 'Adaptive Learning', desc: 'Lessons quietly adjust to each student\'s understanding — no labels, no pressure.', color: 'bg-soft-blue/20 text-blue-600' },
  { icon: TreePine, title: 'Learning Tree', desc: 'Watch concepts bloom on a beautiful tree as understanding grows naturally.', color: 'bg-pastel-green/20 text-leaf-dark' },
  { icon: MessageCircle, title: 'AI Doubt Companion', desc: 'A friendly AI assistant ready to explain any concept with patience and encouragement.', color: 'bg-bloom-yellow/30 text-amber-700' },
  { icon: BookOpen, title: 'Microlearning', desc: '10-minute bite-sized lessons with notebook-style layouts that make learning feel natural.', color: 'bg-peach/30 text-orange-700' },
  { icon: Sparkles, title: 'Positive Motivation', desc: 'No grades or comparisons — only encouragement, streaks, and celebration of growth.', color: 'bg-bloom-pink/20 text-pink-600' },
  { icon: Users, title: 'Teacher Insights', desc: 'Growth-focused analytics that help teachers nurture, not rank, their students.', color: 'bg-bloom-lavender/20 text-purple-600' },
];

const steps = [
  { num: '1', title: 'Start Your Journey', desc: 'A friendly quiz prepares your personalized learning path — no scores, just understanding.', emoji: '🌱' },
  { num: '2', title: 'Learn & Practice', desc: 'Explore bite-sized lessons with visual examples, then practice at your own pace.', emoji: '📖' },
  { num: '3', title: 'Ask Anything', desc: 'Your AI companion explains concepts with everyday examples and infinite patience.', emoji: '💬' },
  { num: '4', title: 'Watch Yourself Bloom', desc: 'See your Learning Tree grow as you master new concepts. Every leaf is a win!', emoji: '🌸' },
];

const studentBenefits = [
  'Learn at your own pace without pressure',
  'No labels — just encouragement',
  'Fun, visual micro-lessons',
  'AI companion for instant doubt resolution',
  'Beautiful Learning Tree to track growth',
  'Achievements and streaks for motivation',
];

const teacherBenefits = [
  'See which concepts need more attention',
  'Growth-focused insights, not rankings',
  'Most asked doubts highlight learning gaps',
  'Track class progress with warm analytics',
  'Concept heatmaps show understanding patterns',
  'Save time with AI-powered doubt resolution',
];

export default function Landing() {
  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pastel-green/10 to-transparent" />
        {/* Decorative elements */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-10 text-4xl opacity-30 hidden lg:block">🌿</motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-40 right-20 text-3xl opacity-20 hidden lg:block">🌸</motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute bottom-20 left-1/4 text-2xl opacity-20 hidden lg:block">📚</motion.div>
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 4.5, repeat: Infinity }} className="absolute bottom-40 right-1/3 text-3xl opacity-20 hidden lg:block">🌱</motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-pastel-green/20 border border-pastel-green/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Sprout className="w-4 h-4 text-leaf-dark" />
              <span className="text-sm font-medium text-leaf-dark">Learning that grows with you</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              Every Student Deserves to{' '}
              <span className="text-leaf-dark relative">
                Bloom
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute bottom-1 left-0 right-0 h-3 bg-bloom-yellow/40 -z-10 origin-left rounded"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              An AI-powered learning platform that adapts to each student's journey.
              No labels. No comparisons. Just growth, encouragement, and blooming potential.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/login">
                <BloomButton size="lg" variant="primary">
                  Start Learning <ArrowRight className="w-5 h-5" />
                </BloomButton>
              </Link>
              <Link to="/teacher">
                <BloomButton size="lg" variant="outline">
                  Teacher Portal
                </BloomButton>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              {[
                { value: '10K+', label: 'Students' },
                { value: '500+', label: 'Lessons' },
                { value: '98%', label: 'Love it' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-heading text-2xl font-bold text-leaf-dark">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-16">
          <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z" fill="#FEFCF8" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-warm-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Students Love BloomAI
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-2xl mx-auto">
              A learning experience designed with care, warmth, and the latest in AI technology.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <BloomCard key={i} delay={i * 0.1} className="border border-gray-100">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </BloomCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How BloomAI Works
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-2xl mx-auto">
              Four simple steps to a personalized, encouraging learning experience.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-warm-white rounded-2xl p-6 shadow-card text-center relative overflow-hidden">
                  <div className="text-5xl mb-4">{step.emoji}</div>
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-pastel-green/20 rounded-full text-sm font-bold text-leaf-dark mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-pastel-green z-10">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Student Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-pastel-green/10 to-bloom-yellow/10 rounded-3xl p-8 border border-pastel-green/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pastel-green/20 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-leaf-dark" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">For Students</h3>
                </div>
                <ul className="space-y-3">
                  {studentBenefits.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-leaf-dark mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Teacher Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-soft-blue/10 to-bloom-lavender/10 rounded-3xl p-8 border border-soft-blue/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-soft-blue/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900">For Teachers</h3>
                </div>
                <ul className="space-y-3">
                  {teacherBenefits.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-leaf-dark to-sage rounded-3xl p-12 text-white relative overflow-hidden">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute top-4 right-8 text-4xl opacity-20">🌸</motion.div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute bottom-6 left-8 text-3xl opacity-20">🌿</motion.div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                Ready to Start Growing? 🌱
              </h2>
              <p className="text-green-100 mb-8 max-w-xl mx-auto">
                Join thousands of students who are learning, growing, and blooming every day — at their own pace, in their own way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <BloomButton size="lg" variant="secondary">
                    Begin Your Journey <Zap className="w-5 h-5" />
                  </BloomButton>
                </Link>
                <Link to="/teacher">
                  <BloomButton size="lg" className="bg-white/20 text-white hover:bg-white/30 border-0">
                    <Shield className="w-5 h-5" /> I'm a Teacher
                  </BloomButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
