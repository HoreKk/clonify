<template>
  <Html lang="en-US">
    <Head>
      <Title>Clonify</Title>
    </Head>
  </Html>
  <div id="app" class="h-full">
    <div class="flex flex-col h-full">
      <div class="flex flex-1">
        <CoreSidebar class="w-20%" />
        <NuxtPage class="w-auto"/>
      </div>
      <CorePlayerbar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/tailwind.css'
</script>