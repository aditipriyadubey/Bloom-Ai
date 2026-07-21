import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TreePine, Filter } from 'lucide-react';
import BloomCard from '../components/cards/BloomCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getLearningTree } from '../api/learningTree';
import type { ConceptNode } from '../types';

const statusColors = {
  bloomed: { fill: '#A8D5BA', stroke: '#4A7C59', glow: 'rgba(168, 213, 186, 0.6)', label: '🌸 Bloomed' },
  current: { fill: '#FFE5A0', stroke: '#D4A843', glow: 'rgba(255, 229, 160, 0.6)', label: '🌿 Growing' },
  bud: { fill: '#E8E8E8', stroke: '#B0B0B0', glow: 'rgba(200, 200, 200, 0.3)', label: '🌱 Bud' },
};

export default function LearningTree() {
  const [concepts, setConcepts] = useState<ConceptNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [filter, setFilter] = useState<'all' | 'Mathematics' | 'Science'>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    getLearningTree().then((data) => {
      setConcepts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner message="Growing your Learning Tree..." />;

  const filtered = filter === 'all' ? concepts : concepts.filter(c => c.subject === filter);
  const bloomedCount = concepts.filter(c => c.status === 'bloomed').length;
  const currentCount = concepts.filter(c => c.status === 'current').length;
  const budCount = concepts.filter(c => c.status === 'bud').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto pb-24 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <TreePine className="w-7 h-7 text-leaf-dark" />
          Your Learning Tree 🌳
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Watch your knowledge grow! Each node represents a concept you're mastering.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <BloomCard delay={0.05} className="!p-3 text-center">
          <p className="text-2xl font-bold text-leaf-dark font-heading">{bloomedCount}</p>
          <p className="text-xs text-gray-500">🌸 Bloomed</p>
        </BloomCard>
        <BloomCard delay={0.1} className="!p-3 text-center">
          <p className="text-2xl font-bold text-amber-600 font-heading">{currentCount}</p>
          <p className="text-xs text-gray-500">🌿 Growing</p>
        </BloomCard>
        <BloomCard delay={0.15} className="!p-3 text-center">
          <p className="text-2xl font-bold text-gray-400 font-heading">{budCount}</p>
          <p className="text-xs text-gray-500">🌱 Buds</p>
        </BloomCard>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-400" />
        {(['all', 'Mathematics', 'Science'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === f
                ? 'bg-leaf-dark text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-pastel-green/10'
            }`}
          >
            {f === 'all' ? '🌍 All' : f === 'Mathematics' ? '🔢 Math' : '🔬 Science'}
          </button>
        ))}
      </div>

      {/* Tree Visualization */}
      <BloomCard hover={false} className="!p-0 overflow-hidden">
        <div className="relative bg-gradient-to-b from-cream via-warm-white to-pastel-green/10 rounded-2xl" style={{ minHeight: 500 }}>
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full absolute inset-0"
            style={{ minHeight: 500 }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines */}
            {filtered.map(node =>
              node.connections.map(targetId => {
                const target = filtered.find(c => c.id === targetId);
                if (!target) return null;
                const isHighlighted = hoveredNode === node.id || hoveredNode === targetId;
                return (
                  <motion.line
                    key={`${node.id}-${targetId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isHighlighted ? '#4A7C59' : '#A8D5BA'}
                    strokeWidth={isHighlighted ? 0.6 : 0.3}
                    strokeDasharray={node.status === 'bud' || target.status === 'bud' ? '1,1' : undefined}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                );
              })
            )}

            {/* Nodes */}
            {filtered.map((node, i) => {
              const color = statusColors[node.status];
              const isHovered = hoveredNode === node.id;
              const nodeRadius = node.status === 'bloomed' ? 4 : node.status === 'current' ? 3.5 : 2.8;

              return (
                <g key={node.id}>
                  {/* Glow effect */}
                  {(node.status === 'bloomed' || node.status === 'current') && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={nodeRadius + 2}
                      fill="none"
                      stroke={color.glow}
                      strokeWidth={isHovered ? 1.5 : 0.8}
                      animate={{
                        r: [nodeRadius + 1.5, nodeRadius + 3, nodeRadius + 1.5],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  )}

                  {/* Main circle */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={nodeRadius}
                    fill={color.fill}
                    stroke={color.stroke}
                    strokeWidth={isHovered ? 0.8 : 0.4}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: i * 0.08, stiffness: 200 }}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />

                  {/* Emoji on bloomed nodes */}
                  {node.status === 'bloomed' && (
                    <text
                      x={node.x}
                      y={node.y + 1}
                      textAnchor="middle"
                      fontSize="3"
                      className="pointer-events-none select-none"
                    >
                      🌸
                    </text>
                  )}
                  {node.status === 'current' && (
                    <text
                      x={node.x}
                      y={node.y + 1}
                      textAnchor="middle"
                      fontSize="2.5"
                      className="pointer-events-none select-none"
                    >
                      🌿
                    </text>
                  )}

                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + nodeRadius + 3}
                    textAnchor="middle"
                    fontSize="2.2"
                    fontWeight={isHovered ? '700' : '500'}
                    fill={isHovered ? '#2D2D2D' : '#666'}
                    className="pointer-events-none select-none font-body"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Ground decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-pastel-green/20 to-transparent rounded-b-2xl" />
        </div>
      </BloomCard>

      {/* Selected Node Detail */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <BloomCard hover={false} className="!p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                selectedNode.status === 'bloomed'
                  ? 'bg-pastel-green/20'
                  : selectedNode.status === 'current'
                  ? 'bg-bloom-yellow/20'
                  : 'bg-gray-100'
              }`}>
                {selectedNode.status === 'bloomed' ? '🌸' : selectedNode.status === 'current' ? '🌿' : '🌱'}
              </div>
              <div>
                <h3 className="font-heading font-bold text-gray-900">{selectedNode.name}</h3>
                <p className="text-xs text-gray-500">{selectedNode.subject} • {statusColors[selectedNode.status].label}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {selectedNode.status === 'bloomed'
                ? "You've mastered this concept! Great work! 🎉"
                : selectedNode.status === 'current'
                ? "You're currently exploring this concept. Keep going! 💪"
                : "This concept is waiting for you to discover. It'll bloom when you're ready! 🌱"}
            </p>
            {selectedNode.connections.length > 0 && (
              <div className="mt-3 text-xs text-gray-400">
                Connected to: {selectedNode.connections.map(id => {
                  const c = concepts.find(n => n.id === id);
                  return c?.name;
                }).filter(Boolean).join(', ')}
              </div>
            )}
          </BloomCard>
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-pastel-green border border-leaf-dark" /> Bloomed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-bloom-yellow border border-amber-500" /> Growing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-gray-200 border border-gray-400" /> Bud
        </span>
      </div>
    </div>
  );
}
