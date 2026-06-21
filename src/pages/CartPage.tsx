import { useState } from "react"
import { Link } from "react-router-dom"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Check, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/useCart"
import type { CartItem } from "@/context/CartContext"

function formatPrice(n: number) {
  return `S/ ${n.toFixed(2)}`
}

function CartItemRow({ item, onRemove, onUpdate }: {
  item: CartItem
  onRemove: () => void
  onUpdate: (q: number) => void
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/5 bg-[#1A1A2E] p-4 transition-all hover:border-white/10">
      <Link to={`/products/${item.product.slug}`} className="shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-24 w-24 rounded-xl object-cover transition-opacity hover:opacity-80"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/products/${item.product.slug}`}
              className="font-mono text-sm font-semibold text-slate-100 hover:text-purple-300 transition-colors line-clamp-1"
            >
              {item.product.name}
            </Link>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 font-mono text-[10px] text-purple-300">
                {item.size}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600">
                {item.product.category}
              </span>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="shrink-0 rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-red-500/10 hover:text-red-400"
            aria-label="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate(item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-purple-500/40 hover:text-slate-200"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center font-mono text-sm font-semibold text-slate-100">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdate(item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-purple-500/40 hover:text-slate-200 disabled:opacity-30"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-mono text-sm font-bold text-transparent">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart()
  const [ordered, setOrdered] = useState(false)
  const [loading, setLoading] = useState(false)

  const shipping = 0
  const subtotal = total

  function handleCheckout() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOrdered(true)
      clearCart()
    }, 1800)
  }

  if (ordered) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 py-20 text-center" style={{ background: "#0D0D0F" }}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <Check size={36} className="text-emerald-400" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-mono text-2xl font-bold text-slate-100 md:text-3xl">
            ¡Pedido confirmado! 🌙
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Tu ropa está en camino. Prepara el maratón de series.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-mono text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:brightness-110"
          >
            Seguir comprando
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-mono text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200"
          >
            <Moon size={15} />
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 py-20 text-center" style={{ background: "#0D0D0F" }}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/5 bg-[#1A1A2E]">
          <ShoppingBag size={32} className="text-slate-600" />
        </div>
        <div>
          <h1 className="font-mono text-xl font-bold text-slate-100">Tu carrito está vacío</h1>
          <p className="mt-2 text-sm text-slate-500">
            Agrega algo de la colección y ponte cómoda.
          </p>
        </div>
        <Link
          to="/products"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-mono text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:brightness-110"
        >
          Explorar catálogo
          <ArrowRight size={15} />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "#0D0D0F" }}>

      {/* Header */}
      <div className="border-b border-white/5 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-purple-400">
            Tu selección
          </p>
          <h1 className="mt-2 font-mono text-3xl font-bold text-slate-100">
            Mi carrito
            <span className="ml-3 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 font-mono text-sm font-medium text-slate-400">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </span>
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Items */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <CartItemRow
                key={`${item.product.id}-${item.size}`}
                item={item}
                onRemove={() => removeItem(item.product.id, item.size)}
                onUpdate={(q) => updateQuantity(item.product.id, item.size, q)}
              />
            ))}

            <button
              onClick={clearCart}
              className="mt-2 self-start font-mono text-xs text-slate-600 underline-offset-2 transition-colors hover:text-red-400 hover:underline"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Resumen */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-white/5 bg-[#1A1A2E] p-6">
              <h2 className="mb-5 font-mono text-sm font-bold uppercase tracking-wider text-slate-300">
                Resumen del pedido
              </h2>

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Envío</span>
                  <span className="font-mono text-emerald-400">
                    {shipping === 0 ? "Gratis 🎉" : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-white/5" />

              <div className="flex justify-between">
                <span className="font-mono text-sm font-semibold text-slate-100">Total</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-mono text-xl font-bold text-transparent">
                  {formatPrice(subtotal + shipping)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className={cn(
                  "mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-mono text-sm font-semibold transition-all duration-300",
                  loading
                    ? "cursor-not-allowed opacity-60 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:brightness-110"
                )}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Procesando...
                  </>
                ) : (
                  <>
                    Comprar ahora
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              <p className="mt-4 text-center font-mono text-[10px] text-slate-600">
                🔒 Pago seguro · Envío a Lima
              </p>
            </div>

            {/* Beneficios mini */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { icon: "🚚", label: "Envío gratis" },
                { icon: "🎁", label: "Empaque regalo" },
                { icon: "🔄", label: "Cambios 7d" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-xl border border-white/5 bg-[#1A1A2E] p-3 text-center"
                >
                  <span className="text-lg">{icon}</span>
                  <span className="font-mono text-[9px] text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
