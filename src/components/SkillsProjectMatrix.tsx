import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import {
  Cloud,
  Boxes,
  FileCode,
  GitBranch,
  Cpu,
  Activity,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  ExternalLink,
  Zap,
} from 'lucide-react';

interface SkillsProjectMatrixProps {
  onSelectProject: (projectId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Cloud: <Cloud className="w-4 h-4" />,
  Boxes: <Boxes className="w-4 h-4" />,
  FileCode: <FileCode className="w-4 h-4" />,
  GitBranch: <GitBranch className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Terminal: <Terminal className="w-4 h-4" />,
};

export const SkillsProjectMatrix: React.FC<SkillsProjectMatrixProps> = ({ onSelectProject }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(SKILL_CATEGORIES[0].id);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const activeCategory = SKILL_CATEGORIES.find((c) => c.id === selectedCategoryId) || SKILL_CATEGORIES[0];
  const { highlightedProject } = activeCategory;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(highlightedProject.codeSnippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="skills-matrix" className="py-20 border-b border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12"
        >
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            Skill-to-Impact Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Core Technical Skills & Highlighted Projects
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
            Every technical skill in Sameer’s arsenal is backed by verified production outcomes across AWS, Kubernetes, GitOps, and autonomous AI systems. Select any category below to inspect the corresponding engineering project and architecture.
          </p>
        </motion.div>

        {/* Interactive Segmented Tabs with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none"
        >
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  setCopiedSnippet(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-950/50 scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{iconMap[cat.iconName]}</span>
                <span>{cat.shortLabel}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Dynamic Highlight Card for Selected Skill Category with Scroll Reveal and Smooth Exit/Entry */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
          {/* Left Column: Skills in this category & overview */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                {iconMap[activeCategory.iconName]}
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Category Domain
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">{activeCategory.name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {activeCategory.summary}
              </p>
            </div>

            {/* List of concrete skills */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-200 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verified Core Proficiencies:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeCategory.skillsList.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-950/80 border border-slate-800 text-slate-300 px-2.5 py-1 rounded font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Context Tip */}
            <div className="p-3 bg-cyan-950/20 border border-cyan-800/30 rounded-xl text-xs text-cyan-200/90 leading-relaxed flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Applied directly in production environments with zero downtime cutovers and hardened security standards.
              </span>
            </div>
          </div>

          {/* Right Column: Highlighted Production Project */}
          <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Project Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>Highlighted Production Project</span>
                  <span>·</span>
                  <span>{highlightedProject.company}</span>
                  <span>·</span>
                  <span>{highlightedProject.period}</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {highlightedProject.title}
                </h4>
              </div>

              <button
                onClick={() => {
                  if (activeCategory.id === 'cloud' || activeCategory.id === 'ai-mcp') {
                    onSelectProject('voters-ai-mcp');
                  } else if (activeCategory.id === 'iac') {
                    onSelectProject('hotelkey-terraform');
                  } else if (activeCategory.id === 'containers') {
                    onSelectProject('eks-consolidation');
                  } else if (activeCategory.id === 'cicd') {
                    onSelectProject('unified-cicd');
                  } else if (activeCategory.id === 'observability') {
                    onSelectProject('unified-observability');
                  } else {
                    onSelectProject('hotelkey-kiosk');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/50 rounded-lg transition-colors whitespace-nowrap self-start"
              >
                <span>Inspect Deep Dive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Problem & Architecture Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div className="text-xs font-bold text-rose-300 font-mono uppercase tracking-wider mb-1.5">
                  The Production Challenge
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {highlightedProject.problem}
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div className="text-xs font-bold text-cyan-300 font-mono uppercase tracking-wider mb-1.5">
                  Architectural Solution
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {highlightedProject.architecture}
                </p>
              </div>
            </div>

            {/* Impact Metric Strip */}
            <div className="grid grid-cols-3 gap-3">
              {highlightedProject.impactMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center"
                >
                  <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Code / Configuration Artifact */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono text-slate-300 font-medium">
                    {highlightedProject.codeSnippetTitle}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-sans">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed max-h-60">
                <pre>{highlightedProject.codeSnippet}</pre>
              </div>
            </div>

            {/* Technologies used in this project */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-medium">Stack utilized:</span>
              {highlightedProject.technologies.map((t, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
