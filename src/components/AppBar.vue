<script setup lang="ts">
import MarketplaceLogo from '@/assets/icons/marketplace-logo.png'
import { useUserStore } from '@/stores/user'
import { Routes } from '@/types/routes'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { clear } = userStore
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <RouterLink :to="Routes.HOME">
        <v-img :src="MarketplaceLogo" :width="48" alt="Marketplace logo" title="Marketplace logo" />
      </RouterLink>
    </template>

    <v-app-bar-title title="Marketplace">Marketplace</v-app-bar-title>

    <template v-if="user" v-slot:append>
      <v-img
        :src="user.avatar"
        :width="24"
        alt="User avatar"
        class="d-none d-sm-inline-block"
        title="User avatar"
      />

      <span class="d-none d-sm-inline mx-2" title="User name"
        >{{ user.firstName }} {{ user.lastName }}</span
      >

      <span class="d-none d-sm-inline" title="Balance">{{ user.balance.toFixed(2) }}$</span>

      <v-btn @click="clear" class="ml-2" color="red" title="Logout" variant="tonal">Logout</v-btn>
    </template>
  </v-app-bar>
</template>
