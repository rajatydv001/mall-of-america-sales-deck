export const EVENTS_SECTION = {
  eyebrow: "Events + Sponsorship + Leasing",
  headline: [
    "A Partnership Platform,",
    "Not Just a Property.",
    "Built for the World's Best Brands.",
  ],
  subhead:
    "Private events, brand activations, sponsorship inventory, and retail leasing — every commercial opportunity at Mall of America, structured for flexibility and impact.",
};

export const EVENT_SPACES = [
  {
    name: "The Rotunda",
    capacity: "2,000 guests",
    type: "Grand Event Space",
    description:
      "The iconic center court under the skylight. Used for brand launches, galas, broadcast activations, and product reveals. Full production rigging, 4K video walls, and direct mall-wide audio integration.",
  },
  {
    name: "North Atrium",
    capacity: "500 guests",
    type: "Flexible Event Venue",
    description:
      "A modular space adjacent to the luxury wing. Ideal for private dinners, fashion shows, VIP brand salons, and seated presentations. Configurable to theater, banquet, or reception layouts.",
  },
  {
    name: "Theme Park Pavilion",
    capacity: "1,000 guests",
    type: "Experiential Venue",
    description:
      "An exclusive buyout of Nickelodeon Universe rides and surrounding dining. The only indoor theme-park event venue in North America — ride launches, private ride time, and branded takeover of the park's central plaza.",
  },
] as const;

export const SPONSORSHIP_INVENTORY = [
  {
    title: "Naming Rights",
    description:
      "Signature sponsorship of landmark spaces, seasonal installations, and annual signature events with year-round brand visibility.",
    audience: "40M annual impressions",
  },
  {
    title: "Digital Screens",
    description:
      "Full-motion digital panels across all four retail wings, center court, food hall, and parking concourses. Programmatic or fixed placement.",
    audience: "2.3M monthly impressions",
  },
  {
    title: "In-Mall Activations",
    description:
      "Pop-up build-outs, sampling stations, interactive installations, and brand lounges. Short-term to seasonal commitments with full marketing support.",
    audience: "87 min avg dwell",
  },
  {
    title: "Event Sponsorship",
    description:
      "Official partnership of MOA's signature annual events: Holiday Spectacular, Summer Concert Series, Fashion Week, and seasonal brand launches.",
    audience: "50+ annual events",
  },
] as const;

export const LEASING_OPPORTUNITIES = [
  {
    category: "Luxury",
    available: "3 Atelier Spaces",
    size: "2,500 – 8,000 sq ft",
    description:
      "Adjacent to the existing luxury wing with direct valet access, concierge services, and Champagne Bar adjacency.",
  },
  {
    category: "Premium Retail",
    available: "6 Flagship Slots",
    size: "4,000 – 15,000 sq ft",
    description:
      "High-traffic corridors on Levels 1 and 2, near Nordstrom, Apple, and Bloomingdale's anchor positions.",
  },
  {
    category: "Dining",
    available: "4 Signature Spaces",
    size: "3,000 – 7,000 sq ft",
    description:
      "Full-turnkey chef-ready spaces with patio access, dedicated service corridors, and integrated venting.",
  },
  {
    category: "Entertainment",
    available: "1 Major Space",
    size: "12,000 – 25,000 sq ft",
    description:
      "Adjacent to Nickelodeon Universe. Ideal for immersive or experiential concepts requiring high ceiling clearance.",
  },
] as const;

export const PARTNERSHIP_BENEFITS = [
  {
    value: "Short-term pop-ups to multi-year flagships",
    label: "Term Flexibility",
    description:
      "Pop-up licenses for seasonal activations. Multi-year flagships for brand-defining footprints. Revenue-share, license, and traditional lease structures.",
  },
  {
    value: "Custom build-to-suit with landlord contribution",
    label: "Capital Support",
    description:
      "MOA invests in your success. Build-to-suit allowances, TI packages, and expedited permitting for qualifying concepts.",
  },
  {
    value: "Integrated marketing support from an in-house team",
    label: "Marketing Engine",
    description:
      "Dedicated brand marketing, PR, and social team to amplify your opening, activation, or event across MOA's owned channels and through national media partnerships.",
  },
] as const;

export const CONTACT_CTA = {
  eyebrow: "Start the Conversation",
  headline: "The Address That Defines the Category.",
  subhead:
    "One conversation can change the center of gravity for your brand. Let's talk about what's possible.",
  cta: { label: "Schedule a Private Briefing", href: "#contact" },
};
