"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FRAME_MS = 45;
const BLANK = " ";

interface ScrambleTextProps {
  text: string;
  /** ms to wait before the first decode starts */
  delay?: number;
  /** ms the decode takes, left to right */
  duration?: number;
  /** change this value to replay the decode (e.g. on hover) */
  replayKey?: number;
  /** ms to hold the resolved text before decoding again; omit to play once */
  repeatEvery?: number;
  className?: string;
}

const blankOut = (text: string) => text.replace(/\S/g, BLANK);

/** Text that resolves character by character out of random glyphs. Meant for monospaced faces. */
export function ScrambleText({
  text,
  delay = 0,
  duration = 900,
  replayKey = 0,
  repeatEvery,
  className,
}: ScrambleTextProps) {
  // Empty until the first decode starts, so the final text never flashes in early
  const [display, setDisplay] = useState(() => blankOut(text));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    let loop: ReturnType<typeof setTimeout>;
    let lastFrame = 0;
    // Only the first run waits; replays start immediately
    let start = performance.now() + (replayKey === 0 ? delay : 0);

    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min((now - start) / duration, 1);
      if (t === 1) {
        setDisplay(text);
        if (repeatEvery) {
          // Hold the resolved text, then decode again
          loop = setTimeout(() => {
            start = performance.now();
            raf = requestAnimationFrame(tick);
          }, repeatEvery);
        }
        return;
      }

      if (now - lastFrame >= FRAME_MS) {
        lastFrame = now;
        const resolved = Math.floor(t * text.length);
        setDisplay(
          Array.from(text, (char, i) =>
            i < resolved || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          ).join("")
        );
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(loop);
    };
  }, [text, delay, duration, replayKey, repeatEvery]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
