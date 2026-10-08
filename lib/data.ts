/* Store constants and dummy catalogue data.
   Prices are placeholder figures for the demo. Replace them with real rates before launch. */

export const STORE = {
  name: "Hafiz Paint Store",
  phone: "03369856837",
  phoneDisplay: "0336 9856837",
  whatsapp: "923369856837",
  address: "Maneri Road, Swabi, KPK",
  map: "https://www.google.com/maps/search/?api=1&query=Hafiz+Paint+Store+Swabi",
  hours: "Daily · 9 AM – 7 PM",
};

export type Category = "Interior" | "Exterior" | "Enamel" | "Wood" | "Prep" | "Tools";
export type Visual = "can" | "bucket" | "tub" | "brush" | "roller";
export type Shade = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  visual: Visual;
  tagline: string;
  description: string;
  color: string;
  badge?: string;
  finish?: string;
  coverage?: string;
  dryTime?: string;
  rating: number;
  sizes: { label: string; price: number }[];
  shades?: Shade[];
  features: string[];
};

const popularShades: Shade[] = [
  { name: "Brilliant White", hex: "#f7f5ef" },
  { name: "Off White", hex: "#efe6d2" },
  { name: "Sky Blue", hex: "#8fbbe0" },
  { name: "Mint Green", hex: "#a8d5ba" },
  { name: "Peach Blossom", hex: "#f4b99a" },
  { name: "Lemon Mist", hex: "#f3e18a" },
  { name: "Lilac", hex: "#c3b1e1" },
  { name: "Silver Grey", hex: "#b9bec6" },
];

const exteriorShades: Shade[] = [
  { name: "Desert Sand", hex: "#d8b98a" },
  { name: "Terracotta", hex: "#c46a4a" },
  { name: "Ivory", hex: "#f2ead3" },
  { name: "Stone Grey", hex: "#8d9096" },
  { name: "Brick Red", hex: "#9c3b2e" },
  { name: "Olive", hex: "#8a8f5a" },
];

const enamelShades: Shade[] = [
  { name: "Gloss White", hex: "#fbfbfb" },
  { name: "Jet Black", hex: "#1b1b1f" },
  { name: "Signal Red", hex: "#c1121f" },
  { name: "Royal Blue", hex: "#1f4fa8" },
  { name: "Golden Brown", hex: "#8a5a2b" },
  { name: "Bottle Green", hex: "#1f5a3d" },
];

