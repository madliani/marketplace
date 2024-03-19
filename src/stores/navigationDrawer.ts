import { Routes } from '@/types/routes'
import { defineStore } from 'pinia'

type Id = 'navigationDrawer'

type State = {
  selectedItem: Routes
}

type Getters = {}

type Actions = Readonly<{
  selectItem: (item: Routes, goto: () => void) => void
  clear: () => void
}>

/** Navigation drawer store default value. */
const selectedItem: Readonly<Routes> = Routes.HOME

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
