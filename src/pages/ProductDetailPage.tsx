import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ShoppingBag, Check, Minus, Plus, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProduct, useProducts } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"
import ProductCard from "@/components/ProductCard"

function formatPrice(n: number) {
  return `S/ ${n.toFixed(2)}`
}

function SkeletonDetail() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-white/5" />
        <div className="flex flex-col gap-4 pt-2">
          <div className="h-3 w-24 rounded bg-white/5" />
          <div className="h-8 w-3/4 rounded bg-white/5" />
          <div className="h-6 w-20 rounded bg-white/5" />
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full rounded bg-white/5" />
            <div className="h-3 w-5/6 rounded bg-white/5" />
          </div>
          <div className="flex gap-2 pt-4">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-10 w-14 rounded-xl bg-white/5" />)}
          </div>
          <div className="mt-4 h-12 rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, isError } = useProduct(slug ?? "")
  const { data: allProducts } = useProducts()
  const { addItem } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  function handleAddToCart() {
    if (!product) return
    if (!selectedSize) { setSizeError(true); return }
    for (let i = 0; i < quantity; i++) addItem(product, selectedSize)
    setAdded(true)
    setSizeError(false)
    setTimeout(() => setAdded(false), 2500)
  }

  const suggestions = allProducts
    ?.filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4) ?? []

  return (
    <div className="min-h-screen" style={{ background: "#0D0D0F" }}>
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Volver */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 font-mono text-xs text-slate-500 transition-colors hover:text-slate-300"
        >
          <ArrowLeft size={14} /> Volver
        </button>

        {isError && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="text-5xl">😔</span>
            <p className="font-mono text-sm font-semibold text-slate-300">Producto no encontrado.</p>
            <Link to="/products" className="mt-2 rounded-full border border-purple-500/30 px-4 py-1.5 font-mono text-xs text-purple-300 hover:bg-purple-500/10">
              Ver catálogo
            </Link>
          </div>
        )}

        {isLoading && <SkeletonDetail />}

        {product && (
          <>
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">

              {/* ── Imagen con glow degradado ── */}
              <div className="relative">
                {/* Glow aurora detrás de la imagen */}
                <div
                  className="absolute -inset-6 rounded-[2.5rem] opacity-50 blur-[60px]"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(139,92,246,0.35) 0%, rgba(236,72,153,0.20) 50%, transparent 75%)",
                  }}
                />
                {/* Reflejo inferior desvanecido */}
                <div
                  className="absolute -bottom-4 left-8 right-8 h-16 blur-2xl opacity-30"
                  style={{
                    background: "linear-gradient(to bottom, rgba(139,92,246,0.4), transparent)",
                  }}
                />

                <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#1A1A2E]">
                  {/* Degradado en esquinas dentro de la imagen */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-900/15 via-transparent to-pink-900/10 pointer-events-none" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                  {/* Gradiente inferior de mezcla */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1A1A2E]/60 to-transparent z-10" />
                </div>

                {/* Badges encima */}
                <span className="absolute left-4 top-4 z-20 rounded-full border border-purple-500/30 bg-purple-500/15 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-purple-300 backdrop-blur-sm">
                  {product.category}
                </span>
                {product.stock > 0 && product.stock <= 8 && (
                  <span className="absolute right-4 top-4 z-20 rounded-full border border-pink-500/40 bg-pink-500/15 px-3 py-1 font-mono text-xs font-medium text-pink-300 backdrop-blur-sm">
                    ¡Últimas {product.stock}!
                  </span>
                )}
              </div>

              {/* ── Info ── */}
              <div className="flex flex-col gap-5">
                <div>
                  <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-purple-400">
                    PIJAmazo · Colección Invierno 2026
                  </p>
                  <h1 className="font-mono text-3xl font-bold leading-tight text-slate-100 md:text-4xl">
                    {product.name}
                  </h1>
                  <p className="mt-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-mono text-3xl font-bold text-transparent">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-slate-400">{product.description}</p>

                {/* Tallas */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">Talla</p>
                    {selectedSize && (
                      <span className="font-mono text-xs text-purple-300">{selectedSize} seleccionada</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => { setSelectedSize(size); setSizeError(false) }}
                        className={cn(
                          "min-w-[52px] rounded-xl border px-4 py-2.5 font-mono text-xs font-semibold transition-all duration-200",
                          selectedSize === size
                            ? "border-purple-500 bg-purple-500/20 text-purple-300 shadow-[0_0_14px_rgba(139,92,246,0.35)]"
                            : "border-white/10 text-slate-400 hover:border-purple-500/40 hover:text-slate-200"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-pink-400">
                      <AlertCircle size={12} /> Selecciona una talla para continuar
                    </p>
                  )}
                </div>

                {/* Cantidad */}
                <div>
                  <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">Cantidad</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:border-purple-500/40 hover:text-slate-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-mono text-sm font-semibold text-slate-100">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:border-purple-500/40 hover:text-slate-200"
                    >
                      <Plus size={14} />
                    </button>
                    <span className="ml-2 font-mono text-xs text-slate-600">{product.stock} disponibles</span>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 font-mono text-sm font-semibold transition-all duration-300",
                      added
                        ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/45 hover:brightness-110"
                    )}
                  >
                    {added ? <><Check size={16} /> ¡Agregado al carrito!</> : <><ShoppingBag size={16} /> Agregar al carrito</>}
                  </button>

                  {added && (
                    <Link
                      to="/cart"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-500/30 py-3 font-mono text-sm font-medium text-purple-300 transition-all hover:bg-purple-500/10"
                    >
                      Ver carrito <ArrowLeft size={14} className="rotate-180" />
                    </Link>
                  )}
                </div>

                {/* Info extra */}
                <div className="mt-2 grid grid-cols-3 gap-3 rounded-2xl border border-white/5 bg-[#1A1A2E] p-4">
                  {[
                    { icon: "🚚", title: "Envío express", desc: "24–48h" },
                    { icon: "🎁", title: "Empaque regalo", desc: "Sin costo" },
                    { icon: "🔄", title: "Cambio fácil", desc: "7 días" },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="flex flex-col items-center gap-1 text-center">
                      <span className="text-xl">{icon}</span>
                      <p className="font-mono text-[10px] font-semibold text-slate-300">{title}</p>
                      <p className="font-mono text-[10px] text-slate-600">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Sugerencias ── */}
            {suggestions.length > 0 && (
              <div className="mt-20">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-mono text-lg font-bold text-slate-100">También te puede gustar</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {suggestions.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
