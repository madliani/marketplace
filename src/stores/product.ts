import { defineStore } from 'pinia'

import type { Product } from '@/types/products'

import { useProductListStore } from '@/stores/productList'

type ErrorHandler = (msg: Readonly<string>) => void
type LoadingChanger = () => void

type Id = 'product'

type State = {
  product: Product | null
}

type Getters = {}

type Actions = {
  clear: () => void
  getProduct: (
    id: Readonly<Product['id']>,
    onError: ErrorHandler,
    changeLoading: LoadingChanger
  ) => Promise<void>
  updateStatus: (id: Readonly<Product['id']>, product: Readonly<Product['status']>) => void
}

/** Fetching product. */
const fetchProduct = async (id: Product['id']): Promise<Product> | never => {
  const { productList } = useProductListStore()

  const product = productList.find((item) => item.id === id)

  if (!product) {
    throw new Error('Product not found.')
  }

  return Promise.resolve(product)
}

/** Product store default value. */
const product: Readonly<Product | null> = null

export const useProductStore = defineStore<Id, State, Getters, Actions>('product', {
  state: () => ({
    product
  }),
  actions: {
    clear() {
      this.product = product
    },
    async getProduct(id, onError, changeLoading) {
      changeLoading()

      try {
        this.product = await fetchProduct(id)
      } catch (exception: unknown) {
        this.product = product

        onError('Check your Internet connection or contact technical support.')

        console.error(exception)
      } finally {
        changeLoading()
      }
    },
    updateStatus(id, status) {
      const { productList, updateProducts } = useProductListStore()

      const index = productList.findIndex((item) => item.id === id)

      if (index !== -1) {
        const products = [...productList]

        products[index].status = status

        updateProducts(products)
      }
    }
  },
  persist: true
})
