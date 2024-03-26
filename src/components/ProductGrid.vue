<template>
  <v-container v-if="!loading && !error">
    <v-row>
      <v-col v-for="product in productList" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>

  <ProgressCircular v-if="loading" />

  <AlertError
    v-if="error"
    :on-close="handleClose"
    :text="error.message"
    title="Connection error!"
  />
</template>

<script lang="ts" setup>
import AlertError from '@/components/AlertError.vue'
import ProductCard from '@/components/ProductCard.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductListStore } from '@/stores/productList'
import { Route } from '@/types/route'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'

const productListStore = useProductListStore()

const { productList } = storeToRefs(productListStore)
const { getProducts } = productListStore

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
  await getProducts(handleError, changeLoading)
})
</script>
