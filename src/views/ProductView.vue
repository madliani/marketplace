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
          <v-btn
            :title="getTitleByStatus(product.status)"
            @click="handleBuyClick"
            color="primary"
            variant="tonal"
            >{{ getTitleByStatus(product.status) }}</v-btn
          >
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

import { Status, type Product } from '@/types/products'

import { gotoMarketplace } from '@/router/router'
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

const { selectItem } = useNavigationDrawerStore()

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
  selectItem(Route.HOME, gotoMarketplace)
}

const handleBuyClick = () => {
  if (product.value) {
    switch (product.value.status) {
      case Status.FREE: {
        addItem(product.value.id)

        return
      }
      case Status.IN_CART: {
        deleteItem(product.value.id)

        return
      }
      case Status.ORDERED: {
        return
      }
      case Status.PURCHASED: {
        return
      }
    }
  }
}

/** Getting button title by product status. */
const getTitleByStatus = (status: Readonly<Status>) => {
  switch (status) {
    case Status.FREE: {
      return 'Buy'
    }
    case Status.IN_CART: {
      return 'In cart'
    }
    case Status.ORDERED: {
      return 'Ordered'
    }
    case Status.PURCHASED: {
      return 'Purchased'
    }
  }
}

onBeforeMount(async () => {
  await getProduct(id, handleError, changeLoading)
})
</script>
