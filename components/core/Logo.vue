<template>
  <div class="flex items-center text-white">
    <div class="text-11 i-emojione-monotone-cyclone text-white" />
    <h1 v-if="clonifyStore.isConnected" class="font-bold ml-1 text-3xl">Clonify</h1>
    <div v-else class="w-28 h-4 ml-2 rounded-lg bg-cl-card-hover"></div>
  </div>
</template>

<script lang="ts" setup>

import { useClonify } from '~~/stores/spotify';

const clonifyStore = useClonify()

</script>