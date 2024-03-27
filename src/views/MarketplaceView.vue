<template>
  <MainLayout>
    <template #content>
      <MarketplaceGrid v-if="!loading && !error" />

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
import MarketplaceGrid from '@/components/MarketplaceGrid.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductListStore } from '@/stores/productList'
import { Route } from '@/types/route'
import { onBeforeMount, ref } from 'vue'

const productListStore = useProductListStore()

const { getProducts } = productListStore
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
  await getProducts(handleError, changeLoading)
})
</script>
