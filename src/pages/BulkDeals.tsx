import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, TrendingDown, Layers, FileText } from 'lucide-react'
import { PRODUCTS, type ArtKey } from '../data/catalog'
import { Art } from '../art/Art'
import { imageForArt } from '../art/images'
import { ProductCard } from '../components/ProductCard'

interface Deal { art: ArtKey; kicker: string; title: string; copy: string; hero?: boolean }
const DEALS: Deal[] = [
  { art: 'spices', kicker: 'Factory Direct · Kerala', title: 'Up to 30% off whole-spice combos', copy: 'Cardamom, pepper, clove & turmeric — sourced direct from Idukki estates.', hero: true },
  { art: 'jute', kicker: 'Kolkata, WB', title: 'Jute & eco-packaging', copy: 'MOQ 50' },
  { art: 'textile', kicker: 'Coimbatore, TN', title: 'Cotton fabric by the metre', copy: 'MOQ 50' },
  { art: 'diya', kicker: 'Moradabad, UP', title: 'Brass & metalware', copy: 'MOQ 20' },
]

// "deal" products = those carrying a bulk-friendly flag
const dealProducts = PRODUCTS.filter((p) =>
  p.flag === 'Factory Direct' || p.flag === 'Low MOQ' || p.flag === 'GST Available')

export function BulkDeals() {
  return (
    <main className="container page-deals" data-screen-label="Bulk Deals">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>Bulk Deals</span>
      </nav>

      <section className="content-hero">
        <span className="eyebrow">Limited time</span>
        <h1>Bulk deals, factory-direct.</h1>
        <p className="lead-copy">
          Hand-picked volume offers from verified MSME sellers. Order more, pay less —
          every tier and saving is shown upfront, with a GST invoice on every order.
        </p>
      </section>

      <section className="block" style={{ paddingTop: 28 }}>
        <div className="deals-grid">
          {DEALS.map((d, i) => (
            <Link key={i} to="/category" className={`deal ${d.hero ? 'deal-hero' : 'deal-sm'}`}>
              <Art art={d.art} src={imageForArt(d.art)} />
              <div className="deal-body">
                <span className="deal-kicker">{d.kicker}</span>
                <h3>{d.title}</h3>
                <p>{d.copy}</p>
                {d.hero && <span className="btn btn-accent btn-sm">Shop the deal<ArrowRight strokeWidth={2} /></span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="block" style={{ paddingTop: 8 }}>
        <div className="section-head">
          <div className="lead">
            <span className="eyebrow">How bulk pricing works</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>The more you order, the less you pay</h2>
          </div>
        </div>
        <div className="feature-grid">
          <div className="feature-card"><div className="feature-ic"><Layers strokeWidth={1.8} /></div><h3>Pick a tier</h3><p>Every product lists quantity tiers from the MOQ up. The best-value tier is highlighted.</p></div>
          <div className="feature-card"><div className="feature-ic accent"><TrendingDown strokeWidth={1.8} /></div><h3>Unit price drops</h3><p>Cross 5× MOQ for ~8% off and 20× MOQ for ~15% off — applied automatically at checkout.</p></div>
          <div className="feature-card"><div className="feature-ic"><FileText strokeWidth={1.8} /></div><h3>GST on every order</h3><p>A tax invoice with HSN codes is issued so registered buyers can claim input tax credit.</p></div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 8, paddingBottom: 90 }}>
        <div className="section-head">
          <div className="lead">
            <span className="eyebrow">Live bulk offers</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>Shop bulk-ready products</h2>
            <p>{dealProducts.length} products with factory-direct, low-MOQ or GST-ready bulk pricing.</p>
          </div>
          <Link to="/category" className="link-more">All products<ArrowRight strokeWidth={2} /></Link>
        </div>
        <div className="grid-products">
          {dealProducts.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </main>
  )
}
