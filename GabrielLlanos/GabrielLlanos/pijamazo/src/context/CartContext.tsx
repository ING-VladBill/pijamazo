import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react"
import type { Product } from "@/types/product"

export interface CartItem { product: Product; quantity: number; size: string }
interface CartState { items: CartItem[] }

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; size: string } }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: string } }
  | { type: "INCREASE_QTY"; payload: { id: string; size: string } }
  | { type: "DECREASE_QTY"; payload: { id: string; size: string } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartItem[] }

const STORAGE_KEY = "pijamazo-cart"
function sameLine(a: CartItem, id: string, size: string) { return a.product.id === id && a.size === size }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE": return { items: action.payload }
    case "ADD_ITEM": {
      const { product, quantity, size } = action.payload
      const existing = state.items.find((i) => sameLine(i, product.id, size))
      if (existing) {
        return { items: state.items.map((i) => sameLine(i, product.id, size) ? { ...i, quantity: i.quantity + quantity } : i) }
      }
      return { items: [...state.items, { product, quantity, size }] }
    }
    case "INCREASE_QTY":
      return { items: state.items.map((i) => sameLine(i, action.payload.id, action.payload.size) ? { ...i, quantity: i.quantity + 1 } : i) }
    case "DECREASE_QTY":
      return { items: state.items.map((i) => sameLine(i, action.payload.id, action.payload.size) ? { ...i, quantity: i.quantity - 1 } : i).filter((i) => i.quantity > 0) }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => !sameLine(i, action.payload.id, action.payload.size)) }
    case "CLEAR_CART": return { items: [] }
    default: return state
  }
}

interface CartContextValue {
  items: CartItem[]; itemCount: number; subtotal: number
  addItem: (product: Product, quantity: number, size: string) => void
  increaseQty: (id: string, size: string) => void
  decreaseQty: (id: string, size: string) => void
  removeItem: (id: string, size: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: "HYDRATE", payload: JSON.parse(raw) as CartItem[] })
    } catch { /* localStorage corrupto: arrancamos vacío */ }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = state.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0)
    return {
      items: state.items, itemCount, subtotal,
      addItem: (product, quantity, size) => dispatch({ type: "ADD_ITEM", payload: { product, quantity, size } }),
      increaseQty: (id, size) => dispatch({ type: "INCREASE_QTY", payload: { id, size } }),
      decreaseQty: (id, size) => dispatch({ type: "DECREASE_QTY", payload: { id, size } }),
      removeItem: (id, size) => dispatch({ type: "REMOVE_ITEM", payload: { id, size } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    }
  }, [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>")
  return ctx
}