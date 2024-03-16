import type { Product } from '@/types/products'

/**
 * Shopping cart item.
 */
export type Item = {
  id: string
  product: Product
}

export type ShoppingCart = Item[]
