import { defineStore } from 'pinia'

import type { Product } from '@/types/products'
import type { Item, ShoppingCart } from '@/types/shoppingCart'

import { Status } from '@/types/products'
import { useProductStore } from './product'

type Id = 'shoppingCart'

type State = {
  shoppingCart: ShoppingCart
}

type Getters = {}

type Actions = {
  addItem: (id: Readonly<Item['id']>) => void
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
    addItem(id) {
      const { updateStatus } = useProductStore()

      const item: Readonly<Item> = {
        id
      }

      this.shoppingCart = [...this.shoppingCart, item]

      updateStatus(id, Status.IN_CART)
    },
    clear() {
      this.shoppingCart = shoppingCart
    },
    deleteItem(id) {
      const { updateStatus } = useProductStore()

      this.shoppingCart = this.shoppingCart.filter((item) => item.id !== id)

      updateStatus(id, Status.FREE)
    }
  },
  persist: true
})
