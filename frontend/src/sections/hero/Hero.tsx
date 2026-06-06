"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADLINE_LINES = ["Where 40 Million", "Visitors Become", "Your Audience."];

const METRICS = [
  { value: 40, suffix: "M+", label: "Annual Visitors" },
  { value: 520, suffix: "+", label: "Stores" },
  { value: 50, suffix: "+", label: "Dining Concepts" },
  { value: 14, suffix: "+", label: "Attractions" },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsValuesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoLayerRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const railLeftRef = useRef<HTMLDivElement>(null);
  const railRightRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnding, setVideoEnding] = useState(false);
  const [playbackKey, setPlaybackKey] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current.querySelectorAll("[data-anim]"),
          { y: 24, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.08 },
          0.4
        );
      }

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll("[data-word]");
        tl.fromTo(
          words,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 1.4, stagger: 0.06 },
          0.55
        );

        const accent = headlineRef.current.querySelector("[data-accent]");
        if (accent) {
          tl.fromTo(
            accent,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
            1.5
          );
        }
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.querySelectorAll("[data-cta]"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          1.7
        );
      }

      if (metricsRef.current) {
        const items = metricsRef.current.querySelectorAll("[data-metric]");
        tl.fromTo(
          items,
          { y: 28, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
          },
          1.95
        );

        tl.fromTo(
          metricsRef.current.querySelector("[data-metric-divider]"),
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.4, ease: "power3.inOut" },
          2.0
        );

        const counters = METRICS.map((m, i) => {
          const obj = { v: 0 };
          const el = metricsValuesRef.current[i];
          if (!el) return null;
          return { obj, el, target: m.value };
        }).filter(Boolean) as { obj: { v: number }; el: HTMLSpanElement; target: number }[];

        counters.forEach(({ obj, el, target }) => {
          tl.to(
            obj,
            {
              v: target,
              duration: 1.9,
              ease: "power2.out",
              onStart: () => {
                el.setAttribute("data-countup", "");
              },
              onUpdate: () => {
                el.textContent = Math.round(obj.v).toLocaleString();
              },
            },
            2.1
          );
        });
      }

      if (indicatorRef.current) {
        tl.fromTo(
          indicatorRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          2.3
        );

        gsap.to(indicatorRef.current.querySelector("[data-line]"), {
          scaleY: 0.2,
          transformOrigin: "top center",
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const parallaxConfig = (target: Element | null, yPercent: number) => {
        if (!target || !sectionRef.current) return;
        return gsap.to(target, {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      };

      // Video layer gets y-parallax + subtle zoom
      if (videoLayerRef.current) {
        gsap.to(videoLayerRef.current, {
          yPercent: 18,
          scale: 1.01,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      parallaxConfig(grainRef.current, -10);
      parallaxConfig(railLeftRef.current, -25);
      parallaxConfig(railRightRef.current, 30);
      parallaxConfig(metricsRef.current, -8);
    }, sectionRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [playbackKey]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      const dur = video.duration;
      if (!dur || !isFinite(dur)) return;
      const nearEnd = video.currentTime >= dur - 7;
      const justLooped = video.currentTime < 0.5;

      if (nearEnd && !videoEnding) {
        setVideoEnding(true);
      } else if (justLooped && videoEnding) {
        setVideoEnding(false);
        setPlaybackKey((k) => k + 1);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [videoEnding]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex h-[100svh] min-h-[720px] w-full items-center justify-center overflow-hidden bg-black"
    >
      <div
        ref={videoLayerRef}
        aria-hidden
        className="absolute inset-0 -z-30 will-change-transform"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-bg.jpg"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_35%] md:object-center"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(26,22,17,0.06) 0%, rgba(5,5,5,0.10) 40%, rgba(0,0,0,0.20) 100%)",
          }}
        />
        <div className="absolute inset-0 luxury-grain" />
        <div
          ref={grainRef}
          className="absolute inset-0 noise-overlay will-change-transform"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(120deg, transparent 0%, transparent 40%, rgba(201,169,106,0.08) 50%, transparent 60%, transparent 100%)",
            backgroundSize: "300% 100%",
            animation: "hero-shimmer 14s linear infinite",
          }}
        />
      </div>

      <motion.div
        animate={{ opacity: videoEnding ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div
            ref={railLeftRef}
            className="absolute left-6 top-1/2 hidden -translate-y-1/2 will-change-transform lg:flex lg:flex-col lg:items-center lg:gap-6"
          >
            <span className="text-[10px] uppercase tracking-[0.45em] text-white/40 [writing-mode:vertical-rl]">
              Mall of America · Bloomington, MN
            </span>
            <span className="h-16 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </div>

          <div
            ref={railRightRef}
            className="absolute right-6 top-1/2 hidden -translate-y-1/2 will-change-transform lg:flex lg:flex-col lg:items-center lg:gap-6"
          >
            <span className="h-16 w-px bg-gradient-to-b from-transparent to-white/40" />
            <span className="text-[10px] uppercase tracking-[0.45em] text-white/40 [writing-mode:vertical-rl]">
              Est. 1992 · 5.6M sq ft
            </span>
          </div>

          <div className="absolute left-1/2 top-24 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md md:flex">
            <span className="relative grid h-1.5 w-1.5 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/65">
              Now Leasing · Phase 2026
            </span>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-44 text-center sm:px-8 sm:pb-52"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div ref={eyebrowRef} className="mb-7 flex items-center gap-3 sm:mb-9">
            <span
              data-anim
              className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12"
            />
            <span
              data-anim
              className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]"
            >
              An Invitation to the Extraordinary
            </span>
            <span
              data-anim
              className="h-px w-8 bg-gradient-to-l from-transparent to-accent/70 sm:w-12"
            />
          </div>

          <h1
            ref={headlineRef}
            className="font-display text-balance text-[44px] leading-[0.95] tracking-tight text-white sm:text-7xl md:text-[88px] lg:text-[112px]"
          >
            {HEADLINE_LINES.map((line, lineIdx) => (
              <span
                key={line}
                className="block overflow-hidden pb-[0.08em]"
                aria-hidden
              >
                <span className="inline-block">
                  {line.split(" ").map((word, wordIdx) => {
                    const isAccent = lineIdx === 2 && wordIdx === 0;
                    return (
                      <span
                        key={`${line}-${word}`}
                        data-word
                        className={`inline-block ${
                          isAccent ? "shimmer-text italic" : ""
                        }`}
                      >
                        {word}
                        {wordIdx < line.split(" ").length - 1 ? "\u00A0" : ""}
                      </span>
                    );
                  })}
                  {lineIdx === 1 && (
                    <span
                      data-accent
                      className="ml-3 inline-block h-[0.04em] w-[0.55em] -translate-y-[0.18em] align-middle bg-accent/80 sm:ml-4 sm:w-[0.6em]"
                      aria-hidden
                    />
                  )}
                </span>
              </span>
            ))}
            <span className="sr-only">{HEADLINE_LINES.join(" ")}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-pretty text-sm leading-relaxed text-white/65 sm:mt-10 sm:text-base md:text-lg"
          >
            The largest shopping and entertainment destination in the United
            States. 520 stores. 50+ dining experiences. 14 attractions. One
            address that defines the modern American retail stage.
          </motion.p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:gap-4"
          >
            <a
              data-cta
              href="#book"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-black transition-all duration-500 hover:bg-accent-soft sm:w-auto"
            >
              <span className="relative z-10">Schedule a Private Tour</span>
              <span
                aria-hidden
                className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </a>
            <a
              data-cta
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/85 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.05] hover:text-white sm:w-auto"
            >
              <span>Download Media Kit</span>
              <span
                aria-hidden
                className="inline-block h-3 w-3 transition-transform duration-500 group-hover:translate-y-0.5"
              >
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-full"
                >
                  <path
                    d="M6 1.5V10.5M6 10.5L2 6.5M6 10.5L10 6.5"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>

        <motion.div
          ref={indicatorRef}
          className="pointer-events-none absolute bottom-[152px] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:bottom-[176px] sm:flex"
          aria-hidden
          style={{ opacity: contentOpacity }}
        >
          <span className="text-[10px] uppercase tracking-[0.45em] text-white/40">
            Scroll to Explore
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/10">
            <span
              data-line
              className="absolute inset-x-0 top-0 block h-full w-full bg-gradient-to-b from-accent/0 via-accent to-accent/0"
            />
          </span>
        </motion.div>

        <motion.div
          ref={metricsRef}
          className="absolute inset-x-0 bottom-0 z-10 will-change-transform"
          style={{ opacity: contentOpacity }}
          aria-label="Key metrics"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
            <div
              data-metric-divider
              className="h-px w-full origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <dl className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
              {METRICS.map((metric, i) => (
                <div
                  key={metric.label}
                  data-metric
                  className={`group flex flex-col items-start gap-1 px-4 py-5 sm:items-center sm:px-6 sm:py-7 ${
                    i === 0 ? "" : "border-l border-white/10 sm:border-l-0"
                  } ${i >= 2 ? "border-t border-white/10 sm:border-t-0" : ""}`}
                >
                  <dt className="order-2 text-[10px] uppercase tracking-[0.32em] text-white/55 sm:order-1 sm:text-[11px]">
                    {metric.label}
                  </dt>
                  <dd className="order-1 flex items-baseline gap-0.5 sm:order-2">
                    <span
                      ref={(el) => {
                        metricsValuesRef.current[i] = el;
                      }}
                      className="font-display text-3xl font-light leading-none tracking-tight text-white sm:text-5xl md:text-6xl"
                    >
                      0
                    </span>
                    <span className="font-display text-lg font-light leading-none text-accent-soft sm:text-2xl md:text-3xl">
                      {metric.suffix}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
