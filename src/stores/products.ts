import type { Products } from '@/types/products'
import { defineStore } from 'pinia'

type Id = 'products'

type State = {
  products: Products
}

type Getters = Readonly<{}>

type Actions = Readonly<{
  addProducts: (products: Products) => void
  clearProducts: () => void
}>

export const useProductsStore = defineStore<Id, State, Getters, Actions>('products', {
  state: () => ({
    products: []
  }),
  actions: {
    addProducts(products) {
      this.products = products
    },
    clearProducts() {
      this.products = []
    }
  },
  persist: true
})
