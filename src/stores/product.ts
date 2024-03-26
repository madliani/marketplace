import { useProductListStore } from '@/stores/productList'
import type { Product } from '@/types/products'
import { ProductStatus } from '@/types/products'
import { defineStore } from 'pinia'

type ErrorHandler = (msg: Readonly<string>) => void
type LoadingChanger = () => void

type Id = 'product'

type State = {
  product: Product | null
}

type Getters = {
  productStatus: (state: State) => string | null
}

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

export const useProductStore = defineStore<Id, State, Getters, Actions>('product', {
  state: () => ({
    product: null
  }),
  getters: {
    productStatus(state) {
      if (state.product) {
        switch (state.product.status) {
          case ProductStatus.FREE: {
            return 'Buy'
          }
          case ProductStatus.IN_CART: {
            return 'In cart'
          }
          case ProductStatus.ORDERED: {
            return 'Ordered'
          }
          case ProductStatus.PURCHASED: {
            return 'Purchased'
          }
        }
      }

      return null
    }
  },
  actions: {
    clear() {
      this.product = null
    },
    async getProduct(id, onError, changeLoading) {
      changeLoading()

      try {
        this.product = await fetchProduct(id)
      } catch (exception: unknown) {
        this.product = null

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
