export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  category: "infrastructure" | "devops" | "ai" | "automation" | "fullstack";
  image: string;
  github?: string;
  demo?: string;
  metrics?: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "k8s-platform",
    title: "Enterprise Kubernetes Platform",
    subtitle: "Self-service developer platform on Kubernetes",
    description:
      "Designed and built a self-service internal developer platform on Azure Kubernetes Service serving 200+ microservices with full GitOps workflow, automated scaling, and centralized monitoring.",
    problem:
      "Manual deployments took 2-4 hours, developers had no self-service capabilities, and production incidents were hard to diagnose.",
    solution:
      "Built a GitOps-driven platform with Flux CD, automated canary deployments, and Grafana dashboards for every service.",
    tech: ["Kubernetes", "Azure AKS", "Flux CD", "Helm", "Terraform", "Grafana", "Prometheus", "ArgoCD"],
    category: "infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    metrics: ["95% deployment time reduction", "99.97% uptime SLA", "200+ services managed"],
    featured: true,
  },
  {
    id: "ai-assistant",
    title: "Enterprise AI Assistant",
    subtitle: "LLM-powered internal knowledge assistant",
    description:
      "Built an enterprise RAG-based AI assistant that ingests internal documentation, Confluence, SharePoint, and tickets to answer employee queries with source citations.",
    problem:
      "Engineers spent 30% of time searching for internal documentation, tribal knowledge was locked in people's heads.",
    solution:
      "Implemented a vector search pipeline with OpenAI embeddings, Qdrant vector DB, and a React chat interface with citation links.",
    tech: ["Python", "LangChain", "OpenAI", "Qdrant", "FastAPI", "React", "Azure", "Terraform"],
    category: "ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    metrics: ["300+ daily active users", "73% query resolution rate", "4.2/5 satisfaction score"],
    featured: true,
  },
  {
    id: "cicd-pipeline",
    title: "Zero-Downtime CI/CD System",
    subtitle: "Automated delivery pipeline with blue-green deployments",
    description:
      "Architected a complete CI/CD system from scratch using GitHub Actions, Azure Container Registry, and Kubernetes with blue-green deployment strategy eliminating all deployment downtime.",
    problem:
      "Weekend maintenance windows caused 4+ hours of downtime monthly and required all-hands coordination.",
    solution:
      "Blue-green deployments with automated smoke tests, database migration orchestration, and one-click rollback capability.",
    tech: ["GitHub Actions", "Azure DevOps", "Docker", "Kubernetes", "C#", ".NET", "Azure SQL"],
    category: "devops",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    metrics: ["100% zero-downtime releases", "Deployment time: 45min → 8min", "12 deploys/day average"],
    featured: true,
  },
  {
    id: "infra-automation",
    title: "Infrastructure as Code Platform",
    subtitle: "Terraform modules for Azure enterprise deployments",
    description:
      "Created a library of reusable Terraform modules for provisioning compliant Azure infrastructure following CIS benchmarks, dramatically reducing environment provisioning time.",
    problem:
      "New environments took 3-4 weeks to provision with manual steps prone to configuration drift.",
    solution:
      "Modular Terraform registry with built-in security policies, automated compliance checks, and self-service portal.",
    tech: ["Terraform", "Azure", "Python", "GitHub Actions", "Azure Policy", "PowerShell"],
    category: "automation",
    image: "https://images.unsplash.com/photo-1640552435388-a54879e72b28?w=800&q=80",
    metrics: ["Environment provisioning: 3 weeks → 2 hours", "100% compliance score", "40+ modules published"],
  },
  {
    id: "monitoring-platform",
    title: "Observability Stack",
    subtitle: "Unified monitoring, logging, and alerting platform",
    description:
      "Deployed and configured a centralized observability platform with Grafana, Prometheus, and ELK Stack for 50+ applications with intelligent alerting and SLO tracking.",
    problem:
      "Incidents had MTTR of 4+ hours due to scattered logs and no centralized metrics. On-call engineers had no unified view.",
    solution:
      "Unified observability with structured logging pipeline, custom Grafana dashboards, and PagerDuty integration.",
    tech: ["Grafana", "Prometheus", "Elasticsearch", "Logstash", "Kibana", "AlertManager", "PagerDuty"],
    category: "infrastructure",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    metrics: ["MTTR reduced from 4h to 22min", "90% alert noise reduction", "50+ services monitored"],
  },
  {
    id: "chatbot-automation",
    title: "IT Helpdesk Automation",
    subtitle: "AI-powered ticket routing and resolution assistant",
    description:
      "Built an intelligent helpdesk chatbot that handles L1 support tickets automatically using NLP and integrates with ServiceNow for ticket creation and status tracking.",
    problem:
      "IT helpdesk was overwhelmed with repetitive L1 tickets, response times averaging 6+ hours.",
    solution:
      "Deployed an LLM-based chatbot that resolves 60% of tickets automatically and smart-routes the rest to the right team.",
    tech: ["Python", "OpenAI", "ServiceNow API", "React", "Node.js", "Azure Bot Service"],
    category: "ai",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    metrics: ["60% tickets auto-resolved", "Response time: 6h → 2min", "90% user satisfaction"],
  },
];
