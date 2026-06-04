"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/sections/SectionHeader";
import {
  HERO_STATS,
  LOCATION_FACTS,
  TENANT_PILLARS,
  PRESS_LOGOS,
  RECOGNITION,
  AUDIENCE_AGE,
  AUDIENCE_INCOME,
  AUDIENCE_ORIGIN,
  PROPERTY,
  SECTION_CTA,
} from "@/data/property";

gsap.registerPlugin(ScrollTrigger);

type StatCardProps = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  caption: string;
  decimals?: number;
};

function StatCard({ value, suffix, prefix, label, caption, decimals = 0 }: StatCardProps) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;

    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 2,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        el.textContent = obj.v.toFixed(decimals);
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [value, decimals]);

  return (
    <div className="group relative flex flex-col gap-2 border-t border-white/10 pt-5 sm:gap-3 sm:pt-7">
      <span className="text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        {prefix ? (
          <span className="font-display text-lg font-light leading-none text-accent-soft sm:text-2xl md:text-3xl">
            {prefix}
          </span>
        ) : null}
        <span
          ref={valueRef}
          className="font-display text-4xl font-light leading-none tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          0
        </span>
        <span className="font-display text-xl font-light leading-none text-accent-soft sm:text-3xl md:text-4xl">
          {suffix}
        </span>
      </div>
      <p className="max-w-[28ch] text-[11px] leading-relaxed text-white/60 sm:text-xs">
        {caption}
      </p>
    </div>
  );
}

