# Handoff: Manakart — Regional MSME Bazaar (Indian retromodern type system)

## Overview
Manakart is a B2B/B2C marketplace web app for **Indian MSME-made commodities and handicrafts** — buyers source verified, GST-ready goods directly from small manufacturers, with low MOQs. This package documents the full marketplace UI (5 screens) and, in particular, the **finalized Indian-retromodern typography system** (Tiro Devanagari Hindi + Mukta) that the design has landed on.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS/JS** — working prototypes showing the intended look, layout, and behavior. They are **not** meant to be shipped verbatim. The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, Next, etc.) using its established component patterns, routing, and state libraries. If no front-end environment exists yet, pick the most appropriate framework and implement there.

The prototype uses vanilla JS with `localStorage` for cart/wishlist state and inline SVG "art" placeholders for product imagery — both are stand-ins. In production, replace the SVG placeholders with real product photography and back the cart/catalog with the app's real data layer.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, radii, shadows, and interaction states are all final and exact. Recreate the UI pixel-faithfully using the codebase's libraries. The values in **Design Tokens** below are the source of truth.

---

## Typography (the headline change in this round)

The brand uses a **two-family Indian type system**:

| Role | Family | Source | Weights used | Notes |
|---|---|---|---|---|
| **Display** (headings, brand wordmark, prices, stat numbers) | **Tiro Devanagari Hindi** | Google Fonts | 400 + **700** | Tiro ships **only Regular + Italic**. The design uses a **synthesized (faux) bold** at weight 700 — the browser thickens the strokes. This is intentional and approved. If a real bold is later desired, the closest true-bold Indian-script serifs are *Rozha One* (heavier contrast) or *Martel* — but the current spec is faux-bold Tiro. |
| **Body / UI** (paragraphs, nav, buttons, labels, meta) | **Mukta** | Google Fonts | 400 / 500 / 600 / 700 / 800 | Indian Type Foundry humanist sans; warm and legible at small sizes. |

Import:
```css
@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Mukta:wght@400;500;600;700;800&display=swap');
```
Tokens:
```css
--font-display: 'Tiro Devanagari Hindi', Georgia, serif;  /* always rendered at 700 (synthesized bold) */
--font-body:    'Mukta', system-ui, -apple-system, sans-serif;
```

**Rule of thumb:** every Tiro element is **font-weight: 700**. Keep `font-synthesis: weight` enabled (it is by default) so the faux bold renders. Body text is Mukta 400–600.

### Type scale (px, all display = Tiro 700 unless noted)
| Use | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Hero H1 | Tiro | 56 | 700 | 1.06 | -.01em |
| Section title (`.section-title`) | Tiro | 34 | 700 | 1.12 | -.005em |
| Deal hero H3 | Tiro | 34 | 700 | 1.12 | -.005em |
| Card / panel H3–H4 | Tiro | 20–22 | 700 | 1.12 | -.005em |
| Brand wordmark (`.brand`) | Tiro | 28 | 700 | 1.0 | -.01em |
| Product name (`.pc-name`) | Tiro | 19 | 700 | 1.2 | 0 |
| Product price (`.pc-price .amt`) | Tiro | 23 | 700 | 1.1 | 0 |
| PDP price (`.price-now .amt`) | Tiro | 40 | 700 | — | — |
| Hero stat number | Tiro | 33 | 700 | 1.0 | -.005em |
| Cart line total / summary total | Tiro | 22 / 30 | 700 | — | — |
| Body copy | Mukta | 15–18 | 400 | 1.55 | — |
| Eyebrow (`.eyebrow`) | Mukta | 12 | 700 | — | .18em, UPPERCASE, preceded by a 26px terracotta rule |
| Nav link | Mukta | 14.5 | 500 | — | — |
| Button | Mukta | 15 | 600 | — | — |

---

## Design Tokens

### Colors
```
/* Surfaces — warm cream */
--cream:        #FAF6EC   /* page background */
--cream-2:      #F5EEDF   /* alt section background */
--beige:        #F1E8D6   /* soft card surface */
--beige-2:      #EBE0CA   /* deeper beige */
--paper:        #FFFDF8   /* raised cards */

/* Brand */
--green:        #1C5236   /* deep forest green — primary action */
--green-700:    #163F2A   /* hover */
--green-900:    #0F2E1F   /* pressed / footer bg */
--green-soft:   #E3EBE2   /* tint / focus ring */
--terracotta:   #C15A36   /* accent (eyebrows, badges, links-hover) */
--terracotta-2: #A8492A   /* accent hover */
--terracotta-soft:#F6E4D8
--gold:         #C19433   /* star ratings */
--gold-soft:    #F3E8CE

/* Ink (text) */
--ink:    #2B2722   /* primary text */
--ink-2:  #5C544A   /* secondary */
--ink-3:  #8B8275   /* muted / meta */
--ink-line: #E5DAC4 /* borders on cream */
--line-soft: #EFE6D5
```

