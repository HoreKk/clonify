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

export interface CurrentItem {
  display_name: string
  color: string
}

const defaultItem: CurrentItem = {
  display_name: '',
  color: '28,28,28',
}

export const useClonify = defineStore('clonify', {
  state: () => ({
    credentials: useCookie<SpotifyCredentials>('clonify-credentials'),
    user: useCookie<SpotifyUser>('clonify-user'),
    isLoading: false,
    currentItem: defaultItem,
  }),
  getters: {
    isConnected: (state) => !!state.credentials?.access_token,
    token: (state) => `${state.credentials?.token_type} ${state.credentials?.access_token}`,
  },
})