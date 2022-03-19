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
        <div class="w-full bg-cl-black-2 relative">
          <CoreHeaderbar class="absolute top-0" />
          <NuxtPage class="w-full bg-cl-black-2 mt-10"/>
        </div>
      </div>
      <CorePlayerbar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/tailwind.css'
</script>