"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { TerminalLaptop } from "./TerminalLaptop";

const PAPER_URL = "https://ieeexplore.ieee.org/document/10963195";
const GITHUB_URL = "https://github.com/KICGunathilaka";

const ROLES = [
  "Systems Engineer",
  "DevOps",
  "RAG systems",
  "LLM fine-tuning",
  "Deep learning research",
  "Linux",
];

// Month the current role started (as a trainee), used for the running experience figure
const CAREER_START = { year: 2025, month: 7 };

function experience() {
  const now = new Date();
  const months = (now.getFullYear() - CAREER_START.year) * 12 + (now.getMonth() - CAREER_START.month);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years > 0 && `${years} yr`, rest > 0 && `${rest} mo`].filter(Boolean).join(" ");
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function EngineeringHero() {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRole((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100dvh] bg-[#0A0A0A] text-white">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col justify-center gap-10 px-4 pb-10 pt-24 sm:px-8 lg:gap-14 lg:px-10 lg:pb-12 lg:pt-24">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* Face, name, role */}
          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="group relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
                <div className="relative h-full w-full overflow-hidden rounded-full border border-neutral-700">
                  {/* Zoomed in on the face; the photo itself is a full-length portrait */}
                  <Image
                    src="/images/profile.jpg"
                    alt="Isuru Gunathilaka"
                    fill
                    priority
                    sizes="240px"
                    className="origin-[50%_48%] scale-[2.3] object-cover object-top grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                </div>
                <span className="absolute bottom-0.5 right-0.5 block h-2.5 w-2.5 rounded-full border-2 border-[#0A0A0A] bg-accent motion-safe:animate-blink sm:bottom-1 sm:right-1" />
              </div>

              <p className="font-mono text-xs leading-relaxed text-neutral-400">
                <span className="text-neutral-500">01</span> Engineering
                <span className="block text-neutral-500">Sri Lanka</span>
              </p>

              {/* Phones: GitHub profile, at the far end of the row */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Isuru's GitHub profile"
                className="ml-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-700 text-neutral-100 transition-colors hover:border-accent hover:text-white lg:hidden"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                  <path d={siGithub.path} />
                </svg>
              </a>
            </motion.div>

            <h1 className="mt-6 font-display font-black uppercase leading-[0.9] text-[13vw] lg:mt-8 lg:text-[min(7.3vw,7.5rem)]">
              <ScrambleText text="Isuru" delay={300} duration={500} className="text-neutral-400" />
              <br />
              <ScrambleText text="Gunathilaka" delay={550} duration={800} />
            </h1>

            <motion.p
              className="mt-5 flex min-h-[1.75rem] items-center gap-3 font-mono text-sm sm:text-base text-neutral-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span className="text-accent">&gt;</span>
              <ScrambleText text={ROLES[role]} duration={450} />
            </motion.p>
          </div>

          {/* Laptop running a terminal session of the same facts */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
          >
            <TerminalLaptop uptime={experience()} />
          </motion.div>
        </div>

        {/* Intro and actions on the left, spec sheet on the right */}
        <motion.div
          className="grid gap-x-16 gap-y-8 lg:grid-cols-12 lg:items-end"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
        >
          <div className="lg:col-span-5">
            <p className="max-w-xl font-mono text-sm leading-relaxed text-neutral-400">
              I&apos;m a systems engineer drawn to the place where DevOps and AI meet. At BloomTech I built the
              complete CI/CD pipeline for the BloomAudit application, and I work on RAG systems and LLM
              fine-tuning. My deep learning research on guppy fish health classification is published by IEEE.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs sm:text-sm">
              <a
                href="#projects"
                className="group/cta flex items-center gap-2 rounded-full bg-white px-5 py-3 text-black transition-colors hover:bg-accent hover:text-white"
              >
                View projects
                <ArrowDown className="h-4 w-4 transition-transform group-hover/cta:translate-y-0.5" strokeWidth={1.5} />
              </a>
              <a
                href="#contact"
                className="rounded-full border border-neutral-700 px-5 py-3 text-neutral-200 transition-colors hover:border-neutral-400 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>

          <dl className="font-mono text-xs lg:col-span-7">
            <SpecRow label="Role">
              Systems Engineer, BloomTech
              <span className="block text-neutral-500">Started as Trainee Systems Engineer</span>
            </SpecRow>
            <SpecRow label="Experience">
              <span suppressHydrationWarning>{experience()}</span>
            </SpecRow>
            <SpecRow label="Research">
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-start gap-1.5 transition-colors hover:text-white"
              >
                <span className="underline decoration-neutral-700 underline-offset-4 transition-colors group-hover/link:decoration-accent">
                  Deep Learning Based Export Oriented Guppy Fish Health Classification Method
                </span>
                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={1.5} />
              </a>
              <span className="block text-neutral-500">IEEE Xplore</span>
            </SpecRow>
            <SpecRow label="Internships" last>
              OREL Corporation
              <span className="text-neutral-500"> — Digital Twin &amp; IoT Engineer, 2023</span>
              <br />
              E-Gravity Solutions
              <span className="text-neutral-500"> — Trainee Engineer, 2022</span>
            </SpecRow>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

function SpecRow({ label, last, children }: { label: string; last?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`grid grid-cols-[6.5rem_1fr] gap-4 border-t border-neutral-800 py-3 sm:grid-cols-[9rem_1fr] ${
        last ? "border-b" : ""
      }`}
    >
      <dt className="uppercase tracking-[0.12em] text-neutral-500">{label}</dt>
      <dd className="leading-relaxed text-neutral-200">{children}</dd>
    </div>
  );
}
