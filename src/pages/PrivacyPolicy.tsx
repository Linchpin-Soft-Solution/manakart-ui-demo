import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export function PrivacyPolicy() {
  return (
    <main className="container" data-screen-label="Privacy Policy">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>Privacy Policy</span>
      </nav>

      <section className="content-hero">
        <span className="eyebrow">Your privacy matters</span>
        <h1>Privacy Policy</h1>
        <p className="lead-copy">
          This policy explains how Manakart collects, uses, and protects information when you use our marketplace.
        </p>
      </section>

      <section className="block prose" style={{ paddingTop: 28, paddingBottom: 90 }}>
        <h3>Information we collect</h3>
        <p>We collect account, contact, order, payment, and usage information needed to provide and improve our services.</p>

        <h3>How we use information</h3>
        <p>We use this information to process orders, support buyers and sellers, prevent fraud, and communicate service updates.</p>

        <h3>Information sharing</h3>
        <p>We share information only with service providers, transaction participants, and authorities when required to operate the marketplace or comply with law.</p>

        <h3>Your choices</h3>
        <p>You may request access, correction, or deletion of your personal information by contacting Manakart support.</p>
      </section>
    </main>
  )
}
