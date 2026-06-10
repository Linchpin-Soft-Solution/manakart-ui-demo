/* ============================================================
   MANAKART — shared header + footer injector for inner pages
   Usage: <div id="mk-header"></div> ... <div id="mk-footer"></div>
   ============================================================ */
(function () {
  const header = `
  <header class="site-header" data-screen-label="Header">
    <div class="container header-main">
      <a href="index.html" class="brand" aria-label="Manakart home">
        <span><span class="m">M</span>anakart</span>
        <svg class="leaf" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7 6 5 10 5 14a7 7 0 0 0 14 0c0-4-2-8-7-12Zm0 4.7c2.8 2.6 4 5.2 4 7.3a4 4 0 0 1-8 0c0-2.1 1.2-4.7 4-7.3Z"/></svg>
      </a>
      <form class="search" onsubmit="return false">
        <input type="text" placeholder="Search for products, categories or sellers…" aria-label="Search">
        <button class="search-btn" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </form>
      <div class="header-actions">
        <a href="#" class="icon-btn" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
          <span class="badge" data-wish-badge style="display:none">0</span>
        </a>
        <a href="#" class="icon-btn" aria-label="Account">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
        </a>
        <a href="cart.html" class="icon-btn" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h2.2l2.3 12.3a1.6 1.6 0 0 0 1.6 1.3h8.7a1.6 1.6 0 0 0 1.6-1.2L21.5 7H6"/></svg>
          <span class="badge" data-cart-badge style="display:none">0</span>
        </a>
      </div>
    </div>
    <nav class="header-nav">
      <div class="container">
        <div class="nav-group">
          <a href="category.html" class="nav-link">Categories</a>
          <a href="category.html" class="nav-link">Shop by Region</a>
          <a href="category.html" class="nav-link">Bulk Deals</a>
          <a href="category.html" class="nav-link">New Arrivals</a>
          <a href="category.html" class="nav-link">Low MOQ</a>
          <a href="category.html" class="nav-link">Factory Direct</a>
        </div>
        <div class="nav-group">
          <a href="#" class="nav-link accent">Sell on Manakart</a>
          <a href="#" class="nav-link">Login</a>
        </div>
      </div>
    </nav>
  </header>`;

  const footer = `
  <footer class="site-footer" data-screen-label="Footer">
    <div class="container footer-top">
      <div class="footer-brand">
        <span class="brand"><span class="m">M</span>anakart</span>
        <p>India's marketplace for MSME-made commodities. Buy direct from small manufacturers — verified, GST-ready, and built for business.</p>
      </div>
      <div class="foot-col">
        <h5>Shop</h5>
        <a href="category.html">All Categories</a>
        <a href="category.html">Bulk Deals</a>
        <a href="category.html">New Arrivals</a>
        <a href="category.html">Low MOQ</a>
        <a href="category.html">Factory Direct</a>
      </div>
      <div class="foot-col">
        <h5>Sellers</h5>
        <a href="#">Sell on Manakart</a>
        <a href="vendor.html">Seller Directory</a>
        <a href="#">Seller Help</a>
        <a href="#">Udyam Registration</a>
      </div>
      <div class="foot-col">
        <h5>Support</h5>
        <a href="#">Track Order</a>
        <a href="#">Returns &amp; Refunds</a>
        <a href="#">GST &amp; Invoicing</a>
        <a href="#">Contact Us</a>
      </div>
      <div class="foot-col">
        <h5>Buy with confidence</h5>
        <p style="font-size:14px;color:rgba(255,255,255,.55);margin:0 0 14px">Escrow-protected payments. Refunds guaranteed on quality disputes.</p>
        <div class="pay-row"><span>UPI</span><span>Net Banking</span><span>Cards</span></div>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© 2026 Manakart Technologies Pvt. Ltd. · Made in India</span>
      <span>Privacy · Terms · GST Compliance</span>
    </div>
  </footer>`;

  function mount() {
    const h = document.getElementById('mk-header');
    const f = document.getElementById('mk-footer');
    if (h) h.outerHTML = header;
    if (f) f.outerHTML = footer;
    if (window.MK) window.MK.refreshBadges();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
