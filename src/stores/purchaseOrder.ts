import { useShoppingCartStore } from '@/stores/shoppingCart'
import { useUserStore } from '@/stores/user'
import type { OrderItem, OrderProduct, OrderUser, PurchaseOrder } from '@/types/purchaseOrder'
import { defineStore } from 'pinia'

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

export const usePurchaseOrderStore = defineStore<Id, State, Getters, Actions>('purchaseOrder', {
  state: () => ({
    purchaseOrder: null
  }),
  actions: {
    cancel(onSuccess) {
      const { restoreBalance } = useUserStore()

      restoreBalance()
      onSuccess()
    },
    clear() {
      this.purchaseOrder = null
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

        const items = shoppingCart.map<OrderItem>((item) => {
          const product: Readonly<OrderProduct> = {
            id: item.product.id,
            title: item.product.title,
            price: item.product.price
          }

          return {
            cost: item.cost,
            id: item.id,
            quantity: item.quantity,
            product
          }
        })

        const buyer: Readonly<OrderUser> = {
          firstName: user.firstName,
          id: user.id,
          lastName: user.lastName
        }

        this.purchaseOrder = {
          departureDate,
          items,
          totalCost,
          buyer
        }
      }
    }
  },
  persist: true
})
