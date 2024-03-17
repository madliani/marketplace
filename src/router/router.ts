import { Routes } from '@/types/routes'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
})

const goto = (path: Readonly<Routes>) => () => router.push(path)

export const gotoMarketplace = goto(Routes.HOME)
export const gotoProductsPage = goto(Routes.PRODUCTS)

export default router
