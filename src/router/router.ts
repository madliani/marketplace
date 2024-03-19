import { Routes } from '@/types/routes'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw, type RouterHistory } from 'vue-router'

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

const router = createRouter({
  history,
  routes
})

const goto = (path: Readonly<Routes>) => () => router.push(path)

export const gotoMarketplace = goto(Routes.HOME)
export const gotoProductsPage = goto(Routes.PRODUCTS)

export default router
