<template>
  <v-container v-if="!loading" fluid>
    <v-row>
      <v-col v-for="product in productList" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>

  <ProgressCircular v-if="loading" />
</template>

<script lang="ts" setup>
import { useProductListStore } from '@/stores/productList'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import ProgressCircular from './ProgressCircular.vue'

const productListStore = useProductListStore()
const { productList, loading } = storeToRefs(productListStore)
const { fetchProducts } = productListStore

onMounted(async () => await fetchProducts())
</script>
