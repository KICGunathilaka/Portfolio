"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const EMAIL = "isurugunathilaka1@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/isuru-gunathilakansbm";
// A bright, wide landscape reads well through heavy letters
const PHOTO = "/images/explorer/487491069_594655966952820_2266355550664252025_n.jpg";

/**
 * Closing section. Echoes the hero: the headline's letters are windows onto a photograph, this
 * time without the zoom. Then the ways to get in touch.
 */
export function ExplorerOutro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // The photograph slides behind the letters as the section scrolls in
  const panY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const panX = useTransform(scrollYProgress, [0, 1], ["20%", "80%"]);

  return (
    <section id="contact" ref={ref} className="border-t border-bone/10 bg-forest text-bone">
      <div className="mx-auto max-w-[1500px] px-5 py-24 sm:px-10 lg:py-32">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
          <span className="h-2.5 w-2.5 rounded-full bg-lime" />
          Contact
        </p>

        <motion.h2
          className="mt-6 bg-[length:135%_auto] bg-clip-text text-[21vw] font-black uppercase leading-[0.82] tracking-[-0.01em] text-transparent [font-stretch:62%] lg:text-[min(17vw,18rem)]"
          style={{ backgroundImage: `url(${PHOTO})`, backgroundPositionX: panX, backgroundPositionY: panY }}
        >
          See you
          <br />
          out there.
        </motion.h2>

        <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-bone/20 pt-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/50">Email</p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-2 inline-flex items-center gap-1.5 break-all text-base font-medium transition-colors hover:text-lime"
            >
              {EMAIL}
              <ArrowUpRight className="h-4 w-4 shrink-0 text-lime" strokeWidth={2} />
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/50">LinkedIn</p>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex items-center gap-1.5 text-base font-medium transition-colors hover:text-lime"
            >
              in/isuru-gunathilakansbm
              <ArrowUpRight className="h-4 w-4 shrink-0 text-lime" strokeWidth={2} />
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/50">The other side</p>
            <Link
              href="/engineering"
              className="group mt-2 inline-flex items-center gap-1.5 text-base font-medium transition-colors hover:text-lime"
            >
              Isuru the engineer
              <ArrowUpRight className="h-4 w-4 shrink-0 text-lime" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
