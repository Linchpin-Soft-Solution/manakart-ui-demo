import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer" data-screen-label="Footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <span className="brand"><span className="m">M</span>anakart</span>
          <p>India's marketplace for MSME-made commodities. Buy direct from small manufacturers — verified, GST-ready, and built for business.</p>
        </div>
        <div className="foot-col">
          <h5>Shop</h5>
          <Link to="/category">All Categories</Link>
          <Link to="/region">Shop by Region</Link>
          <Link to="/deals">Bulk Deals</Link>
          <Link to="/category?new=1">New Arrivals</Link>
          <Link to="/category?flag=Factory+Direct">Factory Direct</Link>
        </div>
        <div className="foot-col">
          <h5>Sellers</h5>
          <Link to="/sell">Sell on Manakart</Link>
          <Link to="/vendor/moradabad-brass">Seller Directory</Link>
          <Link to="/about">About Manakart</Link>
          <Link to="/sell">Udyam Registration</Link>
        </div>
        <div className="foot-col">
          <h5>Support</h5>
          <Link to="/track">Track Order</Link>
          <Link to="/contact">Returns &amp; Refunds</Link>
          <Link to="/contact">GST &amp; Invoicing</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="foot-col">
          <h5>Buy with confidence</h5>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', margin: '0 0 14px' }}>
            Escrow-protected payments. Refunds guaranteed on quality disputes.
          </p>
          <div className="pay-row"><span>UPI</span><span>Net Banking</span><span>Cards</span></div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Manakart Technologies Pvt. Ltd. · Made in India</span>
        <span>Privacy · Terms · GST Compliance</span>
      </div>
    </footer>
  )
}
