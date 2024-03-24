import { defineStore } from 'pinia'

import type { BackendProduct, BackendProducts, Products } from '@/types/products'

import { ProductStatus } from '@/types/products'
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
  getProducts: (onError: ErrorHandler, changeLoading: LoadingChanger) => Promise<void> | never
  updateProducts: (products: Products) => void
}

/** Backend product images validating. */
const isValidImages = (images: Readonly<BackendProduct['images']>) =>
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

/** Fetching products. */
const fetchProducts = async (): Promise<Products> | never => {
  const productResponse = await fetch('https://dummyjson.com/products')
  const productJson = await productResponse.json()

  const products = productJson as unknown as BackendProducts

  if (!isValidProducts(products.products)) {
    throw new Error('Products are not valid.')
  }

  return products.products.map((product) => ({
    description: product.description,
    id: product.id.toString(),
    images: product.images,
    price: product.price,
    status: ProductStatus.FREE,
    thumbnail: product.thumbnail,
    title: product.title
  }))
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

/** Product list store default value. */
const productList: Products = []

export const useProductListStore = defineStore<Id, State, Getters, Actions>('productList', {
  state: () => ({
    productList,
    loading: false
  }),
  actions: {
    clear() {
      this.productList = productList
    },
    async getProducts(onError, changeLoading) {
      try {
        changeLoading()

        const products = await fetchProducts()

        this.productList = injectStatus(products)
      } catch (exception: unknown) {
        this.productList = productList

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
