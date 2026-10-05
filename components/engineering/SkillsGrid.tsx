"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SKILL_CATEGORIES, type SkillCategory } from "@/lib/data/skills";
import { ScrambleText } from "@/components/shared/ScrambleText";
import { DotLogo } from "@/components/shared/DotLogo";

// ── Board geometry (SVG user units) ────────────────────────────────────────────
const W = 1400;
const H = 720;
const CHIP = { x: 580, y: 200, w: 240, h: 320 };
const TOP = 44;
const BOTTOM = H - 44;
// Distance from the chip to the nearest trace corner, and between neighbouring corners
const TURN_NEAR = 26;
const TURN_STEP = 11;
// Where traces end / labels start, measured from the chip edge
const LABEL_GAP = 170;

const byId = (id: string) => SKILL_CATEGORIES.find((c) => c.id === id) as SkillCategory;
const SIDES = {
  left: [byId("devops"), byId("languages")],
  right: [byId("ai"), byId("databases"), byId("certificates")],
};

interface Pad {
  index: number;
  name: string;
  note?: string;
  logo?: string;
  mark?: string;
  group: string;
  groupId: string;
  side: "left" | "right";
  path: string;
  x: number;
  y: number;
}
interface Bracket {
  id: string;
  label: string;
  count: number;
  side: "left" | "right";
  y1: number;
  y2: number;
}

// Group names as they are printed on the board's part plates, split to fit
const PLATE_LINES: Record<string, string[]> = {
  devops: ["DevOps &", "Infrastructure"],
  ai: ["AI & Language", "Models"],
  languages: ["Languages"],
  databases: ["Databases"],
  certificates: ["Certificates"],
};
const PLATE_W = 190;
// Part number for a group, in page order: U1, U2, …
const designator = (id: string) => `U${SKILL_CATEGORIES.findIndex((c) => c.id === id) + 1}`;

function layout() {
  const pads: Pad[] = [];
  const brackets: Bracket[] = [];

  (["left", "right"] as const).forEach((side) => {
    const groups = SIDES[side];
    const count = groups.reduce((n, g) => n + g.skills.length, 0);
    // One empty slot between groups
    const slots = count + groups.length - 1;
    const slotGap = (BOTTOM - TOP) / (slots - 1);
    const pinGap = (CHIP.h - 36) / (count - 1);
    const dir = side === "left" ? -1 : 1;
    const edge = side === "left" ? CHIP.x : CHIP.x + CHIP.w;
    const end = edge + dir * LABEL_GAP;

    let slot = 0;
    let k = 0;
    groups.forEach((group) => {
      const y1 = TOP + slot * slotGap;
      group.skills.forEach((skill) => {
        const y = TOP + slot * slotGap;
        const pinY = CHIP.y + 18 + k * pinGap;
        // Traces heading up turn nearest the chip at the top; traces heading down mirror that.
        // This ordering is what keeps them from crossing.
        const rank = y < pinY ? k : count - 1 - k;
        const turnX = edge + dir * (TURN_NEAR + rank * TURN_STEP);
        const path =
          Math.abs(y - pinY) < 1
            ? `M${edge},${pinY} H${end}`
            : `M${edge},${pinY} H${turnX} V${y} H${end}`;
        pads.push({ index: 0, ...skill, group: group.label, groupId: group.id, side, path, x: end, y });
        slot++;
        k++;
      });
      brackets.push({
        id: group.id,
        label: group.label,
        count: group.skills.length,
        side,
        y1,
        y2: TOP + (slot - 1) * slotGap,
      });
      slot++;
    });
  });

  pads.forEach((pad, i) => (pad.index = i));
  return { pads, brackets };
}

const { pads: PADS, brackets: BRACKETS } = layout();
// Stepping by a number coprime with the pad count visits every pad while hopping around the board
const HOP = 7;
const PULSE_MS = 1700;
const pad2 = (n: number) => String(n).padStart(2, "0");

