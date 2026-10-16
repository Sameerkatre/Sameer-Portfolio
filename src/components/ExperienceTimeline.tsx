import React from 'react';
import { motion } from 'framer-motion';
import { WORK_EXPERIENCE, PERSONAL_INFO } from '../data/portfolioData';
import { Award, GraduationCap, CheckCircle2 } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-slate-800/80 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12"
        >
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            Career Trajectory
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Professional Experience & Fast-Track Growth
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base leading-relaxed">
            Hands-on production ownership from day one. Rapidly promoted from Intern to Engineer in under 6 months at HotelKey after architecting critical cloud infrastructure and shipping production AI products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Work History with Staggered Entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
            className="lg:col-span-8 space-y-8"
          >
            {WORK_EXPERIENCE.map((exp) => (
              <motion.div
                key={exp.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 relative hover:border-slate-700 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                      <span>{exp.company}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">{exp.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {exp.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                    <span className="text-xs font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
                      {exp.period}
                    </span>
                    {exp.badge && (
                      <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 px-2 py-0.5 rounded">
                        ★ {exp.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="mt-5 space-y-3">
                  {exp.bulletPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack used */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono bg-slate-950 text-slate-400 px-2.5 py-0.5 rounded border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education & Promotion Spotlight with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Rapid Promotion Highlight Box */}
            <div className="bg-gradient-to-br from-cyan-950/30 to-slate-900 border border-cyan-800/40 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400">
                <Award className="w-5 h-5 text-cyan-300" />
                <span className="text-xs font-mono uppercase tracking-wider font-bold">
                  Growth Trajectory
                </span>
              </div>
              <h4 className="text-lg font-bold text-white leading-snug">
                Promoted from Intern to Engineer in Under 6 Months
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Earned direct conversion to full-time DevOps Engineer after migrating bare-metal legacy services to Docker+EKS templates, reducing onboarding times by 70%, and unblocking stalled staging environments within days.
              </p>
              <div className="pt-2 text-xs font-mono text-cyan-300">
                15+ releases shipped · 10+ safe rollbacks
              </div>
            </div>

            {/* Formal Education Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Academic Foundation
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  {PERSONAL_INFO.education.degree}
                </h4>
                <div className="text-xs text-slate-300 mt-1 leading-snug">
                  {PERSONAL_INFO.education.institution}
                </div>
                <div className="text-xs text-slate-400 mt-2 flex items-center justify-between font-mono">
                  <span>{PERSONAL_INFO.education.period}</span>
                  <span className="text-cyan-400 font-bold">
                    CGPA: {PERSONAL_INFO.education.cgpa}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                Specialized in Computer Networks, Cloud Architecture, Operating Systems, and Distributed Computing.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
