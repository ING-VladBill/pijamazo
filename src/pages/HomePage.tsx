import { Link } from "react-router-dom"
import { ArrowRight, Star, Package, Truck, ShieldCheck } from "lucide-react"
import StarField from "@/components/StarField"
import PillowField from "@/components/PillowField"
import ProductCard from "@/components/ProductCard"
import AuroraBg from "@/components/AuroraBg"
import { useProducts } from "@/hooks/useProducts"
import { useEffect, useRef, useState } from "react"

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A2E]">
      <div className="h-56 bg-white/5" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-2/3 rounded bg-white/5" />
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="flex justify-between pt-2">
          <div className="h-4 w-16 rounded bg-white/5" />
          <div className="h-4 w-10 rounded bg-white/5" />
        </div>
      </div>
    </div>
  )
}

function CategoryPill({ emoji, label, to, delay = 0 }: {
  emoji: string; label: string; to: string; delay?: number
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Link
      ref={ref}
      to={to}
      className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A2E] p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_0_28px_rgba(139,92,246,0.2)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, box-shadow 0.3s, border-color 0.3s`,
      }}
    >
      {/* Fondo degradado animado en hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 opacity-0 transition-all duration-500 group-hover:from-purple-500/8 group-hover:via-pink-500/4 group-hover:to-purple-500/8 group-hover:opacity-100" />
      <span
        className="relative text-4xl transition-transform duration-300 group-hover:scale-125"
        style={{ filter: "drop-shadow(0 0 8px rgba(192,132,252,0.5))" }}
      >
        {emoji}
      </span>
      <span className="relative font-mono text-sm font-semibold capitalize text-slate-200 transition-colors group-hover:text-white">
        {label}
      </span>
    </Link>
  )
}

function Benefit({
  icon: Icon, title, desc,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string; desc: string
}) {
  return (
    <div className="group flex flex-col items-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-purple-500/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
        <Icon size={20} className="text-purple-400" />
      </div>
      <div>
        <p className="font-mono text-sm font-semibold text-slate-100">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

function StatBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-mono text-2xl font-bold text-transparent md:text-3xl">
        {value}
      </span>
      <span className="font-mono text-xs text-slate-500">{label}</span>
    </div>
  )
}

const REVIEWS = [
  { name: "Camila V.", text: "Llegó en 24h y el empaque era hermoso. La tela es tan suave que no quiero dormir con otra cosa.", stars: 5 },
  { name: "Sofía R.", text: "Compré el set de estrellas para mi pijamada y todas querían saber dónde lo había conseguido. Diez de diez.", stars: 5 },
  { name: "Valentina M.", text: "La bata nube es exactamente como la describen. Esponjosa, larga, perfecta para los domingos de no hacer nada.", stars: 5 },
]

export default function HomePage() {
  const { data: allProducts, isLoading } = useProducts()
  const featured = allProducts?.filter((p) => p.featured).slice(0, 4) ?? []

  return (
    <div className="flex flex-col" style={{ background: "#0D0D0F" }}>

      {/* ── HERO: cielo estrellado + aurora ── */}
      <section className="relative overflow-hidden px-6 pb-12 pt-16 md:pb-16 md:pt-20">
        <StarField />
        <AuroraBg />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-1.5 font-mono text-xs font-medium text-purple-300 backdrop-blur-sm">
            <Star size={11} fill="currentColor" />
            Nueva colección · Invierno 2026
          </span>

          <h1 className="font-mono text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
            <span className="text-slate-100">IRL?</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent [background-size:200%] animate-[gradient-x_4s_linear_infinite]">
              no lo recomiendo
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
            Pijamas, batas y accesorios para quedarte en casa con estilo.
            Porque la pijamada perfecta empieza con la ropa perfecta.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/products"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-mono text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50 hover:brightness-110">
              <span className="relative z-10 flex items-center gap-2">
                Explorar catálogo
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link to="/products?category=pijamas"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-mono text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10">
              Ver pijamas
            </Link>
          </div>

          <p className="mt-8 font-mono text-xs text-slate-600">
            🌙 +2,400 chicas ya están en modo pijama
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="animate-bounce text-slate-600">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: "linear-gradient(to bottom, #0D0D0F 0%, #1A1A2E 100%)" }} className="px-6 pb-0 pt-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-10 rounded-3xl border border-white/5 bg-white/[0.02] py-8 backdrop-blur md:gap-16">
            <StatBadge value="2,400+" label="clientas felices" />
            <div className="hidden h-8 w-px bg-white/5 md:block" />
            <StatBadge value="4.9 ★" label="calificación promedio" />
            <div className="hidden h-8 w-px bg-white/5 md:block" />
            <StatBadge value="24h" label="envío express Lima" />
            <div className="hidden h-8 w-px bg-white/5 md:block" />
            <StatBadge value="100%" label="empaque regalo" />
          </div>
        </div>
      </div>

      {/* ── CATEGORÍAS ── */}
      <section style={{ background: "#1A1A2E" }} className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-purple-400">
            Explorar por categoría
          </p>
          <h2 className="mb-8 font-mono text-xl font-bold text-slate-100">¿Qué buscas hoy?</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <CategoryPill emoji="🌙" label="Pijamas" to="/products?category=pijamas" delay={0} />
            <CategoryPill emoji="🧸" label="Batas" to="/products?category=batas" delay={100} />
            <CategoryPill emoji="🧦" label="Medias" to="/products?category=medias" delay={200} />
            <CategoryPill emoji="✨" label="Accesorios" to="/products?category=accesorios" delay={300} />
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section style={{ background: "#1A1A2E" }} className="px-6 pb-24">
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
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : featured.map((product) => <ProductCard key={product.id} product={product} />)
            }
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 font-mono text-sm font-medium text-slate-400 hover:text-slate-200">
              Ver todo el catálogo <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRANSICIÓN 2 ── */}
      <div aria-hidden className="pointer-events-none h-32 w-full" style={{
        background: "linear-gradient(to bottom, #1A1A2E 0%, #130f28 50%, #0D0D0F 100%)",
      }} />

      {/* ── BANNER ── */}
      <section className="px-6" style={{ background: "#0D0D0F" }}>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16"
          style={{ background: "linear-gradient(135deg, #3b0764 0%, #581c87 30%, #6b21a8 60%, #86198f 100%)" }}>
          <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-violet-400/25 blur-[80px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-pink-400/30 blur-[70px]" />
          <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/4 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-[60px]" />
          {/* Ruido/textura sutil encima */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.5 }} />
          <p className="relative font-mono text-xs font-medium uppercase tracking-widest text-purple-200">
            Para tu próxima pijamada
          </p>
          <h2 className="relative mt-3 font-mono text-3xl font-bold text-white md:text-4xl">
            Invita a tus amigas.
            <br />
            <span className="text-pink-300">Nosotras ponemos la ropa.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm text-purple-200">
            Sets coordinados, descuentos por cantidad y envío express a Lima.
            Porque cada pijamada merece el outfit correcto.
          </p>
          <Link to="/products"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-mono text-sm font-bold text-[#0D0D0F] shadow-xl shadow-black/30 transition-all hover:scale-[1.02] hover:brightness-95">
            Armar mi kit <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── TRANSICIÓN 3 ── */}
      <div aria-hidden className="pointer-events-none h-24 w-full" style={{
        background: "linear-gradient(to bottom, #0D0D0F 0%, #0f0d1e 100%)",
      }} />

      {/* ── BENEFICIOS ── */}
      <section className="px-6 py-16" style={{ background: "#0f0d1e" }}>
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-center font-mono text-xs font-medium uppercase tracking-widest text-purple-400">
            Por qué elegirnos
          </p>
          <h2 className="mb-10 text-center font-mono text-xl font-bold text-slate-100">
            Sin complicaciones, solo comodidad
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Benefit icon={Truck} title="Envío a todo Lima" desc="Express en 24–48h a tu puerta. Sin excusas para no estrenar." />
            <Benefit icon={Package} title="Empaque regalo" desc="Cada pedido llega listo para sorprender. Sin costo extra." />
            <Benefit icon={ShieldCheck} title="Cambios fáciles" desc="¿No es tu talla? Lo cambiamos sin preguntas en 7 días." />
          </div>
        </div>
      </section>

      {/* ── RESEÑAS ── */}
      <div aria-hidden className="pointer-events-none h-16 w-full" style={{
        background: "linear-gradient(to bottom, #0f0d1e 0%, #12102a 100%)",
      }} />

      <section className="px-6 py-16" style={{ background: "#12102a" }}>
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-center font-mono text-xs font-medium uppercase tracking-widest text-purple-400">
            Reseñas
          </p>
          <h2 className="mb-10 text-center font-mono text-xl font-bold text-slate-100">
            Lo que dicen nuestras clientas
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {REVIEWS.map(({ name, text, stars }) => (
              <div key={name} className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-[#1A1A2E] p-5 transition-all duration-300 hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                <div className="flex gap-0.5">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-slate-400 group-hover:text-slate-300">"{text}"</p>
                <p className="mt-auto font-mono text-xs font-semibold text-slate-300">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSICIÓN 4 ── */}
      <div aria-hidden className="pointer-events-none h-20 w-full" style={{
        background: "linear-gradient(to bottom, #12102a 0%, #141230 100%)",
      }} />

      {/* ── ALMOHADAS ── */}
      <div style={{ background: "#141230" }} className="pb-0">
        <p className="pt-6 text-center font-mono text-xs text-slate-700">buenas noches 🌙</p>
        <PillowField />
      </div>

    </div>
  )
}
