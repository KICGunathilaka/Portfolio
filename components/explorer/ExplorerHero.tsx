"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PhotoWall } from "./PhotoWall";
import { RiseText } from "./RiseText";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A wall of moving photographs fills the screen, but at first it is only visible through the
 * letters of the headline; scrolling grows the letters until one of them swallows the screen and
 * the whole wall is revealed.
 *
 * How: the wall fills the screen, and a dark layer with white letters sits over it in "multiply"
 * blend mode. Multiplying by white leaves the photos untouched; multiplying by the dark colour hides them.
 */
export function ExplorerHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pivotRef = useRef<HTMLSpanElement>(null);

  // Zoom toward the solid stroke of the "I", so the screen fills with letter rather than background
  const [origin, setOrigin] = useState("50% 30%");
  useEffect(() => {
    const measure = () => {
      const pivot = pivotRef.current;
      if (!pivot) return;
      setOrigin(`${pivot.offsetLeft + pivot.offsetWidth / 2}px ${pivot.offsetTop + pivot.offsetHeight / 2}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const lettersScale = useTransform(scrollYProgress, [0, 0.82], [1, 80], { ease: (t) => t * t * t });
  const veilOpacity = useTransform(scrollYProgress, [0.74, 0.86], [1, 0]);
  const wordsOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.86, 0.97], [0, 1]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section id="hero" ref={sectionRef} className="relative h-[240vh] bg-forest text-bone">
      <div className="sticky top-0 isolate h-[100dvh] overflow-hidden bg-forest">
        {/* The photographs, unedited: stacks drifting up and down behind everything */}
        <motion.div className="absolute inset-0" style={{ scale: photoScale }}>
          <PhotoWall className="h-full w-full" />
        </motion.div>

        {/* The veil: dark everywhere except the letters, which act as windows onto the photograph */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-forest mix-blend-multiply"
          style={{ opacity: veilOpacity }}
        >
          <motion.h1
            ref={titleRef}
            className="relative text-center text-[min(35vw,39vh)] font-black uppercase leading-[0.8] tracking-[-0.01em] text-white will-change-transform [font-stretch:62%]"
            style={{ scale: lettersScale, transformOrigin: origin }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 1.4, ease: EASE }}
          >
            <span className="block">
              Sr<span ref={pivotRef}>i</span>
            </span>
            <span className="block">Lanka</span>
          </motion.h1>
        </motion.div>

        {/* Words around the headline; they clear away as the zoom begins */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-5 pb-8 pt-24 sm:px-10 sm:pb-10"
          style={{ opacity: wordsOpacity }}
        >
          <motion.p
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            Explorer
            <span className="font-normal text-bone/50">Hiking &amp; camping</span>
          </motion.p>

          <motion.div
            className="flex items-end justify-between gap-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
          >
            <div>
              <p className="text-[9vw] font-black uppercase leading-[0.85] text-lime [font-stretch:62%] sm:text-6xl">
                <RiseText text="On foot." delay={0.9} />
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/70 sm:text-base">
                The other half of the week: trails, ridges and waterfalls in the highlands, with a tent on my
                back.
              </p>
            </div>
            <p className="flex shrink-0 flex-col items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-bone/60">
              Scroll
              <span className="relative block h-12 w-px bg-bone/30">
                <span className="absolute -left-px top-0 h-3 w-[3px] bg-lime motion-safe:animate-hint" />
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Once the photograph is fully open */}
        <motion.p
          className="absolute bottom-6 left-5 z-10 bg-forest px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] sm:bottom-10 sm:left-10"
          style={{ opacity: captionOpacity }}
        >
          <span className="text-lime">76</span> <span className="text-bone/80">frames from the trail</span>
        </motion.p>
      </div>
    </section>
  );
}