function LocationMap() {
  const pathRef = useRef<SVGPathElement>(null);
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pathRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" });
      }

      if (planeRef.current) {
        tl.to(
          planeRef.current,
          { x: 360, y: 180, duration: 2.2, ease: "power2.inOut" },
          0
        );
      }

      [ring1Ref.current, ring2Ref.current].forEach((ring, i) => {
        if (!ring) return;
        gsap.set(ring, { scale: 0, transformOrigin: "center", opacity: 0 });
        tl.to(
          ring,
          { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out" },
          0.6 + i * 0.25
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-transparent to-accent/[0.04] p-4 sm:p-6">
      <div className="absolute inset-0 luxury-grain opacity-50" />
      <svg
        viewBox="0 0 500 400"
        className="relative h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9a96a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c9a96a" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="pin-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c9a96a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c9a96a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
          {[...Array(8)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="500" y2={i * 50} />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
          ))}
        </g>

        <circle
          ref={ring2Ref}
          cx="420"
          cy="320"
          r="130"
          stroke="rgba(201,169,106,0.2)"
          strokeWidth="1"
          strokeDasharray="3 5"
          fill="none"
        />
        <circle
          ref={ring1Ref}
          cx="420"
          cy="320"
          r="80"
          stroke="rgba(201,169,106,0.35)"
          strokeWidth="1"
          strokeDasharray="3 5"
          fill="none"
        />

        <path
          ref={pathRef}
          d="M 60 80 Q 200 120, 280 220 T 420 320"
          stroke="url(#route-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        <circle cx="60" cy="80" r="18" fill="url(#pin-grad)" />
        <circle cx="60" cy="80" r="4" fill="#c9a96a" />
        <text
          x="60"
          y="55"
          textAnchor="middle"
          className="fill-white/80"
          style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          MSP
        </text>
        <text
          x="60"
          y="105"
          textAnchor="middle"
          className="fill-white/50"
          style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          Intl. Airport
        </text>

        <g ref={planeRef} style={{ transform: "translate(0px, 0px)" }}>
          <g transform="translate(-6, -6)">
            <path
              d="M0 6 L12 8 L12 10 L0 12 L1 9 Z"
              fill="#c9a96a"
              transform="rotate(35 6 9)"
            />
          </g>
        </g>

        <circle cx="420" cy="320" r="22" fill="url(#pin-grad)" />
        <circle cx="420" cy="320" r="6" fill="#c9a96a" />
        <circle
          cx="420"
          cy="320"
          r="11"
          stroke="#c9a96a"
          strokeOpacity="0.6"
          fill="none"
        />
        <text
          x="420"
          y="370"
          textAnchor="middle"
          className="fill-white"
          style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}
        >
          MOA
        </text>
        <text
          x="420"
          y="385"
          textAnchor="middle"
          className="fill-white/50"
          style={{ fontSize: "8px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          Bloomington, MN
        </text>

        <text
          x="250"
          y="200"
          textAnchor="middle"
          className="fill-accent-soft/70"
          style={{ fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase" }}
        >
          10 min · 10 mi
        </text>
      </svg>
    </div>
  );
}

function TenantCard({
  pillar,
}: {
  pillar: (typeof TENANT_PILLARS)[number];
}) {
  return (
    <article
      data-tenant-card
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-6 transition-all duration-500 hover:border-accent/30 hover:from-white/[0.05] sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
          {pillar.id}
        </span>
        <span className="font-display text-2xl font-light text-accent-soft sm:text-3xl">
          {pillar.count}
          <span className="text-base sm:text-lg">+</span>
        </span>
      </div>
      <div className="relative">
        <h3 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
          {pillar.title}
        </h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-xs">
          {pillar.tagline}
        </p>
      </div>
      <ul className="relative mt-2 flex flex-col gap-1.5">
        {pillar.brands.map((brand) => (
          <li
            key={brand}
            className="flex items-center gap-2 text-[13px] text-white/75 sm:text-sm"
          >
            <span className="h-px w-3 bg-accent/50" />
            <span>{brand}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PressMarquee() {
  const items = [...PRESS_LOGOS, ...PRESS_LOGOS];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
      <motion.div
        className="flex w-max gap-12 py-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 38,
            ease: "linear",
          },
        }}
      >
        {items.map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.28em] text-white/60 transition-colors duration-500 hover:text-white/85 sm:text-base"
          >
            {logo.mark}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function RecognitionMarquee() {
  const items = [...RECOGNITION, ...RECOGNITION];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
      <motion.div
        className="flex w-max gap-10 py-2"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 44,
            ease: "linear",
          },
        }}
      >
        {items.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap font-display text-xl font-light tracking-tight text-white/80 sm:text-2xl"
          >
            <span>{phrase}</span>
            <span className="text-accent/60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function AudienceBar({
  band,
  color = "rgba(201,169,106,0.85)",
}: {
  band: { label: string; value: number };
  color?: string;
}) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.out",
        transformOrigin: "left center",
        paused: true,
      }
    );
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });
    return () => {
      trigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-xs">
        <span>{band.label}</span>
        <span className="font-display text-base text-white sm:text-lg">
          {band.value}
          <span className="text-xs text-white/60">%</span>
        </span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          ref={fillRef}
          className="absolute inset-y-0 left-0 w-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, rgba(245,241,234,0.6) 100%)`,
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}

function AudienceDonut() {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;
    const total = AUDIENCE_ORIGIN.reduce((sum, o) => sum + o.value, 0);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - AUDIENCE_ORIGIN[0].value / total);

    const tween = gsap.fromTo(
      circle,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: offset,
        duration: 1.8,
        ease: "power2.out",
        paused: true,
      }
    );

    const triggers: ScrollTrigger[] = [];
    AUDIENCE_ORIGIN.slice(1).forEach((segment, i) => {
      const segRef = circleRef.current?.parentElement?.querySelector(
        `[data-origin-seg="${i + 1}"]`
      ) as SVGCircleElement | null;
      if (!segRef) return;
      const segCircumference = 2 * Math.PI * 60;
      const segOffset = segCircumference * (1 - segment.value / total);
      const segTween = gsap.fromTo(
        segRef,
        { strokeDashoffset: segCircumference },
        {
          strokeDashoffset: segOffset,
          duration: 1.6,
          ease: "power2.out",
          paused: true,
        }
      );
      const trig = ScrollTrigger.create({
        trigger: circleRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          tween.play();
          segTween.play();
        },
      });
      triggers.push(trig);
    });

    const mainTrig = ScrollTrigger.create({
      trigger: circleRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });
    triggers.push(mainTrig);

    return () => {
      triggers.forEach((t) => t.kill());
      tween.kill();
    };
  }, []);

  const total = AUDIENCE_ORIGIN.reduce((sum, o) => sum + o.value, 0);
  const colors = ["#c9a96a", "#8a6d3b", "#f5f1ea"];
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const segments = AUDIENCE_ORIGIN.reduce<{
    list: { seg: (typeof AUDIENCE_ORIGIN)[number]; rotation: number; dashLength: number }[];
    cumulative: number;
  }>(
    (acc, seg) => {
      const fraction = seg.value / total;
      const dashLength = circumference * fraction;
      const rotation = (acc.cumulative / total) * 360;
      acc.list.push({ seg, rotation, dashLength });
      acc.cumulative += seg.value;
      return acc;
    },
    { list: [], cumulative: 0 }
  );

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative grid h-44 w-44 place-items-center sm:h-52 sm:w-52">
        <svg
          viewBox="0 0 160 160"
          className="absolute inset-0 h-full w-full -rotate-90"
          fill="none"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="14"
            fill="none"
          />
          {segments.list.map(({ seg, rotation, dashLength }, i) => {
            const gap = circumference - dashLength;
            return (
              <circle
                key={seg.label}
                ref={i === 0 ? circleRef : undefined}
                data-origin-seg={i}
                cx="80"
                cy="80"
                r={radius}
                stroke={colors[i]}
                strokeWidth="14"
                fill="none"
                strokeDasharray={`${dashLength} ${gap}`}
                strokeDashoffset={0}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: "center",
                }}
              />
            );
          })}
        </svg>
        <div className="text-center">
          <div className="font-display text-3xl font-light text-white sm:text-4xl">
            40M+
          </div>
          <div className="mt-1 text-[9px] uppercase tracking-[0.28em] text-white/60 sm:text-[10px]">
            Annual
          </div>
        </div>
      </div>
      <ul className="flex w-full flex-col gap-2">
        {AUDIENCE_ORIGIN.map((seg, i) => (
          <li
            key={seg.label}
            className="flex items-start gap-3 text-[11px] sm:text-xs"
          >
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ background: colors[i] }}
            />
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="uppercase tracking-[0.22em] text-white/75">
                  {seg.label}
                </span>
                <span className="font-display text-sm text-white sm:text-base">
                  {seg.value}
                  <span className="text-[10px] text-white/60">%</span>
                </span>
              </div>
              <p className="mt-0.5 text-[10px] leading-relaxed text-white/60 sm:text-[11px]">
                {seg.caption}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionCta() {
  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-7 text-center">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
        <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
          {SECTION_CTA.eyebrow}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/70 sm:w-12" />
      </div>
      <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
        {SECTION_CTA.headline}
      </h2>
      <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
        {SECTION_CTA.subhead}
      </p>
      <a
        href={SECTION_CTA.cta.href}
        className="group inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-500 hover:border-accent/60 hover:bg-accent/[0.08] hover:text-accent-soft"
      >
        <span>{SECTION_CTA.cta.label}</span>
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </div>
  );
}

