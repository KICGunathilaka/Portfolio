"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Mountain } from "lucide-react";

export function WorldSwitcher() {
  const pathname = usePathname();
  const isEng = pathname === "/engineering";
  const isExp = pathname === "/explorer";

  if (!isEng && !isExp) return null;

  const target = isEng ? "/explorer" : "/engineering";
  const Icon = isEng ? Mountain : Server;
  const label = isEng ? "Explorer" : "Engineer";
  const color = isEng ? "#FB923C" : "#38BDF8";

  return (
    <motion.div
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={target}
        className="group flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl transition-all duration-300"
        style={{
          background: "rgba(5,13,26,0.9)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${color}25`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${color}10`,
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}15` }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <span className="hidden sm:inline text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
          Switch to{" "}
          <span style={{ color }}>{label}</span>
        </span>
        <span className="sm:hidden text-sm font-medium" style={{ color }}>
          {label}
        </span>
      </Link>
    </motion.div>
  );
}
