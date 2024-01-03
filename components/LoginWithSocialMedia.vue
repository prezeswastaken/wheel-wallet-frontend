<script lang="ts" setup>
const config = useRuntimeConfig();
</script>

<template>
  <div class="flex flex-col gap-5">
    <hr class="mt-5 mb-5 h-px border-0 bg-text-color" />
    <p class="text-center uppercase text-text-color">
      or login with social media
    </p>
    <NuxtLink
      class="flex gap-4 justify-center items-center p-5 text-center uppercase rounded-3xl border duration-300 text-blue-lighter-color border-blue-lighter-color hover:text-hover-color hover:border-hover-color"
      :to="`${config.public.laravelApiUrl}/login/discord`"
    >
      login with discord
      <p class="text-4xl">󰙯</p>
    </NuxtLink>
    <NuxtLink
      class="flex gap-6 justify-center items-center p-5 text-center uppercase rounded-3xl border duration-300 text-blue-lighter-color border-blue-lighter-color hover:text-hover-color hover:border-hover-color"
      :to="`${config.public.laravelApiUrl}/login/github`"
    >
      login with github
      <p class="text-4xl"></p>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
