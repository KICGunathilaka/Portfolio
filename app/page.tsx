"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/portal/AuroraBackground";
import { ParticleField } from "@/components/portal/ParticleField";
import { WorldCard } from "@/components/portal/WorldCard";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

export default function PortalPage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <main className="relative w-full min-h-screen overflow-hidden">
          {/* Layered backgrounds */}
          <AuroraBackground />
          <ParticleField />

          {/* Noise texture */}
          <div
            className="fixed inset-0 pointer-events-none z-[2] opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Center header */}
          <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center pt-10 sm:pt-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-white/30 mb-4 sm:mb-6"
            >
              Portfolio
            </motion.div>

            <motion.h1
              className="text-center font-bold leading-tight mb-3 sm:mb-4"
              style={{ fontSize: "clamp(1.75rem, 7vw, 4rem)", color: "rgba(240,244,255,0.95)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Two Worlds.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #E14504, #FF7043)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                One Passion.
              </span>
            </motion.h1>

            <motion.p
              className="text-white/40 text-xs sm:text-sm md:text-base text-center max-w-[16rem] sm:max-w-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Choose the side of me you&apos;d like to discover.
            </motion.p>

            {/* Divider */}
            <motion.div
              className="mt-5 sm:mt-8 w-px h-8 sm:h-12"
              style={{ background: "linear-gradient(to bottom, rgba(225,69,4,0.5), transparent)" }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            />
          </div>

          {/* World split — fills the screen */}
          <div className="absolute inset-0 z-10 flex flex-col md:flex-row pt-[19rem] sm:pt-[17rem] md:pt-0">
            <WorldCard side="engineering" />
            <WorldCard side="explorer" />
          </div>
        </main>
      )}
    </>
  );
}
