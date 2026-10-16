import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Network, Server, Play, ShieldCheck, Sparkles } from 'lucide-react';

interface McpScenario {
  id: string;
  name: string;
  agentPrompt: string;
  toolCall: string;
  mcpMethod: string;
  response: string;
  impact: string;
}

const MCP_SCENARIOS: McpScenario[] = [
  {
    id: 'lambda-triage',
    name: 'Lambda Incident Auto-Triage',
    agentPrompt: 'Analyze recent Lambda timeout errors in production and check for VPC ENI exhaustion.',
    toolCall: 'mcp.aws.inspect_lambda_telemetry(func="ai-inference", metric="Errors", lookback=15)',
    mcpMethod: 'tools/call -> aws_cloudwatch_query',
    response: 'Found 12 timeouts at 02:14 UTC caused by database connection pool saturation. VPC ENIs healthy (84% available). Recommended action: increase RDS proxy pool size to 40.',
    impact: 'Replaced 45 minutes of manual AWS console log digging with instant automated diagnosis.',
  },
  {
    id: 'terraform-diff',
    name: 'Terraform State Drift Remediation',
    agentPrompt: 'Detect any drift between production EKS cluster state and git repo modules.',
    toolCall: 'mcp.iac.validate_drift(env="production", target="module.hotelkey_eks")',
    mcpMethod: 'tools/call -> terraform_plan_inspect',
    response: 'State matches 100%. Node group auto-scaling min=3, max=18 verified. No unmanaged resources discovered in VPC subnet-08f3.',
    impact: 'Ensured 100% audit readiness and zero configuration divergence across 3 environments.',
  },
  {
    id: 'pr-audit',
    name: 'Pre-Merge Security Audit',
    agentPrompt: 'Review pull request #148 for IAM wildcard actions and hardcoded credentials.',
    toolCall: 'mcp.git.review_diff(pr_number=148, ruleset="iam-least-privilege")',
    mcpMethod: 'tools/call -> bitbucket_pr_review',
    response: 'Flagged line 42: "Action": "s3:*" violates least privilege. Generated recommended patch: "Action": ["s3:GetObject", "s3:PutObject"] restricted to bucket arn.',
    impact: 'Lowered QA defect escape rate by 35% and prevented insecure IAM configurations pre-merge.',
  },
];

export const McpArchitectureVisualizer: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(MCP_SCENARIOS[0].id);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState<number>(3);

  const activeScenario = MCP_SCENARIOS.find((s) => s.id === selectedScenarioId) || MCP_SCENARIOS[0];

  const handleRunMcp = () => {
    setIsExecuting(true);
    setExecutionStep(1);

    setTimeout(() => {
      setExecutionStep(2);
      setTimeout(() => {
        setExecutionStep(3);
        setIsExecuting(false);
      }, 700);
    }, 700);
  };

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-950/60 relative">
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
              Next-Gen AI & DevOps Integration
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Model Context Protocol (MCP) in Production
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              At Voters AI, Sameer engineers native MCP servers that bridge autonomous AI agents (Claude, Copilot) directly with AWS cloud infrastructure and Git pipelines — replacing repetitive manual DevOps intervention with auditable autonomous actions.
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {MCP_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedScenarioId(scenario.id);
                  setExecutionStep(3);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  scenario.id === selectedScenarioId
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {scenario.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interactive Architecture Flow Diagram with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8"
        >
          {/* 3-Tier Visual Flow with Staggered Entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          >
            {/* Tier 1: AI Agent */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`p-5 rounded-xl border transition-all ${
                executionStep >= 1
                  ? 'bg-slate-950/80 border-cyan-500/40 text-white shadow-lg shadow-cyan-950/20'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-mono font-semibold uppercase text-cyan-300">
                    Tier 1: AI Agent
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Claude / Copilot</span>
              </div>
              <div className="text-xs text-slate-400 mb-1">Intent / Prompt:</div>
              <div className="text-xs font-medium text-slate-200 bg-slate-900/90 p-3 rounded-lg border border-slate-800 leading-relaxed italic">
                "{activeScenario.agentPrompt}"
              </div>
            </motion.div>

            {/* Tier 2: Sameer's MCP Server Gateway */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`p-5 rounded-xl border transition-all ${
                executionStep >= 2
                  ? 'bg-slate-950/80 border-cyan-400 text-white ring-1 ring-cyan-500/30'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Network className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold uppercase text-emerald-300">
                    Tier 2: MCP Server (Sameer)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">JSON-RPC Protocol</span>
              </div>
              <div className="text-xs text-slate-400 mb-1">Protocol Tool Call:</div>
              <div className="text-xs font-mono text-emerald-300 bg-slate-900/90 p-3 rounded-lg border border-slate-800 break-all">
                {activeScenario.toolCall}
              </div>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enforced IAM Least-Privilege & RBAC Tokens</span>
              </div>
            </motion.div>

            {/* Tier 3: AWS Cloud & Git Targets */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`p-5 rounded-xl border transition-all ${
                executionStep >= 3
                  ? 'bg-slate-950/80 border-purple-500/40 text-white shadow-lg shadow-purple-950/20'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-mono font-semibold uppercase text-purple-300">
                    Tier 3: AWS & GitOps
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Lambda · EKS · CloudWatch</span>
              </div>
              <div className="text-xs text-slate-400 mb-1">Target Action:</div>
              <div className="text-xs font-medium text-slate-200 bg-slate-900/90 p-3 rounded-lg border border-slate-800 leading-relaxed">
                Direct Boto3 telemetry fetch & schema evaluation without browser console latency.
              </div>
            </motion.div>
          </motion.div>

          {/* Execution Result Banner with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenario.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-bold text-white">Autonomous Agent Response</span>
                </div>

                <button
                  onClick={handleRunMcp}
                  disabled={isExecuting}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap self-start"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isExecuting ? 'Invoking MCP Tool...' : 'Re-Run Protocol Test'}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-mono bg-slate-900/70 p-4 rounded-lg border border-slate-800">
                {activeScenario.response}
              </p>

              <div className="flex items-center gap-2 text-xs text-cyan-300">
                <span className="font-semibold text-white">Engineering Impact:</span>
                <span>{activeScenario.impact}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
