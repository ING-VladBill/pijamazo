import { Search } from "lucide-react"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ProductCard } from "@/components/ProductCard"
import { useProducts } from "@/hooks/useProducts"
import { cn } from "@/lib/utils"

const categories = [
  { value: "all", label: "Todas" },
  { value: "pijamas", label: "Pijamas" },
  { value: "batas", label: "Batas" },
  { value: "pantuflas", label: "Pantuflas" },
] as const

type SortKey = "relevance" | "price-asc" | "price-desc"

export default function Products() {
  const { data: products, isLoading, isError } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("relevance")
  const category = searchParams.get("category") ?? "all"

  const filtered = useMemo(() => {
    if (!products) return []
    let result = products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    if (category !== "all") result = result.filter((p) => p.category === category)
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [products, query, category, sort])

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl">Catálogo</h1>
      <p className="mt-1 text-muted-foreground">Todo lo que necesitas para quedarte en casa, con estilo.</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="relevance">Relevancia</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setSearchParams(c.value === "all" ? {} : { category: c.value })}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              category === c.value ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-muted" />)}
          </div>
        )}
        {isError && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Ocurrió un error al cargar el catálogo. Intenta de nuevo más tarde.
          </p>
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No encontramos productos con esos filtros.
          </div>
        )}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  )
}