import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ChevronRight, Store, Star, MapPin, ShoppingCart, ShieldCheck,
  FileText, Lock, Truck, Check,
} from 'lucide-react'
import { PRODUCTS, getProduct, getVendor, rupee, type ArtKey } from '../data/catalog'
import { Art } from '../art/Art'
import { imageForProduct, imageForArt } from '../art/images'
import { Stepper } from '../components/Stepper'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

type Tab = 'desc' | 'spec' | 'ship'

export function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useStore()

  const P = getProduct(id) ?? PRODUCTS[0]
  const V = getVendor(P.vendor)!

  const moqNum = parseInt(P.moq, 10) || 1
  const moqUnitWord = P.moq.replace(/^\d+\s*/, '')

  const [qty, setQty] = useState(moqNum)
  const [activeThumb, setActiveThumb] = useState(0)
  const [tab, setTab] = useState<Tab>('desc')

  // reset per-product state when navigating between PDPs
  useEffect(() => {
    setQty(moqNum); setActiveThumb(0); setTab('desc')
    document.title = `${P.name} — Manakart`
  }, [P.id, moqNum, P.name])

  const tiers = useMemo(() => ([
    { q: `${moqNum}–${moqNum * 5 - 1} ${moqUnitWord}`, p: P.price, save: 0 },
    { q: `${moqNum * 5}–${moqNum * 20 - 1} ${moqUnitWord}`, p: Math.round(P.price * 0.92), save: 8, best: true },
    { q: `${moqNum * 20}+ ${moqUnitWord}`, p: Math.round(P.price * 0.85), save: 15 },
  ]), [P.price, moqNum, moqUnitWord])

  const unitPrice = qty >= moqNum * 20 ? Math.round(P.price * 0.85)
    : qty >= moqNum * 5 ? Math.round(P.price * 0.92)
    : P.price
  const orderTotal = `${rupee(unitPrice * qty)} + GST`

  const productImg = imageForProduct(P.id, P.art)
  const slides: { art: ArtKey; src: string }[] = [
    { art: P.art, src: productImg },
    { art: V.art, src: imageForArt(V.art) },
    { art: P.art, src: productImg },
    { art: P.art, src: productImg },
  ]
  const active = slides[activeThumb]

  const specs: [string, string][] = [
    ['Category', P.cat], ['Origin', P.loc], ['Minimum order', P.moq],
    ['Unit price', rupee(P.price) + P.unit], ['GST invoice', P.gst ? 'Available' : '—'], ['Seller rating', P.rating + ' / 5'],
    ['Dispatch', '5–7 working days'], ['Sample order', 'On request'],
  ]

  const related = PRODUCTS.filter((p) => p.cat === P.cat && p.id !== P.id)
    .concat(PRODUCTS.filter((p) => p.cat !== P.cat && p.id !== P.id))
    .slice(0, 4)

  const ship = V.ships.split('·')[1] ? V.ships.split('·')[1].trim() : V.ships

  const addNow = () => addToCart(
    { id: P.id, name: P.name, price: P.price, unit: P.unit, seller: P.loc, moq: P.moq }, qty,
  )

  return (
    <main className="container page-product" data-screen-label="Product Detail">
      <nav className="crumb">
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <Link to="/category">{P.cat}</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>{P.name}</span>
      </nav>

      <section className="pdp">
        <div className="gallery">
          <div className="gallery-main"><Art art={active.art} src={active.src} alt={P.name} /></div>
          <div className="gallery-thumbs">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`thumb${i === activeThumb ? ' active' : ''}`}
                onClick={() => setActiveThumb(i)}
              >
                <Art art={s.art} src={s.src} alt={P.name} />
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <Link to={`/vendor/${V.id}`} className="pdp-seller-link">
            <Store strokeWidth={1.8} />
            <span>{V.name}</span>
          </Link>
          <h1>{P.name}</h1>
          <div className="pdp-sub">
            <span className="pdp-rating"><Star fill="currentColor" strokeWidth={0} /><span>{P.rating} ({P.reviews})</span></span>
            <span className="dot" />
            <span className="pdp-loc"><MapPin strokeWidth={1.8} /><span>{P.loc}</span></span>
            <span className="dot" />
            <span>{P.cat}</span>
          </div>

          <div className="price-box">
            <div className="price-now">
              <span className="amt">{rupee(P.price)}</span>
              <span className="unit">{P.unit}</span>
              <span className="moq-note">MOQ {P.moq}</span>
            </div>
            <div className="tiers">
              <div className="tiers-label">Bulk pricing — order more, pay less</div>
              <div className="tier-row">
                {tiers.map((t, i) => (
                  <div className={`tier${t.best ? ' best' : ''}`} key={i}>
                    <div className="qty">{t.q}</div>
                    <div className="pr">{rupee(t.p)}{P.unit}</div>
                    {t.save
                      ? <div className="save">Save {t.save}%</div>
                      : <div className="save" style={{ color: 'var(--ink-3)' }}>Base price</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="buy-row">
            <Stepper value={qty} min={moqNum} onChange={setQty} />
            <button className="btn btn-primary" onClick={addNow}>
              <ShoppingCart strokeWidth={2} />Add to cart
            </button>
            <button className="btn btn-accent" onClick={() => { addNow(); navigate('/cart') }}>Buy now</button>
          </div>
          <div className="total-line">Order total for <span>{qty}</span> units: <strong>{orderTotal}</strong></div>

          <div className="assure">
            <div className="assure-item"><ShieldCheck strokeWidth={1.8} /><div><strong>Verified MSME seller</strong><span>Udyam &amp; KYC verified</span></div></div>
            <div className="assure-item"><FileText strokeWidth={1.8} /><div><strong>GST invoice</strong><span>Claim input tax credit</span></div></div>
            <div className="assure-item"><Lock strokeWidth={1.8} /><div><strong>Escrow protected</strong><span>Pay safely, refund guaranteed</span></div></div>
            <div className="assure-item"><Truck strokeWidth={1.8} /><div><strong>Pan-India shipping</strong><span>{ship}</span></div></div>
          </div>

          <Link to={`/vendor/${V.id}`} className="seller-card">
            <div className="seller-av"><Art art={V.art} /></div>
            <div className="info">
              <h4>{V.name}</h4>
              <div className="meta">
                <span className="gold"><Star fill="currentColor" strokeWidth={0} /><span>{V.rating}</span> rating</span>
                <span><Check strokeWidth={1.8} />Since <span>{V.since}</span></span>
                <span>{V.orders} orders</span>
              </div>
            </div>
            <span className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>View store</span>
          </Link>
        </div>
      </section>

      {/* tabs */}
      <section className="tabs">
        <div className="tab-bar">
          <button className={`tab-btn${tab === 'desc' ? ' active' : ''}`} onClick={() => setTab('desc')}>Description</button>
          <button className={`tab-btn${tab === 'spec' ? ' active' : ''}`} onClick={() => setTab('spec')}>Specifications</button>
          <button className={`tab-btn${tab === 'ship' ? ' active' : ''}`} onClick={() => setTab('ship')}>Shipping &amp; GST</button>
        </div>
        <div className={`tab-panel${tab === 'desc' ? ' active' : ''}`}>
          <p>{P.name} sourced direct from {V.name}, a verified MSME in {P.loc}. {V.about}</p>
          <p style={{ marginTop: 16 }}>Each unit is quality-checked before dispatch. Custom sizing, private-label packaging and bulk contracts are available on request — message the seller directly to negotiate volume pricing above the listed tiers.</p>
        </div>
        <div className={`tab-panel${tab === 'spec' ? ' active' : ''}`}>
          <div className="spec-grid">
            {specs.map(([k, v]) => (
              <div className="spec-row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
            ))}
          </div>
        </div>
        <div className={`tab-panel${tab === 'ship' ? ' active' : ''}`}>
          <p>Ships pan-India from the seller's unit. Standard dispatch in 5–7 working days; bulk orders may take longer. Freight is calculated at checkout by weight and destination PIN code.</p>
          <p style={{ marginTop: 16 }}><strong>GST:</strong> This seller is GST-registered. A tax invoice with HSN codes is issued for every order so registered buyers can claim input tax credit. Returns accepted within 7 days for quality or specification mismatches under escrow protection.</p>
        </div>
      </section>

      {/* related */}
      <section className="related">
        <div className="section-head">
          <div className="lead"><span className="eyebrow">You may also like</span><h2 className="section-title" style={{ marginTop: 12 }}>Related products</h2></div>
        </div>
        <div className="related-grid">
          {related.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </main>
  )
}
