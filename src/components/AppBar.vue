<template>
  <v-app-bar>
    <template #prepend>
      <v-img
        v-if="!user"
        :src="MarketplaceLogo"
        alt="Marketplace logo"
        height="48px"
        title="Marketplace"
        width="48px"
      />

      <v-app-bar-nav-icon v-if="user" class="cursor-pointer" @click="changeDrawer" />
    </template>

    <v-app-bar-title title="Marketplace">Marketplace</v-app-bar-title>

    <template v-if="user && username" #append>
      <v-avatar :image="user.avatar" :title="username" alt="User avatar" size="32px" />

      <span :title="username" class="d-none d-sm-inline mx-2">{{ username }}</span>

      <span :title="`Balance: ${user.balance} $`" class="d-none d-sm-inline"
        >{{ user.balance }} &dollar;</span
      >

      <v-btn class="ml-2" color="red" title="Logout" variant="tonal" @click="handleLogoutClick"
        >Logout</v-btn
      >
    </template>
  </v-app-bar>

  <v-navigation-drawer v-if="user" v-model="drawer">
    <v-list nav>
      <v-list-item
        :active="selectedRoute === Route.HOMEPAGE"
        prepend-icon="mdi-home"
        title="Homepage"
        @click="handleHomepageClick"
      />

      <v-list-item
        :active="selectedRoute === Route.MARKETPLACE"
        prepend-icon="mdi-shopping"
        title="Marketplace"
        @click="handleMarketplaceClick"
      />

      <v-list-item
        v-if="shoppingCart.length"
        :active="selectedRoute === Route.SHOPPING_CART"
        prepend-icon="mdi-cart"
        title="Shopping cart"
        @click="handleCartClick"
      />

      <v-list-item
        v-if="purchaseOrder"
        :active="selectedRoute === Route.PURCHASE_ORDER"
        prepend-icon="mdi-receipt"
        title="Purchase order"
        @click="handleOrderClick"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import MarketplaceLogo from '@/assets/icons/marketplace-logo.png'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductStore } from '@/stores/product'
import { useProductListStore } from '@/stores/productList'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { useUserStore } from '@/stores/user'
import { Route } from '@/types/route'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const userStore = useUserStore()

const { user, username } = storeToRefs(userStore)
const { empty: emptyUser } = userStore

const navigationDrawerStore = useNavigationDrawerStore()

const { selectedRoute } = storeToRefs(navigationDrawerStore)
const { empty: emptyNavigationDrawer, selectRoute } = navigationDrawerStore

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart } = storeToRefs(shoppingCartStore)
const { empty: emptyShoppingCart } = shoppingCartStore

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)
const { empty: emptyPurchaseOrder } = purchaseOrderStore

const { empty: emptyProductList } = useProductListStore()

const { empty: emptyProduct } = useProductStore()

const drawer = ref(true)

const changeDrawer = () => {
  drawer.value = !drawer.value
}

const handleLogoutClick = () => {
  emptyUser()
  emptyNavigationDrawer()
  emptyShoppingCart()
  emptyPurchaseOrder()
  emptyProductList()
  emptyProduct()

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
