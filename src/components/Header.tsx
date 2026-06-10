import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Heart, User, ShoppingCart } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export function Header() {
  const { cartBadge, wishBadge } = useStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [q, setQ] = useState(searchParams.get('q') ?? '')

  // keep the field in sync with the URL (e.g. back/forward, direct link)
  useEffect(() => { setQ(searchParams.get('q') ?? '') }, [searchParams])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = q.trim()
    navigate(term ? `/category?q=${encodeURIComponent(term)}` : '/category')
  }

  return (
    <header className="site-header" data-screen-label="Header">
      <div className="container header-main">
        <Link to="/" className="brand-logo" aria-label="Manakart home">
          <img src="/logo.png" alt="Manakart" />
        </Link>
        <form className="search" onSubmit={submit} role="search">
          <input
            type="text"
            placeholder="Search for products, categories or sellers…"
            aria-label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="search-btn" aria-label="Search" type="submit">
            <Search strokeWidth={2} />
          </button>
        </form>
        <div className="header-actions">
          <Link to="/category" className="icon-btn" aria-label="Wishlist">
            <Heart strokeWidth={1.8} />
            {wishBadge > 0 && <span className="badge" data-wish-badge>{wishBadge}</span>}
          </Link>
          <Link to="/login" className="icon-btn" aria-label="Account">
            <User strokeWidth={1.8} />
          </Link>
          <Link to="/cart" className="icon-btn" aria-label="Cart">
            <ShoppingCart strokeWidth={1.8} />
            {cartBadge > 0 && <span className="badge" data-cart-badge>{cartBadge}</span>}
          </Link>
        </div>
      </div>
      <nav className="header-nav">
        <div className="container">
          <div className="nav-group">
            <Link to="/category" className="nav-link">Categories</Link>
            <Link to="/regions" className="nav-link">Shop by Region</Link>
            <Link to="/deals" className="nav-link">Bulk Deals</Link>
            <Link to="/category?new=1" className="nav-link">New Arrivals</Link>
            <Link to="/category?flag=Low+MOQ" className="nav-link">Low MOQ</Link>
            <Link to="/category?flag=Factory+Direct" className="nav-link">Factory Direct</Link>
          </div>
          <div className="nav-group">
            <Link to="/sell" className="nav-link accent">Sell on Manakart</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
