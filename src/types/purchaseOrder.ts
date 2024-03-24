import type { Product } from '@/types/products'
import type { User } from '@/types/user'

/**
 * Purchase order product.
 */
export type OrderProduct = Omit<Omit<Product, 'status'>, 'images'>

/**
 * Purchase order user.
 */
export type OrderUser = Omit<Omit<User, 'avatar'>, 'balance'>

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
  departureDate: Date | null
  items: OrderItem[]
  totalPrice: OrderItem['price']
  user: OrderUser | null
}
