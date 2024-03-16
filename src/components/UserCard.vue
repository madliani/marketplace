<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { updateBalance } = userStore

const { handleSubmit } = useForm({
  initialValues: {
    userBalance: user.value?.balance ?? 0
  },
  validationSchema: {
    userBalance(value: string) {
      const balance = parseFloat(value)

      if (!Number.isNaN(balance)) {
        return true
      }

      return 'The user balance must be a float number.'
    }
  }
})

const userBalance = useField('userBalance')

const submit = handleSubmit((values) => {
  const { userBalance: balance } = values

  updateBalance(balance)
})

const reset = () => {
  if (user) {
    userBalance.value.value = user.value?.balance
  }
}
</script>

<template>
  <v-card class="d-flex align-items justify-content" v-if="user" variant="elevated">
    <v-card-item class="v-card__item-avatar">
      <v-img :src="user.avatar" :width="128" alt="User avatar" title="User avatar" />
    </v-card-item>
    <v-card-item class="v-card__item-info">
      <form @submit.prevent="submit">
        <span class="d-block mb-4" :title="`${user.firstName} ${user.lastName}`"
          >{{ user.firstName }} {{ user.lastName }}</span
        >

        <v-text-field
          :counter="10"
          :error-messages="userBalance.errorMessage.value"
          :title="`Balance: ${userBalance.value.value} $`"
          class="mb-2"
          label="Balance"
          v-model="userBalance.value.value"
          variant="outlined"
        />

        <v-btn
          :title="`${user.firstName} ${user.lastName}`"
          class="mr-4"
          color="primary"
          type="submit"
          variant="elevated"
          >Update</v-btn
        >

        <v-btn @click="reset" color="secondary" title="Reset" variant="elevated">Reset</v-btn>
      </form>
    </v-card-item>
  </v-card>
</template>

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

@media screen and (width <= 360px) {
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
