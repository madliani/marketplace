<template>
  <v-list-item
    :prepend-avatar="item.product.thumbnail"
    :subtitle="item.product.description"
    :title="item.product.title"
  >
    <template v-slot:append>
      <v-btn
        :disabled="item.quantity === 1"
        @click="handleLessClick"
        class="ml-4"
        color="secondary"
        title="Less"
        variant="tonal"
        >-</v-btn
      >

      <span :title="`${item.quantity} piece`" class="ml-2">{{ item.quantity }} piece</span>

      <v-btn @click="handleMoreClick" class="ml-2" color="secondary" title="More" variant="tonal"
        >+</v-btn
      >

      <span :title="`Price: ${item.cost} $`" class="ml-4">{{ item.cost }} &dollar;</span>

      <v-btn
        @click="handleDeleteItem"
        class="ml-4"
        color="red"
        icon="mdi-delete"
        title="Delete"
        variant="text"
      />
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { CartItem } from '@/types/shoppingCart'

import { useShoppingCartStore } from '@/stores/shoppingCart'

type Props = Readonly<{
  item: CartItem
}>

const { item } = defineProps<Props>()

const shoppingCartStore = useShoppingCartStore()

const { deleteItem, updateQuantity } = shoppingCartStore

const handleDeleteItem = () => {
  deleteItem(item.id)
}

const handleLessClick = () => {
  updateQuantity(item.id, item.quantity - 1)
}

const handleMoreClick = () => {
  updateQuantity(item.id, item.quantity + 1)
}
</script>
