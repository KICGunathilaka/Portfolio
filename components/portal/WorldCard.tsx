"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ScrambleText } from "@/components/shared/ScrambleText";

interface WorldCardProps {
  side: "engineering" | "explorer";
}

const WORLDS = {
  engineering: {
    index: "01",
    href: "/engineering",
    title: "Engineer",
    role: "Systems Engineer",
    description: "Building scalable software, cloud infrastructure, automation, and intelligent systems.",
    cta: "Enter engineering",
    image: "/images/profile.jpg",
    imagePosition: "object-[50%_0%]",
  },
  explorer: {
    index: "02",
    href: "/explorer",
    title: "Explorer",
    role: "The Explorer",
    description: "Exploring mountains, forests, hidden trails, and unforgettable journeys.",
    cta: "Begin adventure",
    image: "/images/explorer/703720695_940892928995787_7548368580049026280_n.jpg",
    imagePosition: "object-[50%_100%] md:object-[50%_66%]",
  },
} as const;

export function WorldCard({ side }: WorldCardProps) {
  const world = WORLDS[side];
  const isEng = side === "engineering";
  // Bumped on hover/focus to replay the title decode
  const [replays, setReplays] = useState(0);

  return (
    <Link
      href={world.href}
      onMouseEnter={() => setReplays((n) => n + 1)}
      onFocus={() => setReplays((n) => n + 1)}
      className="group relative flex h-full flex-col justify-end overflow-hidden p-4 sm:p-8 lg:p-10 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
    >
      {/* Photo — wipes in from the bottom, greyscale at rest, colour on hover */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ delay: isEng ? 0.25 : 0.4, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Slow continuous drift; the two sides run half a cycle apart */}
        <div className="absolute inset-0 motion-safe:animate-drift" style={{ animationDelay: isEng ? "0s" : "-13s" }}>
          <Image
            src={world.image}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover grayscale brightness-75 transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:brightness-90 ${world.imagePosition}`}
          />
        </div>
      </motion.div>

      {/* Scrims so the text stays readable over the photo */}
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#0A0A0A]/80 to-transparent" />
      {/* Side-by-side layout: fade toward the seam so the two photos don't butt against each other */}
      <div
        className={`absolute inset-y-0 hidden w-28 from-[#0A0A0A] to-transparent md:block ${
          isEng ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

      {/* Title block */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isEng ? 0.6 : 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-neutral-400">
          <span className="text-neutral-500">{world.index}</span>
          {world.role}
          <span className="ml-auto h-2 w-2 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
        </p>

        <h2
          className="mt-2 sm:mt-3 font-display font-black uppercase leading-[0.9] text-white text-[10.5vw] md:text-[min(6.2vw,6rem)]"
        >
          <ScrambleText
            text={world.title}
            delay={isEng ? 1000 : 1150}
            duration={replays === 0 ? 700 : 400}
            replayKey={replays}
          />
        </h2>

        <p className="mt-5 hidden max-w-sm font-mono text-xs leading-relaxed text-neutral-400 md:block">
          {world.description}
        </p>

        <div className="mt-3 sm:mt-8 flex items-center justify-between border-t border-neutral-700 pt-3 sm:pt-4 font-mono text-xs sm:text-sm text-neutral-200 transition-colors duration-300 group-hover:border-neutral-400">
          <span>{world.cta}</span>
          <ArrowUpRight
            className="h-4 w-4 sm:h-5 sm:w-5 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            strokeWidth={1.5}
          />
        </div>
      </motion.div>
    </Link>
  );
}
