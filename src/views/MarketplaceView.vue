<template>
  <MainLayout>
    <template #content>
      <MarketplaceGrid />
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import MarketplaceGrid from '@/components/MarketplaceGrid.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>
