<template>
  <v-card variant="elevated">
    <v-card-item>
      <form @submit.prevent="submit">
        <span class="d-block text-center text-h5 mb-2" title="Authorization">Authorization</span>

        <v-text-field
          :counter="10"
          :error-messages="userId.errorMessage.value"
          class="mb-2"
          clearable
          label="User id"
          title="User id"
          v-model="userId.value.value"
          variant="outlined"
        />

        <v-card-actions>
          <v-btn color="primary" title="Login" type="submit" variant="elevated">Login</v-btn>

          <v-btn @click="handleReset" color="secondary" title="Clear" variant="elevated"
            >Clear</v-btn
          >
        </v-card-actions>
      </form>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
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

      return 'The user id must be an integer in the range from 1 to 100.'
    }
  }
})

const submit = handleSubmit(async (values) => {
  const { userId: id } = values

  await fetchUser(id)

  handleReset()
})

const userId = useField('userId')
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
