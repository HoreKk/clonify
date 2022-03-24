import { useClonify } from "~~/stores/spotify"

export default defineNuxtPlugin(() => {

  const clonifyStore = useClonify()

  const getArtistNames = (artists: { name: string }[]) => {
    return artists?.length < 3
      ? artists?.map(({ name }) => name).join(', ')
      : `${artists?.filter((_, i) => i <= 2 ).map(({ name }) => name).join(', ')} et bien plus`
  }

  return {
    provide: {
      itemTypes: {
        album: 'Album',
        artist: 'Artiste',
        playlist: 'Playlist',
        track: 'Titre',
      },
      itemDescription: (name, { description = null, artists = null }) => {
        return {
          album: artists && getArtistNames(artists),
          artist: name,
          playlist: description ? description : `Par ${clonifyStore.user?.display_name}`,
          track: name,
        }
      },
    }
  }
})