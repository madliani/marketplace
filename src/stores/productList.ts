import type { BackendProduct, BackendProducts, Product, Products } from '@/types/products'
import { defineStore } from 'pinia'

type ErrorHandler = (msg: Readonly<string>) => void

type Id = 'productList'

type State = {
  productList: Products
  loading: boolean
}

type Getters = {}

type Actions = Readonly<{
  fetchProducts: (onError: ErrorHandler) => Promise<void> | never
  clear: () => void
}>

/** Backend product images validating. */
const isValidImages = (images: Readonly<string[]>) =>
  images.every((image) => typeof image === 'string')

/** Backend products validating. */
const isValidProducts = (products: Readonly<BackendProduct[]>) =>
  typeof products === 'object' &&
  products.every(
    (product) =>
      typeof product === 'object' &&
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
    productList,
    loading: false
  }),
  actions: {
    async fetchProducts(onError) {
      try {
        this.loading = true

        const productResponse = await fetch(`https://dummyjson.com/products`)
        const productJson = await productResponse.json()

        if (productJson) {
          const products = productJson as unknown as BackendProducts

          if (isValidProducts(products.products)) {
            const productList = products.products.map<Product>((product) => ({
              description: product.description,
              id: product.id.toString(),
              images: product.images,
              price: product.price,
              thumbnail: product.thumbnail,
              title: product.title
            }))

            this.productList = productList
          }
        }
      } catch (exception: unknown) {
        this.productList = productList

        onError('Check your Internet connection or contact technical support.')

        console.error(exception)
      } finally {
        this.loading = false
      }
    },
    clear() {
      this.productList = productList
    }
  },
  persist: true
})
