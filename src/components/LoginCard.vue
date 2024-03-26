<template>
  <v-card v-if="!loading && !error" variant="elevated">
    <v-card-item>
      <v-form @submit.prevent="submit">
        <v-card-title class="text-center mb-2" title="Authorization">Authorization</v-card-title>

        <v-text-field
          v-model="userId.value.value"
          :error-messages="userId.errorMessage.value"
          class="mb-2"
          clearable
          label="User id"
          title="User id"
          variant="outlined"
        />

        <v-card-actions>
          <v-btn :disabled="isDisabled" color="primary" title="Login" type="submit" variant="tonal"
            >Login</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>

  <ProgressCircular v-if="loading && !error" />

  <AlertError
    v-if="error && !loading"
    :on-close="handleClose"
    :text="error.message"
    title="Authorization failed!"
  />
</template>

<script lang="ts" setup>
import AlertError from '@/components/AlertError.vue'
import ProgressCircular from '@/components/ProgressCircular.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

type Form = Readonly<{
  userId: string
}>

const userStore = useUserStore()

const { loading } = storeToRefs(userStore)
const { fetchUser } = userStore

const isDisabled = ref(true)

const error = ref<Error | null>(null)

const { handleReset, handleSubmit } = useForm<Form>({
  initialValues: {
    userId: ''
  },
  validationSchema: {
    userId(value: Readonly<Form['userId']>) {
      const id = parseInt(value)
      const minValue = 1
      const maxValue = 100

      if (!Number.isNaN(id) && id >= minValue && id <= maxValue) {
        isDisabled.value = false

        return true
      }

      isDisabled.value = true

      return 'The user id must be an integer in the range from 1 to 100.'
    }
  }
})

const userId = useField<Form['userId']>('userId')

const handleError = (msg: string) => {
  error.value = new Error(msg)
}

const handleClose = () => {
  error.value = null
}

const submit = handleSubmit(async (values) => {
  const id = parseInt(values.userId)

  await fetchUser(id, handleError)

  handleReset()
})
</script>

<style scoped>
.v-card {
  width: 50vw;
}

@media only screen and (width <= 360px) {
  .v-card {
    width: 75vw;
  }
}
</style>
