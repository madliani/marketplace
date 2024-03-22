<template>
  <v-card variant="elevated">
    <v-img :src="product.thumbnail" :title="product.title" cover />

    <v-card-title :title="product.title">{{ product.title }}</v-card-title>

    <v-card-subtitle :title="`Price: ${product.price} $`"
      >Price: {{ product.price }} &dollar;</v-card-subtitle
    >

    <v-card-actions>
      <v-btn
        :title="getTitleByStatus(product.status)"
        @click="handleBuyClick"
        color="primary"
        variant="tonal"
        >{{ getTitleByStatus(product.status) }}</v-btn
      >
      <v-btn @click="handleCardClick" color="secondary" title="Details" variant="tonal"
        >Details</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/products'

import { gotoProductPage } from '@/router/router'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { Status } from '@/types/products'

type Props = Readonly<{
  product: Product
}>

const { product } = defineProps<Props>()

const { addItem, deleteItem } = useShoppingCartStore()

const handleCardClick = () => {
  gotoProductPage(product.id)
}

const handleBuyClick = () => {
  switch (product.status) {
    case Status.FREE: {
      addItem(product.id)

      return
    }
    case Status.IN_CART: {
      deleteItem(product.id)

      return
    }
    case Status.ORDERED: {
      return
    }
    case Status.PURCHASED: {
      return
    }
  }
}

/** Getting button title by product status. */
const getTitleByStatus = (status: Readonly<Status>) => {
  switch (status) {
    case Status.FREE: {
      return 'Buy'
    }
    case Status.IN_CART: {
      return 'In cart'
    }
    case Status.ORDERED: {
      return 'Ordered'
    }
    case Status.PURCHASED: {
      return 'Purchased'
    }
  }
}
</script>

<style scoped>
.v-card,
.v-image {
  width: 20vw;
}

@media only screen and (width <= 360px) {
  .v-card,
  .v-image {
    width: 100%;
  }
}
</style>
