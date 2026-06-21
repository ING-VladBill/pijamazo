export type Category = "pijamas" | "batas" | "medias" | "accesorios"

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number // en soles (PEN)
  category: Category
  image: string
  sizes: string[]
  stock: number
  featured: boolean
}