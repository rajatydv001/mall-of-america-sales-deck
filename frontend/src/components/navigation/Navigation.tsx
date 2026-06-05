"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { togglePalette } from "@/components/command/CommandPalette";

const NAV_LINKS = [
  { label: "Property", href: "#why-this-property" },
  { label: "Retail", href: "#retail" },
  { label: "Dining", href: "#dining" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("#why-this-property");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 sm:pt-6"
      >
        <motion.nav
          initial={false}
          animate={{
            width: scrolled ? "min(880px, calc(100% - 2rem))" : "min(1180px, calc(100% - 2rem))",
            backgroundColor: scrolled
              ? "rgba(8, 8, 8, 0.72)"
              : "rgba(8, 8, 8, 0.32)",
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-between gap-6 rounded-full border border-white/8 px-5 py-2.5 backdrop-blur-xl backdrop-saturate-150 sm:px-7 sm:py-3"
          style={{
            boxShadow: scrolled
              ? "0 24px 60px -20px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "0 8px 32px -16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Mall of America"
          >
            <span className="relative grid h-7 w-7 place-items-center rounded-full border border-accent/40 bg-gradient-to-br from-accent/20 to-transparent">
              <span className="font-display text-[13px] font-medium leading-none text-accent-soft">
                M
              </span>
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/5" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[10px] uppercase tracking-[0.32em] text-white/55">
                Mall of
              </span>
              <span className="font-display text-sm font-medium tracking-wide text-white">
                America
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setActive(link.href)}
                    className="group relative inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/8"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePalette}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/50 transition-colors hover:border-white/25 hover:text-white/80"
              aria-label="Open command palette"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span>Search</span>
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-mono text-white/30">
                ⌘K
              </kbd>
            </button>

            <a
              href="#book"
              className="group relative hidden items-center gap-2 overflow-hidden rounded-full border border-accent/40 bg-gradient-to-br from-accent/20 to-accent/5 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-accent-soft transition-all duration-500 hover:border-accent/80 hover:from-accent/30 hover:to-accent/10 sm:inline-flex"
            >
              <span className="relative z-10">Book a Tour</span>
              <span className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-0.5">
                →
              </span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/80 transition-colors hover:border-white/25 hover:text-white lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                    mobileOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-300 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                    mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-24 z-40 origin-top rounded-2xl border border-white/8 bg-black/85 p-6 backdrop-blur-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => {
                      setActive(link.href);
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <span>{link.label}</span>
                    <span className="text-white/30">↗</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#book"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-gradient-to-br from-accent/20 to-accent/5 px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-accent-soft"
            >
              Book a Tour <span>→</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
