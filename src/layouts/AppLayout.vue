<template>
  <v-layout class="rounded rounded-md">
    <slot name="app-bar"></slot>
    <slot name="router-view"></slot>
  </v-layout>
</template>

<style scoped>
.v-layout {
  min-height: 100%;
  min-width: 100%;
}
</style>
