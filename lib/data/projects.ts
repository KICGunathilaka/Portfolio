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
      "The complete CI/CD pipeline for the BloomAudit application, built end to end, together with the Linux hosting it runs on.",
    stack: ["Jenkins", "Docker", "Ansible", "AWS", "Nginx", "Cloudflare", "GitHub", "Linux"],
  },
  {
    id: "rag-systems",
    name: "RAG Systems",
    org: "BloomTech",
    field: "AI",
    summary:
      "Retrieval-augmented generation systems and chatbots that put large language models to work inside real applications.",
    stack: ["RAG", "LLaMA", "Mistral", "LLaVA", "Ollama"],
  },
  {
    id: "llm-fine-tuning",
    name: "LLM Fine-Tuning",
    org: "BloomTech",
    field: "AI",
    summary: "Fine-tuning and training large language models, then integrating them into applications.",
    stack: ["LLaMA", "Ollama", "Unsloth", "Hugging Face"],
  },
  {
    id: "backend-matrix",
    name: "Backend & Matrix Integration",
    org: "BloomTech",
    field: "Backend",
    summary:
      "Custom backend services that connect applications to their databases and to external services, including Element (Matrix) messaging. Deployed and hosted with Docker, Nginx, Cloudflare and Railway.",
    stack: ["PostgreSQL", "Prisma", "Element (Matrix)", "Docker", "Nginx", "Railway"],
  },
  {
    id: "guppy-research",
    name: "Guppy Fish Health Classification",
    org: "IEEE research",
    field: "Deep learning",
    summary:
      "Deep learning and computer vision research that identifies diseased and healthy guppy fish for the ornamental fish export industry. Published as an IEEE conference paper.",
    stack: ["Python", "YOLO", "OpenCV", "TensorFlow", "NumPy"],
    link: { label: "Read on IEEE Xplore", href: "https://ieeexplore.ieee.org/document/10963195" },
  },
  {
    id: "warehouse-tracking",
    name: "Warehouse Tracking System",
    org: "Hayleys Advantis",
    field: "Web",
    summary:
      "An industrial project: a warehouse management solution designed and developed to streamline operations and improve task management.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    id: "digital-twin",
    name: "Digital Twin Assembly Line",
    org: "OREL Corporation",
    field: "IoT",
    summary:
      "IoT and digital twin technology to automate assembly-line production and raise throughput: LabVIEW applications, integrated and programmed sensors, and a link to a Python server.",
    stack: ["LabVIEW", "IoT sensors", "Python", "Digital twin"],
  },
];
