<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import UserCard from '@/components/UserCard.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <MainLayout>
    <template #content>
      <LoginForm v-if="!user" />

      <UserCard v-if="user" />
    </template>
  </MainLayout>
</template>
