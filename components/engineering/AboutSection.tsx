"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Cpu, Factory, FileText, GraduationCap, Server, Wrench } from "lucide-react";
import { ScrambleText } from "@/components/shared/ScrambleText";

const TIMELINE = [
  {
    year: "2019",
    icon: Wrench,
    title: "Hardware Technician",
    meta: "Computer Hardware Technician · 2019 – 2020",
    text: "Where it started: assembling, troubleshooting and repairing computers.",
  },
  {
    year: "2020",
    icon: GraduationCap,
    title: "NSBM University",
    meta: "NSBM Green University · 2020 – 2024",
    text: "Began a BSc Engineering (Hons) in Computer Systems Engineering.",
  },
  {
    year: "2022",
    icon: Cpu,
    title: "E-Gravity Solutions",
    meta: "Trainee Engineer · Apr – Jul 2022",
    text: "Worked with PIC microcontrollers and built a grounding in embedded systems and electronics.",
  },
  {
    year: "2023",
    icon: Factory,
    title: "OREL Corporation",
    meta: "Digital Twin & IoT Engineer · Aug – Nov 2023",
    text: "Built LabVIEW applications for assembly-line automation, integrated and programmed sensors, and linked the line to a Python server.",
  },
  {
    year: "2024",
    icon: Award,
    title: "Graduated",
    meta: "BSc Eng (Hons) Computer Systems Engineering · Oct 2024",
    text: "Second Class Upper Division, NSBM Green University.",
  },
  {
    year: "2025",
    icon: FileText,
    title: "IEEE Publication",
    meta: "Research · IEEE Xplore",
    text: "Deep learning and computer vision research on classifying healthy and diseased guppy fish for the ornamental export industry, built with Python, YOLO, OpenCV and TensorFlow.",
  },
  {
    year: "Now",
    icon: Server,
    title: "BloomTech",
    meta: "Systems Engineer · joined as Trainee Systems Engineer",
    text: "CI/CD end to end for the BloomAudit application, Linux infrastructure, RAG systems and LLM fine-tuning.",
  },
];

