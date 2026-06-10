import { Link } from 'react-router-dom'
import { ChevronRight, MapPin, Store } from 'lucide-react'
import { PRODUCTS, VENDORS, type ArtKey } from '../data/catalog'
import { Art } from '../art/Art'
import { imageForArt } from '../art/images'

interface RegionInfo { region: string; art: ArtKey; products: number; sellers: number; specialty: string }

const SPECIALTY: Record<string, string> = {
  'Uttar Pradesh': 'Moradabad brassware',
  'West Bengal': 'Jute & eco-packaging',
  'Maharashtra': 'Jaggery, chikki & farm foods',
  'Tamil Nadu': 'Coimbatore cotton & handloom',
  'Kerala': 'Western Ghats whole spices',
  'Rajasthan': 'Marwar terracotta & blue pottery',
}

const regions: RegionInfo[] = [...new Set(PRODUCTS.map((p) => p.region))].map((region) => {
  const items = PRODUCTS.filter((p) => p.region === region)
  const sellers = Object.values(VENDORS).filter((v) => v.region === region).length
  return {
    region,
    art: items[0].art,
    products: items.length,
    sellers,
    specialty: SPECIALTY[region] ?? `${items.length} products`,
  }
})

export function Regions() {
  return (
    <main className="container page-regions" data-screen-label="Regions">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>Shop by Region</span>
      </nav>

      <section className="content-hero">
        <span className="eyebrow">India's craft & commodity map</span>
        <h1>Shop by region</h1>
        <p className="lead-copy">
          Every region of India has its own clusters of making. Pick a state to browse its
          verified MSME sellers and their factory-direct catalogue.
        </p>
      </section>

      <section className="block" style={{ paddingTop: 28, paddingBottom: 90 }}>
        <div className="region-grid">
          {regions.map((r) => (
            <Link key={r.region} to={`/category?region=${encodeURIComponent(r.region)}`} className="region-card">
              <div className="region-media">
                <Art art={r.art} src={imageForArt(r.art)} alt={r.region} />
              </div>
              <div className="region-body">
                <h3>{r.region}</h3>
                <div className="meta"><MapPin strokeWidth={1.8} />{r.specialty}</div>
                <div className="meta"><Store strokeWidth={1.8} />{r.products} products · {r.sellers} seller{r.sellers !== 1 ? 's' : ''}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
