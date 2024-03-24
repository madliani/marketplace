import type { Product } from '@/types/products'

/**
 * Purchase order item.
 */
export type Item = {
  count: number
  id: string
  price: Product['price']
  product: Omit<Omit<Product, 'status'>, 'images'>
}

export type PurchaseOrder = {
  items: Item[]
  totalPrice: Item['price']
}
