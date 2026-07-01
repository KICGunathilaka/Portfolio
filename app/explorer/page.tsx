import { GlassNav } from "@/components/shared/GlassNav";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { WorldSwitcher } from "@/components/shared/WorldSwitcher";
import { ExplorerHero } from "@/components/explorer/ExplorerHero";
import { HikingAdventures } from "@/components/explorer/HikingAdventures";
import { PhotoGallery } from "@/components/explorer/PhotoGallery";
import { GearSection } from "@/components/explorer/GearSection";
import { ExplorerContact } from "@/components/explorer/ExplorerContact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Explorer — Portfolio",
  description:
    "Mountains, trails, camping, photography, and adventures across the world.",
};

export default function ExplorerPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#080504", color: "#F5EDD8" }}
    >
      <GlassNav />
      <ScrollProgress color="#FB923C" />
      <ExplorerHero />
      <HikingAdventures />
      <PhotoGallery />
      <GearSection />
      <ExplorerContact />
      <WorldSwitcher />

      {/* Footer */}
      <footer
        className="py-12 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <p className="text-orange-200/20 text-sm">
          © 2024 · The Explorer · Where every trail leads somewhere worth going
        </p>
      </footer>
    </div>
  );
}
