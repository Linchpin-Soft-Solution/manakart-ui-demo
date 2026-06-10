/* ============================================================
   MANAKART — shared cart + wishlist + toast state
   Mirrors the `MK` global in the handoff's manakart.js, backed by
   localStorage (keys: manakart_cart / manakart_wish).
   TODO: in production, swap localStorage for the app's real
   cart/session backend.
   ============================================================ */
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
  type ReactNode,
} from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  unit: string
  qty: number
  seller?: string
  moq?: string
}

export interface Toast { id: number; msg: string }

interface StoreApi {
  cart: CartItem[]
  wish: string[]
  toasts: Toast[]
  cartBadge: number          // distinct lines — mirrors MK.refreshBadges (getCart().length)
  wishBadge: number
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  setQty: (id: string, qty: number) => void
  removeFromCart: (id: string) => void
  toggleWish: (id: string) => boolean
  isWished: (id: string) => boolean
  toast: (msg: string) => void
  dismissToast: (id: number) => void
}

const CART_KEY = 'manakart_cart'
const WISH_KEY = 'manakart_wish'

function readJSON<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(k)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const StoreContext = createContext<StoreApi | null>(null)

let toastSeq = 0

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readJSON<CartItem[]>(CART_KEY, []))
  const [wish, setWish] = useState<string[]>(() => readJSON<string[]>(WISH_KEY, []))
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem(WISH_KEY, JSON.stringify(wish)) }, [wish])

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const toast = useCallback((msg: string) => {
    const id = ++toastSeq
    setToasts((t) => [...t, { id, msg }])
    setTimeout(() => dismissToast(id), 2400)
  }, [dismissToast])

  const addToCart = useCallback<StoreApi['addToCart']>((item, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id)
      if (found) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { ...item, qty }]
    })
    toast(`Added to cart · ${item.name}`)
  }, [toast])

  const setQty = useCallback<StoreApi['setQty']>((id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }, [])

  const removeFromCart = useCallback<StoreApi['removeFromCart']>((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const toggleWish = useCallback<StoreApi['toggleWish']>((id) => {
    let nowOn = false
    setWish((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      nowOn = true
      return [...prev, id]
    })
    if (!wish.includes(id)) toast('Saved to wishlist')
    return nowOn || !wish.includes(id)
  }, [wish, toast])

  const isWished = useCallback((id: string) => wish.includes(id), [wish])

  const value = useMemo<StoreApi>(() => ({
    cart, wish, toasts,
    cartBadge: cart.length,
    wishBadge: wish.length,
    addToCart, setQty, removeFromCart, toggleWish, isWished, toast, dismissToast,
  }), [cart, wish, toasts, addToCart, setQty, removeFromCart, toggleWish, isWished, toast, dismissToast])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreApi {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
