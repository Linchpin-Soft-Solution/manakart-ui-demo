import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, X } from 'lucide-react'
import { PRODUCTS, getVendor } from '../data/catalog'
import { ProductCard } from '../components/ProductCard'

/** free-text match across name, category, region, location & seller name */
function matchesQuery(p: (typeof PRODUCTS)[number], q: string): boolean {
  if (!q) return true
  const hay = [
    p.name, p.cat, p.region, p.loc, p.flag,
    getVendor(p.vendor)?.name ?? '',
  ].join(' ').toLowerCase()
  return q.toLowerCase().split(/\s+/).every((tok) => hay.includes(tok))
}

type Sort = 'pop' | 'low' | 'high' | 'rating' | 'new'

const cats = [...new Set(PRODUCTS.map((p) => p.cat))]
const regions = [...new Set(PRODUCTS.map((p) => p.region))]

export function Category() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim()

  const [cat, setCat] = useState<string[]>(() => searchParams.getAll('cat'))
  const [region, setRegion] = useState<string[]>(() => searchParams.getAll('region'))
  const [flag, setFlag] = useState<string[]>(() => searchParams.getAll('flag'))
  const [gst, setGst] = useState(() => searchParams.get('gst') === '1')
  const [isNew, setIsNew] = useState(() => searchParams.get('new') === '1')
  const [sort, setSort] = useState<Sort>('pop')

  // sync filter state from the URL (deep links, nav links, region cards)
  useEffect(() => {
    setCat(searchParams.getAll('cat'))
    setRegion(searchParams.getAll('region'))
    setFlag(searchParams.getAll('flag'))
    setGst(searchParams.get('gst') === '1')
    setIsNew(searchParams.get('new') === '1')
  }, [searchParams])

  const toggle = (list: string[], set: (v: string[]) => void, val: string) =>
    set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val])

  const clearAll = () => {
    setCat([]); setRegion([]); setFlag([]); setGst(false); setIsNew(false)
    const next = new URLSearchParams(searchParams)
    ;['cat', 'region', 'flag', 'new', 'gst'].forEach((k) => next.delete(k))
    setSearchParams(next, { replace: true })
  }

  const clearSearch = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('q')
    setSearchParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const out = PRODUCTS.filter((p) =>
      matchesQuery(p, query) &&
      (!cat.length || cat.includes(p.cat)) &&
      (!region.length || region.includes(p.region)) &&
      (!flag.length || flag.includes(p.flag)) &&
      (!gst || p.gst) &&
      (!isNew || p.new),
    )
    const sorted = [...out]
    if (sort === 'low') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'high') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    else if (sort === 'new') sorted.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
    return sorted
  }, [query, cat, region, flag, gst, isNew, sort])

  return (
    <main className="container page-category" data-screen-label="Category Listing">
      <div className="crumb">
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>All Products</span>
      </div>

      <div className="listing-head">
        <div>
          <span className="eyebrow">Factory direct · Verified MSMEs</span>
          <h1 style={{ marginTop: 12 }}>{query ? `Results for “${query}”` : 'Shop all products'}</h1>
          {query
            ? (
              <p>
                Showing matches across products, categories &amp; sellers.{' '}
                <button className="search-clear" onClick={clearSearch}>
                  <X strokeWidth={2} />Clear search
                </button>
              </p>
            )
            : <p>Source commodities and handcrafted goods from India's small manufacturers.</p>}
        </div>
        <div className="listing-tools">
          <span className="result-count">{list.length} product{list.length !== 1 ? 's' : ''}</span>
          <select className="sort-sel" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="pop">Sort: Most popular</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top rated</option>
            <option value="new">Newest</option>
          </select>
        </div>
      </div>

      <div className="listing-layout">
        <aside className="filters">
          <div className="filter-head">
            <h3>Filters</h3>
            <button className="clear-btn" onClick={clearAll}>Clear all</button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            {cats.map((c) => (
              <label className="fopt" key={c}>
                <input type="checkbox" checked={cat.includes(c)} onChange={() => toggle(cat, setCat, c)} />
                <span>{c}</span>
                <span className="count">{PRODUCTS.filter((p) => p.cat === c).length}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Region</h4>
            {regions.map((r) => (
              <label className="fopt" key={r}>
                <input type="checkbox" checked={region.includes(r)} onChange={() => toggle(region, setRegion, r)} />
                <span>{r}</span>
                <span className="count">{PRODUCTS.filter((p) => p.region === r).length}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Buyer benefits</h4>
            <label className="fopt">
              <input type="checkbox" checked={flag.includes('Low MOQ')} onChange={() => toggle(flag, setFlag, 'Low MOQ')} />
              <span>Low MOQ</span>
            </label>
            <label className="fopt">
              <input type="checkbox" checked={flag.includes('Factory Direct')} onChange={() => toggle(flag, setFlag, 'Factory Direct')} />
              <span>Factory Direct</span>
            </label>
            <label className="fopt">
              <input type="checkbox" checked={gst} onChange={() => setGst(!gst)} />
              <span>GST invoice available</span>
            </label>
            <label className="fopt">
              <input type="checkbox" checked={isNew} onChange={() => setIsNew(!isNew)} />
              <span>New arrivals</span>
            </label>
          </div>
        </aside>

        <div>
          <div className="grid-products">
            {list.length
              ? list.map((p) => <ProductCard key={p.id} p={p} />)
              : <div className="empty">No products match these filters. Try clearing some.</div>}
          </div>
        </div>
      </div>
    </main>
  )
}
