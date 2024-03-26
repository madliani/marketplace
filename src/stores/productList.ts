import type { BackendProduct, BackendProducts, Product, Products } from '@/types/products'
import { ProductStatus } from '@/types/products'
import { defineStore } from 'pinia'
import { useShoppingCartStore } from './shoppingCart'

type ErrorHandler = (msg: Readonly<string>) => void
type LoadingChanger = () => void

type Id = 'productList'

type State = {
  productList: Products
  loading: boolean
}

type Getters = {}

type Actions = {
  clear: () => void
  getProducts: (onError: ErrorHandler, changeLoading: LoadingChanger) => Promise<void>
  updateProducts: (products: Products) => void
}

/** Backend product images validating. */
const isValidImages = (images: Readonly<BackendProduct['images']>) => {
  return images.every((image) => typeof image === 'string')
}

/** Backend products validating. */
const isValidProducts = (backendProducts: Readonly<BackendProducts>) => {
  return (
    typeof backendProducts.products === 'object' &&
    backendProducts.products.every(
      (product) =>
        typeof product === 'object' &&
        typeof product.description === 'string' &&
        typeof product.id === 'number' &&
        typeof product.thumbnail === 'string' &&
        typeof product.title === 'string' &&
        isValidImages(product.images)
    )
  )
}

/** Fetching products. */
const fetchProducts = async (): Promise<BackendProducts> | never => {
  const productResponse = await fetch('https://dummyjson.com/products')
  const productJson = await productResponse.json()

  const products = productJson as unknown as BackendProducts

  return products
}

/** Injecting statuses into products. */
const injectStatus = (products: Products) => {
  const { shoppingCart } = useShoppingCartStore()

  return products.map((product) => {
    if (shoppingCart.find((item) => item.id === product.id)) {
      return {
        ...product,
        status: ProductStatus.IN_CART
      }
    }

    return product
  })
}

export const useProductListStore = defineStore<Id, State, Getters, Actions>('productList', {
  state: () => ({
    productList: [],
    loading: false
  }),
  actions: {
    clear() {
      this.productList = []
    },
    async getProducts(onError, changeLoading) {
      try {
        changeLoading()

        const backendProducts = await fetchProducts()

        if (!isValidProducts(backendProducts)) {
          throw new Error('Products are not valid.')
        }

        const products = backendProducts.products.map<Product>((product) => ({
          description: product.description,
          id: product.id.toString(),
          images: product.images,
          price: product.price,
          status: ProductStatus.FREE,
          thumbnail: product.thumbnail,
          title: product.title
        }))

        this.productList = injectStatus(products)
      } catch (exception: unknown) {
        this.productList = []

        onError('Check your Internet connection or contact technical support.')

        console.error(exception)
      } finally {
        changeLoading()
      }
    },
    updateProducts(products) {
      this.productList = products
    }
  },
  persist: true
})