export default function WhyThisProperty() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 32, opacity: 0, filter: "blur(6px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-tenant-card]").forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              delay: i * 0.08,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      }, sectionRef);
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-this-property"
      className="relative isolate w-full overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 luxury-grain opacity-30" />
        <div
          className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,169,106,0.18) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-24 sm:gap-32 sm:px-8 sm:py-32 lg:gap-40 lg:py-40">
        <div data-reveal>
          <SectionHeader
            eyebrow={PROPERTY.eyebrow}
            headline={PROPERTY.headline}
            subhead={PROPERTY.subhead}
            id="property-header"
          />
        </div>

        <div data-reveal className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                The Location
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              In the Heart of America, Minutes from Everything.
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              The most accessible address in the Upper Midwest. Direct
              light-rail from the airport, a ring road that touches both
              downtowns, and a catchment of 15 million within a day&apos;s drive.
            </p>
            <ul className="mt-2 flex flex-col divide-y divide-white/8 border-y border-white/8">
              {LOCATION_FACTS.map((fact) => (
                <li
                  key={fact.label}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 py-4"
                >
                  <span className="font-display text-2xl font-light leading-none text-accent-soft sm:text-3xl">
                    {fact.value}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-white/65 sm:text-[11px]">
                      {fact.label}
                    </span>
                    <span className="mt-0.5 text-[11px] leading-relaxed text-white/60 sm:text-xs">
                      {fact.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="lg:col-span-7">
            <LocationMap />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                The Tenant Mix
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              A Curated Roster of the World&apos;s Most Considered Brands.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              Four pillars of retail, dining, and entertainment — every name
              placed with intent, every category over-indexed against the U.S.
              mall average.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TENANT_PILLARS.map((pillar) => (
              <TenantCard key={pillar.id} pillar={pillar} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div data-reveal className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Recognition
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/70 sm:w-12" />
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Featured in the Pages That Define the Industry.
            </h3>
          </div>
          <div data-reveal className="space-y-3">
            <PressMarquee />
            <RecognitionMarquee />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                The Audience
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              40 Million Reasons a Year Walk Through Our Doors.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              A balanced demographic that mirrors the U.S. population — and an
              origin mix that puts destination visitors on the same floor as
              daily local traffic.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <div
              data-reveal
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-7"
            >
              <h4 className="mb-5 text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
                Age Distribution
              </h4>
              <div className="flex flex-col gap-3">
                {AUDIENCE_AGE.map((band) => (
                  <AudienceBar key={band.label} band={band} />
                ))}
              </div>
            </div>
            <div
              data-reveal
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-7"
            >
              <h4 className="mb-5 text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
                Household Income
              </h4>
              <div className="flex flex-col gap-3">
                {AUDIENCE_INCOME.map((band) => (
                  <AudienceBar
                    key={band.label}
                    band={band}
                    color="rgba(245,241,234,0.85)"
                  />
                ))}
              </div>
            </div>
            <div
              data-reveal
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-7"
            >
              <h4 className="mb-5 text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
                Visitor Origin
              </h4>
              <AudienceDonut />
            </div>
          </div>
        </div>

        <div data-reveal className="flex flex-col items-center pt-12 sm:pt-16">
          <div className="mb-12 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent sm:mb-16" />
          <SectionCta />
        </div>
      </div>
    </section>
  );
}
