/* ============================================================
   MANAKART — catalog + seller data
   Ported verbatim from the handoff's manakart-data.js (PRODUCTS + VENDORS).
   TODO: replace these static maps with the app's real data-layer/API calls.
   ============================================================ */

export type ArtKey =
  | 'diya' | 'pottery' | 'spices' | 'textile' | 'basket'
  | 'jute' | 'chikki' | 'grain';

export interface Vendor {
  id: string;
  name: string;
  loc: string;
  region: string;
  since: number;
  rating: number;
  reviews: number;
  orders: string;
  art: ArtKey;
  about: string;
  gst: boolean;
  response: string;
  ships: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  loc: string;
  region: string;
  cat: string;
  moq: string;
  price: number;
  unit: string;
  art: ArtKey;
  flag: string;
  rating: number;
  reviews: number;
  vendor: string;
  gst: boolean;
  new: boolean;
}

export const VENDORS: Record<string, Vendor> = {
  'moradabad-brass': { id: 'moradabad-brass', name: 'Saraswati Brass Works', loc: 'Moradabad, Uttar Pradesh', region: 'Uttar Pradesh', since: 2009, rating: 4.8, reviews: 1240, orders: '14,800+', art: 'diya', about: 'A third-generation brass-craft unit from Moradabad — India’s "Peetal Nagri" (Brass City). We supply temples, gifting brands and exporters with hand-finished diyas, urlis and pooja ware.', gst: true, response: 'Within 2 hrs', ships: 'Pan-India · 5–7 days', verified: true },
  'kolkata-jute': { id: 'kolkata-jute', name: 'Bengal Jute Collective', loc: 'Kolkata, West Bengal', region: 'West Bengal', since: 2014, rating: 4.7, reviews: 860, orders: '9,200+', art: 'jute', about: 'A women-led producer collective making eco-friendly jute bags, sacks and packaging from Bengal’s golden fibre. GST-registered and Udyam-certified.', gst: true, response: 'Within 4 hrs', ships: 'Pan-India · 4–6 days', verified: true },
  'maha-foods': { id: 'maha-foods', name: 'Sahyadri Farm Foods', loc: 'Pune, Maharashtra', region: 'Maharashtra', since: 2016, rating: 4.9, reviews: 540, orders: '6,100+', art: 'chikki', about: 'Small-batch traditional sweets and snacks — peanut chikki, til laddoo and jaggery products made with farm-sourced groundnut and Kolhapuri gur.', gst: true, response: 'Within 1 hr', ships: 'Pan-India · 3–5 days', verified: true },
  'coimbatore-cotton': { id: 'coimbatore-cotton', name: 'Kongu Cotton Mills', loc: 'Coimbatore, Tamil Nadu', region: 'Tamil Nadu', since: 2007, rating: 4.6, reviews: 1480, orders: '21,400+', art: 'textile', about: 'Factory-direct woven cotton from the Coimbatore textile cluster. Greige and dyed fabric by the metre for garment, home-furnishing and uniform buyers.', gst: true, response: 'Within 3 hrs', ships: 'Pan-India · 5–8 days', verified: true },
  'kerala-spice': { id: 'kerala-spice', name: 'Idukki Spice Estate', loc: 'Idukki, Kerala', region: 'Kerala', since: 2011, rating: 4.9, reviews: 720, orders: '8,700+', art: 'spices', about: 'Estate-grown whole spices from the Western Ghats — cardamom, pepper, clove and turmeric. Direct from grower, lab-tested for purity.', gst: true, response: 'Within 2 hrs', ships: 'Pan-India · 4–6 days', verified: true },
  'raj-pottery': { id: 'raj-pottery', name: 'Marwar Terracotta Studio', loc: 'Jodhpur, Rajasthan', region: 'Rajasthan', since: 2013, rating: 4.7, reviews: 410, orders: '4,300+', art: 'pottery', about: 'Hand-thrown terracotta and blue-pottery planters, matkas and tableware from the potters of Marwar.', gst: true, response: 'Within 5 hrs', ships: 'Pan-India · 6–9 days', verified: true },
};

