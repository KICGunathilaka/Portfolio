"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrambleText } from "@/components/shared/ScrambleText";

const EMAIL = "isurugunathilaka1@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/isuru-gunathilakansbm";

const NOTIFICATIONS = [
  { app: "Mail", title: "Write to Isuru", body: EMAIL, href: `mailto:${EMAIL}` },
  { app: "LinkedIn", title: "Connect with Isuru", body: "in/isuru-gunathilakansbm", href: LINKEDIN },
];

// The phone's notifications arrive one by one, sit for a while, then clear and arrive again
const ARRIVE_MS = 1600;
const HOLD_TICKS = 6;

/** Current time in Sri Lanka, whatever the visitor's own timezone. */
function useSriLankaTime() {
  const [now, setNow] = useState<{ time: string; seconds: string; date: string } | null>(null);
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const part = (options: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Colombo", ...options }).format(d);
      setNow({
        time: part({ hour: "2-digit", minute: "2-digit", hour12: false }),
        seconds: part({ second: "2-digit" }).padStart(2, "0"),
        date: part({ weekday: "short", day: "2-digit", month: "short" }),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return now;
}

export function EngContact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const onScreen = useInView(ref);
  const now = useSriLankaTime();

  const [tick, setTick] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!onScreen || hovering) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(NOTIFICATIONS.length);
      return;
    }
    const interval = setInterval(
      () => setTick((t) => (t >= NOTIFICATIONS.length + HOLD_TICKS ? 0 : t + 1)),
      ARRIVE_MS
    );
    return () => clearInterval(interval);
  }, [onScreen, hovering]);

  const shown = Math.min(tick, NOTIFICATIONS.length);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context): the address is on screen to copy by hand
    }
  };

  return (
    <section id="contact" className="border-t border-neutral-800 bg-[#0A0A0A] text-white">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1600px] gap-x-16 gap-y-14 px-4 py-20 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-10 lg:py-24"
      >
        {/* Heading + direct links */}
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
            <span className="block h-2 w-2 rounded-full bg-accent" />
            <span className="text-neutral-500">07</span>
            Contact
          </p>
          <h2 className="mt-5 font-display font-black uppercase leading-[0.9] text-[13vw] lg:text-[min(7.3vw,7.5rem)]">
            {inView ? <ScrambleText text="Contact" duration={600} /> : <span className="invisible">Contact</span>}
          </h2>

          <motion.dl
            className="mt-10 max-w-2xl font-mono text-xs"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 border-t border-neutral-800 py-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
              <dt className="uppercase tracking-[0.12em] text-neutral-500">Email</dt>
              <dd className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-1.5 break-all text-sm text-neutral-100 transition-colors hover:text-white"
                >
                  <span className="underline decoration-neutral-700 underline-offset-4 transition-colors group-hover:decoration-accent">
                    {EMAIL}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded-full border border-neutral-700 px-3 py-1.5 text-[11px] text-neutral-300 transition-colors hover:border-neutral-400 hover:text-white"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </dd>
            </div>
            <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 border-y border-neutral-800 py-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
              <dt className="uppercase tracking-[0.12em] text-neutral-500">LinkedIn</dt>
              <dd>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 break-all text-sm text-neutral-100 transition-colors hover:text-white"
                >
                  <span className="underline decoration-neutral-700 underline-offset-4 transition-colors group-hover:decoration-accent">
                    in/isuru-gunathilakansbm
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                </a>
              </dd>
            </div>
          </motion.dl>
        </div>

        {/* A phone showing Sri Lanka time, with the same two links arriving as notifications */}
        <motion.div
          className="flex justify-center lg:col-span-5 lg:justify-end"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Re-keyed on each arrival so the buzz replays */}
          <div
            key={shown}
            className={`w-[280px] rounded-[2.4rem] border border-neutral-700 p-2 ${shown > 0 ? "phone-buzz" : ""}`}
          >
            <div className="relative flex aspect-[9/18] flex-col overflow-hidden rounded-[1.9rem] border border-neutral-800 bg-black px-4 pb-3 pt-4">
              <span className="absolute left-1/2 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-neutral-800" />

              <div className="flex items-center justify-between font-mono text-[10px] text-neutral-500">
                <span>Sri Lanka</span>
                <span className="flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-neutral-400" />
                  <span className="h-1 w-1 rounded-full bg-neutral-400" />
                  <span className="h-1 w-1 rounded-full bg-neutral-400" />
                  <span className="h-1 w-1 rounded-full bg-neutral-700" />
                </span>
              </div>

              <div className="mt-10 text-center">
                <p className="font-display text-6xl font-black leading-none tabular-nums" suppressHydrationWarning>
                  {now ? now.time : "--:--"}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">
                  {now ? now.date : " "}
                  <span className="text-accent"> · {now ? now.seconds : "--"}</span>
                </p>
              </div>

              <ul className="mt-auto flex flex-col gap-2">
                {NOTIFICATIONS.slice(0, shown).map((note) => (
                  <motion.li
                    key={note.app}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={note.href}
                      target={note.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="block rounded-2xl border border-neutral-800 bg-neutral-950 px-3.5 py-3 transition-colors hover:border-neutral-500"
                    >
                      <p className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                        <span className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {note.app}
                        </span>
                        now
                      </p>
                      <p className="mt-1.5 font-mono text-xs text-white">{note.title}</p>
                      <p className="mt-0.5 truncate font-mono text-[10px] text-neutral-500">{note.body}</p>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <span className="mx-auto mt-3 block h-1 w-20 rounded-full bg-neutral-700" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
