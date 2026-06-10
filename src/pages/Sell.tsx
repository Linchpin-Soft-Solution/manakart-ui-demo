import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronRight, ArrowRight, BadgeIndianRupee, Globe2, ShieldCheck,
  Headset, LineChart, FileText,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'

export function Sell() {
  const navigate = useNavigate()
  const { toast } = useStore()

  const start = () => {
    toast('Seller onboarding started (demo)')
    navigate('/login')
  }

  return (
    <main className="container page-sell" data-screen-label="Sell on Manakart">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>Sell on Manakart</span>
      </nav>

      <section className="content-hero">
        <span className="eyebrow">For makers &amp; manufacturers</span>
        <h1>Sell to all of India,<br /><span style={{ color: 'var(--green)' }}>direct from your workshop.</span></h1>
        <p className="lead-copy">
          List your products, set bulk tiers, and reach verified business buyers across 28
          states — with GST invoicing, escrow payouts and pan-India logistics handled for you.
        </p>
        <div className="hero-cta" style={{ marginTop: 28 }}>
          <button className="btn btn-primary" onClick={start}>Start selling<ArrowRight strokeWidth={2} /></button>
          <Link to="/about" className="btn btn-ghost">Learn how it works</Link>
        </div>
      </section>

      <div className="stat-band">
        <div className="stat"><div className="n">0%</div><div className="l">Listing fee to get started</div></div>
        <div className="stat"><div className="n">T+2</div><div className="l">Days to payout after delivery</div></div>
        <div className="stat"><div className="n">28</div><div className="l">States of buyer reach</div></div>
        <div className="stat"><div className="n">12,000+</div><div className="l">Sellers already on board</div></div>
      </div>

      <section className="block" style={{ paddingTop: 24 }}>
        <div className="section-head">
          <div className="lead">
            <span className="eyebrow">Why sell with us</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>Everything a small unit needs to scale</h2>
          </div>
        </div>
        <div className="feature-grid">
          <div className="feature-card"><div className="feature-ic"><Globe2 strokeWidth={1.8} /></div><h3>Pan-India demand</h3><p>Get discovered by businesses sourcing your category — no shopfront or sales team needed.</p></div>
          <div className="feature-card"><div className="feature-ic accent"><BadgeIndianRupee strokeWidth={1.8} /></div><h3>Fast, secure payouts</h3><p>Escrow protects both sides; funds release to you on delivery, settled in T+2 days.</p></div>
          <div className="feature-card"><div className="feature-ic"><FileText strokeWidth={1.8} /></div><h3>GST done for you</h3><p>Automated tax invoices with HSN codes on every order keep you compliant effortlessly.</p></div>
          <div className="feature-card"><div className="feature-ic"><ShieldCheck strokeWidth={1.8} /></div><h3>Verified badge</h3><p>Complete Udyam + KYC once and wear the Verified MSME badge that buyers trust.</p></div>
          <div className="feature-card"><div className="feature-ic accent"><LineChart strokeWidth={1.8} /></div><h3>Seller dashboard</h3><p>Track orders, bulk-tier performance and response time from one simple console.</p></div>
          <div className="feature-card"><div className="feature-ic"><Headset strokeWidth={1.8} /></div><h3>Onboarding support</h3><p>A regional team helps you list, photograph and price your first catalogue.</p></div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 8 }}>
        <div className="section-head">
          <div className="lead">
            <span className="eyebrow">Get started</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>Live in four steps</h2>
          </div>
        </div>
        <div className="steps steps-4">
          <div className="step"><span className="num">01</span><h4>Register</h4><p>Sign up with your Udyam ID and GSTIN.</p></div>
          <div className="step"><span className="num">02</span><h4>List products</h4><p>Add photos, set MOQ and bulk tiers.</p></div>
          <div className="step"><span className="num">03</span><h4>Receive orders</h4><p>Buyers order; you pack and ship.</p></div>
          <div className="step"><span className="num">04</span><h4>Get paid</h4><p>Escrow releases to you on delivery.</p></div>
        </div>
      </section>

      <section style={{ padding: '8px 0 90px' }}>
        <div className="cta-band">
          <div>
            <h2>Ready to put your workshop on the map?</h2>
            <p>It's free to list. Set up your store in minutes.</p>
          </div>
          <button className="btn btn-accent" style={{ height: 52, fontSize: 16 }} onClick={start}>
            Start selling<ArrowRight strokeWidth={2} />
          </button>
        </div>
      </section>
    </main>
  )
}
