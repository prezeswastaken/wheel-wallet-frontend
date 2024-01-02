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

const isOwner = computed(() => {
  return authStore.user?.id == carStore.currentCar?.owner_id;
});

async function handlePhotoDelete(id: number) {
  const url = `/api/photo/${id}/delete`;
  await useApiFetch(url, { method: "DELETE" });
  fetchCurrentCar();
  console.log(`Deleting photo with id ${id}`);
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
        <p>You are {{ isOwner ? "owner" : "co-owner" }} of this car</p>
        <NuxtLink
          class="flex justify-center items-center p-3 mt-5 h-10 text-left uppercase rounded-3xl border border-transparent duration-300 hover:bg-transparent bg-header-color text-background-color hover:text-header-color hover:border-header-color"
          :to="`/car/edit/${carStore.currentCar.id}`"
        >
          Edit car details
        </NuxtLink>
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
        <div
          class="flex overflow-auto relative flex-shrink-0 rounded-3xl group"
          v-for="photo in carStore.currentCar.photos?.toReversed()"
        >
          <img
            class="h-32 rounded-3xl shadow-md w-fit"
            :src="`//localhost:8000/uploads/car_photos/${photo.content}`"
          />
          <div
            class="flex absolute flex-col justify-center items-center w-full h-full rounded-3xl opacity-0 duration-300 group-hover:opacity-90 bg-overlay-background-color"
          >
            <button
              @click="handlePhotoDelete(photo.id as unknown as number)"
              class="flex justify-center items-center w-auto text-3xl duration-300 group/show hover:text-error-color"
            >
              󰆴
            </button>
            <p></p>
          </div>
        </div>
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
