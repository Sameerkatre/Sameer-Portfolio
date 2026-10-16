import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, FileText, Send, Award, Linkedin } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Skills & Projects', href: '#skills-matrix' },
    { label: 'Pipeline Simulator', href: '#pipeline-simulator' },
    { label: 'Featured Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Animated Brand Wordmark */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shadow-sm shadow-cyan-400/80 group-hover:scale-125 transition-transform" />
          <span className="relative">
            {PERSONAL_INFO.name}
            <span className="block h-0.5 bg-gradient-to-r from-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-normal">
            Pune
          </span>
        </motion.a>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Quick Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Direct LinkedIn Link near Credly */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-300 bg-blue-950/40 border border-blue-500/40 rounded-lg hover:bg-blue-900/50 hover:text-blue-100 transition-all whitespace-nowrap shadow-sm shadow-blue-950/30"
            title="Direct link to Sameer Katre on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            <span>LinkedIn</span>
          </a>

          {/* Credly Profile Link */}
          <a
            href={PERSONAL_INFO.credly}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-950/30 border border-amber-600/40 rounded-lg hover:bg-amber-950/50 hover:text-amber-200 transition-colors whitespace-nowrap"
            title="Verify badges on Credly"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Credly</span>
          </a>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:border-slate-500 hover:text-white transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </button>

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-cyan-950/40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg border border-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 border-b border-slate-800 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="py-1 text-sm text-blue-300 font-medium flex items-center gap-2 hover:text-blue-200"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>Direct LinkedIn Profile</span>
            </a>
            <a
              href={PERSONAL_INFO.credly}
              target="_blank"
              rel="noreferrer"
              className="py-1 text-sm text-amber-300 font-medium flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verify Badges on Credly</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full text-left py-1 text-sm text-cyan-400 font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
