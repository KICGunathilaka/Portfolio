"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

const DIR = "/images/explorer/";

// Four things the photographs keep coming back to. `iris` is where each scene opens from.
const CHAPTERS = [
  {
    word: "Waterfalls",
    line: "The reward at the end of most trails.",
    // An upright photograph for upright screens, a wide one for wide screens
    src: `${DIR}486480782_590334667384950_7960085291165407875_n.jpg`,
    wideSrc: `${DIR}486611432_591130220638728_526179435091926367_n.jpg`,
    alt: "A waterfall in the hills, with a hiker in the foreground",
    position: "object-[50%_62%] lg:object-[50%_40%]",
    iris: "50% 50%",
  },
  {
    word: "Ridges",
    line: "Grass, wind and a long way down.",
    src: `${DIR}671227272_17872996098598039_3283153268389051503_n.webp`,
    alt: "Green ridgelines running into the distance under a blue sky",
    position: "object-[50%_55%]",
    iris: "72% 42%",
  },
  {
    word: "Camps",
    line: "A tent, a flat patch, and whatever weather turns up.",
    src: `${DIR}486553809_590959253989158_1003449634325424260_n.jpg`,
    alt: "Pitching a green tent on a ridge with mountains behind",
    position: "object-[50%_30%]",
    iris: "30% 58%",
  },
  {
    word: "Mist",
    line: "Half the highlands, half the time.",
    src: `${DIR}486619089_591857770565973_7252829527118412493_n.jpg`,
    alt: "A small figure standing on a cliff edge, surrounded by mist",
    position: "object-[55%_50%]",
    iris: "62% 55%",
  },
];

const COUNT = CHAPTERS.length;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One full-screen scene: a photograph running edge to edge above a dark title bar. Scenes are
 * stacked; each later one opens over the previous through a growing circle (an iris) as the page scrolls.
 */
function Scene({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const chapter = CHAPTERS[index];
  const opensAt = (index - 0.55) / COUNT;
  const openBy = index / COUNT;

  const clipPath = useTransform(
    progress,
    [opensAt, openBy],
    [`circle(0% at ${chapter.iris})`, `circle(150% at ${chapter.iris})`]
  );
  // Each photograph eases back slightly while it is on screen
  const scale = useTransform(progress, [opensAt, (index + 1) / COUNT], [1.16, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col overflow-hidden bg-forest"
      style={{ zIndex: index, clipPath: index === 0 ? undefined : clipPath }}
    >
      {/* The photograph, edge to edge */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image
            src={chapter.src}
            alt={chapter.alt}
            fill
            sizes="100vw"
            className={`object-cover ${chapter.position} ${"wideSrc" in chapter ? "lg:hidden" : ""}`}
          />
          {"wideSrc" in chapter && (
            <Image
              src={chapter.wideSrc as string}
              alt={chapter.alt}
              fill
              sizes="100vw"
              className={`hidden object-cover lg:block ${chapter.position}`}
            />
          )}
        </motion.div>
      </div>

      {/* Title bar under the picture, like the lower band of a widescreen frame */}
      <div className="flex shrink-0 flex-col gap-3 px-5 pb-7 pt-5 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:pb-8 lg:pt-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/60">
            <span className="text-lime">{pad(index + 1)}</span> / {pad(COUNT)}
          </p>
          <h3 className="mt-2 text-[17vw] font-black uppercase leading-[0.8] tracking-[-0.01em] text-bone [font-stretch:62%] lg:text-[min(11vw,11rem)]">
            {chapter.word}
          </h3>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-bone/70 lg:pb-2 lg:text-right lg:text-base">{chapter.line}</p>
      </div>
    </motion.div>
  );
}

export function TrailChapters() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  return (
    <section id="hiking" className="bg-forest text-bone">
      {/* A breath of dark between the hero and the scenes */}
      <div className="mx-auto flex min-h-[70vh] max-w-[1500px] flex-col justify-center gap-8 px-5 py-24 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            On the trail
          </p>
          <h2 className="mt-6 text-[15vw] font-black uppercase leading-[0.82] tracking-[-0.01em] [font-stretch:62%] lg:text-[min(10vw,10.5rem)]">
            What I go
            <br />
            <span className="text-lime">looking for.</span>
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-bone/70 lg:pb-3">
          Four things turn up again and again in these photographs. Keep scrolling and each one opens over
          the last.
        </p>
      </div>

      {/* The scenes: pinned to the screen while the page scrolls through them */}
      <div ref={trackRef} className="relative" style={{ height: `${COUNT * 110}vh` }}>
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {CHAPTERS.map((chapter, i) => (
            <Scene key={chapter.word} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
