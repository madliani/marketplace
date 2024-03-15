<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #app-bar>
      <AppBar />
    </template>
    <template #router-view>
      <RouterView />
    </template>
  </AppLayout>
</template>
