<script lang="ts" setup>
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
defineProps({ text: String });
</script>

<template>
  <button
    class="shadow-[#181926] shadow-lg flex justify-center items-center p-3 h-10 text-left uppercase rounded-3xl border border-transparent duration-300 hover:bg-transparent bg-button-active-main-color text-background-color hover:text-hover-color hover:border-hover-color"
  >
    <p>{{ text }}</p>
    <ArrowRightIcon class="mb-0.5 ml-1 w-6 h-5" />
  </button>
</template>

<style scoped></style>
