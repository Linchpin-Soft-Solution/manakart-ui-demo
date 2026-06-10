import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Mail, Phone, MapPin, Info, Send } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export function Contact() {
  const { toast } = useStore()
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    toast('Message sent (demo) · we’ll be in touch')
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <main className="container page-contact" data-screen-label="Contact">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>Contact Us</span>
      </nav>

      <section className="content-hero">
        <span className="eyebrow">We're here to help</span>
        <h1>Get in touch</h1>
        <p className="lead-copy">Questions about an order, GST invoicing, or selling on Manakart? Send us a message and our team will respond within one business day.</p>
      </section>

      <section className="block" style={{ paddingTop: 28, paddingBottom: 90 }}>
        <div className="contact-grid">
          <form className="auth-card" onSubmit={submit} style={{ boxShadow: 'var(--sh-sm)' }}>
            <div className="field">
              <label htmlFor="cname">Your name</label>
              <input id="cname" type="text" placeholder="Aarti Sharma" required />
            </div>
            <div className="field">
              <label htmlFor="cemail">Email</label>
              <input id="cemail" type="email" placeholder="you@business.in" required />
            </div>
            <div className="field">
              <label htmlFor="csub">Subject</label>
              <input id="csub" type="text" placeholder="GST invoice for order MK-2026-…" required />
            </div>
            <div className="field">
              <label htmlFor="cmsg">Message</label>
              <textarea id="cmsg" placeholder="How can we help?" required />
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ height: 50, fontSize: 16 }}>
              <Send strokeWidth={2} />{sent ? 'Send another' : 'Send message'}
            </button>
            <div className="demo-note">
              <Info strokeWidth={2} />
              <span>Demo only — nothing is actually emailed. Submitting fires a confirmation toast.</span>
            </div>
          </form>

          <div className="contact-side">
            <div className="feature-ic"><Mail strokeWidth={1.8} /></div>
            <h2 className="section-title" style={{ fontSize: 26 }}>Other ways to reach us</h2>
            <div className="contact-info">
              <div className="ci-row"><Mail strokeWidth={1.8} /><div><strong>Email</strong><span>support@manakart.com</span></div></div>
              <div className="ci-row"><Phone strokeWidth={1.8} /><div><strong>Buyer & seller helpline</strong><span>1800-123-4567 · Mon–Sat, 9am–7pm IST</span></div></div>
              <div className="ci-row"><MapPin strokeWidth={1.8} /><div><strong>Registered office</strong><span>Manakart Technologies Pvt. Ltd.<br />Bengaluru, Karnataka 560001</span></div></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
