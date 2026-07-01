"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GEAR_ITEMS, VISITED_COUNTRIES } from "@/lib/data/adventures";
import { Globe } from "lucide-react";

export function GearSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gear" className="py-20 sm:py-28 md:py-32" style={{ background: "#080504" }}>
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gear */}
          <div>
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400 mb-3 block">
                Kit
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#F5EDD8" }}>
                My Gear
              </h2>
              <p className="text-orange-200/40">
                Trusted equipment that&apos;s been through real expeditions.
              </p>
            </motion.div>

            <div className="space-y-4">
              {GEAR_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="flex items-center gap-5 p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  whileHover={{
                    borderColor: "rgba(251,146,60,0.25)",
                    background: "rgba(251,146,60,0.04)",
                    x: 4,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{
                      background: "rgba(180,70,0,0.12)",
                      border: "1px solid rgba(251,146,60,0.15)",
                    }}
                  >
                    {item.image}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(251,146,60,0.1)",
                          color: "rgba(251,146,60,0.7)",
                          border: "1px solid rgba(251,146,60,0.15)",
                        }}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p className="text-white font-semibold text-sm">{item.name}</p>
                    <p className="text-orange-200/40 text-xs mt-0.5">{item.description}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span
                        key={j}
                        className="text-sm"
                        style={{ opacity: j < item.rating ? 1 : 0.2 }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Countries visited */}
          <div>
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400 mb-3 block">
                Footprints
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#F5EDD8" }}>
                Countries Visited
              </h2>
              <p className="text-orange-200/40">
                {VISITED_COUNTRIES.length} countries and counting.
              </p>
            </motion.div>

            {/* Globe stat */}
            <motion.div
              className="flex items-center gap-5 p-6 rounded-2xl mb-8"
              style={{
                background: "rgba(180,70,0,0.06)",
                border: "1px solid rgba(251,146,60,0.15)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(251,146,60,0.12)", border: "1px solid rgba(251,146,60,0.2)" }}
              >
                <Globe size={28} className="text-orange-400" />
              </div>
              <div>
                <div
                  className="text-4xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #FB923C, #F59E0B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {VISITED_COUNTRIES.length}
                </div>
                <p className="text-orange-200/50 text-sm">Countries explored</p>
              </div>
            </motion.div>

            {/* Country tags */}
            <div className="flex flex-wrap gap-2">
              {VISITED_COUNTRIES.map((country, i) => (
                <motion.span
                  key={country}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "rgba(245,237,216,0.5)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.03, duration: 0.4 }}
                  whileHover={{
                    background: "rgba(251,146,60,0.1)",
                    borderColor: "rgba(251,146,60,0.3)",
                    color: "#FB923C",
                  }}
                >
                  {country}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
