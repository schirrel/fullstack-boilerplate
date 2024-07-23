// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  extends: [
    '@nuxt/examples-ui'
  ],
  modules: ["@nuxt/icon", "@nuxt/ui", "@pinia/nuxt"],
  colorMode: {
    preference: "light",
  },
  tailwindcss: {
    viewer: false
    // viewer: { endpoint: '/_tailwind', exportViewer: true }
  },
  icon: {
    componentName: 'NuxtIcon'
  }
})