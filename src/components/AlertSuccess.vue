<template>
  <v-card variant="text">
    <v-card-item>
      <v-alert
        :text="text"
        :title="title"
        closable
        type="success"
        variant="elevated"
        @click:close="onClose"
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
