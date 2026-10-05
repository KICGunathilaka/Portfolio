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
  { label: "Trail", href: "#hiking" },
  { label: "Frames", href: "#gallery" },
  { label: "Contact", href: "#contact" },
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

  // The Explorer side is a cinematic, photography-led design; the engineering side is technical and diagram-led.
  // Same structure, two skins.
  const skin = isExp
    ? {
        bar: solid ? "border-bone/10 bg-forest/85 backdrop-blur-md" : "border-transparent",
        logo: "text-lg font-extrabold uppercase tracking-tight text-bone [font-stretch:68%] hover:text-lime",
        dot: "bg-lime",
        links: "text-sm font-medium text-bone/60",
        linkHover: "hover:text-bone",
        pill: "border-bone/30 text-sm font-medium text-bone hover:border-bone",
        pillArrow: "group-hover:text-lime",
        menuButton: "text-bone/70 hover:text-bone",
        menu: "border-bone/10",
        menuItem: "border-bone/10 font-medium text-bone",
        menuIndex: "text-bone/40",
      }
    : {
        bar: solid ? "border-neutral-800 bg-[#0A0A0A]/90 backdrop-blur-md" : "border-transparent",
        logo: "font-display text-sm sm:text-base font-extrabold uppercase tracking-[0.12em] text-neutral-200 hover:text-white",
        dot: "bg-accent",
        links: "font-mono text-xs text-neutral-400",
        linkHover: "hover:text-white",
        pill: "border-neutral-700 font-mono text-xs text-neutral-200 hover:border-neutral-400 hover:text-white",
        pillArrow: "group-hover:text-accent",
        menuButton: "text-neutral-300 hover:text-white",
        menu: "border-neutral-800",
        menuItem: "border-neutral-900 font-mono text-neutral-200",
        menuIndex: "text-neutral-600",
      };

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${skin.bar}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 transition-colors ${skin.logo}`}
        >
          <span className={`block h-2 w-2 rounded-full ${skin.dot}`} />
          Portfolio
        </Link>

        {/* Desktop links */}
        <div className={`hidden items-center gap-8 md:flex ${skin.links}`}>
          {links.map((link) => (
            <a key={link.label} href={link.href} className={`transition-colors ${skin.linkHover}`}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href={isEng ? "/explorer" : "/engineering"}
            className={`group flex items-center gap-1.5 rounded-full border px-3.5 py-2 transition-colors ${skin.pill}`}
          >
            {isEng ? "Explorer" : "Engineer"}
            <ArrowUpRight
              className={`h-3.5 w-3.5 transition-colors ${skin.pillArrow}`}
              strokeWidth={1.5}
            />
          </Link>

          <button
            className={`p-2 transition-colors md:hidden ${skin.menuButton}`}
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
            className={`overflow-hidden border-t md:hidden ${skin.menu}`}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col px-4 pb-3 text-sm sm:px-8">
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-4 border-b py-3.5 last:border-b-0 ${skin.menuItem}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={`text-xs ${skin.menuIndex}`}>{String(i + 1).padStart(2, "0")}</span>
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
