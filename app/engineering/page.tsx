import { GlassNav } from "@/components/shared/GlassNav";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { GlitchIn } from "@/components/shared/GlitchIn";
import { EngineeringHero } from "@/components/engineering/EngineeringHero";
import { AboutSection } from "@/components/engineering/AboutSection";
import { SkillsGrid } from "@/components/engineering/SkillsGrid";
import { DevOpsPipeline } from "@/components/engineering/DevOpsPipeline";
import { ProjectsShowcase } from "@/components/engineering/ProjectsShowcase";
import { ExperienceTimeline } from "@/components/engineering/ExperienceTimeline";
import { EngContact } from "@/components/engineering/EngContact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Isuru Gunathilaka — Systems Engineer",
  description:
    "Cloud infrastructure, DevOps, AI solutions, and enterprise systems engineering.",
};

export default function EngineeringPage() {
  return (
    <div
      className="min-h-screen overflow-x-clip"
      style={{ background: "#0A0A0A", color: "#FFFFFF" }}
    >
      <GlassNav />
      <ScrollProgress color="#E14504" />
      <EngineeringHero />
      <GlitchIn>
        <AboutSection />
      </GlitchIn>
      <GlitchIn>
        <SkillsGrid />
      </GlitchIn>
      <GlitchIn>
        <DevOpsPipeline />
      </GlitchIn>
      <GlitchIn>
        <ProjectsShowcase />
      </GlitchIn>
      <GlitchIn>
        <ExperienceTimeline />
      </GlitchIn>
      <GlitchIn>
        <EngContact />
      </GlitchIn>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-6 font-mono text-xs text-neutral-500 sm:px-8 lg:px-10">
          <p className="flex items-center gap-2.5">
            <span className="block h-2 w-2 rounded-full bg-accent" />© {new Date().getFullYear()} Isuru Gunathilaka
          </p>
          <p className="hidden sm:block">Systems Engineer · Sri Lanka</p>
          <a href="#hero" className="text-neutral-300 transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
