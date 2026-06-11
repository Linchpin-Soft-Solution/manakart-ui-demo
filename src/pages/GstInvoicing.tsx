import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export function GstInvoicing() {
  return (
    <main className="container" data-screen-label="GST and Invoicing">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>GST &amp; Invoicing</span>
      </nav>

      <section className="content-hero">
        <span className="eyebrow">Business-ready purchases</span>
        <h1>GST &amp; Invoicing</h1>
        <p className="lead-copy">
          Understand how GST details, tax invoices, and input tax credit work for orders placed through Manakart.
        </p>
      </section>

      <section className="block prose" style={{ paddingTop: 28, paddingBottom: 90 }}>
        <h3>GST invoices</h3>
        <p>GST-registered sellers provide a tax invoice for eligible orders. The invoice includes the seller GSTIN, buyer billing details, taxable value, applicable GST, and place of supply.</p>

        <h3>Add your GST details</h3>
        <p>Enter your legal business name, GSTIN, and registered billing address during checkout. Verify these details before placing the order because issued invoices may not be editable.</p>

        <h3>Input tax credit</h3>
        <p>Eligible business buyers may claim input tax credit subject to applicable GST rules and invoice reporting by the seller. Consult your tax adviser for guidance specific to your business.</p>

        <h3>Invoice availability</h3>
        <p>Your invoice becomes available with the completed order. For corrections or a missing invoice, contact support with your order number and billing details.</p>

        <Link to="/contact" className="btn btn-primary">Contact support</Link>
      </section>
    </main>
  )
}
