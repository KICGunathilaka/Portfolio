"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RiseText } from "./RiseText";

const EMAIL = "isurugunathilaka1@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/isuru-gunathilakansbm";
// The day ends at camp: a lit tent under the night sky
const PHOTO = "/images/explorer/703665774_940897148995365_2525273680976652082_n.jpg";

const LINKS = [
  { label: "Email", detail: EMAIL, href: `mailto:${EMAIL}`, external: false },
  { label: "LinkedIn", detail: "in/isuru-gunathilakansbm", href: LINKEDIN, external: true },
  { label: "Engineer", detail: "The other side of the week", href: "/engineering", external: false },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Closing scene: the night-camp photograph fills the screen and slowly pulls back as it scrolls in.
 * The sign-off sits in the dark sky, and the ways to get in touch are large rows that flood with
 * lime on hover.
 */
export function ExplorerOutro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], ["-6%", "0%"]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-forest text-bone lg:min-h-[100dvh]">
      {/* The photograph: a band on top on narrow screens, the whole backdrop on wide ones */}
      <div className="relative h-[72vw] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
        <motion.div className="absolute inset-0" style={{ scale, y: lift }}>
          <Image
            src={PHOTO}
            alt="A lit tent and a figure under a starry night sky"
            fill
            sizes="100vw"
            className="object-cover object-[70%_80%]"
          />
        </motion.div>
      </div>

      <div className="relative mx-auto flex max-w-[1500px] flex-col justify-between gap-12 px-5 pb-12 pt-10 sm:px-10 lg:min-h-[100dvh] lg:pb-14 lg:pt-32">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="h-2.5 w-2.5 rounded-full bg-lime motion-safe:animate-blink" />
            Contact
          </p>
          <h2 className="mt-6 text-[19vw] font-black uppercase leading-[0.82] tracking-[-0.01em] [font-stretch:62%] lg:text-[min(12.5vw,13rem)]">
            <RiseText text="See you" />
            <br />
            <RiseText text="out there." className="text-lime" delay={0.2} />
          </h2>
        </div>

        {/* Link rows; on wide screens they keep to the left, clear of the tent */}
        <ul className="border-b border-bone/25 lg:w-[36%]">
          {LINKS.map((link, i) => {
            const row = (
              <>
                {/* Lime floods in from the left on hover */}
                <span className="absolute inset-0 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                <span className="relative text-[11vw] font-black uppercase leading-none [font-stretch:62%] sm:text-6xl lg:text-7xl">
                  {link.label}
                </span>
                <span className="relative ml-auto hidden truncate text-sm font-medium text-bone/70 transition-colors duration-300 group-hover:text-forest sm:block lg:hidden">
                  {link.detail}
                </span>
                <ArrowUpRight
                  className="relative ml-auto h-7 w-7 shrink-0 text-lime sm:ml-0 lg:ml-auto transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-forest sm:h-9 sm:w-9"
                  strokeWidth={2}
                />
              </>
            );
            const className =
              "group relative flex items-center gap-5 overflow-hidden border-t border-bone/25 px-2 py-4 outline-none transition-colors duration-300 hover:text-forest focus-visible:text-forest sm:px-4 sm:py-5";
            return (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.6 }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              >
                {link.href.startsWith("/") ? (
                  <Link href={link.href} className={className}>
                    {row}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className={className}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {row}
                  </a>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
