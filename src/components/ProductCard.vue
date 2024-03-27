<template>
  <v-card class="h-80 w-75" variant="elevated">
    <CarouselCycle :images="product.images" :title="product.title" height="350px" />

    <v-card-title :title="product.title">{{ product.title }}</v-card-title>

    <v-card-subtitle :title="`Price: ${product.price} $`"
      >Price: {{ product.price }} &dollar;</v-card-subtitle
    >

    <v-card-item>
      {{ product.description }}
    </v-card-item>

    <v-card-actions>
      <v-btn
        :disabled="!!purchaseOrder"
        :title="titleByStatus"
        color="primary"
        variant="tonal"
        @click="handleBuyClick"
        >{{ titleByStatus }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import CarouselCycle from '@/components/CarouselCycle.vue'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import type { Product } from '@/types/products'
import { ProductStatus } from '@/types/products'
import { storeToRefs } from 'pinia'

type Props = Readonly<{
  product: Product
  titleByStatus: string | null
}>

const { product } = defineProps<Props>()

const { addItem, deleteItem } = useShoppingCartStore()

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)

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
</script>
