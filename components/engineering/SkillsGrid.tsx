"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILL_CATEGORIES } from "@/lib/data/skills";

export function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState("cloud");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const category = SKILL_CATEGORIES.find((c) => c.id === activeCategory) ?? SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="py-20 sm:py-28 md:py-32 relative" style={{ background: "#050D1A" }}>
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E14504] mb-3 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            A deep toolkit built from six years of production engineering.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === cat.id ? `${cat.color}18` : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeCategory === cat.id ? `${cat.color}50` : "rgba(255,255,255,0.07)"}`,
                color: activeCategory === cat.id ? cat.color : "rgba(255,255,255,0.5)",
                boxShadow: activeCategory === cat.id ? `0 0 20px ${cat.color}20` : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div
          key={activeCategory}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {category.skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              color={category.color}
              index={i}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  color,
  index,
  isInView,
}: {
  skill: { name: string; level: number; years?: number };
  color: string;
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative p-5 rounded-2xl cursor-pointer overflow-hidden group"
      style={{
        background: hovered ? `${color}08` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? `${color}30` : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 0 30px ${color}15` : "none",
        transition: "all 0.3s ease",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Name */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white font-medium text-sm">{skill.name}</span>
        <span className="text-xs font-mono" style={{ color }}>
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.06 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Years */}
      {skill.years && (
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          {skill.years}+ years
        </div>
      )}

      {/* Hover glow */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}08 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
