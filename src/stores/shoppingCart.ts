import { defineStore } from 'pinia'

import type { CartItem, ShoppingCart } from '@/types/shoppingCart'

import { useProductStore } from '@/stores/product'
import { useProductListStore } from '@/stores/productList'
import { ProductStatus } from '@/types/products'

type Id = 'shoppingCart'

type State = {
  shoppingCart: ShoppingCart
}

type Getters = {}

type Actions = {
  addItem: (id: Readonly<CartItem['id']>) => void
  clear: () => void
  deleteItem: (id: Readonly<CartItem['id']>) => void
  updateCount: (id: Readonly<CartItem['id']>, count: Readonly<CartItem['count']>) => void
}

/** Shopping cart default value. */
const shoppingCart: ShoppingCart = []

export const useShoppingCartStore = defineStore<Id, State, Getters, Actions>('shoppingCart', {
  state: () => ({
    shoppingCart
  }),
  actions: {
    addItem(id) {
      const { productList } = useProductListStore()
      const { updateStatus } = useProductStore()

      const product = productList.find((item) => item.id === id)

      if (product) {
        const item: Readonly<CartItem> = {
          count: 1,
          id,
          price: product.price,
          product: {
            description: product.description,
            id: product.id,
            price: product.price,
            thumbnail: product.thumbnail,
            title: product.title
          }
        }

        this.shoppingCart = [...this.shoppingCart, item]

        updateStatus(id, ProductStatus.IN_CART)
      }
    },
    clear() {
      this.shoppingCart = shoppingCart
    },
    deleteItem(id) {
      const { updateStatus } = useProductStore()

      this.shoppingCart = this.shoppingCart.filter((item) => item.id !== id)

      updateStatus(id, ProductStatus.FREE)
    },
    updateCount(id, count) {
      const index = this.shoppingCart.findIndex((item) => item.id === id)

      if (index !== -1) {
        console.log(index)

        const cart = [...this.shoppingCart]

        cart[index].count = count
        cart[index].price = cart[index].product.price * count

        this.shoppingCart = cart
      }
    }
  },
  persist: true
})
