import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronRight, Star, MapPin, Calendar, ShieldCheck, FileText, Clock,
  Truck, Heart, MessageSquare,
} from 'lucide-react'
import { VENDORS, getVendor, byVendor } from '../data/catalog'
import { Art } from '../art/Art'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

export function Vendor() {
  const { id } = useParams()
  const firstId = Object.keys(VENDORS)[0]
  const V = getVendor(id) ?? getVendor(firstId)!
  const items = byVendor(V.id)
  const { toast } = useStore()

  const [following, setFollowing] = useState(false)

  const ship = V.ships.split('·')[1] ? V.ships.split('·')[1].trim() : V.ships

  const toggleFollow = () => {
    const next = !following
    setFollowing(next)
    if (next) toast('Following ' + V.name)
  }

  return (
    <main className="container page-vendor" data-screen-label="Vendor Detail">
      <nav className="crumb">
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <a href="#">Sellers</a>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>{V.name}</span>
      </nav>

      <section className="vendor-hero">
        <div className="vendor-cover"><Art art={V.art} /></div>
        <div className="vendor-bar">
          <div className="vendor-av"><Art art={V.art} /></div>
          <div className="vendor-id">
            <div className="name-row">
              <h1>{V.name}</h1>
              <span className="verified-mark"><ShieldCheck strokeWidth={2} />Verified MSME</span>
            </div>
            <div className="sub">
              <span className="gold"><Star fill="currentColor" strokeWidth={0} /><span>{V.rating}</span></span>
              <span><MapPin strokeWidth={1.8} /><span>{V.loc}</span></span>
              <span><Calendar strokeWidth={1.8} />Since <span>{V.since}</span></span>
            </div>
          </div>
          <div className="vendor-actions">
            <button
              className={`btn ${following ? 'btn-primary' : 'btn-ghost'}`}
              onClick={toggleFollow}
            >
              <Heart strokeWidth={1.8} fill={following ? 'currentColor' : 'none'} />
              {following ? 'Following' : 'Follow'}
            </button>
            <button className="btn btn-primary">
              <MessageSquare strokeWidth={1.8} />Contact seller
            </button>
          </div>
        </div>
      </section>

      <div className="vendor-stats">
        <div className="vstat"><div className="n">{V.rating}</div><div className="l">Seller rating · {V.reviews.toLocaleString('en-IN')} reviews</div></div>
        <div className="vstat"><div className="n">{V.orders}</div><div className="l">Orders fulfilled</div></div>
        <div className="vstat"><div className="n">{items.length}</div><div className="l">Products listed</div></div>
        <div className="vstat"><div className="n">{V.response.replace('Within ', '')}</div><div className="l">Avg. response time</div></div>
      </div>

      <div className="vendor-body">
        <div className="about-block">
          <h2>About this seller</h2>
          <p>{V.about}</p>
          <div className="cred-list">
            <div className="cred"><ShieldCheck strokeWidth={1.8} /><div><strong>Udyam registered</strong><span>Govt. of India MSME ID verified</span></div></div>
            <div className="cred"><FileText strokeWidth={1.8} /><div><strong>GST compliant</strong><span>Tax invoices on every order</span></div></div>
            <div className="cred"><Clock strokeWidth={1.8} /><div><strong>Fast response</strong><span>{V.response}</span></div></div>
            <div className="cred"><Truck strokeWidth={1.8} /><div><strong>Ships pan-India</strong><span>{V.ships}</span></div></div>
          </div>
        </div>
        <aside className="side-panel">
          <h4>Store details</h4>
          <div className="side-row"><span className="k">Member since</span><span className="v">{V.since}</span></div>
          <div className="side-row"><span className="k">Location</span><span className="v">{V.loc}</span></div>
          <div className="side-row"><span className="k">Response time</span><span className="v">{V.response}</span></div>
          <div className="side-row"><span className="k">Shipping</span><span className="v">{ship}</span></div>
          <div className="side-row"><span className="k">GST invoice</span><span className="v">Available</span></div>
          <a href="#products" className="btn btn-primary btn-block" style={{ marginTop: 18 }}>Browse catalogue</a>
        </aside>
      </div>

      <section className="vendor-products" id="products">
        <div className="vp-head">
          <div className="lead">
            <span className="eyebrow">From this store</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>Products by {V.name}</h2>
          </div>
          <span className="result-count">{items.length} products</span>
        </div>
        <div className="vp-grid">
          {items.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </main>
  )
}
