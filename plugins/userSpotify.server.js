import { useClonify } from '~/stores/spotify'

export default defineNuxtPlugin(async (nuxtApp) => {

  const getUser = async () => {
    const clonifyStore = useClonify(nuxtApp.$pinia)
  
    if (clonifyStore.credentials) {
      try {
        const user = await $fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `${clonifyStore.credentials.token_type} ${clonifyStore.credentials.access_token}`,
            'Content-Type': 'application/json',
          },
        })
      
        clonifyStore.$patch((state) => {
          state.user = user
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  await getUser()

  return {
    provide: {
      fetchUser: getUser,
    }
  }
})
