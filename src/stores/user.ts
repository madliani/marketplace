import type { BackendUser, User } from '@/types/user'
import { defineStore } from 'pinia'

type Id = 'user'

type State = {
  user: User | null
  loading: boolean
}

type Getters = {}

type Actions = Readonly<{
  clear: () => void
  fetchUser: (id: User['id']) => Promise<void> | never
  updateBalance: (balance: User['balance']) => void
}>

/** Getting a random integer between two values. */
const getRandomNumber = (min: number, max: number) => {
  const randomNumber = Math.random() * (max - min) + min
  const fixedPoint = randomNumber.toFixed(2)

  return parseFloat(fixedPoint)
}

/** Backend user validating. */
const isValidUser = (user: BackendUser) =>
  typeof user.firstName === 'string' &&
  typeof user.id === 'number' &&
  typeof user.image === 'string' &&
  typeof user.lastName === 'string'

/** User default value. */
const user: User | null = null

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
    async fetchUser(id) {
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
              id: user.id.toString(),
              lastName: user.lastName
            }
          }
        }
      } catch (exception: unknown) {
        console.error(exception)
      } finally {
        this.loading = false
      }
    }
  },
  persist: true
})
