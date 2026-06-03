"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

type SectionHeaderProps = {
  eyebrow: string;
  headline: string[];
  subhead?: string;
  align?: "left" | "center";
  id?: string;
};

export default function SectionHeader({
  eyebrow,
  headline,
  subhead,
  align = "left",
  id,
}: SectionHeaderProps) {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current.querySelectorAll("[data-anim]"),
          { y: 20, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.06 },
          0
        );
      }

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll("[data-word]");
        tl.fromTo(
          words,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.2, stagger: 0.05 },
          0.1
        );
      }

      if (subheadRef.current) {
        tl.fromTo(
          subheadRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.5
        );
      }
    });
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  const isCenter = align === "center";

  return (
    <header
      id={id}
      className={`flex w-full flex-col gap-5 sm:gap-6 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <div
        ref={eyebrowRef}
        className={`flex items-center gap-3 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <span
          data-anim
          className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12"
        />
        <span
          data-anim
          className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]"
        >
          {eyebrow}
        </span>
        <span
          data-anim
          className="h-px w-8 bg-gradient-to-l from-transparent to-accent/70 sm:w-12"
        />
      </div>

      <h2
        ref={headlineRef}
        className="font-display text-balance text-[36px] leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[72px]"
      >
        {headline.map((line, lineIdx) => (
          <span
            key={`${line}-${lineIdx}`}
            className="block overflow-hidden pb-[0.06em]"
            aria-hidden
          >
            <span className="inline-block">
              {line.split(" ").map((word, wordIdx) => (
                <span
                  key={`${line}-${word}-${wordIdx}`}
                  data-word
                  className="inline-block"
                >
                  {word}
                  {wordIdx < line.split(" ").length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </span>
          </span>
        ))}
        <span className="sr-only">{headline.join(" ")}</span>
      </h2>

      {subhead ? (
        <motion.p
          ref={subheadRef}
          className={`max-w-2xl text-pretty text-sm leading-relaxed text-white/65 sm:text-base md:text-lg ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subhead}
        </motion.p>
      ) : null}
    </header>
  );
}
