import type { CartItem } from '@/types/shoppingCart'
import type { User } from '@/types/user'

/**
 * Purchase order user.
 */
export type OrderUser = Omit<Omit<User, 'avatar'>, 'balance'>

export type PurchaseOrder = {
  departureDate: Date | null
  items: CartItem[]
  totalCost: CartItem['cost']
  buyer: OrderUser | null
}
