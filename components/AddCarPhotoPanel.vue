<script lang="ts" setup>
import { useCarStore } from "~/stores/useCarStore";

const carStore = useCarStore();
let id: null | number = null;
onMounted(() => {
  if (carStore.currentCar != null) {
    id = carStore.currentCar.id as number;
  }
});

const emit = defineEmits(["submit"]);

const file: Ref<null | File> = ref(null);
async function handleSubmit() {
  if (!file.value) {
    alert("Please select a file");
  } else {
    const res = file.value.lastModified;
    const formData = new FormData();
    formData.append("image", file.value);
    await useApiFetch(`/api/car/${id}/upload`, {
      method: "POST",
      body: formData,
    });
    emit("submit");

    console.log(`File ${res} submited succesfully!`);
  }
}
function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  file.value = input.files ? input.files[0] : null;
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-[#181926] bg-opacity-50 flex flex-col items-center justify-center"
  >
    <div
      class="flex flex-col gap-10 p-5 w-1/2 rounded-3xl bg-overlay-background-color"
    >
      <div class="flex justify-between">
        <p></p>
        <h1 class="self-center text-5xl text-center text-header-color">
          Add photo of your car
        </h1>
        <p></p>
      </div>
      <form
        @submit.prevent="handleSubmit"
        class="p-4 mx-auto max-w-sm rounded-3xl shadow-md bg-background-color"
      >
        <div class="mb-4">
          <label
            for="fileInput"
            class="block text-sm font-medium text-text-color"
          >
            Choose File
          </label>
          <div class="flex items-center mt-1">
            <input
              id="fileInput"
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              class="hidden"
            />
            <label
              for="fileInput"
              class="py-2 px-4 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
            >
              Select File
            </label>
            <span class="ml-2" v-if="file">{{ file }}</span>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="py-2 px-4 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
