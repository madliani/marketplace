import type { Product, Products } from '@/types/products'
import { defineStore } from 'pinia'

type Id = 'shoppingCart'

type State = {
  shoppingCart: Products
}

type Getters = {}

type Actions = Readonly<{
  addProduct: (product: Product) => void
  clear: () => void
  deleteProduct: (id: Product['id']) => void
}>

export const useProductsStore = defineStore<Id, State, Getters, Actions>('shoppingCart', {
  state: () => ({
    shoppingCart: []
  }),
  actions: {
    addProduct(product) {
      this.shoppingCart = [...this.shoppingCart, product]
    },
    clear() {
      this.shoppingCart = []
    },
    deleteProduct(id) {
      this.shoppingCart = this.shoppingCart.filter((product) => product.id !== id)
    }
  },
  persist: true
})
