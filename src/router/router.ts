import type { RouteRecordRaw, RouterHistory, RouterOptions } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'

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

export default router
