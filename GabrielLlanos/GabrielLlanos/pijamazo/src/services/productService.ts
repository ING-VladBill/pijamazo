import axios from "axios"
import { products } from "@/data/products"
import type { Product } from "@/types/product"

export const api = axios.create({ baseURL: "https://api.pijamazo.dev" })

function delay<T>(data: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function getProducts(): Promise<Product[]> {
  return delay(products)
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return delay(products.find((p) => p.id === id))
}

export async function getRelatedProducts(category: string, excludeId: string): Promise<Product[]> {
  return delay(products.filter((p) => p.category === category && p.id !== excludeId))
}