<template>
  <v-card v-if="user && username" variant="elevated">
    <v-card-item class="v-card__item-avatar">
      <v-avatar :image="user.avatar" :title="username" alt="User avatar" size="128px" />
    </v-card-item>
    <v-card-item class="v-card__item-info">
      <form @submit.prevent="submit">
        <v-card-title :title="username" class="text-center mb-2">{{ username }}</v-card-title>

        <v-text-field
          :error-messages="userBalance.errorMessage.value"
          :title="`Balance: ${userBalance.value.value} $`"
          class="mb-2"
          label="Balance"
          v-model="userBalance.value.value"
          variant="outlined"
        />

        <v-card-actions>
          <v-btn color="primary" type="submit" title="Update" variant="elevated">Update</v-btn>

          <v-btn @click="handleReset" color="secondary" title="Reset" variant="elevated"
            >Reset</v-btn
          >
        </v-card-actions>
      </form>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'

import type { User } from '@/types/user'

import { useUserStore } from '@/stores/user'

type Form = Readonly<{
  userBalance: User['balance'] | null
}>

const userStore = useUserStore()

const { user, username } = storeToRefs(userStore)
const { updateBalance } = userStore

const { handleSubmit } = useForm<Form>({
  initialValues: {
    userBalance: user.value?.balance
  },
  validationSchema: {
    userBalance(value: Readonly<Form['userBalance']>) {
      if (!Number.isNaN(value)) {
        return true
      }

      return 'The user balance must be a floating-point number.'
    }
  }
})

const userBalance = useField<Form['userBalance']>('userBalance')

const handleReset = () => {
  if (user.value) {
    userBalance.value.value = user.value.balance
  }
}

const submit = handleSubmit((values) => {
  const { userBalance: balance } = values

  if (balance) {
    updateBalance(balance)
  }
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
