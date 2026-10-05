"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const ENG_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "DevOps", href: "#devops" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isPortal) return null;

  const solid = scrolled || mobileOpen;

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-neutral-800 bg-[#0A0A0A]/90 backdrop-blur-md" : "border-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.12em] text-neutral-200 transition-colors hover:text-white"
        >
          <span className="block h-2 w-2 rounded-full bg-accent" />
          Portfolio
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 font-mono text-xs text-neutral-400 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href={isEng ? "/explorer" : "/engineering"}
            className="group flex items-center gap-1.5 rounded-full border border-neutral-700 px-3.5 py-2 font-mono text-xs text-neutral-200 transition-colors hover:border-neutral-400 hover:text-white"
          >
            {isEng ? "Explorer" : "Engineer"}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-colors group-hover:text-accent"
              strokeWidth={1.5}
            />
          </Link>

          <button
            className="p-2 text-neutral-300 transition-colors hover:text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="overflow-hidden border-t border-neutral-800 md:hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col px-4 pb-3 font-mono text-sm sm:px-8">
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 border-b border-neutral-900 py-3.5 text-neutral-200 last:border-b-0"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-xs text-neutral-600">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
