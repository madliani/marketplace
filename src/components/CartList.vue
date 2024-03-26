<template>
  <template v-if="shoppingCart.length">
    <v-list class="mx-4 mb-4">
      <template v-for="item in shoppingCart" :key="item.id">
        <CartItem :item="item" />

        <v-divider class="mb-2" />
      </template>

      <v-list-item :title="`Total price: ${totalCost} $`" class="text-right" />
    </v-list>

    <v-btn-group>
      <v-btn color="primary" title="Place an order" variant="elevated" @click="handlePlaceClick"
        >Place an order</v-btn
      >

      <v-btn color="secondary" title="Empty a cart" variant="elevated" @click="handleClear"
        >Empty a cart</v-btn
      >
    </v-btn-group>
  </template>

  <v-card v-if="!shoppingCart.length" type="info" variant="elevated">
    <v-alert text="There are no items in cart." title="Cart is empty!" variant="elevated" />
  </v-card>
</template>

<script lang="ts" setup>
import CartItem from '@/components/CartItem.vue'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { Route } from '@/types/route'
import { storeToRefs } from 'pinia'

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart, totalCost } = storeToRefs(shoppingCartStore)
const { clear } = shoppingCartStore

const { place } = usePurchaseOrderStore()

const { selectRoute } = useNavigationDrawerStore()

const handlePlaceClick = () => {
  place()
}

const handleClear = () => {
  clear()

  selectRoute(Route.MARKETPLACE)
}
</script>
