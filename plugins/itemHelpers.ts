import { useClonify } from "~~/stores/spotify"

export default defineNuxtPlugin(() => {

  const clonifyStore = useClonify()

  return {
    provide: {
      itemTypes: {
        album: 'Album',
        artist: 'Artiste',
        playlist: 'Playlist',
        track: 'Titre',
      },
      itemDescription: (name, description = null) => {
        return {
          album: name,
          artist: name,
          playlist: description ? description : `Par ${clonifyStore.user?.display_name}`,
          track: name,
        }
      },
    }
  }
})