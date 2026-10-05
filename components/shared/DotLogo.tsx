"use client";

import { useEffect, useState } from "react";

// Dots per side, and how many canvas pixels are sampled per dot when tracing the logo
const GRID = 26;
const SAMPLES = 4;

type Dot = [x: number, y: number, r: number];
const cache = new Map<string, Dot[]>();

/** Rasterises a 24x24 SVG path and keeps one dot per covered cell, sized by how much of it is covered. */
function trace(path: string): Dot[] {
  const cached = cache.get(path);
  if (cached) return cached;

  const size = GRID * SAMPLES;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.scale(size / 24, size / 24);
  ctx.fill(new Path2D(path));
  const { data } = ctx.getImageData(0, 0, size, size);

  const dots: Dot[] = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      let alpha = 0;
      for (let sy = 0; sy < SAMPLES; sy++) {
        for (let sx = 0; sx < SAMPLES; sx++) {
          alpha += data[((y * SAMPLES + sy) * size + x * SAMPLES + sx) * 4 + 3];
        }
      }
      const coverage = alpha / (255 * SAMPLES * SAMPLES);
      if (coverage > 0.22) dots.push([x + 0.5, y + 0.5, 0.26 + 0.2 * Math.min(coverage * 1.3, 1)]);
    }
  }
  cache.set(path, dots);
  return dots;
}

interface DotLogoProps {
  /** 24x24 SVG path of the logo */
  path?: string;
  /** Letters shown in dot-matrix type when there is no logo */
  mark?: string;
  className?: string;
}

/** A logo redrawn as a dot matrix, to sit alongside the dot-matrix typeface. */
export function DotLogo({ path, mark, className }: DotLogoProps) {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    setDots(path ? trace(path) : []);
  }, [path]);

  if (!path) {
    return (
      <div key={mark} className={`dot-logo-in flex items-center justify-center ${className ?? ""}`}>
        <span className="font-display text-[2.6em] font-black uppercase leading-none">{mark}</span>
      </div>
    );
  }

  return (
    <svg key={path} viewBox={`0 0 ${GRID} ${GRID}`} className={`dot-logo-in ${className ?? ""}`} aria-hidden>
      {dots.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" />
      ))}
    </svg>
  );
}
