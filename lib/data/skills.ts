import {
  siAnsible,
  siC,
  siCloudflare,
  siDocker,
  siGithub,
  siHtml5,
  siHuggingface,
  siJavascript,
  siJenkins,
  siLabview,
  siLinux,
  siMeta,
  siMistralai,
  siMysql,
  siNginx,
  siNodedotjs,
  siNumpy,
  siOllama,
  siOpencv,
  siOpenjdk,
  siPostgresql,
  siPrisma,
  siPython,
  siRailway,
  siReact,
  siRedhat,
  siTensorflow,
  siTruenas,
  siYolo,
} from "simple-icons";

export interface Skill {
  name: string;
  /** Short qualifier shown under the name */
  note?: string;
  /** Logo as a 24x24 SVG path (from simple-icons); drawn as a dot matrix */
  logo?: string;
  /** Letters to show in dot-matrix type when there is no logo to draw */
  mark?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  summary: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "devops",
    label: "DevOps & Infrastructure",
    summary: "Deploying and hosting backend services, building CI/CD pipelines, and managing Linux servers.",
    skills: [
      { name: "Linux", logo: siLinux.path },
      { name: "CI/CD", mark: "CI" },
      { name: "Docker", logo: siDocker.path },
      { name: "Jenkins", logo: siJenkins.path },
      { name: "Ansible", logo: siAnsible.path },
      { name: "AWS", mark: "AWS" },
      { name: "Nginx", logo: siNginx.path },
      { name: "Cloudflare", logo: siCloudflare.path },
      { name: "GitHub", logo: siGithub.path },
      { name: "Railway", logo: siRailway.path },
      { name: "TrueNAS", note: "Network storage", logo: siTruenas.path },
    ],
  },
  {
    id: "ai",
    label: "AI & Language Models",
    summary:
      "Fine-tuning, training and integrating large language models into chatbots and RAG systems, plus deep learning and computer vision research.",
    skills: [
      { name: "RAG systems", mark: "RAG" },
      { name: "LLM fine-tuning", mark: "LLM" },
      { name: "LLaMA", logo: siMeta.path },
      { name: "Mistral", logo: siMistralai.path },
      { name: "LLaVA", mark: "LLV" },
      { name: "Ollama", logo: siOllama.path },
      { name: "Unsloth", mark: "UN" },
      { name: "Hugging Face", logo: siHuggingface.path },
      { name: "YOLO", logo: siYolo.path },
      { name: "OpenCV", logo: siOpencv.path },
      { name: "TensorFlow", logo: siTensorflow.path },
      { name: "NumPy", logo: siNumpy.path },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    summary: "From embedded C, PLC and LabVIEW on the hardware side to Python and the JavaScript stack.",
    skills: [
      { name: "Python", logo: siPython.path },
      { name: "JavaScript", logo: siJavascript.path },
      { name: "NodeJS", logo: siNodedotjs.path },
      { name: "ReactJS", logo: siReact.path },
      { name: "HTML/CSS", logo: siHtml5.path },
      { name: "C", logo: siC.path },
      { name: "Java", logo: siOpenjdk.path },
      { name: "MATLAB", mark: "MAT" },
      { name: "LabVIEW", logo: siLabview.path },
      { name: "PLC", mark: "PLC" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    summary: "Database design, complex queries and performance optimisation, with ORM integration.",
    skills: [
      { name: "PostgreSQL", note: "Design, complex queries, optimisation", logo: siPostgresql.path },
      { name: "MySQL", logo: siMysql.path },
      { name: "Prisma", note: "ORM", logo: siPrisma.path },
    ],
  },
  {
    id: "certificates",
    label: "Certificates",
    summary: "Courses and certifications completed or in progress.",
    skills: [
      { name: "RHCSA", note: "In progress · RH124 completed", logo: siRedhat.path },
      { name: "AWS Academy", note: "Cloud Foundations", mark: "AWS" },
      { name: "MATLAB Onramp", note: "Deep Learning · Computer Vision · Machine Learning", mark: "MAT" },
    ],
  },
];
