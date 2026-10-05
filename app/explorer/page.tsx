import { GlassNav } from "@/components/shared/GlassNav";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { ExplorerHero } from "@/components/explorer/ExplorerHero";
import { TrailChapters } from "@/components/explorer/TrailChapters";
import { FrameReels } from "@/components/explorer/FrameReels";
import { ScrollMarquee } from "@/components/explorer/ScrollMarquee";
import { SlantedSlices } from "@/components/explorer/SlantedSlices";
import { ExplorerOutro } from "@/components/explorer/ExplorerOutro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Isuru Gunathilaka — Explorer",
  description: "Hiking and camping in the highlands of Sri Lanka, in photographs.",
};

export default function ExplorerPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-forest text-bone">
      <GlassNav />
      <ScrollProgress color="#CBEA5C" />
      <ExplorerHero />
      <TrailChapters />
      <ScrollMarquee words={["Hiking", "Camping", "Waterfalls", "Ridges"]} />
      <SlantedSlices />
      <ScrollMarquee words={["Mist", "Trails", "Tents", "Summits"]} direction={-1} />
      <FrameReels />
      <ExplorerOutro />

      <footer className="border-t border-bone/10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-6 text-xs font-medium text-bone/50 sm:px-10">
          <p className="flex items-center gap-2.5">
            <span className="block h-2 w-2 rounded-full bg-lime" />© {new Date().getFullYear()} Isuru Gunathilaka
          </p>
          <p className="hidden sm:block">Hiking &amp; camping · Sri Lanka</p>
          <a href="#hero" className="text-bone/80 transition-colors hover:text-bone">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
