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
    :on-close="handleClose"
    title="Congratulations!"
    text="Order has been paid."
    v-if="success"
  />

  <v-btn-group>
    <v-btn @click="handlePayClick" color="primary" title="Pay an order" variant="elevated"
      >Pay an order</v-btn
    >

    <v-btn @click="handleCancelClick" color="secondary" title="Cancel an order" variant="elevated"
      >Cancel an order</v-btn
    >
  </v-btn-group>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import AlertSuccess from '@/components/AlertSuccess.vue'

import { usePurchaseOrderStore } from '@/stores/purchaseOrder'

const purchaseOrderStore = usePurchaseOrderStore()

const { purchaseOrder } = storeToRefs(purchaseOrderStore)
const { pay, cancel } = purchaseOrderStore

const success = ref(false)

const handleSuccess = () => {
  success.value = true
}

const handleClose = () => {
  success.value = false
}

const handlePayClick = () => {
  pay(handleSuccess)
}

const handleCancelClick = () => {
  cancel(handleSuccess)
}
</script>
