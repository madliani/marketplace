<template>
  <v-card class="d-flex align-center justify-content" v-if="user && username" variant="elevated">
    <v-card-item class="v-card__item-avatar">
      <v-img :alt="username" :src="user.avatar" :title="username" height="128px" width="128px" />
    </v-card-item>
    <v-card-item class="v-card__item-info">
      <form @submit.prevent="submit">
        <span :title="username" class="d-block mb-4">{{ username }}</span>

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
import type { User } from '@/types/user'

import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'

type Form = Readonly<{
  userBalance: User['balance']
}>

const userStore = useUserStore()

const { user, username } = storeToRefs(userStore)
const { updateBalance } = userStore

const { handleSubmit } = useForm<Form>({
  initialValues: {
    userBalance: user.value?.balance ?? 0
  },
  validationSchema: {
    userBalance(value: Readonly<number>) {
      if (!Number.isNaN(value)) {
        return true
      }

      return 'The user balance must be a floating-point number.'
    }
  }
})

const userBalance = useField<User['balance']>('userBalance')

const submit = handleSubmit((values) => {
  const { userBalance: balance } = values

  updateBalance(balance)
})

const handleReset = () => {
  if (user.value) {
    userBalance.value.value = user.value.balance
  }
}
</script>

<style scoped>
.v-card {
  flex-direction: row;

  width: 50%;
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

    width: 75%;
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
