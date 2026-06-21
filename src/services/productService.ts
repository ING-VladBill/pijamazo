import type { Product, Category } from "@/types/product"
import { products } from "@/data/products"

export async function fetchProducts(category?: Category): Promise<Product[]> {
  return category ? products.filter((p) => p.category === category) : [...products]
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const product = products.find((p) => p.slug === slug)
  if (!product) throw new Error("Producto no encontrado")
  return product
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured)
}
