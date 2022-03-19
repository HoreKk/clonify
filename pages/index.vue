<template>
  <div>
    <div class="flex flex-col items-center mx-10 text-white">
      <template v-if="!pending && topItems?.items">
        <div v-for="item in topItems?.items" :key="item.id">
          {{ item.album.name }}
        </div>
      </template>
      <template v-else>
        Loading...
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClonify } from '~~/stores/spotify';

const clonifyStore = useClonify();

const { data: topItems, pending } = await useApi('/v1/me/top/tracks', {
  params: {
    time_range: 'short_term',
    limit: 20,
  },
});


</script>

