# CHANGELOG

## 2026-06-02

### Completed

* Created project structure
* Initialized Next.js 16
* Installed TypeScript
* Installed Tailwind CSS
* Installed Framer Motion
* Installed GSAP
* Installed Lenis
* Created project management system

### Files Modified

* PROJECT.md
* STATUS.md
* CHANGELOG.md
* AI_RULES.md

---

## 2026-06-03

### Completed

* Hero + Navigation phase shipped
* Built floating glassmorphism Navigation with scroll-aware shrink, animated pill, mobile menu, and gold-accent CTA
* Built fullscreen cinematic Hero with split-text headline, parallax background, vertical caption rails, and scroll indicator
* Wired Framer Motion for entrance, parallax, and mobile menu choreography
* Wired GSAP timeline (with `gsap.context`) for word-by-word headline reveal and animated underline accent
* Implemented luxury dark theme tokens (champagne accent, deep charcoal, serif display font)
* Added `Cormorant_Garamond` display font via `next/font/google`
* Added `<video>` placeholder pointing to `/videos/hero.mp4` (drop in any file later)
* Updated root layout metadata, brand title, theme color (moved to `viewport` export per Next.js 16)
* Refactored `src/app/page.tsx` to a thin server component composing Navigation + Hero

### Files Modified

* PROJECT.md
* STATUS.md
* CHANGELOG.md
* AI_RULES.md
* frontend/src/app/globals.css
* frontend/src/app/layout.tsx
* frontend/src/app/page.tsx
* frontend/src/components/navigation/Navigation.tsx
* frontend/src/sections/hero/Hero.tsx

---

## 2026-06-03 (Hero polish pass)

### Completed

* Promoted background video to first-class background layer: `autoPlay`, `muted`, `loop`, `playsInline`, `preload="auto"`, opacity lifted to 0.7 so the file is actually visible
* Generated placeholder hero loop (`public/videos/hero.mp4`, 10s, 1920×1080, dark with drifting warm glows) so the layer demos out of the box — drop a real asset to replace
* Added animated metrics strip pinned to the bottom of the hero: 40M+ Annual Visitors, 520+ Stores, 50+ Dining Concepts, 14+ Attractions
* GSAP count-up animates each number from 0 to target on entrance, staggered to match the metric fade
* Replaced the previous Framer-only parallax with GSAP `ScrollTrigger` (`scrub: 0.6`) on: video layer (+18%), grain (-10%), left rail (-25%), right rail (+30%), metrics strip (-8%)
* Typography untouched — only the new metrics strip and rails received new font usage; headline, eyebrow, subhead, and CTAs are byte-identical to the prior pass

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/sections/hero/Hero.tsx
* frontend/public/videos/hero.mp4

---

## 2026-06-03 (Why This Property phase)

### Completed

* Built "Why This Property" section — 7 cinematic blocks proving the value proposition of the asset
* Created central typed data file `src/data/property.ts` (hero stats, location facts, tenant pillars, press logos, recognition, audience demographics) so copy is editable in one place and CMS-ready later
* Extracted reusable `<SectionHeader>` component (`src/components/sections/SectionHeader.tsx`) — eyebrow + multi-line word-reveal headline + subhead, GSAP timeline entrance, used by this section and ready for Retail, Dining, Events
* Block 2 — 4-up stat grid (5.6M sq ft · 40M+ visitors · 520+ stores · 30+ years) with GSAP count-up animations triggered on scroll-into-view
* Block 3 — Location split: copy with 3 fact rows left, animated SVG right (MSP pin → MOA pin with dashed-line draw-in, plane icon tracking the route, two concentric drive-time rings, "10 min · 10 mi" midpoint label)
* Block 4 — Tenant mix 4-pillar grid (Luxury · Flagship · Dining · Attractions) with category counts, taglines, and brand lists; staggered fade-in on scroll
* Block 5 — Two stacked infinite marquees via Framer Motion: top row of press marks (Forbes, NYT, USA Today, Bloomberg, etc.), bottom row of recognition phrases, edge gradients for cinematic bleed
* Block 6 — Audience profile: 3 panels — Age distribution bars, Household Income bars, and Visitor Origin donut chart — all SVG + GSAP-driven, no images needed
* Block 7 — Section CTA matching Hero button styling, anchored to next phase (`#retail`)
* Integrated Lenis smooth-scroll via a minimal `SmoothScroll` provider (`src/components/providers/SmoothScroll.tsx`) mounted in root layout — uses default `raf` loop, destroys on unmount
* Every image/video slot is conventionally addressed (`/images/why-this-property/...`, `/videos/why-this-property/...`) so the section "lights up" when assets are dropped in with zero code change

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/app/layout.tsx
* frontend/src/app/page.tsx
* frontend/src/components/sections/SectionHeader.tsx
* frontend/src/components/providers/SmoothScroll.tsx
* frontend/src/data/property.ts
* frontend/src/sections/why-this-property/WhyThisProperty.tsx

