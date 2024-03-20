import type { RouteRecordRaw, RouterHistory, RouterOptions } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductView from '@/views/ProductView.vue'

import type { Product } from '@/types/products'

import { Routes } from '@/types/routes'

const history: Readonly<RouterHistory> = createWebHistory(import.meta.env.BASE_URL)

const routes: Readonly<RouteRecordRaw[]> = [
  {
    component: HomeView,
    name: 'home',
    path: Routes.HOME
  },
  {
    component: ProductsView,
    name: 'products',
    path: Routes.PRODUCTS
  },
  {
    component: ProductView,
    name: 'product',
    path: `${Routes.PRODUCTS}/:id`,
    props: true
  }
]

const options: Readonly<RouterOptions> = {
  history,
  routes
}

const router = createRouter(options)

const goto = (path: Readonly<Routes>) => () => router.push(path)

export const gotoMarketplace = goto(Routes.HOME)
export const gotoProductsPage = goto(Routes.PRODUCTS)

export const gotoProductPage = (id: Product['id']) => {
  router.push(`${Routes.PRODUCTS}/${id}`)
}

export default router
