<template>
  <v-layout class="rounded rounded-md">
    <slot name="header"></slot>
    <slot name="content"></slot>
  </v-layout>
</template>

<style scoped>
.v-layout {
  min-height: 100%;
  min-width: 100%;
}
</style>
