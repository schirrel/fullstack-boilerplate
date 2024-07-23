<script setup lang="ts">
const router = useRouter()
useHead({
  bodyAttrs: {
    class: 'h-full'
  }
})
onMounted(() =>{
  document.querySelector('html').className = '';
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>