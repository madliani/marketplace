<template>
  <v-list-item
    :prepend-avatar="item.product.thumbnail"
    :subtitle="item.product.description"
    :title="item.product.title"
  >
    <template #append>
      <v-btn
        :disabled="item.quantity === 1 || !!purchaseOrder"
        class="ml-4"
        color="secondary"
        title="Less"
        variant="tonal"
        @click="handleLessClick"
        >-</v-btn
      >

      <span :title="`${item.quantity} piece`" class="ml-2">{{ item.quantity }} piece</span>

      <v-btn
        :disabled="!!purchaseOrder"
        class="ml-2"
        color="secondary"
        title="More"
        variant="tonal"
        @click="handleMoreClick"
        >+</v-btn
      >

      <span :title="`Price: ${item.cost} $`" class="ml-4">{{ item.cost }} &dollar;</span>

      <v-btn
        :disabled="!!purchaseOrder"
        class="ml-4"
        color="red"
        icon="mdi-delete"
        title="Delete"
        variant="text"
        @click="handleDeleteItem"
      />
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { Route } from '@/types/route'
import type { CartItem } from '@/types/shoppingCart'
import { storeToRefs } from 'pinia'

type Props = Readonly<{
  item: CartItem
}>

const { item } = defineProps<Props>()

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart } = storeToRefs(shoppingCartStore)
const { deleteItem, updateQuantity } = shoppingCartStore

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)
const { selectRoute } = useNavigationDrawerStore()

const handleDeleteItem = () => {
  if (shoppingCart.value.length === 1) {
    selectRoute(Route.MARKETPLACE)
  }

  deleteItem(item.id)
}

const handleLessClick = () => {
  updateQuantity(item.id, item.quantity - 1)
}

const handleMoreClick = () => {
  updateQuantity(item.id, item.quantity + 1)
}
</script>
