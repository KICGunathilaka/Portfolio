"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { PROJECTS, Project } from "@/lib/data/projects";

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "devops", label: "DevOps" },
  { id: "ai", label: "AI & ML" },
  { id: "automation", label: "Automation" },
];

export function ProjectsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 sm:py-28 md:py-32" style={{ background: "#050D1A" }}>
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E14504] mb-3 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects
          </h2>
          <p className="text-white/40 text-lg max-w-xl">
            Real systems built for real scale.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: activeFilter === cat.id ? "rgba(225,69,4,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeFilter === cat.id ? "rgba(225,69,4,0.4)" : "rgba(255,255,255,0.07)"}`,
                color: activeFilter === cat.id ? "#E14504" : "rgba(255,255,255,0.5)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: hovered ? "1px solid rgba(225,69,4,0.3)" : "1px solid rgba(255,255,255,0.06)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(225,69,4,0.08)" : "0 8px 32px rgba(0,0,0,0.3)",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A] via-[#050D1A]/40 to-transparent" />

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "rgba(225,69,4,0.85)",
              backdropFilter: "blur(8px)",
              color: "white",
            }}
          >
            Featured
          </div>
        )}

        {/* Category badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium capitalize"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
        <p className="text-sky-400/70 text-xs mb-3">{project.subtitle}</p>
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className="mb-4 space-y-1">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m} className="flex items-center gap-2">
                <span className="text-green-400 text-xs">✓</span>
                <span className="text-white/40 text-xs">{m}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-md text-xs"
              style={{
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.15)",
                color: "rgba(56,189,248,0.8)",
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 rounded-md text-xs text-white/30">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <Github size={14} />
              Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
          <span className="ml-auto flex items-center gap-1 text-xs text-sky-400/60 group-hover:text-sky-400 transition-colors">
            Case Study
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
