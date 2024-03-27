import { useProductListStore } from '@/stores/productList'
import type { BackendProduct, Product } from '@/types/products'
import { ProductStatus } from '@/types/products'
import { defineStore } from 'pinia'

type ErrorHandler = (msg: Readonly<string>) => void
type LoadingChanger = () => void

type Id = 'product'

type State = {
  product: Product | null
}

type Getters = {
  titleByStatus: (state: State) => string | null
}

type Actions = {
  empty: () => void
  getProduct: (
    id: Readonly<Product['id']>,
    onError: ErrorHandler,
    changeLoading: LoadingChanger
  ) => Promise<void>
  updateStatus: (id: Readonly<Product['id']>, product: Readonly<Product['status']>) => void
}

/** Fetching product. */
const fetchProduct = async (id: Product['id']): Promise<BackendProduct> | never => {
  const productResponse = await fetch(`https://dummyjson.com/products/${id}`)
  const productJSON = await productResponse.json()

  return productJSON as unknown as BackendProduct
}

/** Backend product images validating. */
const isValidImages = (images: Readonly<BackendProduct['images']>) => {
  return images.every((image) => typeof image === 'string')
}

/** Backend products validating. */
const isValidProducts = (product: Readonly<BackendProduct>) => {
  return (
    typeof product === 'object' &&
    typeof product.description === 'string' &&
    typeof product.id === 'number' &&
    typeof product.thumbnail === 'string' &&
    typeof product.title === 'string' &&
    isValidImages(product.images)
  )
}

export const useProductStore = defineStore<Id, State, Getters, Actions>('product', {
  state: () => ({
    product: null
  }),
  actions: {
    empty() {
      this.product = null
    },
    async getProduct(id, onError, changeLoading) {
      changeLoading()

      try {
        const backendProduct = await fetchProduct(id)

        if (!isValidProducts(backendProduct)) {
          throw new Error('Products are not valid.')
        }

        this.product = {
          description: backendProduct.description,
          id: backendProduct.id.toString(),
          images: backendProduct.images,
          price: backendProduct.price,
          status: ProductStatus.FREE,
          thumbnail: backendProduct.thumbnail,
          title: backendProduct.title
        }
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
  getters: {
    titleByStatus(state) {
      if (state.product) {
        switch (state.product.status) {
          case ProductStatus.FREE: {
            return 'Buy'
          }
          case ProductStatus.IN_CART: {
            return 'In cart'
          }
        }
      }

      return null
    }
  },
  persist: true
})
