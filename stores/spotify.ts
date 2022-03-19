import { defineStore } from 'pinia'

import { useStorage } from '@vueuse/core'

export interface SpotifyCredentials {
  access_token?: string
  token_type?: string
  expires_in?: number
  state?: string
}

export const useClonify = defineStore('clonify', {
  state: () => ({
    credentials: useCookie<SpotifyCredentials>('clonify-credentials'),
    user: useCookie('clonify-user'),
  }),
  getters: {
    isConnected: (state) => state.credentials?.access_token,
    token: (state) => `${state.credentials?.token_type} ${state.credentials?.access_token}`,
  },
})