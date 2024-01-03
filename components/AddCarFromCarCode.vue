<script lang="ts" setup>
import type { CarFromCodeData } from "~/stores/useCarStore";
import { useCarStore } from "~/stores/useCarStore";

const carStore = useCarStore();
onMounted(() => {});

const emit = defineEmits(["close"]);

type ErrorMessages = {
  code: Array<String>;
};

const errorMessages = ref<ErrorMessages | null>(null);
const form = ref<CarFromCodeData>({
  code: "",
});

async function handleSubmit() {
  const { error } = await carStore.addCarFromCode(form.value);
  if (error.value != null) {
    console.log("ERROR!!!");
    console.log(error.value.message);
    errorMessages.value = error.value.data.errors;
  } else {
    emit("close");
    await navigateTo("/dashboard");
  }

  console.log(`${form.value.code}`);
}
</script>

<template>
  <div class="p-32 rounded-3xl bg-background-color">
    <div
      class="fixed top-0 left-0 w-screen h-screen bg-[#181926] bg-opacity-50 flex flex-col items-center justify-center"
    >
      <div
        class="flex flex-col gap-10 p-5 w-1/2 rounded-3xl border-4 border-background-color bg-overlay-background-color"
      >
        <div class="flex justify-between">
          <p></p>
          <h1 class="self-center text-5xl text-center text-header-color">
            Add car from car code
          </h1>
          <button
            class="mr-5 text-3xl duration-300 text-text-color hover:text-error-color"
            @click="$emit('close')"
          >
            󰛉
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-5 w-full">
          <InputField
            :modelValue="form.code"
            @update:modelValue="form.code = $event"
            type="text"
            fieldName="enter code you received from owner of the car"
            class=""
            placeholder="Enter the code here..."
          />
          <p class="mb-3 w-96 text-error-color" v-if="errorMessages?.code">
            {{ errorMessages.code[0] }}
          </p>
          <div class="flex justify-between mt-2">
            <p></p>
            <PrimaryButton text="use code" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
