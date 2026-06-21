import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"

export default function Cart() {
  const { items, subtotal, increaseQty, decreaseQty, removeItem, clearCart } = useCart()
  const [checkedOut, setCheckedOut] = useState(false)
  const shipping = items.length > 0 ? 9.9 : 0
  const total = subtotal + shipping

  if (checkedOut) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/15">
          <ShoppingBag className="size-7 text-primary" />
        </div>
        <h1 className="mt-6 font-display text-2xl">¡Pedido confirmado!</h1>
        <p className="mt-2 text-muted-foreground">Tu modo cueva está en camino. Te avisaremos cuando salga de despacho.</p>
        <Button asChild className="mt-8"><Link to="/products">Seguir explorando</Link></Button>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 font-display text-2xl">Tu carrito está vacío</h1>
        <p className="mt-2 text-muted-foreground">Aún no agregaste nada. El modo cueva no se arma solo.</p>
        <Button asChild className="mt-8"><Link to="/products">Ir al catálogo</Link></Button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-3xl">Tu carrito</h1>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={`${item.product.id}-${item.size}`} className="flex gap-4 rounded-xl border border-border bg-card p-4">
              <img src={item.product.image} alt={item.product.name} className="size-20 rounded-md object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Talla: {item.size}</p>
                  </div>
                  <button type="button" onClick={() => removeItem(item.product.id, item.size)} aria-label="Eliminar producto" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-3 rounded-md border border-border px-2 py-1">
                    <Button type="button" variant="ghost" size="icon" className="size-6" onClick={() => decreaseQty(item.product.id, item.size)} aria-label="Disminuir cantidad"><Minus className="size-3.5" /></Button>
                    <span className="w-5 text-center text-sm">{item.quantity}</span>
                    <Button type="button" variant="ghost" size="icon" className="size-6" onClick={() => increaseQty(item.product.id, item.size)} aria-label="Aumentar cantidad"><Plus className="size-3.5" /></Button>
                  </div>
                  <span className="font-display text-primary">S/ {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit space-y-4 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-lg">Resumen</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>S/ {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Envío</span><span>S/ {shipping.toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 font-display text-base text-foreground"><span>Total</span><span>S/ {total.toFixed(2)}</span></div>
          </div>
          <Button className="w-full" size="lg" onClick={() => setCheckedOut(true)}>Confirmar pedido</Button>
          <button type="button" onClick={clearCart} className="w-full text-center text-xs text-muted-foreground hover:text-destructive">Vaciar carrito</button>
        </aside>
      </div>
    </main>
  )
}