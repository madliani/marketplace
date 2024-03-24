<template>
  <template v-if="shoppingCart.length">
    <v-list class="mx-4 mb-4">
      <template :key="item.id" v-for="item in shoppingCart">
        <v-list-item
          :prepend-avatar="item.product.thumbnail"
          :subtitle="item.product.description"
          :title="item.product.title"
        >
          <template v-slot:append>
            <v-btn
              :disabled="item.quantity === 1"
              @click="() => handleLessClick(item.id, item.quantity)"
              class="ml-4"
              color="secondary"
              title="Less"
              variant="tonal"
              >-</v-btn
            >

            <span :title="`${item.quantity} piece`" class="ml-2">{{ item.quantity }} piece</span>

            <v-btn
              @click="() => handleMoreClick(item.id, item.quantity)"
              class="ml-2"
              color="secondary"
              title="More"
              variant="tonal"
              >+</v-btn
            >

            <span :title="`Price: ${item.cost} $`" class="ml-4">{{ item.cost }} &dollar;</span>

            <v-btn
              @click="() => handleDeleteItem(item.id)"
              class="ml-4"
              color="red"
              icon="mdi-delete"
              title="Delete"
              variant="text"
            />
          </template>
        </v-list-item>

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

import type { CartItem } from '@/types/shoppingCart'

import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart, totalCost } = storeToRefs(shoppingCartStore)
const { deleteItem, updateQuantity } = shoppingCartStore

const { place } = usePurchaseOrderStore()

const handleDeleteItem = (id: Readonly<CartItem['id']>) => {
  deleteItem(id)
}

const handleLessClick = (id: Readonly<CartItem['id']>, count: Readonly<CartItem['quantity']>) => {
  updateQuantity(id, count - 1)
}

const handleMoreClick = (id: Readonly<CartItem['id']>, count: Readonly<CartItem['quantity']>) => {
  updateQuantity(id, count + 1)
}

const handlePlaceClick = () => {
  place()
}
</script>
