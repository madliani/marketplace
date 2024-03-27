<template>
  <template v-if="purchaseOrder && purchaseOrder.buyer && purchaseOrder.departureDate && !success">
    <v-table class="w-75 mb-2" fixed-header>
      <caption class="text-h6">
        Item list
      </caption>

      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Title</th>
          <th class="text-left">Price</th>
          <th class="text-left">Quantity</th>
          <th class="text-left">Cost</th>
          <th class="text-left">Buyer</th>
          <th class="text-left">Departure date</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in purchaseOrder.items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.product.title }}</td>
          <td>{{ item.product.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.cost }} &dollar;</td>
          <td>{{ purchaseOrder.buyer.firstName }} {{ purchaseOrder.buyer.lastName }}</td>
          <td>{{ new Date(purchaseOrder.departureDate).toLocaleString() }}</td>
        </tr>
      </tbody>
    </v-table>

    <span class="text-right w-75 mb-4">Total cost: {{ purchaseOrder.totalCost }} &dollar;</span>

    <v-btn-group>
      <v-btn color="primary" title="Pay an order" variant="tonal" @click="handlePayClick"
        >Pay an order</v-btn
      >

      <v-btn color="secondary" title="Change an order" variant="tonal" @click="handleChangeClick"
        >Change an order</v-btn
      >
    </v-btn-group>
  </template>

  <template v-if="success">
    <AlertCard
      class="mb-4"
      title="Congratulations!"
      text="Purchase order has been paid."
      type="success"
    />

    <v-btn-group>
      <v-btn color="primary" title="Continue shopping" variant="tonal" @click="handleContinueClick"
        >Continue shopping</v-btn
      >

      <v-btn color="secondary" title="Cancel an order" variant="tonal" @click="handleCancelClick"
        >Cancel an order</v-btn
      >
    </v-btn-group>
  </template>
</template>

<script lang="ts" setup>
import AlertCard from '@/components/AlertCard.vue'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { useUserStore } from '@/stores/user'
import { Route } from '@/types/route'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)
const { clear: clearOrder } = purchaseOrderStore

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const { updateBalance, restoreBalance } = userStore

const { selectRoute } = useNavigationDrawerStore()

const { clear: clearCart } = useShoppingCartStore()

const success = ref(false)

const handlePayClick = () => {
  if (user.value && purchaseOrder.value) {
    const balance = user.value.balance - purchaseOrder.value.totalCost

    updateBalance(balance)

    success.value = true
  }
}

const handleChangeClick = () => {
  clearOrder()

  selectRoute(Route.SHOPPING_CART)
}

const handleContinueClick = () => {
  clearOrder()
  clearCart()

  selectRoute(Route.MARKETPLACE)
}

const handleCancelClick = () => {
  restoreBalance()

  success.value = false
}
</script>
