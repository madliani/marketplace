<template>
  <MainLayout>
    <template #content>
      <Suspense>
        <LoginCard v-if="!user" />
      </Suspense>

      <Suspense>
        <UserCard v-if="user" />
      </Suspense>
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
