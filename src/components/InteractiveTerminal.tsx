import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { PERSONAL_INFO, CORE_METRICS, CERTIFICATIONS, PRODUCTION_PROJECTS } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenContact,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">
            Sameer Katre CLI — DevOps & AI Infrastructure Terminal v2.4 (Pune, India)
          </div>
          <div className="text-xs text-slate-400">
            Type <span className="text-cyan-300">help</span> to view available commands, or click the quick chips below.
          </div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300 text-xs">
            <div className="text-cyan-400 font-bold mb-1">Available Commands:</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">skills</span> List technical competencies by category</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">projects</span> Display production case studies & impact</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">rollbacks</span> View 10+ safe automated rollback operations</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">credly</span> Open Credly credentials verification profile</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">mcp</span> Inspect Model Context Protocol architecture at Voters AI</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">metrics</span> Show verified production performance indicators</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">certs</span> List all 7 cloud, IaC, and AI certifications</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">experience</span> Career history & promotion details</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">resume</span> View / print ATS-formatted resume</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">contact</span> Display email, phone, location (Pune), and LinkedIn</div>
            <div><span className="text-emerald-400 font-mono w-28 inline-block">clear</span> Clear terminal buffer</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">Core Technical Skills:</div>
            <div><span className="text-cyan-300">Cloud (AWS/GCP):</span> EC2, EKS, S3, RDS, IAM, VPC, CloudWatch, ECR, Route 53, ALB/NLB, Lambda, Cognito, GCP</div>
            <div><span className="text-cyan-300">Containers:</span> Kubernetes (EKS in production), Docker, Helm, HPA, Rolling Updates, 10+ Safe Rollbacks</div>
            <div><span className="text-cyan-300">IaC:</span> Terraform (modular, multi-env), CloudFormation basics</div>
            <div><span className="text-cyan-300">CI/CD:</span> Jenkins, Argo CD GitOps, Bamboo, Bitbucket Pipelines, GitLab CI, GitHub Actions</div>
            <div><span className="text-cyan-300">AI & Serverless:</span> MCP (Model Context Protocol), Claude AI, Copilot, Prompt Engineering, AWS Lambda</div>
            <div><span className="text-cyan-300">Observability:</span> Datadog APM, Splunk log pipelines, CloudWatch alarms</div>
            <div><span className="text-cyan-300">Scripting & DBs:</span> Bash, Python, Linux (Ubuntu/Amazon Linux), MySQL, PostgreSQL</div>
          </div>
        );
        break;

      case 'rollbacks':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">10+ Safe Automated Rollbacks Handled:</div>
            <p>Engineered automated Argo CD GitOps and Kubernetes ReplicaSet rollback procedures during Canary defect detections:</p>
            <div className="text-emerald-400">• 10+ rollback recovery operations executed with zero customer impact or database corruption.</div>
            <div className="text-emerald-400">• Sub-5s automatic failback to previous verified immutable ECR container tag.</div>
          </div>
        );
        break;

      case 'credly':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-amber-300 font-bold">Credly Badge Profile:</div>
            <div>Direct Dashboard: <a href={PERSONAL_INFO.credly} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{PERSONAL_INFO.credly}</a></div>
            <div className="text-slate-400">Contains verified credentials from HashiCorp and Amazon Web Services.</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">Production Case Studies:</div>
            {PRODUCTION_PROJECTS.map((p) => (
              <div key={p.id} className="border-l border-slate-700 pl-2">
                <div className="font-semibold text-white">{p.title} ({p.company})</div>
                <div className="text-slate-400">{p.tagline}</div>
                <div className="text-cyan-300 text-[11px]">Impact: {p.impactStats.map((s) => `${s.label}: ${s.value}`).join(' | ')}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'mcp':
        output = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">Model Context Protocol (MCP) @ Voters AI:</div>
            <p>Sameer engineers native MCP servers exposing internal tools, AWS services (Lambda, CloudWatch, S3), and Git repos to autonomous AI agents.</p>
            <div className="text-emerald-400">• Enables safe autonomous workflows with zero manual console intervention.</div>
            <div className="text-emerald-400">• Built pre-merge AI code review bot reducing QA defect escape rates.</div>
          </div>
        );
        break;

      case 'metrics':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold mb-1">Production Metrics:</div>
            {CORE_METRICS.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-cyan-300 font-mono font-bold w-16">{m.value}</span>
                <span className="text-white font-medium">{m.label}</span>
                <span className="text-slate-400">({m.detail})</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'certifications':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold mb-1">7 Industry Certifications (Verify on Credly: {PERSONAL_INFO.credly}):</div>
            {CERTIFICATIONS.map((c) => (
              <div key={c.id}>
                • <span className="text-white font-semibold">{c.name}</span> <span className="text-slate-400">({c.issuer} - {c.level})</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">Career Progression:</div>
            <div>
              <span className="text-white font-semibold">DevOps Engineer · Voters AI</span> (Sep 2026 – Present, Pune)
              <div className="text-slate-400">AWS serverless, MCP AI integrations, GitHub Actions & CodePipeline.</div>
            </div>
            <div>
              <span className="text-white font-semibold">DevOps Engineer · HotelKey</span> (Jun 2025 – Aug 2026)
              <div className="text-emerald-400">★ Promoted in &lt;6 months from Intern based on direct production impact.</div>
              <div className="text-slate-400">Production EKS clusters, Terraform -92% spin-up, HotelKey Kiosk 100+ properties, 10+ safe rollbacks.</div>
            </div>
          </div>
        );
        break;

      case 'resume':
        onOpenResume();
        output = <div className="text-xs text-cyan-300">Opening full ATS resume modal...</div>;
        break;

      case 'contact':
      case 'hire':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <div className="text-cyan-400 font-bold">Contact Sameer Katre:</div>
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-300 underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-white font-mono">{PERSONAL_INFO.phone}</span></div>
            <div>Location: <span className="text-cyan-300 font-medium">Pune, Maharashtra, India</span></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{PERSONAL_INFO.linkedin}</a></div>
            <div>Credly: <a href={PERSONAL_INFO.credly} target="_blank" rel="noreferrer" className="text-amber-300 underline">{PERSONAL_INFO.credly}</a></div>
            <div className="pt-1 text-emerald-400">Available for DevOps, Cloud Infrastructure, and AI system engineering roles in Pune & Remote!</div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = (
          <div className="text-xs text-rose-400">
            Command not recognized: "{rawCmd}". Type <span className="text-cyan-300 font-mono">help</span> for a list of commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
      setInputVal('');
    }
  };

  const handleChipClick = (cmd: string) => {
    executeCommand(cmd);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div
        className={`bg-slate-950 border border-slate-800 rounded-2xl flex flex-col shadow-2xl transition-all duration-300 overflow-hidden ${
          isMaximized ? 'w-full h-full' : 'max-w-3xl w-full h-[580px]'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold text-slate-200">
              sameer-katre-cli (pune-node)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              title={isMaximized ? 'Restore size' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              title="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-950/80 border-b border-slate-900 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <span className="text-slate-500 shrink-0">Quick run:</span>
          {['help', 'skills', 'rollbacks', 'credly', 'projects', 'mcp', 'metrics', 'certs', 'resume', 'contact'].map((c) => (
            <button
              key={c}
              onClick={() => handleChipClick(c)}
              className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 shrink-0 transition-colors"
            >
              ${c}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 font-mono overflow-y-auto space-y-4 text-xs leading-relaxed scrollbar-thin">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span className="text-emerald-400">sameer@pune-devops:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-t border-slate-800">
          <span className="text-emerald-400 font-mono text-xs">sameer@pune-devops:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or click quick chips above..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => {
              executeCommand(inputVal);
              setInputVal('');
            }}
            className="text-slate-400 hover:text-cyan-400 p-1"
            title="Execute"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
