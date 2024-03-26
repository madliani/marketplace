<template>
  <MainLayout>
    <template #content>
      <v-card class="h-80 w-75" v-if="product && !loading && !error" variant="elevated">
        <CarouselCycle :images="product.images" :title="product.title" height="350px" />

        <v-card-title :title="product.title">{{ product.title }}</v-card-title>

        <v-card-subtitle :title="`Price: ${product.price} $`"
          >Price: {{ product.price }} &dollar;</v-card-subtitle
        >

        <v-card-item>
          {{ product.description }}
        </v-card-item>

        <v-card-actions>
          <v-btn :title="productStatus()" @click="handleBuyClick" color="primary" variant="tonal">{{
            productStatus()
          }}</v-btn>
        </v-card-actions>
      </v-card>

      <ProgressCircular v-if="loading && !error" />

      <AlertError
        :on-close="handleClose"
        :text="error.message"
        title="Connection error!"
        v-if="error && !loading"
      />
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'

import AlertError from '@/components/AlertError.vue'
import CarouselCycle from '@/components/CarouselCycle.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import MainLayout from '@/layouts/MainLayout.vue'

import { ProductStatus, type Product } from '@/types/products'

import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductStore } from '@/stores/product'
import { useShoppingCartStore } from '@/stores/shoppingCart'
import { Route } from '@/types/route'

type Props = Readonly<{
  id: Product['id']
}>

const { id } = defineProps<Props>()

const productStore = useProductStore()

const { product } = storeToRefs(productStore)
const { getProduct } = productStore

const { selectRoute } = useNavigationDrawerStore()

const { addItem, deleteItem } = useShoppingCartStore()

const loading = ref(false)

const error = ref<Error | null>(null)

const changeLoading = () => {
  loading.value = !loading.value
}

const handleError = (msg: string) => {
  error.value = new Error(msg)
}

const handleClose = () => {
  selectRoute(Route.HOMEPAGE)
}

const handleBuyClick = () => {
  if (product.value) {
    switch (product.value.status) {
      case ProductStatus.FREE: {
        addItem(product.value.id)

        return
      }
      case ProductStatus.IN_CART: {
        deleteItem(product.value.id)

        return
      }
      case ProductStatus.ORDERED: {
        return
      }
      case ProductStatus.PURCHASED: {
        return
      }
    }
  }
}

/** Getting button title by product status. */
const productStatus = () => {
  if (product.value) {
    switch (product.value.status) {
      case ProductStatus.FREE: {
        return 'Buy'
      }
      case ProductStatus.IN_CART: {
        return 'In cart'
      }
      case ProductStatus.ORDERED: {
        return 'Ordered'
      }
      case ProductStatus.PURCHASED: {
        return 'Purchased'
      }
    }
  }
}

onBeforeMount(async () => {
  await getProduct(id, handleError, changeLoading)
})
</script>
