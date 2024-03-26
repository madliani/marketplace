<template>
  <MainLayout>
    <ProductCard
      v-if="product && !loading && error"
      :product="product"
      :title-by-status="titleByStatus"
    />

    <ProgressCircular v-if="loading && !error" />

    <AlertError
      v-if="error && !loading"
      :on-close="handleClose"
      :text="error.message"
      title="Connection error!"
    />
  </MainLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'

import ProductCard from '@/components/ProductCard.vue'
import MainLayout from '@/layouts/MainLayout.vue'

import type { Product } from '@/types/products'

import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductStore } from '@/stores/product'
import { Route } from '@/types/route'

type Props = Readonly<{
  id: Product['id']
}>

const { id } = defineProps<Props>()

const productStore = useProductStore()

const { product, titleByStatus } = storeToRefs(productStore)
const { getProduct } = productStore

const { selectRoute } = useNavigationDrawerStore()

const loading = ref(false)

const error = ref<Error | null>(null)

const changeLoading = () => {
  loading.value = !loading.value
}

const handleError = (msg: string) => {
  error.value = new Error(msg)
}

const handleClose = () => {
  selectRoute(Route.HOMEPAGE)
}

onBeforeMount(async () => {
  await getProduct(id, handleError, changeLoading)
})
</script>
