import { defineStore } from 'pinia'

import { Route } from '@/types/route'

type GoToHandler = () => void

type Id = 'navigationDrawer'

type State = {
  selectedItem: Route
}

type Getters = {}

type Actions = {
  selectItem: (item: Readonly<Route>, goto: GoToHandler) => void
  clear: () => void
}

/** Navigation drawer store default value. */
const selectedItem: Readonly<Route> = Route.HOME

export const useNavigationDrawerStore = defineStore<Id, State, Getters, Actions>(
  'navigationDrawer',
  {
    state: () => ({
      selectedItem
    }),
    actions: {
      selectItem(item, goto) {
        this.selectedItem = item

        goto()
      },
      clear() {
        this.selectedItem = selectedItem
      }
    },
    persist: true
  }
)
