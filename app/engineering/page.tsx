import { GlassNav } from "@/components/shared/GlassNav";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { WorldSwitcher } from "@/components/shared/WorldSwitcher";
import { EngineeringHero } from "@/components/engineering/EngineeringHero";
import { AboutSection } from "@/components/engineering/AboutSection";
import { SkillsGrid } from "@/components/engineering/SkillsGrid";
import { DevOpsPipeline } from "@/components/engineering/DevOpsPipeline";
import { ProjectsShowcase } from "@/components/engineering/ProjectsShowcase";
import { ExperienceTimeline } from "@/components/engineering/ExperienceTimeline";
import { EngContact } from "@/components/engineering/EngContact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Systems Engineer — Portfolio",
  description:
    "Cloud infrastructure, DevOps, AI solutions, and enterprise systems engineering.",
};

export default function EngineeringPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#020812", color: "#F0F4FF" }}
    >
      <GlassNav />
      <ScrollProgress color="#E14504" />
      <EngineeringHero />
      <AboutSection />
      <SkillsGrid />
      <DevOpsPipeline />
      <ProjectsShowcase />
      <ExperienceTimeline />
      <EngContact />
      <WorldSwitcher />

      {/* Footer */}
      <footer
        className="py-12 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-white/20 text-sm font-mono">
          © 2024 · Systems Engineer · Built with Next.js & deployed on Vercel
        </p>
      </footer>
    </div>
  );
}
