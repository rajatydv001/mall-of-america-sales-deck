"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/sections/SectionHeader";
import {
  RETAIL_SECTION,
  TIERED_MIX,
  LUXURY_WING,
  ADJACENCY_NODES,
  ADJACENCY_EDGES,
  RECENT_OPENINGS,
  PERFORMANCE,
  TESTIMONIAL,
  SECTION_CTA,
  type RetailTier,
  type AdjacencyNode,
} from "@/data/retail";

gsap.registerPlugin(ScrollTrigger);

function TierCard({ tier }: { tier: RetailTier }) {
  return (
    <article
      data-tier-card
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-6 transition-all duration-500 hover:border-accent/30 hover:from-white/[0.05] sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/45 sm:text-[11px]">
          {tier.id}
        </span>
        <span className="font-display text-2xl font-light text-accent-soft sm:text-3xl">
          {tier.count}
          <span className="text-base sm:text-lg">+</span>
        </span>
      </div>
      <div className="relative">
        <h3 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
          {tier.title}
        </h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/55 sm:text-xs">
          {tier.tagline}
        </p>
      </div>
      <ul className="relative mt-2 flex flex-col gap-1.5">
        {tier.brands.map((brand) => (
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

function LuxuryCloud() {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-transparent to-accent/[0.04] p-6 sm:p-8">
      <div className="absolute inset-0 luxury-grain opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,169,106,0.08) 0%, transparent 65%)",
        }}
      />
      <div className="relative flex h-full w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3">
        {LUXURY_WING.brands.map((brand, i) => (
          <motion.span
            key={brand.name}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.9,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display font-light leading-none text-white transition-colors duration-500 hover:text-accent-soft"
            style={{
              fontSize: `${brand.size}rem`,
              letterSpacing: "-0.01em",
            }}
          >
            {brand.name}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function AdjacencyDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, SVGGElement>>(new Map());
  const edgeRefs = useRef<Map<string, SVGPathElement>>(new Map());

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodeTrigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          ADJACENCY_NODES.forEach((node, i) => {
            const el = nodeRefs.current.get(node.id);
            if (!el) return;
            gsap.fromTo(
              el,
              { scale: 0, opacity: 0, transformOrigin: "center center" },
              {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.12,
                ease: "back.out(1.6)",
              }
            );
          });

          ADJACENCY_EDGES.forEach((edge, i) => {
            const el = edgeRefs.current.get(`${edge.from}-${edge.to}`);
            if (!el) return;
            const length = el.getTotalLength();
            gsap.set(el, {
              strokeDasharray: length,
              strokeDashoffset: length,
              opacity: 0,
            });
            gsap.to(el, {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 1.1,
              delay: 0.4 + i * 0.15,
              ease: "power2.inOut",
            });
          });
        },
      });

      return () => {
        nodeTrigger.kill();
      };
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const findNode = (id: string) => ADJACENCY_NODES.find((n) => n.id === id);

  const buildPath = (from: AdjacencyNode, to: AdjacencyNode) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dr = Math.hypot(dx, dy) * 1.1;
    return `M ${from.x} ${from.y} A ${dr} ${dr} 0 0 1 ${to.x} ${to.y}`;
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.02] via-transparent to-accent/[0.04] p-6 sm:p-10"
    >
      <div className="absolute inset-0 luxury-grain opacity-30" />
      <svg
        viewBox="0 0 600 420"
        className="relative mx-auto h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="edge-primary" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c9a96a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c9a96a" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="edge-secondary" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5f1ea" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#f5f1ea" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c9a96a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c9a96a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
          {[...Array(9)].map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 50}
              x2="600"
              y2={i * 50}
            />
          ))}
          {[...Array(13)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="400"
            />
          ))}
        </g>

        {ADJACENCY_EDGES.map((edge) => {
          const from = findNode(edge.from);
          const to = findNode(edge.to);
          if (!from || !to) return null;
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              ref={(el) => {
                if (el) edgeRefs.current.set(`${edge.from}-${edge.to}`, el);
              }}
              d={buildPath(from, to)}
              stroke={
                edge.strength === "primary"
                  ? "url(#edge-primary)"
                  : "url(#edge-secondary)"
              }
              strokeWidth={edge.strength === "primary" ? 1.5 : 1}
              strokeDasharray={
                edge.strength === "primary" ? "0" : "4 5"
              }
              fill="none"
              strokeLinecap="round"
            />
          );
        })}

        {ADJACENCY_NODES.map((node) => (
          <g
            key={node.id}
            ref={(el) => {
              if (el) nodeRefs.current.set(node.id, el);
            }}
            transform={`translate(${node.x} ${node.y})`}
            style={{ opacity: 0 }}
          >
            <circle
              r={node.size * 0.85}
              fill="url(#node-glow)"
            />
            <circle
              r={node.size * 0.55}
              fill="rgba(8,8,8,0.85)"
              stroke="rgba(201,169,106,0.45)"
              strokeWidth="1"
            />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white"
              style={{
                fontSize: "13px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {node.label}
            </text>
            <text
              y={node.size * 0.55 + 18}
              textAnchor="middle"
              className="fill-white/45"
              style={{
                fontSize: "9px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {node.description}
            </text>
          </g>
        ))}
      </svg>

      <div className="relative mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-[11px]">
        <span className="flex items-center gap-2">
          <span className="h-px w-6 bg-accent/70" />
          Primary adjacency
        </span>
        <span className="flex items-center gap-2">
          <span className="h-px w-6 border-t border-dashed border-white/40" />
          Cross-shop flow
        </span>
      </div>
    </div>
  );
}

function PerfStat({
  value,
  prefix,
  suffix,
  label,
  caption,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  caption: string;
}) {
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
        el.textContent = Math.round(obj.v).toLocaleString();
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
  }, [value]);

  return (
    <div className="flex flex-col gap-2 border-t border-white/10 pt-5 sm:gap-3 sm:pt-7">
      <span className="text-[10px] uppercase tracking-[0.32em] text-white/45 sm:text-[11px]">
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
        {suffix ? (
          <span className="font-display text-xl font-light leading-none text-accent-soft sm:text-3xl md:text-4xl">
            {suffix}
          </span>
        ) : null}
      </div>
      <p className="max-w-[28ch] text-[11px] leading-relaxed text-white/55 sm:text-xs">
        {caption}
      </p>
    </div>
  );
}

