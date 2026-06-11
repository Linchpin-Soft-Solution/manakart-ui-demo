import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle2, ShieldCheck, FileText, ShoppingCart, Lock,
  Wheat, Package, Shirt, Flame, Settings, Leaf, Paperclip, CookingPot,
  type LucideIcon,
} from 'lucide-react'
import { PRODUCTS } from '../data/catalog'
import { Art } from '../art/Art'
import type { ArtKey } from '../data/catalog'
import { ProductCard } from '../components/ProductCard'

const CATEGORIES: [string, LucideIcon][] = [
  ['Food Commodities', Wheat], ['Packaging', Package], ['Textiles', Shirt], ['Handicrafts', Flame],
  ['Industrial Goods', Settings], ['Agriculture', Leaf], ['Office Supplies', Paperclip], ['Home & Kitchen', CookingPot],
]

interface Deal {
  art: ArtKey; kicker: string; title: string; copy?: string; hero?: boolean
}
const DEALS: Deal[] = [
  { art: 'spices', kicker: 'Factory Direct · Kerala', title: 'Up to 30% off whole-spice combos', copy: 'Cardamom, pepper, clove & turmeric — sourced direct from Idukki estates.', hero: true },
  { art: 'jute', kicker: 'Kolkata, WB', title: 'Jute & eco-packaging' },
  { art: 'textile', kicker: 'Coimbatore, TN', title: 'Cotton fabric by the metre' },
  { art: 'diya', kicker: 'Moradabad, UP', title: 'Brass & metalware' },
]

const bestsellers = PRODUCTS.slice(0, 5)

export function Home() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="hero bazaar-texture">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Made in India · MSME Marketplace</span>
            <h1>Products made by MSMEs.<br /><span className="hl">Delivered to your business.</span></h1>
            <p>Support local. Buy direct. Grow together. Source verified commodities and handcrafted goods straight from India's small manufacturers — with low MOQs and GST invoices.</p>
            <div className="hero-cta">
              <Link to="/category" className="btn btn-primary">
                Shop Now<ArrowRight strokeWidth={2} />
              </Link>
              <Link to="/category" className="btn btn-ghost">Explore Regions</Link>
            </div>
            <div className="hero-stats">
              <div><strong>12,000+</strong><span>Verified MSMEs</span></div>
              <div><strong>28</strong><span>States &amp; UTs</span></div>
              <div><strong>4.8</strong><span>Avg. seller rating</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="collage">
              <div className="cl cl-a"><Art art="diya" /></div>
              <div className="cl cl-b"><Art art="pottery" /></div>
              <div className="cl cl-c"><Art art="spices" /></div>
              <div className="cl cl-d"><Art art="textile" /></div>
            </div>
            <div className="hero-tag">
              <CheckCircle2 strokeWidth={1.8} />
              <div><strong>Verified MSME sellers</strong><span>GST invoices on every order</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED DEALS ============ */}
      <section className="block" id="deals">
        <div className="container">
          <div className="section-head">
            <div className="lead">
              <span className="eyebrow">Limited time</span>
              <h2 className="section-title" style={{ marginTop: 14 }}>Featured Deals</h2>
              <p>Hand-picked bulk offers from factory-direct sellers — live for a limited window.</p>
            </div>
            <Link to="/category" className="link-more">View all deals<ArrowRight strokeWidth={2} /></Link>
          </div>

          <div className="deals-grid">
            {DEALS.map((d, i) => (
              <Link
                key={i}
                to="/category"
                className={`deal ${d.hero ? 'deal-hero' : 'deal-sm'}`}
              >
                <Art art={d.art} />
                <div className="deal-body">
                  <span className="deal-kicker">{d.kicker}</span>
                  <h3>{d.title}</h3>
                  {d.copy && <p>{d.copy}</p>}
                  {d.hero && (
                    <span className="btn btn-accent btn-sm">
                      Shop the deal<ArrowRight strokeWidth={2} />
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POPULAR CATEGORIES ============ */}
      <section className="block alt bazaar-texture">
        <div className="container">
          <div className="section-head">
            <div className="lead">
              <span className="eyebrow">Browse the bazaar</span>
              <h2 className="section-title" style={{ marginTop: 14 }}>Popular Categories</h2>
            </div>
            <Link to="/category" className="link-more">All categories<ArrowRight strokeWidth={2} /></Link>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map(([name, Icon]) => (
              <Link key={name} to="/category" className="cat-card">
                <span className="cat-ic"><Icon strokeWidth={1.7} /></span>
                <span className="cat-name">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REGIONAL BESTSELLERS ============ */}
      <section className="block" id="bestsellers">
        <div className="container">
          <div className="section-head">
            <div className="lead">
              <span className="eyebrow">Trusted by buyers</span>
              <h2 className="section-title" style={{ marginTop: 14 }}>Regional Bestsellers</h2>
              <p>The most-ordered products from verified small manufacturers this month.</p>
            </div>
            <Link to="/category" className="link-more">See all<ArrowRight strokeWidth={2} /></Link>
          </div>
          <div className="product-row">
            {bestsellers.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="trust-strip">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-ic"><ShieldCheck strokeWidth={1.8} /></span>
              <div><h4>Verified MSME Sellers</h4><p>Every seller is KYC &amp; Udyam checked</p></div>
            </div>
            <div className="trust-item">
              <span className="trust-ic"><FileText strokeWidth={1.8} /></span>
              <div><h4>GST Invoice Available</h4><p>Claim input credit on every order</p></div>
            </div>
            <div className="trust-item">
              <span className="trust-ic"><ShoppingCart strokeWidth={1.8} /></span>
              <div><h4>Low MOQ Products</h4><p>Order small, scale when you're ready</p></div>
            </div>
            <div className="trust-item">
              <span className="trust-ic"><Lock strokeWidth={1.8} /></span>
              <div><h4>Safe &amp; Secure Payments</h4><p>Escrow-protected, refund guaranteed</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
