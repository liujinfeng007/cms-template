import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    token: ''
  }),
  persist: true
})
