<template>
  <div
    :class="!show && 'opacity-0'" 
    class="flex justify-center items-center rounded-full w-13 h-13 bg-cl-primary shadow-2xl hover:scale-103 hover:brightness-105"
    @click="changeState"
  >
    <svg v-if="state" role="img" height="24" width="24" viewBox="0 0 24 24" class="Svg-sc-1bi12j5-0 hDgDGI"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>
    <div
      v-else 
      class="w-6.5 h-6.5 text-black i-teenyicons-play-solid" 
    />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'emit-force-show', show: boolean): void
}>()

const { show } = toRefs(props)

const state = ref(false)

const changeState = () => {
  state.value = !state.value
  emit('emit-force-show', state.value)
}

</script>