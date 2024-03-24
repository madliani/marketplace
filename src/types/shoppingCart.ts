import type { Product } from '@/types/products'

/**
 * Shopping cart item.
 */
export type Item = {
  count: number
  id: string
  price: Product['price']
  product: Omit<Omit<Product, 'status'>, 'images'>
}

export type ShoppingCart = Item[]
