import { defineStore } from 'pinia'

import type { OrderItem, PurchaseOrder } from '@/types/purchaseOrder'

import { useShoppingCartStore } from './shoppingCart'

type Id = 'purchaseOrder'

type State = {
  purchaseOrder: PurchaseOrder
}

type Getters = {}

type Actions = {
  clear: () => void
  place: () => void
}

/** Purchase order default value. */
const purchaseOrder: Readonly<PurchaseOrder> = {
  items: [],
  totalPrice: 0
}

export const usePurchaseOrderStore = defineStore<Id, State, Getters, Actions>('purchaseOrder', {
  state: () => ({
    purchaseOrder
  }),
  actions: {
    clear() {
      this.purchaseOrder = purchaseOrder
    },
    place() {
      const { shoppingCart } = useShoppingCartStore()

      const items = shoppingCart.map<OrderItem>((item) => ({
        count: item.count,
        id: item.id,
        price: item.price,
        product: item.product
      }))

      const totalPrice = items.reduce((price, item) => price + item.price, 0)

      this.purchaseOrder = { items, totalPrice }
    }
  },
  persist: true
})
