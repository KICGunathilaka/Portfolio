"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Send, Terminal } from "lucide-react";

export function EngContact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 md:py-32" style={{ background: "#050D1A" }}>
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#E14504] mb-3 block">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Whether it&apos;s a complex infrastructure challenge or a fresh AI project idea.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="space-y-6 mb-10">
              {[
                { icon: Mail, label: "Email", value: "hello@portfolio.dev", href: "mailto:hello@portfolio.dev" },
                { icon: Github, label: "GitHub", value: "github.com/engineer", href: "#" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/engineer", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(225,69,4,0.12)", border: "1px solid rgba(225,69,4,0.2)" }}
                  >
                    <Icon size={18} className="text-[#E14504]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">{label}</p>
                    <p className="text-white/80 text-sm group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Terminal prompt */}
            <div
              className="p-5 rounded-2xl font-mono text-sm"
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={14} className="text-sky-400" />
                <span className="text-white/30 text-xs">availability_status.sh</span>
              </div>
              <div className="space-y-1.5">
                <p className="text-sky-400">$ check-availability</p>
                <p className="text-green-400">✓ Available for new projects</p>
                <p className="text-white/40">Response time: &lt; 24 hours</p>
                <p className="text-sky-400">$ echo $TIMEZONE</p>
                <p className="text-white/60">UTC+1 (Europe)</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {sent ? (
              <div
                className="h-full flex flex-col items-center justify-center p-12 rounded-3xl text-center"
                style={{
                  background: "rgba(52,211,153,0.05)",
                  border: "1px solid rgba(52,211,153,0.2)",
                }}
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-white/50 text-sm">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: "name", label: "Name", placeholder: "John Smith", type: "text" },
                  { name: "email", label: "Email", placeholder: "john@company.com", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(225,69,4,0.5)";
                        e.target.style.boxShadow = "0 0 20px rgba(225,69,4,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.08)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(225,69,4,0.5)";
                      e.target.style.boxShadow = "0 0 20px rgba(225,69,4,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                  style={{
                    background: sending
                      ? "rgba(225,69,4,0.5)"
                      : "linear-gradient(135deg, #E14504, #FF5722)",
                    boxShadow: "0 0 30px rgba(225,69,4,0.3)",
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {sending ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
