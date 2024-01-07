<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";

const auth = useAuthStore();
</script>

<template>
  <div
    class="p-10 w-screen min-h-screen font-myMono bg-background-color text-text-color"
  >
    <TopBar />

    <slot />
  </div>
</template>

<style scoped></style>
