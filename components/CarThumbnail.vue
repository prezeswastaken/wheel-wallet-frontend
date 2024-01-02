<script lang="ts" setup>
import { InformationCircleIcon } from "@heroicons/vue/24/outline";
import type { Car } from "~/types/CarType";
const props = defineProps({
  imageUrl: {
    type: String,
    default: "https://i.imgflip.com/15vpit.jpg?a471432",
  },
  car: Object as () => Car,
});
const photo = computed(() => {
  let photo = props.car?.photo?.content;
  if (!photo || photo == undefined) {
    //photo = "https://i.imgflip.com/15vpit.jpg?a471432";
    photo = "https://th.bing.com/th/id/OIG.qhmoN7mmYJuUWbgUucr1?pid=ImgGn";
    return photo;
  }
  console.log(photo);
  return `//localhost:8000/uploads/car_photos/${photo}`;
});
</script>

<template>
  <div class="flex relative justify-center items-center group">
    <img
      :src="`${photo}`"
      alt="nothing here :("
      class="w-full h-full rounded-lg shadow-2xl shadow-background-color"
    />
    <div
      class="flex absolute flex-col justify-around w-full h-full opacity-0 duration-300 group-hover:opacity-90 bg-overlay-background-color"
    >
      <p class="text-7xl text-center">
        {{ car?.model }}
      </p>
      <NuxtLink
        v-if="car?.id"
        :to="`/car/${car.id}`"
        class="flex justify-center items-center w-auto duration-100 group/show hover:text-hover-color"
      >
        <InformationCircleIcon
          class="w-32 duration-300 group-hover/show:w-32"
        />
      </NuxtLink>
      <p></p>
    </div>
  </div>
</template>

<style scoped></style>
