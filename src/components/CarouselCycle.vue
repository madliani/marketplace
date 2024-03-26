<template>
  <v-carousel cycle hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="image in images" :key="image" :src="image" />
  </v-carousel>
</template>

<script lang="ts" setup>
type Props = Readonly<{
  images: string[]
}>

defineProps<Props>()
</script>
