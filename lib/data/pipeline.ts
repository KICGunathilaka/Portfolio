export interface PipelineStage {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  tools: string[];
  metrics?: string;
  details: string[];
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "dev",
    label: "Developer",
    icon: "👨‍💻",
    color: "#A78BFA",
    description: "The journey begins with a developer writing code locally with hot-reload and instant feedback.",
    tools: ["VS Code", "ESLint", "Prettier", "Husky", "lint-staged"],
    details: [
      "Local development with Docker Compose for service dependencies",
      "Pre-commit hooks enforce code quality and formatting",
      "Branch naming conventions automatically link to Jira tickets",
    ],
  },
  {
    id: "push",
    label: "Git Push",
    icon: "📤",
    color: "#38BDF8",
    description: "Code is pushed to a feature branch, triggering automated webhooks across the pipeline.",
    tools: ["Git", "GitHub", "Branch Protection Rules"],
    details: [
      "Protected main branch requires 2 approvals and passing checks",
      "Automatic draft PR creation on feature branch push",
      "Semantic commit message validation",
    ],
  },
  {
    id: "pr",
    label: "Pull Request",
    icon: "🔀",
    color: "#34D399",
    description: "PR triggers automated labeling, reviewer assignment, and preliminary checks.",
    tools: ["GitHub Actions", "Danger JS", "CodeRabbit AI"],
    details: [
      "AI-powered code review suggestions with CodeRabbit",
      "Auto-assign reviewers based on CODEOWNERS",
      "PR size labels and complexity scoring",
    ],
  },
  {
    id: "review",
    label: "Code Review",
    icon: "🔍",
    color: "#F59E0B",
    description: "Human review with automated assistance, checking architecture patterns and best practices.",
    tools: ["GitHub Reviews", "SonarCloud", "Snyk"],
    details: [
      "SonarCloud quality gate with zero new critical issues policy",
      "Architecture fitness functions to enforce patterns",
      "Dependency vulnerability scanning on every PR",
    ],
  },
  {
    id: "build",
    label: "Build",
    icon: "🔨",
    color: "#E14504",
    description: "Parallel build matrix compiles and packages the application with caching for speed.",
    tools: ["GitHub Actions", "Nx", "Turborepo", "MSBuild"],
    details: [
      "Parallel builds with GitHub Actions matrix strategy",
      "Remote caching with Nx Cloud: 80% cache hit rate",
      "Artifact versioning with semantic versioning from commits",
    ],
    metrics: "Build time: 12min → 3min",
  },
  {
    id: "test",
    label: "Unit Tests",
    icon: "🧪",
    color: "#A78BFA",
    description: "Comprehensive test suite with coverage enforcement and flaky test detection.",
    tools: ["xUnit", "Jest", "Vitest", "Coverage Reports"],
    details: [
      "80% code coverage requirement enforced on every PR",
      "Parallel test sharding across 4 runners",
      "Flaky test quarantine system with auto-retry",
    ],
    metrics: "Test suite: 2,400+ tests in 4min",
  },
  {
    id: "security",
    label: "Security Scan",
    icon: "🔒",
    color: "#F472B6",
    description: "Multi-layer security scanning for vulnerabilities, secrets, and compliance issues.",
    tools: ["Snyk", "Trivy", "GitLeaks", "OWASP ZAP"],
    details: [
      "SAST scanning with zero critical/high vulnerability policy",
      "Secret scanning prevents credential leaks",
      "Container image scanning before registry push",
    ],
  },
  {
    id: "docker",
    label: "Docker Build",
    icon: "🐳",
    color: "#38BDF8",
    description: "Multi-stage Docker builds produce minimal, secure container images.",
    tools: ["Docker", "BuildKit", "Docker Scout"],
    details: [
      "Multi-stage builds reduce final image size by 70%",
      "Layer caching with GitHub Actions cache backend",
      "Distroless base images for minimal attack surface",
    ],
    metrics: "Image size: 850MB → 145MB",
  },
  {
    id: "registry",
    label: "Push to Registry",
    icon: "📦",
    color: "#34D399",
    description: "Signed images are pushed to Azure Container Registry with immutable tags.",
    tools: ["Azure Container Registry", "Cosign", "SBOM"],
    details: [
      "Images signed with Cosign for supply chain security",
      "Automatic SBOM generation for compliance",
      "Geo-replicated registry for faster pulls globally",
    ],
  },
  {
    id: "deploy",
    label: "Deploy to K8s",
    icon: "🚀",
    color: "#E14504",
    description: "GitOps-driven deployment with Flux CD handles progressive rollout with automatic health checks.",
    tools: ["Flux CD", "Azure AKS", "Kustomize", "Helm"],
    details: [
      "Canary deployment: 5% → 20% → 50% → 100% traffic split",
      "Automated rollback on error rate spike > 1%",
      "Blue-green for database migrations with zero downtime",
    ],
    metrics: "Deployment: 45min → 8min",
  },
  {
    id: "smoke",
    label: "Smoke Tests",
    icon: "💨",
    color: "#F59E0B",
    description: "Automated smoke tests verify critical paths in the new deployment before full traffic shift.",
    tools: ["Playwright", "k6", "Cypress"],
    details: [
      "Critical user journey tests: login, core workflow, payment",
      "Performance baseline validation with k6",
      "API contract testing with Pact",
    ],
  },
  {
    id: "monitor",
    label: "Monitoring",
    icon: "📊",
    color: "#A78BFA",
    description: "Real-time observability with automatic anomaly detection and SLO tracking.",
    tools: ["Grafana", "Prometheus", "AlertManager", "PagerDuty"],
    details: [
      "SLO dashboards with error budget burn rate alerts",
      "Distributed tracing with OpenTelemetry",
      "Automatic incident creation on SLO breach",
    ],
  },
  {
    id: "production",
    label: "Production",
    icon: "✅",
    color: "#34D399",
    description: "Application is serving production traffic with full observability and automated incident response.",
    tools: ["Azure AKS", "Grafana", "PagerDuty", "Runbooks"],
    details: [
      "Multi-region active-active deployment",
      "Automated runbooks for common incidents",
      "Post-deployment monitoring window with auto-rollback",
    ],
    metrics: "99.97% uptime SLA maintained",
  },
];
