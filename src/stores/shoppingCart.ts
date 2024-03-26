import { useProductStore } from '@/stores/product'
import { useProductListStore } from '@/stores/productList'
import { ProductStatus } from '@/types/products'
import type { CartItem, CartProduct, ShoppingCart } from '@/types/shoppingCart'
import { defineStore } from 'pinia'

type Id = 'shoppingCart'

type State = {
  shoppingCart: ShoppingCart
}

type Getters = {
  totalCost: (state: State) => number
}

type Actions = {
  addItem: (id: Readonly<CartItem['id']>) => void
  clear: () => void
  deleteItem: (id: Readonly<CartItem['id']>) => void
  updateQuantity: (id: Readonly<CartItem['id']>, quantity: Readonly<CartItem['quantity']>) => void
}

export const useShoppingCartStore = defineStore<Id, State, Getters, Actions>('shoppingCart', {
  state: () => ({
    shoppingCart: []
  }),
  actions: {
    addItem(id) {
      const { productList } = useProductListStore()
      const { updateStatus } = useProductStore()

      const product = productList.find((item) => item.id === id)

      if (product) {
        const cartProduct: Readonly<CartProduct> = {
          description: product.description,
          id: product.id,
          price: product.price,
          thumbnail: product.thumbnail,
          title: product.title
        }

        const item: Readonly<CartItem> = {
          quantity: 1,
          id,
          cost: product.price,
          product: cartProduct
        }

        this.shoppingCart = [...this.shoppingCart, item]

        updateStatus(id, ProductStatus.IN_CART)
      }
    },
    clear() {
      this.shoppingCart = []
    },
    deleteItem(id) {
      const { updateStatus } = useProductStore()

      this.shoppingCart = this.shoppingCart.filter((item) => item.id !== id)

      updateStatus(id, ProductStatus.FREE)
    },
    updateQuantity(id, count) {
      const index = this.shoppingCart.findIndex((item) => item.id === id)

      if (index !== -1) {
        const cart = [...this.shoppingCart]

        cart[index].quantity = count
        cart[index].cost = cart[index].product.price * count

        this.shoppingCart = cart
      }
    }
  },
  getters: {
    totalCost(state) {
      return state.shoppingCart.reduce((cost, item) => cost + item.cost, 0)
    }
  },
  persist: true
})
