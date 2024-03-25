import type { RouteRecordRaw, RouterHistory, RouterOptions } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import CartView from '@/views/CartView.vue'
import HomeView from '@/views/HomeView.vue'
import MarketplaceView from '@/views/MarketplaceView.vue'
import ProductView from '@/views/ProductView.vue'

import type { Product } from '@/types/products'

import { Route } from '@/types/route'

const history: Readonly<RouterHistory> = createWebHistory(import.meta.env.BASE_URL)

const routes: Readonly<RouteRecordRaw[]> = [
  {
    component: HomeView,
    name: 'home',
    path: Route.HOME
  },
  {
    component: MarketplaceView,
    name: 'products',
    path: Route.PRODUCTS
  },
  {
    component: ProductView,
    name: 'product',
    path: `${Route.PRODUCTS}/:id`,
    props: true
  },
  {
    component: CartView,
    name: 'cart',
    path: Route.CART
  }
]

const options: Readonly<RouterOptions> = {
  history,
  routes
}

const router = createRouter(options)

const goto = (path: Readonly<Route>) => () => router.push(path)

export const gotoMarketplace = goto(Route.HOME)
export const gotoProductsPage = goto(Route.PRODUCTS)
export const gotoCartPage = goto(Route.CART)

export const gotoProductPage = (id: Product['id']) => {
  router.push(`${Route.PRODUCTS}/${id}`)
}

export default router
