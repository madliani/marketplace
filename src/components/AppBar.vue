<script setup lang="ts">
import MarketplaceLogo from '@/assets/icons/marketplace-logo.png'
import { useUserStore } from '@/stores/user'
import { Routes } from '@/types/routes'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <RouterLink :to="Routes.HOME">
        <v-img :src="MarketplaceLogo" :width="48" alt="Marketplace logo" title="Marketplace logo" />
      </RouterLink>
    </template>

    <v-app-bar-title>Marketplace</v-app-bar-title>

    <template v-if="user" v-slot:append>
      <v-img :src="user.avatar" :width="24" alt="User avatar" title="User avatar" />
      <span className="mx-2" title="User name">{{ user.firstName }} {{ user.lastName }}</span>
      <span title="Balance">{{ user.balance.toFixed(2) }}$</span>
    </template>
  </v-app-bar>
</template>
