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

      <v-btn @click="handleLogoutClick" class="ml-2" color="red" title="Logout" variant="tonal"
        >Logout</v-btn
      >
    </template>
  </v-app-bar>

  <v-navigation-drawer v-if="user" v-model="drawer">
    <v-list nav>
      <v-list-item
        :active="selectedRoute === Route.HOMEPAGE"
        @click="handleHomepageClick"
        prepend-icon="mdi-home"
        title="Homepage"
      />

      <v-list-item
        :active="selectedRoute === Route.MARKETPLACE"
        @click="handleMarketplaceClick"
        prepend-icon="mdi-shopping"
        title="Marketplace"
      />

      <v-list-item
        :active="selectedRoute === Route.SHOPPING_CART"
        @click="handleCartClick"
        prepend-icon="mdi-cart"
        title="Shopping cart"
        v-if="shoppingCart.length"
      />

      <v-list-item
        :active="selectedRoute === Route.PURCHASE_ORDER"
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

import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductStore } from '@/stores/product'
import { useProductListStore } from '@/stores/productList'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { useUserStore } from '@/stores/user'
import { Route } from '@/types/route'

const userStore = useUserStore()

const { user, username } = storeToRefs(userStore)
const { clear: clearUser } = userStore

const navigationDrawerStore = useNavigationDrawerStore()

const { selectedRoute } = storeToRefs(navigationDrawerStore)
const { clear: clearNavigationDrawer, selectRoute } = navigationDrawerStore

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart } = storeToRefs(shoppingCartStore)
const { clear: clearShoppingCart } = shoppingCartStore

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)
const { clear: clearPurchaseOrder } = purchaseOrderStore

const { clear: clearProductList } = useProductListStore()

const { clear: clearProduct } = useProductStore()

const drawer = ref(true)

const draw = () => {
  drawer.value = !drawer.value
}

const handleLogoutClick = () => {
  clearUser()
  clearNavigationDrawer()
  clearShoppingCart()
  clearPurchaseOrder()
  clearProductList()
  clearProduct()

  selectRoute(Route.HOMEPAGE)
}

const handleHomepageClick = () => {
  selectRoute(Route.HOMEPAGE)
}

const handleMarketplaceClick = () => {
  selectRoute(Route.MARKETPLACE)
}

const handleCartClick = () => {
  selectRoute(Route.SHOPPING_CART)
}

const handleOrderClick = () => {
  selectRoute(Route.PURCHASE_ORDER)
}
</script>