export const PRODUCTS: Product[] = [
  { id: 'brass-diya', name: 'Brass Diya', loc: 'Moradabad, UP', region: 'Uttar Pradesh', cat: 'Handicrafts', moq: '20 pcs', price: 220, unit: '/pc', art: 'diya', flag: 'Verified MSME', rating: 4.8, reviews: 312, vendor: 'moradabad-brass', gst: true, new: false },
  { id: 'jute-tote', name: 'Jute Tote Bag', loc: 'Kolkata, WB', region: 'West Bengal', cat: 'Packaging', moq: '50 pcs', price: 85, unit: '/pc', art: 'jute', flag: 'Low MOQ', rating: 4.7, reviews: 188, vendor: 'kolkata-jute', gst: true, new: true },
  { id: 'peanut-chikki', name: 'Peanut Chikki', loc: 'Maharashtra', region: 'Maharashtra', cat: 'Food Commodities', moq: '10 kg', price: 120, unit: '/kg', art: 'chikki', flag: 'GST Available', rating: 4.9, reviews: 96, vendor: 'maha-foods', gst: true, new: false },
  { id: 'cotton-fabric', name: 'Cotton Fabric', loc: 'Coimbatore, TN', region: 'Tamil Nadu', cat: 'Textiles', moq: '50 mtr', price: 65, unit: '/mtr', art: 'textile', flag: 'Factory Direct', rating: 4.6, reviews: 421, vendor: 'coimbatore-cotton', gst: true, new: false },
  { id: 'spices-combo', name: 'Spices Combo', loc: 'Kerala', region: 'Kerala', cat: 'Food Commodities', moq: '2 kg', price: 250, unit: '/kg', art: 'spices', flag: 'Verified MSME', rating: 4.9, reviews: 142, vendor: 'kerala-spice', gst: true, new: true },
  { id: 'terracotta-planter', name: 'Terracotta Planter', loc: 'Jodhpur, RJ', region: 'Rajasthan', cat: 'Home & Kitchen', moq: '12 pcs', price: 180, unit: '/pc', art: 'pottery', flag: 'Verified MSME', rating: 4.7, reviews: 74, vendor: 'raj-pottery', gst: true, new: false },
  { id: 'brass-urli', name: 'Brass Urli Bowl', loc: 'Moradabad, UP', region: 'Uttar Pradesh', cat: 'Handicrafts', moq: '10 pcs', price: 540, unit: '/pc', art: 'diya', flag: 'GST Available', rating: 4.8, reviews: 58, vendor: 'moradabad-brass', gst: true, new: false },
  { id: 'jute-sack', name: 'Jute Grain Sack', loc: 'Kolkata, WB', region: 'West Bengal', cat: 'Packaging', moq: '100 pcs', price: 42, unit: '/pc', art: 'jute', flag: 'Factory Direct', rating: 4.6, reviews: 133, vendor: 'kolkata-jute', gst: true, new: false },
  { id: 'turmeric-whole', name: 'Whole Turmeric', loc: 'Idukki, Kerala', region: 'Kerala', cat: 'Agriculture', moq: '5 kg', price: 160, unit: '/kg', art: 'spices', flag: 'Low MOQ', rating: 4.8, reviews: 205, vendor: 'kerala-spice', gst: true, new: true },
  { id: 'handloom-stack', name: 'Handloom Cloth', loc: 'Coimbatore, TN', region: 'Tamil Nadu', cat: 'Textiles', moq: '30 mtr', price: 95, unit: '/mtr', art: 'textile', flag: 'Verified MSME', rating: 4.7, reviews: 167, vendor: 'coimbatore-cotton', gst: true, new: false },
  { id: 'jaggery-block', name: 'Organic Jaggery', loc: 'Kolhapur, MH', region: 'Maharashtra', cat: 'Food Commodities', moq: '15 kg', price: 78, unit: '/kg', art: 'chikki', flag: 'GST Available', rating: 4.8, reviews: 89, vendor: 'maha-foods', gst: true, new: false },
  { id: 'blue-pottery-set', name: 'Blue Pottery Set', loc: 'Jodhpur, RJ', region: 'Rajasthan', cat: 'Handicrafts', moq: '8 sets', price: 640, unit: '/set', art: 'pottery', flag: 'Low MOQ', rating: 4.9, reviews: 46, vendor: 'raj-pottery', gst: true, new: true },
];

export const getProduct = (id: string | null | undefined): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getVendor = (id: string | null | undefined): Vendor | undefined =>
  id ? VENDORS[id] : undefined;

export const byVendor = (vid: string): Product[] =>
  PRODUCTS.filter((p) => p.vendor === vid);

/** ₹ formatting — mirrors MK.rupee in manakart.js */
export const rupee = (n: number): string => '₹' + Number(n).toLocaleString('en-IN');
