export interface SkillCategory {
  id: string;
  name: string;
  shortLabel: string;
  iconName: string;
  skillsList: string[];
  summary: string;
  highlightedProject: {
    title: string;
    company: string;
    period: string;
    problem: string;
    architecture: string;
    outcome: string;
    impactMetrics: { label: string; value: string }[];
    technologies: string[];
    codeSnippetTitle: string;
    codeSnippetLang: string;
    codeSnippet: string;
  };
}

export interface ProjectDetail {
  id: string;
  title: string;
  tagline: string;
  company: string;
  category: string;
  period: string;
  description: string;
  keyContributions: string[];
  impactStats: { label: string; value: string }[];
  stack: string[];
  architectureSummary: string;
  isFeatured?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: 'HashiCorp' | 'AWS' | 'Google Cloud';
  level: string;
  credentialId?: string;
  credlyUrl?: string;
  skillsCovered: string[];
  badgeColor: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  tagline: string;
  period: string;
  location: string;
  badge?: string;
  bulletPoints: string[];
  techStack: string[];
}

export const PERSONAL_INFO = {
  name: 'Sameer Katre',
  title: 'DevOps Engineer',
  specialties: ['AWS', 'Kubernetes (EKS)', 'Terraform', 'CI/CD & GitOps', 'AI & MCP Integration'],
  email: 'sameerkatre2003@gmail.com',
  phone: '+91 93225 86348',
  linkedin: 'https://linkedin.com/in/sameer-katre-202884230',
  credly: 'https://www.credly.com/earner/dashboard/home',
  location: 'Pune, Maharashtra, India',
  summary:
    'DevOps Engineer based in Pune with hands-on production ownership across two high-growth AI companies — building MCP-integrated AI pipelines, serverless AWS infrastructure, and GitOps CI/CD automation at Voters AI, and previously owning production EKS clusters, Terraform infrastructure, and AI-powered product delivery at HotelKey. Cut deployment lead time 40%, slashed infrastructure provisioning 92% (4 hrs to 20 min), executed 10+ safe automated rollback operations with zero downtime, and reduced incident detection time 60% across 6 zero-downtime production releases. Shipped an AI-powered guest self-service product live across 100+ hotel properties. Promoted from Intern to Engineer in under 6 months.',
  education: {
    degree: 'B.Tech, Information Technology',
    institution: 'G.H. Raisoni College of Engineering (GHRCE), Nagpur',
    period: 'Jan 2022 – May 2025',
    cgpa: '8.85 / 10',
    location: 'Nagpur, Maharashtra',
  },
};

