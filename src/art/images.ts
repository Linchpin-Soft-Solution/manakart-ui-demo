/* ============================================================
   MANAKART — real-image sourcing
   Photos are real, freely-licensed images downloaded from Wikimedia
   Commons into /public/images (see scripts/fetch-images.mjs) and
   referenced via the generated manifest below. The inline SVG
   placeholders in Art.tsx remain the fallback if a file is missing.

   TODO: real photography — swap the manifest for the app's own
   product/seller image CDN; the per-id / per-art resolution stays.
   ============================================================ */
import type { ArtKey } from '../data/catalog'
import manifest from './image-manifest.json'

const products = manifest.products as Record<string, string>
const arts = manifest.arts as Record<string, string>

/** real photo for a product → its own image, else its art's image, else '' (SVG fallback) */
export const imageForProduct = (id: string, art: ArtKey): string =>
  products[id] ?? arts[art] ?? ''

/** real photo for an art key → art image, else '' (SVG fallback) */
export const imageForArt = (art: ArtKey): string => arts[art] ?? ''
