import { Link } from 'react-router-dom'
import {
  ArrowRight, ShieldCheck, FileText, ShoppingCart, Lock,
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
            <div className="hero-secure-seal" aria-label="100 percent secure verified MSME sellers">
              <svg viewBox="0 0 200 200" role="img" aria-hidden="true">
                <defs>
                  <path id="secureTopArc" d="M 38 102 A 62 62 0 0 1 162 102" />
                  <path id="secureBottomArc" d="M 38 118 A 62 62 0 0 0 162 118" />
                </defs>
                <polygon
                  className="seal-ribbon"
                  points="100,7.0 107.9,14.3 116.9,8.5 123.4,17.0 133.3,12.9 138.2,22.4 148.7,20.1 151.9,30.3 162.6,29.9 164.0,40.5 174.5,42.0 174.1,52.7 184.3,55.9 182.0,66.4 191.5,71.3 187.4,81.2 195.9,87.7 190.1,96.7 197.4,104.6 190.1,112.4 195.9,121.4 187.4,127.9 191.5,137.8 182.0,142.7 184.3,153.2 174.1,156.4 174.5,167.1 164.0,168.6 162.6,179.2 151.9,178.8 148.7,189.0 138.2,186.7 133.3,196.2 123.4,192.1 116.9,200.6 107.9,194.8 100.0,202.1 92.1,194.8 83.1,200.6 76.6,192.1 66.7,196.2 61.8,186.7 51.3,189.0 48.1,178.8 37.4,179.2 36.0,168.6 25.5,167.1 25.9,156.4 15.7,153.2 18.0,142.7 8.5,137.8 12.6,127.9 4.1,121.4 9.9,112.4 2.6,104.6 9.9,96.7 4.1,87.7 12.6,81.2 8.5,71.3 18.0,66.4 15.7,55.9 25.9,52.7 25.5,42.0 36.0,40.5 37.4,29.9 48.1,30.3 51.3,20.1 61.8,22.4 66.7,12.9 76.6,17.0 83.1,8.5 92.1,14.3"
                />
                <text className="seal-text">
                  <textPath href="#secureTopArc" startOffset="50%" textAnchor="middle">100% SECURE</textPath>
                </text>
                <text className="seal-text">
                  <textPath href="#secureBottomArc" startOffset="50%" textAnchor="middle">VERIFIED MSME</textPath>
                </text>
                <text className="seal-stars seal-stars-left" x="35" y="112">★</text>
                <text className="seal-stars seal-stars-right" x="165" y="112">★</text>
                <g className="seal-lock">
                  <path d="M78 92V78c0-13 9.5-23 22-23s22 10 22 23v14h-11V78c0-7-4.4-12.5-11-12.5S89 71 89 78v14H78Z" />
                  <rect x="67" y="88" width="66" height="54" rx="12" />
                  <circle cx="100" cy="114" r="7" className="seal-keyhole" />
                  <rect x="96" y="116" width="8" height="16" rx="4" className="seal-keyhole" />
                </g>
              </svg>
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
