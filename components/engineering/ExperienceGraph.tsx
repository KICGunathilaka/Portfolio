"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { EXPERIENCE, type Commit, type Role } from "@/lib/data/experience";
import { ScrambleText } from "@/components/shared/ScrambleText";

// ── Graph geometry (SVG user units) ────────────────────────────────────────────
const W = 1400;
const H = 440;
const MAIN_Y = 215;
const LANE = 118; // how far a branch sits from the main line
const RUN_IN = 56; // horizontal room for a branch to curve out or back in
const SPACING = 94; // between commits on a branch
const GAP = 34; // between one branch merging and the next forking
const START = 56;

// Short branch names for the graph; the full role title shows in the readout
const BRANCH_NAME: Record<string, string> = {
  hardware: "Hardware",
  egravity: "E-Gravity",
  orel: "OREL",
  bloomtech: "BloomTech",
};

interface Node {
  index: number;
  role: Role;
  commit: Commit;
  x: number;
  y: number;
  labelY: number;
}
interface Branch {
  role: Role;
  path: string;
  x: number;
  y: number;
  up: boolean;
  nodes: Node[];
}

function layout() {
  const branches: Branch[] = [];
  const nodes: Node[] = [];
  let x = START;

  // Oldest on the left. Branches alternate below and above the main line, ending with the current role above.
  [...EXPERIENCE].reverse().forEach((role, i, all) => {
    const up = (all.length - 1 - i) % 2 === 0;
    const y = MAIN_Y + (up ? -LANE : LANE);
    const first = x + RUN_IN;
    const last = first + (role.commits.length - 1) * SPACING;

    let path = `M${x},${MAIN_Y} C${x + RUN_IN * 0.6},${MAIN_Y} ${x + RUN_IN * 0.4},${y} ${first},${y} H${last}`;
    // Past roles merge back into the main line; the current one is still open
    if (!role.current) {
      const end = last + RUN_IN;
      path += ` C${last + RUN_IN * 0.6},${y} ${last + RUN_IN * 0.4},${MAIN_Y} ${end},${MAIN_Y}`;
    }

    const branch: Branch = { role, path, x: first, y, up, nodes: [] };
    role.commits.forEach((commit, j) => {
      const node: Node = {
        index: nodes.length,
        role,
        commit,
        x: first + j * SPACING,
        y,
        // Labels sit on the outer side, clear of the curves running to and from the main line
        labelY: y + (up ? -20 : 30),
      };
      nodes.push(node);
      branch.nodes.push(node);
    });
    branches.push(branch);
    x = last + RUN_IN + GAP;
  });

  return { branches, nodes };
}

const { branches: BRANCHES, nodes: NODES } = layout();
const HEAD = NODES[NODES.length - 1];
const STEP_MS = 2600;

