"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, Mail } from "lucide-react";
import { NetworkBackground } from "./NetworkBackground";

export function EngineeringHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#020812" }}
    >
      {/* Network graph — visible on dark left side */}
      <NetworkBackground />

      {/* ── Full-bleed editorial photo (tablet/desktop only) ──────────── */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0" style={{ width: "58%" }}>
        <Image
          src="/images/profile.jpg"
          alt="Profile"
          fill
          priority
          className="object-cover object-top"
          sizes="58vw"
        />

        {/* Left-edge blend: dark → transparent so photo merges into text side */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #020812 0%, rgba(2,8,18,0.94) 12%, rgba(2,8,18,0.55) 32%, rgba(2,8,18,0.12) 55%, rgba(2,8,18,0) 72%)",
          }}
        />

        {/* Top vignette for nav breathing room */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,8,18,0.65) 0%, transparent 14%, transparent 78%, rgba(2,8,18,0.85) 100%)",
          }}
        />
      </div>

      {/* ── Left text content ───────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 sm:py-24 pt-28 sm:pt-32">
        <div className="max-w-xl">

          {/* Mobile-only portrait photo */}
          <motion.div
            className="md:hidden relative w-32 h-40 rounded-2xl overflow-hidden mb-6"
            style={{
              border: "1px solid rgba(56,189,248,0.25)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 30px rgba(56,189,248,0.12)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              fill
              priority
              className="object-cover object-top"
              sizes="128px"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 55%, rgba(2,8,18,0.5) 100%)" }}
            />
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.22)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium tracking-wide">
              Open to Opportunities
            </span>
          </motion.div>

          {/* Name / title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/40 text-sm mb-3 font-mono tracking-wider uppercase">
              Hello, I&apos;m
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.05]"
              style={{ textShadow: "0 0 60px rgba(56,189,248,0.1)" }}
            >
              Systems
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #E14504 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Engineer
              </span>
            </h1>
          </motion.div>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="text-white/25 font-mono text-sm">›</span>
            {mounted && (
              <TypeAnimation
                sequence={[
                  "Systems Engineer",   2000,
                  "DevOps Engineer",    2000,
                  "Cloud Architect",    2000,
                  "AI Enthusiast",      2000,
                  "Automation Engineer",2000,
                  "Problem Solver",     2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-sky-400 font-mono text-lg font-medium"
              />
            )}
            <span className="w-0.5 h-5 bg-sky-400/80 animate-pulse" />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-white/45 text-base md:text-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Building enterprise cloud infrastructure, DevOps pipelines, and
            intelligent AI solutions. Passionate about making complex systems
            reliable, observable, and fast.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap items-center gap-6 sm:gap-10 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              { value: "6+",     label: "Years" },
              { value: "50+",    label: "Projects" },
              { value: "99.97%", label: "Uptime SLA" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-bold tabular-nums"
                  style={{
                    background: "linear-gradient(135deg, #38BDF8, #818CF8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-white/35 text-xs mt-0.5 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "linear-gradient(135deg, #E14504, #c43a00)",
                boxShadow: "0 4px 24px rgba(225,69,4,0.35)",
              }}
            >
              View Projects
              <ArrowDown
                size={14}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white/60 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <Mail size={14} />
              Contact
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-white/60 hover:text-white transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <Download size={14} />
              Resume
            </a>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </section>
  );
}
