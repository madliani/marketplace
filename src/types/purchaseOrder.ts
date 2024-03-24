import type { User } from '@/types/user'
import type { CartItem, ShoppingCart } from './shoppingCart'

/**
 * Purchase order user.
 */
export type OrderUser = Omit<Omit<User, 'avatar'>, 'balance'>

export type PurchaseOrder = {
  departureDate: Date | null
  shoppingCart: ShoppingCart
  totalCost: CartItem['cost']
  user: OrderUser | null
}
