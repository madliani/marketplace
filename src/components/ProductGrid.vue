<template>
  <v-container fluid v-if="!loading && !error">
    <v-row>
      <v-col :key="product.id" v-for="product in productList">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>

  <ProgressCircular v-if="loading" />

  <AlertError
    :on-close="handleClose"
    :text="error.message"
    title="Connection error!"
    v-if="error"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'

import AlertError from '@/components/AlertError.vue'
import ProductCard from '@/components/ProductCard.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'

import { gotoMarketplace } from '@/router/router'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductListStore } from '@/stores/productList'
import { Route } from '@/types/route'

const productListStore = useProductListStore()

const { productList, loading } = storeToRefs(productListStore)
const { fetchProducts } = productListStore

const { selectItem } = useNavigationDrawerStore()

const error = ref<Error | null>(null)

const handleError = (msg: string) => {
  error.value = new Error(msg)
}

const handleClose = () => {
  selectItem(Route.HOME, gotoMarketplace)
}

onBeforeMount(async () => {
  await fetchProducts(handleError)
})
</script>
