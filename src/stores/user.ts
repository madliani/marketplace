import { defineStore } from 'pinia'

import type { BackendUser, User } from '@/types/user'

type ErrorHandler = (msg: Readonly<string>) => void

type Id = 'user'

type State = {
  user: User | null
  loading: boolean
}

type Getters = {
  username: (state: Readonly<State>) => string | null
}

type Actions = {
  clear: () => void
  fetchUser: (id: Readonly<User['id']>, onError: ErrorHandler) => Promise<void> | never
  updateBalance: (balance: Readonly<User['balance']>) => void
}

/** Getting a random integer between two values. */
const getRandomNumber = (min: Readonly<number>, max: Readonly<number>) => {
  const randomNumber = Math.random() * (max - min) + min
  const fixedPoint = randomNumber.toFixed(2)

  return parseFloat(fixedPoint)
}

/** Backend user validating. */
const isValidUser = (user: Readonly<BackendUser>) =>
  typeof user === 'object' &&
  typeof user.firstName === 'string' &&
  typeof user.id === 'number' &&
  typeof user.image === 'string' &&
  typeof user.lastName === 'string'

/** User default value. */
const user: Readonly<User | null> = null

export const useUserStore = defineStore<Id, State, Getters, Actions>('user', {
  state: () => ({
    user,
    loading: false
  }),
  actions: {
    clear() {
      this.user = user
    },
    updateBalance(balance) {
      const user = this.user

      if (user) {
        this.user = { ...user, balance }
      }
    },
    async fetchUser(id, onError) {
      try {
        this.loading = true

        const userResponse = await fetch(`https://dummyjson.com/users/${id}`)
        const userJson = await userResponse.json()

        if (userJson) {
          const user = userJson as unknown as BackendUser

          if (isValidUser(user)) {
            this.user = {
              avatar: user.image,
              balance: getRandomNumber(0, 1_000),
              firstName: user.firstName,
              id: user.id,
              lastName: user.lastName
            }
          }
        }
      } catch (exception: unknown) {
        this.user = user

        onError('Check your Internet connection or contact technical support.')

        console.error(exception)
      } finally {
        this.loading = false
      }
    }
  },
  getters: {
    username(state) {
      return state.user ? `${state.user.firstName} ${state.user.lastName}` : null
    }
  },
  persist: true
})
