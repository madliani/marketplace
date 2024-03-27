import type { Product } from '@/types/products'

/**
 * Shopping cart product.
 */
export type CartProduct = Omit<Omit<Product, 'status'>, 'images'>

/**
 * Shopping cart item.
 */
export type CartItem = {
  cost: CartProduct['price']
  id: string
  product: CartProduct
  quantity: number
}

export type ShoppingCart = CartItem[]
