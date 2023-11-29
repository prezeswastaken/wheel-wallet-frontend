<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";

const carStore = useCarStore();
const authStore = useAuthStore();

const route = useRoute();

onMounted(async () => {
  if (authStore.user != null) {
    await carStore.fetchCurrentCarByCarID(route.params.id as unknown as number);
  }
});
</script>

<template>
  <div
    v-if="carStore.currentCar"
    class="flex flex-col gap-10 p-10 mt-5 rounded-3xl bg-overlay-background-color"
  >
    <div>
      <p class="text-3xl text-header-color" v-if="authStore.user">
        {{ carStore.currentCar.model }}
      </p>
      <p v-if="carStore.currentCar.status != '(empty)'">
        {{ carStore.currentCar.status }}
      </p>
    </div>

    <div class="flex overflow-auto gap-10 p-10 rounded-3xl bg-background-color">
      <img
        class="h-32"
        v-for="photo in carStore.currentCar.photos"
        :src="`//localhost:8000/uploads/car_photos/${photo.content}`"
      />
    </div>
  </div>
  <div v-else>This car dosen't exist!</div>
</template>

<style scoped></style>
