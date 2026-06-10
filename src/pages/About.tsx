import { Link } from 'react-router-dom'
import {
  ChevronRight, ShieldCheck, FileText, Truck, HandHeart, Search, Store, ArrowRight,
} from 'lucide-react'

export function About() {
  return (
    <main className="container page-about" data-screen-label="About">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>About</span>
      </nav>

      <section className="content-hero">
        <span className="eyebrow">Our story</span>
        <h1>A bazaar for Bharat's<br /><span style={{ color: 'var(--green)' }}>small manufacturers.</span></h1>
        <p className="lead-copy">
          Manakart connects buyers directly with India's MSMEs — the workshops, mills,
          collectives and family units that make the country's commodities and crafts.
          No middlemen, verified sellers, GST invoices, and order sizes that work for
          businesses of every scale.
        </p>
      </section>

      <div className="stat-band">
        <div className="stat"><div className="n">12,000+</div><div className="l">Verified MSME sellers</div></div>
        <div className="stat"><div className="n">28</div><div className="l">States &amp; UTs covered</div></div>
        <div className="stat"><div className="n">4.8</div><div className="l">Average seller rating</div></div>
        <div className="stat"><div className="n">₹240Cr+</div><div className="l">Paid out to sellers</div></div>
      </div>

      <section className="block" style={{ paddingTop: 24 }}>
        <div className="section-head">
          <div className="lead">
            <span className="eyebrow">Why we exist</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>Built for small makers, trusted by buyers</h2>
          </div>
        </div>
        <div className="prose">
          <p>
            India has over 63 million MSMEs, yet most still sell through layers of
            intermediaries who capture the margin and obscure the maker. Manakart removes
            those layers: every seller is Udyam- and KYC-verified, every order ships with a
            GST tax invoice, and payments are escrow-protected so buyers can source with
            confidence and makers get paid on time.
          </p>
          <p>
            From Moradabad brass to Kolhapuri jaggery, Coimbatore cotton to Idukki spices —
            we surface regional clusters of expertise and make them reachable to any business
            in the country with low minimum order quantities.
          </p>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 8 }}>
        <div className="section-head">
          <div className="lead">
            <span className="eyebrow">How it works</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>Source in three steps</h2>
          </div>
        </div>
        <div className="steps">
          <div className="step"><span className="num">01</span><h4>Discover verified makers</h4><p>Browse by category or region and filter to factory-direct, low-MOQ or GST-ready sellers.</p></div>
          <div className="step"><span className="num">02</span><h4>Order at bulk tiers</h4><p>Pick a quantity tier — the more you order, the lower the per-unit price, shown upfront.</p></div>
          <div className="step"><span className="num">03</span><h4>Get a GST invoice</h4><p>Pay via escrow and receive a tax invoice with HSN codes to claim input credit.</p></div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 8 }}>
        <div className="section-head">
          <div className="lead">
            <span className="eyebrow">What you can count on</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>Our promises</h2>
          </div>
        </div>
        <div className="feature-grid">
          <div className="feature-card"><div className="feature-ic"><ShieldCheck strokeWidth={1.8} /></div><h3>Verified sellers</h3><p>Every store is Udyam- and KYC-checked before it can list a single product.</p></div>
          <div className="feature-card"><div className="feature-ic"><FileText strokeWidth={1.8} /></div><h3>GST-ready</h3><p>Tax invoices with HSN codes on every order, so registered buyers claim input credit.</p></div>
          <div className="feature-card"><div className="feature-ic accent"><HandHeart strokeWidth={1.8} /></div><h3>Fair to makers</h3><p>Direct payouts and transparent pricing keep margins with the people who make the goods.</p></div>
          <div className="feature-card"><div className="feature-ic"><Truck strokeWidth={1.8} /></div><h3>Pan-India shipping</h3><p>Freight calculated by weight and PIN code, dispatched from the seller's own unit.</p></div>
          <div className="feature-card"><div className="feature-ic"><Search strokeWidth={1.8} /></div><h3>Low MOQs</h3><p>Order small to sample, scale up when you're ready — no inflated minimums.</p></div>
          <div className="feature-card"><div className="feature-ic accent"><Store strokeWidth={1.8} /></div><h3>Regional depth</h3><p>Sourced from India's craft and commodity clusters, not anonymous warehouses.</p></div>
        </div>
      </section>

      <section style={{ padding: '8px 0 90px' }}>
        <div className="cta-band">
          <div>
            <h2>Make something? Sell it to all of India.</h2>
            <p>Join 12,000+ verified MSME sellers reaching businesses across 28 states.</p>
          </div>
          <Link to="/sell" className="btn btn-accent" style={{ height: 52, fontSize: 16 }}>
            Start selling<ArrowRight strokeWidth={2} />
          </Link>
        </div>
      </section>
    </main>
  )
}
