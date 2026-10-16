import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTION_PROJECTS } from '../data/portfolioData';
import {
  ArrowRight,
  X,
  CheckCircle2,
  Server,
} from 'lucide-react';

interface ProjectShowcaseProps {
  selectedProjectId: string | null;
  onCloseModal: () => void;
  onOpenProject: (projectId: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  selectedProjectId,
  onCloseModal,
  onOpenProject,
}) => {
  const [filter, setFilter] = useState<'all' | 'ai' | 'cloud' | 'gitops'>('all');

  const filteredProjects = PRODUCTION_PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return proj.category.toLowerCase().includes('ai') || proj.category.toLowerCase().includes('mcp');
    if (filter === 'cloud') return proj.category.toLowerCase().includes('aws') || proj.category.toLowerCase().includes('infrastructure');
    if (filter === 'gitops') return proj.category.toLowerCase().includes('gitops') || proj.category.toLowerCase().includes('container') || proj.category.toLowerCase().includes('ci/cd');
    return true;
  });

  const activeProject = PRODUCTION_PROJECTS.find((p) => p.id === selectedProjectId);

  return (
    <section id="projects" className="py-20 border-b border-slate-800/80 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              Production Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Featured Production Projects & Case Studies
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              Real-world systems engineered and operated under production traffic. Featuring serverless guest kiosks in 100+ hotels, autonomous AI pipelines, and multi-tenant Kubernetes clusters with 10+ safe automated rollbacks.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Systems
            </button>
            <button
              onClick={() => setFilter('ai')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'ai'
                  ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI & MCP
            </button>
            <button
              onClick={() => setFilter('cloud')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'cloud'
                  ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cloud & IaC
            </button>
            <button
              onClick={() => setFilter('gitops')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'gitops'
                  ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kubernetes & GitOps
            </button>
          </div>
        </motion.div>

        {/* Bento Grid with Scroll Reveal & Staggered Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => onOpenProject(project.id)}
              className={`bg-slate-900/60 border rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between group hover:border-cyan-500/50 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-950/20 ${
                project.isFeatured ? 'border-slate-700/90' : 'border-slate-800'
              }`}
            >
              <div>
                {/* Quiet unboxed metadata header */}
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span>{project.company}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">{project.period}</span>
                  </div>
                  {project.isFeatured && (
                    <span className="text-[11px] text-amber-300 font-semibold">★ Production Scale</span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {project.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-4">
                {/* 3 Impact stats */}
                <div className="grid grid-cols-3 gap-2">
                  {project.impactStats.map((stat, i) => (
                    <div key={i} className="bg-slate-950/80 p-2 rounded-lg text-center border border-slate-800">
                      <div className="text-xs font-bold text-cyan-400 font-mono tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack summary & drill-down arrow */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="font-mono text-[11px] text-slate-500 truncate max-w-[190px]">
                    {project.stack.slice(0, 3).join(', ')}...
                  </span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-xs">
                    <span>Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseModal}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto z-10"
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={onCloseModal}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                  <span>{activeProject.company}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.period}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-cyan-200 mt-1 font-medium">
                  {activeProject.tagline}
                </p>
              </div>

              {/* Architecture Flow Banner */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Production Architecture Flow</span>
                </div>
                <div className="text-xs font-mono text-cyan-300 leading-relaxed">
                  {activeProject.architectureSummary}
                </div>
              </div>

              {/* Detailed narrative */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  System Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Key Contributions */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Key Engineering Deliverables
                </h4>
                <ul className="space-y-2">
                  {activeProject.keyContributions.map((contrib, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantified Impact Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeProject.impactStats.map((stat, i) => (
                  <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-lg font-bold text-cyan-400 font-mono tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.stack.map((st, i) => (
                    <span
                      key={i}
                      className="text-xs bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded font-mono"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer close button */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={onCloseModal}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Close Deep Dive
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
