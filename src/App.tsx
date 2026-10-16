/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsProjectMatrix } from './components/SkillsProjectMatrix';
import { PipelineSimulator } from './components/PipelineSimulator';
import { McpArchitectureVisualizer } from './components/McpArchitectureVisualizer';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CertificationsGrid } from './components/CertificationsGrid';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseProjectModal = () => {
    setSelectedProjectId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* Animated interactive cursor with text & button hover feedback */}
      <CustomCursor />

      {/* Dynamic top scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Top Navbar adhering to 3-zone contract */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={handleOpenContact}
      />

      <main className="flex-1">
        {/* Hero Section with Split Screen & 5-Column Metric Strip */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Core Request: Skill-to-Project Highlighting Matrix */}
        <SkillsProjectMatrix onSelectProject={handleOpenProjectModal} />

        {/* Dynamic & Animated CI/CD GitOps Pipeline Simulator with 10+ Rollbacks simulation */}
        <PipelineSimulator />

        {/* Model Context Protocol (MCP) & Autonomous AI Agent Visualizer */}
        <McpArchitectureVisualizer />

        {/* Featured Case Studies & Production Systems Bento Grid */}
        <ProjectShowcase
          selectedProjectId={selectedProjectId}
          onCloseModal={handleCloseProjectModal}
          onOpenProject={handleOpenProjectModal}
        />

        {/* Professional Experience, 6-Month Promotion, and Education */}
        <ExperienceTimeline />

        {/* All 7 Industry Cloud, IaC & AI Certifications with Credly */}
        <CertificationsGrid />

        {/* Interactive Contact Section with Pune Location */}
        <ContactSection />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Floating Quick Action Launcher for Terminal CLI */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 text-cyan-300 hover:text-white hover:bg-slate-800 border border-slate-700/80 shadow-xl backdrop-blur-md transition-all text-xs font-mono group"
          title="Open interactive DevOps CLI"
        >
          <TerminalIcon className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">sameer-cli (pune)</span>
        </button>
      </div>

      {/* Interactive Terminal Modal / Drawer */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => {
          setIsTerminalOpen(false);
          setIsResumeOpen(true);
        }}
        onOpenContact={() => {
          setIsTerminalOpen(false);
          handleOpenContact();
        }}
      />

      {/* ATS Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
