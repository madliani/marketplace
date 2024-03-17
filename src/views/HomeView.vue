<template>
  <MainLayout>
    <template #content>
      <LoginCard v-if="!user" />

      <UserCard v-if="user" />
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import LoginCard from '@/components/LoginCard.vue'
import UserCard from '@/components/UserCard.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>
