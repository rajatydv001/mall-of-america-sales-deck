"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/sections/SectionHeader";
import {
  DINING_SECTION,
  HERO_ATTRACTIONS,
  MORE_ATTRACTIONS,
  DINING_ECOSYSTEM,
  DINING_AWARDS,
  EVENT_FACTS,
  SECTION_CTA,
  type DiningType,
} from "@/data/dining";

gsap.registerPlugin(ScrollTrigger);

function AttractionCard({
  attraction,
}: {
  attraction: (typeof HERO_ATTRACTIONS)[number];
}) {
  return (
    <article className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-6 transition-all duration-500 hover:border-accent/30 sm:p-7">
      <div
        className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
      {attraction.image ? (
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30 transition-opacity duration-700 group-hover:opacity-50"
          style={{ backgroundImage: `url(${attraction.image})` }}
          aria-hidden
        />
      ) : null}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
            {attraction.category}
          </span>
          <h3 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
            {attraction.name}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <span className="font-display text-2xl font-light leading-none text-accent-soft sm:text-3xl">
            {attraction.stat}
          </span>
          <br />
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/60 sm:text-[10px]">
            {attraction.statLabel}
          </span>
        </div>
      </div>
      <p className="relative text-sm leading-relaxed text-white/65 sm:text-base">
        {attraction.description}
      </p>
      <div
        aria-hidden
        className="relative mt-auto h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </article>
  );
}

function DiningCard({ type }: { type: DiningType }) {
  return (
    <article
      data-dining-card
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-6 transition-all duration-500 hover:border-accent/30 hover:from-white/[0.05] sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
          {type.id}
        </span>
        <span className="font-display text-2xl font-light text-accent-soft sm:text-3xl">
          {type.count}
          <span className="text-base sm:text-lg">+</span>
        </span>
      </div>
      <div className="relative">
        <h3 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
          {type.title}
        </h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/60 sm:text-xs">
          {type.tagline}
        </p>
      </div>
      <ul className="relative mt-2 flex flex-col gap-1.5">
        {type.venues.map((venue) => (
          <li
            key={venue}
            className="flex items-center gap-2 text-[13px] text-white/75 sm:text-sm"
          >
            <span className="h-px w-3 bg-accent/50" />
            <span>{venue}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function MoreAttractionCard({
  attraction,
}: {
  attraction: (typeof MORE_ATTRACTIONS)[number];
}) {
  return (
    <article className="group relative flex flex-col gap-2 overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.04] sm:p-5">
      {"image" in attraction && attraction.image ? (
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-0 transition-opacity duration-700 group-hover:opacity-30"
          style={{ backgroundImage: `url(${attraction.image})` }}
          aria-hidden
        />
      ) : null}
      <span className="relative text-[10px] uppercase tracking-[0.28em] text-white/65 transition-colors duration-500 group-hover:text-white/85 sm:text-[11px]">
        {attraction.category}
      </span>
      <h4 className="relative font-display text-xl font-light leading-[1.1] tracking-tight text-white sm:text-2xl">
        {attraction.name}
      </h4>
      <p className="relative text-[11px] leading-relaxed text-white/60 transition-colors duration-500 group-hover:text-white/80 sm:text-xs">
        {attraction.tagline}
      </p>
    </article>
  );
}

function EventStat({
  value,
  suffix,
  label,
  description,
}: {
  value: number;
  suffix: string;
  label: string;
  description: string;
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
      <span className="text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
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
      <p className="max-w-[28ch] text-[11px] leading-relaxed text-white/60 sm:text-xs">
        {description}
      </p>
    </div>
  );
}

function AwardsMarquee() {
  const items = [...DINING_AWARDS, ...DINING_AWARDS];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
      <motion.div
        className="flex w-max gap-10 py-2"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {items.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap font-display text-lg tracking-tight text-white/80 sm:text-xl"
          >
            <span>✦</span>
            <span>{phrase}</span>
          </span>
        ))}
      </motion.div>
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

export default function DiningEntertainment() {
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

      gsap.utils
        .toArray<HTMLElement>("[data-dining-card]")
        .forEach((card, i) => {
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
      id="dining"
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
            eyebrow={DINING_SECTION.eyebrow}
            headline={DINING_SECTION.headline}
            subhead={DINING_SECTION.subhead}
            id="dining-header"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Signature Attractions
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Three Experiences That Define the Destination.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              Nickelodeon Universe, Sea Life Minnesota Aquarium, and FlyOver
              America generate year-round repeat visitation — and elevate every
              brand that leases within viewing distance of their entry plazas.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {HERO_ATTRACTIONS.map((attraction) => (
              <AttractionCard
                key={attraction.name}
                attraction={attraction}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Dining Ecosystem
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              50+ Concepts — Quick to Chef-Driven.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              From the most-awarded food court in the country to
              reservation-only chef tables. Every cuisine, every price point,
              every turn of day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DINING_ECOSYSTEM.map((type) => (
              <DiningCard key={type.id} type={type} />
            ))}
          </div>
          <div data-reveal>
            <AwardsMarquee />
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                More Attractions
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Beyond the Big Three.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              A deep bench of complementary experiences keeps visitors in the
              building — and in front of your brand.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MORE_ATTRACTIONS.map((attraction) => (
              <MoreAttractionCard
                key={attraction.name}
                attraction={attraction}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div
            data-reveal
            className="flex flex-col gap-6 lg:col-span-7"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Event + Dining Synergy
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Where Dwell Time Becomes Deal Time.
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              The combination of dining and entertainment makes MOA the only
              U.S. property where a brand partner can host 200 guests for a
              private dinner, then walk them to a ride launch — all within the
              same leasehold.
            </p>
            <ul className="mt-2 flex flex-col gap-3 border-t border-white/8 pt-5 text-[11px] uppercase tracking-[0.28em] text-white/60 sm:text-xs">
              <li className="flex items-center gap-3">
                <span className="font-display text-base text-white sm:text-lg">
                  Private Dinners
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span>Up to 500 guests</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-display text-base text-white sm:text-lg">
                  Ride Buyouts
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span>Off-hours activation</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="font-display text-base text-white sm:text-lg">
                  Brand Lounges
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <span>Pop-up + permanent builds</span>
              </li>
            </ul>
          </div>
          <div
            data-reveal
            className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8 lg:col-span-5"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/60 sm:text-[11px]">
              The Performance
            </span>
            <p className="text-sm leading-relaxed text-white/65 sm:text-base">
              How dining and entertainment drive leasing value across the
              entire property.
            </p>
            <div className="flex flex-col gap-7">
              {EVENT_FACTS.map((stat) => (
                <EventStat key={stat.label} {...stat} />
              ))}
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
