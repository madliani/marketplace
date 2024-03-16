import type { Product } from './products'

export type Item = {
  count: number
  id: string
  product: Product
}

export type ShoppingCart = Item[]
