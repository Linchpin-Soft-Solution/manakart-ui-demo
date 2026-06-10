import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, Search, PackageCheck, Box, Truck, MapPin, CircleCheck, Info,
} from 'lucide-react'

interface Stage { key: string; icon: typeof Box; title: string; desc: string }
const STAGES: Stage[] = [
  { key: 'placed', icon: PackageCheck, title: 'Order placed', desc: 'Payment held securely in escrow' },
  { key: 'packed', icon: Box, title: 'Packed by seller', desc: 'Quality-checked & GST invoice generated' },
  { key: 'shipped', icon: Truck, title: 'Shipped', desc: 'Handed to courier, in transit' },
  { key: 'out', icon: MapPin, title: 'Out for delivery', desc: 'On the vehicle for final delivery' },
  { key: 'delivered', icon: CircleCheck, title: 'Delivered', desc: 'Escrow released to the seller' },
]

// deterministic "status" from the order id so the demo feels stable
function statusFor(id: string): number {
  let h = 0
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h % STAGES.length // index of the CURRENT stage
}

const COURIERS = ['Delhivery', 'BlueDart', 'DTDC', 'Ekart', 'India Post']

export function TrackOrder() {
  const [input, setInput] = useState('')
  const [tracked, setTracked] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = input.trim()
    if (id) setTracked(id.toUpperCase())
  }

  const current = tracked ? statusFor(tracked) : 0
  const courier = tracked ? COURIERS[statusFor(tracked + 'c') % COURIERS.length] : ''
  const etaDays = tracked ? (STAGES.length - current) + 1 : 0

  return (
    <main className="container page-track" data-screen-label="Track Order">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>Track Order</span>
      </nav>

      <section className="content-hero">
        <span className="eyebrow">Order tracking</span>
        <h1>Track your order</h1>
        <p className="lead-copy">Enter your order ID to see live status. Try any reference — this is a demo, so every ID returns a tracked shipment.</p>
      </section>

      <div className="track-wrap">
        <form className="track-form" onSubmit={submit}>
          <input
            type="text"
            placeholder="e.g. MK-2026-018342"
            aria-label="Order ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ height: 52, paddingInline: 28 }}>
            <Search strokeWidth={2} />Track
          </button>
        </form>
        <p className="track-hint">Tip: try <code>MK-2026-018342</code> or your email order reference.</p>

        {tracked && (
          <div className="track-card">
            <div className="track-head">
              <div>
                <h3>Order {tracked}</h3>
                <div className="sub">Carrier: {courier} · 3 items · ₹4,820 (incl. GST)</div>
              </div>
              <div className="track-eta">
                <div className="lbl">{current >= STAGES.length - 1 ? 'Status' : 'Est. delivery'}</div>
                <div className="val">{current >= STAGES.length - 1 ? 'Delivered' : `${etaDays}–${etaDays + 1} days`}</div>
              </div>
            </div>

            <div className="timeline">
              {STAGES.map((s, i) => {
                const cls = i < current ? 'done' : i === current ? 'current' : ''
                const Icon = s.icon
                return (
                  <div className={`tl-step ${cls}`} key={s.key}>
                    <div className="tl-dot"><Icon strokeWidth={2} /></div>
                    <div className="tl-body">
                      <h4>{s.title}</h4>
                      <p>{i <= current ? s.desc : 'Pending'}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div className="demo-note" style={{ maxWidth: 'none' }}>
          <Info strokeWidth={2} />
          <span>Demo only — no real orders are looked up. In production this calls the order/logistics service and resolves the live carrier status.</span>
        </div>
      </div>

      <div style={{ paddingBottom: 80 }} />
    </main>
  )
}
