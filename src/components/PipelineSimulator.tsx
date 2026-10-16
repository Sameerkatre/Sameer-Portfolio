import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GitCommit,
  Bot,
  Layers,
  Container,
  RefreshCw,
  Activity,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Terminal,
  Undo2,
  ShieldAlert,
} from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  short: string;
  icon: React.ReactNode;
  duration: string;
  description: string;
  terminalLogs: string[];
  command: string;
}

const PIPELINE_STAGES: Stage[] = [
  {
    id: 'git',
    name: 'Git Commit & Webhook',
    short: '01. Push',
    icon: <GitCommit className="w-4 h-4" />,
    duration: '1.2s',
    description: 'Developer commits code to Bitbucket / GitHub; triggers automated webhook dispatch.',
    command: 'git push origin main (commit 8f3a9d2: feat(kiosk): add cognito auth handler)',
    terminalLogs: [
      '[git] Hook received: push event on branch refs/heads/main',
      '[git] Commit 8f3a9d2: feat(kiosk): add cognito auth handler & lambda dispatch',
      '[git] Dispatching event to CI runner worker-pool-eks-04... Done',
    ],
  },
  {
    id: 'ai-review',
    name: 'AI Pre-Merge Code Review',
    short: '02. AI Review',
    icon: <Bot className="w-4 h-4" />,
    duration: '3.4s',
    description: 'LLM tool scans pull request diffs for security antipatterns, hardcoded secrets, and defect escapes.',
    command: 'python scripts/ci_llm_code_reviewer.py --diff HEAD~1 --strict-security',
    terminalLogs: [
      '[ai-review] Inspecting 4 changed files (342 additions, 18 deletions)...',
      '[ai-review] Checking IAM least-privilege compliance: PASSED',
      '[ai-review] Checking secret leakage / hardcoded tokens: 0 found',
      '[ai-review] Checking defect escape patterns: PASSED. AI Approval generated.',
    ],
  },
  {
    id: 'terraform',
    name: 'Terraform Plan & State Lock',
    short: '03. IaC Check',
    icon: <Layers className="w-4 h-4" />,
    duration: '2.8s',
    description: 'Modular Terraform plan verifies AWS VPC, EKS, and IAM policies against remote DynamoDB state lock.',
    command: 'terraform plan -out=tfplan.binary -var-file=environments/prod.tfvars',
    terminalLogs: [
      '[terraform] Initializing AWS provider v5.42 and remote S3 state backend...',
      '[terraform] Acquired DynamoDB lock on table: hotelkey-terraform-locks',
      '[terraform] Plan: 1 to add, 0 to change, 0 to destroy. Zero configuration drift detected.',
      '[terraform] Released lock. Plan artifact signed.',
    ],
  },
  {
    id: 'docker',
    name: 'Multi-Stage Build & ECR Push',
    short: '04. Containerize',
    icon: <Container className="w-4 h-4" />,
    duration: '4.1s',
    description: 'Builds lightweight scratch container, executes vulnerability scans, and pushes immutable tag to AWS ECR.',
    command: 'docker build --platform linux/amd64 -t 123456789.dkr.ecr.us-east-1.amazonaws.com/ai-service:v2.4 .',
    terminalLogs: [
      '[docker] Step 1/6: FROM node:20-alpine AS builder',
      '[docker] Step 4/6: RUN npm run build && npm prune --production',
      '[docker] Step 6/6: COPY --from=builder /app/dist ./dist (Image size: 48.2MB)',
      '[docker] Pushing SHA256 digest to AWS ECR us-east-1... Pushed successfully.',
    ],
  },
  {
    id: 'gitops',
    name: 'Argo CD GitOps EKS Sync',
    short: '05. GitOps Sync',
    icon: <RefreshCw className="w-4 h-4" />,
    duration: '3.5s',
    description: 'Argo CD controller detects new image tag in Git repository and executes declarative rolling sync to EKS.',
    command: 'argocd app sync hotelkey-production --prune --strategy=rolling',
    terminalLogs: [
      '[argocd] Comparing target revision HEAD with live cluster state...',
      '[argocd] Syncing Deployment/hotelkey-kiosk-api with 3 rolling replicas...',
      '[argocd] Pod/kiosk-api-7b8f-1: ContainerCreating -> Running [Healthy]',
      '[argocd] Pod/kiosk-api-7b8f-2: Running [Healthy]. Sync status: Synced.',
    ],
  },
  {
    id: 'observability',
    name: 'Datadog APM & Canary Health',
    short: '06. Canary APM',
    icon: <Activity className="w-4 h-4" />,
    duration: '2.1s',
    description: 'CloudWatch alarms and Datadog APM verify zero latency spike, 0 error rate, and healthy HPA targets.',
    command: 'datadog-cli canary-verify --service kiosk-api --threshold-error 0.001',
    terminalLogs: [
      '[datadog] Polling APM traces for hotelkey-kiosk-api in namespace production...',
      '[datadog] P99 Latency: 42ms (baseline 45ms) | Error Rate: 0.00%',
      '[datadog] Horizontal Pod Autoscaler healthy (3/18 replicas ready).',
      '[datadog] ZERO UNPLANNED DOWNTIME. Production release completed with 100% success.',
    ],
  },
];

