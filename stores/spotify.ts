import { defineStore } from 'pinia'

export interface SpotifyCredentials {
  access_token?: string
  token_type?: string
  expires_in?: number
  state?: string
}

export interface SpotifyUser {
  id?: string
  display_name?: string
  images?: { url: string }[]
  state?: string
}

export const useClonify = defineStore('clonify', {
  state: () => ({
    credentials: useCookie<SpotifyCredentials>('clonify-credentials'),
    user: useCookie<SpotifyUser>('clonify-user'),
    isLoading: false,
    currentItemDisplayName: '',
  }),
  getters: {
    isConnected: (state) => !!state.credentials?.access_token,
    token: (state) => `${state.credentials?.token_type} ${state.credentials?.access_token}`,
  },
})