import { useQuery } from "@tanstack/react-query"
import { getProductById, getProducts, getRelatedProducts } from "@/services/productService"

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts })
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id as string),
    enabled: Boolean(id),
  })
}

export function useRelatedProducts(category: string | undefined, excludeId: string | undefined) {
  return useQuery({
    queryKey: ["products", "related", category, excludeId],
    queryFn: () => getRelatedProducts(category as string, excludeId as string),
    enabled: Boolean(category) && Boolean(excludeId),
  })
}