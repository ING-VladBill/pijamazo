import { useQuery } from "@tanstack/react-query"
import { fetchProducts, fetchProductBySlug } from "@/services/productService"
import type { Category } from "@/types/product"

export function useProducts(category?: Category) {
  return useQuery({
    queryKey: ["products", category ?? "all"],
    queryFn: () => fetchProducts(category),
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
  })
}
