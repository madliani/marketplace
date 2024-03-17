<template>
  <v-card variant="elevated">
    <v-img :src="product.thumbnail" :title="product.title" cover height="200px" width="100%" />

    <v-card-title :title="product.title">{{ product.title }}</v-card-title>

    <v-card-subtitle :title="`Price: ${product.price} $`"
      >Price: {{ product.price }} &dollar;</v-card-subtitle
    >

    <v-card-actions>
      <v-btn color="primary" title="Buy" variant="tonal">Buy</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/products'

type Props = Readonly<{
  product: Product
}>

defineProps<Props>()
</script>
