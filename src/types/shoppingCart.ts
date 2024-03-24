import type { Product } from '@/types/products'

export type CartProduct = Omit<Omit<Product, 'status'>, 'images'>

/**
 * Shopping cart item.
 */
export type CartItem = {
  count: number
  id: string
  price: Product['price']
  product: CartProduct
}

export type ShoppingCart = CartItem[]
