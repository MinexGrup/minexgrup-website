// ---------------------------------------------------------------------------
// Central site configuration & content. Edit copy, contact info, and data here.
// ---------------------------------------------------------------------------

export const site = {
  name: "Minex Grup",
  tagline: "Heavy machinery, sourced right.",
  description:
    "Minex Grup is a Türkiye-based heavy machinery supply company specializing in sourcing and delivering mining and construction equipment, engines, undercarriage systems, and spare parts through a global supplier network.",

  contact: {
    email: "info@minexgrup.com",
    phone: "+905418528085",
    phoneDisplay: "+90 541 852 80 85",
    address: "Türkiye, Bursa",
    instagram: "" // TODO: add Instagram URL
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Industries", href: "/industries" },
    { label: "Parts Catalog", href: "/catalog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],

  trust: [
    "Correct part matching",
    "Multiple supplier options",
    "Transparent offers",
    "One contact to delivery"
  ]
} as const;

// --- PRODUCTS --------------------------------------------------------------
export type ProductCategory = {
  slug: string;
  name: string;
  blurb: string;
  intro: string;
  features: string[];
  supplies: string[];
  models: { name: string; note: string; image?: string; spin?: boolean; contain?: boolean }[];
  examples: string[];
  hero?: string;
  contain?: boolean;
};

export const productCategories: ProductCategory[] = [
  {
    slug: "machinery",
    name: "Machinery",
    blurb: "Mining excavators and construction equipment — new or used.",
    intro:
      "From large mining excavators to construction fleets, we source complete machines matched to your site, duty cycle, and budget. New or inspected used units, with full documentation and options from multiple suppliers so you compare on price, condition, and lead time.",
    features: [
      "New and inspected used units",
      "Sourced from Türkiye, China & Europe",
      "Documentation & inspection reports",
      "Delivered with logistics handled end-to-end"
    ],
    supplies: [
      "Mining excavators (large class)",
      "Construction excavators (medium range)",
      "Dozers and support equipment",
      "Machine rebuilds and major components"
    ],
    models: [
      { name: "Caterpillar Cat 374", note: "Large hydraulic mining/construction excavator", image: "/models/cat-374.jpg" },
      { name: "Caterpillar Cat 395", note: "Next-gen large excavator, high production", image: "/models/cat-395.jpg" },
      { name: "Komatsu PC1250", note: "Heavy mining excavator", image: "/models/komatsu-pc1250.jpg" },
      { name: "Komatsu PC2000", note: "Ultra-class mining excavator", image: "/models/komatsu-pc2000.jpg" }
    ],
    examples: ["Caterpillar Cat 374", "Cat 395", "Komatsu PC1250", "Komatsu PC2000"],
    hero: "/models/cat-395.jpg"
  },
  {
    slug: "undercarriage",
    name: "Undercarriage Systems",
    blurb: "Track chains, rollers, sprockets, idlers, complete undercarriage kits.",
    intro:
      "The undercarriage is where machines live or die on service life. We supply track chains, rollers, sprockets, idlers, and complete kits matched to your exact machine and ground conditions — balancing wear life against cost so uptime stays high.",
    features: [
      "Matched to exact machine & conditions",
      "Complete kits or individual components",
      "OEM-grade and cost-optimised options",
      "Advice on wear life vs. price"
    ],
    supplies: [
      "Track chains (sealed & lubricated)",
      "Top and bottom rollers",
      "Drive sprockets & segments",
      "Front idlers and complete undercarriage kits"
    ],
    models: [
      { name: "Track chain assemblies", note: "By machine model and pitch", image: "/models/undercarriage-track-chains.png" },
      { name: "Rollers — top & bottom", note: "Sealed & lubricated, rebuild-ready", image: "/models/undercarriage-rollers.png" },
      { name: "Sprockets & segments", note: "Drive sprockets and bolt-on segments", image: "/models/undercarriage-sprockets.png", spin: true },
      { name: "Idlers", note: "Front idlers with brackets", image: "/models/undercarriage-idlers.png" }
    ],
    examples: ["Track chains", "Top & bottom rollers", "Sprockets", "Idlers"],
    hero: "/models/undercarriage-hero.png",
    contain: true
  },
  {
    slug: "engines",
    name: "Engines & Power Units",
    blurb: "Diesel engines, remanufactured / OEM engines, power packs.",
    intro:
      "Diesel engines, remanufactured and OEM units, and complete power packs for heavy equipment. We identify the correct engine or rebuild for your machine and application, then source the best option on price, quality, and availability.",
    features: [
      "New, OEM and remanufactured options",
      "Complete power packs available",
      "Correct spec identification",
      "Warranty-backed remanufactured units where available"
    ],
    supplies: [
      "Complete diesel engines",
      "Remanufactured / OEM engines",
      "Power packs and power units",
      "Long blocks and major engine components"
    ],
    models: [
      { name: "CAT C18", note: "Caterpillar industrial diesel engine", image: "/models/cat-c18.jpg" },
      { name: "CAT C27", note: "Caterpillar industrial diesel engine", image: "/models/cat-c27.jpg" },
      { name: "CAT C32", note: "Caterpillar industrial diesel engine", image: "/models/cat-c32.jpg" },
      { name: "Cummins QSK19", note: "Heavy-duty diesel engine", image: "/models/cummins-qsk19.jpg" },
      { name: "Cummins QSK38", note: "High-horsepower mining engine", image: "/models/cummins-qsk38.jpg" },
      { name: "Cummins QSK50", note: "Ultra-class power unit", image: "/models/cummins-qsk50.jpg" }
    ],
    examples: ["CAT C18 / C27 / C32", "Cummins QSK19", "Cummins QSK38", "Cummins QSK50"],
    hero: "/models/cat-c18.jpg"
  },
  {
    slug: "spare-parts",
    name: "Spare Parts",
    blurb: "Engine parts, hydraulic components, undercarriage & wear parts.",
    intro:
      "Fast-moving and hard-to-find spare parts for heavy equipment — engine parts, hydraulic components, undercarriage spares, and wear parts. Send a part number or machine model and we match the correct part and return supplier options.",
    features: [
      "Match by part number or machine",
      "Engine, hydraulic & wear parts",
      "Multiple supplier options per part",
      "7,000+ parts across our catalog"
    ],
    supplies: [
      "Engine parts (injectors, pumps, heads)",
      "Hydraulic components (pumps, valves, cylinders)",
      "Undercarriage spare parts",
      "Ground-engaging & wear parts"
    ],
    models: [
      { name: "Engine parts", note: "Injectors, water pumps, turbochargers", image: "/models/spare-engine-parts.jpg" },
      { name: "Hydraulic components", note: "Main pumps, valves, cylinders", image: "/models/spare-hydraulic.jpg" },
      { name: "Undercarriage parts", note: "Rollers, links, bushings, seals", image: "/models/spare-undercarriage.png", contain: true },
      { name: "Wear parts", note: "Bucket teeth, cutting edges, GET", image: "/models/spare-wear.png", contain: true }
    ],
    examples: ["Engine parts", "Hydraulic components", "Undercarriage parts", "Wear parts"],
    hero: "/models/spare-hero.jpg"
  }
];

export const brands = ["Caterpillar", "Cummins", "Komatsu"] as const;
export const brandsMinor = ["Hitachi", "Liebherr", "Atlas Copco", "Jenbacher", "MWM"] as const;

// --- INDUSTRIES ------------------------------------------------------------
export type Industry = {
  slug: string;
  name: string;
  conditions: string;
  intro: string;
  challenges: string[];
  supplies: string[];
  supply: string;
  image?: string;
};

export const industries: Industry[] = [
  {
    slug: "mining",
    name: "Mining",
    conditions: "Deep pits, continuous duty cycles, abrasive ground, high uptime demands.",
    intro:
      "Mining runs machines around the clock in abrasive, punishing ground. A single day of downtime is expensive, so the right equipment, the right undercarriage, and fast parts availability decide the economics of the operation.",
    challenges: [
      "24/7 duty cycles with minimal downtime windows",
      "Highly abrasive material accelerating wear",
      "Large-class machines with long parts lead times",
      "Remote sites where availability is critical"
    ],
    supplies: [
      "Large mining excavators and dozers",
      "Heavy-duty undercarriage and wear parts",
      "High-horsepower engines and power units",
      "Fast-moving spares to protect uptime"
    ],
    supply: "Large excavators, engines, undercarriage, and fast-moving wear parts.",
    image: "/industries/mining.jpg"
  },
  {
    slug: "quarry",
    name: "Quarry",
    conditions: "Hard rock, heavy impact loading, dust, and relentless production targets.",
    intro:
      "Quarrying hammers equipment with hard rock, impact loading, and constant dust while production targets never let up. Durable components and rebuild-ready parts keep output steady and cost-per-tonne under control.",
    challenges: [
      "High-impact loading on structures and GET",
      "Abrasive dust shortening component life",
      "Constant production pressure",
      "Need for cost-effective rebuilds over replacement"
    ],
    supplies: [
      "Durable undercarriage kits",
      "Hydraulic components and cylinders",
      "Rebuild-ready and remanufactured engines",
      "Ground-engaging and wear parts"
    ],
    supply: "Durable undercarriage kits, hydraulic components, and rebuild-ready engines.",
    image: "/industries/quarry.jpg"
  },
  {
    slug: "construction",
    name: "Construction",
    conditions: "Mixed sites, tight schedules, mixed fleets needing broad parts coverage.",
    intro:
      "Construction runs mixed fleets across changing sites on tight schedules. Broad parts coverage and quick, correct matching keep varied machines moving without holding up the whole project.",
    challenges: [
      "Mixed fleets spanning many brands and models",
      "Tight project schedules with no slack",
      "Broad range of parts needed at short notice",
      "Balancing new vs. used equipment budgets"
    ],
    supplies: [
      "Construction excavators and machinery",
      "OEM-grade spare parts across brands",
      "Undercarriage and wear components",
      "Quick-turn part matching and sourcing"
    ],
    supply: "Construction machinery, OEM-grade spares, and quick-turn part matching.",
    image: "/industries/construction.jpg"
  }
];

// --- GEOGRAPHY -------------------------------------------------------------
export const geography = [
  { region: "Türkiye", role: "Head base — logistics & coordination", x: 597, y: 142, hub: true, dx: 0, dy: -16, anchor: "middle" },
  { region: "China", role: "Manufacturing & large stock", x: 786, y: 153, hub: false, dx: 0, dy: 22, anchor: "middle" },
  { region: "Europe", role: "OEM & quality suppliers", x: 525, y: 111, hub: false, dx: -12, dy: -8, anchor: "end" },
  { region: "Azerbaijan", role: "Main served market + regional projects", x: 633, y: 138, hub: false, dx: 12, dy: 20, anchor: "start" },
  { region: "USA", role: "Sourcing & regional projects", x: 228, y: 142, hub: false, dx: 0, dy: 24, anchor: "middle" },
  { region: "Africa", role: "Mining markets & regional projects", x: 556, y: 233, hub: false, dx: 0, dy: 26, anchor: "middle" },
  { region: "Singapore", role: "Trade & logistics hub", x: 788, y: 246, hub: false, dx: 12, dy: 4, anchor: "start" },
  { region: "Australia", role: "Mining markets & regional projects", x: 892, y: 330, hub: false, dx: 0, dy: 26, anchor: "middle" },
  { region: "Chile", role: "Mining markets & regional projects", x: 304, y: 343, hub: false, dx: -12, dy: 4, anchor: "end" }
] as const;

// --- ABOUT / PROCESS / VALUES ---------------------------------------------
export const processSteps = [
  { n: "01", title: "You send a request", text: "A machine, engine, or part number — with quantity, location, and how urgent it is." },
  { n: "02", title: "We identify the specs", text: "We confirm the correct technical specification and what actually fits your machine and application." },
  { n: "03", title: "We source & compare", text: "We find suitable suppliers across Türkiye, China, and Europe and compare price, quality, and lead time." },
  { n: "04", title: "We make the best offer", text: "You get a transparent offer with options — not just a price, but the right option for your situation." },
  { n: "05", title: "We deliver", text: "We handle logistics through to delivery, with one point of contact from request to arrival." }
] as const;

export const valueProps = [
  { title: "Technically aware", text: "We know what fits — correct specs and matching, not guesswork." },
  { title: "Supplier-connected", text: "A trusted network across Türkiye, China, and Europe for real options." },
  { title: "Fast to respond", text: "Quick, straight answers when your machine is down and time costs money." },
  { title: "Built for service life", text: "Focused on durability and total cost, not just the lowest sticker price." }
] as const;

export const stats = [
  { value: "3", label: "Continents in our supply network" },
  { value: "7,000+", label: "Parts across our catalog" },
  { value: "3", label: "Core brands, more coming" },
  { value: "1", label: "Contact from request to delivery" }
] as const;
