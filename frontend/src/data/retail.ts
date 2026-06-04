export const RETAIL_SECTION = {
  eyebrow: "Retail + Luxury",
  headline: ["A Roster Curated", "with the World's", "Most Considered Buyers."],
  subhead:
    "A 520-store merchandising strategy built with intent — every name placed, every adjacency considered, every category over-indexed against the U.S. mall average.",
};

export type RetailTier = {
  id: "luxury" | "premium" | "flagship" | "specialty";
  title: string;
  tagline: string;
  count: number;
  brands: string[];
};

export const TIERED_MIX: RetailTier[] = [
  {
    id: "luxury",
    title: "Luxury",
    tagline: "Flagship houses & atelier concepts",
    count: 22,
    brands: [
      "Tiffany & Co.",
      "Louis Vuitton",
      "Burberry",
      "Gucci",
      "Saint Laurent",
      "Bottega Veneta",
    ],
  },
  {
    id: "premium",
    title: "Premium",
    tagline: "Accessible luxury & contemporary",
    count: 64,
    brands: [
      "Coach",
      "Kate Spade",
      "Michael Kors",
      "Tory Burch",
      "Marc Jacobs",
      "Stuart Weitzman",
      "Vince",
      "AllSaints",
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
      "Sephora",
      "Nike",
    ],
  },
  {
    id: "specialty",
    title: "Specialty & Discovery",
    tagline: "Independent & emerging concepts",
    count: 254,
    brands: [
      "Lego",
      "M&M's World",
      "Swarovski",
      "MAC",
      "Aritzia",
      "Madewell",
      "Anthropologie",
      "Uniqlo",
    ],
  },
];

export const LUXURY_WING = {
  eyebrow: "The Luxury Wing",
  headline: "22 Brands, One Contiguous Floor.",
  subhead:
    "A dedicated second-level destination anchored by Bloomingdale's, with a curated concentration of luxury houses arranged for cross-shop and dwell. Adjacent to the valet, the spa concierge, and the Champagne Bar.",
  brands: [
    { name: "Tiffany & Co.", size: 1.6 },
    { name: "Louis Vuitton", size: 1.6 },
    { name: "Gucci", size: 1.4 },
    { name: "Burberry", size: 1.3 },
    { name: "Saint Laurent", size: 1.2 },
    { name: "Bottega Veneta", size: 1.2 },
    { name: "Bulgari", size: 1.1 },
    { name: "Cartier", size: 1.3 },
    { name: "Hermès", size: 1.4 },
    { name: "Celine", size: 1.1 },
    { name: "Chanel", size: 1.3 },
    { name: "Dior", size: 1.3 },
    { name: "Fendi", size: 1.1 },
    { name: "Prada", size: 1.2 },
    { name: "Salvatore Ferragamo", size: 1.0 },
    { name: "Moncler", size: 1.0 },
  ],
};

export type AdjacencyNode = {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  size: number;
};

export type AdjacencyEdge = {
  from: string;
  to: string;
  strength: "primary" | "secondary";
};

export const ADJACENCY_NODES: AdjacencyNode[] = [
  {
    id: "luxury",
    label: "Luxury",
    description: "Tier-one houses & ateliers",
    x: 160,
    y: 110,
    size: 64,
  },
  {
    id: "flagship",
    label: "Flagship",
    description: "Brand-defining destination stores",
    x: 440,
    y: 110,
    size: 72,
  },
  {
    id: "specialty",
    label: "Specialty",
    description: "Discovery & emerging concepts",
    x: 160,
    y: 310,
    size: 58,
  },
  {
    id: "dining",
    label: "Dining",
    description: "50+ chef-driven & quick-service",
    x: 440,
    y: 310,
    size: 60,
  },
];

export const ADJACENCY_EDGES: AdjacencyEdge[] = [
  { from: "luxury", to: "flagship", strength: "primary" },
  { from: "luxury", to: "dining", strength: "secondary" },
  { from: "flagship", to: "specialty", strength: "primary" },
  { from: "specialty", to: "dining", strength: "secondary" },
  { from: "flagship", to: "dining", strength: "primary" },
];

export type RecentOpening = {
  brand: string;
  category: string;
  tagline: string;
  opened: string;
};

export const RECENT_OPENINGS: RecentOpening[] = [
  {
    brand: "Apple",
    category: "Flagship Retail",
    tagline: "Refreshed destination store with Today at Apple programming.",
    opened: "2024",
  },
  {
    brand: "Lego",
    category: "Specialty",
    tagline: "First Lego store in the Upper Midwest with a mosaic build experience.",
    opened: "2023",
  },
  {
    brand: "M&M's World",
    category: "Specialty",
    tagline: "28,000 sq ft of color, confections, and selfie moments.",
    opened: "2022",
  },
  {
    brand: "Lululemon",
    category: "Premium",
    tagline: "Largest Lululemon store in the region with a dedicated community space.",
    opened: "2024",
  },
];

export const PERFORMANCE = [
  {
    value: 1100,
    prefix: "$",
    suffix: "",
    label: "Avg. Sales / Sq Ft",
    caption:
      "Across Tier-1 luxury and flagship categories — well above the U.S. mall average of $450.",
  },
  {
    value: 87,
    prefix: "",
    suffix: " min",
    label: "Average Dwell Time",
    caption:
      "From arrival to departure, the longest dwell in any enclosed mall in the United States.",
  },
  {
    value: 32,
    prefix: "",
    suffix: "%",
    label: "Visit-to-Purchase",
    caption:
      "Among the highest conversion rates in the industry — driven by 40M annual visitors.",
  },
];

export const SECTION_CTA = {
  eyebrow: "Continue the Tour",
  headline: "Dining + Entertainment",
  subhead:
    "50+ dining destinations, 14 attractions, and the only enclosed theme park in North America. A full day, not a quick stop.",
  cta: { label: "Explore Dining + Entertainment", href: "#dining" },
};
