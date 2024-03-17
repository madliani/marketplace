<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item @click="handleHomeClick" prepend-icon="mdi-home-city" title="Home"></v-list-item>
      <v-list-item
        @click="handleProductsClick"
        prepend-icon="mdi-shopping"
        title="Products"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <template v-slot:prepend>
      <v-img
        @click="drawMenu"
        :src="MarketplaceLogo"
        alt="Marketplace logo"
        class="cursor-pointer"
        height="48"
        title="Marketplace"
        width="48"
      />
    </template>

    <v-app-bar-title title="Marketplace">Marketplace</v-app-bar-title>

    <template v-if="user" v-slot:append>
      <v-avatar size="32">
        <v-img
          :src="user.avatar"
          :title="`${user.firstName} ${user.lastName}`"
          alt="User avatar"
          class="d-none d-sm-inline-block"
        />
      </v-avatar>

      <span :title="`${user.firstName} ${user.lastName}`" class="d-none d-sm-inline mx-2"
        >{{ user.firstName }} {{ user.lastName }}</span
      >

      <span :title="`Balance: ${user.balance} $`" class="d-none d-sm-inline"
        >{{ user.balance }} &dollar;</span
      >

      <v-btn @click="clear" class="ml-2" color="red" title="Logout" variant="tonal">Logout</v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import MarketplaceLogo from '@/assets/icons/marketplace-logo.png'
import { gotoMarketplace, gotoProductsPage } from '@/router/router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { clear } = userStore

const drawer = ref(false)

const drawMenu = () => (drawer.value = !drawer.value)

const handleHomeClick = () => {
  drawMenu()
  gotoMarketplace()
}

const handleProductsClick = () => {
  drawMenu()
  gotoProductsPage()
}
</script>
