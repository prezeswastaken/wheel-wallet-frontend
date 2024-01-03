// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@samk-dev/nuxt-vcalendar"],
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    public: {
      laravelApiUrl: "http://localhost:8000", // can be overridden by NUXT_PUBLIC_LARAVEL_URL environment variable
      frontendUrl: "http://localhost:3000",
    },
  },
});