### Radius
```
--r-sm: 8px;  --r: 12px;  --r-lg: 16px;  --r-xl: 22px;  /* pills/circles: 999px */
```

### Shadow (soft, warm-tinted)
```
--sh-sm: 0 1px 2px rgba(58,40,18,.05), 0 2px 6px rgba(58,40,18,.04);
--sh:    0 4px 14px -6px rgba(58,40,18,.14), 0 2px 6px rgba(58,40,18,.05);
--sh-lg: 0 18px 40px -22px rgba(58,40,18,.30), 0 6px 16px -10px rgba(58,40,18,.12);
```

### Spacing & layout
- Container max-width **1320px**, side padding **40px**.
- Section vertical rhythm: `.block` = **64px** top/bottom.
- 4px-based spacing; common gaps 14 / 16 / 18 / 22 / 36 / 40 / 64.

### Motion
- Standard transition: `200ms cubic-bezier(.2,.7,.3,1)` (token `--t`).
- Card hover: `translateY(-4px)` + `--sh-lg` + border → `--beige-2`.
- Button hover: `translateY(-1px)` + intensified shadow; active resets Y / scales.
- Nav link underline: terracotta bar scales X 0→1 from left.
- Toast: slide-up + fade, 0.3s.

---

## Screens / Views

All screens share a **sticky header** (cream, blurred, `rgba(250,246,236,.88)` + `backdrop-filter: blur(12px)`) with: brand wordmark, pill search field, wishlist/account/cart icon buttons (44px hit targets, terracotta count badges), and a secondary nav row. All share the green **footer** (`--green-900`).

### 1. `index.html` — Home
- **Purpose:** Land buyers, surface deals, categories, bestsellers, trust.
- **Layout / sections (top→bottom):**
  - **Hero** — 2-col grid `1.05fr / 1fr`, 64px gap, on `--cream`. Left: eyebrow → H1 (56px Tiro, second line in `--green`) → subhead (Mukta, max 500px) → CTA row (primary "Shop Now" + ghost "Explore Regions") → stat row (3 stats, Tiro numbers 33px with a top divider). Right: a 3×2 **collage** of image placeholders (480px tall) with an absolutely-positioned "Verified MSME sellers" tag card bottom-left.
  - **Featured Deals** — `.deals-grid` `1.5fr/1fr/1fr` × 2 rows, 480px tall: one tall hero deal (left, spans 2 rows) + three small deal tiles. Each is an image tile with a bottom gradient scrim and white text (kicker in `--gold-soft`, H3, copy).
  - **Popular Categories** — on `--cream-2`, eyebrow + title, 4-col grid of category cards (icon in 52px rounded square + name).
  - **Regional Bestsellers** — 5-col product-card row.
  - **Trust strip** — full-width `--green` band, 4 columns (icon tile + heading + sub), divided by hairlines.
- **Background texture:** `.bazaar-texture` = faint 22px radial-dot grid at 5% green; used on hero and the categories section only.

### 2. `category.html` — Product listing
- **Purpose:** Browse/filter all products.
- **Layout:** Breadcrumb → eyebrow + "Shop all products" title + result count + a "Sort: Most popular" control. Below: a **Filters panel** (category checkboxes with counts, etc.) alongside a **product grid**. Filtering/sorting handled in JS over the shared `PRODUCTS` data.

### 3. `product.html` — Product detail (PDP)
- **Purpose:** View one product, pick quantity tier, add to cart.
- **Key components:** Gallery (image placeholders), title, `.price-box` on `--beige` with a large **40px Tiro** price, MOQ note; **quantity tiers** (`.tier`, with a `.best` highlighted variant bordered in green); quantity stepper; buy row (full-width buttons, 52px tall); assurance grid; **seller card** (`.seller-card`, avatar + name + meta on `--cream-2`).

### 4. `cart.html` — Cart
- **Purpose:** Review items, adjust quantities, see totals.
- **Layout:** Item list (`.cart-item` grid `110px / 1fr / auto`: media, info incl. 21px Tiro name, controls with stepper + 22px Tiro line total) alongside a sticky **summary** card on `--cream-2` (rows + a 30px Tiro grand total, GST tag, checkout button). Empty-cart state supported.

