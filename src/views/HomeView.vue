<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import MainLayout from '@/layouts/MainLayout.vue'
</script>

<template>
  <MainLayout>
    <template #content>
      <LoginForm />
    </template>
  </MainLayout>
</template>
