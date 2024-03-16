import type { Product } from './products'

export type Item = {
  id: string
  product: Product
}

export type ShoppingCart = Item[]
