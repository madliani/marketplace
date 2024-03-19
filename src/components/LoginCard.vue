<template>
  <v-card v-if="!loading && !error" variant="elevated">
    <v-card-item>
      <form @submit.prevent="submit">
        <v-card-title class="text-center" title="Authorization">Authorization</v-card-title>

        <v-text-field
          :error-messages="userId.errorMessage.value"
          class="mb-2"
          clearable
          label="User id"
          title="User id"
          v-model="userId.value.value"
          variant="outlined"
        />

        <v-card-actions>
          <v-btn
            :disabled="isDisabled"
            color="primary"
            title="Login"
            type="submit"
            variant="elevated"
            >Login</v-btn
          >

          <v-btn
            :disabled="isDisabled"
            @click="handleReset"
            color="secondary"
            title="Clear"
            variant="elevated"
            >Clear</v-btn
          >
        </v-card-actions>
      </form>
    </v-card-item>
  </v-card>

  <ProgressCircular v-if="loading" />

  <ErrorAlert
    :on-close="handleClose"
    :text="error.message"
    title="Authorization failed!"
    v-if="error"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

import ErrorAlert from '@/components/ErrorAlert.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'

import type { User } from '@/types/user'

import { useUserStore } from '@/stores/user'

type Form = Readonly<{
  userId: number | null
}>

const userStore = useUserStore()

const { loading } = storeToRefs(userStore)
const { fetchUser } = userStore

const isDisabled = ref(true)
const error = ref<Error | null>(null)

const { handleReset, handleSubmit } = useForm<Form>({
  initialValues: {
    userId: null
  },
  validationSchema: {
    userId(value: Readonly<number | null>) {
      const minValue = 1
      const maxValue = 100

      if (value && !Number.isNaN(value) && value >= minValue && value <= maxValue) {
        isDisabled.value = false

        return true
      }

      isDisabled.value = true

      return 'The user id must be an integer in the range from 1 to 100.'
    }
  }
})

const userId = useField<User['id'] | null>('userId')

const handleError = (msg: string) => {
  error.value = new Error(msg)
}

const handleClose = () => {
  error.value = null
}

const submit = handleSubmit(async (values) => {
  const { userId: id } = values

  if (id) {
    await fetchUser(id, handleError)

    handleReset()
  }
})
</script>

<style scoped>
.v-card {
  width: 50%;
}

@media only screen and (width <= 360px) {
  .v-card {
    width: 75%;
  }
}
</style>
