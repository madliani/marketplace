import type { BackendUser, User } from '@/types/user'
import { defineStore } from 'pinia'

type Id = 'user'

type State = {
  user: User | null
}

type Getters = {}

type Actions = Readonly<{
  fetchUser: (id: User['id']) => Promise<void>
  clear: () => void
}>

/** Getting a random integer between two values. */
const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

/** Backend user validating. */
const isValidUser = (user: BackendUser) => {
  return (
    typeof user.firstName === 'string' &&
    typeof user.id === 'number' &&
    typeof user.image === 'string' &&
    typeof user.lastName === 'string'
  )
}

/** User default value. */
const user: User | null = null

export const useUserStore = defineStore<Id, State, Getters, Actions>('user', {
  state: () => ({
    user
  }),
  actions: {
    async fetchUser(id) {
      try {
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
      }
    },
    clear() {
      this.user = user
    }
  },
  persist: true
})
