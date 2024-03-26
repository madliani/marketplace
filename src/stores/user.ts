import type { BackendUser, User } from '@/types/user'
import { defineStore } from 'pinia'

type ErrorHandler = (msg: Readonly<string>) => void
type LoadingChanger = () => void

type Id = 'user'

type State = {
  balanceBackup: User['balance']
  user: User | null
}

type Getters = {
  username: (state: Readonly<State>) => string | null
}

type Actions = {
  clear: () => void
  fetchUser: (
    id: Readonly<User['id']>,
    onError: ErrorHandler,
    changeLoading: LoadingChanger
  ) => Promise<void> | never
  restoreBalance: () => void
  updateBalance: (balance: Readonly<User['balance']>) => void
}

/** Getting a random integer between two values. */
const getRandomNumber = (min: Readonly<number>, max: Readonly<number>) => {
  const randomNumber = Math.random() * (max - min) + min
  const fixedPoint = randomNumber.toFixed(2)

  return parseFloat(fixedPoint)
}

/** Backend user validating. */
const isValidUser = (user: Readonly<BackendUser>) => {
  return (
    typeof user === 'object' &&
    typeof user.firstName === 'string' &&
    typeof user.id === 'number' &&
    typeof user.image === 'string' &&
    typeof user.lastName === 'string'
  )
}

export const useUserStore = defineStore<Id, State, Getters, Actions>('user', {
  state: () => ({
    balanceBackup: 0,
    user: null
  }),
  actions: {
    clear() {
      this.user = null
    },
    restoreBalance() {
      if (this.user) {
        this.user.balance = this.balanceBackup
      }
    },
    updateBalance(balance) {
      const user = this.user

      if (user) {
        this.balanceBackup = user.balance
        this.user = { ...user, balance }
      }
    },
    async fetchUser(id, onError, changeLoading) {
      try {
        changeLoading()

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
        this.user = null

        onError('Check your Internet connection or contact technical support.')

        console.error(exception)
      } finally {
        changeLoading()
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
