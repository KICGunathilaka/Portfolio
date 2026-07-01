"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronDown } from "lucide-react";
import { EXPERIENCE, CERTIFICATIONS } from "@/lib/data/experience";

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 sm:py-28 md:py-32 relative" style={{ background: "#020812" }}>
      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E14504] mb-3 block">
            Career
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #E14504, rgba(225,69,4,0.1), transparent)" }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          />

          <div className="space-y-8 ml-12">
            {EXPERIENCE.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8">Certifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
                whileHover={{
                  y: -3,
                  borderColor: cert.color + "50",
                  boxShadow: `0 0 20px ${cert.color}15`,
                }}
              >
                <div className="text-3xl mb-3">{cert.badge}</div>
                <div className="text-white font-semibold text-sm mb-1">{cert.name}</div>
                <div className="text-white/40 text-xs mb-1">{cert.level}</div>
                <div className="text-white/30 text-xs">{cert.issuer} · {cert.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
  isInView,
}: {
  exp: typeof EXPERIENCE[0];
  index: number;
  isInView: boolean;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-[3.05rem] top-5 w-4 h-4 rounded-full border-2 z-10"
        style={{
          borderColor: exp.current ? "#E14504" : "rgba(255,255,255,0.2)",
          background: exp.current ? "#E14504" : "#020812",
          boxShadow: exp.current ? "0 0 15px rgba(225,69,4,0.5)" : "none",
        }}
      />

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${exp.current ? "rgba(225,69,4,0.2)" : "rgba(255,255,255,0.05)"}`,
        }}
      >
        {/* Header */}
        <button
          className="w-full p-6 text-left flex items-start justify-between gap-4"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              {exp.current && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: "rgba(225,69,4,0.15)", color: "#E14504", border: "1px solid rgba(225,69,4,0.3)" }}
                >
                  Current
                </span>
              )}
              <span className="text-white/40 text-xs flex items-center gap-1">
                <Calendar size={12} />
                {exp.period}
              </span>
              <span className="text-white/40 text-xs flex items-center gap-1">
                <MapPin size={12} />
                {exp.location}
              </span>
            </div>
            <h3 className="text-white font-bold text-lg">{exp.role}</h3>
            <p className="text-sky-400/70 text-sm flex items-center gap-1.5 mt-1">
              <Briefcase size={13} />
              {exp.company}
            </p>
          </div>
          <ChevronDown
            size={18}
            className="text-white/40 shrink-0 mt-1 transition-transform duration-300"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)" }}
          />
        </button>

        {/* Body */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0">
                <div
                  className="h-px mb-5"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <p className="text-white/50 text-sm leading-relaxed mb-5">
                  {exp.description}
                </p>
                <ul className="space-y-3 mb-5">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ background: "#E14504" }}
                      />
                      <span className="text-white/60 text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs"
                      style={{
                        background: "rgba(56,189,248,0.08)",
                        border: "1px solid rgba(56,189,248,0.15)",
                        color: "rgba(56,189,248,0.7)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
