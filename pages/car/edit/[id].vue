<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";

const authStore = useAuthStore;
const carStore = useCarStore();
const form = ref({
  model: "",
  status: "",
  owner_id: 0,
});

const route = useRoute();

onMounted(async () => {
  await carStore.fetchCurrentCarByCarID(route.params.id as unknown as number);
  const car = carStore.currentCar;
  form.value = car;
});

type ErrorMessages = {
  model: Array<String>;
  status: Array<String>;
};

const errorMessages = ref<ErrorMessages | null>(null);

async function handleSubmit() {
  console.log("Handling!");

  const { error } = await carStore.editCar(form.value, carStore.currentCar.id);
  if (error.value != null) {
    console.log("ERROR!!!");
    console.log(error.value.message);
    errorMessages.value = error.value.data.errors;
  } else {
    await navigateTo(`/car/${route.params.id as unknown as number}`);
  }
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center p-10 py-5 w-full h-full"
  >
    <div
      class="flex flex-col gap-10 items-start py-20 px-20 mt-5 w-3/4 text-lg rounded-3xl bg-overlay-background-color"
    >
      <h1 class="self-center text-3xl text-header-color">
        Editing {{ carStore.currentCar?.model }}
      </h1>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-5 w-full">
        <InputField
          :modelValue="form.model"
          @update:modelValue="form.model = $event"
          type="text"
          fieldName="model"
          class=""
          placeholder="Enter model of your car here..."
        />
        <p class="mb-3 w-96 text-error-color" v-if="errorMessages?.model">
          {{ errorMessages.model[0] }}
        </p>
        <InputField
          :modelValue="form.status"
          @update:modelValue="form.status = $event"
          type="text"
          fieldName="status (optional)"
          class="w-full"
          placeholder="Enter status of your car here (optional)"
        />
        <p class="mb-3 w-96 text-error-color" v-if="errorMessages?.status">
          {{ errorMessages.status[0] }}
        </p>
        <div class="flex justify-between mt-2">
          <p></p>
          <PrimaryButton text="save changes" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
