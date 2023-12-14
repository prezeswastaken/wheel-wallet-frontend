<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";
import { ArrowRightIcon } from "@heroicons/vue/24/solid";

const carStore = useCarStore();
const authStore = useAuthStore();

const isAddingCarFromCarCode = ref(false);

onMounted(async () => {
  if (authStore.user != null) {
    await carStore.fetchCarsByUserID(authStore.user.id);
  }
});
</script>

<template>
  <div>
    <div>
      <div class="flex justify-between">
        <p class="text-3xl text-header-color" v-if="authStore.user">
          Hello {{ authStore.user?.name }}!
        </p>
        <button
          class="flex justify-center items-center p-3 h-10 text-left uppercase rounded-3xl border border-transparent duration-300 hover:bg-transparent bg-header-color text-background-color hover:text-header-color hover:border-header-color"
          @click="isAddingCarFromCarCode = true"
        >
          add from car code
        </button>
      </div>
      <div>
        <NuxtLink
          class="flex justify-center items-center p-3 m-5 h-10 text-left uppercase rounded-3xl border border-transparent duration-300 hover:bg-transparent bg-button-active-main-color text-background-color hover:text-hover-color hover:border-hover-color"
          to="car/new"
        >
          <p>add new car</p>
          <ArrowRightIcon class="mb-0.5 ml-1 w-6 h-5" />
        </NuxtLink>
        <div
          class="grid grid-cols-2 gap-10 p-10 mt-5 rounded-3xl bg-overlay-background-color"
        >
          <p v-if="!carStore.hasCars" class="self-center">
            You don't have any cars yet! Go change that, right now!
          </p>
          <CarThumbnail
            v-if="carStore.hasCars"
            v-for="car in carStore.cars"
            :car="car"
          />
        </div>
      </div>
    </div>
    <AddCarFromCarCode
      v-if="isAddingCarFromCarCode"
      @close="
        {
          isAddingCarFromCarCode = false;
          carStore.fetchCarsByUserID(authStore.user?.id as unknown as number);
        }
      "
    />
  </div>
</template>

<style scoped></style>
