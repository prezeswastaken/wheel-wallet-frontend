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

const showDeletePopup = ref(false);

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

async function handleDelete() {
  const { error } = await carStore.deleteCar(
    route.params.id as unknown as number,
  );
  navigateTo("/dashboard");
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center p-10 py-5 w-full h-full"
  >
    <button
      class="self-end font-bold shadow-[#181926] shadow-lg flex justify-center items-center p-3 h-10 text-left uppercase rounded-3xl border-transparent duration-300 hover:bg-transparent bg-error-color text-background-color hover:text-error-color hover:border-error-color border-4"
      @click="showDeletePopup = true"
    >
      delete car
    </button>
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

    <div v-if="showDeletePopup" class="fixed inset-0 bg-black opacity-50"></div>
    <div
      v-if="showDeletePopup"
      class="flex fixed top-1/2 left-1/2 flex-col justify-between items-center p-5 w-1/2 h-1/2 rounded-3xl transform -translate-x-1/2 -translate-y-1/2 border-text-color bg-expense-color"
    >
      <h1 class="flex self-center text-lg text-center text-header-color">
        Are you sure u want to delete
        <p class="ml-2 text-error-color">{{ carStore.currentCar?.model }}</p>
        ?
      </h1>
      <img src="https://i.imgur.com/HLfo6gn.png" class="w-1/3" />
      <div class="flex justify-between w-full">
        <button
          @click="showDeletePopup = false"
          class="p-5 w-72 rounded-3xl border-4 duration-300 border-text-color hover:text-hover-color hover:border-hover-color"
        >
          NO
        </button>
        <button
          @click="handleDelete()"
          class="p-5 w-72 rounded-3xl border-4 duration-500 hover:scale-150 text-error-color border-error-color"
        >
          YES
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
