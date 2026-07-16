// ---------------------------------------------------------------------------
// Parts data — Airtable-ready schema.
// Phase 2: replace `sampleParts` with a fetch from Airtable that returns this
// exact shape. Field names below map 1:1 to intended Airtable columns.
// ---------------------------------------------------------------------------

export type Condition = "New" | "Remanufactured" | "Used";

export interface Part {
  id: string;             // Airtable record id
  partNumber: string;     // "Part Number"
  description: string;    // "Description"
  brand: string;          // "Brand"
  category: string;       // "Category"
  machine: string;        // "Compatible Machine"
  condition: Condition;   // "Condition"
  price: number | null;   // "Price" (null = "On request")
  availability: string;   // "Availability"
}

export const partCategories = [
  "Engines & Power Units",
  "Undercarriage Systems",
  "Spare Parts",
  "Machinery"
] as const;

export const partBrands = ["Caterpillar", "Cummins", "Komatsu"] as const;
export const partConditions: Condition[] = ["New", "Remanufactured", "Used"];

// Realistic placeholder rows. Real catalog holds 7,000–10,000+ via Airtable.
export const sampleParts: Part[] = [
  { id: "rec001", partNumber: "CAT-EXC-37429", description: "Hydraulic mining excavator", brand: "Caterpillar", category: "Machinery", machine: "Cat 374", condition: "Used", price: null, availability: "On request" },
  { id: "rec002", partNumber: "CAT-EXC-33619", description: "Construction excavator", brand: "Caterpillar", category: "Machinery", machine: "Cat 336", condition: "New", price: null, availability: "On request" },
  { id: "rec003", partNumber: "CAT-DZR-37484", description: "Crawler dozer", brand: "Caterpillar", category: "Machinery", machine: "Cat 374", condition: "New", price: null, availability: "On request" },
  { id: "rec004", partNumber: "CAT-INJ-C1814", description: "Fuel injector assembly", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C18", condition: "Remanufactured", price: 988, availability: "2–3 weeks" },
  { id: "rec005", partNumber: "CAT-TC-C1564", description: "Turbocharger, high-pressure", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C15", condition: "Remanufactured", price: 2321, availability: "In stock" },
  { id: "rec006", partNumber: "CAT-TC-C2738", description: "Turbocharger, high-pressure", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C27", condition: "Used", price: 3491, availability: "3–4 weeks" },
  { id: "rec007", partNumber: "CAT-WP-C3216", description: "Water pump, heavy-duty", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C32", condition: "New", price: 606, availability: "3–4 weeks" },
  { id: "rec008", partNumber: "CAT-HEAD-C2763", description: "Cylinder head, reconditioned", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C27", condition: "Remanufactured", price: 1695, availability: "In stock" },
  { id: "rec009", partNumber: "CAT-FP-C1823", description: "Fuel transfer pump", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C18", condition: "Remanufactured", price: 1115, availability: "In stock" },
  { id: "rec010", partNumber: "CAT-OC-C1517", description: "Oil cooler core", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C15", condition: "New", price: 1273, availability: "2–3 weeks" },
  { id: "rec011", partNumber: "CAT-OC-C2797", description: "Oil cooler core", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C27", condition: "Remanufactured", price: 1184, availability: "1–2 weeks" },
  { id: "rec012", partNumber: "CAT-PLK-C3248", description: "Piston & liner kit", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C32", condition: "New", price: 1208, availability: "In stock" },
  { id: "rec013", partNumber: "CAT-PLK-C1820", description: "Piston & liner kit", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C18", condition: "New", price: 1876, availability: "3–4 weeks" },
  { id: "rec014", partNumber: "CAT-GSK-C2767", description: "Full gasket set", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C27", condition: "Remanufactured", price: 407, availability: "In stock" },
  { id: "rec015", partNumber: "CAT-GSK-C3225", description: "Full gasket set", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C32", condition: "Remanufactured", price: 522, availability: "In stock" },
  { id: "rec016", partNumber: "CAT-ECM-C1872", description: "Engine control module", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C18", condition: "New", price: 2463, availability: "In stock" },
  { id: "rec017", partNumber: "CAT-SM-C2753", description: "Starter motor, 24V", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C27", condition: "Remanufactured", price: 788, availability: "2–3 weeks" },
  { id: "rec018", partNumber: "CAT-PWR-C3218", description: "Complete power pack", brand: "Caterpillar", category: "Engines & Power Units", machine: "CAT C32", condition: "New", price: null, availability: "On request" },
  { id: "rec019", partNumber: "CAT-TCH-39070", description: "Track chain assembly", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 390", condition: "New", price: null, availability: "On request" },
  { id: "rec020", partNumber: "CAT-TROLL-39083", description: "Top roller, sealed", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 390", condition: "New", price: 528, availability: "2–3 weeks" },
  { id: "rec021", partNumber: "CAT-TROLL-39595", description: "Top roller, sealed", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 395", condition: "New", price: 477, availability: "2–3 weeks" },
  { id: "rec022", partNumber: "CAT-BROLL-33617", description: "Bottom roller, sealed & lubricated", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 336", condition: "New", price: 471, availability: "In stock" },
  { id: "rec023", partNumber: "CAT-BROLL-37441", description: "Bottom roller, sealed & lubricated", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 374", condition: "Remanufactured", price: 563, availability: "2–3 weeks" },
  { id: "rec024", partNumber: "CAT-SPKT-39580", description: "Sprocket segment set", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 395", condition: "New", price: 1769, availability: "2–3 weeks" },
  { id: "rec025", partNumber: "CAT-SPKT-37480", description: "Sprocket segment set", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 374", condition: "Used", price: 1770, availability: "2–3 weeks" },
  { id: "rec026", partNumber: "CAT-IDLR-39539", description: "Front idler with brackets", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 395", condition: "New", price: 1809, availability: "In stock" },
  { id: "rec027", partNumber: "CAT-SHOE-37472", description: "Track shoe, single grouser", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 374", condition: "New", price: 270, availability: "1–2 weeks" },
  { id: "rec028", partNumber: "CAT-SHOE-33646", description: "Track shoe, single grouser", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 336", condition: "New", price: 121, availability: "2–3 weeks" },
  { id: "rec029", partNumber: "CAT-ADJ-39098", description: "Track adjuster / recoil unit", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 390", condition: "Remanufactured", price: 1047, availability: "In stock" },
  { id: "rec030", partNumber: "CAT-ADJ-33668", description: "Track adjuster / recoil unit", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 336", condition: "Remanufactured", price: 1216, availability: "2–3 weeks" },
  { id: "rec031", partNumber: "CAT-RCL-39571", description: "Recoil spring assembly", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 395", condition: "Remanufactured", price: 1129, availability: "In stock" },
  { id: "rec032", partNumber: "CAT-RCL-33634", description: "Recoil spring assembly", brand: "Caterpillar", category: "Undercarriage Systems", machine: "Cat 336", condition: "New", price: 548, availability: "2–3 weeks" },
  { id: "rec033", partNumber: "CAT-HYD-37416", description: "Hydraulic main pump", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 374", condition: "New", price: 3619, availability: "3–4 weeks" },
  { id: "rec034", partNumber: "CAT-HYD-C2729", description: "Hydraulic main pump", brand: "Caterpillar", category: "Spare Parts", machine: "CAT C27", condition: "New", price: 5397, availability: "1–2 weeks" },
  { id: "rec035", partNumber: "CAT-MCV-33636", description: "Main control valve", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 336", condition: "Remanufactured", price: 5115, availability: "In stock" },
  { id: "rec036", partNumber: "CAT-SEAL-37487", description: "Hydraulic cylinder seal kit", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 374", condition: "Remanufactured", price: 366, availability: "In stock" },
  { id: "rec037", partNumber: "CAT-FD-C2771", description: "Final drive assembly", brand: "Caterpillar", category: "Spare Parts", machine: "CAT C27", condition: "New", price: 5781, availability: "In stock" },
  { id: "rec038", partNumber: "CAT-FD-34928", description: "Final drive assembly", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 349", condition: "Used", price: 4218, availability: "1–2 weeks" },
  { id: "rec039", partNumber: "CAT-SWM-C2798", description: "Swing motor", brand: "Caterpillar", category: "Spare Parts", machine: "CAT C27", condition: "Remanufactured", price: 3061, availability: "In stock" },
  { id: "rec040", partNumber: "CAT-GET-37498", description: "Bucket tooth set (rock)", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 374", condition: "New", price: 1036, availability: "3–4 weeks" },
  { id: "rec041", partNumber: "CAT-GET-33648", description: "Bucket tooth set (rock)", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 336", condition: "New", price: 1138, availability: "1–2 weeks" },
  { id: "rec042", partNumber: "CAT-CE-34938", description: "Cutting edge, bolt-on", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 349", condition: "New", price: 754, availability: "In stock" },
  { id: "rec043", partNumber: "CAT-CE-C2788", description: "Cutting edge, bolt-on", brand: "Caterpillar", category: "Spare Parts", machine: "CAT C27", condition: "New", price: 439, availability: "2–3 weeks" },
  { id: "rec044", partNumber: "CAT-AF-34935", description: "Air filter (primary+safety)", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 349", condition: "Remanufactured", price: 222, availability: "1–2 weeks" },
  { id: "rec045", partNumber: "CAT-FF-33645", description: "Fuel filter kit", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 336", condition: "New", price: 130, availability: "In stock" },
  { id: "rec046", partNumber: "CAT-ALT-37467", description: "Alternator, 24V", brand: "Caterpillar", category: "Spare Parts", machine: "Cat 374", condition: "Used", price: 793, availability: "1–2 weeks" },
  { id: "rec047", partNumber: "CUM-INJ-SK5020", description: "Fuel injector assembly", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK50", condition: "New", price: 1125, availability: "In stock" },
  { id: "rec048", partNumber: "CUM-TC-SK5071", description: "Turbocharger, high-pressure", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK50", condition: "Remanufactured", price: 3478, availability: "In stock" },
  { id: "rec049", partNumber: "CUM-TC-SK1971", description: "Turbocharger, high-pressure", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK19", condition: "Used", price: 4062, availability: "1–2 weeks" },
  { id: "rec050", partNumber: "CUM-WP-SK1994", description: "Water pump, heavy-duty", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK19", condition: "Remanufactured", price: 502, availability: "In stock" },
  { id: "rec051", partNumber: "CUM-HEAD-SK3891", description: "Cylinder head, reconditioned", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK38", condition: "New", price: 2080, availability: "2–3 weeks" },
  { id: "rec052", partNumber: "CUM-HEAD-SX1569", description: "Cylinder head, reconditioned", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSX15", condition: "Used", price: 2222, availability: "In stock" },
  { id: "rec053", partNumber: "CUM-FP-SK3826", description: "Fuel transfer pump", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK38", condition: "New", price: 548, availability: "3–4 weeks" },
  { id: "rec054", partNumber: "CUM-OC-SK3888", description: "Oil cooler core", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK38", condition: "Remanufactured", price: 1486, availability: "2–3 weeks" },
  { id: "rec055", partNumber: "CUM-PLK-SK5029", description: "Piston & liner kit", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK50", condition: "Remanufactured", price: 1823, availability: "In stock" },
  { id: "rec056", partNumber: "CUM-GSK-SK1927", description: "Full gasket set", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK19", condition: "New", price: 482, availability: "In stock" },
  { id: "rec057", partNumber: "CUM-GSK-SK5013", description: "Full gasket set", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK50", condition: "New", price: 388, availability: "1–2 weeks" },
  { id: "rec058", partNumber: "CUM-ECM-SK5079", description: "Engine control module", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK50", condition: "New", price: 2458, availability: "In stock" },
  { id: "rec059", partNumber: "CUM-ECM-SK3855", description: "Engine control module", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK38", condition: "Used", price: 2538, availability: "3–4 weeks" },
  { id: "rec060", partNumber: "CUM-SM-SX1574", description: "Starter motor, 24V", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSX15", condition: "Remanufactured", price: 563, availability: "In stock" },
  { id: "rec061", partNumber: "CUM-PWR-SK1966", description: "Complete power pack", brand: "Cummins", category: "Engines & Power Units", machine: "Cummins QSK19", condition: "New", price: null, availability: "On request" },
  { id: "rec062", partNumber: "CUM-HYD-SK1932", description: "Hydraulic main pump", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK19", condition: "Remanufactured", price: 3779, availability: "3–4 weeks" },
  { id: "rec063", partNumber: "CUM-MCV-SK5017", description: "Main control valve", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK50", condition: "Used", price: 3935, availability: "3–4 weeks" },
  { id: "rec064", partNumber: "CUM-SEAL-SK3881", description: "Hydraulic cylinder seal kit", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK38", condition: "New", price: 209, availability: "In stock" },
  { id: "rec065", partNumber: "CUM-SEAL-SK1945", description: "Hydraulic cylinder seal kit", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK19", condition: "New", price: 201, availability: "3–4 weeks" },
  { id: "rec066", partNumber: "CUM-FD-SK1966", description: "Final drive assembly", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK19", condition: "Remanufactured", price: 5133, availability: "3–4 weeks" },
  { id: "rec067", partNumber: "CUM-FD-SK5087", description: "Final drive assembly", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK50", condition: "New", price: 5897, availability: "1–2 weeks" },
  { id: "rec068", partNumber: "CUM-SWM-SK5074", description: "Swing motor", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK50", condition: "Used", price: 3414, availability: "3–4 weeks" },
  { id: "rec069", partNumber: "CUM-SWM-SK3843", description: "Swing motor", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK38", condition: "New", price: 4691, availability: "2–3 weeks" },
  { id: "rec070", partNumber: "CUM-GET-SK1966", description: "Bucket tooth set (rock)", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK19", condition: "New", price: 803, availability: "In stock" },
  { id: "rec071", partNumber: "CUM-GET-SK3864", description: "Bucket tooth set (rock)", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK38", condition: "New", price: 554, availability: "1–2 weeks" },
  { id: "rec072", partNumber: "CUM-CE-SK1992", description: "Cutting edge, bolt-on", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK19", condition: "New", price: 614, availability: "1–2 weeks" },
  { id: "rec073", partNumber: "CUM-AF-SK3838", description: "Air filter (primary+safety)", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK38", condition: "Remanufactured", price: 114, availability: "2–3 weeks" },
  { id: "rec074", partNumber: "CUM-FF-SK5030", description: "Fuel filter kit", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK50", condition: "Remanufactured", price: 160, availability: "3–4 weeks" },
  { id: "rec075", partNumber: "CUM-FF-SK1961", description: "Fuel filter kit", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK19", condition: "Remanufactured", price: 113, availability: "In stock" },
  { id: "rec076", partNumber: "CUM-ALT-SK1912", description: "Alternator, 24V", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK19", condition: "Remanufactured", price: 553, availability: "2–3 weeks" },
  { id: "rec077", partNumber: "CUM-ALT-SK3866", description: "Alternator, 24V", brand: "Cummins", category: "Spare Parts", machine: "Cummins QSK38", condition: "New", price: 740, availability: "2–3 weeks" },
  { id: "rec078", partNumber: "KOM-EXC-200076", description: "Hydraulic mining excavator", brand: "Komatsu", category: "Machinery", machine: "Komatsu PC2000", condition: "Used", price: null, availability: "On request" },
  { id: "rec079", partNumber: "KOM-EXC-C49024", description: "Construction excavator", brand: "Komatsu", category: "Machinery", machine: "Komatsu PC490", condition: "New", price: null, availability: "On request" },
  { id: "rec080", partNumber: "KOM-DZR-C49020", description: "Crawler dozer", brand: "Komatsu", category: "Machinery", machine: "Komatsu PC490", condition: "Used", price: null, availability: "On request" },
  { id: "rec081", partNumber: "KOM-INJ-AA6D26", description: "Fuel injector assembly", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA6D", condition: "Remanufactured", price: 1739, availability: "1–2 weeks" },
  { id: "rec082", partNumber: "KOM-INJ-A12V61", description: "Fuel injector assembly", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA12V", condition: "Remanufactured", price: 1052, availability: "3–4 weeks" },
  { id: "rec083", partNumber: "KOM-TC-A12V21", description: "Turbocharger, high-pressure", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA12V", condition: "New", price: 2771, availability: "In stock" },
  { id: "rec084", partNumber: "KOM-WP-AA6D12", description: "Water pump, heavy-duty", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA6D", condition: "New", price: 470, availability: "In stock" },
  { id: "rec085", partNumber: "KOM-WP-A12V87", description: "Water pump, heavy-duty", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA12V", condition: "New", price: 607, availability: "1–2 weeks" },
  { id: "rec086", partNumber: "KOM-HEAD-A12V11", description: "Cylinder head, reconditioned", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA12V", condition: "Remanufactured", price: 2094, availability: "2–3 weeks" },
  { id: "rec087", partNumber: "KOM-FP-A12V89", description: "Fuel transfer pump", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA12V", condition: "New", price: 652, availability: "3–4 weeks" },
  { id: "rec088", partNumber: "KOM-OC-AA6D30", description: "Oil cooler core", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA6D", condition: "New", price: 908, availability: "In stock" },
  { id: "rec089", partNumber: "KOM-PLK-A12V77", description: "Piston & liner kit", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA12V", condition: "New", price: 1121, availability: "2–3 weeks" },
  { id: "rec090", partNumber: "KOM-PLK-AA6D74", description: "Piston & liner kit", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA6D", condition: "New", price: 1064, availability: "1–2 weeks" },
  { id: "rec091", partNumber: "KOM-GSK-A12V14", description: "Full gasket set", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA12V", condition: "New", price: 267, availability: "3–4 weeks" },
  { id: "rec092", partNumber: "KOM-ECM-AA6D75", description: "Engine control module", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA6D", condition: "New", price: 2572, availability: "2–3 weeks" },
  { id: "rec093", partNumber: "KOM-SM-A12V79", description: "Starter motor, 24V", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA12V", condition: "Remanufactured", price: 832, availability: "1–2 weeks" },
  { id: "rec094", partNumber: "KOM-SM-AA6D98", description: "Starter motor, 24V", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA6D", condition: "New", price: 650, availability: "1–2 weeks" },
  { id: "rec095", partNumber: "KOM-PWR-AA6D91", description: "Complete power pack", brand: "Komatsu", category: "Engines & Power Units", machine: "Komatsu SAA6D", condition: "New", price: null, availability: "On request" },
  { id: "rec096", partNumber: "KOM-TCH-D15554", description: "Track chain assembly", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu D155", condition: "New", price: null, availability: "On request" },
  { id: "rec097", partNumber: "KOM-TROLL-C49019", description: "Top roller, sealed", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC490", condition: "Used", price: 620, availability: "1–2 weeks" },
  { id: "rec098", partNumber: "KOM-BROLL-C49095", description: "Bottom roller, sealed & lubricated", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC490", condition: "Remanufactured", price: 555, availability: "1–2 weeks" },
  { id: "rec099", partNumber: "KOM-BROLL-D15586", description: "Bottom roller, sealed & lubricated", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu D155", condition: "Used", price: 484, availability: "1–2 weeks" },
  { id: "rec100", partNumber: "KOM-SPKT-125044", description: "Sprocket segment set", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC1250", condition: "New", price: 2113, availability: "1–2 weeks" },
  { id: "rec101", partNumber: "KOM-SPKT-C49056", description: "Sprocket segment set", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC490", condition: "Remanufactured", price: 1873, availability: "1–2 weeks" },
  { id: "rec102", partNumber: "KOM-IDLR-200055", description: "Front idler with brackets", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC2000", condition: "New", price: 1874, availability: "1–2 weeks" },
  { id: "rec103", partNumber: "KOM-IDLR-C49058", description: "Front idler with brackets", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC490", condition: "Remanufactured", price: 1671, availability: "1–2 weeks" },
  { id: "rec104", partNumber: "KOM-SHOE-125074", description: "Track shoe, single grouser", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC1250", condition: "New", price: 318, availability: "In stock" },
  { id: "rec105", partNumber: "KOM-SHOE-C49043", description: "Track shoe, single grouser", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC490", condition: "New", price: 142, availability: "2–3 weeks" },
  { id: "rec106", partNumber: "KOM-ADJ-D15512", description: "Track adjuster / recoil unit", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu D155", condition: "New", price: 826, availability: "In stock" },
  { id: "rec107", partNumber: "KOM-RCL-125086", description: "Recoil spring assembly", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC1250", condition: "New", price: 878, availability: "2–3 weeks" },
  { id: "rec108", partNumber: "KOM-RCL-200029", description: "Recoil spring assembly", brand: "Komatsu", category: "Undercarriage Systems", machine: "Komatsu PC2000", condition: "Used", price: 770, availability: "3–4 weeks" },
  { id: "rec109", partNumber: "KOM-HYD-C49075", description: "Hydraulic main pump", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC490", condition: "Remanufactured", price: 5769, availability: "3–4 weeks" },
  { id: "rec110", partNumber: "KOM-MCV-200097", description: "Main control valve", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC2000", condition: "Used", price: 4992, availability: "In stock" },
  { id: "rec111", partNumber: "KOM-MCV-C49020", description: "Main control valve", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC490", condition: "New", price: 2727, availability: "In stock" },
  { id: "rec112", partNumber: "KOM-SEAL-C49058", description: "Hydraulic cylinder seal kit", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC490", condition: "Remanufactured", price: 411, availability: "In stock" },
  { id: "rec113", partNumber: "KOM-FD-200078", description: "Final drive assembly", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC2000", condition: "New", price: 6588, availability: "2–3 weeks" },
  { id: "rec114", partNumber: "KOM-SWM-125074", description: "Swing motor", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC1250", condition: "New", price: 4592, availability: "3–4 weeks" },
  { id: "rec115", partNumber: "KOM-SWM-C49018", description: "Swing motor", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC490", condition: "New", price: 4340, availability: "In stock" },
  { id: "rec116", partNumber: "KOM-GET-C49036", description: "Bucket tooth set (rock)", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC490", condition: "Used", price: 716, availability: "2–3 weeks" },
  { id: "rec117", partNumber: "KOM-CE-125071", description: "Cutting edge, bolt-on", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC1250", condition: "New", price: 534, availability: "3–4 weeks" },
  { id: "rec118", partNumber: "KOM-CE-C49090", description: "Cutting edge, bolt-on", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC490", condition: "New", price: 443, availability: "3–4 weeks" },
  { id: "rec119", partNumber: "KOM-AF-125089", description: "Air filter (primary+safety)", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC1250", condition: "New", price: 235, availability: "In stock" },
  { id: "rec120", partNumber: "KOM-AF-200071", description: "Air filter (primary+safety)", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC2000", condition: "Remanufactured", price: 105, availability: "1–2 weeks" },
  { id: "rec121", partNumber: "KOM-FF-C49098", description: "Fuel filter kit", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC490", condition: "Used", price: 97, availability: "2–3 weeks" },
  { id: "rec122", partNumber: "KOM-ALT-200069", description: "Alternator, 24V", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC2000", condition: "Remanufactured", price: 618, availability: "In stock" },
  { id: "rec123", partNumber: "KOM-ALT-125080", description: "Alternator, 24V", brand: "Komatsu", category: "Spare Parts", machine: "Komatsu PC1250", condition: "New", price: 482, availability: "In stock" }
];
