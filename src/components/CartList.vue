<template>
  <v-list class="mx-4 mb-4">
    <template v-for="item in shoppingCart" :key="item.id">
      <CartItem :item="item" />

      <v-divider class="mb-2" />
    </template>

    <v-list-item :title="`Total price: ${totalCost} $`" class="text-right" />
  </v-list>

  <AlertCard
    v-if="error"
    class="mb-4"
    title="Not enough funds!"
    text="The total cost of the items in the shopping cart is greater than the balance."
    type="error"
    :on-close="handleCloseClick"
  />

  <v-btn-group>
    <v-btn
      :disabled="!!purchaseOrder"
      color="primary"
      title="Place an order"
      variant="tonal"
      @click="handlePlaceClick"
      >Place an order</v-btn
    >

    <v-btn
      :disabled="!!purchaseOrder"
      color="secondary"
      title="Empty a cart"
      variant="tonal"
      @click="handleEmptyClick"
      >Empty a cart</v-btn
    >
  </v-btn-group>
</template>

<script lang="ts" setup>
import AlertCard from '@/components/AlertCard.vue'
import CartItem from '@/components/CartItem.vue'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { useUserStore } from '@/stores/user'
import { Route } from '@/types/route'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const shoppingCartStore = useShoppingCartStore()

const { shoppingCart, totalCost } = storeToRefs(shoppingCartStore)
const { empty } = shoppingCartStore

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)
const { place } = purchaseOrderStore

const { selectRoute } = useNavigationDrawerStore()

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const error = ref(false)

const handleCloseClick = () => {
  error.value = false
}

const handlePlaceClick = () => {
  if (user.value) {
    const balance = user.value.balance - totalCost.value

    if (balance < 0) {
      error.value = true

      return
    }

    place()

    selectRoute(Route.PURCHASE_ORDER)
  }
}

const handleEmptyClick = () => {
  empty()

  selectRoute(Route.MARKETPLACE)
}
</script>
