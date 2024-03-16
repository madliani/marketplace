<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useField, useForm } from 'vee-validate'

const { fetchUser } = useUserStore()

const { handleReset, handleSubmit } = useForm({
  initialValues: {
    userId: ''
  },
  validationSchema: {
    userId(value: string) {
      const id = parseInt(value)

      if (!Number.isNaN(id)) {
        return true
      }

      return 'The user id must be an integer.'
    }
  }
})

const userId = useField('userId')

const submit = handleSubmit((values) => {
  const { userId: id } = values

  fetchUser(id)
  handleReset()
})
</script>

<template>
  <v-card class="w-75" variant="elevated">
    <v-card-item>
      <form @submit.prevent="submit">
        <p class="text-center text-h5 mb-2">Authorization</p>

        <v-text-field
          :counter="10"
          :error-messages="userId.errorMessage.value"
          class="mb-2"
          clearable
          label="User id"
          v-model="userId.value.value"
          variant="outlined"
        />

        <v-btn class="mr-4" color="primary" type="submit" variant="elevated">Login</v-btn>

        <v-btn @click="handleReset" color="secondary" variant="elevated">Clear</v-btn>
      </form>
    </v-card-item>
  </v-card>
</template>
