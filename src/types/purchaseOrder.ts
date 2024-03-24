import type { Product } from '@/types/products'

/**
 * Purchase order product.
 */
export type OrderProduct = Omit<Omit<Product, 'status'>, 'images'>

/**
 * Purchase order item.
 */
export type OrderItem = {
  count: number
  id: string
  price: Product['price']
  product: OrderProduct
}

export type PurchaseOrder = {
  items: OrderItem[]
  totalPrice: OrderItem['price']
}
