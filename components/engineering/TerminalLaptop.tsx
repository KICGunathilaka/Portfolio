"use client";

import { useEffect, useMemo, useState } from "react";

type Segment = string | { hl: string };
type Line = { cmd: string } | { out: Segment[] };

const PROMPT = "isuru@bloomtech:~$";
const TICK_MS = 45;
// Ticks to wait after a command is typed / after its output prints / before the session replays
const AFTER_CMD = 8;
const AFTER_OUT = 10;
const HOLD = 50;
// After the hold the session is "infected": the screen corrupts, the laptop tears apart and
// drops out, stays gone for a beat, then glitches back in and the session starts over.
const GLITCH = 34;
const OFF = 18;
const BOOT = 9;

const NOISE = "█▓▒░#@$%&/<>01";
const corrupt = (text: string, amount: number) =>
  Array.from(text, (char) =>
    char !== " " && Math.random() < amount ? NOISE[Math.floor(Math.random() * NOISE.length)] : char
  ).join("");

const ticksFor = (line: Line) => ("cmd" in line ? line.cmd.length + AFTER_CMD : line.out.length + AFTER_OUT);

/**
 * A line-drawn laptop whose screen runs a looping terminal session; keywords print highlighted.
 * Each loop ends with the system glitching out and rebooting.
 */
export function TerminalLaptop({ uptime, className }: { uptime: string; className?: string }) {
  const lines = useMemo<Line[]>(
    () => [
      { cmd: "whoami" },
      { out: [{ hl: "Isuru Gunathilaka" }, "—", { hl: "Systems Engineer" }, "at BloomTech"] },
      { cmd: "cat devops.txt" },
      {
        out: [
          { hl: "Linux" },
          { hl: "CI/CD" },
          { hl: "Docker" },
          { hl: "Jenkins" },
          { hl: "Ansible" },
          { hl: "AWS" },
          { hl: "Nginx" },
          { hl: "Cloudflare" },
        ],
      },
      { cmd: "cat ai.txt" },
      { out: [{ hl: "RAG systems" }, { hl: "LLM fine-tuning" }, { hl: "Deep Learning" }] },
      { out: ["with", "LLaMA,", "Ollama,", "Unsloth,", "Hugging Face"] },
      { cmd: "./research --published" },
      { out: [{ hl: "IEEE Xplore" }, "—", "Guppy Fish Health Classification"] },
      { cmd: "uptime" },
      { out: ["up", { hl: uptime }] },
    ],
    [uptime]
  );

  const total = useMemo(() => lines.reduce((sum, line) => sum + ticksFor(line), 0), [lines]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(total);
      return;
    }
    const interval = setInterval(() => setTick((t) => (t >= total + HOLD + GLITCH + OFF ? 0 : t + 1)), TICK_MS);
    return () => clearInterval(interval);
  }, [total]);

  const glitchStart = total + HOLD;
  const glitching = tick > glitchStart && tick <= glitchStart + GLITCH;
  const off = tick > glitchStart + GLITCH;
  const booting = tick > 0 && tick <= BOOT;
  // 0 → 1 as the infection spreads
  const damage = glitching ? (tick - glitchStart) / GLITCH : 0;
  const garble = (text: string) => (damage ? corrupt(text, damage * 0.7) : text);

  // Walk the script, showing as much of each line as the clock has reached
  const rows: React.ReactNode[] = [];
  let offset = 0;
  let typing = false;
  for (let i = 0; i < lines.length && tick > offset; i++) {
    const line = lines[i];
    const local = tick - offset;

    if ("cmd" in line) {
      typing = local <= line.cmd.length;
      rows.push(
        <p key={i}>
          <span className="text-neutral-500">{garble(PROMPT)}</span> {garble(line.cmd.slice(0, local))}
          {typing && <Cursor />}
        </p>
      );
    } else {
      typing = false;
      rows.push(
        <p key={i} className="flex flex-wrap gap-x-[0.6em] gap-y-1 text-neutral-400">
          {line.out.slice(0, local).map((segment, j) =>
            typeof segment === "string" ? (
              <span key={j}>{garble(segment)}</span>
            ) : (
              // Highlights turn orange one by one as the damage spreads
              <span
                key={j}
                className={`px-[0.4em] text-black ${Math.random() < damage ? "bg-accent" : "bg-neutral-100"}`}
              >
                {garble(segment.hl)}
              </span>
            )
          )}
        </p>
      );
    }
    offset += ticksFor(line);
  }

  return (
    <div className={className} aria-hidden>
      <div className={off ? "laptop-off" : glitching ? "laptop-glitch" : booting ? "laptop-boot" : undefined}>
        {/* Lid + screen */}
        <div className="mx-[4%] rounded-t-xl border border-b-0 border-neutral-700 bg-[#0A0A0A] p-1.5 sm:p-2">
          <div className="relative flex aspect-[16/10] flex-col overflow-hidden rounded-md border border-neutral-800 bg-black">
            <div className="flex shrink-0 items-center gap-1.5 border-b border-neutral-800 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="ml-2 font-mono text-[10px] text-neutral-600">isuru — bash</span>
            </div>

            {/* Flashing fault banner once the damage is well under way */}
            {damage > 0.35 && tick % 6 < 4 && (
              <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-accent px-3 py-1.5 font-display text-sm font-black uppercase tracking-[0.12em] text-black sm:text-lg">
                {corrupt("System failure", damage * 0.25)}
              </p>
            )}

            {/* Bottom-anchored so older lines scroll up and out, like a real terminal */}
            <div className="min-h-0 flex-1 p-3 sm:p-4">
              <div className="flex h-full flex-col justify-end gap-1 overflow-hidden font-mono text-[10px] leading-relaxed text-neutral-200 sm:text-[11px] xl:text-xs">
                {rows}
                {!typing && (
                  <p>
                    <span className="text-neutral-500">{PROMPT}</span> <Cursor />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Base */}
        <div className="relative h-3 rounded-b-xl rounded-t-sm border border-neutral-700 bg-[#0A0A0A]">
          <span className="absolute left-1/2 top-0 h-1 w-[14%] -translate-x-1/2 rounded-b-md border border-t-0 border-neutral-700" />
        </div>
      </div>
    </div>
  );
}

function Cursor() {
  return <span className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent motion-safe:animate-blink" />;
}