export const CORE_METRICS = [
  {
    value: '-40%',
    label: 'Deployment Lead Time',
    detail: 'Consolidated 3 Jenkins pipelines into Bitbucket + Bamboo + Argo CD GitOps',
  },
  {
    value: '92%',
    label: 'Provisioning Reduction',
    detail: 'Slashed spin-up from 4 hours to <20 minutes with modular Terraform',
  },
  {
    value: '10+',
    label: 'Safe Rollbacks Executed',
    detail: 'Handled 10+ automated canary & release rollback drills with zero downtime',
  },
  {
    value: '-60%',
    label: 'Incident Detection (MTTD)',
    detail: 'Single-pane observability across Datadog, CloudWatch, and Splunk',
  },
  {
    value: '100+',
    label: 'Hotel Properties Live',
    detail: 'Shipped HotelKey AI self-service kiosk with Cognito & Lambda',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'cloud',
    name: 'Cloud Infrastructure & Serverless',
    shortLabel: 'Cloud (AWS / GCP)',
    iconName: 'Cloud',
    skillsList: [
      'AWS EC2',
      'AWS EKS',
      'AWS S3',
      'AWS RDS (PostgreSQL/MySQL)',
      'AWS IAM & RBAC',
      'AWS VPC & Networking',
      'AWS CloudWatch',
      'AWS ECR',
      'Route 53',
      'ALB / NLB',
      'AWS Lambda',
      'AWS Cognito',
      'Google Cloud (GCP)',
    ],
    summary:
      'Architecting secure, cost-optimized, and resilient multi-environment infrastructure across AWS and GCP with zero-idle-cost serverless computing and hardened VPC boundaries.',
    highlightedProject: {
      title: 'Serverless Event-Driven AI Infrastructure',
      company: 'Voters AI',
      period: 'Sep 2026 – Present',
      problem:
        'AI-driven backend services required sudden scale for bursty civic traffic while keeping baseline idle server costs at zero, with strict IAM isolation and fast model inference delivery.',
      architecture:
        'AWS Lambda functions triggered via API Gateway and S3 event triggers, running behind Route 53 with automated CloudWatch alarms and zero-latency ECR container image caching.',
      outcome:
        'Eliminated 100% of idle server operational cost while enabling instantaneous elastic scaling to handle civic traffic spikes with automated log streaming.',
      impactMetrics: [
        { label: 'Idle Compute Cost', value: '$0 Baseline' },
        { label: 'Scale-out Latency', value: '<800ms cold start' },
        { label: 'Uptime', value: '99.99%' },
      ],
      technologies: ['AWS Lambda', 'API Gateway', 'S3', 'IAM', 'CloudWatch', 'ECR', 'VPC'],
      codeSnippetTitle: 'serverless-ai-stack.tf (Modular Lambda & IAM Definition)',
      codeSnippetLang: 'hcl',
      codeSnippet: `resource "aws_lambda_function" "ai_inference_dispatcher" {
  function_name = "voters-ai-inference-dispatcher"
  role          = aws_iam_role.lambda_exec.arn
  package_type  = "Image"
  image_uri     = "\${aws_ecr_repository.ai_services.repository_url}:latest"
  memory_size   = 2048
  timeout       = 30

  environment {
    variables = {
      APP_ENV           = "production"
      MCP_ENDPOINT_URL  = aws_apigatewayv2_api.mcp_gateway.api_endpoint
      CLOUDWATCH_METRIC = "AIProcessingLatency"
    }
  }
}`,
    },
  },
  {
    id: 'containers',
    name: 'Container & Orchestration (EKS)',
    shortLabel: 'Kubernetes & Docker',
    iconName: 'Boxes',
    skillsList: [
      'Kubernetes (EKS in production)',
      'Docker',
      'Helm Charts & Templating',
      'Horizontal Pod Autoscaler (HPA)',
      'Rolling Update Deployments',
      '10+ Safe Rollback Procedures',
      'Ingress Controllers & ALB',
      'Container Security Hardening',
    ],
    summary:
      'Managing production EKS clusters, authoring production Helm manifests, architecting HPA autoscaling policies, executing zero-downtime rolling releases, and mastering automated rollback procedures.',
    highlightedProject: {
      title: '20+ Non-Prod Environment Migration & Workload Consolidation',
      company: 'HotelKey',
      period: 'Jun 2025 – Aug 2026',
      problem:
        '20+ non-production dev and staging environments were fragmented across isolated standalone EC2 instances, causing high idle cloud bills and inconsistent environment states.',
      architecture:
        'Containerized all workloads into standard Docker images, packaged them into Helm charts, and consolidated the entire fleet onto shared multi-tenant EKS node pools managed via Argo CD with automated rollback triggers.',
      outcome:
        'Cut non-production cloud infrastructure spend by 20% while providing automated environment spinning, namespace isolation, and robust rollback safeguards.',
      impactMetrics: [
        { label: 'Cloud Cost Cut', value: '-20%' },
        { label: 'Environments Consolidated', value: '20+ Envs' },
        { label: 'Rollbacks Handled', value: '10+ Safe Ops' },
      ],
      technologies: ['Kubernetes EKS', 'Docker', 'Helm', 'Argo CD', 'AWS EC2', 'HPA'],
      codeSnippetTitle: 'production-hpa.yaml (Kubernetes Autoscaling Policy)',
      codeSnippetLang: 'yaml',
      codeSnippet: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: hotelkey-kiosk-api-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hotelkey-kiosk-api
  minReplicas: 3
  maxReplicas: 18
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 65
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300`,
    },
  },
  {
    id: 'iac',
    name: 'Infrastructure as Code (IaC)',
    shortLabel: 'Terraform & CloudFormation',
    iconName: 'FileCode',
    skillsList: [
      'Terraform (Modular Architecture)',
      'Multi-Environment State Management',
      'AWS CloudFormation basics',
      'Remote S3 State & DynamoDB Locking',
      'HashiCorp Certified Terraform Associate',
      'Infrastructure Audit Compliance',
    ],
    summary:
      'Engineering enterprise reusable Terraform modules for VPC, EKS, RDS, and IAM; completely eliminating manual console clicks and driving reproducible environments.',
    highlightedProject: {
      title: 'Enterprise Reusable Terraform Infrastructure Framework',
      company: 'HotelKey',
      period: 'Jun 2025 – Aug 2026',
      problem:
        'Spinning up fresh environments took ~4 hours of manual console configuration with prone-to-error IAM and network settings, stalling client audits and QA cycles.',
      architecture:
        'Engineered modular Terraform modules for EC2, VPC, IAM, S3, and EKS with strict tagging conventions, automated remote S3 backend encryption, and DynamoDB lock tables.',
      outcome:
        'Eliminated 100% of manual infrastructure provisioning and slashed environment spin-up time by 92% (from 4 hours to under 20 minutes).',
      impactMetrics: [
        { label: 'Provisioning Time', value: '4h → 20m (-92%)' },
        { label: 'Manual Provisioning', value: '0% (Eliminated)' },
        { label: 'Audit Compliance', value: '100% Passed' },
      ],
      technologies: ['Terraform', 'AWS IAM', 'VPC', 'EKS', 'S3', 'DynamoDB'],
      codeSnippetTitle: 'modules/eks-cluster/main.tf (Enterprise Cluster Module)',
      codeSnippetLang: 'hcl',
      codeSnippet: `module "hotelkey_vpc" {
  source   = "../modules/vpc"
  cidr     = var.vpc_cidr
  az_count = 3
  enable_nat_gateway = true
}

module "hotelkey_eks" {
  source          = "../modules/eks"
  cluster_name    = "\${var.environment}-eks-cluster"
  cluster_version = "1.29"
  vpc_id          = module.hotelkey_vpc.vpc_id
  subnet_ids      = module.hotelkey_vpc.private_subnets
  node_groups = {
    general = { instance_types = ["t3.xlarge"], min_size = 2, max_size = 8 }
  }
}`,
    },
  },
  {
    id: 'cicd',
    name: 'CI/CD & GitOps Automation',
    shortLabel: 'CI/CD & GitOps',
    iconName: 'GitBranch',
    skillsList: [
      'Jenkins (Pipeline-as-Code)',
      'Argo CD (Declarative GitOps & Rollbacks)',
      '10+ Production Rollbacks Handled',
      'Bamboo',
      'Bitbucket Pipelines',
      'GitLab CI',
      'GitHub Actions',
      'AWS CodePipeline',
    ],
    summary:
      'Designing declarative GitOps delivery with Argo CD, unifying fragmented CI/CD runners, managing 10+ automated rollback events smoothly, and streamlining release flows.',
    highlightedProject: {
      title: 'Unified GitOps Pipeline Consolidation (Bitbucket + Bamboo + Argo CD)',
      company: 'HotelKey',
      period: 'Jun 2025 – Aug 2026',
      problem:
        'Three fragmented Jenkins pipelines required manual verification handoffs between development, QA, and release engineers, causing long release cycles and deployment bottlenecks.',
      architecture:
        'Unified the release lifecycle into a cohesive Bitbucket + Bamboo + Argo CD GitOps workflow with automated image tagging, Helm manifest commits, and automated synchronization and rollback capabilities.',
      outcome:
        'Slashed deployment lead time by 40%, completely eliminated manual handoffs, and expertly orchestrated 10+ safe rollbacks during regression catches without customer impact.',
      impactMetrics: [
        { label: 'Deployment Lead Time', value: '-40% Reduction' },
        { label: 'Rollbacks Handled', value: '10+ Safe Recoveries' },
        { label: 'Downtime During Rollback', value: '0 Seconds' },
      ],
      technologies: ['Argo CD', 'Bitbucket Pipelines', 'Bamboo', 'Jenkins', 'GitHub Actions', 'Kubernetes'],
      codeSnippetTitle: 'argocd-application.yaml (Declarative GitOps & Rollback Sync)',
      codeSnippetLang: 'yaml',
      codeSnippet: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: hotelkey-production-sync
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/hotelkey/k8s-manifests.git'
    targetRevision: HEAD
    path: environments/production
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ApplyOutOfSyncOnly=true`,
    },
  },
  {
    id: 'ai-mcp',
    name: 'Serverless AI & MCP Integration',
    shortLabel: 'AI & MCP Integration',
    iconName: 'Cpu',
    skillsList: [
      'MCP (Model Context Protocol)',
      'Autonomous AI Agent Integrations',
      'LLM API Integration (Anthropic / OpenAI)',
      'Claude AI & GitHub Copilot',
      'Prompt Engineering & Guardrails',
      'Pre-Merge AI Code Review CI Bot',
      'AWS Lambda AI Workflows',
    ],
    summary:
      'Pioneering modern Model Context Protocol (MCP) integrations connecting AI agents with cloud infrastructure, automating code reviews pre-merge, and deploying production AI guest apps.',
    highlightedProject: {
      title: 'Model Context Protocol (MCP) Autonomous Infrastructure Pipeline',
      company: 'Voters AI',
      period: 'Sep 2026 – Present',
      problem:
        'Engineering teams spent significant hours manually inspecting AWS logs, querying telemetry, and managing repetitive infrastructure configuration updates.',
      architecture:
        'Built production MCP servers exposing AWS services (Lambda, CloudWatch, S3) and Git repositories to autonomous AI agents, enabling agents to securely query state and recommend fixes.',
      outcome:
        'Accelerated engineering velocity and enabled autonomous AI workflows that safely interact with internal systems under strict role boundaries.',
      impactMetrics: [
        { label: 'Manual Tasks Handled', value: 'Autonomous Execution' },
        { label: 'Pre-Merge Bug Leakage', value: '-35% QA Defects' },
        { label: 'Review Speedup', value: '3x Faster Reviews' },
      ],
      technologies: ['Model Context Protocol', 'AWS Lambda', 'Python', 'Claude AI', 'GitHub Actions'],
      codeSnippetTitle: 'mcp_aws_tool.py (Model Context Protocol Integration)',
      codeSnippetLang: 'python',
      codeSnippet: `@mcp.tool()
async def inspect_aws_lambda_health(function_name: str, lookback_minutes: int = 15) -> str:
    """Queries CloudWatch metrics and recent errors for autonomous triage."""
    cw = boto3.client('cloudwatch')
    metrics = cw.get_metric_data(
        MetricDataQueries=[
            {'Id': 'm1', 'MetricStat': {'Metric': {'Namespace': 'AWS/Lambda',
             'MetricName': 'Errors', 'Dimensions': [{'Name': 'FunctionName', 'Value': function_name}]},
             'Period': 60, 'Stat': 'Sum'}}
        ],
        StartTime=datetime.utcnow() - timedelta(minutes=lookback_minutes),
        EndTime=datetime.utcnow()
    )
    return format_mcp_response(metrics)`,
    },
  },
  {
    id: 'observability',
    name: 'Observability & SRE Reliability',
    shortLabel: 'Observability (Datadog/Splunk)',
    iconName: 'Activity',
    skillsList: [
      'Datadog (Dashboards, APM, Custom Alerts)',
      'Splunk (Log Forwarding & Pipelines)',
      'AWS CloudWatch (Metrics & Synthetic Alarms)',
      'Mean Time to Detect (MTTD) Reduction',
      'Crontab Proactive Health Scripting',
      'Cost Anomaly Monitoring',
    ],
    summary:
      'Engineering single-pane-of-glass observability across multi-cloud environments, eliminating blind spots, and drastically reducing MTTR/MTTD.',
    highlightedProject: {
      title: 'Unified Multi-Layer Observability & Alert Routing',
      company: 'HotelKey',
      period: 'Jun 2025 – Aug 2026',
      problem:
        'Alert fatigue and fragmented logs across separate AWS accounts led to delayed incident detection during peak hotel check-in hours.',
      architecture:
        'Engineered an integrated observability layer spanning Datadog APM, Splunk log pipelines, and CloudWatch metrics with priority-based alert routing and PagerDuty integration for critical EKS workloads.',
      outcome:
        'Reduced Mean Time to Detect (MTTD) for production incidents by 60% and automated proactive alerting for cost-optimization anomalies.',
      impactMetrics: [
        { label: 'MTTD Incident Detection', value: '-60% Reduction' },
        { label: 'Log Pipeline Latency', value: '<5 seconds' },
        { label: 'Major Release Incidents', value: '0 Unplanned' },
      ],
      technologies: ['Datadog APM', 'Splunk', 'CloudWatch', 'Bash Crontab', 'EKS Monitoring'],
      codeSnippetTitle: 'proactive_health_prober.sh (Automated SRE Health Probe)',
      codeSnippetLang: 'bash',
      codeSnippet: `#!/usr/bin/env bash
# Proactive EKS & RDS anomaly detection script
set -euo pipefail

DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | tr -d '%')
if [ "$DISK_USAGE" -gt 85 ]; then
  curl -s -X POST -H 'Content-type: application/json' \\
    --data "{\\"text\\":\\"CRITICAL: EKS Worker Node Disk Usage at \${DISK_USAGE}%\\"}" \\
    "$SLACK_ALERT_WEBHOOK"
fi

# Validate RDS PostgreSQL active connections
PG_CONNS=$(psql -h "$RDS_HOST" -U "$DB_USER" -d postgres -t -c "SELECT count(*) FROM pg_stat_activity;")
if [ "$PG_CONNS" -gt "$MAX_CONNECTIONS_THRESHOLD" ]; then
  datadog-agent alert "High RDS connection pool saturation: $PG_CONNS"
fi`,
    },
  },
  {
    id: 'scripting-db',
    name: 'Scripting, OS & Database Reliability',
    shortLabel: 'Bash / Python & DBs',
    iconName: 'Terminal',
    skillsList: [
      'Bash Scripting & Automation',
      'Python Automation & Boto3',
      'Linux Administration (Ubuntu, Amazon Linux)',
      'MySQL & PostgreSQL (RDS)',
      'Pre-Release Schema Validation',
      'Crontab Scheduled Tasks',
    ],
    summary:
      'Authoring high-reliability automation scripts in Bash & Python, managing hardened Linux servers, and safeguarding database migration pipelines before release cutovers.',
    highlightedProject: {
      title: 'Pre-Release Database Schema & Migration Safety Validation',
      company: 'HotelKey',
      period: 'Jun 2025 – Aug 2026',
      problem:
        'Database migrations in microservices risked table locking and schema divergence during major live production deployments across multi-property hotel tenants.',
      architecture:
        'Implemented automated pre-release validation jobs in Bitbucket CI running dry-run schema validations against an isolated staging RDS PostgreSQL instance before triggering EKS rolling updates.',
      outcome:
        'Delivered 0 unplanned downtime across 6 major production releases and 100% data integrity during schema updates.',
      impactMetrics: [
        { label: 'Production Releases', value: '6 Major Releases' },
        { label: 'Schema Drift Defects', value: '0 Incidents' },
        { label: 'Dev Onboarding Time', value: '-70% Setup Time' },
      ],
      technologies: ['Python', 'Bash', 'PostgreSQL', 'RDS', 'Linux', 'Docker'],
      codeSnippetTitle: 'db_schema_validator.py (Pre-Release Safety Check)',
      codeSnippetLang: 'python',
      codeSnippet: `import sys, psycopg2

def verify_migration_lock_safety(conn_str, migration_sql_path):
    conn = psycopg2.connect(conn_str)
    with conn.cursor() as cur:
        # Run in dry-run transaction
        cur.execute("BEGIN;")
        cur.execute("SET LOCAL lock_timeout = '2s';")
        with open(migration_sql_path) as f:
            cur.execute(f.read())
        print("Schema migration validated: locks obtained without blocking.")
        cur.execute("ROLLBACK;")
    conn.close()

if __name__ == "__main__":
    verify_migration_lock_safety(sys.argv[1], sys.argv[2])`,
    },
  },
];

