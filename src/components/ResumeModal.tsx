import React, { useState } from 'react';
import { X, Printer, Copy, Check, Award, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
SAMEER KATRE
DevOps Engineer | AWS | Kubernetes (EKS) | Terraform | CI/CD | AI & MCP Integration
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | LinkedIn: ${PERSONAL_INFO.linkedin} | Credly: ${PERSONAL_INFO.credly} | Location: ${PERSONAL_INFO.location}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

CORE TECHNICAL SKILLS
Cloud (Production): AWS -- EC2, EKS, S3, RDS, IAM, VPC, CloudWatch, ECR, Route 53, ALB/NLB, Lambda, Cognito | GCP
Container & Orchestration: Kubernetes (EKS, production) | Docker | Helm (manifests, rollout strategies, HPA) | 10+ Safe Rollback Procedures
Infrastructure as Code: Terraform (modular, multi-environment) | AWS CloudFormation basics
CI/CD & GitOps: Jenkins | Argo CD | Bamboo | Bitbucket Pipelines | GitLab CI | GitHub Actions | 10+ Safe Rollbacks Handled
Serverless & AI Integration: AWS Lambda | Serverless Framework | MCP (Model Context Protocol) | LLM API integration | Claude AI | GitHub Copilot | Prompt Engineering
Observability: Datadog (dashboards, APM, alerts) | Splunk (log pipelines) | CloudWatch (metrics, alarms)
Scripting, OS & Data: Bash | Python | Linux (Ubuntu/Amazon Linux) | MySQL | PostgreSQL

PROFESSIONAL EXPERIENCE
DevOps Engineer · Voters AI (Sep 2026 - Present)
AI-powered civic technology platform | AWS serverless infrastructure | MCP & CI/CD automation | Pune, India
- Building MCP (Model Context Protocol) integrations to connect AI agents with internal tools, AWS services, and data sources -- enabling autonomous AI workflows that reduce manual intervention across the engineering pipeline.
- Architecting serverless computing infrastructure on AWS using Lambda, API Gateway, and event-driven architecture to power AI-driven backend services -- eliminating server management overhead and enabling auto-scaling at zero idle cost.
- Designing and automating CI/CD pipelines for AI model deployment and serverless service delivery using GitHub Actions and AWS CodePipeline.
- Integrating LLM-based AI tooling into development workflows including automated code review, prompt engineering pipelines, and AI-assisted infrastructure management.
- Managing AWS cloud infrastructure including IAM roles, VPC networking, S3 storage, CloudWatch monitoring, and ECR image management.

DevOps Engineer · HotelKey (Jun 2025 - Aug 2026)
Hospitality SaaS platform | AWS EKS production environment | AI product delivery
- Architected and shipped HotelKey Kiosk, an AI-powered guest self-service product live across 100+ hotel properties -- using AWS Cognito for guest authentication and Lambda for serverless backend logic, automating front-desk check-in at production scale.
- Embedded AI-powered code review into Bitbucket CI pipelines using LLM-based tooling, auto-flagging security antipatterns and quality defects pre-merge and lowering the defect escape rate to QA.
- Slashed deployment lead time 40% by consolidating 3 fragmented Jenkins pipelines into one unified Bitbucket + Bamboo + Argo CD workflow, eliminating manual handoffs entirely.
- Eliminated 100% of manual infrastructure provisioning by engineering reusable Terraform modules for EC2, VPC, IAM, S3, and EKS -- cutting environment spin-up from ~4 hours to under 20 minutes (a 92% reduction).
- Executed 10+ safe automated rollback operations with zero downtime during canary and staging release cycles via Argo CD.
- Cut MTTD for production incidents 60% by engineering a unified observability layer across Datadog, CloudWatch, and Splunk.
- Automated proactive alerting by building custom Bash scripts scheduled via crontab for cost anomalies, disk thresholds, and health checks.
- Migrated 20+ non-prod environments from EC2 to EKS using Docker and Argo CD, cutting non-prod infrastructure costs 20%.
- Delivered zero unplanned downtime across 6 major production releases via Kubernetes rolling updates and HPA autoscaling.

DevOps Intern - DevOps Engineer · HotelKey (Jan 2025 - Jun 2025)
Promoted to full-time Engineer in under 6 months based on direct production impact
- Migrated 4 legacy services from bare-metal to Docker + EKS deployment templates, cut new-developer environment setup time 70%, and shipped 15+ deployments via Jenkins + Bitbucket.
- Provisioned foundational AWS infrastructure for 2 new staging environments in under 3 days.

CERTIFICATIONS (Verified on Credly: ${PERSONAL_INFO.credly})
- HashiCorp Certified: Terraform Associate
- AWS Certified Solutions Architect - Associate
- AWS Certified AI Practitioner
- Google Cloud Computing Foundations
- Applying AI Principles with Google Cloud
- Prepare Data for ML APIs on Google Cloud
- Introduction to Large Language Models -- Google Cloud

EDUCATION
B.Tech, Information Technology · G.H. Raisoni College of Engineering (GHRCE)
Jan 2022 - May 2025 | CGPA: 8.85 / 10
    `;
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white text-slate-900 border border-slate-300 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-100 border-b border-slate-200">
          <div className="text-xs font-semibold text-slate-700 font-mono">
            Sameer_Katre_Resume.pdf (Pune, India · ATS Clean View)
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.credly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Credly Badges</span>
              <ExternalLink className="w-3 h-3 text-amber-600" />
            </a>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ATS Resume Document View */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 font-sans space-y-6 text-sm leading-relaxed max-w-3xl mx-auto w-full">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              Sameer Katre
            </h1>
            <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
              DevOps Engineer | AWS | Kubernetes (EKS) | Terraform | CI/CD | AI & MCP Integration
            </div>
            <div className="text-xs text-slate-600 mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>{PERSONAL_INFO.email}</span>
              <span>·</span>
              <span>{PERSONAL_INFO.phone}</span>
              <span>·</span>
              <span>linkedin.com/in/sameer-katre-202884230</span>
              <span>·</span>
              <span className="font-semibold text-slate-900">Pune, Maharashtra, India</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Verified Credly Badges: <a href={PERSONAL_INFO.credly} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">{PERSONAL_INFO.credly}</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-normal text-justify">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Core Technical Skills */}
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              Core Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div>
                <strong className="font-semibold text-slate-900">Cloud (Production):</strong> AWS — EC2, EKS, S3, RDS, IAM, VPC, CloudWatch, ECR, Route 53, ALB/NLB, Lambda, Cognito | GCP
              </div>
              <div>
                <strong className="font-semibold text-slate-900">Container & Orchestration:</strong> Kubernetes (EKS, production) | Docker | Helm (manifests, rollout strategies, HPA) | 10+ Safe Rollbacks
              </div>
              <div>
                <strong className="font-semibold text-slate-900">Infrastructure as Code:</strong> Terraform (modular, multi-environment) | AWS CloudFormation basics
              </div>
              <div>
                <strong className="font-semibold text-slate-900">CI/CD & GitOps:</strong> Jenkins | Argo CD | Bamboo | Bitbucket Pipelines | GitLab CI | GitHub Actions | 10+ Safe Automated Rollbacks
              </div>
              <div>
                <strong className="font-semibold text-slate-900">Serverless & AI Integration:</strong> AWS Lambda | Serverless Framework | MCP (Model Context Protocol) | LLM API integration | Claude AI | GitHub Copilot | Prompt Engineering
              </div>
              <div>
                <strong className="font-semibold text-slate-900">Observability:</strong> Datadog (dashboards, APM, alerts) | Splunk (log pipelines) | CloudWatch (metrics, alarms)
              </div>
              <div>
                <strong className="font-semibold text-slate-900">Scripting, OS & Data:</strong> Bash | Python | Linux (Ubuntu/Amazon Linux) | MySQL | PostgreSQL
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3">
              Professional Experience
            </h2>

            <div className="space-y-5">
              {/* Voters AI */}
              <div>
                <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                  <span>DevOps Engineer · Voters AI</span>
                  <span>Sep 2026 – Present (Pune, India)</span>
                </div>
                <div className="text-[11px] text-slate-500 italic mb-1.5">
                  AI-powered civic technology platform | AWS serverless infrastructure | MCP & CI/CD automation
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
                  <li>Building MCP (Model Context Protocol) integrations to connect AI agents with internal tools, AWS services, and data sources — enabling autonomous AI workflows that reduce manual intervention across the engineering pipeline.</li>
                  <li>Architecting serverless computing infrastructure on AWS using Lambda, API Gateway, and event-driven architecture to power AI-driven backend services — eliminating server management overhead and enabling auto-scaling at zero idle cost.</li>
                  <li>Designing and automating CI/CD pipelines for AI model deployment and serverless service delivery using GitHub Actions and AWS CodePipeline.</li>
                  <li>Integrating LLM-based AI tooling into development workflows including automated code review, prompt engineering pipelines, and AI-assisted infrastructure management.</li>
                  <li>Managing AWS cloud infrastructure including IAM roles, VPC networking, S3 storage, CloudWatch monitoring, and ECR image management.</li>
                </ul>
              </div>

              {/* HotelKey Engineer */}
              <div>
                <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                  <span>DevOps Engineer · HotelKey</span>
                  <span>Jun 2025 – Aug 2026</span>
                </div>
                <div className="text-[11px] text-slate-500 italic mb-1.5">
                  Hospitality SaaS platform | AWS EKS production environment | AI product delivery
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
                  <li>Architected and shipped HotelKey Kiosk, an AI-powered guest self-service product live across 100+ hotel properties — using AWS Cognito for guest authentication and Lambda for serverless backend logic, automating front-desk check-in at production scale.</li>
                  <li>Embedded AI-powered code review into Bitbucket CI pipelines using LLM-based tooling, auto-flagging security antipatterns and quality defects pre-merge and lowering the defect escape rate to QA.</li>
                  <li>Slashed deployment lead time 40% by consolidating 3 fragmented Jenkins pipelines into one unified Bitbucket + Bamboo + Argo CD workflow, eliminating manual handoffs entirely.</li>
                  <li>Eliminated 100% of manual infrastructure provisioning by engineering reusable Terraform modules for EC2, VPC, IAM, S3, and EKS — cutting environment spin-up from ~4 hours to under 20 minutes (a 92% reduction).</li>
                  <li>Successfully managed 10+ safe automated rollback operations with zero downtime using Argo CD GitOps sync policies.</li>
                  <li>Cut MTTD for production incidents 60% by engineering a unified observability layer across Datadog, CloudWatch, and Splunk.</li>
                  <li>Automated proactive alerting by building custom Bash scripts scheduled via crontab for cost anomalies, disk thresholds, and health checks.</li>
                  <li>Migrated 20+ non-prod environments from EC2 to EKS using Docker and Argo CD, cutting non-prod infrastructure costs 20%.</li>
                  <li>Delivered zero unplanned downtime across 6 major production releases via Kubernetes rolling updates and HPA autoscaling.</li>
                </ul>
              </div>

              {/* HotelKey Intern */}
              <div>
                <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                  <span>DevOps Intern - DevOps Engineer · HotelKey</span>
                  <span>Jan 2025 – Jun 2025</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold italic mb-1.5">
                  Promoted to full-time Engineer in under 6 months based on direct production impact
                </div>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
                  <li>Migrated 4 legacy services from bare-metal to Docker + EKS deployment templates, cut new-developer environment setup time 70% via standardized runbooks, and shipped 15+ deployments via Jenkins + Bitbucket.</li>
                  <li>Provisioned foundational AWS infrastructure for 2 new staging environments in under 3 days.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-2">
              <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase">
                Certifications
              </h2>
              <a
                href={PERSONAL_INFO.credly}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 underline font-mono"
              >
                Verify on Credly
              </a>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-700">
              {CERTIFICATIONS.map((c) => (
                <li key={c.id}>
                  <strong className="text-slate-900">{c.name}</strong> ({c.issuer})
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold font-mono tracking-wider text-slate-900 uppercase border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="text-xs text-slate-800">
              <div className="flex items-center justify-between font-bold">
                <span>B.Tech, Information Technology · G.H. Raisoni College of Engineering (GHRCE)</span>
                <span>Jan 2022 – May 2025</span>
              </div>
              <div className="text-slate-600">
                CGPA: <strong className="text-slate-900">8.85 / 10</strong> | Maharashtra
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
