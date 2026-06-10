/* ============================================================
   MANAKART — illustration placeholders
   On-brand flat SVG product "scenes" ported verbatim from the
   handoff's manakart-art.js (ART map + bg() helper).

   TODO: real photography — swap <Art art="…"/> for <img> with
   real product/seller imagery (1:1 for cards & avatars, larger
   for the PDP gallery, 16:9 acceptable for deal banners).
   ============================================================ */
import { useEffect, useState } from 'react';
import type { ArtKey } from '../data/catalog';
import { imageForArt } from './images';

// palette (verbatim from manakart-art.js)
const C = {
  cream: '#FAF6EC', beige: '#F1E8D6', beige2: '#EBE0CA', paper: '#FFFDF8',
  green: '#1C5236', greenL: '#3E7C5A', terra: '#C15A36', terraL: '#D98A5E',
  gold: '#C19433', goldL: '#E0BE6B', ink: '#2B2722', brass: '#C79A4B',
};

function bg(fill: string, inner: string): string {
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="200" height="200" fill="${fill}"/>
      <circle cx="30" cy="34" r="2" fill="${C.ink}" opacity=".06"/><circle cx="170" cy="40" r="2" fill="${C.ink}" opacity=".06"/>
      <circle cx="46" cy="170" r="2" fill="${C.ink}" opacity=".06"/><circle cx="160" cy="166" r="2" fill="${C.ink}" opacity=".06"/>
      ${inner}</svg>`;
}

export const ART: Record<ArtKey, string> = {
  diya: bg('#F3E7D2', `
      <ellipse cx="100" cy="150" rx="60" ry="14" fill="#E4D2AE"/>
      <path d="M48 132 Q100 120 152 132 Q148 158 100 160 Q52 158 48 132Z" fill="${C.brass}"/>
      <path d="M48 132 Q100 144 152 132 Q150 138 100 148 Q50 138 48 132Z" fill="#A87B33"/>
      <path d="M100 128 q-8 4-8 12 t8 12 q8-4 8-12 t-8-12Z" fill="${C.terra}"/>
      <path d="M100 70 q-12 22 0 50 q12-28 0-50Z" fill="${C.gold}"/>
      <path d="M100 84 q-6 14 0 34 q6-20 0-34Z" fill="${C.terra}"/>`),
  pottery: bg('#EFE0CC', `
      <path d="M70 60 h60 l-6 14 q26 14 26 44 q0 38 -50 38 q-50 0 -50 -38 q0 -30 26 -44Z" fill="${C.terra}"/>
      <path d="M70 60 h60 l-4 9 h-52Z" fill="#A8492A"/>
      <ellipse cx="100" cy="118" rx="50" ry="44" fill="${C.terraL}" opacity=".0"/>
      <path d="M62 116 q38 16 76 0" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>
      <path d="M66 132 q34 14 68 0" stroke="#fff" stroke-width="3" fill="none" opacity=".35"/>`),
  spices: bg('#F2E4CB', `
      <circle cx="70" cy="110" r="34" fill="${C.gold}"/>
      <circle cx="70" cy="110" r="34" fill="none" stroke="#A87B33" stroke-width="3"/>
      <path d="M40 110 q30 -22 60 0Z" fill="#C0392B"/>
      <circle cx="134" cy="96" r="28" fill="${C.terra}"/>
      <path d="M108 96 q26 -18 52 0Z" fill="#8C3A1F"/>
      <circle cx="120" cy="146" r="24" fill="${C.green}"/>
      <path d="M98 146 q22 -16 44 0Z" fill="#143F2A"/>`),
  textile: bg('#EAE3D2', `
      <rect x="44" y="70" width="112" height="20" rx="4" fill="${C.green}"/>
      <rect x="44" y="94" width="112" height="20" rx="4" fill="${C.terra}"/>
      <rect x="44" y="118" width="112" height="20" rx="4" fill="${C.gold}"/>
      <rect x="44" y="142" width="112" height="14" rx="4" fill="${C.greenL}"/>
      <path d="M44 70 v86 M68 70 v86 M156 70 v86" stroke="#fff" stroke-width="2" opacity=".25"/>`),
  basket: bg('#F0E2CA', `
      <path d="M54 96 h92 l-10 60 q-36 10 -72 0Z" fill="${C.brass}"/>
      <path d="M54 96 h92 l-2 12 h-88Z" fill="#A87B33"/>
      <path d="M64 110 h72 M62 128 h76 M64 146 h68" stroke="#8A6526" stroke-width="3"/>
      <path d="M66 96 q34 -34 68 0" stroke="#A87B33" stroke-width="6" fill="none"/>`),
  jute: bg('#ECE6D2', `
      <path d="M62 86 h76 v66 q0 8 -8 8 h-60 q-8 0 -8 -8Z" fill="${C.gold}"/>
      <path d="M62 86 h76 v10 h-76Z" fill="#A87B33"/>
      <path d="M80 86 q4 -22 20 -22 t20 22" stroke="#A87B33" stroke-width="6" fill="none"/>
      <path d="M74 104 v48 M100 104 v48 M126 104 v48" stroke="#A87B33" stroke-width="2" opacity=".5"/>
      <path d="M62 122 h76" stroke="#A87B33" stroke-width="2" opacity=".5"/>`),
  chikki: bg('#F3E6CE', `
      <rect x="50" y="92" width="100" height="46" rx="6" transform="rotate(-8 100 115)" fill="${C.brass}"/>
      <g transform="rotate(-8 100 115)">
        <circle cx="66" cy="104" r="6" fill="#8A5A22"/><circle cx="92" cy="100" r="6" fill="#8A5A22"/>
        <circle cx="120" cy="106" r="6" fill="#8A5A22"/><circle cx="78" cy="124" r="6" fill="#8A5A22"/>
        <circle cx="108" cy="126" r="6" fill="#8A5A22"/><circle cx="134" cy="122" r="6" fill="#8A5A22"/>
      </g>`),
  grain: bg('#EFE7D3', `
      <path d="M100 56 v90" stroke="${C.green}" stroke-width="5"/>
      <g fill="${C.gold}">
        <ellipse cx="86" cy="74" rx="9" ry="16" transform="rotate(-30 86 74)"/>
        <ellipse cx="114" cy="74" rx="9" ry="16" transform="rotate(30 114 74)"/>
        <ellipse cx="84" cy="98" rx="9" ry="16" transform="rotate(-30 84 98)"/>
        <ellipse cx="116" cy="98" rx="9" ry="16" transform="rotate(30 116 98)"/>
        <ellipse cx="86" cy="122" rx="9" ry="16" transform="rotate(-30 86 122)"/>
        <ellipse cx="114" cy="122" rx="9" ry="16" transform="rotate(30 114 122)"/>
        <ellipse cx="100" cy="60" rx="9" ry="18"/>
      </g>`),
};

interface ArtProps {
  art: ArtKey;
  /** real photo URL; when omitted, falls back to the per-art stock photo */
  src?: string;
  className?: string;
  alt?: string;
}

/** Renders a real product/seller photo (keyed per item) and falls back to
 *  the on-brand inline SVG placeholder if the photo fails to load / offline.
 *  The wrapper carries `.ph-img` so the design-system hover-zoom / sizing
 *  rules apply either way. */
export function Art({ art, src, className, alt = '' }: ArtProps) {
  const url = src ?? imageForArt(art);
  const [failed, setFailed] = useState(false);

  // reset the error state when the source changes (e.g. PDP thumb switch)
  useEffect(() => { setFailed(false); }, [url]);

  const cls = `ph-img${className ? ' ' + className : ''}`;

  if (failed || !url) {
    const svg = ART[art] ?? ART.jute;
    return <div className={cls} dangerouslySetInnerHTML={{ __html: svg }} />;
  }

  return (
    <img
      className={cls}
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
