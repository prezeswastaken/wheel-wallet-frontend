<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

import { useAuthStore } from "~/stores/useAuthStore";
import { LogType } from "~/types/LogType";

const authStore = useAuthStore();
const logs = ref<Array<LogType> | null>(null);

onMounted(async () => {
  const userID = authStore.user?.id as number;
  const response = await useApiFetch(`/api/user/${userID}/logs`);
  logs.value = response.data.value as Array<LogType>;
  console.log(logs.value);
});

function parseDate(date: string) {
  const dateObject = new Date(date);

  // Options for formatting the output
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;

  // Format the date as a string
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  console.log(formattedDate); // Output: Thu Dec 21 2023
  return formattedDate;
}
</script>

<template>
  <div
    class="grid relative grid-cols-4 gap-5 p-5 rounded-3xl bg-overlay-background-color"
  >
    <p v-if="logs?.length == 0">You dont have any logs yet!</p>
    <div
      v-else
      v-for="log in logs"
      class="flex justify-between p-5 rounded-3xl shadow-lg bg-background-color shadow-background-color"
    >
      <div class="flex flex-col gap-3">
        <p v-if="logs?.indexOf(log) !== undefined">
          󰻾
          {{ logs.indexOf(log) + 1 }}
        </p>

        <p>󰇰 {{ log.message }}</p>
        <p> {{ log.username }}</p>
        <p> {{ parseDate(log.created_at) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
