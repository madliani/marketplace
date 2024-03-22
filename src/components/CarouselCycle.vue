<template>
  <v-carousel cycle hide-delimiter-background show-arrows="hover">
    <v-carousel-item :key="image" :src="image" v-for="image in images" />
  </v-carousel>
</template>

<script lang="ts" setup>
type Props = Readonly<{
  images: string[]
}>

defineProps<Props>()
</script>
