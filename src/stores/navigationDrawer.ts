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
  clear: () => void
}

/** Navigation drawer store default value. */
const selectedItem: Readonly<Route> = Route.HOMEPAGE

export const useNavigationDrawerStore = defineStore<Id, State, Getters, Actions>(
  'navigationDrawer',
  {
    state: () => ({
      selectedRoute: selectedItem
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
      clear() {
        this.selectedRoute = selectedItem
      }
    },
    persist: true
  }
)
