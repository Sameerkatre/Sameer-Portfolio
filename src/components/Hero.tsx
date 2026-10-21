import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, CORE_METRICS } from '../data/portfolioData';
import { SAMEER_PHOTO_DATA_URL, ACTIVE_PROFILE_IMAGE } from '../assets/photoDataUrl';
import profilePhotoAsset from '../assets/Profile_Photo_264310ba.jpeg';
import devopsBanner from '../assets/images/devops_infrastructure_banner_1792135786250.jpg';
import {
  ArrowRight,
  Terminal,
  Play,
  Linkedin,
  MapPin,
  Check,
  Copy,
  Server,
  Award,
  ExternalLink,
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenTerminal }) => {
  const [activeView, setActiveView] = useState<'photo' | 'topology'>('photo');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Dynamic animated headline capabilities
  const rotatingCapabilities = [
    'Autonomous MCP AI Systems',
    'Production EKS Clusters',
    'GitOps & 10+ Safe Rollbacks',
    'Automated Terraform IaC',
    'Zero-Downtime AWS Deployments',
  ];
  const [capabilityIndex, setCapabilityIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCapabilityIndex((prev) => (prev + 1) % rotatingCapabilities.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [rotatingCapabilities.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-8 pb-16 border-b border-slate-800/80 overflow-hidden bg-slate-950">
      {/* Background ambient grid mesh with cyan/blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Clean unboxed metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
              <span>DevOps Engineer</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-white font-semibold">Pune, India</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>AWS & Kubernetes (EKS)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Terraform IaC</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>MCP AI Integration</span>
            </div>

            {/* Animated Headline with Dynamic Rotating Competencies */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-snug">
              <span>Architecting Resilient Cloud &amp; </span>
              <span className="inline-block relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={capabilityIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {rotatingCapabilities[capabilityIndex]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="text-cyan-400 ml-1 inline-block"
                >
                  _
                </motion.span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              DevOps Engineer based in <strong className="text-white font-semibold">Pune, India</strong> with hands-on production ownership across two high-growth AI companies.
              Currently building <strong className="text-white font-semibold">MCP-integrated AI pipelines</strong> and serverless infrastructure at <strong className="text-cyan-300 font-semibold">Voters AI</strong>; previously scaled <strong className="text-white font-semibold">EKS clusters</strong>, cut environment spin-up <strong className="text-cyan-300 font-semibold">92% via Terraform</strong>, and managed <strong className="text-cyan-300 font-semibold">10+ safe rollbacks</strong> at <strong className="text-cyan-300 font-semibold">HotelKey</strong>.
            </p>

            {/* Quick Contact & Verification Badges with Pune Location and Direct LinkedIn & Credly */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs text-slate-400">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors bg-slate-900/70 px-2.5 py-1.5 rounded-lg border border-slate-800"
                title="Click to copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span className="font-mono">{PERSONAL_INFO.email}</span>
                {copiedEmail && <span className="text-emerald-400 font-sans">Copied!</span>}
              </button>

              {/* Direct LinkedIn link near Credly */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-blue-300 hover:text-blue-100 hover:bg-blue-900/50 transition-all bg-blue-950/50 px-3 py-1.5 rounded-lg border border-blue-500/40 font-semibold shadow-sm shadow-blue-950/30"
                title="Direct link to Sameer Katre on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>

              {/* Direct Credly badge link */}
              <a
                href={PERSONAL_INFO.credly}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-100 hover:bg-amber-900/50 transition-all bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/40 font-semibold shadow-sm shadow-amber-950/30"
                title="View Credly badges and certifications"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Credly Badges</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>

              <div className="inline-flex items-center gap-1.5 text-cyan-300 bg-slate-900/70 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-medium">Pune, Maharashtra, India</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#skills-matrix"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-md shadow-cyan-950/40"
              >
                <span>Explore Skills & Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#pipeline-simulator"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                <span>Live Pipeline Simulator</span>
              </a>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-mono text-slate-300 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>CLI Terminal</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Visual Container with PROPER UNCLIPPED ALIGNMENT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-sm shadow-2xl">
              {/* Header inside visual card */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-cyan-300 pl-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>sameer_katre.tf</span>
                  </span>
                </div>

                {/* Controls: View Switcher */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setActiveView('photo')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        activeView === 'photo'
                          ? 'bg-slate-800 text-cyan-300 font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Photo
                    </button>
                    <button
                      onClick={() => setActiveView('topology')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        activeView === 'topology'
                          ? 'bg-slate-800 text-cyan-300 font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Topology
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body with PROPER VERTICAL ALIGNMENT & ZERO CUTOFF */}
              <div className="relative h-[480px] sm:h-[530px] rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 flex items-center justify-center">
                {activeView === 'photo' ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950">
                    {/* User attached photo in src & hardcoded Data URL for Hostinger reliability */}
                    <img
                      src={ACTIVE_PROFILE_IMAGE || SAMEER_PHOTO_DATA_URL || profilePhotoAsset}
                      alt="Sameer Katre - DevOps Engineer based in Pune"
                      className="w-full h-full object-contain object-top transition-all duration-300 select-none"
                    />

                    {/* Bottom gradient scrim with name & status - clean with NO upload tags */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent pt-12 pb-3 px-4 pointer-events-none">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-sm font-bold text-white tracking-wide">
                            Sameer Katre
                          </div>
                          <div className="text-xs text-cyan-300 font-mono">
                            DevOps Engineer · Pune, India
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                          Open to Roles
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={devopsBanner}
                      alt="DevOps Architecture Topology"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 text-xs text-slate-300">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Production EKS + Serverless + GitOps Mesh</span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Argo CD · Terraform Modules · AWS Lambda · Datadog APM
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status footer with real quantified badges including 10+ rollbacks */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">AWS / EKS</div>
                  <div className="text-xs font-semibold text-cyan-300 font-mono">6 Prod Releases</div>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Terraform</div>
                  <div className="text-xs font-semibold text-emerald-300 font-mono">-92% Spin-up</div>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">GitOps</div>
                  <div className="text-xs font-semibold text-purple-300 font-mono">10+ Rollbacks</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width 5-column Quantitative Impact Strip with Scroll Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="mt-16 pt-8 border-t border-slate-800/80"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CORE_METRICS.map((metric, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.95 },
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
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-slate-900/40 rounded-xl p-4 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight text-cyan-400 tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {metric.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
