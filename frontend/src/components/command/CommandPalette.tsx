"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Building2,
  ShoppingBag,
  UtensilsCrossed,
  Calendar,
  Mail,
  Search,
} from "lucide-react";
import { scrollToSection } from "@/components/providers/SmoothScroll";

const SECTIONS = [
  { id: "top", label: "Home", shortcut: "H", icon: House },
  { id: "why-this-property", label: "Property Overview", shortcut: "P", icon: Building2 },
  { id: "retail", label: "Retail & Luxury", shortcut: "R", icon: ShoppingBag },
  { id: "dining", label: "Dining & Entertainment", shortcut: "D", icon: UtensilsCrossed },
  { id: "events", label: "Events & Sponsorship", shortcut: "E", icon: Calendar },
  { id: "contact", label: "Contact", shortcut: "C", icon: Mail },
] as const;

let togglePaletteFn: (() => void) | null = null;

export function togglePalette() {
  togglePaletteFn?.();
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    togglePaletteFn = () => setOpen((v) => !v);
    return () => { togglePaletteFn = null; };
  }, []);

  const filtered = query
    ? SECTIONS
        .map((s) => {
          const lower = s.label.toLowerCase();
          const q = query.toLowerCase();
          const score = lower.startsWith(q) ? 2 : lower.includes(q) ? 1 : 0;
          return { ...s, score };
        })
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
    : [...SECTIONS];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'input, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  const optionId = (i: number) => `cmd-option-${i}`;

  const navigate = (dir: "up" | "down") => {
    if (filtered.length === 0) return;
    setActiveIdx((prev) => {
      if (dir === "down") return Math.min(prev + 1, filtered.length - 1);
      return Math.max(prev - 1, 0);
    });
  };

  useEffect(() => {
    if (!open || filtered.length === 0) return;
    const el = document.getElementById(optionId(activeIdx));
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open, filtered.length]);

  const go = (id: string) => {
    close();
    scrollToSection(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); navigate("down"); }
    if (e.key === "ArrowUp") { e.preventDefault(); navigate("up"); }
    if (e.key === "Home") { e.preventDefault(); setActiveIdx(0); }
    if (e.key === "End") { e.preventDefault(); setActiveIdx(filtered.length - 1); }
    if (e.key === "Enter" && filtered[activeIdx]) {
      go(filtered[activeIdx].id);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Go to section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[15vh]"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <svg className="h-4 w-4 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-haspopup="listbox"
                aria-controls="cmd-listbox"
                aria-activedescendant={filtered[activeIdx] ? optionId(activeIdx) : undefined}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Jump to section…"
                className="flex-1 bg-transparent text-sm text-white/90 outline-none placeholder:text-white/30"
              />
              <kbd className="hidden rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-white/30 sm:inline-block">
                ESC
              </kbd>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
                <Search className="h-6 w-6 text-white/20" />
                <span className="text-sm text-white/40">
                  No section matches &quot;{query}&quot;
                </span>
                <span className="text-[10px] text-white/25">
                  Try Home, Retail, Dining, Events, or Contact
                </span>
              </div>
            ) : (
              <ul
                ref={listRef}
                id="cmd-listbox"
                role="listbox"
                aria-label="Sections"
                className="max-h-64 overflow-y-auto py-2"
              >
                {filtered.map((section, i) => {
                  const Icon = section.icon;
                  return (
                    <li
                      key={section.id}
                      id={optionId(i)}
                      role="option"
                      aria-selected={i === activeIdx}
                    >
                      <button
                        onClick={() => go(section.id)}
                        onMouseEnter={() => setActiveIdx(i)}
                        className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors ${
                          i === activeIdx
                            ? "bg-accent/10 text-accent-soft"
                            : "text-white/70 hover:bg-white/[0.03] hover:text-white"
                        }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${
                          i === activeIdx ? "text-accent" : "text-white/30"
                        }`} />
                        <span className="flex-1">{section.label}</span>
                        <span className={`text-[10px] font-mono uppercase tracking-wider ${
                          i === activeIdx ? "text-accent/60" : "text-white/20"
                        }`}>
                          ⌘{section.shortcut}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="border-t border-white/8 px-5 py-3 text-[10px] text-white/30 flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>⌘K</span>
              <span>⎋ Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
