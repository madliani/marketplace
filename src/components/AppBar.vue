<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-img
        :src="MarketplaceLogo"
        alt="Marketplace logo"
        height="48px"
        title="Marketplace"
        v-if="!user"
        width="48px"
      />

      <v-app-bar-nav-icon @click="draw" class="cursor-pointer" v-if="user" />
    </template>

    <v-app-bar-title title="Marketplace">Marketplace</v-app-bar-title>

    <template v-if="user && username" v-slot:append>
      <v-avatar :image="user.avatar" :title="username" alt="User avatar" size="32px" />

      <span :title="username" class="d-none d-sm-inline mx-2">{{ username }}</span>

      <span :title="`Balance: ${user.balance} $`" class="d-none d-sm-inline"
        >{{ user.balance }} &dollar;</span
      >

      <v-btn @click="clear" class="ml-2" color="red" title="Logout" variant="tonal">Logout</v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-if="user" v-model="drawer">
    <v-list nav>
      <v-list-item
        :active="selectedItem === Route.HOMEPAGE"
        @click="handleHomepageClick"
        prepend-icon="mdi-home"
        title="Homepage"
      />

      <v-list-item
        :active="selectedItem === Route.MARKETPLACE"
        @click="handleMarketplaceClick"
        prepend-icon="mdi-shopping"
        title="Marketplace"
      />

      <v-list-item
        :active="selectedItem === Route.SHOPPING_CART"
        @click="handleCartClick"
        prepend-icon="mdi-cart"
        title="Shopping cart"
        v-if="shoppingCart.length"
      />

      <v-list-item
        :active="selectedItem === Route.PURCHASE_ORDER"
        @click="handleOrderClick"
        prepend-icon="mdi-receipt"
        title="Purchase order"
        v-if="purchaseOrder"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import MarketplaceLogo from '@/assets/icons/marketplace-logo.png'

import { gotoHomepage, gotoMarketplace, gotoPurchaseOrder, gotoShoppingCart } from '@/router/router'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { useUserStore } from '@/stores/user'
import { Route } from '@/types/route'

const userStore = useUserStore()

const { user, username } = storeToRefs(userStore)
const { clear } = userStore

const navigationDrawerStore = useNavigationDrawerStore()

const { selectedItem } = storeToRefs(navigationDrawerStore)
const { selectItem } = navigationDrawerStore

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart } = storeToRefs(shoppingCartStore)

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = purchaseOrderStore

const drawer = ref(true)

const draw = () => {
  drawer.value = !drawer.value
}

const handleHomepageClick = () => {
  selectItem(Route.HOMEPAGE, gotoHomepage)
}

const handleMarketplaceClick = () => {
  selectItem(Route.MARKETPLACE, gotoMarketplace)
}

const handleCartClick = () => {
  selectItem(Route.SHOPPING_CART, gotoShoppingCart)
}

const handleOrderClick = () => {
  selectItem(Route.PURCHASE_ORDER, gotoPurchaseOrder)
}
</script>
