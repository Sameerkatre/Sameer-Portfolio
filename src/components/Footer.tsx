import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { FileText, Linkedin, Mail, Terminal, Award } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume, onOpenTerminal }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-cyan-400" />
            <span>{PERSONAL_INFO.name}</span>
          </div>
          <span className="hidden sm:inline text-slate-700">·</span>
          <span className="text-xs text-slate-400">
            DevOps & AI Systems Engineer
          </span>
          <span className="hidden sm:inline text-slate-700">·</span>
          <span className="text-xs text-cyan-400/90 font-medium">
            Pune, Maharashtra, India
          </span>
        </div>

        {/* Quiet links including Credly */}
        <div className="flex items-center gap-5 text-xs text-slate-400">
          <button
            onClick={onOpenTerminal}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
          </button>
          <button
            onClick={onOpenResume}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
          <a
            href={PERSONAL_INFO.credly}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-400/80"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Credly</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
