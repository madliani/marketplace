<script setup lang="ts">
import LogoMarketplace from '@/assets/icons/marketplace-logo.png'
import { Routes } from '@/types/routes'
</script>

<template>
  <v-app-bar>
    <template v-slot:prepend>
      <RouterLink :to="Routes.HOME">
        <v-img :src="LogoMarketplace" :width="48"></v-img>
      </RouterLink>
    </template>

    <v-app-bar-title>Marketplace</v-app-bar-title>
  </v-app-bar>
</template>
