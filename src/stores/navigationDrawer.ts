import { gotoHomepage, gotoMarketplace, gotoPurchaseOrder, gotoShoppingCart } from '@/router/router'
import { Route } from '@/types/route'
import { defineStore } from 'pinia'

type Id = 'navigationDrawer'

type State = {
  selectedRoute: Route
}

type Getters = {}

type Actions = {
  selectRoute: (route: Readonly<Route>) => void
  empty: () => void
}

export const useNavigationDrawerStore = defineStore<Id, State, Getters, Actions>(
  'navigationDrawer',
  {
    state: () => ({
      selectedRoute: Route.HOMEPAGE
    }),
    actions: {
      selectRoute(route) {
        this.selectedRoute = route

        switch (route) {
          case Route.HOMEPAGE: {
            gotoHomepage()

            return
          }
          case Route.MARKETPLACE: {
            gotoMarketplace()

            return
          }
          case Route.PURCHASE_ORDER: {
            gotoPurchaseOrder()

            return
          }
          case Route.SHOPPING_CART: {
            gotoShoppingCart()

            return
          }
        }
      },
      empty() {
        this.selectedRoute = Route.HOMEPAGE
      }
    },
    persist: true
  }
)
