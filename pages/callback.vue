<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>

import type { SpotifyCredentials } from '~/stores/spotify'
import { useClonify } from '~/stores/spotify';

const clonifyStore = useClonify()
const route = useRoute()
const nuxtApp = useNuxtApp()

clonifyStore.isLoading = true

if (route.hash) {
  let search = route.hash.replace('#', '')
  let spotifyCredentials: SpotifyCredentials = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  nuxtApp.$cookies.set('clonify-credentials', spotifyCredentials, {
    maxAge: spotifyCredentials.expires_in,
    path: '/',
  })

  nuxtApp.$cookies.set('clonify-auth-token', `${spotifyCredentials.token_type} ${spotifyCredentials.access_token}`, {
    maxAge: spotifyCredentials.expires_in,
    path: '/',
  })

  const { data: user } = await useApi('/v1/me', {
    headers: {
      Authorization: `${spotifyCredentials.token_type} ${spotifyCredentials.access_token}`,
    },
    server: false,
  })

  watch(user, async (newUser) => {
    nuxtApp.$cookies.set('clonify-user', newUser, {
      maxAge: spotifyCredentials.expires_in,
      path: '/',
    })
    clonifyStore.isLoading = false
    window.location.href = '/'
  })
}




</script>