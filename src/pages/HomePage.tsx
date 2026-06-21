import { Link } from "react-router-dom"
import { ArrowRight, Star, Package, Truck, ShieldCheck } from "lucide-react"
import { featuredProducts } from "@/data/products"
import type { Product } from "@/types"

function formatPrice(n: number) {
  return `S/ ${n.toFixed(2)}`
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A2E] transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(192,132,252,0.12)]"
    >
      <div className="relative h-56 overflow-hidden bg-[#13132a]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-purple-300">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-mono text-sm font-semibold leading-snug text-slate-100">{product.name}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-mono text-base font-bold text-transparent">
            {formatPrice(product.price)}
          </span>
          <span className="flex items-center gap-1 text-xs text-pink-400">
            <ArrowRight size={13} />
            Ver más
          </span>
        </div>
      </div>
    </Link>
  )
}

function CategoryPill({ emoji, label, to }: { emoji: string; label: string; to: string }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-[#1A1A2E] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(192,132,252,0.08)]"
    >
      <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{emoji}</span>
      <span className="font-mono text-sm font-medium capitalize text-slate-300">{label}</span>
    </Link>
  )
}

function Benefit({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10">
        <Icon size={20} className="text-purple-400" />
      </div>
      <div>
        <p className="font-mono text-sm font-semibold text-slate-100">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-12 pt-16 md:pb-16 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-pink-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-1.5 font-mono text-xs font-medium text-purple-300">
            <Star size={11} fill="currentColor" />
            Nueva colección · Invierno 2026
          </span>

        <h1 className="font-mono text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
        <span className="text-slate-100">IRL? </span>
        <br />
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            no lo recomiendo
        </span>
        </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Pijamas, batas y accesorios para quedarte en casa con estilo.
            Porque la pijamada perfecta empieza con la ropa perfecta.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-mono text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:brightness-110"
            >
              Explorar catálogo
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/products?category=pijamas"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-mono text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10"
            >
              Ver pijamas
            </Link>
          </div>

          <p className="mt-8 font-mono text-xs text-slate-600">
            🌙 +2,400 chicas ya están en modo pijama
          </p>
        </div>
        <div className="mt-8 flex justify-center">
        <div className="animate-bounce text-slate-600">
            <svg width="76" height="46" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
        </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 font-mono text-xl font-bold text-slate-100">Explora por categoría</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <CategoryPill emoji="🌙" label="Pijamas" to="/products?category=pijamas" />
            <CategoryPill emoji="🧸" label="Batas" to="/products?category=batas" />
            <CategoryPill emoji="🧦" label="Medias" to="/products?category=medias" />
            <CategoryPill emoji="✨" label="Accesorios" to="/products?category=accesorios" />
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-1 font-mono text-xs font-medium uppercase tracking-widest text-purple-400">
                Favoritas de la temporada
              </p>
              <h2 className="font-mono text-xl font-bold text-slate-100">Más amadas del catálogo</h2>
            </div>
            <Link to="/products" className="hidden items-center gap-1.5 font-mono text-xs font-medium text-slate-500 transition-colors hover:text-slate-300 sm:flex">
              Ver todo <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 font-mono text-sm font-medium text-slate-400 hover:text-slate-200">
              Ver todo el catálogo <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="mx-6 mb-24 overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/60 to-pink-900/40 px-8 py-14 text-center md:mx-auto md:max-w-6xl md:px-16">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-purple-300">
          Para tu próxima pijamada
        </p>
        <h2 className="mt-3 font-mono text-3xl font-bold text-slate-100 md:text-4xl">
          Invita a tus amigas.
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nosotras ponemos la ropa.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-slate-400">
          Sets coordinados, descuentos por cantidad y envío express a Lima.
          Porque cada pijamada merece el outfit correcto.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-mono text-sm font-bold text-[#0D0D0F] transition-all hover:brightness-90"
        >
          Armar mi kit <ArrowRight size={15} />
        </Link>
      </section>

      {/* BENEFICIOS */}
      <section className="border-t border-white/5 px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
          <Benefit icon={Truck} title="Envío a todo Lima" desc="Express en 24–48h a tu puerta. Sin excusas para no estrenar." />
          <Benefit icon={Package} title="Empaque regalo" desc="Cada pedido llega listo para sorprender. Sin costo extra." />
          <Benefit icon={ShieldCheck} title="Cambios fáciles" desc="¿No es tu talla? Lo cambiamos sin preguntas en 7 días." />
        </div>
      </section>
    </div>
  )
}