export const PipelineSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isRollbackRunning, setIsRollbackRunning] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
  const [activeInspectedStage, setActiveInspectedStage] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>(PIPELINE_STAGES[0].terminalLogs);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && currentStageIndex < PIPELINE_STAGES.length) {
      const stage = PIPELINE_STAGES[currentStageIndex];
      setActiveInspectedStage(currentStageIndex);
      setLogs((prev) => [...prev, ...stage.terminalLogs]);

      timer = setTimeout(() => {
        setCompletedStages((prev) => [...prev, currentStageIndex]);
        if (currentStageIndex + 1 < PIPELINE_STAGES.length) {
          setCurrentStageIndex(currentStageIndex + 1);
        } else {
          setIsRunning(false);
        }
      }, 1600);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStageIndex]);

  const handleStartSimulation = () => {
    setIsRollbackRunning(false);
    setLogs(['>>> Initializing automated production CI/CD & GitOps pipeline run...']);
    setCompletedStages([]);
    setCurrentStageIndex(0);
    setIsRunning(true);
  };

  const handleRollbackSimulation = () => {
    setIsRunning(false);
    setIsRollbackRunning(true);
    setCompletedStages([0, 1, 2, 3, 4]);
    setCurrentStageIndex(4);
    setActiveInspectedStage(4);
    setLogs([
      '>>> INITIATING AUTOMATED GITOPS ROLLBACK DRILL (10+ Handled in Production)...',
      '[argocd] Canary anomaly detected in v2.4.1 (Simulated HTTP 500 error spike > 1.5%)',
      '[argocd] Executing automated rollback policy to previous healthy ReplicaSet (revision v2.4.0)...',
      '[kubectl] Rolling back deployment "hotelkey-kiosk-api" to release revision 18...',
      '[eks] Terminating unstable canary pods gracefully; rerouting ingress traffic to healthy v2.4.0 pods...',
      '[argocd] Rollback completed in 4.2 seconds. Traffic restored 100% with ZERO customer downtime.',
      '[datadog] Status: HEALTHY. Error rate 0.00%. Automated rollback drill verified.',
    ]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsRollbackRunning(false);
    setCurrentStageIndex(-1);
    setCompletedStages([]);
    setActiveInspectedStage(0);
    setLogs(PIPELINE_STAGES[0].terminalLogs);
  };

  const selectStageForInspection = (index: number) => {
    setActiveInspectedStage(index);
  };

  return (
    <section id="pipeline-simulator" className="py-20 border-b border-slate-800/80 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
              Interactive GitOps Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Automated CI/CD & GitOps Delivery Simulator
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              Experience the release automation and automated rollback procedures Sameer engineered at HotelKey & Voters AI — integrating pre-merge AI reviews, modular Terraform, containerized ECR pushes, and Argo CD GitOps synchronization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800 rounded-lg hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleRollbackSimulation}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-purple-300 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 rounded-lg transition-colors"
              title="Test automated GitOps rollback"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Simulate 10+ Safe Rollback</span>
            </button>

            <button
              onClick={handleStartSimulation}
              disabled={isRunning}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                isRunning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-md shadow-cyan-950/40'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Pipeline Running...' : 'Simulate Production Run'}</span>
            </button>
          </div>
        </motion.div>

        {/* Pipeline Visual Track with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8"
        >
          {/* Progress overview */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-4 border-b border-slate-800/80">
            <div>
              Status:{' '}
              <span className={isRunning ? 'text-amber-400 font-bold' : isRollbackRunning ? 'text-purple-400 font-bold' : completedStages.length === PIPELINE_STAGES.length ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {isRunning ? 'DEPLOYMENT IN PROGRESS' : isRollbackRunning ? 'ROLLBACK EXECUTED (0 DOWNTIME)' : completedStages.length === PIPELINE_STAGES.length ? 'RELEASE SUCCEEDED (0 DOWNTIME)' : 'IDLE / READY'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Total Lead Time: ~17.1s simulated (Cut 40% in prod)</span>
            </div>
          </div>

          {/* Interactive Stage Nodes with Staggered Entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.15 },
              },
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative"
          >
            {PIPELINE_STAGES.map((stage, idx) => {
              const isCurrent = currentStageIndex === idx;
              const isDone = completedStages.includes(idx);
              const isInspected = activeInspectedStage === idx;

              let nodeBg = 'bg-slate-950/70 border-slate-800 text-slate-400';
              if (isDone) {
                nodeBg = 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300';
              } else if (isCurrent) {
                nodeBg = 'bg-cyan-950/40 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50';
              }

              return (
                <motion.button
                  key={stage.id}
                  variants={{
                    hidden: { opacity: 0, y: 16, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => selectStageForInspection(idx)}
                  className={`text-left p-3.5 rounded-xl border transition-all relative flex flex-col justify-between min-h-[110px] ${nodeBg} ${
                    isInspected ? 'ring-2 ring-slate-400/40' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                      {stage.icon}
                    </span>
                    <span className="text-[10px] font-mono opacity-80">
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      ) : (
                        stage.duration
                      )}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">
                      {stage.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">
                      {stage.short}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Detailed Inspector for Selected Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
            {/* Stage Specs */}
            <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>Stage {activeInspectedStage + 1} of {PIPELINE_STAGES.length}</span>
                <span>·</span>
                <span>{PIPELINE_STAGES[activeInspectedStage].name}</span>
              </div>
              <h4 className="text-base font-bold text-white">
                {PIPELINE_STAGES[activeInspectedStage].name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {PIPELINE_STAGES[activeInspectedStage].description}
              </p>

              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 mb-1">Command Triggered:</div>
                <div className="bg-slate-900 px-3 py-2 rounded-lg font-mono text-xs text-cyan-300 border border-slate-800 break-all">
                  $ {PIPELINE_STAGES[activeInspectedStage].command}
                </div>
              </div>
            </div>

            {/* Live Pipeline Terminal Output */}
            <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-mono text-slate-300">pipeline.stdout</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {isRunning ? 'Streaming stdout...' : isRollbackRunning ? 'Rollback logged' : 'Session static'}
                </span>
              </div>
              <div className="p-4 font-mono text-xs text-slate-300 space-y-1.5 overflow-y-auto max-h-56 scrollbar-thin">
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className={`leading-relaxed ${
                      log.includes('PASSED') || log.includes('Healthy') || log.includes('Done') || log.includes('100%') || log.includes('HEALTHY')
                        ? 'text-emerald-400'
                        : log.includes('>>>')
                        ? 'text-cyan-400 font-bold'
                        : log.includes('ROLLBACK') || log.includes('rollback')
                        ? 'text-purple-300'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