// The track is a row of dots; every STEP-th dot is a milestone
const STEP = 8;
const DOTS = (TIMELINE.length - 1) * STEP + 1;
const ADVANCE_MS = 4200;

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const onScreen = useInView(ref);

  const [active, setActive] = useState(0);
  // Auto-advance stops once the visitor picks a milestone themselves, and waits while they hover
  const [manual, setManual] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (manual || hovering || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setActive((i) => (i + 1) % TIMELINE.length), ADVANCE_MS);
    return () => clearInterval(interval);
  }, [manual, hovering, onScreen]);

  const entry = TIMELINE[active];

  return (
    <section id="about" className="border-t border-neutral-800 bg-[#0A0A0A] text-white">
      <div ref={ref} className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-10 lg:py-24">
        {/* Heading + bio */}
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
              <span className="block h-2 w-2 rounded-full bg-accent" />
              <span className="text-neutral-500">02</span>
              About
            </p>
            <h2 className="mt-5 font-display font-black uppercase leading-[0.9] text-[13vw] lg:text-[min(7.3vw,7.5rem)]">
              {inView ? <ScrambleText text="About" duration={600} /> : <span className="invisible">About</span>}
            </h2>
          </div>

          <motion.div
            className="flex flex-col gap-5 font-mono text-sm leading-relaxed text-neutral-400 lg:col-span-7 lg:pt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Wide screens let the timeline below tell the story, so the bio stays to one line */}
            <p className="hidden text-base text-neutral-300 lg:block">
              Computer systems engineer from NSBM Green University, now building CI/CD, Linux infrastructure
              and language-model systems at <span className="text-white">BloomTech</span>.
            </p>
            <p className="lg:hidden">
              I studied Computer Systems Engineering at NSBM Green University and graduated in 2024 with a
              Second Class Upper. Along the way I repaired computers, programmed PIC microcontrollers at
              E-Gravity Solutions, and automated an assembly line with LabVIEW and IoT sensors at OREL
              Corporation.
            </p>
            <p className="lg:hidden">
              My research used deep learning and computer vision to tell healthy guppy fish from diseased
              ones, and it was published by IEEE. Today I&apos;m a{" "}
              <span className="text-neutral-100">systems engineer at BloomTech</span>, where I run CI/CD and
              Linux infrastructure and build RAG systems and fine-tuned language models.
            </p>
          </motion.div>
        </div>

        {/* Timeline: a dot track you can step through */}
        <motion.div
          className="mt-14 lg:mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="flex items-center justify-between pt-9 lg:pt-12">
            {Array.from({ length: DOTS }, (_, i) => {
              const node = i % STEP === 0 ? i / STEP : -1;
              const reached = i <= active * STEP;

              if (node < 0) {
                return (
                  <span
                    key={i}
                    className={`h-[3px] w-[3px] shrink-0 rounded-full transition-colors duration-300 sm:h-1 sm:w-1 lg:h-1.5 lg:w-1.5 ${
                      reached ? "bg-neutral-300" : "bg-neutral-800"
                    }`}
                  />
                );
              }

              const isActive = node === active;
              const Icon = TIMELINE[node].icon;
              const edge =
                node === 0
                  ? "left-3"
                  : node === TIMELINE.length - 1
                    ? "right-3"
                    : "left-1/2 -translate-x-1/2";

              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`${TIMELINE[node].year}: ${TIMELINE[node].title}`}
                  aria-pressed={isActive}
                  onClick={() => {
                    setActive(node);
                    setManual(true);
                  }}
                  className="group relative -m-3 shrink-0 p-3 outline-none"
                >
                  <span
                    className={`absolute bottom-full font-display text-xs font-extrabold uppercase transition-colors duration-300 sm:text-base ${edge} ${
                      isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                    }`}
                  >
                    {TIMELINE[node].year}
                  </span>
                  {/* Wide screens: a large icon node. Narrow screens: the plain dot below. */}
                  <span
                    className={`hidden h-20 w-20 items-center justify-center rounded-full border bg-[#0A0A0A] transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-accent lg:flex xl:h-24 xl:w-24 ${
                      isActive
                        ? "border-accent text-white"
                        : reached
                          ? "border-neutral-300 text-neutral-200"
                          : "border-neutral-700 text-neutral-600 group-hover:border-neutral-400 group-hover:text-neutral-300"
                    }`}
                  >
                    <Icon className="h-8 w-8 xl:h-10 xl:w-10" strokeWidth={1.25} />
                  </span>
                  <span
                    className={`block h-2.5 w-2.5 rounded-full transition-[background-color,transform] duration-300 group-focus-visible:ring-2 lg:hidden group-focus-visible:ring-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0A0A0A] sm:h-3 sm:w-3 ${
                      isActive
                        ? "scale-125 bg-accent"
                        : reached
                          ? "bg-neutral-200"
                          : "bg-neutral-700 group-hover:bg-neutral-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Selected milestone */}
          <div className="mt-10 grid min-h-[15rem] gap-x-16 gap-y-5 sm:min-h-[12rem] lg:mt-12 lg:min-h-[8rem] lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs text-neutral-500">
                <span className="text-accent">{String(active + 1).padStart(2, "0")}</span> /{" "}
                {String(TIMELINE.length).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display font-black uppercase leading-[0.95] text-[8.5vw] sm:text-5xl lg:text-6xl">
                <ScrambleText text={entry.title} duration={450} />
              </h3>
            </div>
            <div className="font-mono lg:col-span-5 lg:pt-7">
              <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">{entry.meta}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">{entry.text}</p>
            </div>
          </div>
        </motion.div>

        {/* Education + activities */}
        <motion.div
          className="mt-10 grid gap-x-16 font-mono text-xs lg:mt-12 lg:grid-cols-2"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <dl>
            <Row label="Degree">
              BSc Engineering (Hons), Computer Systems Engineering
              <span className="block text-neutral-500">Second Class Upper Division</span>
            </Row>
            <Row label="University" last>
              NSBM Green University
              <span className="block text-neutral-500">2020 – October 2024</span>
            </Row>
          </dl>
          <dl>
            <Row label="Activities">
              Club Coordinator, Association of Engineering
              <span className="block text-neutral-500">NSBM · 2022 – 2023</span>
            </Row>
            <Row label="Also" last>
              Batch Representative
              <br />
              IEEE Student Branch member
            </Row>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, last, children }: { label: string; last?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`grid grid-cols-[6.5rem_1fr] gap-4 border-t border-neutral-800 py-3 sm:grid-cols-[9rem_1fr] ${
        last ? "lg:border-b" : ""
      }`}
    >
      <dt className="uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
      <dd className="leading-relaxed text-neutral-200">{children}</dd>
    </div>
  );
}
