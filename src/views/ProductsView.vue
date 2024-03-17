<template>
  <MainLayout>
    <template #content>
      <Suspense>
        <ProductGrid />
      </Suspense>
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import ProductGrid from '@/components/ProductGrid.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>
