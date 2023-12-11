<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";
import { useExpenseStore } from "~/stores/useExpenseStore";
import type { ExpenseCreateData } from "~/types/ExpenseType";

const route = useRoute();
const authStore = useAuthStore();
const carStore = useCarStore();
const expenseStore = useExpenseStore();
const form = ref<ExpenseCreateData>({
  name: "",
  cost: 0,
  date: "",
  planned: false,
});

type ErrorMessages = {
  model: Array<String>;
  status: Array<String>;
};

const errorMessages = ref<ErrorMessages | null>(null);

async function handleSubmit() {
  if (authStore.user == null) {
    return;
  }

  const { error } = await expenseStore.createExpense(form.value);
  if (error.value != null) {
    console.log("ERROR!!!");
    console.log(error.value.message);
    errorMessages.value = error.value.data.errors;
    console.log(errorMessages);
  } else {
    await navigateTo(`/car/${route.query.carID}`);
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
      <h1 class="self-center text-3xl text-header-color">Add new car</h1>
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
          <PrimaryButton text="create car" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
