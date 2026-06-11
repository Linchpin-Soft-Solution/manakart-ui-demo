import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from './components/Toaster'
import { Home } from './pages/Home'
import { Category } from './pages/Category'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'
import { Vendor } from './pages/Vendor'
import { BulkDeals } from './pages/BulkDeals'
import { About } from './pages/About'
import { TrackOrder } from './pages/TrackOrder'
import { Regions } from './pages/Regions'
import { Sell } from './pages/Sell'
import { Login } from './pages/Login'
import { Contact } from './pages/Contact'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { GstInvoicing } from './pages/GstInvoicing'
import { PaymentDemo } from './pages/PaymentDemo'

/** Scroll to top on route change (each handoff page loaded fresh). */
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname, search])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/vendor/:id" element={<Vendor />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/deals" element={<BulkDeals />} />
        <Route path="/about" element={<About />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/region" element={<Regions />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/gst-invoicing" element={<GstInvoicing />} />
        <Route path="/payment" element={<PaymentDemo />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}
