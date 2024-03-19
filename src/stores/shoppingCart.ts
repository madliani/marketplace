import type { Product } from '@/types/products'
import type { Item, ShoppingCart } from '@/types/shoppingCart'
import { defineStore } from 'pinia'

type Id = 'shoppingCart'

type State = {
  shoppingCart: ShoppingCart
}

type Getters = {}

type Actions = {
  addItem: (product: Readonly<Item['product']>) => void
  clear: () => void
  deleteItem: (id: Readonly<Product['id']>) => void
}

/** Shopping cart default value. */
const shoppingCart: ShoppingCart = []

export const useShoppingCartStore = defineStore<Id, State, Getters, Actions>('shoppingCart', {
  state: () => ({
    shoppingCart
  }),
  actions: {
    addItem(product) {
      const item: Readonly<Item> = {
        id: product.id,
        product
      }

      this.shoppingCart = [...this.shoppingCart, item]
    },
    clear() {
      this.shoppingCart = shoppingCart
    },
    deleteItem(id) {
      this.shoppingCart = this.shoppingCart.filter((item) => item.id !== id)
    }
  },
  persist: true
})
