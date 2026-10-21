import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_TOOLS_WORKED_ON, ToolItem } from '../data/portfolioData';
import {
  Cloud,
  Boxes,
  FileCode,
  GitBranch,
  Cpu,
  Activity,
  ShieldCheck,
  Terminal,
  Search,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

type ToolCategoryFilter = 'All' | ToolItem['category'];

const categoryIconMap: Record<string, React.ReactNode> = {
  'Cloud & Infrastructure': <Cloud className="w-4 h-4 text-cyan-400" />,
  'Containers & Orchestration': <Boxes className="w-4 h-4 text-blue-400" />,
  'IaC & Automation': <FileCode className="w-4 h-4 text-emerald-400" />,
  'CI/CD & GitOps': <GitBranch className="w-4 h-4 text-purple-400" />,
  'AI & LLM Systems': <Cpu className="w-4 h-4 text-amber-400" />,
  'Observability & Monitoring': <Activity className="w-4 h-4 text-rose-400" />,
  'Security & Networking': <ShieldCheck className="w-4 h-4 text-teal-400" />,
  'Scripting & OS': <Terminal className="w-4 h-4 text-indigo-400" />,
};

const categoryPillColors: Record<string, string> = {
  'Cloud & Infrastructure': 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300',
  'Containers & Orchestration': 'bg-blue-950/40 border-blue-500/30 text-blue-300',
  'IaC & Automation': 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300',
  'CI/CD & GitOps': 'bg-purple-950/40 border-purple-500/30 text-purple-300',
  'AI & LLM Systems': 'bg-amber-950/40 border-amber-500/30 text-amber-300',
  'Observability & Monitoring': 'bg-rose-950/40 border-rose-500/30 text-rose-300',
  'Security & Networking': 'bg-teal-950/40 border-teal-500/30 text-teal-300',
  'Scripting & OS': 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300',
};

export const ToolsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ToolCategoryFilter[] = [
    'All',
    'Cloud & Infrastructure',
    'Containers & Orchestration',
    'IaC & Automation',
    'CI/CD & GitOps',
    'AI & LLM Systems',
    'Observability & Monitoring',
    'Security & Networking',
    'Scripting & OS',
  ];

  const filteredTools = useMemo(() => {
    return ALL_TOOLS_WORKED_ON.filter((tool) => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="tools-showcase" className="py-20 border-b border-slate-800/80 bg-slate-950 relative overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Comprehensive Toolchain &amp; Technologies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              All Tools &amp; Platforms I Work With
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              Production engineering ownership across AWS cloud infrastructure, EKS Kubernetes clusters, modular Terraform IaC, Argo CD GitOps pipelines, Model Context Protocol (MCP) AI, and Datadog APM observability.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (Docker, AWS, MCP...)"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Pills Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'All'
                ? ALL_TOOLS_WORKED_ON.length
                : ALL_TOOLS_WORKED_ON.filter((t) => t.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-md shadow-cyan-950/40'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat !== 'All' && categoryIconMap[cat]}
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Tools Grid with Staggered Scroll Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.04,
                delayChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.name}
                layout
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/40 rounded-xl p-4 transition-all flex flex-col justify-between group shadow-sm hover:shadow-cyan-950/20"
              >
                <div>
                  {/* Top Bar: Category Icon & Proficiency Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      {categoryIconMap[tool.category]}
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-[130px]">
                        {tool.category}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        tool.proficiency === 'Expert'
                          ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                          : tool.proficiency === 'Advanced'
                          ? 'bg-blue-950/60 text-blue-300 border-blue-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {tool.proficiency}
                    </span>
                  </div>

                  {/* Tool Name */}
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{tool.name}</span>
                    {tool.badge && (
                      <span className="text-[10px] font-mono font-normal text-amber-300 bg-amber-950/50 border border-amber-500/30 px-1.5 py-0.5 rounded">
                        {tool.badge}
                      </span>
                    )}
                  </h3>

                  {/* Tool Description */}
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Footer validation indicator */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-400/90">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Production Verified</span>
                  </span>
                  <span className="text-slate-600">Sameer Katre</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 bg-slate-900/30 border border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400 font-mono">
              No tools found matching "{searchQuery}" in this category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline font-mono"
            >
              Reset filters &amp; view all tools
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
