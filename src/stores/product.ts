import { defineStore } from 'pinia'

import type { BackendProduct, Product } from '@/types/products'

type ErrorHandler = (msg: Readonly<string>) => void

type Id = 'product'

type State = {
  product: Product | null
  loading: boolean
}

type Getters = {}

type Actions = {
  fetchProduct: (id: Readonly<Product['id']>, onError: ErrorHandler) => Promise<void> | never
  clear: () => void
}

/** Backend product images validating. */
const isValidImages = (images: Readonly<string[]>) =>
  images.every((image) => typeof image === 'string')

/** Backend product validating. */
const isValidProduct = (product: Readonly<BackendProduct>) =>
  typeof product === 'object' &&
  typeof product.description === 'string' &&
  typeof product.id === 'number' &&
  typeof product.thumbnail === 'string' &&
  typeof product.title === 'string' &&
  isValidImages(product.images)

/** Product store default value. */
const product: Readonly<Product | null> = null

export const useProductStore = defineStore<Id, State, Getters, Actions>('product', {
  state: () => ({
    product,
    loading: false
  }),
  actions: {
    async fetchProduct(id, onError) {
      try {
        this.loading = true

        const productResponse = await fetch(`https://dummyjson.com/products/${id}`)
        const productJson = await productResponse.json()

        if (productJson) {
          const product = productJson as unknown as BackendProduct

          if (isValidProduct(product)) {
            this.product = {
              description: product.description,
              id: product.id.toString(),
              images: product.images,
              price: product.price,
              thumbnail: product.thumbnail,
              title: product.title
            }
          }
        }
      } catch (exception: unknown) {
        this.product = product

        onError('Check your Internet connection or contact technical support.')

        console.error(exception)
      } finally {
        this.loading = false
      }
    },
    clear() {
      this.product = product
    }
  },
  persist: true
})
