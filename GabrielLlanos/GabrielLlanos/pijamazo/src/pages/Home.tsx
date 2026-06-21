import { ArrowRight, Heart, Moon, ShieldCheck, Truck } from "lucide-react"
import { Link } from "react-router-dom"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/useProducts"

const categories = [
  { slug: "pijamas", label: "Pijamas", emoji: "🌙" },
  { slug: "batas", label: "Batas", emoji: "🧥" },
  { slug: "pantuflas", label: "Pantuflas", emoji: "🐾" },
] as const

const benefits = [
  { icon: Truck, title: "Envío a todo Lima", description: "Recíbelo en 24-48h y entra en modo cueva sin demoras." },
  { icon: ShieldCheck, title: "Calidad garantizada", description: "Telas suaves y duraderas, probadas para el descanso real." },
  { icon: Heart, title: "Hecho para quedarte", description: "Diseñado para maratones de series, no para salir de casa." },
]

export default function Home() {
  const { data: products, isLoading } = useProducts()
  const featured = products?.slice(0, 3) ?? []

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <Moon className="size-4 text-primary" />
          Nueva colección modo cueva
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-6xl">
          Pijamazo — Todo para el <span className="text-primary">modo cueva</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground sm:text-lg">
          Pijamas, batas y pantuflas pensadas para que no tengas ninguna razón para salir de la cama.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/products">Explorar catálogo<ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-2xl">Categorías</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.slug} to={`/products?category=${c.slug}`} className="flex items-center justify-between rounded-xl border border-border bg-card px-6 py-8 transition-colors hover:border-primary/60">
              <span className="font-display text-xl">{c.label}</span>
              <span className="text-3xl">{c.emoji}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Destacados</h2>
          <Link to="/products" className="text-sm text-primary hover:underline">Ver todo</Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-muted" />)
            : featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <b.icon className="mx-auto size-7 text-primary" />
              <h3 className="mt-3 font-display text-lg">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}