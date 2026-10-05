"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { EXPERIENCE } from "@/lib/data/experience";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { ExperienceGraph, ExperienceGraphMobile } from "./ExperienceGraph";

const COMMITS = EXPERIENCE.reduce((n, role) => n + role.commits.length, 0);

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="experience" className="border-t border-neutral-800 bg-[#0A0A0A] text-white">
      <div ref={ref} className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
              <span className="block h-2 w-2 rounded-full bg-accent" />
              <span className="text-neutral-500">06</span>
              Experience
            </p>
            <h2 className="mt-5 font-display font-black uppercase leading-[0.9] text-[13vw] lg:text-[min(7.3vw,7.5rem)]">
              {inView ? (
                <ScrambleText text="Experience" duration={600} />
              ) : (
                <span className="invisible">Experience</span>
              )}
            </h2>
          </div>
          <p className="max-w-md pb-2 font-mono text-sm leading-relaxed text-neutral-400">
            My work history as a commit log: every role is a branch, and everything I did there is a commit on
            it. <span className="hidden lg:inline">Hover</span>
            <span className="lg:hidden">Tap</span> a commit to read it.
          </p>
        </div>

        {/* The command that "printed" the graph below */}
        <div className="mt-10 flex items-center justify-between gap-4 border-y border-neutral-800 py-3 font-mono text-xs lg:mt-12">
          <p className="flex items-center gap-3 text-neutral-200">
            <span className="text-accent">&gt;</span>
            git log --graph --all
            <span className="inline-block h-[1.1em] w-[0.55em] bg-accent motion-safe:animate-blink" />
          </p>
          <p className="shrink-0 text-neutral-500">
            {COMMITS} commits <span className="hidden sm:inline">· {EXPERIENCE.length} branches</span>
          </p>
        </div>

        {/* The branch graph: left to right on wide screens, top to bottom on narrow ones */}
        <div className="mt-10 hidden lg:block">
          <ExperienceGraph />
        </div>

        <div className="mt-8 lg:hidden">
          <ExperienceGraphMobile />
        </div>
      </div>
    </section>
  );
}
