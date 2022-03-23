export default defineNuxtPlugin(() => {
  return {
    provide: {
      itemTypes: {
        album: 'Album',
        artist: 'Artiste',
        playlist: 'Playlist',
        track: 'Titre',
      },
    }
  }
})