export type ProductCategory = "pijamas" | "batas" | "pantuflas"

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  description: string
  image: string
  sizes: string[]
  inStock: boolean
}