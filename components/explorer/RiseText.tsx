"use client";

import { motion } from "framer-motion";

interface RiseTextProps {
  text: string;
  className?: string;
  /** Seconds before the first letter moves */
  delay?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const LETTER = {
  down: { y: "115%", rotate: 8 },
  up: (wait: number) => ({ y: "0%", rotate: 0, transition: { delay: wait, duration: 0.7, ease: EASE } }),
};

/**
 * Headline text whose letters climb up from behind their baseline one after another, every time
 * the line scrolls into view.
 *
 * The in-view check lives on the outer wrapper: the letters themselves start clipped out of sight,
 * so they could never report being visible.
 */
export function RiseText({ text, className, delay = 0 }: RiseTextProps) {
  let letter = 0;
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="down"
      whileInView="up"
      viewport={{ amount: 0.5 }}
    >
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden>
          {/* Padding gives the clipped letters headroom; the negative margin takes it back */}
          <span className="-mt-[0.1em] inline-block overflow-hidden whitespace-nowrap pt-[0.1em] align-bottom">
            {Array.from(word).map((char, c) => (
              <motion.span key={c} className="inline-block" variants={LETTER} custom={delay + letter++ * 0.035}>
                {char}
              </motion.span>
            ))}
          </span>{" "}
        </span>
      ))}
    </motion.span>
  );
}
