"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data/projects";
import { SKILL_CATEGORIES } from "@/lib/data/skills";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { DotLogo } from "@/components/shared/DotLogo";

const ADVANCE_MS = 5500;
const pad = (n: number) => String(n).padStart(2, "0");
// Logos already attached to skills, looked up by tool name for the project stacks
const LOGOS = new Map(
  SKILL_CATEGORIES.flatMap((c) => c.skills)
    .filter((skill) => skill.logo)
    .map((skill) => [skill.name, skill.logo as string])
);
// Shared column layout for the board's header and rows
const COLUMNS = "grid grid-cols-[2rem_minmax(0,1fr)_1.25rem] gap-x-4 sm:grid-cols-[2.5rem_minmax(0,1fr)_11rem_8rem_1.25rem] sm:gap-x-6";

export function ProjectsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const onScreen = useInView(ref);

  const [open, setOpen] = useState(0);
  // Counts openings so the newly opened row's name can replay its decode
  const [opens, setOpens] = useState(1);
  // Auto-advance stops once the visitor opens a row themselves, and waits while they hover
  const [manual, setManual] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Narrow screens: which card of the swipe rail is centred
  const railRef = useRef<HTMLUListElement>(null);
  const [card, setCard] = useState(0);
  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const centre = rail.scrollLeft + rail.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(rail.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setCard(nearest);
  };

  useEffect(() => {
    if (manual || hovering || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setOpen((i) => (i + 1) % PROJECTS.length);
      setOpens((n) => n + 1);
    }, ADVANCE_MS);
    return () => clearInterval(interval);
  }, [manual, hovering, onScreen]);

  return (
    <section id="projects" className="border-t border-neutral-800 bg-[#0A0A0A] text-white">
      <div ref={ref} className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
              <span className="block h-2 w-2 rounded-full bg-accent" />
              <span className="text-neutral-500">05</span>
              Projects
            </p>
            <h2 className="mt-5 font-display font-black uppercase leading-[0.9] text-[13vw] lg:text-[min(7.3vw,7.5rem)]">
              {inView ? <ScrambleText text="Projects" duration={600} /> : <span className="invisible">Projects</span>}
            </h2>
          </div>
        </div>

        {/* Narrow screens: one project per card, swiped sideways */}
        <motion.div
          className="mt-8 lg:hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex items-center justify-between border-y border-neutral-800 py-3 font-mono text-xs">
            <p className="text-neutral-500">
              <span className="text-accent">{pad(card + 1)}</span> / {pad(PROJECTS.length)}
            </p>
            <div className="flex items-center gap-1.5">
              {PROJECTS.map((project, i) => (
                <span
                  key={project.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === card ? "w-5 bg-accent" : "w-1.5 bg-neutral-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-neutral-500">Swipe →</p>
          </div>

          <ul
            ref={railRef}
            onScroll={onRailScroll}
            data-lenis-prevent
            className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {PROJECTS.map((project, i) => (
              <li
                key={project.id}
                className={`flex min-h-[27rem] w-[82vw] max-w-sm shrink-0 snap-center flex-col rounded-lg border p-5 transition-colors duration-300 ${
                  i === card ? "border-neutral-500" : "border-neutral-800"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`font-display text-6xl font-black leading-none transition-colors duration-300 ${
                      i === card ? "text-white" : "text-neutral-700"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <p className="pt-1 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-neutral-400">
                    {project.org}
                    <span className="block text-neutral-600">{project.field}</span>
                  </p>
                </div>

                <h3 className="mt-7 font-display text-2xl font-black uppercase leading-tight">{project.name}</h3>
                <p className="mt-3 font-mono text-xs leading-relaxed text-neutral-400">{project.summary}</p>

                {/* The stack as dot-matrix logos, with tags only where no logo exists */}
                <ul className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                  {project.stack.map((tool) => {
                    const logo = LOGOS.get(tool);
                    return logo ? (
                      <li
                        key={tool}
                        title={tool}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-700"
                      >
                        <DotLogo path={logo} className="h-7 w-7 text-white" />
                      </li>
                    ) : (
                      <li
                        key={tool}
                        className="border border-neutral-800 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-neutral-300"
                      >
                        {tool}
                      </li>
                    );
                  })}
                </ul>

                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-neutral-700 px-4 py-2.5 font-mono text-xs text-neutral-100"
                  >
                    {project.link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* The board: every project on one display, one row open at a time */}
        <motion.div
          className="mt-12 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div
            className={`${COLUMNS} border-y border-neutral-800 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600`}
          >
            <span>No</span>
            <span>Project</span>
            <span className="hidden sm:block">For</span>
            <span className="hidden sm:block">Field</span>
            <span />
          </div>

          <ul>
            {PROJECTS.map((project, i) => {
              const isOpen = i === open;
              return (
                <li key={project.id} className="border-b border-neutral-800">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      setOpen(i);
                      setOpens((n) => n + 1);
                      setManual(true);
                    }}
                    className={`${COLUMNS} group w-full items-baseline py-4 text-left outline-none transition-colors duration-300 focus-visible:bg-neutral-900 sm:py-5 ${
                      isOpen ? "" : "hover:bg-neutral-900/60"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        isOpen ? "text-accent" : "text-neutral-600"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                    <span>
                      <span
                        className={`block font-display text-xl font-black uppercase leading-tight transition-colors duration-300 sm:text-2xl xl:text-3xl ${
                          isOpen ? "text-white" : "text-neutral-400 group-hover:text-neutral-100"
                        }`}
                      >
                        {inView ? (
                          <ScrambleText
                            text={project.name}
                            delay={200 + i * 90}
                            duration={500}
                            replayKey={isOpen ? opens : 0}
                          />
                        ) : (
                          <span className="invisible">{project.name}</span>
                        )}
                      </span>
                      <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-neutral-500 sm:hidden">
                        {project.org} · {project.field}
                      </span>
                    </span>
                    <span className="hidden font-mono text-xs uppercase tracking-[0.08em] text-neutral-400 sm:block">
                      {project.org}
                    </span>
                    <span className="hidden font-mono text-xs uppercase tracking-[0.08em] text-neutral-500 sm:block">
                      {project.field}
                    </span>
                    <span
                      className={`h-2 w-2 justify-self-end rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-accent motion-safe:animate-blink" : "bg-neutral-800 group-hover:bg-neutral-500"
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="grid gap-x-12 gap-y-5 pb-7 pl-12 font-mono sm:pl-16 lg:grid-cols-12">
                          <p className="text-sm leading-relaxed text-neutral-300 lg:col-span-4">{project.summary}</p>

                          {/* The stack as dot-matrix logos, with tags only where no logo exists */}
                          <ul className="hidden flex-wrap content-start items-start gap-x-3 gap-y-4 lg:col-span-6 lg:flex">
                            {project.stack.map((tool) => {
                              const logo = LOGOS.get(tool);
                              return logo ? (
                                <li key={tool} className="flex w-16 flex-col items-center gap-2 text-center">
                                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-700">
                                    <DotLogo path={logo} className="h-9 w-9 text-white" />
                                  </span>
                                  <span className="text-[10px] uppercase tracking-[0.06em] text-neutral-400">{tool}</span>
                                </li>
                              ) : (
                                <li
                                  key={tool}
                                  className="mt-4 border border-neutral-800 px-2.5 py-1.5 text-[11px] uppercase tracking-[0.06em] text-neutral-300"
                                >
                                  {tool}
                                </li>
                              );
                            })}
                          </ul>

                          {project.link && (
                            <div className="lg:col-span-2 lg:justify-self-end">
                              <a
                                href={project.link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-neutral-700 px-4 py-2.5 text-xs text-neutral-100 transition-colors hover:border-accent"
                              >
                                {project.link.label}
                                <ArrowUpRight className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