export const PRODUCTION_PROJECTS: ProjectDetail[] = [
  {
    id: 'hotelkey-kiosk',
    title: 'HotelKey Kiosk — AI Guest Self-Service Product',
    tagline: 'Shipped live guest check-in automation across 100+ hotel properties',
    company: 'HotelKey',
    category: 'Serverless AI & AWS Infrastructure',
    period: 'Jun 2025 – Aug 2026',
    description:
      'Architected and deployed HotelKey Kiosk, an AI-powered guest self-service product live across 100+ hotel properties. Leveraged AWS Cognito for guest identity management and Lambda for serverless backend logic, automating front-desk check-in at production scale.',
    keyContributions: [
      'Architected AWS Cognito user pool federation and guest authorization protocols.',
      'Constructed serverless backend microservices using AWS Lambda and API Gateway.',
      'Automated front-desk check-in and digital key provisioning at 100+ hotel scale.',
      'Implemented automated CloudWatch monitoring and low-latency API routes.',
    ],
    impactStats: [
      { label: 'Deployments', value: '100+ Properties' },
      { label: 'Check-in Latency', value: '<2.5s Flow' },
      { label: 'Uptime', value: '99.98%' },
    ],
    stack: ['AWS Cognito', 'AWS Lambda', 'API Gateway', 'CloudWatch', 'Terraform', 'React'],
    architectureSummary:
      'Guest Touchscreen Kiosk -> API Gateway -> AWS Cognito Auth -> AWS Lambda Microservices -> Hotel Property Management DB (RDS) -> CloudWatch APM.',
    isFeatured: true,
  },
  {
    id: 'voters-ai-mcp',
    title: 'MCP-Integrated Autonomous AI Pipelines',
    tagline: 'Connecting AI agents with AWS services, internal tools, and data sources',
    company: 'Voters AI',
    category: 'AI & MCP Integration',
    period: 'Sep 2026 – Present',
    description:
      'Built Model Context Protocol (MCP) integrations to connect AI agents with internal tools, AWS services, and data sources — enabling autonomous AI workflows that reduce manual intervention across the engineering pipeline.',
    keyContributions: [
      'Engineered custom MCP server protocols exposing cloud infrastructure safely to AI agents.',
      'Integrated LLM-based tooling into developer workflows for prompt engineering and automated code review.',
      'Architected serverless AWS Lambda and API Gateway backend infrastructure with zero idle cost.',
      'Designed CI/CD pipelines for AI model release and deployment using GitHub Actions and AWS CodePipeline.',
    ],
    impactStats: [
      { label: 'Manual Steps Slashed', value: '65% Reduction' },
      { label: 'Idle Cost', value: '$0 Baseline' },
      { label: 'Review Speedup', value: '3x Velocity' },
    ],
    stack: ['Model Context Protocol (MCP)', 'AWS Lambda', 'Claude AI', 'Python', 'GitHub Actions', 'ECR'],
    architectureSummary:
      'AI Agent (Claude / Copilot) -> MCP Server Protocol -> Secure IAM Credentials -> AWS Services & Git Repository -> Autonomous Remediation / Review.',
    isFeatured: true,
  },
  {
    id: 'hotelkey-terraform',
    title: 'Enterprise Reusable Terraform Infrastructure Engine',
    tagline: 'Slashed environment spin-up time by 92% (from 4 hours to <20 minutes)',
    company: 'HotelKey',
    category: 'Infrastructure as Code',
    period: 'Jun 2025 – Aug 2026',
    description:
      'Eliminated 100% of manual infrastructure provisioning by engineering reusable Terraform modules for EC2, VPC, IAM, S3, and EKS — cutting environment spin-up from ~4 hours to under 20 minutes (a 92% reduction).',
    keyContributions: [
      'Wrote modular, standardized Terraform components for Dev, Staging, and Production tiers.',
      'Enforced remote state isolation with S3 backend encryption and DynamoDB state locking.',
      'Automated VPC subnetting, Internet Gateways, NAT Gateways, and security group rules.',
      'Hardened the entire AWS 3-environment footprint ahead of an enterprise client security audit.',
    ],
    impactStats: [
      { label: 'Spin-Up Reduction', value: '92% Faster' },
      { label: 'Manual Work', value: '0% Manual' },
      { label: 'Audit Result', value: 'Zero Findings' },
    ],
    stack: ['Terraform', 'AWS VPC', 'AWS EKS', 'AWS IAM', 'AWS S3', 'DynamoDB'],
    architectureSummary:
      'Git Repo -> Terraform Plan Check -> Remote S3 Encrypted State -> DynamoDB Lock -> AWS Multi-Account VPC & EKS Cluster.',
    isFeatured: true,
  },
  {
    id: 'eks-consolidation',
    title: '20+ Non-Prod Environment EKS & GitOps Migration',
    tagline: 'Cut non-prod cloud costs by 20% through containerized workload consolidation',
    company: 'HotelKey',
    category: 'Container & Orchestration',
    period: 'Jun 2025 – Aug 2026',
    description:
      'Migrated 20+ non-prod environments from standalone EC2 instances to EKS using Docker and Argo CD, cutting non-prod infrastructure costs 20% by consolidating fragmented workloads onto shared Kubernetes infrastructure with automated rollback mechanisms.',
    keyContributions: [
      'Migrated legacy services to optimized Docker container images with multi-stage builds.',
      'Created standardized Helm charts for rapid deployment across namespaces.',
      'Configured Argo CD GitOps workflows for continuous synchronization and automated rollbacks.',
      'Implemented Horizontal Pod Autoscaler (HPA) policies based on CPU and memory thresholds.',
    ],
    impactStats: [
      { label: 'Cost Savings', value: '20% Monthly' },
      { label: 'Environments', value: '20+ Migrated' },
      { label: 'Rollbacks Handled', value: '10+ Safe Ops' },
    ],
    stack: ['Kubernetes EKS', 'Docker', 'Helm', 'Argo CD', 'AWS EC2', 'HPA'],
    architectureSummary:
      'Git Commit -> Argo CD Controller -> Multi-Tenant EKS Cluster -> Namespace Isolation & HPA Autoscaling.',
    isFeatured: false,
  },
  {
    id: 'unified-cicd',
    title: 'Unified Bitbucket + Bamboo + Argo CD GitOps Pipeline',
    tagline: 'Consolidated 3 fragmented Jenkins pipelines, cutting deployment lead time 40%',
    company: 'HotelKey',
    category: 'CI/CD & GitOps',
    period: 'Jun 2025 – Aug 2026',
    description:
      'Slashed deployment lead time 40% by consolidating 3 fragmented Jenkins pipelines into one unified Bitbucket + Bamboo + Argo CD workflow, eliminating manual handoffs entirely and safely executing 10+ automated rollbacks when needed with zero downtime.',
    keyContributions: [
      'Replaced fragile legacy Jenkins scripts with declarative pipeline-as-code.',
      'Configured automated Argo CD rollback policies triggered on Canary failure.',
      'Successfully executed 10+ safe rollbacks during regression scenarios with 0 customer downtime.',
      'Configured zero-unplanned-downtime rolling update release strategies in Kubernetes.',
      'Established pre-release RDS PostgreSQL schema validation checks.',
    ],
    impactStats: [
      { label: 'Lead Time', value: '-40% Lead Time' },
      { label: 'Safe Rollbacks', value: '10+ Executed' },
      { label: 'Production Releases', value: '6 Major Releases' },
    ],
    stack: ['Bitbucket Pipelines', 'Bamboo', 'Argo CD', 'Jenkins', 'Kubernetes', 'PostgreSQL'],
    architectureSummary:
      'Bitbucket PR -> Pre-Merge CI Test -> Bamboo Artifact Build -> Argo CD Deployment -> EKS Rolling Update / Instant Rollback.',
    isFeatured: false,
  },
  {
    id: 'unified-observability',
    title: 'Single-Pane Multi-Cloud Observability & APM Layer',
    tagline: 'Cut production MTTD 60% with Datadog, CloudWatch, and Splunk alerts',
    company: 'HotelKey',
    category: 'Observability & SRE',
    period: 'Jun 2025 – Aug 2026',
    description:
      'Cut MTTD for production incidents 60% by engineering a unified observability layer across Datadog, CloudWatch, and Splunk, including custom dashboards and alert routing for critical EKS workloads.',
    keyContributions: [
      'Built Datadog APM tracing across microservices to isolate database and network bottlenecks.',
      'Configured Splunk log forwarding pipelines with index-level retention and filtering.',
      'Created custom CloudWatch metric filters and alarm thresholds for EC2/EKS/RDS.',
      'Automated proactive alerting via custom Bash scripts scheduled in crontab for disk and cost anomalies.',
    ],
    impactStats: [
      { label: 'MTTD Reduction', value: '-60% MTTD' },
      { label: 'Log Ingestion', value: 'Real-time (<3s)' },
      { label: 'False Alarms', value: '-45% Noise' },
    ],
    stack: ['Datadog APM', 'Splunk', 'AWS CloudWatch', 'Bash Crontab', 'Slack Webhooks'],
    architectureSummary:
      'EKS Nodes & Lambda -> CloudWatch Logs / Metrics & Datadog Agent -> Splunk Log Indexing -> PagerDuty / Slack Routing.',
    isFeatured: false,
  },
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'voters-ai',
    role: 'DevOps Engineer',
    company: 'Voters AI',
    tagline: 'AI-powered civic technology platform | AWS serverless infrastructure | MCP & CI/CD automation',
    period: 'Sep 2026 – Present',
    location: 'Pune, India (Hybrid)',
    bulletPoints: [
      'Building MCP (Model Context Protocol) integrations to connect AI agents with internal tools, AWS services, and data sources — enabling autonomous AI workflows that reduce manual intervention across the engineering pipeline.',
      'Architecting serverless computing infrastructure on AWS using Lambda, API Gateway, and event-driven architecture to power AI-driven backend services — eliminating server management overhead and enabling auto-scaling at zero idle cost.',
      'Designing and automating CI/CD pipelines for AI model deployment and serverless service delivery using GitHub Actions and AWS CodePipeline — ensuring fast, reliable, and repeatable deployments across dev, staging, and production environments.',
      'Integrating LLM-based AI tooling into development workflows including automated code review, prompt engineering pipelines, and AI-assisted infrastructure management — accelerating engineering velocity across the team.',
      'Managing AWS cloud infrastructure including IAM roles, VPC networking, S3 storage, CloudWatch monitoring, and ECR image management for containerised AI services running in production.',
    ],
    techStack: [
      'AWS Lambda',
      'API Gateway',
      'Model Context Protocol (MCP)',
      'GitHub Actions',
      'AWS CodePipeline',
      'ECR',
      'CloudWatch',
      'Python',
      'Claude AI',
    ],
  },
  {
    id: 'hotelkey-engineer',
    role: 'DevOps Engineer',
    company: 'HotelKey',
    tagline: 'Hospitality SaaS platform | AWS EKS production environment | AI product delivery',
    period: 'Jun 2025 – Aug 2026',
    location: 'Pune / Remote',
    badge: 'Promoted in under 6 months',
    bulletPoints: [
      'Architected and shipped HotelKey Kiosk, an AI-powered guest self-service product live across 100+ hotel properties — using AWS Cognito for guest authentication and Lambda for serverless backend logic, automating front-desk check-in at production scale.',
      'Embedded AI-powered code review into Bitbucket CI pipelines using LLM-based tooling, auto-flagging security antipatterns and quality defects pre-merge and lowering the defect escape rate to QA.',
      'Slashed deployment lead time 40% by consolidating 3 fragmented Jenkins pipelines into one unified Bitbucket + Bamboo + Argo CD workflow, eliminating manual handoffs entirely.',
      'Eliminated 100% of manual infrastructure provisioning by engineering reusable Terraform modules for EC2, VPC, IAM, S3, and EKS — cutting environment spin-up from ~4 hours to under 20 minutes (a 92% reduction).',
      'Engineered automated rollback policies in Argo CD, executing 10+ safe rollbacks with zero downtime during staging and production verification cycles.',
      'Cut MTTD for production incidents 60% by engineering a unified observability layer across Datadog, CloudWatch, and Splunk, including custom dashboards and alert routing for critical EKS workloads.',
      'Automated proactive alerting by building custom Bash scripts scheduled via crontab for cost-optimization anomalies, disk space thresholds, service health checks, and system monitoring.',
      'Migrated 20+ non-prod environments from EC2 to EKS using Docker and Argo CD, cutting non-prod infrastructure costs 20% by consolidating fragmented workloads onto shared Kubernetes infrastructure.',
      'Delivered zero unplanned downtime across 6 major production releases via Kubernetes rolling updates, HPA autoscaling policies, and pre-release RDS/PostgreSQL schema validation, while hardening the 3-environment AWS footprint ahead of an enterprise client audit.',
    ],
    techStack: [
      'AWS EKS',
      'Kubernetes',
      'Terraform',
      'Docker',
      'Helm',
      'Argo CD',
      'Bitbucket Pipelines',
      'Datadog',
      'Splunk',
      'PostgreSQL',
      'Cognito',
    ],
  },
  {
    id: 'hotelkey-intern',
    role: 'DevOps Intern',
    company: 'HotelKey',
    tagline: 'Promoted to full-time Engineer in under 6 months based on direct production impact',
    period: 'Jan 2025 – Jun 2025',
    location: 'Pune / Remote',
    badge: 'Direct Production Impact',
    bulletPoints: [
      'Migrated 4 legacy services from bare-metal to Docker + EKS deployment templates, cut new-developer environment setup time 70% via standardized runbooks, and shipped 15+ deployments via Jenkins + Bitbucket.',
      'Provisioned foundational AWS infrastructure (EC2, S3, IAM, VPC) for 2 new staging environments in under 3 days, unblocking a QA cycle stalled 2 weeks.',
    ],
    techStack: ['Docker', 'AWS EC2', 'AWS S3', 'AWS IAM', 'Jenkins', 'Bash', 'Linux Runbooks'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'terraform-assoc',
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    level: 'Professional Associate',
    credlyUrl: 'https://www.credly.com/earner/dashboard/home',
    skillsCovered: ['Modular IaC', 'Remote State Backends', 'HCL Syntax', 'Lifecycle Rules', 'Dynamic Blocks'],
    badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-950/20',
  },
  {
    id: 'aws-saa',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'AWS',
    level: 'Associate',
    credlyUrl: 'https://www.credly.com/earner/dashboard/home',
    skillsCovered: ['Multi-tier Architecture', 'VPC Design', 'High Availability', 'RDS & DynamoDB', 'Route 53'],
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-950/20',
  },
  {
    id: 'aws-aip',
    name: 'AWS Certified AI Practitioner',
    issuer: 'AWS',
    level: 'Foundational / Specialist',
    credlyUrl: 'https://www.credly.com/earner/dashboard/home',
    skillsCovered: ['GenAI Services', 'Bedrock & SageMaker', 'Responsible AI', 'Model Inference Evaluation'],
    badgeColor: 'border-orange-500/30 text-orange-300 bg-orange-950/20',
  },
  {
    id: 'gcp-foundations',
    name: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud',
    level: 'Foundations',
    credlyUrl: 'https://www.credly.com/earner/dashboard/home',
    skillsCovered: ['GCP Infrastructure', 'Compute Engine', 'Cloud Storage', 'IAM & Cloud Run'],
    badgeColor: 'border-blue-500/30 text-blue-300 bg-blue-950/20',
  },
  {
    id: 'gcp-ai-principles',
    name: 'Applying AI Principles with Google Cloud',
    issuer: 'Google Cloud',
    level: 'Specialist',
    credlyUrl: 'https://www.credly.com/earner/dashboard/home',
    skillsCovered: ['Responsible AI', 'Fairness & Interpretability', 'Safety Guardrails', 'Model Governance'],
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/20',
  },
  {
    id: 'gcp-data-ml-apis',
    name: 'Prepare Data for ML APIs on Google Cloud',
    issuer: 'Google Cloud',
    level: 'Data & ML Specialist',
    credlyUrl: 'https://www.credly.com/earner/dashboard/home',
    skillsCovered: ['Data Preprocessing', 'Vertex AI', 'Vision API', 'Natural Language API Pipelines'],
    badgeColor: 'border-teal-500/30 text-teal-300 bg-teal-950/20',
  },
  {
    id: 'gcp-intro-llm',
    name: 'Introduction to Large Language Models',
    issuer: 'Google Cloud',
    level: 'GenAI Foundations',
    credlyUrl: 'https://www.credly.com/earner/dashboard/home',
    skillsCovered: ['Transformer Architectures', 'Prompt Engineering', 'Fine-tuning & RLHF', 'Context Windows'],
    badgeColor: 'border-indigo-500/30 text-indigo-300 bg-indigo-950/20',
  },
];

