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
          <v-btn color="primary" title="Buy" variant="tonal">Buy</v-btn>
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

import type { Product } from '@/types/products'

import { gotoMarketplace } from '@/router/router'
import { useNavigationDrawerStore } from '@/stores/navigationDrawer'
import { useProductStore } from '@/stores/product'
import { Routes } from '@/types/routes'

type Props = Readonly<{
  id: Product['id']
}>

const { id } = defineProps<Props>()

const productStore = useProductStore()

const { loading, product } = storeToRefs(productStore)
const { fetchProduct } = productStore

const { selectItem } = useNavigationDrawerStore()

const error = ref<Error | null>(null)

const handleError = (msg: string) => {
  error.value = new Error(msg)
}

const handleClose = () => {
  selectItem(Routes.HOME, gotoMarketplace)
}

onBeforeMount(async () => {
  await fetchProduct(id, handleError)
})
</script>
