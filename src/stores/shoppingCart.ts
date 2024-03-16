import type { Product } from '@/types/products'
import type { Item, ShoppingCart } from '@/types/shoppingCart'
import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

type Id = 'shoppingCart'

type State = {
  shoppingCart: ShoppingCart
}

type Getters = {}

type Actions = Readonly<{
  addItem: (product: Item['product']) => void
  clear: () => void
  deleteItem: (id: Product['id']) => void
}>

export const useProductsStore = defineStore<Id, State, Getters, Actions>('shoppingCart', {
  state: () => ({
    shoppingCart: []
  }),
  actions: {
    addItem(product) {
      const item: Item = {
        id: uuid(),
        product
      }

      this.shoppingCart = [...this.shoppingCart, item]
    },
    clear() {
      this.shoppingCart = []
    },
    deleteItem(id) {
      this.shoppingCart = this.shoppingCart.filter((item) => item.id !== id)
    }
  },
  persist: true
})
