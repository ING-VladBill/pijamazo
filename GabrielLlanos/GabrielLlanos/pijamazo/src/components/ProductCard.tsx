import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/types/product"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} className="group block">
      <Card className="h-full overflow-hidden py-0 transition-colors group-hover:border-primary/60">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="size-full object-cover transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:scale-105" loading="lazy" />
          {!product.inStock && <Badge variant="secondary" className="absolute left-3 top-3">Agotado</Badge>}
        </div>
        <CardHeader className="px-4 pt-4"><CardTitle className="text-base">{product.name}</CardTitle></CardHeader>
        <CardContent className="px-4"><p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p></CardContent>
        <CardFooter className="px-4 pb-4"><span className="font-display text-lg text-primary">S/ {product.price.toFixed(2)}</span></CardFooter>
      </Card>
    </Link>
  )
}