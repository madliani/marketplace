<template>
  <v-container>
    <v-row>
      <v-col v-for="product in productList" :key="product.id">
        <MarketplaceCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import MarketplaceCard from '@/components/MarketplaceCard.vue'
import { useProductListStore } from '@/stores/productList'
import { storeToRefs } from 'pinia'

const productListStore = useProductListStore()

const { productList } = storeToRefs(productListStore)
</script>
