/** Product status. */
export const enum Status {
  FREE,
  IN_CART,
  ORDERED,
  PURCHASED
}

export type BackendProduct = {
  description: string
  id: number
  images: string[]
  price: number
  thumbnail: string
  title: string
}

export type BackendProducts = {
  products: BackendProduct[]
}

export type Product = {
  description: string
  id: string
  images: string[]
  price: number
  status: Status
  thumbnail: string
  title: string
}

export type Products = Product[]
