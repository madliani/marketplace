<template>
  <MainLayout>
    <template #content>
      <Suspense>
        <ProductGrid />

        <template #fallback>
          <ProgressCircular />
        </template>
      </Suspense>
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import ProductGrid from '@/components/ProductGrid.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>
