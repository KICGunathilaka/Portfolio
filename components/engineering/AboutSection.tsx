"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { Code2, Cloud, Bot, Layers } from "lucide-react";

const MILESTONES = [
  {
    year: "2018",
    title: "Started as SysAdmin",
    description:
      "Began managing Windows Server environments and Cisco networking — the foundation of everything.",
  },
  {
    year: "2020",
    title: "Pivoted to DevOps",
    description:
      "Discovered the power of automation, containers, and CI/CD. Built first Kubernetes cluster from scratch.",
  },
  {
    year: "2022",
    title: "Cloud Architecture Lead",
    description:
      "Took ownership of enterprise Azure infrastructure, scaling platforms to serve hundreds of microservices.",
  },
  {
    year: "2023",
    title: "AI Integration",
    description:
      "Dove into LLMs, RAG systems, and intelligent automation — bridging infrastructure with AI.",
  },
  {
    year: "2024+",
    title: "Senior Engineer",
    description:
      "Leading teams, mentoring engineers, and architecting next-generation cloud-native systems.",
  },
];

const PHILOSOPHY = [
  {
    icon: Code2,
    title: "Automate Everything",
    text: "If you've done it twice manually, it needs a script. If it needs a script, it needs a pipeline.",
    color: "#38BDF8",
  },
  {
    icon: Cloud,
    title: "Infrastructure as Code",
    text: "Every resource should be version-controlled, reviewable, and reproducible. No snowflake servers.",
    color: "#E14504",
  },
  {
    icon: Bot,
    title: "AI-Augmented Engineering",
    text: "The best engineers leverage AI as a multiplier — not a replacement for understanding the fundamentals.",
    color: "#A78BFA",
  },
  {
    icon: Layers,
    title: "Observability First",
    text: "You can't improve what you can't measure. Build systems that explain themselves when things go wrong.",
    color: "#34D399",
  },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 sm:py-28 md:py-32 relative" style={{ background: "#020812" }}>
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(56,189,248,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E14504] mb-3 block">
            Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-white/40 text-lg max-w-2xl leading-relaxed">
            Six years building systems that scale, automate, and self-heal. Started with servers and scripts,
            now architecting cloud platforms that power hundreds of services.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { value: 6, suffix: "+", label: "Years Experience" },
            { value: 50, suffix: "+", label: "Projects Shipped" },
            { value: 6, suffix: "", label: "Certifications" },
            { value: 99.97, suffix: "%", label: "Uptime SLA Achieved" },
          ].map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              className="p-6 rounded-2xl text-center"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              whileHover={{
                borderColor: "rgba(225,69,4,0.25)",
                background: "rgba(225,69,4,0.03)",
              }}
            >
              <div
                className="text-4xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #38BDF8, #818CF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {isInView && (
                  <CountUp end={value} duration={2} decimals={value % 1 !== 0 ? 2 : 0} delay={0.3 + i * 0.1} />
                )}
                {suffix}
              </div>
              <p className="text-white/40 text-sm">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Timeline */}
          <div>
            <motion.h3
              className="text-2xl font-bold text-white mb-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Journey
            </motion.h3>
            <div className="relative">
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, #E14504, rgba(225,69,4,0.1))" }}
              />
              <div className="space-y-8 pl-8">
                {MILESTONES.map((m, i) => (
                  <motion.div
                    key={m.year}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  >
                    {/* Dot */}
                    <div
                      className="absolute -left-[2.1rem] top-1.5 w-3 h-3 rounded-full border-2"
                      style={{
                        borderColor: i === MILESTONES.length - 1 ? "#E14504" : "rgba(255,255,255,0.2)",
                        background: i === MILESTONES.length - 1 ? "#E14504" : "#020812",
                        boxShadow: i === MILESTONES.length - 1 ? "0 0 10px rgba(225,69,4,0.6)" : "none",
                      }}
                    />
                    <span className="text-[#E14504] text-xs font-mono font-bold">{m.year}</span>
                    <h4 className="text-white font-semibold mt-1 mb-1">{m.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{m.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div>
            <motion.h3
              className="text-2xl font-bold text-white mb-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Engineering Philosophy
            </motion.h3>
            <div className="space-y-5">
              {PHILOSOPHY.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="flex items-start gap-5 p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  whileHover={{
                    borderColor: `${p.color}30`,
                    background: `${p.color}05`,
                    x: 4,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${p.color}12`, border: `1px solid ${p.color}25` }}
                  >
                    <p.icon size={22} style={{ color: p.color }} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{p.title}</h4>
                    <p className="text-white/45 text-sm leading-relaxed">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
