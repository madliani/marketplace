<template>
  <template v-if="purchaseOrder && purchaseOrder.buyer && purchaseOrder.departureDate && !success">
    <v-table class="w-75 mb-2" fixed-header>
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
      <v-btn color="primary" title="Pay order" variant="tonal" @click="handlePayClick"
        >Pay order</v-btn
      >

      <v-btn color="secondary" title="Change order" variant="tonal" @click="handleChangeClick"
        >Change order</v-btn
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

      <v-btn color="secondary" title="Cancel order" variant="tonal" @click="handleCancelClick"
        >Cancel order</v-btn
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

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder, success } = storeToRefs(purchaseOrderStore)
const { changeSuccess, empty: emptyOrder } = purchaseOrderStore

const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const { updateBalance, restoreBalance } = userStore
const { selectRoute } = useNavigationDrawerStore()
const { empty: emptyCart } = useShoppingCartStore()

const handlePayClick = () => {
  if (user.value && purchaseOrder.value) {
    const balance = user.value.balance - purchaseOrder.value.totalCost

    updateBalance(balance)

    changeSuccess(true)
  }
}

const handleChangeClick = () => {
  emptyOrder()

  selectRoute(Route.SHOPPING_CART)
}

const handleContinueClick = () => {
  emptyOrder()
  emptyCart()

  selectRoute(Route.MARKETPLACE)
}

const handleCancelClick = () => {
  restoreBalance()

  changeSuccess(false)
}
</script>
