"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { EXPLORER_PHOTOS } from "@/lib/data/explorerPhotos";

const DIR = "/images/explorer/";

// Photographs cut into shapes, scattered down the section. `speed` is how far each one travels
// against the scroll (in vh): different speeds give the depth.
const SHAPES = [
  {
    file: "486695966_591128960638854_2467638316001813296_n.jpg",
    box: "left-[4%] top-[2%] w-[38vw] lg:w-[21vw]",
    ratio: "aspect-square",
    shape: "rounded-full",
    speed: -34,
  },
  {
    file: "486332390_591129103972173_1047931479366709534_n.jpg",
    box: "right-[5%] top-[7%] w-[36vw] lg:w-[18vw]",
    ratio: "aspect-[3/5]",
    shape: "rounded-t-full",
    speed: -12,
  },
  {
    file: "487492968_593720577046359_4572052592759202345_n.jpg",
    box: "left-[30%] top-[24%] w-[30vw] lg:left-[38%] lg:w-[15vw]",
    ratio: "aspect-square",
    shape: "[clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]",
    speed: -52,
  },
  {
    file: "703811982_940892782329135_6027131970418897955_n.jpg",
    box: "left-[6%] top-[44%] w-[34vw] lg:left-[12%] lg:w-[17vw]",
    ratio: "aspect-[3/5]",
    shape: "rounded-full",
    speed: -20,
  },
  {
    file: "703665774_940897148995365_2525273680976652082_n.jpg",
    box: "right-[4%] top-[40%] w-[44vw] lg:right-[9%] lg:w-[26vw]",
    ratio: "aspect-[5/3]",
    shape: "rounded-full",
    speed: -44,
  },
  {
    file: "486407707_591139147304502_8001835149558163448_n.jpg",
    box: "left-[28%] top-[66%] w-[40vw] lg:left-[40%] lg:w-[22vw]",
    ratio: "aspect-square",
    shape: "[clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]",
    speed: -28,
  },
  {
    file: "571224062_766679703083778_4989177501429992537_n.jpg",
    box: "right-[6%] top-[74%] w-[32vw] lg:right-[14%] lg:w-[16vw]",
    ratio: "aspect-[3/4]",
    shape: "rounded-b-full",
    speed: -58,
  },
  {
    file: "486576493_591631987255218_8361187685238473632_n.jpg",
    box: "left-[3%] top-[80%] w-[28vw] lg:left-[18%] lg:w-[14vw]",
    ratio: "aspect-square",
    shape: "rounded-full",
    speed: -10,
  },
];

function Shape({ item, progress }: { item: (typeof SHAPES)[number]; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [`${-item.speed}vh`, `${item.speed}vh`]);
  // The picture slides the other way inside its shape
  const innerY = useTransform(progress, [0, 1], ["-9%", "9%"]);
  return (
    <motion.div className={`absolute ${item.box}`} style={{ y }}>
      <div className={`relative ${item.ratio} overflow-hidden ${item.shape}`}>
        <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: innerY }}>
          <Image src={`${DIR}${item.file}`} alt="" fill sizes="(min-width: 1024px) 26vw, 44vw" className="object-cover" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Counts up from zero the first time it scrolls into view. */
function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      setValue(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {String(value).padStart(2, "0")}
    </span>
  );
}

// Only things that can be counted on this page
const FIGURES = [
  { value: EXPLORER_PHOTOS.length, label: "Frames kept" },
  { value: 4, label: "Scenes" },
  { value: 3, label: "Reels" },
  { value: 1, label: "Island" },
];

/**
 * Photographs cut into circles, arches, capsules and diamonds, drifting past at different speeds,
 * with the page's figures pinned in the middle and inverting whatever passes behind them.
 */
export function ShapeDrift() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="figures" ref={ref} className="relative h-[230vh] bg-forest text-bone lg:h-[260vh]">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {SHAPES.map((item) => (
          <Shape key={item.file} item={item} progress={scrollYProgress} />
        ))}
      </div>

      {/* Pinned figures; difference blending keeps them readable over any photograph */}
      <div className="pointer-events-none sticky top-0 z-10 flex h-[100dvh] flex-col items-center justify-center px-5 mix-blend-difference">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">In numbers</p>
        <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-8 text-center text-white lg:grid-cols-4 lg:gap-x-16">
          {FIGURES.map((figure) => (
            <div key={figure.label}>
              <dd className="text-[26vw] font-black leading-[0.8] tabular-nums [font-stretch:62%] lg:text-[min(13vw,14rem)]">
                <CountUp to={figure.value} />
              </dd>
              <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.14em]">{figure.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
