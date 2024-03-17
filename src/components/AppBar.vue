<template>
  <v-app-bar>
    <template v-slot:prepend>
      <RouterLink :to="Routes.HOME">
        <v-img :src="MarketplaceLogo" :width="48" alt="Marketplace logo" title="Marketplace" />
      </RouterLink>
    </template>

    <v-app-bar-title class="cursor-pointer" title="Marketplace">Marketplace</v-app-bar-title>

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
import { useUserStore } from '@/stores/user'
import { Routes } from '@/types/routes'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { clear } = userStore
</script>
