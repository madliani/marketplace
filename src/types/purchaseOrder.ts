import { type Product } from '@/types/products'

/**
 * Purchase order item.
 */
export type Item = {
  cost: number
  count: number
  id: string
  product: Product
}

export type PurchaseOrder = {
  items: Item[]
  totalCost: Item['cost']
}
