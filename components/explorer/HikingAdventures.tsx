"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, TrendingUp, ArrowUpDown, X, Star } from "lucide-react";
import { ADVENTURES, Adventure } from "@/lib/data/adventures";

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#34D399",
  Moderate: "#F59E0B",
  Hard: "#FB923C",
  Expert: "#F472B6",
};

export function HikingAdventures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Adventure | null>(null);
  const [filter, setFilter] = useState<"all" | "hiking" | "camping" | "travel">("all");

  const filtered = filter === "all" ? ADVENTURES : ADVENTURES.filter((a) => a.type === filter);

  return (
    <section id="hiking" className="py-20 sm:py-28 md:py-32" style={{ background: "#0a0603" }}>
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400 mb-3 block">
            Adventures
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#F5EDD8" }}>
            Hiking & Trails
          </h2>
          <p className="text-orange-200/40 text-lg max-w-xl">
            Every summit tells a story. Every trail teaches a lesson.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {["all", "hiking", "camping", "travel"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className="px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200"
              style={{
                background: filter === f ? "rgba(251,146,60,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === f ? "rgba(251,146,60,0.4)" : "rgba(255,255,255,0.06)"}`,
                color: filter === f ? "#FB923C" : "rgba(245,237,216,0.4)",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((adventure, i) => (
            <AdventureCard
              key={adventure.id}
              adventure={adventure}
              index={i}
              isInView={isInView}
              onClick={() => setSelected(adventure)}
            />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
              style={{
                background: "#0f0804",
                border: "1px solid rgba(251,146,60,0.2)",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative h-56">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0804] to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
                >
                  <X size={18} />
                </button>
                <div
                  className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: DIFFICULTY_COLOR[selected.difficulty],
                    color: "white",
                  }}
                >
                  {selected.difficulty}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold" style={{ color: "#F5EDD8" }}>
                      {selected.title}
                    </h3>
                    <p className="text-orange-400 text-sm flex items-center gap-1 mt-1">
                      <MapPin size={13} />
                      {selected.location}, {selected.country}
                    </p>
                  </div>
                  <span className="text-orange-200/40 text-sm">{selected.date}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 my-6">
                  {[
                    { icon: ArrowUpDown, label: "Distance", value: selected.distance },
                    { icon: TrendingUp, label: "Elevation", value: selected.elevation },
                    { icon: Clock, label: "Duration", value: selected.duration },
                  ].map(({ icon: Icon, label, value }) => value && (
                    <div
                      key={label}
                      className="text-center p-3 rounded-xl"
                      style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.12)" }}
                    >
                      <Icon size={16} className="text-orange-400 mx-auto mb-1" />
                      <div className="text-orange-200/40 text-xs">{label}</div>
                      <div className="text-white font-semibold text-sm mt-0.5">{value}</div>
                    </div>
                  ))}
                </div>

                <p className="text-orange-200/50 text-sm leading-relaxed mb-6">
                  {selected.description}
                </p>

                <div>
                  <p className="text-orange-400/60 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Star size={12} />
                    Highlights
                  </p>
                  <ul className="space-y-2">
                    {selected.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-orange-400 text-sm mt-0.5">✦</span>
                        <span className="text-orange-200/60 text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function AdventureCard({
  adventure,
  index,
  isInView,
  onClick,
}: {
  adventure: Adventure;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: hovered ? "1px solid rgba(251,146,60,0.3)" : "1px solid rgba(255,255,255,0.05)",
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(180,70,0,0.1)" : "0 4px 20px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s ease",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={adventure.image}
          alt={adventure.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: DIFFICULTY_COLOR[adventure.difficulty] + "CC",
              color: "white",
              backdropFilter: "blur(8px)",
            }}
          >
            {adventure.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs capitalize"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              color: "rgba(245,237,216,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {adventure.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-base mb-1" style={{ color: "#F5EDD8" }}>
          {adventure.title}
        </h3>
        <p className="text-orange-400/60 text-xs flex items-center gap-1 mb-4">
          <MapPin size={11} />
          {adventure.location}, {adventure.country}
        </p>

        {/* Quick stats */}
        <div className="flex items-center gap-4 text-xs text-orange-200/40">
          {adventure.distance && (
            <span className="flex items-center gap-1">
              <ArrowUpDown size={11} />
              {adventure.distance}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {adventure.duration}
          </span>
          <span className="ml-auto text-orange-200/30">{adventure.date}</span>
        </div>
      </div>
    </motion.div>
  );
}
