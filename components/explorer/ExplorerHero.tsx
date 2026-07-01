"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, MapPin, Camera, Mountain } from "lucide-react";

// ── Photo strips ─────────────────────────────────────────────────────────────
// Three columns, each scrolling at a different speed and direction.
// Photos are doubled inside each strip so the loop is seamless.

const STRIP_A = [
  { src: "/images/explorer/671227272_17872996098598039_3283153268389051503_n.webp", alt: "Summit panorama" },
  { src: "/images/explorer/486553809_590959253989158_1003449634325424260_n.jpg",    alt: "Ridge camp" },
  { src: "/images/explorer/486480782_590334667384950_7960085291165407875_n.jpg",    alt: "Canyon waterfall" },
  { src: "/images/explorer/571037945_766686076416474_2251018351582989707_n.jpg",    alt: "Jungle path" },
  { src: "/images/explorer/487491069_594655966952820_2266355550664252025_n.jpg",    alt: "Horton Plains" },
];

const STRIP_B = [
  { src: "/images/explorer/703720695_940892928995787_7548368580049026280_n.jpg",    alt: "Mountain summit" },
  { src: "/images/explorer/486576493_591631987255218_8361187685238473632_n.jpg",    alt: "Tall waterfall" },
  { src: "/images/explorer/570875438_766683776416704_2065194432800988606_n.jpg",    alt: "Mossy steps" },
  { src: "/images/explorer/486611432_591130220638728_526179435091926367_n.jpg",     alt: "Tall grass hiking" },
  { src: "/images/explorer/PXL_20260509_084457403_(1).jpg",                         alt: "Misty stream" },
];

const STRIP_C = [
  { src: "/images/explorer/691304310_17877711891598039_2618341167109967770_n.webp", alt: "Forest river" },
  { src: "/images/explorer/486542653_591631947255222_8781936745614695504_n.jpg",    alt: "River crossing" },
  { src: "/images/explorer/486413810_591631997255217_623691734168320186_n.jpg",     alt: "Cliff face" },
  { src: "/images/explorer/486634577_591130217305395_6209662910116439150_n.jpg",    alt: "Waterfall forest" },
  { src: "/images/explorer/486102177_590334697384947_1681605172734809889_n.jpg",    alt: "Green meadow" },
];

interface StripProps {
  photos: { src: string; alt: string }[];
  duration: number;
  reverse?: boolean;
}

function PhotoStrip({ photos, duration, reverse = false }: StripProps) {
  // Duplicate so the loop is invisible
  const doubled = [...photos, ...photos];

  return (
    <div className="overflow-hidden h-full">
      <motion.div
        className="flex flex-col gap-3"
        animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((photo, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-2xl overflow-hidden"
            style={{ height: 260 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export function ExplorerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#080504" }}
    >
      {/* ── Three scrolling photo strips ─────────────────────────────── */}
      <div className="absolute inset-0 grid grid-cols-3 gap-3 p-3">
        <PhotoStrip photos={STRIP_A} duration={28} />
        <PhotoStrip photos={STRIP_B} duration={22} reverse />
        <PhotoStrip photos={STRIP_C} duration={32} />
      </div>

      {/* ── Overlays ─────────────────────────────────────────────────── */}
      {/* Base dark tint */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(8,5,4,0.68)" }}
      />
      {/* Edge vignette — darkens the perimeter, spotlight in center */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, rgba(8,5,4,0.55) 100%)",
        }}
      />
      {/* Warm amber glow rising from bottom */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(160,60,0,0.28) 0%, transparent 65%)",
        }}
      />

      {/* ── Text content ─────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl"
        style={{ y: textY, opacity: fadeOut }}
      >
        {/* Location badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "rgba(160,70,0,0.28)",
            border: "1px solid rgba(251,146,60,0.38)",
            backdropFilter: "blur(14px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Mountain size={13} className="text-orange-400" />
          <span className="text-orange-300/90 text-xs font-medium tracking-wide">
            Sri Lanka · Highlands & Beyond
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{ color: "#F5EDD8", textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Life begins
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #FB923C 0%, #F59E0B 55%, #FBBF24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            where the road ends.
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          className="text-orange-100/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Mountains, hidden waterfalls, deep jungle, and wild ridge camps —
          chasing that feeling only the trail can give.
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          {[
            { icon: MapPin,   value: "20+",  label: "Countries" },
            { icon: Mountain, value: "100+", label: "Summits"   },
            { icon: Camera,   value: "50K+", label: "Photos"    },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon size={16} className="text-orange-400/60 mx-auto mb-2" />
              <div
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #FB923C, #F59E0B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {value}
              </div>
              <div className="text-orange-200/40 text-xs mt-0.5 tracking-wide">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <a
            href="#hiking"
            className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(190,75,0,0.88), rgba(225,105,0,0.72))",
              border: "1px solid rgba(251,146,60,0.45)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 8px 32px rgba(160,60,0,0.4), 0 0 0 1px rgba(251,146,60,0.12)",
            }}
          >
            Explore Adventures
            <ArrowDown
              size={15}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <span className="text-orange-200/20 text-[10px] tracking-[0.25em] uppercase font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-orange-400/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
