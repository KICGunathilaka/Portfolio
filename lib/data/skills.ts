export interface Skill {
  name: string;
  category: string;
  level: number;
  icon?: string;
  years?: number;
}

export const SKILL_CATEGORIES = [
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    color: "#38BDF8",
    skills: [
      { name: "AWS", level: 88, years: 4 },
      { name: "Azure", level: 85, years: 5 },
      { name: "Linux", level: 92, years: 6 },
      { name: "Windows Server", level: 88, years: 6 },
      { name: "Networking", level: 80, years: 5 },
      { name: "Docker", level: 90, years: 4 },
      { name: "Kubernetes", level: 78, years: 3 },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Automation",
    color: "#E14504",
    skills: [
      { name: "Azure DevOps", level: 90, years: 4 },
      { name: "GitHub Actions", level: 88, years: 3 },
      { name: "GitLab CI/CD", level: 82, years: 3 },
      { name: "Terraform", level: 75, years: 2 },
      { name: "Jenkins", level: 78, years: 3 },
      { name: "Ansible", level: 72, years: 2 },
      { name: "Helm", level: 70, years: 2 },
    ],
  },
  {
    id: "programming",
    label: "Programming",
    color: "#A78BFA",
    skills: [
      { name: "C#", level: 90, years: 6 },
      { name: "Python", level: 85, years: 5 },
      { name: "TypeScript", level: 82, years: 3 },
      { name: "JavaScript", level: 80, years: 4 },
      { name: "Node.js", level: 78, years: 3 },
      { name: "React", level: 80, years: 3 },
      { name: "PowerShell", level: 88, years: 5 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    color: "#34D399",
    skills: [
      { name: "SQL Server", level: 88, years: 5 },
      { name: "PostgreSQL", level: 82, years: 4 },
      { name: "MongoDB", level: 75, years: 3 },
      { name: "Redis", level: 78, years: 3 },
      { name: "Elasticsearch", level: 70, years: 2 },
    ],
  },
  {
    id: "ai",
    label: "AI & Machine Learning",
    color: "#F59E0B",
    skills: [
      { name: "OpenAI APIs", level: 85, years: 2 },
      { name: "LangChain", level: 78, years: 1 },
      { name: "Prompt Engineering", level: 88, years: 2 },
      { name: "Vector Databases", level: 72, years: 1 },
      { name: "ML Fundamentals", level: 70, years: 2 },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring & Observability",
    color: "#F472B6",
    skills: [
      { name: "Grafana", level: 85, years: 3 },
      { name: "Prometheus", level: 82, years: 3 },
      { name: "ELK Stack", level: 78, years: 2 },
      { name: "Datadog", level: 72, years: 2 },
      { name: "Azure Monitor", level: 80, years: 3 },
    ],
  },
];
