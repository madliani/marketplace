<template>
  <MainLayout>
    <template #content>
      <ProductCard v-if="product" :product="product" :title-by-status="titleByStatus" />

      <ProgressCircular v-if="loading" />

      <AlertCard
        v-if="error"
        :on-close="handleCloseClick"
        :text="error.message"
        title="Connection error!"
        type="error"
      />
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import AlertCard from '@/components/AlertCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductStore } from '@/stores/product'
import type { Product } from '@/types/products'
import { Route } from '@/types/route'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'

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

const handleError = (msg: Readonly<string>) => {
  error.value = new Error(msg)
}

const handleCloseClick = () => {
  selectRoute(Route.HOMEPAGE)
}

onBeforeMount(async () => {
  await getProduct(id, handleError, changeLoading)
})
</script>
