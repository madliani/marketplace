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

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue'
import AppLayout from '@/layouts/AppLayout.vue'
</script>
