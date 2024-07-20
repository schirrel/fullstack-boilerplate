<script setup lang="ts">
const router = useRouter()
useHead({
  bodyAttrs: {
    class: 'h-full bg-white'
  }
})
</script>

<template>
  <!-- <NuxtExample dir="routing/pages" :nav="nav" current-route>
    <NuxtLoadingIndicator /> -->
  <main>
    <NuxtPage />
  </main>
  <!-- </NuxtExample> -->
</template>
