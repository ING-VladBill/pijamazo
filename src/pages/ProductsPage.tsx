import { useSearchParams } from "react-router-dom"
import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useProducts } from "@/hooks/useProducts"
import ProductCard from "@/components/ProductCard"
import type { Category } from "@/types/product"

const CATEGORIES: { value: Category | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "Todo", emoji: "✨" },
  { value: "pijamas", label: "Pijamas", emoji: "🌙" },
  { value: "batas", label: "Batas", emoji: "🧸" },
  { value: "medias", label: "Medias", emoji: "🧦" },
  { value: "accesorios", label: "Accesorios", emoji: "💫" },
]

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A2E]">
      <div className="h-56 bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-2/3 rounded bg-white/5" />
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-4/5 rounded bg-white/5" />
        <div className="flex justify-between pt-2">
          <div className="h-4 w-16 rounded bg-white/5" />
          <div className="h-4 w-12 rounded bg-white/5" />
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get("category") as Category | null

  const { data: productos, isLoading, isError } = useProducts(categoryParam ?? undefined)

  const activeCategory = categoryParam ?? "all"
  const activeName = CATEGORIES.find((c) => c.value === activeCategory)?.label ?? "Todo"

  return (
    <div className="min-h-screen" style={{ background: "#0D0D0F" }}>

      {/* Header con aurora */}
      <div className="relative overflow-hidden border-b border-white/5 px-6 py-16">
        {/* Aurora blobs de fondo */}
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full blur-[120px] opacity-70"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full blur-[100px] opacity-60"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full blur-[80px] opacity-30"
          style={{ background: "radial-gradient(circle, rgba(192,132,252,0.15), transparent 70%)" }} />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-600">
            <SlidersHorizontal size={12} />
            <span className="uppercase tracking-widest">Catálogo · {new Date().getFullYear()}</span>
          </div>
          <h1 className="mt-3 font-mono text-4xl font-bold text-slate-100 md:text-5xl">
            {activeCategory === "all" ? (
              <>
                Toda la{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  colección
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {activeName}
              </span>
            )}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Pijamas, batas y accesorios para la pijamada perfecta.
          </p>
        </div>
      </div>

      {/* Filtros sticky */}
      <div className="sticky top-[73px] z-30 border-b border-white/5 bg-[#0D0D0F]/90 px-6 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(({ value, label, emoji }) => {
            const isActive = value === activeCategory
            return (
              <button
                key={value}
                onClick={() => {
                  if (value === "all") setSearchParams({})
                  else setSearchParams({ category: value })
                }}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "border border-white/10 text-slate-400 hover:border-purple-500/30 hover:text-slate-200"
                )}
              >
                <span>{emoji}</span>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-6 py-10">

        {isError && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <span className="text-4xl">😔</span>
            <p className="font-mono text-sm text-slate-400">Error al cargar productos. Intenta de nuevo.</p>
          </div>
        )}

        {isLoading && (
          <>
            <div className="mb-6 h-3 w-20 animate-pulse rounded bg-white/5" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </>
        )}

        {!isLoading && !isError && productos && productos.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="text-5xl">🌙</span>
            <p className="font-mono text-sm font-semibold text-slate-300">
              No hay productos en esta categoría todavía.
            </p>
            <p className="text-xs text-slate-600">Vuelve pronto, estamos preparando algo especial.</p>
            <button
              onClick={() => setSearchParams({})}
              className="mt-2 rounded-full border border-purple-500/30 px-4 py-1.5 font-mono text-xs text-purple-300 transition-colors hover:bg-purple-500/10"
            >
              Ver todo el catálogo
            </button>
          </div>
        )}

        {!isLoading && !isError && productos && productos.length > 0 && (
          <>
            <p className="mb-6 font-mono text-xs text-slate-600">
              {productos.length} producto{productos.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productos.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
