import { Link } from 'react-router-dom'
import { ChevronRight, ShoppingCart, MapPin, Trash2, ArrowRight, FileText } from 'lucide-react'
import { getProduct, rupee, type ArtKey } from '../data/catalog'
import { Art } from '../art/Art'
import { Stepper } from '../components/Stepper'
import { useStore, type CartItem } from '../context/StoreContext'

/** Mirror PDP tiered pricing if MOQ known (manakart cart.js lineUnit). */
function lineUnit(item: CartItem): number {
  const moqNum = parseInt(item.moq || '', 10) || 1
  if (item.qty >= moqNum * 20) return Math.round(item.price * 0.85)
  if (item.qty >= moqNum * 5) return Math.round(item.price * 0.92)
  return item.price
}

export function Cart() {
  const { cart, setQty, removeFromCart } = useStore()

  const subtotal = cart.reduce((s, i) => s + lineUnit(i) * i.qty, 0)
  const gst = Math.round(subtotal * 0.18)
  const units = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <main className="container page-cart" data-screen-label="Cart">
      <nav className="crumb">
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>Your Cart</span>
      </nav>

      <h1 className="cart-title">Your cart</h1>
      <p className="cart-title-sub">
        {cart.length
          ? `${cart.length} product${cart.length !== 1 ? 's' : ''} · ${units} units from verified MSME sellers`
          : 'No items yet'}
      </p>

      <div className="cart-layout">
        <div>
          {cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart strokeWidth={1.5} />
              <h3>Your cart is empty</h3>
              <p>Browse verified MSME products and add them to your cart.</p>
              <Link to="/category" className="btn btn-primary">Start shopping</Link>
            </div>
          ) : (
            cart.map((item) => {
              const art: ArtKey = getProduct(item.id)?.art ?? 'jute'
              const unit = lineUnit(item)
              return (
                <div className="cart-item" key={item.id}>
                  <div className="ci-media"><Art art={art} /></div>
                  <div className="ci-info">
                    <Link to={`/product/${item.id}`}><h3>{item.name}</h3></Link>
                    <span className="ci-loc"><MapPin strokeWidth={1.8} />{item.seller || ''}</span>
                    <div className="ci-meta">
                      <span>MOQ {item.moq || '—'}</span>
                      <span><strong>{rupee(unit)}</strong>{item.unit}</span>
                    </div>
                  </div>
                  <div className="ci-controls">
                    <div className="ci-line-total">{rupee(unit * item.qty)}</div>
                    <div className="ci-bottom">
                      <Stepper value={item.qty} min={1} onChange={(v) => setQty(item.id, v)} />
                      <button className="ci-remove" onClick={() => removeFromCart(item.id)}>
                        <Trash2 strokeWidth={1.8} />Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {cart.length > 0 && (
          <aside className="summary">
            <h3>Order summary</h3>
            <div className="sum-row"><span>Subtotal</span><span className="v">{rupee(subtotal)}</span></div>
            <div className="sum-row"><span>GST (18%)</span><span className="v">{rupee(gst)}</span></div>
            <div className="sum-row free"><span>Shipping</span><span className="v">Calculated at checkout</span></div>
            <hr className="sum-divider" />
            <div className="sum-total"><span className="l">Total</span><span className="v">{rupee(subtotal + gst)}</span></div>
            <p className="sum-note">Inclusive of GST · freight added at checkout</p>
            <button className="btn btn-primary btn-block" style={{ height: 52, fontSize: 16 }}>
              Proceed to checkout<ArrowRight strokeWidth={2} />
            </button>
            <div className="promo">
              <input type="text" placeholder="Promo code" />
              <button className="btn btn-ghost btn-sm">Apply</button>
            </div>
            <div className="gst-tag"><FileText strokeWidth={1.8} />GST invoice will be issued for this order</div>
          </aside>
        )}
      </div>
    </main>
  )
}
