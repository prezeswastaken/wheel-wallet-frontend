<script setup lang="ts">
useSeoMeta({
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
  title: "Wheel Wallet - Keep your car budget rolling",
  ogTitle: "Wheel Wallet",
  description:
    "Hey there, fellow road enthusiasts! Ready to embark on a journey of hassle-free car management? Look no further than Wheel Wallet - the coolest ride companion you never knew you needed!",
  ogDescription:
    "Hey there, fellow road enthusiasts! Ready to embark on a journey of hassle-free car management? Look no further than Wheel Wallet - the coolest ride companion you never knew you needed!",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
