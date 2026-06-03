"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/sections/SectionHeader";
import {
  EVENTS_SECTION,
  EVENT_SPACES,
  SPONSORSHIP_INVENTORY,
  LEASING_OPPORTUNITIES,
  PARTNERSHIP_BENEFITS,
  TESTIMONIAL,
  CONTACT_CTA,
} from "@/data/events";

gsap.registerPlugin(ScrollTrigger);

function EventSpaceCard({
  space,
}: {
  space: (typeof EVENT_SPACES)[number];
}) {
  return (
    <article className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-6 transition-all duration-500 hover:border-accent/30 sm:p-7">
      <div
        className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.32em] text-white/45 sm:text-[11px]">
            {space.type}
          </span>
          <h3 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
            {space.name}
          </h3>
        </div>
        <span className="shrink-0 text-right font-display text-xl font-light leading-tight text-accent-soft sm:text-2xl">
          {space.capacity}
        </span>
      </div>
      <p className="relative text-sm leading-relaxed text-white/65 sm:text-base">
        {space.description}
      </p>
    </article>
  );
}

function SponsorshipCard({
  item,
}: {
  item: (typeof SPONSORSHIP_INVENTORY)[number];
}) {
  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-6 transition-all duration-500 hover:border-accent/30 sm:p-7">
      <div
        className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/45 sm:text-[11px]">
          Sponsor
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-accent-soft/70 sm:text-[11px]">
          {item.audience}
        </span>
      </div>
      <h3 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed text-white/65 sm:text-base">
        {item.description}
      </p>
    </article>
  );
}

function LeasingCard({
  opp,
}: {
  opp: (typeof LEASING_OPPORTUNITIES)[number];
}) {
  return (
    <article className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent p-6 transition-all duration-500 hover:border-accent/30 sm:p-7">
      <div
        className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.32em] text-white/45 sm:text-[11px]">
          {opp.available}
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/55 sm:text-[11px]">
          {opp.size}
        </span>
      </div>
      <h3 className="font-display text-3xl font-light leading-[1.05] tracking-tight text-white sm:text-4xl">
        {opp.category}
      </h3>
      <p className="text-sm leading-relaxed text-white/65 sm:text-base">
        {opp.description}
      </p>
    </article>
  );
}

function BenefitCard({
  item,
}: {
  item: (typeof PARTNERSHIP_BENEFITS)[number];
}) {
  return (
    <div className="relative flex flex-col border-t border-white/10 pt-6 sm:pt-8">
      <span className="text-[10px] uppercase tracking-[0.32em] text-white/45 sm:text-[11px]">
        {item.label}
      </span>
      <p className="mt-2 font-display text-2xl font-light leading-[1.2] tracking-tight text-white sm:text-3xl">
        {item.value}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
        {item.description}
      </p>
    </div>
  );
}

function ContactCta() {
  return (
    <div
      id="contact"
      className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center"
    >
      <div
        id="book"
        className="absolute -top-24"
        aria-hidden
      />
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
        <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
          {CONTACT_CTA.eyebrow}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/70 sm:w-12" />
      </div>
      <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {CONTACT_CTA.headline}
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base md:text-lg">
        {CONTACT_CTA.subhead}
      </p>
      <a
        href={CONTACT_CTA.cta.href}
        className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-white px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-black transition-all duration-500 hover:bg-accent-soft sm:text-sm"
      >
        <span className="relative z-10">{CONTACT_CTA.cta.label}</span>
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
      <p className="text-[11px] uppercase tracking-[0.32em] text-white/45 sm:text-xs">
        Mall of America · 60 E Broadway · Bloomington, MN 55425
      </p>
    </div>
  );
}

export default function EventsSponsorship() {
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
      id="events"
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
            eyebrow={EVENTS_SECTION.eyebrow}
            headline={EVENTS_SECTION.headline}
            subhead={EVENTS_SECTION.subhead}
            id="events-header"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Event Venues
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Three Venues. Endless Configurations.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              From a 2,000-guest gala in The Rotunda to an intimate 50-person
              dinner in the North Atrium. Every venue comes with full
               production support, in-house catering by MOA&apos;s culinary team,
              and dedicated event staff.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {EVENT_SPACES.map((space) => (
              <EventSpaceCard key={space.name} space={space} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Sponsorship Inventory
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Your Brand, Our Platform.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              A curated menu of sponsorship inventory — each channel designed
              to deliver measurable brand impact against a captive audience of
              40 million annual visitors.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SPONSORSHIP_INVENTORY.map((item) => (
              <SponsorshipCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Retail Leasing
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Available Now. Ready for Your Brief.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              A curated pipeline of available spaces across every category.
              Each opportunity includes the adjacency intelligence, traffic
              data, and infrastructure support your team needs to say yes
              quickly.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LEASING_OPPORTUNITIES.map((opp) => (
              <LeasingCard key={opp.category} opp={opp} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/70 sm:w-12" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent-soft/90 sm:text-[11px]">
                Partnership Model
              </span>
            </div>
            <h3 className="font-display text-balance text-3xl leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl">
              Built for the Way Brands Move Today.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              MOA&apos;s commercial partnership model is built for speed. One
              executive, one conversation, one integrated proposal across
              events, sponsorship, and leasing.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-3">
            {PARTNERSHIP_BENEFITS.map((benefit) => (
              <BenefitCard key={benefit.label} item={benefit} />
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="flex flex-col items-center gap-7 py-8 text-center sm:py-12"
        >
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
          <div className="mb-16 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent sm:mb-20" />
          <ContactCta />
        </div>
      </div>
    </section>
  );
}