function RecentCard({
  opening,
  index,
}: {
  opening: (typeof RECENT_OPENINGS)[number];
  index: number;
}) {
  return (
    <article
      data-recent-card
      className="group flex flex-col gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.04] sm:p-5"
      style={{ transitionDelay: `${index * 30}ms` }}
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-[11px]">
        <span>{opening.category}</span>
        <span className="text-accent-soft/70">{opening.opened}</span>
      </div>
      <h4 className="font-display text-2xl font-light leading-[1.1] tracking-tight text-white sm:text-3xl">
        {opening.brand}
      </h4>
      <p className="text-[11px] leading-relaxed text-white/55 sm:text-xs">
        {opening.tagline}
      </p>
    </article>
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

export default function RetailLuxury() {
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

      gsap.utils.toArray<HTMLElement>("[data-tier-card]").forEach((card, i) => {
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

      gsap.utils.toArray<HTMLElement>("[data-recent-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
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
      id="retail"
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
            eyebrow={RETAIL_SECTION.eyebrow}
            headline={RETAIL_SECTION.headline}
            subhead={RETAIL_SECTION.subhead}
            id="retail-header"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                The Curated Mix
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Four Tiers, One Curatorial Standard.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              Every brand here was placed by intent — not by default lease-up.
              The result is a roster that reads more like a luxury street than a
              U.S. mall.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIERED_MIX.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                {LUXURY_WING.eyebrow}
              </span>
            </div>
            <h3 className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              {LUXURY_WING.headline}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              {LUXURY_WING.subhead}
            </p>
            <ul className="mt-2 flex flex-col gap-3 border-t border-white/8 pt-5 text-[11px] uppercase tracking-[0.28em] text-white/55 sm:text-xs">
              <li className="flex items-center gap-3">
                <span className="font-display text-base text-white sm:text-lg">
                  By Appointment
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span>Available for select brands</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-display text-base text-white sm:text-lg">
                  Valet + Concierge
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span>Direct wing access</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-display text-base text-white sm:text-lg">
                  Champagne Bar
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span>Adjacent dwell moment</span>
              </li>
            </ul>
          </div>
          <div data-reveal className="lg:col-span-7">
            <LuxuryCloud />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Adjacency
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Placed Adjacent to the Categories That Lift Sales.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              A merchandising strategy that places luxury next to the F&amp;B
              and entertainment destinations that drive dwell — and flagships
              next to specialty concepts that introduce discovery.
            </p>
          </div>
          <div data-reveal>
            <AdjacencyDiagram />
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div data-reveal className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                  Momentum
                </span>
              </div>
              <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
                New Names, New Concepts, New Flagships.
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
                The most active leasing book in the property&apos;s recent
                history. The brands below opened, refreshed, or expanded in
                the last 24 months.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {RECENT_OPENINGS.map((opening, i) => (
                <RecentCard
                  key={opening.brand}
                  opening={opening}
                  index={i}
                />
              ))}
            </div>
          </div>
          <div
            data-reveal
            className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8 lg:col-span-5"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/55 sm:text-[11px]">
              The Performance
            </span>
            <p className="text-sm leading-relaxed text-white/65 sm:text-base">
              The numbers behind the merchandising. Every category measured
              against the U.S. mall benchmark — and outpacing it.
            </p>
            <div className="flex flex-col gap-7">
              {PERFORMANCE.map((stat) => (
                <PerfStat
                  key={stat.label}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                  caption={stat.caption}
                />
              ))}
            </div>
          </div>
        </div>

        <div data-reveal className="flex flex-col items-center gap-7 py-8 text-center sm:py-12">
          <span className="font-display text-3xl text-accent-soft/60">✦</span>
          <blockquote className="mx-auto max-w-4xl">
            <p className="font-display text-balance text-2xl font-light italic leading-[1.2] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              &ldquo;{TESTIMONIAL.quote}&rdquo;
            </p>
          </blockquote>
          <div className="flex flex-col items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
            <span className="text-[11px] uppercase tracking-[0.32em] text-white/65 sm:text-xs">
              {TESTIMONIAL.attribution}
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-[11px]">
              {TESTIMONIAL.role}
            </span>
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
