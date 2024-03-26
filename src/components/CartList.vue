<template>
  <template v-if="shoppingCart.length">
    <v-list class="mx-4 mb-4">
      <template v-for="item in shoppingCart" :key="item.id">
        <CartItem :item="item" />

        <v-divider class="mb-2" />
      </template>

      <v-list-item :title="`Total price: ${totalCost} $`" class="text-right" />
    </v-list>

    <AlertError
      v-if="error"
      class="mb-4"
      title="Not enough funds!"
      text="The total cost of the items in the shopping cart is greater than the balance."
      :on-close="handleCloseClick"
    />

    <v-btn-group>
      <v-btn color="primary" title="Place an order" variant="outlined" @click="handlePlaceClick"
        >Place an order</v-btn
      >

      <v-btn color="secondary" title="Empty a cart" variant="outlined" @click="handleClear"
        >Empty a cart</v-btn
      >
    </v-btn-group>
  </template>

  <v-card v-if="!shoppingCart.length" type="info" variant="elevated">
    <v-alert text="There are no items in cart." title="Cart is empty!" variant="elevated" />
  </v-card>
</template>

<script lang="ts" setup>
import AlertError from '@/components/AlertError.vue'
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
const { clear } = shoppingCartStore

const { place } = usePurchaseOrderStore()

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
  }
}

const handleClear = () => {
  clear()

  selectRoute(Route.MARKETPLACE)
}
</script>
