import { Minus, Plus, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ProductCard } from "@/components/ProductCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { useProduct, useRelatedProducts } from "@/hooks/useProducts"
import { cn } from "@/lib/utils"

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading } = useProduct(id)
  const { data: related } = useRelatedProducts(product?.category, product?.id)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-xl bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-24 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl">Producto no encontrado</h1>
        <p className="mt-2 text-muted-foreground">Puede que el enlace esté roto o el producto ya no exista.</p>
        <Button asChild className="mt-6"><Link to="/products">Volver al catálogo</Link></Button>
      </main>
    )
  }

  const handleAddToCart = () => {
    if (!size) return
    addItem(product, quantity, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <img src={product.image} alt={product.name} className="size-full object-cover" />
          {!product.inStock && <Badge variant="secondary" className="absolute left-4 top-4">Agotado</Badge>}
        </div>
        <div>
          <h1 className="font-display text-3xl">{product.name}</h1>
          <p className="mt-2 font-display text-2xl text-primary">S/ {product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6">
            <span className="text-sm font-medium">Talla</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm transition-colors",
                    size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/60"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <span className="text-sm font-medium">Cantidad</span>
            <div className="mt-2 inline-flex items-center gap-3 rounded-md border border-border px-2 py-1.5">
              <Button type="button" variant="ghost" size="icon" className="size-7" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Disminuir cantidad"><Minus className="size-4" /></Button>
              <span className="w-6 text-center text-sm">{quantity}</span>
              <Button type="button" variant="ghost" size="icon" className="size-7" onClick={() => setQuantity((q) => q + 1)} aria-label="Aumentar cantidad"><Plus className="size-4" /></Button>
            </div>
          </div>

          <Button className="mt-8 w-full sm:w-auto" size="lg" disabled={!product.inStock || !size} onClick={handleAddToCart}>
            <ShoppingBag className="size-4" />
            {added ? "¡Agregado!" : product.inStock ? "Agregar al carrito" : "Agotado"}
          </Button>
          {!size && product.inStock && <p className="mt-2 text-xs text-muted-foreground">Elige una talla para continuar.</p>}
        </div>
      </div>

      {related && related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl">También te puede interesar</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  )
}