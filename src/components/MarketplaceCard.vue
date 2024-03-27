<template>
  <v-card variant="elevated">
    <v-img :src="product.thumbnail" :title="product.title" cover max-height="200px" />

    <v-card-title :title="product.title">{{ product.title }}</v-card-title>

    <v-card-subtitle :title="`Price: ${product.price} $`"
      >Price: {{ product.price }} &dollar;</v-card-subtitle
    >

    <v-card-actions>
      <v-btn
        :disabled="!!purchaseOrder"
        :title="getTitleByStatus()"
        color="primary"
        variant="tonal"
        @click="handleBuyClick"
        >{{ getTitleByStatus() }}</v-btn
      >

      <v-btn color="secondary" title="Details" variant="tonal" @click="handleCardClick"
        >Details</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { gotoProduct } from '@/router/router'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import type { Product } from '@/types/products'
import { ProductStatus } from '@/types/products'
import { storeToRefs } from 'pinia'

type Props = Readonly<{
  product: Product
}>

const { product } = defineProps<Props>()

const { addItem, deleteItem } = useShoppingCartStore()

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)

const handleCardClick = () => {
  gotoProduct(product.id)
}

const handleBuyClick = () => {
  switch (product.status) {
    case ProductStatus.FREE: {
      addItem(product.id)

      return
    }
    case ProductStatus.IN_CART: {
      deleteItem(product.id)

      return
    }
  }
}

/** Getting button title by product status. */
const getTitleByStatus = () => {
  switch (product.status) {
    case ProductStatus.FREE: {
      return 'Buy'
    }
    case ProductStatus.IN_CART: {
      return 'In cart'
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
