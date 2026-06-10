/* ============================================================
   MANAKART — shared interactions
   cart + wishlist state (localStorage), badge, toasts, steppers
   ============================================================ */
(function () {
  const CART_KEY = 'manakart_cart';
  const WISH_KEY = 'manakart_wish';

  const readJSON = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const writeJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const MK = {
    getCart() { return readJSON(CART_KEY, []); },
    getWish() { return readJSON(WISH_KEY, []); },
    cartCount() { return this.getCart().reduce((n, i) => n + i.qty, 0); },

    addToCart(item, qty) {
      qty = qty || 1;
      const cart = this.getCart();
      const found = cart.find(i => i.id === item.id);
      if (found) found.qty += qty;
      else cart.push(Object.assign({ qty }, item));
      writeJSON(CART_KEY, cart);
      this.refreshBadges();
      this.toast(`Added to cart · ${item.name}`);
    },
    setQty(id, qty) {
      let cart = this.getCart();
      const it = cart.find(i => i.id === id);
      if (it) it.qty = Math.max(1, qty);
      writeJSON(CART_KEY, cart);
      this.refreshBadges();
    },
    removeFromCart(id) {
      writeJSON(CART_KEY, this.getCart().filter(i => i.id !== id));
      this.refreshBadges();
    },
    toggleWish(id) {
      let w = this.getWish();
      if (w.includes(id)) { w = w.filter(x => x !== id); }
      else { w.push(id); this.toast('Saved to wishlist'); }
      writeJSON(WISH_KEY, w);
      this.refreshBadges();
      return w.includes(id);
    },
    isWished(id) { return this.getWish().includes(id); },

    refreshBadges() {
      const c = this.getCart().length;
      document.querySelectorAll('[data-cart-badge]').forEach(el => {
        el.textContent = c;
        el.style.display = c > 0 ? 'grid' : 'none';
      });
      const w = this.getWish().length;
      document.querySelectorAll('[data-wish-badge]').forEach(el => {
        el.textContent = w;
        el.style.display = w > 0 ? 'grid' : 'none';
      });
    },

    toast(msg) {
      let wrap = document.querySelector('.toast-wrap');
      if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
      const t = document.createElement('div');
      t.className = 'toast';
      t.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span></span>';
      t.querySelector('span').textContent = msg;
      wrap.appendChild(t);
      setTimeout(() => { t.style.transition = 'opacity .3s, transform .3s'; t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; setTimeout(() => t.remove(), 320); }, 2400);
    },

    rupee(n) { return '₹' + Number(n).toLocaleString('en-IN'); }
  };

  // ---- delegate add-to-cart buttons ----
  document.addEventListener('click', function (e) {
    const add = e.target.closest('[data-add]');
    if (add) {
      e.preventDefault();
      MK.addToCart({
        id: add.dataset.add,
        name: add.dataset.name,
        price: Number(add.dataset.price),
        unit: add.dataset.unit || '',
        seller: add.dataset.seller || '',
        moq: add.dataset.moq || ''
      }, Number(add.dataset.qty || 1));
    }
    const wish = e.target.closest('[data-wish]');
    if (wish) {
      e.preventDefault();
      const on = MK.toggleWish(wish.dataset.wish);
      wish.classList.toggle('active', on);
    }
  });

  // ---- qty steppers ----
  document.addEventListener('click', function (e) {
    const dec = e.target.closest('[data-step-dec]');
    const inc = e.target.closest('[data-step-inc]');
    if (!dec && !inc) return;
    const stepper = (dec || inc).closest('.stepper');
    const input = stepper.querySelector('input');
    let v = parseInt(input.value, 10) || 1;
    v += inc ? 1 : -1;
    v = Math.max(parseInt(input.min || '1', 10), v);
    input.value = v;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  window.MK = MK;
  document.addEventListener('DOMContentLoaded', () => {
    MK.refreshBadges();
    // reflect wishlist state on cards
    document.querySelectorAll('[data-wish]').forEach(b => {
      if (MK.isWished(b.dataset.wish)) b.classList.add('active');
    });
  });
})();
