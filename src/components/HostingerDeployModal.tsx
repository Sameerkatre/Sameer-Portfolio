import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  X,
  CheckCircle2,
  Copy,
  Check,
  Server,
  UploadCloud,
  FileCode,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

interface HostingerDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerDeployModal: React.FC<HostingerDeployModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedHtaccess, setCopiedHtaccess] = useState(false);
  const [copiedBuildCmd, setCopiedBuildCmd] = useState(false);

  const htaccessCode = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`;

  const handleCopyHtaccess = () => {
    navigator.clipboard.writeText(htaccessCode);
    setCopiedHtaccess(true);
    setTimeout(() => setCopiedHtaccess(false), 2000);
  };

  const handleCopyBuildCmd = () => {
    navigator.clipboard.writeText('npm run build');
    setCopiedBuildCmd(true);
    setTimeout(() => setCopiedBuildCmd(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Publish Portfolio to Hostinger</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                    Hostinger Ready
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Self-contained · Hardcoded image · Apache SPA routing configured
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm">
            {/* Key Assurance Notice */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white font-semibold">Image Issue Solved</strong>: Your original photo is now directly hardcoded as a Base64 Data URL inside the codebase (<code className="text-cyan-300 font-mono">src/assets/photoDataUrl.ts</code>). When you deploy to Hostinger, the photo will <strong className="text-white font-semibold">never be missing</strong> or 404 because it is bundled directly into the code!
              </div>
            </div>

            {/* Step 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-mono">
                  1
                </span>
                <span>Build the Production Package</span>
              </div>
              <p className="text-xs text-slate-400 pl-8">
                Run this command in the terminal to bundle the entire project into the <code className="text-cyan-300 font-mono">dist/</code> folder:
              </p>
              <div className="ml-8 flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                <span>npm run build</span>
                <button
                  onClick={handleCopyBuildCmd}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px]"
                >
                  {copiedBuildCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBuildCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-mono">
                  2
                </span>
                <span>Open Hostinger File Manager</span>
              </div>
              <ul className="text-xs text-slate-300 pl-8 space-y-1.5 list-disc list-inside">
                <li>Log in to your <strong>Hostinger hPanel</strong> (<a href="https://hpanel.hostinger.com" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-0.5">hpanel.hostinger.com <ExternalLink className="w-3 h-3" /></a>).</li>
                <li>Go to <strong>Websites</strong> &rarr; Click <strong>Manage</strong> next to your domain.</li>
                <li>In the left sidebar, click <strong>Files</strong> &rarr; <strong>File Manager</strong>.</li>
                <li>Double-click to open the <code className="text-cyan-300 font-mono">public_html</code> folder.</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-mono">
                  3
                </span>
                <span>Upload Everything Inside the <code className="text-cyan-300 font-mono">dist/</code> Folder</span>
              </div>
              <p className="text-xs text-slate-300 pl-8 leading-relaxed">
                Upload the contents of your local <code className="text-cyan-300 font-mono">dist/</code> directory directly into <code className="text-cyan-300 font-mono">public_html/</code>:
              </p>
              <div className="ml-8 p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-emerald-400 font-semibold">public_html/</div>
                <div className="pl-4 text-slate-400">├── index.html</div>
                <div className="pl-4 text-slate-400">├── .htaccess  (included in public/ for SPA routes)</div>
                <div className="pl-4 text-slate-400">└── assets/</div>
                <div className="pl-8 text-slate-500">├── index-xxxx.js (contains hardcoded photo)</div>
                <div className="pl-8 text-slate-500">└── index-xxxx.css</div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-mono">
                  4
                </span>
                <span>Included <code className="text-cyan-300 font-mono">.htaccess</code> for Hostinger Apache</span>
              </div>
              <p className="text-xs text-slate-400 pl-8">
                We already placed this file in <code className="text-cyan-300 font-mono">public/.htaccess</code>. It automatically gets copied into <code className="text-cyan-300 font-mono">dist/</code> during build so refresh on any page route will never return a 404:
              </p>
              <div className="ml-8 relative">
                <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                  {htaccessCode}
                </pre>
                <button
                  onClick={handleCopyHtaccess}
                  className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-800"
                >
                  {copiedHtaccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHtaccess ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ready for Instant Hostinger Upload</span>
            </span>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              Got It
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