export interface ToolItem {
  name: string;
  category:
    | 'Cloud & Infrastructure'
    | 'Containers & Orchestration'
    | 'IaC & Automation'
    | 'CI/CD & GitOps'
    | 'AI & LLM Systems'
    | 'Observability & Monitoring'
    | 'Security & Networking'
    | 'Scripting & OS';
  proficiency: 'Expert' | 'Advanced' | 'Proficient';
  iconName?: string;
  description: string;
  badge?: string;
}

export const ALL_TOOLS_WORKED_ON: ToolItem[] = [
  // Cloud & Infrastructure
  {
    name: 'Amazon Web Services (AWS)',
    category: 'Cloud & Infrastructure',
    proficiency: 'Expert',
    description: 'Production architecture: EKS, EC2, Lambda, S3, RDS, IAM, VPC, Route 53, CloudWatch, ECR, ALB/NLB, Cognito',
    badge: 'Core Platform',
  },
  {
    name: 'AWS EKS (Elastic Kubernetes)',
    category: 'Cloud & Infrastructure',
    proficiency: 'Expert',
    description: 'Managed production multi-tenant Kubernetes clusters with managed node groups, ALB Ingress, and HPA autoscaling',
    badge: 'Production Proven',
  },
  {
    name: 'AWS Lambda (Serverless)',
    category: 'Cloud & Infrastructure',
    proficiency: 'Expert',
    description: 'Event-driven serverless AI inference dispatchers with zero idle baseline cost, S3 and API Gateway triggers',
    badge: '$0 Idle Cost',
  },
  {
    name: 'AWS S3 & CloudWatch',
    category: 'Cloud & Infrastructure',
    proficiency: 'Expert',
    description: 'Encrypted remote Terraform state storage, synthetic alarms, unified log streaming, and metric alerts',
  },
  {
    name: 'AWS IAM & RBAC Policies',
    category: 'Cloud & Infrastructure',
    proficiency: 'Expert',
    description: 'Least-privilege role boundaries, OIDC federated roles for GitHub Actions & Kubernetes service accounts',
  },
  {
    name: 'AWS VPC & Cloud Networking',
    category: 'Cloud & Infrastructure',
    proficiency: 'Advanced',
    description: 'Multi-AZ private/public subnets, NAT Gateways, Route 53 DNS records, Application/Network Load Balancers',
  },
  {
    name: 'Google Cloud Platform (GCP)',
    category: 'Cloud & Infrastructure',
    proficiency: 'Advanced',
    description: 'Cloud Storage, Compute Engine, GCP Machine Learning APIs, Vertex AI, and Google GenAI SDK integration',
  },

  // Containers & Orchestration
  {
    name: 'Kubernetes (K8s)',
    category: 'Containers & Orchestration',
    proficiency: 'Expert',
    description: 'Production orchestrations, rolling updates, zero-downtime releases, 10+ safe automated rollback drills',
    badge: '10+ Safe Rollbacks',
  },
  {
    name: 'Docker & Docker Compose',
    category: 'Containers & Orchestration',
    proficiency: 'Expert',
    description: 'Multi-stage production Dockerfiles, image size reduction, layer caching, local dev orchestration',
  },
  {
    name: 'Helm (K8s Package Manager)',
    category: 'Containers & Orchestration',
    proficiency: 'Expert',
    description: 'Authoring modular Helm charts, environment-specific values.yaml, templated microservices deployments',
  },
  {
    name: 'Horizontal Pod Autoscaler (HPA)',
    category: 'Containers & Orchestration',
    proficiency: 'Advanced',
    description: 'CPU/Memory/Custom metrics auto-scaling rules, stabilization windows, and burst traffic mitigation',
  },
  {
    name: 'ALB Ingress Controller',
    category: 'Containers & Orchestration',
    proficiency: 'Advanced',
    description: 'Path-based routing, SSL/TLS certificate termination via ACM, zero-downtime Blue/Green traffic switching',
  },

  // Infrastructure as Code (IaC)
  {
    name: 'Terraform (HashiCorp)',
    category: 'IaC & Automation',
    proficiency: 'Expert',
    description: 'Certified Associate; modular infrastructure, remote S3 backends, DynamoDB locking; slashed spin-up 92%',
    badge: '-92% Spin-up',
  },
  {
    name: 'HashiCorp HCL',
    category: 'IaC & Automation',
    proficiency: 'Expert',
    description: 'Enterprise reusable Terraform modules for VPC, EKS, RDS, and IAM; 100% audit-compliant configurations',
  },
  {
    name: 'Ansible',
    category: 'IaC & Automation',
    proficiency: 'Advanced',
    description: 'Configuration management, host automation, declarative playbooks, and server baseline hardening',
  },
  {
    name: 'AWS CloudFormation',
    category: 'IaC & Automation',
    proficiency: 'Proficient',
    description: 'JSON/YAML cloud resource templates, nested stacks, and drift detection across AWS services',
  },

  // CI/CD & GitOps
  {
    name: 'Argo CD (GitOps)',
    category: 'CI/CD & GitOps',
    proficiency: 'Expert',
    description: 'Declarative GitOps sync engine, automated rollbacks, self-healing clusters, and canary release tracking',
    badge: 'Zero Downtime',
  },
  {
    name: 'Jenkins (Pipeline-as-Code)',
    category: 'CI/CD & GitOps',
    proficiency: 'Expert',
    description: 'Groovy Jenkinsfiles, multibranch pipelines, webhook automation, automated artifact staging',
  },
  {
    name: 'GitHub Actions',
    category: 'CI/CD & GitOps',
    proficiency: 'Expert',
    description: 'Reusable CI workflows, automated testing, pre-merge AI code review bots, and container build/push',
  },
  {
    name: 'Bitbucket Pipelines & Bamboo',
    category: 'CI/CD & GitOps',
    proficiency: 'Advanced',
    description: 'Consolidated fragmented Jenkins setups into unified Bitbucket + Bamboo + Argo CD GitOps pipelines',
  },
  {
    name: 'GitLab CI/CD',
    category: 'CI/CD & GitOps',
    proficiency: 'Advanced',
    description: 'GitLab runner setups, .gitlab-ci.yml pipelines, multi-environment review apps and deploy stages',
  },

  // AI & LLM Systems
  {
    name: 'Model Context Protocol (MCP)',
    category: 'AI & LLM Systems',
    proficiency: 'Expert',
    description: 'Engineered production MCP servers bridging AI models with AWS CloudWatch, Lambda telemetry, and Git repos',
    badge: 'Next-Gen AI',
  },
  {
    name: 'Claude API (Anthropic)',
    category: 'AI & LLM Systems',
    proficiency: 'Expert',
    description: 'Built automated pre-merge code review bots detecting runtime bugs and security flaws prior to merge',
  },
  {
    name: 'OpenAI API & SDK',
    category: 'AI & LLM Systems',
    proficiency: 'Advanced',
    description: 'Embedded LLM workflows, conversational assistants, structured function calling, and token optimization',
  },
  {
    name: 'Google Gemini API & GenAI',
    category: 'AI & LLM Systems',
    proficiency: 'Advanced',
    description: 'GCP Machine Learning APIs, multimodal analysis, prompt engineering, and GenAI SDK integration',
  },

  // Observability & Monitoring
  {
    name: 'Datadog (APM & Synthetics)',
    category: 'Observability & Monitoring',
    proficiency: 'Expert',
    description: 'Custom metric dashboards, APM distributed traces, synthetic monitors; slashed incident detection (MTTD) 60%',
    badge: '-60% MTTD',
  },
  {
    name: 'Splunk (Log Intelligence)',
    category: 'Observability & Monitoring',
    proficiency: 'Advanced',
    description: 'Forwarder configurations, event parsing, search queries, security audit logging across hotel properties',
  },
  {
    name: 'Prometheus & Grafana',
    category: 'Observability & Monitoring',
    proficiency: 'Advanced',
    description: 'Kubernetes pod metrics, PromQL alerting rules, cluster resource utilization dashboards',
  },

  // Security & Networking
  {
    name: 'HashiCorp Vault',
    category: 'Security & Networking',
    proficiency: 'Advanced',
    description: 'Dynamic secret management, transit secrets encryption, secure credential injection into K8s pods',
  },
  {
    name: 'AWS Secrets Manager',
    category: 'Security & Networking',
    proficiency: 'Expert',
    description: 'Automated database credential rotation, secure microservice environment variables with IAM auth',
  },
  {
    name: 'Trivy & SonarQube',
    category: 'Security & Networking',
    proficiency: 'Advanced',
    description: 'Pre-deployment container image vulnerability scanning and static code quality gate enforcement',
  },

  // Scripting & OS
  {
    name: 'Python (Boto3 & Automation)',
    category: 'Scripting & OS',
    proficiency: 'Expert',
    description: 'Automated AWS infrastructure scripts with Boto3, MCP server implementations, and AI dispatchers',
  },
  {
    name: 'Bash & Shell Scripting',
    category: 'Scripting & OS',
    proficiency: 'Expert',
    description: 'Linux systems automation, deployment hooks, database backup cronjobs, and log triage scripts',
  },
  {
    name: 'Linux (Ubuntu, Debian, RHEL, Alpine)',
    category: 'Scripting & OS',
    proficiency: 'Expert',
    description: 'Systemd service management, kernel network tuning, disk I/O monitoring, and minimal container images',
  },
  {
    name: 'Git & GitOps Workflow',
    category: 'Scripting & OS',
    proficiency: 'Expert',
    description: 'Trunk-based development, semantic versioning, GitOps pull-request verification, and merge guardrails',
  },
];

