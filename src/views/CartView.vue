<template>
  <MainLayout>
    <template #content>
      <span class="text-h4 mb-8">Shopping cart</span>

      <ShoppingCart />
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import ShoppingCart from '@/components/ShoppingCart.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>
