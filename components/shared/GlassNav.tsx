"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Mountain, Home, Menu, X } from "lucide-react";

const ENG_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "DevOps", href: "#devops" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const EXP_LINKS = [
  { label: "Hiking", href: "#hiking" },
  { label: "Camping", href: "#camping" },
  { label: "Gallery", href: "#gallery" },
  { label: "Travel", href: "#travel" },
  { label: "Gear", href: "#gear" },
];

export function GlassNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isEng = pathname === "/engineering";
  const isExp = pathname === "/explorer";
  const isPortal = pathname === "/";

  const links = isEng ? ENG_LINKS : isExp ? EXP_LINKS : [];
  const accentColor = isExp ? "#FB923C" : "#E14504";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isPortal) return null;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-500"
        style={{
          background: scrolled ? "rgba(5,13,26,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
            style={{ background: "rgba(225,69,4,0.15)", border: "1px solid rgba(225,69,4,0.3)" }}
          >
            <span className="text-sm font-bold" style={{ color: accentColor }}>P</span>
          </div>
          <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
            Portfolio
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* World switcher */}
          <Link
            href={isEng ? "/explorer" : "/engineering"}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {isEng ? <Mountain size={14} /> : <Server size={14} />}
            {isEng ? "Explorer" : "Engineer"}
          </Link>

          {/* Home */}
          <Link
            href="/"
            className="p-2 rounded-xl transition-all duration-200 text-white/40 hover:text-white hover:bg-white/5"
          >
            <Home size={16} />
          </Link>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="absolute top-20 left-4 right-4 rounded-2xl p-4 flex flex-col gap-1"
            style={{
              background: "rgba(5,13,26,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