export function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const onScreen = useInView(ref);

  const [pulse, setPulse] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (hovered !== null || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setPulse((i) => (i + HOP) % PADS.length), PULSE_MS);
    return () => clearInterval(interval);
  }, [hovered, onScreen]);

  const active = PADS[hovered ?? pulse];

  return (
    <section id="skills" className="border-t border-neutral-800 bg-[#0A0A0A] text-white">
      <div ref={ref} className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
              <span className="block h-2 w-2 rounded-full bg-accent" />
              <span className="text-neutral-500">03</span>
              Skills
            </p>
            <h2 className="mt-5 font-display font-black uppercase leading-[0.9] text-[13vw] lg:text-[min(7.3vw,7.5rem)]">
              {inView ? <ScrambleText text="Skills" duration={600} /> : <span className="invisible">Skills</span>}
            </h2>
          </div>
          <p className="max-w-md pb-2 font-mono text-sm leading-relaxed text-neutral-400">
            Everything wired to one board. Signals run to each skill in turn
            <span className="hidden lg:inline">; hover any label to trace it yourself</span>.
          </p>
        </div>

        {/* Wide screens: the circuit board */}
        <motion.div
          className="mt-6 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto max-h-[max(30rem,calc(100dvh-17.5rem))] w-full" role="img" aria-label="Skills wired to a central chip">
            {/* Traces */}
            {PADS.map((pad) => (
              <path key={pad.index} d={pad.path} fill="none" stroke="#2a2a2a" strokeWidth="1" />
            ))}
            {/* Signal on the active trace, drawn from the chip outward */}
            <path
              key={active.index}
              d={active.path}
              fill="none"
              stroke="#E14504"
              strokeWidth="1.6"
              pathLength={1}
              className="trace-signal"
            />

            {/* Group brackets, each tied to a part plate carrying the group's name */}
            {BRACKETS.map((b) => {
              const dir = b.side === "left" ? -1 : 1;
              const edge = b.side === "left" ? CHIP.x : CHIP.x + CHIP.w;
              const x = edge + dir * (LABEL_GAP + 190);
              const mid = (b.y1 + b.y2) / 2;
              const lines = PLATE_LINES[b.id];
              const plateH = 36 + lines.length * 20;
              const plateX = b.side === "left" ? x - 16 - PLATE_W : x + 16;
              const lit = active.group === b.label;
              return (
                <g key={b.id}>
                  <path
                    d={`M${x - dir * 6},${b.y1 - 10} H${x} V${b.y2 + 10} H${x - dir * 6} M${x},${mid} H${x + dir * 16}`}
                    fill="none"
                    stroke={lit ? "#a3a3a3" : "#333"}
                    strokeWidth="1"
                    className="transition-[stroke] duration-300"
                  />
                  <rect
                    x={plateX}
                    y={mid - plateH / 2}
                    width={PLATE_W}
                    height={plateH}
                    rx="3"
                    fill={lit ? "#171717" : "#0A0A0A"}
                    stroke={lit ? "#d4d4d4" : "#333"}
                    className="transition-[stroke,fill] duration-300"
                  />
                  <text
                    x={plateX + 12}
                    y={mid - plateH / 2 + 17}
                    className={`font-mono text-[10px] tracking-[0.1em] transition-[fill] duration-300 ${
                      lit ? "fill-accent" : "fill-neutral-500"
                    }`}
                  >
                    {designator(b.id)}
                  </text>
                  <text
                    x={plateX + PLATE_W - 12}
                    y={mid - plateH / 2 + 17}
                    textAnchor="end"
                    className="fill-neutral-500 font-mono text-[10px]"
                  >
                    {pad2(b.count)}
                  </text>
                  {lines.map((line, i) => (
                    <text
                      key={line}
                      x={plateX + 12}
                      y={mid - plateH / 2 + 40 + i * 20}
                      className={`font-display text-[16px] font-black uppercase transition-[fill] duration-300 ${
                        lit ? "fill-white" : "fill-neutral-300"
                      }`}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}

            {/* Pads + labels */}
            {PADS.map((pad) => {
              const dir = pad.side === "left" ? -1 : 1;
              const lit = pad.index === active.index;
              return (
                <g
                  key={pad.index}
                  onMouseEnter={() => setHovered(pad.index)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-default"
                >
                  {/* Generous hover target */}
                  <rect
                    x={pad.side === "left" ? pad.x - 180 : pad.x - 8}
                    y={pad.y - 13}
                    width="188"
                    height="26"
                    fill="transparent"
                  />
                  <circle
                    cx={pad.x}
                    cy={pad.y}
                    r={lit ? 4 : 2.5}
                    className={`transition-all duration-200 ${lit ? "fill-accent" : "fill-neutral-600"}`}
                  />
                  <text
                    x={pad.x + dir * 14}
                    y={pad.y}
                    dominantBaseline="middle"
                    textAnchor={pad.side === "left" ? "end" : "start"}
                    className={`font-mono text-[14px] uppercase tracking-[0.06em] transition-[fill] duration-200 ${
                      lit ? "fill-white" : "fill-neutral-400"
                    }`}
                  >
                    {pad.name}
                  </text>
                </g>
              );
            })}

            {/* Chip */}
            <rect x={CHIP.x} y={CHIP.y} width={CHIP.w} height={CHIP.h} rx="8" fill="#0A0A0A" stroke="#737373" />
            <rect
              x={CHIP.x + 10}
              y={CHIP.y + 10}
              width={CHIP.w - 20}
              height={CHIP.h - 20}
              rx="4"
              fill="#000"
              stroke="#262626"
            />
            <circle cx={CHIP.x + 22} cy={CHIP.y + 22} r="3" className="fill-accent motion-safe:animate-blink" />
            <foreignObject x={CHIP.x + 14} y={CHIP.y + 14} width={CHIP.w - 28} height={CHIP.h - 28}>
              <ChipScreen pad={active} />
            </foreignObject>
          </svg>
        </motion.div>

        {/* Narrow screens: a readout bar that stays in view, above the board laid out top to bottom */}
        <motion.div
          className="mt-8 lg:hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="sticky top-16 z-20 -mx-4 flex items-center gap-4 border-y border-neutral-800 bg-[#0A0A0A]/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-neutral-600 bg-black">
              <DotLogo path={active.logo} mark={active.mark} className="h-9 w-9 text-[7px] text-white" />
              <span className="absolute left-1 top-1 h-1 w-1 rounded-full bg-accent motion-safe:animate-blink" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                <span className="text-accent">{designator(active.groupId)}</span> · {active.group}
              </p>
              <p className="mt-1 truncate font-display text-xl font-black uppercase leading-tight">
                <ScrambleText text={active.name} duration={350} />
              </p>
            </div>
            <p className="ml-auto shrink-0 font-mono text-[10px] text-neutral-500">
              <span className="text-accent">{pad2(active.index + 1)}</span> / {pad2(PADS.length)}
            </p>
          </div>

          {/* Trunk running down from the readout, with one part plate and its components per group */}
          <div className="ml-1.5 border-l border-dashed border-neutral-700 pl-5 pt-8">
            {SKILL_CATEGORIES.map((group) => {
              const groupLit = active.groupId === group.id;
              return (
                <div key={group.id} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-5 top-6 w-5 border-t border-dashed border-neutral-700" />
                  <div
                    className={`flex items-center justify-between gap-3 rounded-[3px] border px-3 py-2.5 transition-colors duration-300 ${
                      groupLit ? "border-neutral-300 bg-neutral-900" : "border-neutral-800"
                    }`}
                  >
                    <p className="flex min-w-0 items-baseline gap-2.5">
                      <span
                        className={`font-mono text-[10px] tracking-[0.1em] transition-colors duration-300 ${
                          groupLit ? "text-accent" : "text-neutral-500"
                        }`}
                      >
                        {designator(group.id)}
                      </span>
                      <span
                        className={`truncate font-display text-base font-black uppercase transition-colors duration-300 ${
                          groupLit ? "text-white" : "text-neutral-300"
                        }`}
                      >
                        {group.label}
                      </span>
                    </p>
                    <span className="font-mono text-[10px] text-neutral-500">{pad2(group.skills.length)}</span>
                  </div>

                  <ul className="mt-5 grid grid-cols-4 gap-x-2 gap-y-5">
                    {group.skills.map((skill) => {
                      const pad = PADS.find((p) => p.name === skill.name && p.groupId === group.id) as Pad;
                      const lit = pad.index === active.index;
                      return (
                        <li key={skill.name}>
                          <button
                            type="button"
                            onClick={() => setHovered(pad.index)}
                            className="flex w-full flex-col items-center gap-2 text-center"
                          >
                            <span
                              className={`flex h-14 w-14 items-center justify-center rounded-full border transition-colors duration-200 ${
                                lit ? "border-accent text-white" : "border-neutral-800 text-neutral-400"
                              }`}
                            >
                              <DotLogo path={skill.logo} mark={skill.mark} className="h-7 w-7 text-[5.5px]" />
                            </span>
                            <span
                              className={`font-mono text-[9px] uppercase leading-tight tracking-[0.04em] transition-colors duration-200 ${
                                lit ? "text-white" : "text-neutral-500"
                              }`}
                            >
                              {skill.name}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** The chip's face: whichever skill the signal is on right now — its logo in dots, then its name. */
function ChipScreen({ pad }: { pad: Pad }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-2 text-center">
      <p className="font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-neutral-500">{pad.group}</p>
      <DotLogo path={pad.logo} mark={pad.mark} className="mt-4 h-[92px] w-[92px] text-[18px] text-white" />
      <p className="mt-4 font-display text-[20px] font-black uppercase leading-none text-white">
        <ScrambleText text={pad.name} duration={350} />
      </p>
      <p className="mt-2 min-h-[2.5em] font-mono text-[10px] leading-snug text-neutral-500">{pad.note}</p>
      <p className="font-mono text-[10px] text-neutral-600">
        <span className="text-accent">{pad2(pad.index + 1)}</span> / {pad2(PADS.length)}
      </p>
    </div>
  );
}
