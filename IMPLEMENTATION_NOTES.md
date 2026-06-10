# Manakart — Implementation Notes

Interactive React + Vite + TypeScript reproduction of the Manakart marketplace
design handoff. Plain CSS / CSS variables only — no UI kit. Icons from
`lucide-react`. Cart + wishlist state in a React context backed by `localStorage`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build  (passes clean, strict)

# (optional) re-pull product photography from Wikimedia Commons
node scripts/fetch-images.mjs
```

## Brand logo

The supplied `logo.png` ("ManaKart.com" wordmark) is served from `public/logo.png`
and used as the header brand (`.brand-logo img`). The footer keeps the white text
wordmark — the logo's blue "Mana" reads poorly on the dark-green footer, so the
text mark is the better fit there.

## Real images

Product/seller photography is now **real, freely-licensed images** (not SVG):

- `scripts/fetch-images.mjs` queries the **Wikimedia Commons** API per product /
  per art key with curated search terms + a relevance filter, downloads the photos
  into `public/images/`, and writes `src/art/image-manifest.json`.
- `src/art/images.ts` resolves a photo per product (`imageForProduct`) or per art
  (`imageForArt`) from that manifest.
- `src/art/Art.tsx` renders the photo as an `<img>` and **falls back to the original
  on-brand inline SVG** if the file is missing or fails to load (offline-safe). So
  the SVG seam from the first pass is still the graceful degrade path.
- These are representative stock photos. The `// TODO: real photography` seam in
  `Art.tsx` / `images.ts` marks where to swap in the app's own product image CDN.

## Working search

The shared header search is wired: submitting navigates to
`/category?q=<term>`; the listing page reads `q` and filters across product name,
category, region, location, flag and seller name (all tokens must match). The
listing head shows "Results for …" with a **Clear search** chip. The same URL-param
mechanism powers the region cards (`/category?region=…`) and the New Arrivals / Low
MOQ / Factory Direct nav links (`?new=1`, `?flag=…`).

## Mobile responsive

Beyond the handoff's single 1100px tablet breakpoint, two phone layers were added
(`src/styles/pages.css` + `pages-extra.css`): **760px** and **520px**. Key collapses:
header reflows to brand+actions on row 1 with a full-width search on row 2 and a
horizontally-scrolling primary nav (secondary nav hidden); hero/deal/section type
scales down; product, category, related, vendor and region grids go to 1 column;
cart line items stack media+info over a full-width controls row; vendor header and
PDP buy-row wrap; footer and trust strip go single-column.

## Where the design comes from

The original handoff source is preserved verbatim under
`design_handoff_manakart/` (the 5 HTML pages + `manakart.css` / `manakart.js` /
`manakart-data.js` / `manakart-art.js` / `manakart-chrome.js` + `README.md`).
Everything in `src/` traces back to those files:

| Handoff file | Ported to |
|---|---|
| `manakart.css` (design system) | `src/styles/manakart.css` (verbatim) |
| each page's inline `<style>` | `src/styles/pages.css` (verbatim, `.crumb` scoped per page) |
| `manakart-data.js` (`PRODUCTS`, `VENDORS`) | `src/data/catalog.ts` (typed, verbatim values) |
| `manakart-art.js` (`ART` SVG map) | `src/art/Art.tsx` (verbatim SVG strings) |
| `manakart.js` (`MK` cart/wishlist/toast) | `src/context/StoreContext.tsx` |
| `manakart-chrome.js` (header/footer) | `src/components/Header.tsx`, `Footer.tsx` |
| `index/category/product/cart/vendor.html` | `src/pages/*.tsx` |

## Fidelity decisions

- **Typography** — Tiro Devanagari Hindi (display) + Mukta (body/UI) loaded from
  Google Fonts via the exact import string (in `index.html`). All display text is
  `font-weight: 700` with `font-synthesis: weight style` kept on, so Tiro renders
  as the approved **faux/synthesized bold**. Full type scale, color tokens, radii,
  shadows, 1320px container, 40px gutters, 64px `.block` rhythm, and the
  `200ms cubic-bezier(.2,.7,.3,1)` motion token are copied exactly from the README
  / `manakart.css`.
- **Single 1100px breakpoint** with all the collapses from the handoff (hero→1col,
  deals→2col, categories/products→2col, footer→2col, trust strip→2col) — carried
  over verbatim in `pages.css`.
