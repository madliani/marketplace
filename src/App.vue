<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #header>
      <AppBar />
    </template>
    <template #content>
      <RouterView />
    </template>
  </AppLayout>
</template>
