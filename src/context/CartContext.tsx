import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Product } from "@/types/product"

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; size: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; size: string; quantity: number } }
  | { type: "CLEAR_CART" }

interface CartState {
  items: CartItem[]
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, size } = action.payload
      const idx = state.items.findIndex((i) => i.product.id === product.id && i.size === size)
      if (idx >= 0)
        return {
          items: state.items.map((item, i) =>
            i === idx ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }
      return { items: [...state.items, { product, quantity: 1, size }] }
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      }
    case "UPDATE_QUANTITY": {
      const { productId, size, quantity } = action.payload
      if (quantity <= 0)
        return {
          items: state.items.filter((i) => !(i.product.id === productId && i.size === size)),
        }
      return {
        items: state.items.map((item) =>
          item.product.id === productId && item.size === size ? { ...item, quantity } : item
        ),
      }
    }
    case "CLEAR_CART":
      return { items: [] }
    default:
      return state
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: string) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (product, size) => dispatch({ type: "ADD_ITEM", payload: { product, size } }),
        removeItem: (productId, size) =>
          dispatch({ type: "REMOVE_ITEM", payload: { productId, size } }),
        updateQuantity: (productId, size, quantity) =>
          dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, quantity } }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        total: state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
        itemCount: state.items.reduce((sum, i) => sum + i.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCartContext must be used inside CartProvider")
  return ctx
}
