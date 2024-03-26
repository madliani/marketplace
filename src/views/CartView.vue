<template>
  <MainLayout>
    <template #content>
      <span class="text-h4 mb-8" title="Shopping cart">Shopping cart</span>

      <CartList />
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import CartList from '@/components/CartList.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>
