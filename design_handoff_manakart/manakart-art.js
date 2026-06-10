/* ============================================================
   MANAKART — illustration + component library
   On-brand flat SVG placeholders (warm bazaar palette)
   ============================================================ */
(function () {
  // palette
  const C = {
    cream: '#FAF6EC', beige: '#F1E8D6', beige2: '#EBE0CA', paper: '#FFFDF8',
    green: '#1C5236', greenL: '#3E7C5A', terra: '#C15A36', terraL: '#D98A5E',
    gold: '#C19433', goldL: '#E0BE6B', ink: '#2B2722', brass: '#C79A4B'
  };

  // ---- full-bleed product "scenes" (200x200, slice-covered) ----
  const ART = {
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

  function bg(fill, inner) {
    return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="200" height="200" fill="${fill}"/>
      <circle cx="30" cy="34" r="2" fill="${C.ink}" opacity=".06"/><circle cx="170" cy="40" r="2" fill="${C.ink}" opacity=".06"/>
      <circle cx="46" cy="170" r="2" fill="${C.ink}" opacity=".06"/><circle cx="160" cy="166" r="2" fill="${C.ink}" opacity=".06"/>
      ${inner}</svg>`;
  }

  // ---- line icons (categories etc.) ----
  const ICON = {
    grain: '<path d="M12 3v18"/><path d="M12 7c-3 0-5-2-5-4 3 0 5 2 5 4Zm0 0c3 0 5-2 5-4-3 0-5 2-5 4Zm0 5c-3 0-5-2-5-4 3 0 5 2 5 4Zm0 0c3 0 5-2 5-4-3 0-5 2-5 4Zm0 5c-3 0-5-2-5-4 3 0 5 2 5 4Zm0 0c3 0 5-2 5-4-3 0-5 2-5 4Z"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    textile: '<path d="M4 6h16v4H4Zm0 8h16v4H4Z"/><path d="M4 6v12M20 6v12"/>',
    diya: '<path d="M5 14c0 3 3 5 7 5s7-2 7-5H5Z"/><path d="M12 14c0-3-2-5 0-9 2 4 0 6 0 9Z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    leaf: '<path d="M11 20c-4 0-7-3-7-7 0-5 4-9 14-9 0 10-4 14-9 14Z"/><path d="M9 17c2-4 5-6 9-7"/>',
    clip: '<path d="M16 6v10a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10a1 1 0 0 1-2 0V6"/>',
    pot: '<path d="M5 10h14l-1 8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/><path d="M9 10V7a3 3 0 0 1 6 0v3M3 10h18"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
    layers: '<path d="M12 2 2 7l10 5 10-5Z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/>',
    check: '<path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5Z"/><path d="M9 12l2 2 4-4"/>',
    truck: '<path d="M1 4h13v12H1Z"/><path d="M14 8h4l3 3v5h-7Z"/><circle cx="6" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>',
    invoice: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  };

  function svg(path, w) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w||1.7}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  }

  // ---- product card template ----
  function productCard(p) {
    const flagAccent = (p.flag === 'Low MOQ' || p.flag === 'Factory Direct') ? ' accent' : '';
    const flagIcon = svg(ICON.check, 2);
    return `
    <a href="product.html?id=${p.id}" class="product-card">
      <div class="pc-media ph-img" data-art="${p.art}">
        <span class="pc-flag${flagAccent}">${flagIcon}${p.flag}</span>
        <button class="pc-wish" data-wish="${p.id}" aria-label="Save to wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l9 8.6 9-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>
        </button>
      </div>
      <div class="pc-body">
        <span class="pc-loc">${svg(ICON.pin,1.8)}${p.loc}</span>
        <h3 class="pc-name">${p.name}</h3>
        <div class="pc-meta">
          <span class="moq">${svg(ICON.layers,1.8)}MOQ ${p.moq}</span>
          <span class="pc-rating"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7Z"/></svg>${p.rating}</span>
        </div>
        <div class="pc-foot">
          <span class="pc-price"><span class="amt">${MK.rupee(p.price)}</span><span class="unit">${p.unit}</span></span>
          <button class="pc-add" data-add="${p.id}" data-name="${p.name}" data-price="${p.price}" data-unit="${p.unit}" data-seller="${p.loc}" data-moq="${p.moq}" aria-label="Add to cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </a>`;
  }

  function paintArt(root) {
    (root || document).querySelectorAll('[data-art]').forEach(el => {
      if (el.dataset.painted) return;
      const a = ART[el.dataset.art];
      if (a) { el.innerHTML = a; el.dataset.painted = '1'; }
    });
  }

  window.MKART = {
    ART, ICON,
    icon: (n, w) => svg(ICON[n] || ICON.box, w),
    art: (n) => ART[n] || '',
    productCard,
    paintArt,
  };

  document.addEventListener('DOMContentLoaded', () => paintArt());
  // also paint after dynamic injection
  window.addEventListener('load', () => paintArt());
})();