- **Icons** — the README directs swapping the inline SVGs for a Lucide-style
  library, so `lucide-react` is used throughout. The bespoke **brand-wordmark
  leaf** is kept as an inline SVG (ported verbatim) since it's a logo detail with
  no clean Lucide equivalent. Category icons map to the closest Lucide line icons
  (grain→`Wheat`, box→`Package`, textile→`Shirt`, diya→`Flame`, gear→`Settings`,
  leaf→`Leaf`, clip→`Paperclip`, pot→`CookingPot`); the product-card flag uses
  `ShieldCheck` (the handoff's shield-check glyph) and stars use a solid-filled
  `Star`.

## Interactions implemented

- Add-to-cart → toast + header cart badge increment; persists across reloads
  (`localStorage` keys `manakart_cart` / `manakart_wish`, same as the prototype).
  The cart badge counts **distinct line items** — mirrors `MK.refreshBadges`
  (`getCart().length`), not total units.
- Wishlist heart toggles (filled terracotta when active) + wishlist badge; persists.
- Quantity steppers everywhere (cart lines + PDP), min-clamped, with live line/grand
  totals and tiered bulk pricing (`>=5×MOQ` → −8%, `>=20×MOQ` → −15%) mirrored
  between the PDP and the cart.
- Category page: live category/region/benefit checkboxes with counts + 5-way sort,
  recomputed from `PRODUCTS`; empty-filter state.
- PDP: gallery thumbnails, quantity tiers with the highlighted `.best` variant,
  description/specs/shipping tabs, related products, seller card.
- Cart: line items, sticky summary with GST (18%) + grand total, GST tag, and the
  empty-cart state.
- Vendor: seller header with follow toggle, 4-up stats grid, about + credentials,
  store-details side panel, seller's product grid.
- Client-side routing (React Router) across all 5 screens with a shared
  header/footer and scroll-to-top on navigation.

## Added feature pages (beyond the 5 handoff screens)

These extend the prototype into a fuller feature demo. All use only the handoff's
design tokens/components — no new colours or fonts.

| Route | Page | What it demos |
|---|---|---|
| `/deals` | **Bulk Deals** | Deal bento grid + "how bulk pricing works" + bulk-ready product grid |
| `/about` | **About Manakart** | Mission, stat band, how-it-works steps, promises grid, CTA |
| `/track` | **Track Order** | Enter any order ID → deterministic status timeline (placed → delivered) with carrier + ETA |
| `/regions` | **Shop by Region** | Region cards → open the listing filtered to that state |
| `/sell` | **Sell on Manakart** | Seller pitch, benefits, 4-step onboarding, CTA (→ login) |
| `/login` | **Login / Register** | Demo auth form (tabs), submit fires a toast + returns home |
| `/contact` | **Contact Us** | Demo contact form + contact info panel |

Header nav + footer links now route to these. `Track Order`, `Login`, `Contact`
and the seller "start selling" action are client-side demos (toasts; no backend).

## Deviations from the handoff

1. **Routes instead of `.html` files.** `product.html?id=` → `/product/:id`,
   `vendor.html?id=` → `/vendor/:id`, etc. Links updated accordingly.
2. **Header/footer links are now wired** to real routes (the prototype pointed many
   at `#`). Account → `/login`, Sell → `/sell`, the support/seller footer links →
   `/track` `/contact` `/sell` `/about`, etc. The header **wishlist icon** routes to
   `/category` (there is no dedicated wishlist screen in the handoff; the heart
   toggle + badge behaviour is the wishlist feature).
3. **Toasts** are rendered by a React `<Toaster>` from context state rather than
   imperative DOM injection, but produce the same markup/animation.
4. The handoff `basket` / `grain` SVG art and a few `ICON` glyphs that the
   prototype defined but never rendered are carried in `Art.tsx` / via Lucide for
   completeness.

## Where real data / photography plug in

- **Photography** — `src/art/Art.tsx` renders the inline SVG placeholders keyed by
  the `art` field. Each `<Art>` and the module header carry a
  `// TODO: real photography` seam: replace the placeholder `<div>`/SVG with an
  `<img>` (1:1 for cards & avatars, larger for the PDP gallery, 16:9 fine for deal
  banners).
- **Catalog / cart backend** — `src/data/catalog.ts` (`PRODUCTS`, `VENDORS`) is a
  static port; swap for API/data-layer calls. `src/context/StoreContext.tsx` uses
  `localStorage`; swap for the app's real cart/session backend (the public API —
  `addToCart`, `setQty`, `removeFromCart`, `toggleWish`, `isWished` — can stay).
