export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  bullets: string[];
  tech: string[];
  current?: boolean;
}

export const EXPERIENCE: Experience[] = [
  {
    id: "current",
    company: "Tech Enterprise",
    role: "Senior Systems Engineer",
    period: "2022 — Present",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead engineer responsible for cloud infrastructure, DevOps transformation, and AI integration initiatives across the organization.",
    bullets: [
      "Architected and deployed enterprise Kubernetes platform serving 200+ microservices on Azure AKS",
      "Led DevOps transformation reducing deployment frequency from weekly to 12x/day with zero downtime",
      "Built AI-powered internal tools using OpenAI APIs, cutting engineer productivity overhead by 40%",
      "Established infrastructure-as-code practices with Terraform modules adopted company-wide",
      "Mentored team of 5 engineers on cloud-native patterns and DevOps culture",
    ],
    tech: ["Azure", "Kubernetes", "Terraform", "GitHub Actions", "Python", "C#", "OpenAI"],
    current: true,
  },
  {
    id: "mid",
    company: "Digital Solutions Co.",
    role: "DevOps Engineer",
    period: "2020 — 2022",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Focused on CI/CD pipeline development, container orchestration, and cloud migration projects for enterprise clients.",
    bullets: [
      "Designed CI/CD pipelines with Azure DevOps for 15+ enterprise applications",
      "Migrated 30+ on-premises applications to Azure cloud reducing infrastructure costs by 45%",
      "Implemented centralized logging and monitoring with ELK Stack and Grafana",
      "Built automated infrastructure provisioning reducing setup time from weeks to hours",
      "Created Docker containerization strategy for legacy .NET applications",
    ],
    tech: ["Azure DevOps", "Docker", "Azure", "Ansible", "Jenkins", "ELK Stack", ".NET"],
  },
  {
    id: "junior",
    company: "Systems Integrator Ltd.",
    role: "Systems Administrator / Junior Engineer",
    period: "2018 — 2020",
    location: "On-site",
    type: "Full-time",
    description:
      "Managed Windows Server and Linux infrastructure, network administration, and automation scripting.",
    bullets: [
      "Administered Windows Server 2016/2019 environments for 500+ users",
      "Developed PowerShell automation scripts reducing manual IT tasks by 60%",
      "Managed networking infrastructure: Cisco switches, VLANs, VPNs, firewall rules",
      "Implemented backup and disaster recovery procedures with 99.9% success rate",
      "Supported migration from on-premises Exchange to Microsoft 365",
    ],
    tech: ["Windows Server", "Linux", "PowerShell", "Cisco", "Active Directory", "Microsoft 365"],
  },
];

export const CERTIFICATIONS = [
  {
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    level: "Associate",
    year: 2023,
    badge: "☁️",
    color: "#FF9900",
  },
  {
    name: "Azure Administrator",
    issuer: "Microsoft",
    level: "Associate (AZ-104)",
    year: 2022,
    badge: "⚡",
    color: "#0078D4",
  },
  {
    name: "Azure DevOps Engineer",
    issuer: "Microsoft",
    level: "Expert (AZ-400)",
    year: 2023,
    badge: "🔷",
    color: "#0078D4",
  },
  {
    name: "CCNA",
    issuer: "Cisco",
    level: "Associate",
    year: 2021,
    badge: "🌐",
    color: "#1BA0D7",
  },
  {
    name: "Kubernetes Administrator",
    issuer: "CNCF",
    level: "CKA",
    year: 2023,
    badge: "⚙️",
    color: "#326CE5",
  },
  {
    name: "Terraform Associate",
    issuer: "HashiCorp",
    level: "Associate",
    year: 2022,
    badge: "🏗️",
    color: "#7B42BC",
  },
];
