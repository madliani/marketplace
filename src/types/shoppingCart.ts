import type { Product } from '@/types/products'

/**
 * Shopping cart product.
 */
export type CartProduct = Omit<Omit<Product, 'status'>, 'images'>

/**
 * Shopping cart item.
 */
export type CartItem = {
  quantity: number
  id: string
  cost: Product['price']
  product: CartProduct
}

export type ShoppingCart = CartItem[]
