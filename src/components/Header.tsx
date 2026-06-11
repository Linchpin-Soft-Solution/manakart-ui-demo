import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Heart, Menu, ShoppingCart, User, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const HEADER_CATEGORIES = [
  { label: 'Handicraft', value: 'Handicrafts' },
  { label: 'Packaging', value: 'Packaging' },
  { label: 'Food Commodities', value: 'Food Commodities' },
  { label: 'Textiles', value: 'Textiles' },
  { label: 'Home & Kitchen', value: 'Home & Kitchen' },
  { label: 'Agriculture', value: 'Agriculture' },
]

export function Header() {
  const { cartBadge, wishBadge } = useStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [q, setQ] = useState(searchParams.get('q') ?? '')
  const [menuOpen, setMenuOpen] = useState(false)

  // keep the field in sync with the URL (e.g. back/forward, direct link)
  useEffect(() => { setQ(searchParams.get('q') ?? '') }, [searchParams])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const term = q.trim()
    setMenuOpen(false)
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
            placeholder="Search for products or sellers…"
            aria-label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="search-btn" aria-label="Search" type="submit">
            <Search strokeWidth={2} />
          </button>
        </form>
        <div className={`header-links${menuOpen ? ' open' : ''}`} id="mobile-header-menu">
          <Link to="/sell" className="header-link header-link-accent" onClick={() => setMenuOpen(false)}>Sell on Manakart</Link>
        </div>
        <div className="header-actions">
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-header-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X strokeWidth={1.8} /> : <Menu strokeWidth={1.8} />}
          </button>
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
      <nav className="header-nav" aria-label="Product categories">
        <div className="container category-nav">
          {HEADER_CATEGORIES.map((category) => (
            <Link
              key={category.value}
              to={`/category?cat=${encodeURIComponent(category.value)}`}
              className="nav-link"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