### 5. `vendor.html` — Seller profile
- **Purpose:** Show a verified seller and their catalog.
- **Key components:** Seller header (name, location, verified state), a 4-up **stats grid** (`.vstat` with 28px Tiro numbers on `--beige`), about copy, and the seller's product grid. Data from the shared `VENDORS` map.

---

## Components (shared)
- **Button** (`.btn` + `.btn-primary` green / `.btn-accent` terracotta / `.btn-ghost`): radius `--r`, padding 13×24, Mukta 600, 18px leading icon slot. Hover lifts 1px with shadow. `.btn-sm` and `.btn-block` modifiers.
- **Product card** (`.product-card`): `--paper` surface, `--r-lg`, 1:1 media with hover zoom (`scale(1.04)`), a top-left **flag** chip (e.g. "Verified MSME" / "Low MOQ" — green, or terracotta `.accent`), a hover-revealed **wishlist** heart (top-right, toggles `.active`), body with location+icon, Tiro name, MOQ + star rating meta, and a footer with Tiro price + a 42px square green **add** button.
- **Eyebrow** (`.eyebrow`): uppercase Mukta 700, 12px, .18em tracking, with a 26px terracotta leading rule (`::before`).
- **Quantity stepper** (`.stepper`): bordered pill, −/＋ buttons + center number input.
- **Toast** (`.toast`): dark `--ink` pill, bottom-center, slide-up; fired on add-to-cart.
- **Trust strip, footer, sticky nav** as described per-screen.

## Interactions & Behavior
- **Cart & wishlist** persist in `localStorage` (`manakart_cart`, `manakart_wish`) via the `MK` object in `manakart.js`: `addToCart`, `setQty`, `removeFromCart`, `toggleWish`, `refreshBadges`, `toast`. Header badges reflect counts on every page load. **In production, swap localStorage for the app's real cart/session backend.**
- **Add to cart** shows a toast and bumps the header badge.
- **Wishlist heart** toggles filled/terracotta and updates the wishlist badge.
- **Category filters / sort** recompute the grid from the `PRODUCTS` array.
- **Hover states** on cards, buttons, nav links, links-more (gap grows + color → terracotta).
- **Responsive:** breakpoint at **1100px** — hero collapses to 1 column, deals grid to 2-col, categories/products to 2-col, footer to 2-col, trust strip to 2-col.

## State Management
- `cart`: array of `{ id, name, price, unit, qty, ... }`.
- `wishlist`: array of product ids.
- Catalog (`PRODUCTS`) and sellers (`VENDORS`) are static maps in `manakart-data.js` — replace with API/data-layer calls.
- PDP/category derive their view from a product id / filter state.

## Assets
- **No raster assets** in the prototype. Product/seller imagery is rendered as inline SVG "art" placeholders keyed by an `art` field (e.g. `diya`, `jute`, `spices`, `textile`, `pottery`, `chikki`) in `manakart-art.js`. **Replace these with real photography** (1:1 for product cards/avatars, larger for PDP gallery, 16:9 acceptable for deal banners).
- **Icons:** inline SVG, 1.8 stroke, sized 13–26px, colored via `currentColor`. Swap for the codebase's icon library (Lucide-style line icons match the look).
- **Fonts:** Tiro Devanagari Hindi + Mukta from Google Fonts (see import above).

## Files
All design source is included in this bundle:
- `index.html` — Home (page-specific CSS in a trailing `<style>` block)
- `category.html` — Listing (page-specific CSS inline)
- `product.html` — PDP (page-specific CSS inline)
- `cart.html` — Cart (page-specific CSS inline)
- `vendor.html` — Seller profile (page-specific CSS inline)
- `manakart.css` — **shared design system**: tokens, typography, buttons, header, product card, trust strip, footer, toast, stepper
- `manakart.js` — shared cart/wishlist state, badges, toasts, stepper wiring (`MK` global)
- `manakart-data.js` — catalog (`PRODUCTS`) + sellers (`VENDORS`)
- `manakart-art.js` — SVG placeholder art + `MKART.productCard()` / `MKART.icon()` helpers (replace with real components/images)
- `manakart-chrome.js` — shared header/footer rendering helpers

> Start at `manakart.css` for the design system, then read each page's trailing/inline `<style>` block for page-specific layout. The typography section above is the canonical spec for the Tiro + Mukta system.
