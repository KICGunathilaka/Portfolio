"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { EXPLORER_PHOTOS, EXPLORER_PHOTO_DIR } from "@/lib/data/explorerPhotos";

// Every photograph, dealt across three reels
const REELS = [0, 1, 2].map((reel) =>
  EXPLORER_PHOTOS.map((photo, index) => ({ ...photo, index })).filter((photo) => photo.index % 3 === reel)
);
// Seconds per full loop; uneven so the reels never fall into step
const PACE = [150, 120, 170];
const TOTAL = EXPLORER_PHOTOS.length;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * All the photographs as three strips of film running the width of the screen, neighbours moving
 * in opposite directions. Hovering a reel holds it still; choosing a frame opens it full screen.
 */
export function FrameReels() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (by: number) => setOpen((current) => (current === null ? null : (current + by + TOTAL) % TOTAL)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    // Hold the page still behind the viewer
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, step]);

  const photo = open === null ? null : EXPLORER_PHOTOS[open];

  return (
    <section id="gallery" className="overflow-hidden bg-forest text-bone">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-8 px-5 pb-12 pt-24 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:pt-32">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="h-2.5 w-2.5 rounded-full bg-lime" />
            Photographs
          </p>
          <h2 className="mt-6 text-[19vw] font-black uppercase leading-[0.82] tracking-[-0.01em] [font-stretch:62%] lg:text-[min(13vw,13.5rem)]">
            <span className="text-lime">{TOTAL}</span> frames.
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-bone/70 lg:pb-4">
          Everything I&apos;ve kept from the trail so far, running past as three reels.{" "}
          <span className="hidden lg:inline">Hover a reel to hold it still, and click</span>
          <span className="lg:hidden">Tap</span> any frame to open it.
        </p>
      </div>

      <div className="flex flex-col gap-1.5 pb-24 sm:gap-2 lg:pb-32">
        {REELS.map((reel, i) => (
          <div key={i} className="group overflow-hidden">
            <div
              className={`flex w-max gap-1.5 will-change-transform group-hover:[animation-play-state:paused] sm:gap-2 ${
                i % 2 === 0 ? "motion-safe:animate-reel-left" : "motion-safe:animate-reel-right"
              }`}
              style={{ animationDuration: `${PACE[i]}s` }}
            >
              {/* The reel is laid out twice end to end so the loop has no seam */}
              {[...reel, ...reel].map((frame, j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => setOpen(frame.index)}
                  aria-label={`Open photograph ${frame.index + 1} of ${TOTAL}`}
                  // Second copy is for the eye only
                  tabIndex={j < reel.length ? 0 : -1}
                  aria-hidden={j >= reel.length}
                  className="relative mr-0 h-[24vh] shrink-0 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime lg:h-[30vh]"
                  style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
                >
                  <Image
                    src={`${EXPLORER_PHOTO_DIR}${frame.file}`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 28vw, 45vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen viewer */}
      <AnimatePresence>
        {photo && open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-forest"
            role="dialog"
            aria-modal="true"
            aria-label={`Photograph ${open + 1} of ${TOTAL}`}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex shrink-0 items-center justify-between px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] sm:px-10">
              <p>
                <span className="text-lime">{pad(open + 1)}</span> <span className="text-bone/60">/ {pad(TOTAL)}</span>
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="flex items-center gap-2 text-bone/80 transition-colors hover:text-bone"
              >
                Close <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="relative min-h-0 flex-1" onClick={() => setOpen(null)}>
              <Image
                key={photo.file}
                src={`${EXPLORER_PHOTO_DIR}${photo.file}`}
                alt={`Photograph ${open + 1} of ${TOTAL}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="flex shrink-0 items-center justify-center gap-3 px-5 py-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photograph"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 transition-colors hover:border-lime hover:text-lime"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photograph"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 transition-colors hover:border-lime hover:text-lime"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
