// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@samk-dev/nuxt-vcalendar"],
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
