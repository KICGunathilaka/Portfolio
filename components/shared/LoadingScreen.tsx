"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const DURATION = 2200;
const SEGMENTS = 48;

// Each line shows once progress reaches `from` and is marked ok at `to`
const BOOT_LOG = [
  { from: 0, to: 22, text: "init runtime" },
  { from: 22, to: 48, text: "load assets" },
  { from: 48, to: 70, text: "mount /engineering" },
  { from: 70, to: 92, text: "mount /explorer" },
  { from: 92, to: 100, text: "handoff" },
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  // Kept in a ref so a new callback identity from the parent doesn't restart the sequence
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let raf = 0;
    let finish: ReturnType<typeof setTimeout>;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      setElapsed(now - start);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finish = setTimeout(() => {
          setDone(true);
          // Mount the page now so it is already there when the panel wipes away
          onCompleteRef.current();
        }, 350);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(finish);
    };
  }, []);

  const digits = String(progress).padStart(3, "0");
  const leadingZeros = digits.length - String(progress).length;
  const filled = Math.round((progress / 100) * SEGMENTS);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0A0A0A] p-5 sm:p-10 text-white"
          initial={false}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: reduceMotion ? 0.3 : 0.8, ease: [0.76, 0, 0.24, 1] }}
          role="progressbar"
          aria-label="Loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          {/* Top readout */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2.5 font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.12em]">
                <motion.span
                  className="block h-2 w-2 rounded-full bg-accent"
                  animate={reduceMotion ? undefined : { opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
                />
                <span className="text-neutral-300">Portfolio</span>
              </div>
              <p className="mt-2 font-mono text-[11px] sm:text-xs text-neutral-500">
                Systems Engineer &amp; Explorer
              </p>
            </div>
            <span className="font-mono text-[11px] sm:text-xs tabular-nums text-neutral-500">
              T+{(elapsed / 1000).toFixed(2)}s
            </span>
          </div>

          {/* Bottom block: counter, status, segmented bar */}
          <div>
            <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div
                className="font-display font-black leading-[0.8] tabular-nums"
                style={{ fontSize: "clamp(6rem, 26vw, 19rem)" }}
              >
                <span className="text-neutral-800">{digits.slice(0, leadingZeros)}</span>
                <span>{digits.slice(leadingZeros)}</span>
              </div>

              {/* Boot log — fixed height so the counter doesn't shift as lines appear */}
              <ul className="flex h-[6.5rem] sm:h-[7.5rem] flex-col justify-end gap-1 sm:pb-3 font-mono text-[11px] sm:text-xs text-neutral-500">
                {BOOT_LOG.filter((line) => progress >= line.from).map((line) => {
                  const ok = progress >= line.to;
                  return (
                    <li key={line.text} className="flex items-center gap-3 whitespace-nowrap">
                      <span className={ok ? "text-neutral-700" : "text-accent"}>&gt;</span>
                      <span className={`w-[19ch] ${ok ? "" : "text-neutral-200"}`}>{line.text}</span>
                      <span className={ok ? "text-neutral-300" : "text-neutral-700"}>{ok ? "ok" : "··"}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6 sm:mt-10 flex justify-between">
              {Array.from({ length: SEGMENTS }, (_, i) => (
                <span
                  key={i}
                  className={`h-1 w-1 sm:h-2 sm:w-2 rounded-full ${
                    i < filled - 1 || (progress === 100 && i < filled)
                      ? "bg-neutral-200"
                      : i === filled - 1
                        ? "bg-accent"
                        : "bg-neutral-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
