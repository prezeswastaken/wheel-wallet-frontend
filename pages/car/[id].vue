<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";

const carStore = useCarStore();
const authStore = useAuthStore();

const route = useRoute();

onMounted(async () => {
  if (authStore.user != null) {
    await carStore.fetchCurrentCarByCarID(route.params.id as number);
  }
});
</script>

<template>
  <div>
    ID:
    {{ carStore.currentCar ? carStore.currentCar.id : "Car didnt load yet" }}
    <img
      v-if="carStore.currentCar?.photos && carStore.currentCar.photos[0]"
      :src="`//localhost:8000/uploads/car_photos/${carStore.currentCar?.photos[0].content}`"
    />
  </div>
</template>

<style scoped></style>
