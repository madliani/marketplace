<template>
  <v-container v-if="!loading && !error" fluid>
    <v-row>
      <v-col v-for="product in productList" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>

  <ProgressCircular v-if="loading" />

  <ErrorAlert
    :on-close="gotoMarketplace"
    :text="error.message"
    title="Connection error!"
    v-if="error"
  />
</template>

<script lang="ts" setup>
import { gotoMarketplace } from '@/router/router'
import { useProductListStore } from '@/stores/productList'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref, type Ref } from 'vue'
import ErrorAlert from './ErrorAlert.vue'
import ProductCard from './ProductCard.vue'
import ProgressCircular from './ProgressCircular.vue'

const productListStore = useProductListStore()
const { productList, loading } = storeToRefs(productListStore)
const { fetchProducts } = productListStore

const error: Ref<Error | null> = ref(null)

const handleError = (msg: string) => (error.value = new Error(msg))

onBeforeMount(async () => await fetchProducts(handleError))
</script>
