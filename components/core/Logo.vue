<template>
  <div class="flex items-center text-white">
    <div class="text-11 i-emojione-monotone-cyclone text-white mr-2" />
    <Text tag="h1" text="Clonify" classes="font-bold text-3xl" width="w-28" height="h-4" />
  </div>
</template>

<script lang="ts" setup>

import { useClonify } from '~~/stores/spotify';

const clonifyStore = useClonify()

</script>