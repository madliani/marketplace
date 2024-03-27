import type { CartItem, CartProduct } from '@/types/shoppingCart'
import type { User } from '@/types/user'

/**
 * Purchase order product.
 */
export type OrderProduct = Omit<Omit<CartProduct, 'description'>, 'thumbnail'>

/**
 * Purchase order item.
 */
export type OrderItem = Omit<CartItem, 'product'> & { product: OrderProduct }

/**
 * Purchase order user.
 */
export type OrderUser = Omit<Omit<User, 'avatar'>, 'balance'>

export type PurchaseOrder = {
  departureDate: string | null
  items: OrderItem[]
  totalCost: OrderItem['cost']
  buyer: OrderUser | null
}
