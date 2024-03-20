<template>
  <v-card variant="elevated">
    <v-img :src="product.thumbnail" :title="product.title" cover height="25vh" />

    <v-card-title :title="product.title">{{ product.title }}</v-card-title>

    <v-card-subtitle :title="`Price: ${product.price} $`"
      >Price: {{ product.price }} &dollar;</v-card-subtitle
    >

    <v-card-actions>
      <v-btn color="primary" title="Buy" variant="tonal">Buy</v-btn>
      <v-btn @click="handleCardClick" color="secondary" title="Details" variant="tonal"
        >Details</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/products'

import { gotoProductPage } from '@/router/router'

type Props = Readonly<{
  product: Product
}>

const { product } = defineProps<Props>()

const handleCardClick = () => {
  gotoProductPage(product.id)
}
</script>

<style scoped>
.v-card,
.v-image {
  width: 25vw;
}

@media only screen and (width <= 360px) {
  .v-card,
  .v-image {
    width: 100%;
  }
}
</style>
