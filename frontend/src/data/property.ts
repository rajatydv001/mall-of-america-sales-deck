export type HeroStat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  caption: string;
};

export type LocationFact = {
  value: string;
  label: string;
  description: string;
};

export type TenantPillar = {
  id: "luxury" | "flagship" | "dining" | "entertainment";
  title: string;
  tagline: string;
  count: number;
  brands: string[];
};

export type PressLogo = {
  name: string;
  mark: string;
};

export type AudienceBand = {
  label: string;
  value: number;
};

export type AudienceOrigin = {
  label: string;
  value: number;
  caption: string;
};

export const PROPERTY = {
  eyebrow: "The Property",
  headline: ["The Asset", "That Defines", "the Category."],
  subhead:
    "A 5.6-million-square-foot stage where 40 million annual visitors shop, dine, and gather. The single most-visited retail destination in the United States — and the most efficient stage your brand can stand on.",
};

export const HERO_STATS: HeroStat[] = [
  {
    value: 5.6,
    suffix: "M",
    label: "Gross Leasable Sq Ft",
    caption: "Largest enclosed mall in the United States",
  },
  {
    value: 40,
    suffix: "M+",
    label: "Annual Visitors",
    caption: "More visitors annually than the populations of 23 U.S. states",
  },
  {
    value: 520,
    suffix: "+",
    label: "Stores & Experiences",
    caption: "From global flagships to emerging independent concepts",
  },
  {
    value: 30,
    suffix: "+",
    label: "Years of Operation",
    caption: "Operating continuously since August 11, 1992",
  },
];

export const LOCATION_FACTS: LocationFact[] = [
  {
    value: "10 min",
    label: "from MSP Airport",
    description:
      "Direct light-rail connection via the METRO Blue Line drops visitors at our front door.",
  },
  {
    value: "15 mi",
    label: "from Downtown Minneapolis",
    description:
      "Minutes from both downtowns, with on-site parking for 12,000+ vehicles.",
  },
  {
    value: "15M+",
    label: "within a Day's Drive",
    description:
      "Catchment spanning the Upper Midwest, the Plains states, and Canadian border markets.",
  },
];

export const TENANT_PILLARS: TenantPillar[] = [
  {
    id: "luxury",
    title: "Luxury",
    tagline: "Flagship houses & atelier spaces",
    count: 40,
    brands: [
      "Tiffany & Co.",
      "Coach",
      "Kate Spade",
      "Michael Kors",
      "Burberry",
      "Louis Vuitton",
    ],
  },
  {
    id: "flagship",
    title: "Flagship Retail",
    tagline: "Brand-defining destination stores",
    count: 180,
    brands: [
      "Apple",
      "Microsoft",
      "Nordstrom",
      "Bloomingdale's",
      "Macy's",
      "Lululemon",
    ],
  },
  {
    id: "dining",
    title: "Dining & F&B",
    tagline: "From quick-service to chef-driven",
    count: 50,
    brands: [
      "The Cheesecake Factory",
      "Shake Shack",
      "CRAVE",
      "Twin Cities Burger Co.",
      "Sushi Fix",
      "Café Nordstrom",
    ],
  },
  {
    id: "entertainment",
    title: "Attractions & Entertainment",
    tagline: "A full day, not a quick stop",
    count: 14,
    brands: [
      "Nickelodeon Universe",
      "Sea Life Minnesota",
      "FlyOver America",
      "Crayola Experience",
      "MOA Theater",
      "House of Comedy",
    ],
  },
];

export const PRESS_LOGOS: PressLogo[] = [
  { name: "Forbes", mark: "FORBES" },
  { name: "The New York Times", mark: "THE NEW YORK TIMES" },
  { name: "USA Today", mark: "USA TODAY" },
  { name: "Travel + Leisure", mark: "TRAVEL + LEISURE" },
  { name: "Bloomberg", mark: "BLOOMBERG" },
  { name: "Condé Nast Traveler", mark: "CONDÉ NAST TRAVELER" },
  { name: "The Wall Street Journal", mark: "THE WALL STREET JOURNAL" },
  { name: "Time", mark: "TIME" },
  { name: "Architectural Digest", mark: "ARCHITECTURAL DIGEST" },
  { name: "Fast Company", mark: "FAST COMPANY" },
];

export const RECOGNITION = [
  "Most Visited Mall in the United States",
  "Largest Shopping & Entertainment Complex in the U.S.",
  "Top Tourist Destination in Minnesota",
  "Most Instagrammed Mall in North America",
];

export const AUDIENCE_AGE: AudienceBand[] = [
  { label: "Under 18", value: 22 },
  { label: "18 – 24", value: 18 },
  { label: "25 – 34", value: 21 },
  { label: "35 – 44", value: 17 },
  { label: "45 – 54", value: 12 },
  { label: "55+", value: 10 },
];

export const AUDIENCE_INCOME: AudienceBand[] = [
  { label: "< $50K", value: 18 },
  { label: "$50K – $75K", value: 24 },
  { label: "$75K – $100K", value: 22 },
  { label: "$100K – $150K", value: 21 },
  { label: "$150K+", value: 15 },
];

export const AUDIENCE_ORIGIN: AudienceOrigin[] = [
  {
    label: "Local",
    value: 55,
    caption: "Twin Cities metro & immediate suburbs",
  },
  {
    label: "Regional Drive",
    value: 32,
    caption: "MN, WI, IA, SD, ND within a 4-hour drive",
  },
  {
    label: "Tourist & International",
    value: 13,
    caption: "Destination visitors and cross-border travel",
  },
];

export const SECTION_CTA = {
  eyebrow: "Continue the Tour",
  headline: "The Brands",
  subhead:
    "Where the world's most considered retailers set the standard for the modern American mall.",
  cta: { label: "Explore Retail & Luxury", href: "#retail" },
};
