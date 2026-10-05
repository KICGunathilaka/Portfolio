"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export function ScrollProgress({ color = "#E14504" }: { color?: string }) {
  const scrollY = useMotionValue(0);
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    const updateDocHeight = () => {
      setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    updateDocHeight();
    window.addEventListener("resize", updateDocHeight);

    const handleScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDocHeight);
    };
  }, [scrollY]);

  const width = useTransform(scrollY, [0, docHeight], ["0%", "100%"]);
  const smoothWidth = useSpring(width, { damping: 30, stiffness: 200 });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-white/5">
      <motion.div
        className="h-full origin-left"
        style={{ width: smoothWidth, background: color }}
      />
    </div>
  );
}
