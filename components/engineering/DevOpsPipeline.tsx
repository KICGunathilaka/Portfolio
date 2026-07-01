"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PIPELINE_STAGES, PipelineStage } from "@/lib/data/pipeline";

export function DevOpsPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<PipelineStage | null>(null);

  return (
    <section
      id="devops"
      className="py-20 sm:py-28 md:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050D1A 0%, #020812 50%, #050D1A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E14504] mb-3 block">
            How I Ship
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            CI/CD Pipeline
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Click any stage to explore the tools, decisions, and lessons learned.
          </p>
        </motion.div>

        {/* Pipeline grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {PIPELINE_STAGES.map((stage, i) => (
            <PipelineNode
              key={stage.id}
              stage={stage}
              index={i}
              isInView={isInView}
              onClick={() => setSelected(stage)}
            />
          ))}
        </div>

        {/* Visual connector hint */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <p className="text-white/20 text-sm">
            ↑ Click any stage to see details, tools, and learnings
          </p>
        </motion.div>
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="relative w-full max-w-lg rounded-3xl p-8 overflow-hidden"
              style={{
                background: "#050D1A",
                border: `1px solid ${selected.color}30`,
                boxShadow: `0 0 60px ${selected.color}20, 0 40px 80px rgba(0,0,0,0.6)`,
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${selected.color}, transparent)` }}
              />

              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
                style={{
                  background: `${selected.color}15`,
                  border: `1px solid ${selected.color}30`,
                }}
              >
                {selected.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-2">{selected.label}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{selected.description}</p>

              {/* Metrics */}
              {selected.metrics && (
                <div
                  className="mb-6 px-4 py-3 rounded-xl"
                  style={{ background: `${selected.color}10`, border: `1px solid ${selected.color}25` }}
                >
                  <p className="text-sm font-mono" style={{ color: selected.color }}>
                    📊 {selected.metrics}
                  </p>
                </div>
              )}

              {/* Details */}
              <div className="space-y-2 mb-6">
                {selected.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: selected.color }}
                    />
                    <p className="text-white/60 text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div>
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {selected.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: `${selected.color}12`,
                        border: `1px solid ${selected.color}25`,
                        color: selected.color,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PipelineNode({
  stage,
  index,
  isInView,
  onClick,
}: {
  stage: PipelineStage;
  index: number;
  isInView: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="relative flex flex-col items-center p-4 rounded-2xl text-center group cursor-pointer"
      style={{
        background: hovered ? `${stage.color}10` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? `${stage.color}40` : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 0 30px ${stage.color}20` : "none",
        transition: "all 0.3s ease",
      }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Stage number */}
      <div
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
        style={{ background: stage.color, color: "white" }}
      >
        {index + 1}
      </div>

      {/* Icon */}
      <div className="text-3xl mb-3">{stage.icon}</div>

      {/* Label */}
      <p className="text-white/70 text-xs font-medium leading-tight">{stage.label}</p>

      {/* Hover hint */}
      {hovered && (
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-2 py-1 rounded"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: `${stage.color}20`,
            border: `1px solid ${stage.color}30`,
            color: stage.color,
          }}
        >
          Click to explore
        </motion.div>
      )}
    </motion.button>
  );
}
