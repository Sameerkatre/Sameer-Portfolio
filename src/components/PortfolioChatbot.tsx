import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, CORE_METRICS, CERTIFICATIONS } from '../data/portfolioData';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Award,
  Linkedin,
  MapPin,
  RefreshCw,
  Terminal,
  FileText,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: Array<{
    label: string;
    type: 'link' | 'action' | 'copy';
    url?: string;
    actionId?: string;
    payload?: string;
  }>;
}

interface PortfolioChatbotProps {
  onOpenResume?: () => void;
  onOpenTerminal?: () => void;
}

export const PortfolioChatbot: React.FC<PortfolioChatbotProps> = ({
  onOpenResume,
  onOpenTerminal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedActionId, setCopiedActionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialBotMessage: ChatMessage = {
    id: 'welcome-1',
    sender: 'bot',
    text: `Hello! 👋 I'm Sameer Katre's DevOps & AI Portfolio Assistant. Based in Pune, India, Sameer specializes in AWS EKS, modular Terraform, 10+ safe automated rollbacks, and Model Context Protocol (MCP) AI pipelines.\n\nAsk me any question below, or pick a topic to get started!`,
    timestamp: 'Just now',
    actions: [
      {
        label: 'Connect on LinkedIn',
        type: 'link',
        url: PERSONAL_INFO.linkedin,
      },
      {
        label: 'Verify Credly Badges',
        type: 'link',
        url: PERSONAL_INFO.credly,
      },
      {
        label: 'Copy Email',
        type: 'copy',
        payload: PERSONAL_INFO.email,
        actionId: 'copy-email-init',
      },
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);

  const quickPrompts = [
    'Tell me about the 10+ safe rollbacks',
    'What did he build at Voters AI (MCP)?',
    'What are his Terraform & EKS metrics?',
    'What are his 7 certifications & Credly?',
    'Is Sameer available in Pune?',
    'How do I publish this site on Hostinger?',
    'How can I contact Sameer directly?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const generateAnswer = (query: string): { text: string; actions?: ChatMessage['actions'] } => {
    const q = query.toLowerCase().trim();

    // 10+ Safe Rollbacks
    if (q.includes('rollback') || q.includes('10+') || q.includes('revert') || q.includes('safe rollback')) {
      return {
        text: `**10+ Safe Automated Rollbacks Executed**:\n\n• **Where**: During production GitOps releases at HotelKey and Voters AI.\n• **How**: Implemented declarative GitOps with Argo CD and canary release metrics. Automated health checks monitor error rates and latency thresholds immediately post-deploy.\n• **Outcome**: Executed 10+ zero-downtime automated rollbacks when regressions were detected in canary stages, guaranteeing 0 seconds of customer-facing downtime across 6 major production releases.\n• **Tooling**: Argo CD, Kubernetes Helm, AWS CloudWatch, Datadog APM alerts.`,
        actions: [
          { label: 'Try Pipeline Simulator', type: 'link', url: '#pipeline-simulator' },
          { label: 'View Experience Timeline', type: 'link', url: '#experience' },
        ],
      };
    }

    // Terraform & EKS
    if (q.includes('terraform') || q.includes('eks') || q.includes('spin-up') || q.includes('spinup') || q.includes('iac') || q.includes('92%')) {
      return {
        text: `**Terraform & AWS EKS Impact Highlights**:\n\n• **92% Spin-Up Velocity**: Slashed environment provisioning from 4 hours to under 20 minutes by designing enterprise-grade reusable Terraform modules (VPC, EKS, RDS, S3, IAM) with remote S3 backend state locking in DynamoDB.\n• **20+ Envs Consolidated**: Containerized workloads across 20+ standalone non-production EC2 environments and consolidated them into shared, multi-tenant EKS node pools, cutting cloud spend by 20%.\n• **Credentials**: HashiCorp Certified: Terraform Associate & AWS Certified Solutions Architect.`,
        actions: [
          { label: 'View Skills Matrix', type: 'link', url: '#skills-matrix' },
          { label: 'Verify Terraform Cert', type: 'link', url: PERSONAL_INFO.credly },
        ],
      };
    }

    // Voters AI & MCP
    if (q.includes('voters ai') || q.includes('mcp') || q.includes('model context protocol') || q.includes('ai pipeline') || q.includes('claude') || q.includes('agent')) {
      return {
        text: `**Voters AI & Model Context Protocol (MCP)**:\n\n• **Role**: DevOps & AI Systems Engineer (Sep 2026 – Present).\n• **MCP Architecture**: Built production MCP servers connecting autonomous AI agents directly to AWS services (Lambda, CloudWatch, S3) and Git repositories under strict RBAC controls.\n• **Pre-Merge AI Code Review Bot**: Engineered an autonomous CI bot powered by the Claude API that inspects Pull Requests before merge, slashing QA defect leaks by 35%.\n• **$0 Idle Compute**: Architected event-driven serverless AWS Lambda inference dispatchers with zero baseline idle cost.`,
        actions: [
          { label: 'View MCP Visualizer', type: 'link', url: '#mcp-visualizer' },
          { label: 'Connect on LinkedIn', type: 'link', url: PERSONAL_INFO.linkedin },
        ],
      };
    }

    // Certifications & Credly
    if (q.includes('cert') || q.includes('credly') || q.includes('credential') || q.includes('aws certified') || q.includes('hashicorp')) {
      return {
        text: `**7 Certified Cloud, IaC & AI Industry Credentials**:\n\n1. **HashiCorp Certified**: Terraform Associate\n2. **AWS Certified**: Solutions Architect – Associate\n3. **AWS Certified**: AI Practitioner\n4. **Google Cloud**: Computing Foundations\n5. **Google Cloud**: Applying AI Principles\n6. **Google Cloud**: Prepare Data for ML APIs\n7. **Google Cloud**: Introduction to Large Language Models\n\nAll credentials are independently verifiable on Sameer's official Credly dashboard.`,
        actions: [
          { label: 'Verify All on Credly', type: 'link', url: PERSONAL_INFO.credly },
          { label: 'View Certifications Grid', type: 'link', url: '#certifications' },
        ],
      };
    }

    // Hostinger Publishing
    if (q.includes('hostinger') || q.includes('publish') || q.includes('deploy') || q.includes('hosting')) {
      return {
        text: `**How to Publish this Website on Hostinger (Zero Errors)**:\n\n1. **Build Production Assets**: Run \`npm run build\` in your terminal. This outputs the complete production build into the \`dist/\` folder.\n2. **Hardcoded Self-Contained Photo**: Sameer's original photo is hardcoded as a Base64 Data URL, so it will NEVER 404 or disappear on Hostinger!\n3. **Upload to Hostinger**:\n   • Log into Hostinger hPanel -> Go to **Websites** -> **File Manager**.\n   • Open the \`public_html/\` directory.\n   • Upload all files and folders from inside \`dist/\` directly into \`public_html/\` (including \`.htaccess\`, \`index.html\`, and \`assets/\`).\n4. **Instant SPA Routing**: We have included an Apache \`.htaccess\` file with mod_rewrite rules so page refreshes and subroutes never throw 404 errors!\n5. **Launch**: Open your domain in your browser — your portfolio is live!`,
        actions: [
          { label: 'Copy Email for Help', type: 'copy', payload: PERSONAL_INFO.email, actionId: 'copy-email-hostinger' },
          { label: 'View Full Resume', type: 'action', actionId: 'open-resume' },
        ],
      };
    }

    // Location & Pune
    if (q.includes('pune') || q.includes('location') || q.includes('relocate') || q.includes('remote') || q.includes('where is')) {
      return {
        text: `**Location & Work Preferences**:\n\n• **Current Base**: Pune, Maharashtra, India.\n• **Availability**: Actively open to DevOps Engineer, Cloud Architect, and AI Systems roles.\n• **Work Modes**: Open to Hybrid (Pune / Mumbai / Bangalore) as well as Full-Time Remote positions globally.`,
        actions: [
          { label: 'Get in Touch', type: 'link', url: '#contact' },
          { label: 'Connect on LinkedIn', type: 'link', url: PERSONAL_INFO.linkedin },
        ],
      };
    }

    // Contact & Hiring
    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('resume')) {
      return {
        text: `**Sameer Katre's Direct Contact Information**:\n\n• **Email**: ${PERSONAL_INFO.email}\n• **Phone**: ${PERSONAL_INFO.phone}\n• **LinkedIn**: ${PERSONAL_INFO.linkedin}\n• **Credly**: ${PERSONAL_INFO.credly}\n• **Location**: Pune, Maharashtra, India\n\nFeel free to reach out via email or LinkedIn for immediate interview availability!`,
        actions: [
          { label: 'Copy Email', type: 'copy', payload: PERSONAL_INFO.email, actionId: 'copy-email-contact' },
          { label: 'Open LinkedIn Profile', type: 'link', url: PERSONAL_INFO.linkedin },
          { label: 'Open ATS Resume', type: 'action', actionId: 'open-resume' },
        ],
      };
    }

    // Tools & Tech Stack
    if (q.includes('tool') || q.includes('stack') || q.includes('technology') || q.includes('skill') || q.includes('docker') || q.includes('python')) {
      return {
        text: `**Core Tools & Technologies Mastered**:\n\n• **Cloud**: AWS (EKS, EC2, Lambda, S3, RDS, IAM, VPC, CloudWatch, ECR), GCP\n• **Containers**: Kubernetes, Docker, Helm, HPA, ALB Ingress Controller\n• **IaC**: Terraform (Modular Architecture, S3 Locking), Ansible, CloudFormation\n• **CI/CD**: Argo CD (GitOps), Jenkins, GitHub Actions, Bitbucket, Bamboo\n• **AI/LLM**: Model Context Protocol (MCP), Claude API, OpenAI API, Gemini API\n• **Observability**: Datadog APM, AWS CloudWatch, Splunk, Prometheus, Grafana\n• **Languages**: Python (Boto3, Async), Bash/Shell Scripting, Linux (Ubuntu, RHEL).`,
        actions: [
          { label: 'Explore Tools Showcase', type: 'link', url: '#tools-showcase' },
          { label: 'Open CLI Terminal', type: 'action', actionId: 'open-terminal' },
        ],
      };
    }

    // Education
    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('cgpa')) {
      return {
        text: `**Academic Background**:\n\n• **Degree**: B.Tech in Information Technology\n• **Institution**: G.H. Raisoni College of Engineering (GHRCE), Nagpur, Maharashtra\n• **CGPA**: 8.85 / 10\n• **Period**: Jan 2022 – May 2025`,
        actions: [
          { label: 'View Timeline', type: 'link', url: '#experience' },
          { label: 'Open Resume', type: 'action', actionId: 'open-resume' },
        ],
      };
    }

    // Generic Fallback with intelligent context
    return {
      text: `Thanks for asking! Sameer Katre is a DevOps Engineer based in Pune, India, with production ownership across high-growth AI companies (Voters AI and HotelKey).\n\nKey Highlights:\n• **10+ Safe Automated Rollbacks** executed with zero downtime via Argo CD GitOps.\n• **-92% IaC Provisioning Velocity** with modular Terraform.\n• **MCP-Integrated AI Pipelines** on serverless AWS Lambda.\n• **7 Industry Cloud & AI Certifications** verified on Credly.\n\nWould you like to know more about his work experience, certifications, contact info, or how to deploy this site to Hostinger?`,
      actions: [
        { label: '10+ Safe Rollbacks', type: 'link', url: '#pipeline-simulator' },
        { label: '7 Certifications', type: 'link', url: PERSONAL_INFO.credly },
        { label: 'Connect on LinkedIn', type: 'link', url: PERSONAL_INFO.linkedin },
        { label: 'Contact Sameer', type: 'link', url: '#contact' },
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAnswer(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse.text,
        timestamp: 'Just now',
        actions: botResponse.actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: NonNullable<ChatMessage['actions']>[number]) => {
    if (action.type === 'copy' && action.payload) {
      navigator.clipboard.writeText(action.payload);
      setCopiedActionId(action.actionId || action.payload);
      setTimeout(() => setCopiedActionId(null), 2000);
    } else if (action.type === 'action') {
      if (action.actionId === 'open-resume' && onOpenResume) {
        onOpenResume();
      } else if (action.actionId === 'open-terminal' && onOpenTerminal) {
        onOpenTerminal();
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2.5 px-4 py-3 rounded-full text-xs font-semibold shadow-2xl backdrop-blur-md transition-all group ${
            isOpen
              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-950/50'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-cyan-950/60 hover:scale-105'
          }`}
          title="Open Q&A Chatbot about Sameer Katre"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Close Q&amp;A</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Bot className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span>Ask AI about Sameer</span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-40 w-[92vw] sm:w-[420px] max-h-[82vh] h-[600px] flex flex-col bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
                  <Bot className="w-4 h-4 text-slate-950" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Sameer's Q&amp;A Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300">
                    DevOps &amp; MCP AI · Pune, India
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([initialBotMessage])}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Reset conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompts Carousel */}
            <div className="px-3 py-2 bg-slate-900/40 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 whitespace-nowrap">
                Ask:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 text-[11px] font-mono bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 rounded-lg whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {/* Action buttons inside bot messages */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap gap-1.5">
                        {msg.actions.map((act, aIdx) => {
                          if (act.type === 'link' && act.url) {
                            return (
                              <a
                                key={aIdx}
                                href={act.url}
                                target={act.url.startsWith('#') ? '_self' : '_blank'}
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                              >
                                <span>{act.label}</span>
                                <ExternalLink className="w-3 h-3 text-cyan-400" />
                              </a>
                            );
                          }

                          if (act.type === 'copy') {
                            const isCopied = copiedActionId === (act.actionId || act.payload);
                            return (
                              <button
                                key={aIdx}
                                onClick={() => handleActionClick(act)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-emerald-300 hover:text-emerald-200 transition-colors"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-emerald-400" />
                                    <span>{act.label}</span>
                                  </>
                                )}
                              </button>
                            );
                          }

                          return (
                            <button
                              key={aIdx}
                              onClick={() => handleActionClick(act)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3 text-cyan-400" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center shrink-0 mt-0.5 text-slate-950 font-bold text-[10px]">
                      <User className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center text-xs text-slate-400 font-mono">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl rounded-bl-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about EKS, 10+ rollbacks, Hostinger..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 text-slate-950 transition-colors shadow-sm"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
