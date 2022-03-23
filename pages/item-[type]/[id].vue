<script setup>

const router = useRouter()
const route = useRoute()

const itemTypes = {
  album: 'Album',
  artist: 'Artiste',
  playlist: 'Playlist',
  track: 'Titre',
}

if (!itemTypes[route.params.type]) router.go(-1)

</script>