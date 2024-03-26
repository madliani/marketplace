<template>
  <v-card variant="text">
    <v-card-item>
      <v-alert
        :text="text"
        :title="title"
        @click:close="onClose"
        closable
        type="success"
        variant="elevated"
      />
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
type Props = Readonly<{
  onClose: () => void
  text: string
  title: string
}>

defineProps<Props>()
</script>
