# Mall of America — Interactive Sales Deck (Frontend)

This is the frontend application for the Mall of America interactive sales deck — a premium, cinematic browser-based sales presentation built with Next.js 16, Tailwind CSS v4, Framer Motion, and GSAP.

## Getting Started

```bash
npm install
npm run dev     # local development at http://localhost:3000
npm run build   # production build
npm run lint    # run ESLint
```

## Project Structure

```
src/
  app/           # Next.js App Router (layout, pages, global styles)
  components/    # Reusable UI (Navigation, CommandPalette, Modal, etc.)
  sections/      # Page sections (Hero, WhyThisProperty, RetailLuxury, etc.)
  data/          # Typed content layer (property, retail, dining, events)
public/
  images/        # Hero background + entertainment images
  videos/        # Hero background video (H.264, 1080p)
```

## Tech Stack

| Layer | |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion, GSAP with ScrollTrigger, Lenis |
| **Icons** | Lucide React |
| **Fonts** | Geist (sans), Cormorant Garamond (display) |
| **Deployment** | Vercel |

## Content

All copy lives in typed `src/data/` files — making it CMS-ready without touching components.

## Learn More

See the [root README](../README.md) for the full project overview and live site link.
