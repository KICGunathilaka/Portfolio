"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { RiseText } from "./RiseText";

const DIR = "/images/explorer/";
const SLICES = [
  "486603458_591128697305547_3605519198636795619_n.jpg",
  "670734986_17872996128598039_4251368599022219744_n.webp",
  "486525193_591130143972069_1931728085129046635_n.jpg",
  "486872600_592754540476296_1836020837235240112_n.jpg",
  "487221647_594656123619471_5193206338573285443_n.jpg",
  "696233825_17877590568598039_1374240430738083888_n.webp",
  "486657256_591857697232647_4936088846983281808_n.jpg",
];
const ADVANCE_MS = 2600;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Seven photographs as slanted slices packed edge to edge. One slice is open wide at a time;
 * it moves along by itself, and hovering or tapping a slice opens that one.
 * Slices lean sideways on wide screens and stack as leaning bands on narrow ones.
 */
export function SlantedSlices() {
  const ref = useRef<HTMLElement>(null);
  const onScreen = useInView(ref, { margin: "-20%" });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!onScreen || held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setActive((i) => (i + 1) % SLICES.length), ADVANCE_MS);
    return () => clearInterval(interval);
  }, [onScreen, held]);

  return (
    <section id="cuts" ref={ref} className="overflow-hidden bg-forest py-20 text-bone lg:py-28">
      <div className="mx-auto flex max-w-[1500px] items-end justify-between gap-6 px-5 pb-10 sm:px-10">
        <h2 className="text-[15vw] font-black uppercase leading-[0.82] tracking-[-0.01em] [font-stretch:62%] lg:text-[min(9vw,9.5rem)]">
          <RiseText text="Seven" /> <RiseText text="cuts." className="text-lime" delay={0.15} />
        </h2>
        <p className="pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-bone/60">
          <span className="text-lime">{pad(active + 1)}</span> / {pad(SLICES.length)}
        </p>
      </div>

      {/* Pulled past the screen edges so the slant never exposes a corner */}
      <div
        className="-mx-[6vw] -my-[3vh] flex h-[130vh] -skew-y-6 flex-col gap-1.5 lg:-mx-[9vw] lg:my-0 lg:h-[78vh] lg:skew-y-0 lg:-skew-x-12 lg:flex-row lg:gap-2"
        onMouseLeave={() => setHeld(false)}
      >
        {SLICES.map((file, i) => {
          const open = i === active;
          return (
            <button
              key={file}
              type="button"
              aria-label={`Open photograph ${i + 1} of ${SLICES.length}`}
              aria-pressed={open}
              onMouseEnter={() => {
                setActive(i);
                setHeld(true);
              }}
              onFocus={() => setActive(i)}
              onClick={() => {
                setActive(i);
                setHeld(true);
              }}
              className="relative min-h-0 min-w-0 overflow-hidden outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ flexGrow: open ? 6 : 1, flexBasis: 0 }}
            >
              {/* Leaned back the other way and enlarged, so the photograph itself stays upright */}
              <div className="absolute -inset-[22%] skew-y-6 lg:skew-y-0 lg:skew-x-12">
                <Image
                  src={`${DIR}${file}`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={`object-cover transition-[filter,transform] duration-700 ${
                    open ? "scale-100" : "scale-110 brightness-50 saturate-50"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
