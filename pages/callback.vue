<script lang="ts" setup>

import type { SpotifyCredentials } from '~/stores/spotify'
import { useClonify } from '~/stores/spotify'

const route = useRoute()
const router = useRouter()
const nuxtApp = useNuxtApp()
const clonifyStore = useClonify()

if (route.hash) {
  let search = route.hash.replace('#', '')
  let spotifyCredentials: SpotifyCredentials =  JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  nuxtApp.$cookies.set('clonify-credentials', spotifyCredentials, {
    maxAge: spotifyCredentials.expires_in,
    path: '/',
  })
}

router.push('/')

</script>