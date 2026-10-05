"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PIPELINE_STAGES } from "@/lib/data/pipeline";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { DotLogo } from "@/components/shared/DotLogo";
import { RequestFlow } from "./RequestFlow";

const STAGES = PIPELINE_STAGES.length;
const STEP_MS = 1500;
// Ticks the finished run stays on screen before the next one starts
const LIVE_TICKS = 3;
const pad = (n: number) => String(n).padStart(2, "0");

const dots = (color: string, vertical = false) => ({
  backgroundImage: `radial-gradient(circle, ${color} 1.5px, transparent 1.6px)`,
  backgroundSize: vertical ? "3px 12px" : "12px 3px",
  backgroundRepeat: vertical ? "repeat-y" : "repeat-x",
});

export function DevOpsPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const onScreen = useInView(ref);

  // One release travelling down the pipeline, over and over
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(STAGES);
      return;
    }
    const interval = setInterval(() => setTick((t) => (t >= STAGES + LIVE_TICKS - 1 ? 0 : t + 1)), STEP_MS);
    return () => clearInterval(interval);
  }, [onScreen]);

  // The stage being worked on; equal to STAGES once the release is live
  const step = Math.min(tick, STAGES);
  const live = step === STAGES;
  const current = PIPELINE_STAGES[step];
  const status = live ? "release is live" : `${current.tool.toLowerCase()}: ${current.verb.toLowerCase()}`;

  const stateOf = (i: number) => (i < step ? "done" : i === step ? "active" : "pending");
  const ring = { done: "border-neutral-300", active: "border-accent", pending: "border-neutral-800" };
  const ink = { done: "text-white", active: "text-white", pending: "text-neutral-600" };

  return (
    <section id="devops" className="border-t border-neutral-800 bg-[#0A0A0A] text-white">
      <div ref={ref} className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
              <span className="block h-2 w-2 rounded-full bg-accent" />
              <span className="text-neutral-500">04</span>
              DevOps
            </p>
            <h2 className="mt-5 font-display font-black uppercase leading-[0.9] text-[13vw] lg:text-[min(7.3vw,7.5rem)]">
              {inView ? <ScrambleText text="Pipeline" duration={600} /> : <span className="invisible">Pipeline</span>}
            </h2>
          </div>
          <p className="max-w-md pb-2 font-mono text-sm leading-relaxed text-neutral-400">
            The CI/CD I built end to end for the BloomAudit application: the route a change takes from a
            commit to production.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Run status */}
          <div className="mt-10 flex items-center justify-between gap-4 border-y border-neutral-800 py-3 font-mono text-xs lg:mt-12">
            <p className="flex min-w-0 items-center gap-3 text-neutral-200">
              <span className="text-accent">&gt;</span>
              <ScrambleText text={status} duration={350} />
            </p>
            <p className="flex shrink-0 items-center gap-2 text-neutral-500">
              {live ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-blink" />
                  <span className="text-neutral-200">Live</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Simulated run ·</span>
                  <span>
                    <span className="text-accent">{pad(step + 1)}</span> / {pad(STAGES)}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Wide screens: stations left to right */}
          <ol className="mt-12 hidden grid-cols-7 lg:grid">
            {PIPELINE_STAGES.map((stage, i) => {
              const state = stateOf(i);
              return (
                <li key={stage.id} className="relative px-2 text-center">
                  {/* Line to the next station, with the release travelling along it */}
                  {i < STAGES - 1 && (
                    <div className="absolute left-1/2 top-16 h-[3px] w-full -translate-y-1/2">
                      <div
                        className="absolute inset-0 transition-opacity duration-500"
                        style={dots(i < step ? "#e5e5e5" : "#404040")}
                      />
                      {i === step - 1 && !live && (
                        <span
                          key={tick}
                          className="pipeline-packet absolute top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-accent"
                        />
                      )}
                    </div>
                  )}

                  <div
                    className={`relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-full border bg-[#0A0A0A] transition-colors duration-300 ${ring[state]} ${ink[state]}`}
                  >
                    <DotLogo path={stage.logo} mark={stage.mark} className="h-16 w-16 text-[13px]" />
                    {state === "active" && (
                      <span className="absolute right-2.5 top-2.5 h-3 w-3 rounded-full border-2 border-[#0A0A0A] bg-accent motion-safe:animate-blink" />
                    )}
                  </div>

                  <p className="mt-7 font-mono text-[10px] text-neutral-600">{pad(i + 1)}</p>
                  <p
                    className={`mt-1 font-display text-2xl font-black uppercase leading-none transition-colors duration-300 xl:text-4xl ${
                      state === "pending" ? "text-neutral-600" : "text-white"
                    }`}
                  >
                    {stage.verb}
                  </p>
                  <p
                    className={`mt-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-300 ${
                      state === "active" ? "text-accent" : "text-neutral-400"
                    }`}
                  >
                    {stage.tool}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* Wide screens: what serves a visitor once the release is live */}
          <div className="mt-16 hidden lg:block">
            <p className="flex items-center justify-between border-b border-neutral-800 pb-3 font-mono text-xs text-neutral-500">
              <span className="uppercase tracking-[0.12em]">Request path</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                live traffic
              </span>
            </p>
            <div className="mt-8">
              <RequestFlow />
            </div>
          </div>

          {/* Narrow screens: stations top to bottom */}
          <ol className="mt-10 lg:hidden">
            {PIPELINE_STAGES.map((stage, i) => {
              const state = stateOf(i);
              return (
                <li key={stage.id} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < STAGES - 1 && (
                    <div
                      className="absolute bottom-0 left-[26.5px] top-14 w-[3px]"
                      style={dots(i < step ? "#e5e5e5" : "#404040", true)}
                    />
                  )}
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-[#0A0A0A] transition-colors duration-300 ${ring[state]} ${ink[state]}`}
                  >
                    <DotLogo path={stage.logo} mark={stage.mark} className="h-7 w-7 text-[6.5px]" />
                    {state === "active" && (
                      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0A0A0A] bg-accent motion-safe:animate-blink" />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className="flex items-baseline gap-3">
                      <span
                        className={`font-display text-2xl font-black uppercase leading-none transition-colors duration-300 ${
                          state === "pending" ? "text-neutral-600" : "text-white"
                        }`}
                      >
                        {stage.verb}
                      </span>
                      <span
                        className={`font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-300 ${
                          state === "active" ? "text-accent" : "text-neutral-400"
                        }`}
                      >
                        {stage.tool}
                      </span>
                    </p>
                    <p className="mt-2 font-mono text-[11px] leading-relaxed text-neutral-500">{stage.detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