export const products: Product[] = [
  {
    id: "super-emulsion", name: "Super Emulsion", brand: "Brighto", category: "Interior", visual: "bucket",
    tagline: "Silky, washable walls for every room",
    description: "Brighto's flagship interior emulsion with a smooth matt-sheen finish. Low odour, quick drying and washable, ideal for living rooms and bedrooms.",
    color: "#3b78c4", badge: "Best seller", finish: "Matt sheen", coverage: "120–140 sq ft / L", dryTime: "1 hr touch dry", rating: 4.9,
    sizes: [{ label: "Quarter (0.9 L)", price: 1250 }, { label: "Gallon (3.6 L)", price: 4600 }, { label: "Drum (18 L)", price: 21500 }],
    shades: popularShades,
    features: ["Washable & stain resistant", "Low VOC, low odour", "Anti-fungal protection"],
  },
  {
    id: "silk-emulsion", name: "Silk Luxury Emulsion", brand: "Brighto", category: "Interior", visual: "bucket",
    tagline: "A soft silk glow for premium interiors",
    description: "A rich silk finish that reflects light beautifully. Great for drawing rooms, lounges and feature walls where you want a premium look.",
    color: "#9b86c9", badge: "Premium", finish: "Silk", coverage: "130–150 sq ft / L", dryTime: "1 hr touch dry", rating: 4.8,
    sizes: [{ label: "Quarter (0.9 L)", price: 1650 }, { label: "Gallon (3.6 L)", price: 6200 }, { label: "Drum (18 L)", price: 29500 }],
    shades: popularShades,
    features: ["Luxurious silk sheen", "Highly scrubbable", "Rich, deep colours"],
  },
  {
    id: "all-weather", name: "All Weather Exterior", brand: "Brighto", category: "Exterior", visual: "bucket",
    tagline: "Built for Swabi summers and monsoon rain",
    description: "Weatherproof acrylic exterior coating with UV resistance and water repellency. Keeps facades bright through heat, dust and heavy rain.",
    color: "#e8473b", badge: "Weatherproof", finish: "Smooth matt", coverage: "90–110 sq ft / L", dryTime: "2 hr touch dry", rating: 4.9,
    sizes: [{ label: "Gallon (3.6 L)", price: 5400 }, { label: "Drum (18 L)", price: 25500 }],
    shades: exteriorShades,
    features: ["UV & fade resistant", "Water repellent", "Algae & fungus guard"],
  },
  {
    id: "texture-coat", name: "Texture Coat", brand: "Brighto", category: "Exterior", visual: "tub",
    tagline: "Rich textured finish for boundary & facade walls",
    description: "Thick acrylic texture that hides hairline cracks and surface flaws. Gives facades a premium sand-texture look.",
    color: "#d6b98c", finish: "Sand texture", coverage: "15–20 sq ft / kg", dryTime: "4 hr touch dry", rating: 4.6,
    sizes: [{ label: "Bucket (20 kg)", price: 7800 }, { label: "Bucket (30 kg)", price: 11200 }],
    shades: exteriorShades,
    features: ["Hides surface cracks", "Weather resistant", "Decorative texture"],
  },
  {
    id: "synthetic-enamel", name: "Synthetic Enamel", brand: "Brighto", category: "Enamel", visual: "can",
    tagline: "Tough high-gloss for gates, grills & doors",
    description: "Classic alkyd gloss enamel with excellent flow and a mirror-like finish. Protects metal and wood from rust, moisture and wear.",
    color: "#f2b632", badge: "Contractor fav", finish: "High gloss", coverage: "160–180 sq ft / L", dryTime: "6 hr touch dry", rating: 4.8,
    sizes: [{ label: "Quarter (0.9 L)", price: 1450 }, { label: "Gallon (3.6 L)", price: 5300 }],
    shades: enamelShades,
    features: ["Mirror-like gloss", "Rust & moisture protection", "Durable on metal & wood"],
  },
  {
    id: "matt-enamel", name: "Matt Enamel", brand: "Brighto", category: "Enamel", visual: "can",
    tagline: "Modern low-sheen enamel for furniture & trims",
    description: "A contemporary matt enamel for doors, cabinets and trims. Hard-wearing like gloss but with a modern velvety look.",
    color: "#1f5a3d", finish: "Matt", coverage: "150–170 sq ft / L", dryTime: "6 hr touch dry", rating: 4.7,
    sizes: [{ label: "Quarter (0.9 L)", price: 1550 }, { label: "Gallon (3.6 L)", price: 5700 }],
    shades: enamelShades,
    features: ["Velvety modern finish", "Hard wearing", "Easy to clean"],
  },
  {
    id: "wood-polish", name: "Melamine Wood Polish", brand: "Brighto", category: "Wood", visual: "can",
    tagline: "Crystal-clear protection for furniture",
    description: "Fast-drying clear melamine lacquer that brings out natural wood grain and protects against scratches, heat and spills.",
    color: "#8a5a2b", finish: "Clear gloss / matt", coverage: "100 sq ft / L", dryTime: "30 min touch dry", rating: 4.7,
    sizes: [{ label: "Quarter (0.9 L)", price: 1350 }, { label: "Gallon (3.6 L)", price: 4900 }],
    features: ["Enhances wood grain", "Scratch & heat resistant", "Fast drying"],
  },
  {
    id: "wall-primer", name: "Wall Sealer & Primer", brand: "Brighto", category: "Prep", visual: "bucket",
    tagline: "The right start for a lasting finish",
    description: "Alkali-resistant wall sealer that seals porous plaster and improves topcoat adhesion, so you use less paint and get a better finish.",
    color: "#7da07a", finish: "Flat", coverage: "100–120 sq ft / L", dryTime: "2 hr", rating: 4.6,
    sizes: [{ label: "Gallon (3.6 L)", price: 2900 }, { label: "Drum (18 L)", price: 13500 }],
    features: ["Alkali resistant", "Better paint adhesion", "Saves topcoat"],
  },
  {
    id: "wall-putty", name: "Acrylic Wall Putty", brand: "Brighto", category: "Prep", visual: "tub",
    tagline: "Glass-smooth walls before you paint",
    description: "Ready-mix acrylic putty for filling dents and cracks. Sands easily to a glass-smooth surface for flawless paintwork.",
    color: "#9aa3ae", finish: "Smooth", coverage: "8–10 sq ft / kg", dryTime: "3–4 hr", rating: 4.5,
    sizes: [{ label: "Tub (5 kg)", price: 1600 }, { label: "Bucket (20 kg)", price: 5200 }],
    features: ["Ready to use", "Easy sanding", "Strong bonding"],
  },
  {
    id: "pro-brush-set", name: "Pro Brush Set (5 pcs)", brand: "Hafiz Select", category: "Tools", visual: "brush",
    tagline: "Clean edges, zero shedding",
    description: "Five synthetic-bristle brushes from 1 to 4 inches for cutting-in, trims and enamel work. Comfortable wooden handles.",
    color: "#c8a24a", rating: 4.6,
    sizes: [{ label: "Set of 5", price: 1450 }],
    features: ["No-shed bristles", "Sizes 1 to 4 inch", "Works with all paints"],
  },
  {
    id: "roller-kit", name: "Roller & Tray Kit", brand: "Hafiz Select", category: "Tools", visual: "roller",
    tagline: "Paint a room in half the time",
    description: "9 inch microfibre roller, extension-ready frame and a sturdy tray. Picks up more paint and leaves a smooth, even coat.",
    color: "#14275c", badge: "Value pack", rating: 4.7,
    sizes: [{ label: "9 inch kit", price: 1250 }, { label: "9 inch kit + 2 refills", price: 1850 }],
    features: ["Microfibre sleeve", "Extension compatible", "Spill-proof tray"],
  },
  {
    id: "prep-bundle", name: "Surface Prep Bundle", brand: "Hafiz Select", category: "Tools", visual: "brush",
    tagline: "Sandpaper, putty knives & masking tape",
    description: "Everything for prep in one bundle: assorted sandpaper, two putty knives, masking tape and a drop sheet.",
    color: "#c1121f", rating: 4.5,
    sizes: [{ label: "Standard bundle", price: 950 }],
    features: ["Assorted grit sandpaper", "2 putty knives", "Tape & drop sheet"],
  },
];