/** Wide-screen view of the work history: a git branch graph you can scrub, with one commit read out at a time. */
export function ExperienceGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref);

  // Starts on the first commit of the current role
  const [pulse, setPulse] = useState(BRANCHES[BRANCHES.length - 1].nodes[0].index);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (hovered !== null || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setPulse((i) => (i + 1) % NODES.length), STEP_MS);
    return () => clearInterval(interval);
  }, [hovered, onScreen]);

  const active = NODES[hovered ?? pulse];

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Work history as a git branch graph">
        {/* Main line, with a signal flowing along it */}
        <line x1="16" y1={MAIN_Y} x2={W - 16} y2={MAIN_Y} stroke="#404040" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 12" />
        <line x1="16" y1={MAIN_Y} x2={W - 16} y2={MAIN_Y} className="flow-dots opacity-70" />
        <text x="16" y={MAIN_Y + 26} className="fill-neutral-600 font-mono text-[11px] uppercase tracking-[0.1em]">
          main
        </text>

        {BRANCHES.map((branch) => {
          const lit = active.role.id === branch.role.id;
          const nameY = branch.y + (branch.up ? -66 : 72);
          return (
            <g key={branch.role.id}>
              <path
                d={branch.path}
                fill="none"
                stroke={lit ? "#e5e5e5" : "#525252"}
                strokeWidth={lit ? 2 : 1.5}
                className="transition-[stroke] duration-300"
              />
              {/* Fork point on the main line */}
              <circle
                cx={branch.x - RUN_IN}
                cy={MAIN_Y}
                r="6"
                fill="#0A0A0A"
                stroke={lit ? "#e5e5e5" : "#737373"}
                strokeWidth="2"
                className="transition-[stroke] duration-300"
              />

              <text
                x={branch.x - 6}
                y={nameY}
                className={`font-display text-[26px] font-black uppercase transition-[fill] duration-300 ${
                  lit ? "fill-white" : "fill-neutral-400"
                }`}
              >
                {BRANCH_NAME[branch.role.id] ?? branch.role.title}
              </text>
              <text
                x={branch.x - 6}
                y={nameY + 20}
                className="fill-neutral-500 font-mono text-[11px] uppercase tracking-[0.1em]"
              >
                {branch.role.period}
              </text>

              {branch.nodes.map((node) => {
                const on = node.index === active.index;
                return (
                  <g
                    key={node.index}
                    onMouseEnter={() => setHovered(node.index)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-default"
                  >
                    {/* Generous hover target */}
                    <rect x={node.x - SPACING / 2} y={node.y - 34} width={SPACING} height="68" fill="transparent" />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={on ? 10 : 7}
                      fill={on ? "#E14504" : "#0A0A0A"}
                      stroke={on ? "#E14504" : lit ? "#e5e5e5" : "#a3a3a3"}
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    <text
                      x={node.x}
                      y={node.labelY}
                      textAnchor="middle"
                      className={`font-mono text-[12px] transition-[fill] duration-200 ${
                        on ? "fill-white" : "fill-neutral-500"
                      }`}
                    >
                      {node.commit.scope}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* HEAD marker on the newest commit of the open branch */}
        <text x={HEAD.x + 22} y={HEAD.y + 4} className="fill-accent font-mono text-[12px] tracking-[0.1em]">
          ← HEAD
        </text>
      </svg>

      {/* The commit the signal is on */}
      <div className="mt-6 grid grid-cols-12 items-end gap-x-12 border-t border-neutral-800 pt-6">
        <div className="col-span-7">
          <p className="font-mono text-xs text-neutral-500">
            <span className="text-accent">{active.commit.scope}:</span> {active.role.title}
            {active.role.org && <> · {active.role.org}</>}
          </p>
          <p className="mt-3 min-h-[2em] font-display text-4xl font-black uppercase leading-none">
            <ScrambleText text={active.commit.title} duration={400} />
          </p>
        </div>
        <p className="col-span-5 min-h-[3.5rem] font-mono text-sm leading-relaxed text-neutral-300">
          {active.commit.detail}
        </p>
      </div>
    </div>
  );
}

// ── Narrow-screen graph: the same branches, running top to bottom, newest first ──
const M_W = 360;
const M_MAIN = 22;
const M_LANE = 74;
const M_TEXT = 98;
const M_STEP = 50; // between commits
const M_HEAD = 64; // from the top of a role block to its first commit
const M_TAIL = 54; // from the last commit down to where the branch forks from main
const M_GAP = 26;

interface MobileNode {
  index: number;
  role: Role;
  commit: Commit;
  y: number;
}
interface MobileBranch {
  role: Role;
  path: string;
  top: number;
  forkY: number;
  nodes: MobileNode[];
}

function mobileLayout() {
  const branches: MobileBranch[] = [];
  const nodes: MobileNode[] = [];
  let top = 16;

  EXPERIENCE.forEach((role) => {
    const first = top + M_HEAD;
    const last = first + (role.commits.length - 1) * M_STEP;
    const forkY = last + M_TAIL;

    // Past roles merge back into main at their newer (upper) end; the current one is still open
    const start = role.current
      ? `M${M_LANE},${first}`
      : `M${M_MAIN},${top + 6} C${M_MAIN},${top + 38} ${M_LANE},${top + 30} ${M_LANE},${first}`;
    const path = `${start} V${last} C${M_LANE},${last + 32} ${M_MAIN},${last + 22} ${M_MAIN},${forkY}`;

    const branch: MobileBranch = { role, path, top, forkY, nodes: [] };
    role.commits.forEach((commit, j) => {
      const node = { index: nodes.length, role, commit, y: first + j * M_STEP };
      nodes.push(node);
      branch.nodes.push(node);
    });
    branches.push(branch);
    top = forkY + M_GAP;
  });

  return { branches, nodes, height: top };
}

const MOBILE = mobileLayout();

/** Narrow-screen view of the work history: a vertical branch graph under a readout bar that stays in view. */
export function ExperienceGraphMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref);

  const [pulse, setPulse] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    if (picked !== null || !onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setPulse((i) => (i + 1) % MOBILE.nodes.length), STEP_MS);
    return () => clearInterval(interval);
  }, [picked, onScreen]);

  const active = MOBILE.nodes[picked ?? pulse];

  return (
    <div ref={ref}>
      {/* The commit the signal is on */}
      <div className="sticky top-16 z-20 -mx-4 border-y border-neutral-800 bg-[#0A0A0A]/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <p className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500">
          <span className="text-accent">{active.commit.scope}:</span> {active.role.title}
        </p>
        <p className="mt-1 truncate font-display text-xl font-black uppercase leading-tight">
          <ScrambleText text={active.commit.title} duration={350} />
        </p>
        <p className="mt-1.5 min-h-[3.4em] font-mono text-[11px] leading-snug text-neutral-400">
          {active.commit.detail}
        </p>
      </div>

      <svg
        viewBox={`0 0 ${M_W} ${MOBILE.height}`}
        className="mt-6 w-full"
        role="img"
        aria-label="Work history as a git branch graph"
      >
        {/* Main line, with a signal flowing down it */}
        <line x1={M_MAIN} y1="8" x2={M_MAIN} y2={MOBILE.height - 8} stroke="#404040" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 12" />
        <line x1={M_MAIN} y1="8" x2={M_MAIN} y2={MOBILE.height - 8} className="flow-dots opacity-70" />

        {MOBILE.branches.map((branch) => {
          const lit = active.role.id === branch.role.id;
          return (
            <g key={branch.role.id}>
              <path
                d={branch.path}
                fill="none"
                stroke={lit ? "#e5e5e5" : "#525252"}
                strokeWidth={lit ? 2 : 1.5}
                className="transition-[stroke] duration-300"
              />
              {/* Fork point on the main line */}
              <circle
                cx={M_MAIN}
                cy={branch.forkY}
                r="6"
                fill="#0A0A0A"
                stroke={lit ? "#e5e5e5" : "#737373"}
                strokeWidth="2"
                className="transition-[stroke] duration-300"
              />

              <text
                x={M_TEXT}
                y={branch.top + 18}
                className={`font-display text-[22px] font-black uppercase transition-[fill] duration-300 ${
                  lit ? "fill-white" : "fill-neutral-400"
                }`}
              >
                {BRANCH_NAME[branch.role.id] ?? branch.role.title}
              </text>
              <text x={M_TEXT} y={branch.top + 36} className="fill-neutral-500 font-mono text-[10px] uppercase tracking-[0.1em]">
                {branch.role.period}
                {branch.role.current && <tspan className="fill-accent"> ← HEAD</tspan>}
              </text>

              {branch.nodes.map((node) => {
                const on = node.index === active.index;
                return (
                  <g key={node.index} onClick={() => setPicked(node.index)} className="cursor-pointer">
                    {/* Full-width tap target */}
                    <rect x={M_LANE - 22} y={node.y - M_STEP / 2} width={M_W - M_LANE + 22} height={M_STEP} fill="transparent" />
                    <circle
                      cx={M_LANE}
                      cy={node.y}
                      r={on ? 9 : 6.5}
                      fill={on ? "#E14504" : "#0A0A0A"}
                      stroke={on ? "#E14504" : lit ? "#e5e5e5" : "#a3a3a3"}
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    <text
                      x={M_TEXT}
                      y={node.y + 4}
                      className={`font-mono text-[12.5px] transition-[fill] duration-200 ${
                        on ? "fill-white" : "fill-neutral-400"
                      }`}
                    >
                      {node.commit.title}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
