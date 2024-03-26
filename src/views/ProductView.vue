<template>
  <MainLayout>
    <ProductCard :id="id" />
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue'

import { type Product } from '@/types/products'

import ProductCard from '@/components/ProductCard.vue'

type Props = Readonly<{
  id: Product['id']
}>

const { id } = defineProps<Props>()
</script>
