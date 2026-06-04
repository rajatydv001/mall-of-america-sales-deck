export const DINING_SECTION = {
  eyebrow: "Dining + Entertainment",
  headline: ["A Full Day,", "Not a Quick Stop.", "Every Hour Accounted For."],
  subhead:
    "50+ dining concepts, 14 attractions, and 7 acres of indoor theme park — a captive audience that lasts 87 minutes on average, with every minute programmed for dwell and spend.",
};

export const HERO_ATTRACTIONS = [
  {
    name: "Nickelodeon Universe",
    category: "Theme Park",
    stat: "7 acres",
    statLabel: "Indoor Theme Park",
    description:
      "The only indoor Nickelodeon-themed amusement park in the world. 27 rides, character experiences, and a central location that pulls foot traffic from all four retail wings.",
    image: "/images/entertainment/nickelodeon-universe-hero.jpg",
  },
  {
    name: "Sea Life Minnesota Aquarium",
    category: "Aquarium",
    stat: "1.3M",
    statLabel: "Gallons of Water",
    description:
      "A 1.3-million-gallon ocean habitat with 10,000 creatures and a 300-foot underwater tunnel. One of the most-visited aquariums in the United States.",
    image: "/images/entertainment/sea-life-hero.jpg",
  },
  {
    name: "FlyOver America",
    category: "Flight Ride",
    stat: "40 ft",
    statLabel: "Spherical Screen",
    description:
      "An immersive virtual-flight experience over 26 iconic U.S. landscapes. State-of-the-art motion seats, wind, mist, and scent effects create a full-sensory journey.",
    image: "/images/dining-entertainment/flyover-america.jpg",
  },
] as const;

export const MORE_ATTRACTIONS = [
  {
    name: "Crayola Experience",
    tagline: "A four-floor creative adventure with 25 hands-on attractions.",
    category: "Interactive",
    image: "/images/entertainment/kids-family-attraction.jpg",
  },
  {
    name: "The Escape Game",
    tagline: "Immersive 60-minute missions for teams of 2–8.",
    category: "Game & Puzzle",
    image: "/images/entertainment/birthday-packages.jpg",
  },
  {
    name: "House of Comedy",
    tagline: "Premier comedy club featuring national touring acts.",
    category: "Live Performance",
    image: "/images/entertainment/house-of-comedy.jpg",
  },
  {
    name: "MOA Theater (AMC)",
    tagline: "A 14-screen multiplex with Dolby Cinema and IMAX.",
    category: "Movies",
    image: "/images/entertainment/moa-theater.jpg",
  },
  {
    name: "Museum of Memory",
    tagline: "A rotating pop-up museum celebrating Minnesota culture.",
    category: "Exhibition",
    image: "/images/entertainment/museum-of-memory.jpg",
  },
  {
    name: "Rock of Ages Blacklight Mini Golf",
    tagline: "18 holes of glow-in-the-dark mini golf with a rock-and-roll theme.",
    category: "Active Play",
    image: "/images/entertainment/rock-of-ages-mini-golf.jpg",
  },
] as const;

export type DiningType = {
  id: "quick" | "casual" | "signature" | "food-hall";
  title: string;
  tagline: string;
  count: number;
  venues: readonly string[];
};

export const DINING_ECOSYSTEM: readonly DiningType[] = [
  {
    id: "quick",
    title: "Quick Service",
    tagline: "Fast, globally inspired, chef-crafted",
    count: 22,
    venues: [
      "Shake Shack",
      "Five Guys",
      "Sweetgreen",
      "Blaze Pizza",
      "Chick-fil-A",
      "Panda Express",
      "Sushi Fix",
      "Lean Pockets",
    ],
  },
  {
    id: "casual",
    title: "Casual Dining",
    tagline: "Full-service, family-friendly destinations",
    count: 16,
    venues: [
      "The Cheesecake Factory",
      "Twin Cities Burger Co.",
      "Kona Kitchen",
      "Buca di Beppo",
      "TGI Fridays",
      "Cocina del Sur",
    ],
  },
  {
    id: "signature",
    title: "Signature Dining",
    tagline: "Chef-driven, reservation recommended",
    count: 8,
    venues: [
      "CRAVE",
      "Moscow on the Hill",
      "Cedar + Stone",
      "The Tap House",
      "Union Grill",
    ],
  },
  {
    id: "food-hall",
    title: "Food Hall & Market",
    tagline: "Curated collective of local concepts",
    count: 6,
    venues: [
      "North Market",
      "Food + Folklore",
      "MOA Kitchen",
    ],
  },
] as const;

export const DINING_AWARDS = [
  "Best Mall Food Court in America — Food & Wine",
  "Top 10 Dining Destinations in Minnesota — Eater",
  "Most Instagrammable Food Hall — Travel + Leisure",
];

export const EVENT_FACTS = [
  {
    value: 50,
    suffix: "+",
    label: "Annual Private Events",
    description:
      "From brand launches to galas, MOA hosts over 50 exclusive events annually across its venue spaces.",
  },
  {
    value: 40,
    suffix: "%",
    label: "Group Dining Rate",
    description:
      "Nearly half of all dining visits are from groups of 3 or more — a natural fit for corporate hospitality and sponsor activations.",
  },
  {
    value: 87,
    suffix: " min",
    label: "Average Dwell",
    description:
      "The longest average visit duration of any U.S. enclosed mall, with F&B and attractions driving the top end of the range.",
  },
] as const;

export const SECTION_CTA = {
  eyebrow: "Continue the Tour",
  headline: "Events + Sponsorship + Leasing",
  subhead:
    "Private events, brand activations, sponsorship inventory, and retail leasing — the full commercial partnership opportunity at Mall of America.",
  cta: { label: "Explore Partnerships", href: "#events" },
};
