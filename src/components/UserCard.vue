<template>
  <v-card v-if="user && username" variant="elevated">
    <v-card-item class="v-card__item-avatar">
      <v-avatar :image="user.avatar" :title="username" alt="User avatar" size="128px" />
    </v-card-item>
    <v-card-item class="v-card__item-info">
      <v-form @submit.prevent="submit">
        <v-card-title :title="username" class="text-center mb-2">{{ username }}</v-card-title>

        <v-text-field
          v-model="userBalance.value.value"
          :error-messages="userBalance.errorMessage.value"
          :title="`Balance: ${userBalance.value.value} $`"
          class="mb-2"
          label="Balance"
          variant="outlined"
        />

        <v-card-actions>
          <v-btn :disabled="isDisabled" color="primary" type="submit" title="Update" variant="tonal"
            >Update</v-btn
          >

          <v-btn color="secondary" title="Reset" variant="tonal" @click="handleReset">Reset</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'

type Form = Readonly<{
  userBalance: string
}>

const userStore = useUserStore()

const { user, username } = storeToRefs(userStore)
const { updateBalance } = userStore

const isDisabled = ref(false)

const { handleSubmit } = useForm<Form>({
  initialValues: {
    userBalance: user.value?.balance.toString() ?? ''
  },
  validationSchema: {
    userBalance(value: Readonly<Form['userBalance']>) {
      /**
       * `Number` instead of `parseFloat` is chosen because
       * it handles strings with mixed content (e.g. "1a") with error.
       */
      const balance = value !== '' ? Number(value) : NaN

      if (!Number.isNaN(balance) && balance >= 0) {
        isDisabled.value = false

        return true
      }

      isDisabled.value = true

      return 'The user balance must be a positive floating-point number.'
    }
  }
})

const userBalance = useField<Form['userBalance']>('userBalance')

const handleReset = () => {
  if (user.value) {
    userBalance.value.value = user.value.balance.toString()
  }
}

const submit = handleSubmit((values) => {
  const balance = parseFloat(values.userBalance)

  updateBalance(balance)
})
</script>

<style scoped>
.v-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 50vw;
}

.v-card__item-avatar {
  width: 25%;
}

.v-card__item-info {
  width: 75%;
}

@media only screen and (width <= 360px) {
  .v-card {
    flex-direction: column;

    width: 75vw;
  }

  .v-card__item-avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
  }

  .v-card__item-info {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    text-align: center;
  }
}
</style>
