"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const RIDGE =
  "M0,222 L90,192 L170,206 L260,142 L330,172 L420,82 L500,152 L560,122 L660,42 L760,132 L830,102 L930,172 L1010,112 L1100,62 L1190,152 L1270,122 L1350,182 L1440,152";

/**
 * A mountain skyline that draws itself as the page scrolls past, with a dot walking the ridge
 * at the tip of the line.
 */
export function RidgeLine() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "end 35%"] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // A sun climbing from behind the range as the line is drawn
  const sunY = useTransform(drawn, [0, 1], [250, 62]);

  const cx = useMotionValue(0);
  const cy = useMotionValue(222);
  const place = (progress: number) => {
    const path = pathRef.current;
    if (!path) return;
    const point = path.getPointAtLength(progress * path.getTotalLength());
    cx.set(point.x);
    cy.set(point.y);
  };
  useMotionValueEvent(drawn, "change", place);
  useEffect(() => place(drawn.get()));

  return (
    <div ref={ref} className="px-0" aria-hidden>
      <svg viewBox="0 0 1440 260" className="w-full" fill="none">
        <motion.circle cx="1090" r="52" stroke="#CBEA5C" strokeWidth="2" style={{ cy: sunY }} />
        <motion.circle
          cx="1090"
          r="78"
          stroke="#CBEA5C"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="3 9"
          style={{ cy: sunY }}
        />
        {/* Ground below the skyline, so the sun rises from behind it */}
        <path d={`${RIDGE} L1440,260 L0,260 Z`} fill="#0B0F0C" />
        {/* The whole ridge, faint */}
        <path ref={pathRef} d={RIDGE} stroke="#ECEFE6" strokeOpacity="0.14" strokeWidth="2" strokeLinejoin="round" />
        {/* The part already walked */}
        <motion.path
          d={RIDGE}
          stroke="#CBEA5C"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ pathLength: drawn }}
        />
        {/* The walker */}
        <motion.circle r="16" fill="#CBEA5C" fillOpacity="0.2" style={{ cx, cy }} />
        <motion.circle r="7" fill="#CBEA5C" style={{ cx, cy }} />
      </svg>
    </div>
  );
}
