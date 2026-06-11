import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, BadgeCheck, Building2, ChevronRight, CreditCard, FileCheck2,
  Landmark, Lock, ShieldCheck, Smartphone, WalletCards,
} from 'lucide-react'
import { rupee } from '../data/catalog'
import { useStore } from '../context/StoreContext'

type PaymentMethod = 'card' | 'upi' | 'netbanking'

export function PaymentDemo() {
  const { cart } = useStore()
  const [method, setMethod] = useState<PaymentMethod>('card')
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0) || 18420
  const gst = Math.round(subtotal * 0.18)
  const platformFee = 49
  const total = subtotal + gst + platformFee

  return (
    <main className="container page-payment" data-screen-label="Demo Payment">
      <nav className="crumb">
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <Link to="/cart">Cart</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>Secure payment demo</span>
      </nav>

      <section className="payment-shell">
        <div className="payment-main">
          <div className="payment-head">
            <span className="payment-lock"><Lock strokeWidth={2} /></span>
            <div>
              <span className="eyebrow">Demo checkout</span>
              <h1>Secure payment</h1>
              <p>This demo shows a buyer-safe payment screen with GST-ready billing, consent capture, and security notices.</p>
            </div>
          </div>

          <div className="pay-card">
            <div className="pay-card-head">
              <div>
                <h2>Choose payment method</h2>
                <p>All options are shown for UI demonstration only.</p>
              </div>
              <span className="ssl-chip"><ShieldCheck strokeWidth={1.8} />100% secure with SSL</span>
            </div>

            <section className={`pay-method ${method === 'card' ? 'active' : ''}`}>
              <button
                className="pay-method-trigger"
                type="button"
                onClick={() => setMethod('card')}
                aria-expanded={method === 'card'}
              >
                <span className="pay-method-icon"><CreditCard strokeWidth={1.8} /></span>
                <span className="pay-method-body">
                  <strong>Credit or debit card</strong>
                  <span>Visa, Mastercard, RuPay and business cards</span>
                </span>
              </button>
              {method === 'card' && (
                <div className="card-grid">
                  <label className="field">
                    <span>Card number</span>
                    <input value="4111 1111 1111 1111" readOnly aria-label="Demo card number" />
                  </label>
                  <label className="field">
                    <span>Name on card</span>
                    <input value="Demo Buyer Pvt Ltd" readOnly aria-label="Demo card holder name" />
                  </label>
                  <label className="field compact">
                    <span>Expiry</span>
                    <input value="12 / 29" readOnly aria-label="Demo expiry" />
                  </label>
                  <label className="field compact">
                    <span>CVV</span>
                    <input value="123" readOnly aria-label="Demo CVV" />
                  </label>
                </div>
              )}
            </section>

            <section className={`pay-method ${method === 'upi' ? 'active' : ''}`}>
              <button
                className="pay-method-trigger"
                type="button"
                onClick={() => setMethod('upi')}
                aria-expanded={method === 'upi'}
              >
                <span className="pay-method-icon"><Smartphone strokeWidth={1.8} /></span>
                <span className="pay-method-body">
                  <strong>UPI</strong>
                  <span>Collect request, QR, or UPI ID verification</span>
                </span>
              </button>
              {method === 'upi' && (
                <div className="upi-panel">
                  <label className="field">
                    <span>UPI ID</span>
                    <input value="buyer@upi" readOnly aria-label="Demo UPI ID" />
                  </label>
                  <div className="upi-qr" aria-label="Demo UPI QR placeholder">
                    <div className="qr-grid" />
                    <span>Scan & pay</span>
                  </div>
                  <p className="method-note">A production checkout would verify the UPI ID and show a bank-authorized collect request before payment.</p>
                </div>
              )}
            </section>

            <section className={`pay-method ${method === 'netbanking' ? 'active' : ''}`}>
              <button
                className="pay-method-trigger"
                type="button"
                onClick={() => setMethod('netbanking')}
                aria-expanded={method === 'netbanking'}
              >
                <span className="pay-method-icon"><Landmark strokeWidth={1.8} /></span>
                <span className="pay-method-body">
                  <strong>Net banking</strong>
                  <span>Redirect flow with bank-side authentication</span>
                </span>
              </button>
              {method === 'netbanking' && (
                <div className="bank-panel">
                  <div className="bank-grid">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((bank) => (
                      <button className="bank-option" type="button" key={bank}>{bank}</button>
                    ))}
                  </div>
                  <label className="field">
                    <span>Other bank</span>
                    <select defaultValue="" aria-label="Select demo bank">
                      <option value="" disabled>Select your bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Punjab National Bank</option>
                      <option>Bank of Baroda</option>
                    </select>
                  </label>
                  <p className="method-note">In production, the buyer would be redirected to the selected bank for authentication and returned after payment status confirmation.</p>
                </div>
              )}
            </section>

            <label className="legal-consent">
              <input type="checkbox" checked readOnly />
              <span>I agree to the demo terms, refund policy, GST invoice details, and secure payment consent shown on this page.</span>
            </label>

            <button className="btn btn-primary btn-block payment-submit" type="button">
              Pay securely {rupee(total)}<Lock strokeWidth={2} />
            </button>
          </div>
        </div>

        <aside className="payment-side">
          <div className="order-panel">
            <h3>Order summary</h3>
            <div className="sum-row"><span>Items subtotal</span><span className="v">{rupee(subtotal)}</span></div>
            <div className="sum-row"><span>GST estimate</span><span className="v">{rupee(gst)}</span></div>
            <div className="sum-row"><span>Platform fee</span><span className="v">{rupee(platformFee)}</span></div>
            <hr className="sum-divider" />
            <div className="sum-total"><span className="l">Payable now</span><span className="v">{rupee(total)}</span></div>
            <p className="sum-note">Demo amount only. No real payment will be collected.</p>
          </div>

          <div className="trust-panel">
            <h3>Legal & trust checks</h3>
            <div className="trust-row"><ShieldCheck strokeWidth={1.8} /><div><strong>SSL-secured UI</strong><span>Payment fields are presented inside a secure checkout pattern.</span></div></div>
            <div className="trust-row"><FileCheck2 strokeWidth={1.8} /><div><strong>GST invoice ready</strong><span>Buyer GSTIN and seller GST details can be captured before payment.</span></div></div>
            <div className="trust-row"><BadgeCheck strokeWidth={1.8} /><div><strong>KYC seller signal</strong><span>Designed to show verified MSME and Udyam checks clearly.</span></div></div>
            <div className="trust-row"><Building2 strokeWidth={1.8} /><div><strong>Business-safe records</strong><span>Order, tax, refund, and consent references are visible to buyers.</span></div></div>
          </div>

          <div className="demo-disclaimer">
            <WalletCards strokeWidth={1.8} />
            <p>This is a front-end payment demo. Connect a licensed payment gateway and review policies with counsel before production use.</p>
          </div>

          <Link to="/cart" className="link-more payment-back"><ArrowLeft strokeWidth={2} />Back to cart</Link>
        </aside>
      </section>
    </main>
  )
}
