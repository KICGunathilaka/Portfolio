import { siAnsible, siCloudflare, siDocker, siGithub, siJenkins, siNginx } from "simple-icons";

export interface PipelineStage {
  id: string;
  /** What happens at this stage, as one word */
  verb: string;
  tool: string;
  detail: string;
  /** Logo as a 24x24 SVG path; drawn as a dot matrix */
  logo?: string;
  /** Letters shown instead when there is no logo */
  mark?: string;
}

// The route a change takes to production, in the tools listed on the CV's DevOps stack
export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "push",
    verb: "Push",
    tool: "GitHub",
    detail: "A commit lands in the repository.",
    logo: siGithub.path,
  },
  {
    id: "build",
    verb: "Build",
    tool: "Jenkins",
    detail: "Jenkins picks up the change and runs the pipeline.",
    logo: siJenkins.path,
  },
  {
    id: "package",
    verb: "Package",
    tool: "Docker",
    detail: "The application is built into a container image.",
    logo: siDocker.path,
  },
  {
    id: "deploy",
    verb: "Deploy",
    tool: "Ansible",
    detail: "Playbooks roll the new release out to the server.",
    logo: siAnsible.path,
  },
  {
    id: "host",
    verb: "Host",
    tool: "AWS · Linux",
    detail: "The release runs on Linux servers in AWS.",
    mark: "AWS",
  },
  {
    id: "serve",
    verb: "Serve",
    tool: "Nginx",
    detail: "Nginx sits in front of the app as the reverse proxy.",
    logo: siNginx.path,
  },
  {
    id: "edge",
    verb: "Edge",
    tool: "Cloudflare",
    detail: "Cloudflare handles DNS and traffic at the edge.",
    logo: siCloudflare.path,
  },
];
