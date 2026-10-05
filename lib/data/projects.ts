export interface Project {
  id: string;
  name: string;
  /** Who it was for, or where it was done */
  org: string;
  field: string;
  summary: string;
  stack: string[];
  link?: { label: string; href: string };
}

export const PROJECTS: Project[] = [
  {
    id: "bloomaudit-cicd",
    name: "BloomAudit CI/CD",
    org: "BloomTech",
    field: "DevOps",
    summary:
      "End-to-end CI/CD pipeline and Linux hosting.",
    stack: ["Jenkins", "Docker", "Ansible", "AWS", "Nginx", "Cloudflare", "GitHub", "Linux"],
  },
  {
    id: "rag-systems",
    name: "RAG Systems",
    org: "BloomTech",
    field: "AI",
    summary:
      "RAG systems and chatbots built on large language models.",
    stack: ["RAG", "LLaMA", "Mistral", "LLaVA", "Ollama"],
  },
  {
    id: "llm-fine-tuning",
    name: "LLM Fine-Tuning",
    org: "BloomTech",
    field: "AI",
    summary: "Fine-tuning and integrating large language models.",
    stack: ["LLaMA", "Ollama", "Unsloth", "Hugging Face"],
  },
  {
    id: "backend-matrix",
    name: "Backend & Matrix Integration",
    org: "BloomTech",
    field: "Backend",
    summary:
      "Backend services, databases and Element (Matrix) messaging.",
    stack: ["PostgreSQL", "Prisma", "Element (Matrix)", "Docker", "Nginx", "Railway"],
  },
  {
    id: "guppy-research",
    name: "Guppy Fish Health Classification",
    org: "IEEE research",
    field: "Deep learning",
    summary:
      "Deep learning that tells healthy guppy fish from diseased. Published by IEEE.",
    stack: ["Python", "YOLO", "OpenCV", "TensorFlow", "NumPy"],
    link: { label: "Read on IEEE Xplore", href: "https://ieeexplore.ieee.org/document/10963195" },
  },
  {
    id: "warehouse-tracking",
    name: "Warehouse Tracking System",
    org: "Hayleys Advantis",
    field: "Web",
    summary:
      "Warehouse management system for smoother operations.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    id: "digital-twin",
    name: "Digital Twin Assembly Line",
    org: "OREL Corporation",
    field: "IoT",
    summary:
      "IoT and digital twin automation for an assembly line.",
    stack: ["LabVIEW", "IoT sensors", "Python", "Digital twin"],
  },
];
