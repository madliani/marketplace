import type { Products } from '@/types/products'
import { defineStore } from 'pinia'

type Id = 'products'

type State = {
  products: Products
}

type Getters = {}

type Actions = Readonly<{
  addProducts: (products: Products) => void
  clear: () => void
}>

/** Product store default value. */
const products: Products = []

export const useProductStore = defineStore<Id, State, Getters, Actions>('products', {
  state: () => ({
    products
  }),
  actions: {
    addProducts(products) {
      this.products = products
    },
    clear() {
      this.products = products
    }
  },
  persist: true
})
