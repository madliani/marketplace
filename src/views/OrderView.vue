<template>
  <MainLayout>
    <template #content>
      <span class="text-h4 mb-4" title="Purchase order">Purchase order</span>

      <OrderTable />
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import OrderTable from '@/components/OrderTable.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>
