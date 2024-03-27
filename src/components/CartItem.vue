<template>
  <v-list-item>
    <template #prepend>
      <v-list-item-media class="mr-4">
        <v-avatar
          :image="item.product.thumbnail"
          :alt="item.product.title"
          :title="item.product.title"
          size="48px"
        />
      </v-list-item-media>
    </template>

    <v-list-item-title class="mb-2">{{ item.product.title }}</v-list-item-title>

    <v-list-item-subtitle class="mb-2">{{ item.product.description }}</v-list-item-subtitle>

    <v-form class="d-inline-block mr-4 mb-2">
      <v-btn
        :disabled="item.quantity === 1 || !!purchaseOrder"
        class="mr-2"
        color="secondary"
        title="Less"
        variant="tonal"
        @click="handleLessClick"
        >-</v-btn
      >

      <span :title="`${item.quantity} piece`" class="mr-2">{{ item.quantity }} piece</span>

      <v-btn
        :disabled="!!purchaseOrder"
        class="mr-2"
        color="secondary"
        title="More"
        variant="tonal"
        @click="handleMoreClick"
        >+</v-btn
      >
    </v-form>

    <span :title="`Price: ${item.cost} $`" class="mr-4">{{ item.cost }} &dollar;</span>

    <v-btn
      :disabled="!!purchaseOrder"
      color="red"
      icon="mdi-delete"
      title="Delete"
      variant="text"
      @click="handleDeleteItem"
    />
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