export const categories: ("All" | Category)[] = ["All", "Interior", "Exterior", "Enamel", "Wood", "Prep", "Tools"];

export const formatPKR = (n: number) => `Rs ${n.toLocaleString("en-US")}`;

export function waLink(text: string) {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const generalMessage =
  "Assalam o Alaikum, Hafiz Paint Store! 👋\nI'd like to ask about Brighto paints, shades and wholesale rates.";

export function productMessage(p: Product, opts: { size?: string; shade?: string; qty?: number } = {}) {
  const size = p.sizes.find((s) => s.label === opts.size) ?? p.sizes[0];
  const qty = Math.max(1, opts.qty ?? 1);
  const lines: (string | null)[] = [
    "Assalam o Alaikum, Hafiz Paint Store! 👋",
    "I'd like to order / enquire about:",
    "",
    `🎨 *Product:* ${p.brand} ${p.name}`,
    `🏷️ *Category:* ${p.category}`,
    `📦 *Size:* ${size.label}`,
    opts.shade ? `🖌️ *Shade:* ${opts.shade}` : null,
    `🔢 *Quantity:* ${qty}`,
    `💰 *Listed price:* ${formatPKR(size.price)} each (${formatPKR(size.price * qty)} total)`,
    p.finish ? `✨ *Finish:* ${p.finish}` : null,
    p.coverage ? `📐 *Coverage:* ${p.coverage}` : null,
    "",
    "Please confirm availability, wholesale rate and delivery to my location. Thank you!",
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

export const allShades: Shade[] = [...popularShades, ...exteriorShades, ...enamelShades];
