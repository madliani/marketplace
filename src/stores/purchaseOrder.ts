import { defineStore } from 'pinia'

import type { OrderUser, PurchaseOrder } from '@/types/purchaseOrder'

import { useShoppingCartStore } from '@/stores/shoppingCart'
import { useUserStore } from '@/stores/user'

type SuccessHandler = () => void

type Id = 'purchaseOrder'

type State = {
  purchaseOrder: PurchaseOrder | null
}

type Getters = {}

type Actions = {
  cancel: (onSuccess: SuccessHandler) => void
  clear: () => void
  pay: (onSuccess: SuccessHandler) => void
  place: () => void
}

/** Purchase order default value. */
const purchaseOrder: Readonly<PurchaseOrder | null> = null

export const usePurchaseOrderStore = defineStore<Id, State, Getters, Actions>('purchaseOrder', {
  state: () => ({
    purchaseOrder
  }),
  actions: {
    cancel(onSuccess) {
      const { restoreBalance } = useUserStore()

      restoreBalance()
      onSuccess()
    },
    clear() {
      this.purchaseOrder = purchaseOrder
    },
    pay(onSuccess) {
      const { user, updateBalance } = useUserStore()

      if (user && this.purchaseOrder) {
        const balance = user.balance - this.purchaseOrder.totalCost

        updateBalance(balance)

        onSuccess()
      }
    },
    place() {
      const { shoppingCart, totalCost } = useShoppingCartStore()

      const { user } = useUserStore()

      if (user) {
        const departureDate = new Date()

        const buyer: Readonly<OrderUser> = {
          firstName: user.firstName,
          id: user.id,
          lastName: user.lastName
        }

        this.purchaseOrder = {
          departureDate,
          items: shoppingCart,
          totalCost,
          buyer
        }
      }
    }
  },
  persist: true
})
