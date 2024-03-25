import type { RouteRecordRaw, RouterHistory, RouterOptions } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import CartView from '@/views/CartView.vue'
import HomepageView from '@/views/HomepageView.vue'
import MarketplaceView from '@/views/MarketplaceView.vue'
import ProductView from '@/views/ProductView.vue'

import type { Product } from '@/types/products'

import { Route } from '@/types/route'

const history: Readonly<RouterHistory> = createWebHistory(import.meta.env.BASE_URL)

const routes: Readonly<RouteRecordRaw[]> = [
  {
    component: HomepageView,
    name: 'homepage',
    path: Route.HOMEPAGE
  },
  {
    component: MarketplaceView,
    name: 'marketplace',
    path: Route.MARKETPLACE
  },
  {
    component: ProductView,
    name: 'product',
    path: `${Route.MARKETPLACE}/:id`,
    props: true
  },
  {
    component: CartView,
    name: 'shopping-cart',
    path: Route.SHOPPING_CART
  }
]

const options: Readonly<RouterOptions> = {
  history,
  routes
}

const router = createRouter(options)

const goto = (path: Readonly<Route>) => () => router.push(path)

export const gotoHomepage = goto(Route.HOMEPAGE)
export const gotoMarketplace = goto(Route.MARKETPLACE)
export const gotoShoppingCart = goto(Route.SHOPPING_CART)

export const gotoProduct = (id: Product['id']) => {
  router.push(`${Route.MARKETPLACE}/${id}`)
}

export default router
