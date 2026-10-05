import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B2240",
          dark: "#050D1A",
          light: "#0F2E56",
        },
        accent: {
          DEFAULT: "#E14504",
          light: "#FF5722",
          glow: "rgba(225,69,4,0.4)",
        },
        // Explorer page palette: forest-dark page, bone text, one lime. Deliberately unlike the engineering side.
        forest: "#0B0F0C",
        bone: "#ECEFE6",
        lime: "#CBEA5C",
        glass: {
          white: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-jetbrains)", "monospace"],
        display: ["var(--font-doto)", "var(--font-jetbrains)", "monospace"],
        mono: ["var(--font-jetbrains)", "monospace"],
        // Explorer page only (loaded in app/explorer/layout.tsx)
        poster: ["var(--font-archivo)", "system-ui", "sans-serif"],
      },
      animation: {
        "aurora": "aurora 20s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "spin-slow": "spin 20s linear infinite",
        "shimmer": "shimmer 2s infinite",
        "particle-float": "particleFloat 8s ease-in-out infinite",
        "drift": "drift 26s ease-in-out infinite alternate",
        "blink": "blink 1s steps(1) infinite",
        "wall-up": "wallUp 60s linear infinite",
        "hint": "hint 1.8s cubic-bezier(0.6, 0, 0.3, 1) infinite",
        "wall-down": "wallDown 60s linear infinite",
        "reel-left": "reelLeft 140s linear infinite",
        "reel-right": "reelRight 140s linear infinite",
      },
      keyframes: {
        drift: {
          from: { transform: "scale(1) translate3d(0, 0, 0)" },
          to: { transform: "scale(1.08) translate3d(-1.5%, -1%, 0)" },
        },
        // Each stack holds its photos twice, so moving by half its height loops seamlessly
        hint: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "25%": { opacity: "1" },
          "100%": { transform: "translateY(36px)", opacity: "0" },
        },
        wallUp: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
        wallDown: {
          from: { transform: "translateY(-50%)" },
          to: { transform: "translateY(0)" },
        },
        reelLeft: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        reelRight: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        particleFloat: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)", opacity: "0.6" },
          "33%": { transform: "translateY(-30px) translateX(15px) scale(1.1)", opacity: "1" },
          "66%": { transform: "translateY(-15px) translateX(-10px) scale(0.9)", opacity: "0.8" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
