"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Hard stop for the effect, in case the animation's own end event never arrives
const MAX_PLAY_MS = 1500;

/**
 * Wraps a page section so it glitches into existence whenever it is scrolled into view:
 * torn into slices, thrown sideways, flashing, with noise bars and an orange/white ghost edge —
 * the same language as the hero laptop. It re-arms once the section has fully left the screen,
 * so it plays again on the way back.
 */
export function GlitchIn({ children }: { children: React.ReactNode }) {
  // Visibility is measured on this outer box, which never moves. The glitch itself is applied to
  // the inner box: if both were the same element, the animation's own jolts would shift what the
  // observers see, re-arm the effect mid-play, and keep it looping for as long as you scroll.
  const ref = useRef<HTMLDivElement>(null);
  // Any part on screen (used to re-arm) vs. far enough in to be worth playing. The small inset
  // matters: a section sitting exactly below the fold touches the viewport edge, which would
  // otherwise count as "on screen" and stop it from ever re-arming.
  const visible = useInView(ref, { margin: "-8px 0px -8px 0px" });
  const entered = useInView(ref, { margin: "0px 0px -22% 0px" });
  // idle: server render / no JS / reduced motion, content stays put.
  // armed: hidden, waiting to be scrolled to. playing: glitching in. done: fully shown.
  const [phase, setPhase] = useState<"idle" | "armed" | "playing" | "done">("idle");

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPhase("armed");
  }, []);

  useEffect(() => {
    setPhase((current) => {
      if (current === "armed" && entered) return "playing";
      // Only a settled section can re-arm; one that is mid-glitch always runs to the end
      if (current === "done" && !visible) return "armed";
      return current;
    });
  }, [visible, entered]);

  // Once started, the glitch always finishes on its own clock, however the page is being scrolled
  useEffect(() => {
    if (phase !== "playing") return;
    const timeout = setTimeout(() => setPhase("done"), MAX_PLAY_MS);
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div ref={ref}>
      <div
        className={phase === "armed" ? "opacity-0" : phase === "playing" ? "section-glitch-in" : undefined}
        onAnimationEnd={(e) => {
          // Ignore animations bubbling up from inside the section
          if (e.target === e.currentTarget) setPhase("done");
        }}
      >
        {children}
      </div>
    </div>
  );
}
