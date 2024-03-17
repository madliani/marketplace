import type { BackendProduct, BackendProducts, Product, Products } from '@/types/products'
import { defineStore } from 'pinia'

type Id = 'productList'

type State = {
  productList: Products
}

type Getters = {}

type Actions = Readonly<{
  fetchProducts: () => Promise<void> | never
  clear: () => void
}>

/** Backend product images validating. */
const isValidImages = (images: string[]) => images.every((image) => typeof image === 'string')

/** Backend products validating. */
const isValidProducts = (products: BackendProduct[]) =>
  products.every(
    (product) =>
      typeof product.description === 'string' &&
      typeof product.id === 'number' &&
      typeof product.thumbnail === 'string' &&
      typeof product.title === 'string' &&
      isValidImages(product.images)
  )

/** Product list store default value. */
const productList: Products = []

export const useProductListStore = defineStore<Id, State, Getters, Actions>('productList', {
  state: () => ({
    productList
  }),
  actions: {
    async fetchProducts() {
      try {
        const productsResponse = await fetch(`https://dummyjson.com/products`)
        const productsJson = await productsResponse.json()

        if (productsJson) {
          const products = productsJson as unknown as BackendProducts

          if (isValidProducts(products.products)) {
            const productList = products.products.map<Product>((product) => ({
              ...product,
              id: product.id.toString()
            }))

            this.productList = productList
          }
        }
      } catch (exception: unknown) {
        console.error(exception)
      }
    },
    clear() {
      this.productList = productList
    }
  },
  persist: true
})
