"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, Mail, Send, Youtube } from "lucide-react";

export function ExplorerContact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-32 relative overflow-hidden" style={{ background: "#0a0603" }}>
      {/* Warm glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(180,70,0,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400 mb-3 block">
            Stay Connected
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#F5EDD8" }}>
            Join the Journey
          </h2>
          <p className="text-orange-200/40 text-lg mb-12 max-w-xl mx-auto">
            Follow along for trail reports, photography tips, and destination guides
            from the mountains and beyond.
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {[
            { icon: Instagram, label: "Instagram", handle: "@explorer", color: "#E1306C" },
            { icon: Youtube, label: "YouTube", handle: "AdventureChannel", color: "#FF0000" },
            { icon: Mail, label: "Email", handle: "hello@explorer.dev", color: "#FB923C" },
          ].map(({ icon: Icon, label, handle, color }) => (
            <a
              key={label}
              href="#"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 group"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="text-left">
                <p className="text-white/40 text-xs">{label}</p>
                <p className="text-white/80 text-sm group-hover:text-white transition-colors">{handle}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <p className="text-orange-200/50 text-sm mb-4">Get trail reports in your inbox</p>
          {sent ? (
            <div
              className="py-4 px-6 rounded-2xl text-center"
              style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}
            >
              <p className="text-green-400 font-medium">You&apos;re in! ✅ See you on the trail.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="flex gap-3"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1rem",
                padding: "0.5rem",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent text-white placeholder:text-white/25 text-sm outline-none px-3"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white shrink-0 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(180,70,0,0.8), rgba(220,100,0,0.6))",
                  border: "1px solid rgba(251,146,60,0.3)",
                }}
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
