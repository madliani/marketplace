import { defineStore } from 'pinia'

import type { OrderUser, PurchaseOrder } from '@/types/purchaseOrder'

import { useShoppingCartStore } from './shoppingCart'
import { useUserStore } from './user'

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
  departureDate: null,
  shoppingCart: [],
  totalCost: 0,
  user: null
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
      const { shoppingCart, totalCost } = useShoppingCartStore()

      const { user } = useUserStore()

      if (user) {
        const departureDate = new Date()

        const orderUser: Readonly<OrderUser> = {
          firstName: user.firstName,
          id: user.id,
          lastName: user.lastName
        }

        this.purchaseOrder = {
          departureDate,
          shoppingCart,
          totalCost,
          user: orderUser
        }
      }
    }
  },
  persist: true
})
