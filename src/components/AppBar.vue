<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-img
        @click="draw"
        :src="MarketplaceLogo"
        alt="Marketplace logo"
        class="cursor-pointer"
        height="48px"
        title="Marketplace"
        width="48px"
      />
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

  <v-navigation-drawer v-model="drawer">
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
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import MarketplaceLogo from '@/assets/icons/marketplace-logo.png'

import { gotoHomepage, gotoMarketplace, gotoShoppingCart } from '@/router/router'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useUserStore } from '@/stores/user'
import { Route } from '@/types/route'

const userStore = useUserStore()

const { user, username } = storeToRefs(userStore)
const { clear } = userStore

const navigationDrawerStore = useNavigationDrawerStore()

const { selectedItem } = storeToRefs(navigationDrawerStore)
const { selectItem } = navigationDrawerStore

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
</script>
