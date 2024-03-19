<template>
  <v-app-bar>
    <template v-slot:prepend>
      <v-img
        @click="draw"
        :src="MarketplaceLogo"
        alt="Marketplace logo"
        class="cursor-pointer"
        height="48"
        title="Marketplace"
        width="48"
      />
    </template>

    <v-app-bar-title title="Marketplace">Marketplace</v-app-bar-title>

    <template v-if="user && username" v-slot:append>
      <v-avatar size="32">
        <v-img
          :src="user.avatar"
          :title="username"
          alt="User avatar"
          class="d-none d-sm-inline-block"
        />
      </v-avatar>

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
        :active="selectedItem === Routes.HOME"
        @click="handleHomepageClick"
        prepend-icon="mdi-home-city"
        title="Home"
      />
      <v-list-item
        :active="selectedItem === Routes.PRODUCTS"
        @click="handleMarketplaceClick"
        prepend-icon="mdi-shopping"
        title="Products"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import MarketplaceLogo from '@/assets/icons/marketplace-logo.png'
import { gotoMarketplace, gotoProductsPage } from '@/router/router'

import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useUserStore } from '@/stores/user'
import { Routes } from '@/types/routes'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const userStore = useUserStore()

const { user, username } = storeToRefs(userStore)
const { clear } = userStore

const navigationDrawerStore = useNavigationDrawerStore()

const { selectedItem } = storeToRefs(navigationDrawerStore)
const { selectItem } = navigationDrawerStore

const drawer = ref(true)

const handleHomepageClick = () => {
  selectItem(Routes.HOME, gotoMarketplace)
}

const handleMarketplaceClick = () => {
  selectItem(Routes.PRODUCTS, gotoProductsPage)
}

const draw = () => {
  drawer.value = !drawer.value
}
</script>
