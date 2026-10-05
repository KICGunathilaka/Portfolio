export interface Commit {
  /** Area of work, shown like a commit scope */
  scope: string;
  title: string;
  detail: string;
}

export interface Role {
  id: string;
  title: string;
  org?: string;
  period: string;
  note?: string;
  current?: boolean;
  commits: Commit[];
}

// Newest first. Each role reads as a branch in a git log; each thing done there is a commit on it.
export const EXPERIENCE: Role[] = [
  {
    id: "bloomtech",
    title: "Systems Engineer",
    org: "BloomTech",
    period: "2025 — Present",
    note: "Joined as Trainee Systems Engineer",
    current: true,
    commits: [
      {
        scope: "cicd",
        title: "CI/CD for BloomAudit",
        detail: "The complete pipeline for the BloomAudit application, built end to end.",
      },
      {
        scope: "deploy",
        title: "Backend deployment & hosting",
        detail: "Deploying and hosting backend services with Cloudflare, Docker, Nginx and Railway.",
      },
      {
        scope: "llm",
        title: "LLM development & integration",
        detail: "Fine-tuning, training and integrating LLaMA, Mistral and LLaVA into chatbots and RAG systems.",
      },
      {
        scope: "db",
        title: "Database design & management",
        detail: "PostgreSQL design, complex queries and performance optimisation, with Prisma ORM.",
      },
      {
        scope: "backend",
        title: "Backend & service integration",
        detail:
          "Custom backends connecting applications to databases and external services, including Element (Matrix) messaging.",
      },
      {
        scope: "linux",
        title: "Linux & server management",
        detail: "Linux for development, deployment and server management.",
      },
      {
        scope: "storage",
        title: "Network-attached storage",
        detail: "Managing and configuring TrueNAS network storage.",
      },
      {
        scope: "design",
        title: "Solution design",
        detail: "Database structures and custom solutions for real business problems across multiple projects.",
      },
    ],
  },
  {
    id: "orel",
    title: "Digital Twin & IoT Engineer",
    org: "OREL Corporation",
    period: "Aug — Nov 2023",
    note: "Internship",
    commits: [
      {
        scope: "labview",
        title: "Assembly-line automation",
        detail: "Developed and implemented LabVIEW applications for assembly-line automation.",
      },
      {
        scope: "iot",
        title: "Sensors & data collection",
        detail:
          "Integrated and programmed sensors to improve system performance and data collection, and established communication with a Python server.",
      },
    ],
  },
  {
    id: "egravity",
    title: "Trainee Engineer",
    org: "E-Gravity Solutions",
    period: "Apr — Jul 2022",
    note: "Internship · Kottawa",
    commits: [
      {
        scope: "embedded",
        title: "PIC microcontrollers",
        detail: "Worked with PIC microchips and built a grounding in embedded systems and electronics.",
      },
    ],
  },
  {
    id: "hardware",
    title: "Computer Hardware Technician",
    period: "2019 — 2020",
    commits: [
      {
        scope: "hardware",
        title: "Assembly & repair",
        detail: "Computer assembly, troubleshooting and repairing.",
      },
    ],
  },
];
