<template>
  <v-carousel
    :cycle="cycle"
    :hide-delimiter-background="hideDelimiterBackground"
    :show-arrows="showArrows"
  >
    <v-carousel-item :key="image" :src="image" :cover="cover" v-for="image in images" />
  </v-carousel>
</template>

<script lang="ts" setup>
type Props = Readonly<{
  cover?: boolean
  cycle?: boolean
  hideDelimiterBackground?: boolean
  images: string[]
  showArrows?: boolean | 'hover'
}>

defineProps<Props>()
</script>
