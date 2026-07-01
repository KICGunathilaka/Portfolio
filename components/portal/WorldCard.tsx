"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Server, Mountain } from "lucide-react";

interface WorldCardProps {
  side: "engineering" | "explorer";
}

const ENGINEERING_GRID = [
  "pipeline:", "docker", "k8s", "AWS", "CI/CD",
  "terraform", "nginx", "redis", "> deploy", "python",
  "git push", "kubectl", "grafana", "linux", "C#",
];

const EXPLORER_ICONS = ["⛰️", "🏕️", "🌄", "🌲", "🦅", "⛺", "🌌", "🏔️", "🌿", "🌅"];

export function WorldCard({ side }: WorldCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 30, stiffness: 300 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 30, stiffness: 300 });

  const isEng = side === "engineering";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    router.push(isEng ? "/engineering" : "/explorer");
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-1 h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={{ opacity: 0, x: isEng ? -60 : 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* World-specific background */}
      {isEng ? <EngineeringBackground isHovered={isHovered} /> : <ExplorerBackground isHovered={isHovered} />}

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered
            ? isEng
              ? "rgba(11,34,64,0.4)"
              : "rgba(20,12,5,0.3)"
            : "rgba(0,0,0,0.55)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Divider line */}
      {isEng && (
        <div className="absolute right-0 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }}
        />
      )}

      {/* Card content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-3 sm:px-6 md:px-8 max-w-md"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Icon */}
        <motion.div
          className="mb-4 sm:mb-8 p-2.5 sm:p-5 rounded-xl sm:rounded-2xl"
          style={{
            background: isEng
              ? "rgba(56,189,248,0.08)"
              : "rgba(251,146,60,0.08)",
            border: `1px solid ${isEng ? "rgba(56,189,248,0.2)" : "rgba(251,146,60,0.2)"}`,
            boxShadow: isHovered
              ? isEng
                ? "0 0 40px rgba(56,189,248,0.25), inset 0 0 20px rgba(56,189,248,0.05)"
                : "0 0 40px rgba(251,146,60,0.25), inset 0 0 20px rgba(251,146,60,0.05)"
              : "none",
          }}
          animate={{ scale: isHovered ? 1.1 : 1, translateZ: isHovered ? 20 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isEng
            ? <Server className="w-6 h-6 sm:w-10 sm:h-10 text-sky-400" />
            : <Mountain className="w-6 h-6 sm:w-10 sm:h-10 text-orange-400" />
          }
        </motion.div>

        {/* Label */}
        <motion.div
          className="text-[9px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-4"
          style={{ color: isEng ? "rgba(56,189,248,0.7)" : "rgba(251,146,60,0.7)" }}
          animate={{ translateZ: isHovered ? 15 : 0 }}
        >
          {isEng ? "World I" : "World II"}
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-6 leading-tight"
          animate={{ translateZ: isHovered ? 25 : 0 }}
        >
          {isEng ? "Systems\nEngineer" : "The\nExplorer"}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="hidden sm:block text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-xs"
          animate={{ translateZ: isHovered ? 10 : 0, opacity: isHovered ? 0.85 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {isEng
            ? "Building scalable software, cloud infrastructure, automation, and intelligent systems."
            : "Exploring mountains, forests, hidden trails, and unforgettable journeys."}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="group flex items-center gap-1.5 sm:gap-3 px-4 py-2.5 sm:px-8 sm:py-4 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300"
          style={{
            background: isEng
              ? "rgba(56,189,248,0.12)"
              : "rgba(251,146,60,0.12)",
            border: `1px solid ${isEng ? "rgba(56,189,248,0.3)" : "rgba(251,146,60,0.3)"}`,
            color: isEng ? "#38BDF8" : "#FB923C",
          }}
          animate={{
            translateZ: isHovered ? 30 : 0,
            scale: isHovered ? 1.05 : 1,
            boxShadow: isHovered
              ? isEng
                ? "0 0 30px rgba(56,189,248,0.3)"
                : "0 0 30px rgba(251,146,60,0.3)"
              : "none",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="sm:hidden">{isEng ? "Enter" : "Explore"}</span>
          <span className="hidden sm:inline">{isEng ? "Enter Engineering" : "Begin Adventure"}</span>
          <ArrowRight size={14} className="sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function EngineeringBackground({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark tech gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020c18] via-[#0a1628] to-[#050d1a]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating code chips */}
      {ENGINEERING_GRID.map((label, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono text-sky-400/30 select-none"
          style={{
            left: `${8 + (i % 5) * 20}%`,
            top: `${10 + Math.floor(i / 5) * 25}%`,
          }}
          animate={{
            opacity: isHovered ? [0.2, 0.6, 0.2] : 0.2,
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3 + i * 0.3,
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {label}
        </motion.div>
      ))}

      {/* Glowing orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        animate={{
          scale: isHovered ? [1, 1.3, 1] : 1,
          opacity: isHovered ? 0.15 : 0.06,
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Moving light rays */}
      {isHovered && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, transparent 60%, rgba(56,189,248,0.04) 70%, transparent 80%)",
          }}
        />
      )}
    </div>
  );
}

function ExplorerBackground({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Warm dark sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0705] via-[#120c08] to-[#1a0e06]" />

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" className="w-full">
          <path
            d="M0,400 L0,280 L150,160 L280,240 L400,100 L520,200 L640,60 L760,180 L880,120 L1000,200 L1120,140 L1200,220 L1200,400 Z"
            fill="rgba(5,3,2,0.9)"
          />
          <path
            d="M0,400 L0,320 L100,240 L220,300 L340,200 L460,280 L580,180 L700,260 L820,200 L940,270 L1060,210 L1200,280 L1200,400 Z"
            fill="rgba(8,5,3,0.95)"
          />
        </svg>
      </div>

      {/* Stars */}
      {Array.from({ length: 50 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
          }}
          animate={{
            opacity: [0.2, isHovered ? 1 : 0.5, 0.2],
            scale: [1, isHovered ? 1.5 : 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Warm horizon glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64"
        animate={{
          opacity: isHovered ? 0.4 : 0.15,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(to top, rgba(225,69,4,0.3), rgba(251,146,60,0.1), transparent)",
        }}
      />

      {/* Moon */}
      <motion.div
        className="absolute top-16 right-24"
        animate={{
          scale: isHovered ? 1.1 : 1,
          filter: isHovered ? "blur(0px)" : "blur(1px)",
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: 48,
            height: 48,
            background: "radial-gradient(circle at 35% 35%, rgba(255,240,200,0.9), rgba(200,180,120,0.6))",
            boxShadow: "0 0 30px rgba(255,220,100,0.3), 0 0 60px rgba(255,200,50,0.1)",
          }}
        />
      </motion.div>

      {/* Floating nature icons */}
      {EXPLORER_ICONS.slice(0, 6).map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none opacity-20"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: isHovered ? 0.5 : 0.2,
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Fog effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(251,146,60,0.2) 0%, transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
