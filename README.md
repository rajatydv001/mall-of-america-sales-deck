# Mall of America — Interactive Sales Deck

A premium, cinematic browser-based sales presentation for Mall of America — the largest shopping and entertainment destination in the United States. Designed for retail leasing, sponsorship opportunities, and event bookings.

**Target audience:** Brand executives, retail decision-makers, sponsors, and corporate partners.

---

## Live Site

https://frontend-wine-chi-26.vercel.app

---

## Sections

| Section | Headline |
|---|---|
| **Hero** | *Where 40 Million Visitors Become Your Audience.* |
| **Why This Property** | *The Asset That Defines the Category.* |
| **Retail + Luxury** | *A Roster Curated with the World's Most Considered Buyers.* |
| **Dining + Entertainment** | *A Full Day, Not a Quick Stop.* |
| **Events + Sponsorship** | *A Partnership Platform, Not Just a Property.* |
| **Contact** | Schedule a Private Briefing |

---

## Tech Stack

| Layer | |
|---|---|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion, GSAP, Lenis (smooth scroll) |
| **Icons** | Lucide React |
| **Fonts** | Geist (sans), Cormorant Garamond (display) |
| **Deployment** | Vercel |

---

## Getting Started

```bash
cd frontend
npm install
npm run dev     # local development
npm run build   # production build
```

---

## Project Structure

```
frontend/src/
  app/                  # Next.js routes, layout, global styles
  components/           # Reusable UI (Navigation, CommandPalette, Modal, etc.)
  sections/             # Page sections (hero, why-this-property, retail-luxury, etc.)
  data/                 # Content layer (property, retail, dining, events data)
public/
  images/               # Hero background + entertainment images
  videos/               # Hero background video (H.264, 1080p)
```

Content lives in typed `src/data/` files — making copy CMS-ready without touching components.
