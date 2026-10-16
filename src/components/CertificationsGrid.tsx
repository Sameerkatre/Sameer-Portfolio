import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS, PERSONAL_INFO } from '../data/portfolioData';
import { Award, ShieldCheck, ExternalLink, Linkedin } from 'lucide-react';

export const CertificationsGrid: React.FC = () => {
  const [selectedIssuer, setSelectedIssuer] = useState<'All' | 'HashiCorp' | 'AWS' | 'Google Cloud'>('All');

  const filteredCerts = CERTIFICATIONS.filter((c) => {
    if (selectedIssuer === 'All') return true;
    return c.issuer === selectedIssuer;
  });

  return (
    <section id="certifications" className="py-20 border-b border-slate-800/80 bg-slate-950 relative">
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
              Industry Credentials
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              7 Certified Cloud, IaC & AI Credentials
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              Certified across HashiCorp Terraform, Amazon Web Services (Solutions Architect & AI Practitioner), and Google Cloud GenAI & Machine Learning APIs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Direct LinkedIn Profile Link next to Credly */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-300 bg-blue-950/40 hover:bg-blue-900/50 border border-blue-500/40 rounded-lg transition-colors shadow-sm"
              title="Direct link to Sameer Katre on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-blue-400" />
            </a>

            {/* Direct Credly Profile Button */}
            <a
              href={PERSONAL_INFO.credly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 border border-amber-500/40 rounded-lg transition-colors shadow-sm"
              title="Verify badges on Credly profile"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Verify on Credly</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>

            {/* Issuer Filters */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
              {(['All', 'HashiCorp', 'AWS', 'Google Cloud'] as const).map((issuer) => (
                <button
                  key={issuer}
                  onClick={() => setSelectedIssuer(issuer)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedIssuer === issuer
                      ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {issuer}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Credentials Grid with Staggered Scroll Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.96 },
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
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-300 font-semibold">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {cert.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {cert.name}
                </h3>

                <div className="mt-4 pt-3 border-t border-slate-800/60">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Validated Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsCovered.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Credential</span>
                </span>
                <a
                  href={PERSONAL_INFO.credly}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px]"
                >
                  <span>Credly</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
