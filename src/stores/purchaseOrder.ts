import type { Item, PurchaseOrder } from '@/types/purchaseOrder'
import { defineStore } from 'pinia'

type Id = 'purchaseOrder'

type State = {
  purchaseOrder: PurchaseOrder
}

type Getters = {}

type Actions = Readonly<{
  addItem: (count: Readonly<Item['count']>, product: Readonly<Item['product']>) => void
  clear: () => void
  deleteItem: (id: Readonly<Item['id']>) => void
}>

/** Purchase order default value. */
const purchaseOrder: Readonly<PurchaseOrder> = {
  items: [],
  totalCost: 0
}

export const usePurchaseOrderStore = defineStore<Id, State, Getters, Actions>('purchaseOrder', {
  state: () => ({
    purchaseOrder
  }),
  actions: {
    addItem(count, product) {
      const item: Readonly<Item> = {
        count,
        cost: product.price * count,
        id: product.id,
        product
      }

      const items = [...this.purchaseOrder.items, item]
      const totalCost = items.reduce((cost, item) => cost + item.cost, 0)

      this.purchaseOrder = { items, totalCost }
    },
    clear() {
      this.purchaseOrder = purchaseOrder
    },
    deleteItem(id) {
      const target = this.purchaseOrder.items.find((item) => item.id === id)

      if (target) {
        const totalCost = this.purchaseOrder.totalCost - target.cost
        const items = this.purchaseOrder.items.filter((item) => item.id !== id)

        this.purchaseOrder = {
          items,
          totalCost
        }
      }
    }
  },
  persist: true
})
