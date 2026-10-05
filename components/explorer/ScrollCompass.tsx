"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** A small compass pinned to the corner of wide screens; its needle swings as the page scrolls. */
export function ScrollCompass() {
  const { scrollYProgress } = useScroll();
  const turn = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1080]), { damping: 18, stiffness: 60 });
  const dial = useTransform(scrollYProgress, [0, 1], [0, -180]);
  // Stays out of the way of the hero and the footer, which have their own things in this corner
  const opacity = useTransform(scrollYProgress, [0.1, 0.14, 0.9, 0.94], [0, 1, 1, 0]);

  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 right-6 z-40 hidden h-20 w-20 lg:block"
      style={{ opacity }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="48" fill="#0B0F0C" fillOpacity="0.8" stroke="#ECEFE6" strokeOpacity="0.35" />
        {/* Dial with tick marks, turning slowly the other way */}
        <motion.g style={{ rotate: dial, transformOrigin: "50px 50px" }}>
          {Array.from({ length: 24 }, (_, i) => (
            <line
              key={i}
              x1="50"
              y1="7"
              x2="50"
              y2={i % 6 === 0 ? 16 : 11}
              stroke="#ECEFE6"
              strokeOpacity={i % 6 === 0 ? 0.9 : 0.4}
              strokeWidth="1.5"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
          <text x="50" y="29" textAnchor="middle" className="fill-lime text-[11px] font-black">
            N
          </text>
        </motion.g>
        {/* Needle */}
        <motion.g style={{ rotate: turn, transformOrigin: "50px 50px" }}>
          <path d="M50,20 L56,50 L44,50 Z" fill="#CBEA5C" />
          <path d="M50,80 L56,50 L44,50 Z" fill="#ECEFE6" fillOpacity="0.5" />
        </motion.g>
        <circle cx="50" cy="50" r="3.5" fill="#0B0F0C" stroke="#ECEFE6" />
      </svg>
    </motion.div>
  );
}
