<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";

const carStore = useCarStore();
const authStore = useAuthStore();

const route = useRoute();

const isAddingCarPhoto = ref(false);

async function fetchCurrentCar() {
  if (authStore.user != null) {
    await carStore.fetchCurrentCarByCarID(route.params.id as unknown as number);
  }
}

onMounted(async () => {
  await fetchCurrentCar();
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
      <div
        class="flex flex-col justify-center self-center w-32 h-32 rounded-3xl bg-overlay-background-color group"
      >
        <Button
          class="w-32 text-5xl text-center duration-300 group-hover:text-hover-color"
          @click="() => (isAddingCarPhoto = true)"
        >
          
        </Button>
      </div>
      <img
        class="h-32 rounded-3xl shadow-md"
        v-for="photo in carStore.currentCar.photos?.toReversed()"
        :src="`//localhost:8000/uploads/car_photos/${photo.content}`"
      />
    </div>
    <AddCarPhotoPanel
      @submit="
        () => {
          isAddingCarPhoto = false;
          fetchCurrentCar();
        }
      "
      v-if="isAddingCarPhoto"
    />
  </div>
  <div v-else>This car dosen't exist!</div>
</template>

<style scoped></style>
