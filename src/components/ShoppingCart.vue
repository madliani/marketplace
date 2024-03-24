<template>
  <template v-if="shoppingCart.length">
    <v-list class="mx-4 mb-4">
      <template :key="item.id" v-for="(item, index) in shoppingCart">
        <v-list-item
          :prepend-avatar="item.product.thumbnail"
          :subtitle="item.product.description"
          :title="item.product.title"
        >
          <template v-slot:append>
            <v-btn
              :disabled="item.count === 1"
              @click="() => handleLessClick(item.id, item.count)"
              class="ml-4"
              color="secondary"
              title="Less"
              variant="tonal"
              >-</v-btn
            >

            <span :title="`${item.count} piece`" class="ml-2">{{ item.count }} piece</span>

            <v-btn
              @click="() => handleMoreClick(item.id, item.count)"
              class="ml-2"
              color="secondary"
              title="More"
              variant="tonal"
              >+</v-btn
            >

            <span :title="`Price: ${item.price} $`" class="ml-4">{{ item.price }} &dollar;</span>

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

        <v-divider v-if="index !== shoppingCart.length - 1" class="mb-2" />
      </template>
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

import type { Item } from '@/types/shoppingCart'

import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart } = storeToRefs(shoppingCartStore)
const { deleteItem, updateCount } = shoppingCartStore

const { place } = usePurchaseOrderStore()

const handleDeleteItem = (id: Readonly<Item['id']>) => {
  deleteItem(id)
}

const handleLessClick = (id: Readonly<Item['id']>, count: Readonly<Item['count']>) => {
  updateCount(id, count - 1)
}

const handleMoreClick = (id: Readonly<Item['id']>, count: Readonly<Item['count']>) => {
  updateCount(id, count + 1)
}

const handlePlaceClick = () => {
  place()
}
</script>
