"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface ScrollMarqueeProps {
  words: string[];
  /** 1 drifts left, -1 drifts right */
  direction?: 1 | -1;
  /** Percent of one copy's width travelled per second when the page is still */
  speed?: number;
}

/**
 * A band of huge outlined words that drifts on its own and speeds up (or reverses) with the
 * visitor's scrolling. Every other word is filled lime.
 */
export function ScrollMarquee({ words, direction = 1, speed = 2.2 }: ScrollMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const heading = useRef<number>(direction);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    const push = boost.get();
    // Scrolling the other way turns the band around
    if (push < 0) heading.current = -direction;
    else if (push > 0) heading.current = direction;
    const step = heading.current * speed * (delta / 1000) * (1 + Math.abs(push));
    baseX.set(baseX.get() - step);
  });

  // Four copies sit side by side; sliding by one copy's width (25%) loops seamlessly
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="overflow-hidden border-y border-bone/10 bg-forest py-5 sm:py-7" aria-hidden>
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {words.map((word, i) => (
              <span key={word} className="flex items-center">
                <span
                  className={`px-5 text-[13vw] font-black uppercase leading-none [font-stretch:62%] lg:text-[7.5vw] ${
                    i % 2 === 0 ? "text-transparent [-webkit-text-stroke:1.5px_#ECEFE6]" : "text-lime"
                  }`}
                >
                  {word}
                </span>
                <span className="h-3 w-3 shrink-0 rounded-full bg-lime sm:h-4 sm:w-4" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
