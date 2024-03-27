import type { BackendUser, User } from '@/types/user'
import { defineStore } from 'pinia'

type ErrorHandler = (msg: Readonly<string>) => void
type LoadingChanger = () => void

type Id = 'user'

type State = {
  balanceBackup: User['balance'] | null
  user: User | null
}

type Getters = {
  username: (state: Readonly<State>) => string | null
}

type Actions = {
  empty: () => void
  getUser: (
    id: Readonly<User['id']>,
    onError: ErrorHandler,
    changeLoading: LoadingChanger
  ) => Promise<void>
  restoreBalance: () => void
  updateBalance: (balance: Readonly<User['balance']>) => void
}

/** Fetching user. */
const fetchUser = async (id: Readonly<User['id']>): Promise<BackendUser> | never => {
  const userResponse = await fetch(`https://dummyjson.com/users/${id}`)
  const userJson = await userResponse.json()

  return userJson as unknown as BackendUser
}

/** Getting a random balance. */
const getRandomBalance = (min: Readonly<number> = 0, max: Readonly<number> = 100) => {
  const randomNumber = Math.random() * (max - min) + min
  const fixedNumber = randomNumber.toFixed(2)

  return parseFloat(fixedNumber)
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
    balanceBackup: null,
    user: null
  }),
  actions: {
    empty() {
      this.user = null
    },
    restoreBalance() {
      if (this.user && this.balanceBackup) {
        this.user.balance = this.balanceBackup
      }
    },
    updateBalance(balance) {
      if (this.user) {
        const fixedNumber = parseFloat(balance.toFixed(2))

        this.balanceBackup = this.user.balance
        this.user = { ...this.user, balance: fixedNumber }
      }
    },
    async getUser(id, onError, changeLoading) {
      try {
        changeLoading()

        const backendUser = await fetchUser(id)

        if (!isValidUser(backendUser)) {
          throw new Error('User is not valid.')
        }

        this.user = {
          avatar: backendUser.image,
          balance: getRandomBalance(),
          firstName: backendUser.firstName,
          id: backendUser.id,
          lastName: backendUser.lastName
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
