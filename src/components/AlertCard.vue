<template>
  <v-card variant="text">
    <v-card-item>
      <v-alert
        :text="text"
        :closable="!!onClose"
        :title="title"
        :type="type"
        variant="elevated"
        @click:close="onClose"
      />
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
type Props = Readonly<{
  text: string
  title: string
  type: 'error' | 'info' | 'success'
  onClose?: () => void
}>

defineProps<Props>()
</script>
