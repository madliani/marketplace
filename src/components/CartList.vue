<template>
  <template v-if="shoppingCart.length">
    <v-list class="mx-4 mb-4">
      <template :key="item.id" v-for="item in shoppingCart">
        <CartItem :item="item" />

        <v-divider class="mb-2" />
      </template>

      <v-list-item :title="`Total price: ${totalCost} $`" class="text-right" />
    </v-list>

    <v-btn @click="handlePlaceClick" color="primary" title="Place an order" variant="elevated"
      >Place an order</v-btn
    >
  </template>

  <v-card v-if="!shoppingCart.length" type="info" variant="elevated">
    <v-alert text="There are no items in cart." title="Cart is empty!" variant="elevated" />
  </v-card>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import CartItem from '@/components/CartItem.vue'

import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart, totalCost } = storeToRefs(shoppingCartStore)

const { place } = usePurchaseOrderStore()

const handlePlaceClick = () => {
  place()
}
</script>
