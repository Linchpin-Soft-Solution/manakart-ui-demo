import { Link } from 'react-router-dom'
import { MapPin, Layers, Star, Plus, ShieldCheck, Heart } from 'lucide-react'
import type { Product } from '../data/catalog'
import { rupee } from '../data/catalog'
import { Art } from '../art/Art'
import { imageForProduct } from '../art/images'
import { useStore } from '../context/StoreContext'

/** Product card — mirrors MKART.productCard() markup & behaviour.
 *  The whole card is a link to the PDP; the wishlist + add buttons
 *  preventDefault/stopPropagation so they don't trigger navigation. */
export function ProductCard({ p }: { p: Product }) {
  const { addToCart, toggleWish, isWished } = useStore()
  const flagAccent = p.flag === 'Low MOQ' || p.flag === 'Factory Direct'
  const wished = isWished(p.id)

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWish(p.id)
  }
  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ id: p.id, name: p.name, price: p.price, unit: p.unit, seller: p.loc, moq: p.moq })
  }

  return (
    <Link to={`/product/${p.id}`} className="product-card">
      <div className="pc-media">
        <Art art={p.art} src={imageForProduct(p.id, p.art)} alt={p.name} />
        <span className={`pc-flag${flagAccent ? ' accent' : ''}`}>
          <ShieldCheck strokeWidth={2} />
          {p.flag}
        </span>
        <button
          className={`pc-wish${wished ? ' active' : ''}`}
          onClick={onWish}
          aria-label="Save to wishlist"
          aria-pressed={wished}
        >
          <Heart strokeWidth={1.8} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="pc-body">
        <span className="pc-loc"><MapPin strokeWidth={1.8} />{p.loc}</span>
        <h3 className="pc-name">{p.name}</h3>
        <div className="pc-meta">
          <span className="moq"><Layers strokeWidth={1.8} />MOQ {p.moq}</span>
          <span className="pc-rating"><Star fill="currentColor" strokeWidth={0} />{p.rating}</span>
        </div>
        <div className="pc-foot">
          <span className="pc-price">
            <span className="amt">{rupee(p.price)}</span>
            <span className="unit">{p.unit}</span>
          </span>
          <button className="pc-add" onClick={onAdd} aria-label="Add to cart">
            <Plus strokeWidth={2} />
          </button>
        </div>
      </div>
    </Link>
  )
}
