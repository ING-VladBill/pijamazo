import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/types/product"

function formatPrice(n: number) {
  return `S/ ${n.toFixed(2)}`
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A2E] transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/20 hover:shadow-[0_8px_40px_rgba(139,92,246,0.18)]"
    >
      {/* Glow difuminado detrás del borde al hacer hover */}
      <div className="glow-border-hover" />

      {/* Imagen */}
      <div className="relative h-56 overflow-hidden bg-[#13132a]">
        {/* Shimmer sweep */}
        <div className="card-shimmer" />

        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
          loading="lazy"
        />

        {/* Degradado inferior que mezcla la imagen con el fondo de la card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/20 to-transparent" />

        {/* Degradado lateral sutil para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute left-3 top-3 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-purple-300 backdrop-blur-sm">
          {product.category}
        </span>

        {product.stock > 0 && product.stock <= 8 && (
          <span className="absolute right-3 top-3 rounded-full border border-pink-500/40 bg-pink-500/15 px-2.5 py-0.5 font-mono text-[10px] font-medium text-pink-300 backdrop-blur-sm">
            últimas {product.stock}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-mono text-sm font-semibold leading-snug text-slate-100 transition-colors group-hover:text-white">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 transition-colors group-hover:text-slate-400">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-mono text-base font-bold text-transparent">
            {formatPrice(product.price)}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-transparent px-2 py-1 font-mono text-xs text-pink-400 transition-all duration-200 group-hover:border-pink-500/30 group-hover:bg-pink-500/10 group-hover:text-pink-300">
            <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            Ver más
          </span>
        </div>
      </div>
    </Link>
  )
}
