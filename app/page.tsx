"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WorldCard } from "@/components/portal/WorldCard";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { LiveClock } from "@/components/shared/LiveClock";

export default function PortalPage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <main className="relative h-[100dvh] w-full overflow-hidden bg-[#0A0A0A] text-white">
          {/* World split covering the whole screen — stacked on phones, side by side from md up */}
          <div className="absolute inset-0 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
            <WorldCard side="engineering" />
            <WorldCard side="explorer" />
          </div>

          {/* Dotted seam between the two worlds, with a light sweeping along it */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -mt-[1.5px] h-[3px] md:hidden">
            <div className="seam-dots seam-horizontal absolute inset-0" />
            <div className="seam-light seam-horizontal absolute inset-0" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 -ml-[1.5px] hidden w-[3px] md:block [mask-image:linear-gradient(to_bottom,transparent_14%,#000_30%)]">
            <div className="seam-dots absolute inset-0" />
            <div className="seam-light absolute inset-0" />
          </div>

          {/* Top bar + intro, laid over the photos (clicks pass through to the panels) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
            <header className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 lg:px-10">
              <div className="flex items-center gap-2.5 font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.12em] text-neutral-200">
                <span className="block h-2 w-2 rounded-full bg-accent motion-safe:animate-blink" />
                Portfolio
              </div>
              <p className="flex items-center gap-3 font-mono text-[10px] sm:text-xs text-neutral-400">
                <span className="hidden sm:inline">Systems Engineer &amp; Explorer</span>
                <span className="hidden sm:inline text-neutral-600">/</span>
                <LiveClock className="tabular-nums text-neutral-200" />
              </p>
            </header>

            <motion.section
              className="flex flex-col gap-3 px-4 pt-2 sm:px-8 sm:pt-4 md:flex-row md:items-start md:justify-between lg:px-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <h1
                className="font-display font-black uppercase leading-[0.95]"
                style={{ fontSize: "clamp(1.5rem, 4.4vw, 3.75rem)" }}
              >
                <ScrambleText
                  text="Two worlds."
                  delay={500}
                  duration={700}
                  repeatEvery={4500}
                  className="text-neutral-400"
                />
                <br />
                <ScrambleText text="One passion" delay={900} duration={700} repeatEvery={4500} />
                <motion.span
                  className="text-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0 }}
                >
                  .
                </motion.span>
              </h1>
              <p className="hidden max-w-[16rem] text-right font-mono text-xs leading-relaxed text-neutral-400 md:block">
                Choose the side of me you&apos;d like to discover.
              </p>
            </motion.section>
          </div>
        </main>
      )}
    </>
  );
}
