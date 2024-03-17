<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="product in productList" :key="product.id">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useProductListStore } from '@/stores/productList'
import { storeToRefs } from 'pinia'
import ProductCard from './ProductCard.vue'

const productListStore = useProductListStore()
const { productList } = storeToRefs(productListStore)
const { fetchProducts } = productListStore

await fetchProducts()
</script>
