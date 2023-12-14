<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";

const carStore = useCarStore();
const authStore = useAuthStore();

const route = useRoute();

const isAddingCarPhoto = ref(false);

const showCarCode = ref(false);

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
    class="flex flex-col gap-5 p-10 mt-5 rounded-3xl bg-overlay-background-color"
  >
    <div class="flex justify-between">
      <div>
        <p class="text-3xl text-header-color" v-if="authStore.user">
          {{ carStore.currentCar.model }}
        </p>
        <p v-if="carStore.currentCar.status != '(empty)'">
          {{ carStore.currentCar.status }}
        </p>
      </div>
      <div class="flex gap-5 items-center">
        <div class="flex flex-col items-center" v-if="showCarCode">
          <p class="p-3 text-3xl rounded-3xl bg-expense-color w-fit">
            {{ carStore.currentCar.code }}
          </p>
          <p>
            Give above code to co-owner of this car, so they can use it to add
            this car to their garage
          </p>
        </div>
        <button
          class="flex justify-center items-center p-3 h-10 text-left uppercase rounded-3xl border border-transparent duration-300 hover:bg-transparent bg-header-color text-background-color hover:text-header-color hover:border-header-color"
          @click="showCarCode = !showCarCode"
        >
          {{ showCarCode ? "hide car code" : "show car code" }}
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-10 p-10 rounded-3xl bg-background-color">
      <h2 class="text-3xl text-header-color">Photo gallery</h2>
      <div class="flex overflow-auto gap-10 pb-10">
        <div
          class="flex flex-col justify-center self-center w-32 h-32 rounded-3xl bg-overlay-background-color group"
        >
          <button
            class="w-32 text-5xl text-center duration-300 group-hover:text-hover-color"
            @click="() => (isAddingCarPhoto = true)"
          >
            
          </button>
        </div>
        <img
          class="h-32 rounded-3xl shadow-md"
          v-for="photo in carStore.currentCar.photos?.toReversed()"
          :src="`//localhost:8000/uploads/car_photos/${photo.content}`"
        />
      </div>
    </div>
    <AddCarPhotoPanel
      @close="
        () => {
          isAddingCarPhoto = false;
          fetchCurrentCar();
        }
      "
      v-if="isAddingCarPhoto"
    />
    <CurrentCarExpenseView />
  </div>
  <div v-else>This car dosen't exist!</div>
</template>

<style scoped></style>
