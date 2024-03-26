<template>
  <template v-if="purchaseOrder && purchaseOrder.buyer && !success">
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
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in purchaseOrder.items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.product.title }}</td>
          <td>{{ item.product.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.cost }} &dollar;</td>
        </tr>
      </tbody>
    </v-table>

    <span class="text-right w-75 mb-4">Total cost: {{ purchaseOrder.totalCost }} &dollar;</span>

    <v-table class="w-75 mb-4" fixed-header>
      <caption class="text-h6">
        Buyer
      </caption>

      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">First name</th>
          <th class="text-left">Last name</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>{{ purchaseOrder.buyer.firstName }}</td>
          <td>{{ purchaseOrder.buyer.lastName }}</td>
        </tr>
      </tbody>
    </v-table>
  </template>

  <AlertSuccess
    v-if="success"
    :on-close="handleCloseClick"
    title="Congratulations!"
    text="Order has been paid."
  />

  <v-btn-group>
    <v-btn color="primary" title="Pay an order" variant="outlined" @click="handlePayClick"
      >Pay an order</v-btn
    >

    <v-btn color="secondary" title="Cancel an order" variant="outlined" @click="handleCancelClick"
      >Cancel an order</v-btn
    >
  </v-btn-group>
</template>

<script lang="ts" setup>
import AlertSuccess from '@/components/AlertSuccess.vue'
import { usePurchaseOrderStore } from '@/stores/purchaseOrder'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)

const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const { updateBalance } = userStore

const success = ref(false)

const handleCloseClick = () => {
  success.value = false
}

const handleCancelClick = () => {
  success.value = true
}

const handlePayClick = () => {
  if (user.value && purchaseOrder.value) {
    const balance = user.value.balance - purchaseOrder.value.totalCost

    updateBalance(balance)
  }
}
</script>