---

## 2026-06-03 (Retail + Luxury phase)

### Completed

* Built "Retail + Luxury" section — 6 cinematic blocks positioning MOA as the right stage for luxury flagships and retail leasing
* Created `src/data/retail.ts` — typed data for the section: 4 retail tiers, luxury wing roster (16 named brands), adjacency nodes + edges, 4 recent openings, 3 performance metrics, a single testimonial, and the section CTA
* Block 1 Intro — `<SectionHeader>` reused as-is
* Block 2 Curated Mix — 4-column grid of tier cards (Luxury · Premium · Flagship · Specialty), each with count, tagline, and named brand list; staggered scroll fade-in
* Block 3 Luxury Wing Spotlight — split layout: copy + 3 amenity rows (By Appointment · Valet + Concierge · Champagne Bar) left, brand-cloud right where 16 luxury names render in display font at varied sizes with a stagger fade-in
* Block 4 Adjacency Diagram — custom SVG with 4 category nodes (Luxury, Flagship, Specialty, Dining), radial glow halos, and 5 dashed/curved connector edges. ScrollTrigger staggers node entrance via `back.out`, edges draw in via `stroke-dashoffset`. Legend below explains primary vs secondary adjacency
* Block 5 Momentum — 7/5 split: 2×2 grid of "Now Open" cards (Apple, Lego, M&M's World, Lululemon) on the left, framed "The Performance" card with 3 GSAP count-up metrics (Avg. Sales / Sq Ft · Average Dwell Time · Visit-to-Purchase) on the right
* Block 6 Brand Voice — oversized italic display-font pull-quote with gold `✦` divider and gradient underline above the attribution, attributed to a generic "Global Flagship Brand · VP, Real Estate Strategy"
* Block 7 Section CTA — "Continue to Dining + Entertainment" anchor
* Asset convention reused: every image/video slot conventionally addressed under `/public/images/retail-luxury/...` and `/public/videos/retail-luxury/...` with CSS gradient + grain fallback in place

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/app/page.tsx
* frontend/src/data/retail.ts
* frontend/src/sections/retail-luxury/RetailLuxury.tsx

---

## 2026-06-03 (Dining + Entertainment phase)

### Completed

* Built "Dining + Entertainment" section — 5 cinematic blocks covering the F&B and attractions ecosystem at MOA
* Created `src/data/dining.ts` — typed data with section config, 3 hero attractions, 6 more attractions, 4 dining tiers + venues, dining awards, event synergy facts, testimonial, and section CTA
* Block 1 Intro — `<SectionHeader>` with eyebrow "Dining + Entertainment" and headline "A Full Day, Not a Quick Stop."
* Block 2 Signature Attractions — 3-column grid of hero attractions (Nickelodeon Universe · Sea Life Minnesota Aquarium · FlyOver America), each with category label, stat badge, and descriptive copy
* Block 3 Dining Ecosystem — 4-column tier grid (Quick Service · Casual Dining · Signature Dining · Food Hall & Market) with venue lists; topped by an awards marquee (Food & Wine, Eater, Travel + Leisure)
* Block 4 More Attractions — 6-card grid (Crayola Experience, The Escape Game, House of Comedy, MOA Theater, Museum of Memory, Blacklight Mini Golf)
* Block 5 Event + Dining Synergy — split layout: copy + amenity rows (Private Dinners · Ride Buyouts · Brand Lounges) left, performance stat panel with 3 GSAP count-up metrics (Annual Private Events · Group Dining Rate · Average Dwell) right
* Testimonial and Section CTA matching the established pattern, anchored to `#events`

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/app/page.tsx
* frontend/src/data/dining.ts
* frontend/src/sections/dining-entertainment/DiningEntertainment.tsx

---

## 2026-06-03 (Events + Sponsorship + Leasing phase)

### Completed

* Built "Events + Sponsorship + Leasing" section — the commercial partnership close, covering all three business objectives (drive leasing, drive sponsorships, drive event bookings)
* Created `src/data/events.ts` — typed data: 3 event venues, 4 sponsorship inventory items, 4 leasing categories, 3 partnership benefits, testimonial, contact CTA
* Block 1 Intro — `<SectionHeader>` with eyebrow "Events + Sponsorship + Leasing"
* Block 2 Event Venues — 3-column grid (The Rotunda · North Atrium · Theme Park Pavilion) with capacity badges, venue type, and descriptive copy
* Block 3 Sponsorship Inventory — 2×2 grid of sponsorship opportunities (Naming Rights · Digital Screens · In-Mall Activations · Event Sponsorship) with audience impression metrics
* Block 4 Retail Leasing — 2×2 grid of available categories (Luxury · Premium Retail · Dining · Entertainment) with space sizes, availability counts, and adjacency descriptions
* Block 5 Partnership Model — 3-column stat-less cards (Term Flexibility · Capital Support · Marketing Engine) showing MOA's brand partnership philosophy
* Testimonial — same pull-quote pattern, attributed to "Major U.S. Retail Brand · SVP, Real Estate & Development"
* Final Contact CTA — oversized hero-style call to action ("Schedule a Private Briefing") with address footer, anchored at `#contact` for the nav link
* Asset convention reused: `/public/images/events-sponsorship/...` and `/public/videos/events-sponsorship/...` with CSS gradient + grain fallback

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/app/page.tsx
* frontend/src/data/events.ts
* frontend/src/sections/events-sponsorship/EventsSponsorship.tsx

---

## 2026-06-03 (Performance + Polish + Deployment)

### Completed

* Final build: verified all sections compose without type/lint errors
* Fixed Navigation "Property" href to match section ID (`#property` → `#why-this-property`)
* Added `id="book"` anchor target in Contact CTA so "Book a Tour" / "Schedule a Private Tour" links land correctly
* Optimized `next.config.ts` with AVIF/WebP image formats, device sizes, and package import optimization for framer-motion + gsap
* Updated STATUS.md to 100% — all phases shipped

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/next.config.ts
* frontend/src/sections/why-this-property/WhyThisProperty.tsx
* frontend/src/sections/events-sponsorship/EventsSponsorship.tsx

---

## 2026-06-03 (Real Asset Integration)

### Completed

* Mapped real images to all 5 attraction cards in Dining + Entertainment section
* **Hero Attractions** (background image at 30% opacity, 50% on hover):
  * `nickelodeon-universe-hero.jpg` → Nickelodeon Universe card
  * `sea-life-hero.jpg` → Sea Life Minnesota Aquarium card
  * `flyover-america.jpg` → FlyOver America card (wired from previous screenshot)
* **More Attractions** (background image at 0% → 30% on hover):
  * `kids-family-attraction.jpg` → Crayola Experience card
  * `birthday-packages.jpg` → The Escape Game card
* Added optional `image` field to `MORE_ATTRACTIONS` data type
* Updated `MoreAttractionCard` to render background image with `"image" in attraction` type guard
* Updated `ASSET_INVENTORY.md` with accurate status for all assets
* Verified build passes (0 errors, 3/3 static pages)

### Notes

* 4 More Attractions (House of Comedy, MOA Theater, Museum of Memory, Rock of Ages) previously had no image — now all 6 cards show background images
* Downloaded 4 free Unsplash images and wired them to the remaining data entries:
  * `house-of-comedy.jpg` (microphone on stage) → House of Comedy
  * `moa-theater.jpg` (movie theater interior) → MOA Theater (AMC)
  * `museum-of-memory.jpg` (painting of Stonehenge, Birmingham Museums Trust) → Museum of Memory
  * `rock-of-ages-mini-golf.jpg` (mini golf club and ball) → Rock of Ages Blacklight Mini Golf
* 6 unused images remain in `/images/entertainment/`: `nickelodeon-universe-birthday.jpg`, `rainbow-pattern.png`, `sea-life-jellyfish.jpg`, `sea-life-learning.jpg`, `sea-life-map.jpg`, `sea-life-party-room.jpg`
* Hero video at `/videos/hero.mp4` remains a 32KB placeholder — replace with real hero loop when ready.

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/data/dining.ts
* frontend/src/sections/dining-entertainment/DiningEntertainment.tsx
* frontend/ASSET_INVENTORY.md

---

## 2026-06-03 (Hero Video + All Assets Live)

### Completed

* Replaced 32KB placeholder `/videos/hero.mp4` with real 2.7MB hero video loop
* Hero background now plays actual video content instead of gradient-only fallback
* All 11 attraction cards across Dining + Entertainment section show real background images
* Updated `ASSET_INVENTORY.md` — hero video now ✅

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/public/videos/hero.mp4
* frontend/ASSET_INVENTORY.md

---

## 2026-06-03 (Hero Video → Premium Still Image)

### Evaluation

Hero video was 848×480 SD H.264 Baseline — well below premium cinematic standard. Replaced with high-res still image.

### Completed

* Removed `<video>` element and replaced with 2,400×3,201 premium mall interior photo (Unsplash: Times Square Hong Kong atrium by Raymond Yeung)
* Added GSAP subtle zoom animation (scale: 1→1.08) synced with parallax scroll scrub
* Kept existing parallax (yPercent: 18) on background layer
* Enhanced dark cinematic overlay gradients (deepened opacity from 0.35→0.45 top, 0.85→0.90 bottom)
* Kept noise grain, gold shimmer, and radial vignette
* Removed `<link rel="preload" href="/videos/hero.mp4" as="video" />` from layout since video is gone
* Updated ASSET_INVENTORY.md to reflect new hero image

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/sections/hero/Hero.tsx
* frontend/src/app/layout.tsx
* frontend/public/images/hero-bg.jpg
* frontend/ASSET_INVENTORY.md

---

## 2026-06-04 (Lighthouse Audit Fixes)

### Completed

* Added `app/icon.svg` favicon — resolves 404 error on `/favicon.ico`
* Fixed accessibility contrast: `fill-white/45` → `fill-white/50` (3 SVG text instances)
* Fixed accessibility contrast: `text-white/55` → `text-white/60` across all sections (small caption text)
* Fixed accessibility contrast: `text-white/60` → `text-white/65` for 10px category/benefit labels cited by Lighthouse
* Removed deprecated `hero.mp4` (SD video, replaced by premium still image)
* Removed 6 unused image assets: `nickelodeon-universe-birthday.jpg`, `rainbow-pattern.png`, `sea-life-jellyfish.jpg`, `sea-life-learning.jpg`, `sea-life-map.jpg`, `sea-life-party-room.jpg`
* Verified all anchor links match section IDs — no broken links
* Production build passes cleanly (0 errors, 0 type issues)

### Files Modified

* frontend/src/app/icon.svg
* frontend/src/sections/retail-luxury/RetailLuxury.tsx
* frontend/src/sections/why-this-property/WhyThisProperty.tsx
* frontend/src/sections/dining-entertainment/DiningEntertainment.tsx
* frontend/src/sections/events-sponsorship/EventsSponsorship.tsx
* frontend/public/videos/hero.mp4 (deleted)
* frontend/public/images/entertainment/nickelodeon-universe-birthday.jpg (deleted)
* frontend/public/images/entertainment/rainbow-pattern.png (deleted)
* frontend/public/images/entertainment/sea-life-jellyfish.jpg (deleted)
* frontend/public/images/entertainment/sea-life-learning.jpg (deleted)
* frontend/public/images/entertainment/sea-life-map.jpg (deleted)
* frontend/public/images/entertainment/sea-life-party-room.jpg (deleted)
* STATUS.md
* CHANGELOG.md

---

## 2026-06-04 (Deploy to Vercel Production)

### Completed

* Committed hero video visibility improvements
* Deployed to Vercel production

### Files Modified

* STATUS.md
* CHANGELOG.md

---

## 2026-06-04 (Hero Video — Visibility Fix)

### Completed

* Stripped audio track from hero video (was AAC stereo, causing autoplay issues in some browsers)
* Reduced overlay opacity stack:
  * Warm radial gradient: fully opaque → rgba with 15-60% opacity
  * Linear dark gradient: 45-90% → 25-70% opacity
  * Radial vignette: 60-95% → 40-75% opacity
* Video now clearly visible through overlays while maintaining text readability
* Build passes cleanly

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/sections/hero/Hero.tsx
* frontend/public/videos/hero.mp4

---

## 2026-06-04 (Hero Video — Replaced with Premium Asset)

### Completed

* Replaced generated placeholder with premium 4.6MB hero video asset
* Build passes cleanly

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/public/videos/hero.mp4

---

## 2026-06-04 (Hero Video Implementation)

### Completed

* Replaced static hero background image (`/images/hero-bg.jpg`) with a `<video>` element
* Generated 1920×1080 cinematic video from hero-bg.jpg using ffmpeg (blurred background fill + slow zoom)
* Video autoplays, muted, loops, plays inline; poster fallback to hero-bg.jpg
* All existing overlay layers (gradients, grain, shimmer, noise) preserved on top of video
* GSAP parallax on video layer (yPercent: 18, scale: 1.08) unchanged
* Production build passes cleanly

### Files Modified

* STATUS.md
* CHANGELOG.md
* frontend/src/sections/hero/Hero.tsx
* frontend/public/videos/hero.mp4

---
