<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";
import { useExpenseStore } from "~/stores/useExpenseStore";
import type { ExpenseCreateData } from "~/types/ExpenseType";

const date = ref(new Date());
const dateProcessed = computed(() => {
  const originalDate = date.value;

  // Get the year, month, and day components
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const day = originalDate.getDate().toString().padStart(2, "0");

  // Create the formatted date string in "YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate); // Output: "2023-12-12"
  return formattedDate;
});

const attrs = ref([
  {
    key: "today",
    highlight: {
      color: "white", // Text color in dark mode
      fillMode: "solid",
      backgroundColor: "darkgray", // Background color in dark mode
    },
  },
]);

const route = useRoute();
const authStore = useAuthStore();
const carStore = useCarStore();
const expenseStore = useExpenseStore();

onMounted(() => {
  carStore.fetchCurrentCarByCarID(route.query.carID as unknown as number);
});

const form = ref<ExpenseCreateData>({
  name: "",
  cost: 0,
  date: "",
  planned: false,
  car_id: 0,
});

type ErrorMessages = {
  name: Array<String>;
  cost: Array<String>;
  date: Array<String>;
  planned: Array<String>;
};

const errorMessages = ref<ErrorMessages | null>(null);

async function handleSubmit() {
  if (authStore.user == null) {
    return;
  }

  const newForm = form.value;
  newForm.date = dateProcessed.value;
  newForm.car_id = carStore.currentCar?.id as number;
  const { error } = await expenseStore.createExpense(newForm);
  console.log(newForm);

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
      <h1 class="self-center text-3xl text-header-color">
        Create expense for {{ carStore.currentCar?.model }}
      </h1>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-5 w-full">
        <!-- Name field -->
        <InputField
          :modelValue="form.name"
          @update:modelValue="form.name = $event"
          type="text"
          fieldName="Enter your expense name"
          class=""
          placeholder="Enter your expense name here..."
        />
        <p class="mb-3 w-96 text-error-color" v-if="errorMessages?.name">
          {{ errorMessages.name[0] }}
        </p>

        <!-- Cost field -->
        <InputField
          :modelValue="form.cost.toString()"
          @update:modelValue="form.cost = $event"
          type="text"
          fieldName="cost (optional)"
          class="w-full"
          placeholder="Enter cost of your expense (optional)"
        />
        <p class="mb-3 w-96 text-error-color" v-if="errorMessages?.cost">
          {{ errorMessages.cost[0] }}
        </p>

        <!-- Planned field -->
        <div>
          <label for="planned" class="flex gap-5 text-text-color"
            >Is your expense planned?</label
          >
          <select
            v-model="form.planned"
            id="planned"
            class="p-3 mt-1 rounded-3xl border border-gray-700 text-blue-color bg-expense-color"
          >
            <option
              :value="true"
              class="bg-gray-700 rounded-3xl text-text-color"
            >
              Planned
            </option>
            <option
              :value="false"
              class="bg-gray-700 rounded-3xl text-text-color"
            >
              Done
            </option>
          </select>
        </div>

        <!-- Date picker -->
        <div
          class="flex flex-col items-center p-10 rounded-3xl bg-expense-color"
        >
          <p class="text-xl font-bold">Pick date for your expense</p>
          <p class="mb-10">
            If it is planned, you can think of it as "deadline"
          </p>
          <VDatePicker
            transparent
            color="indigo"
            :is-dark="true"
            v-model="date"
            :attributes="attrs"
          />
        </div>
        <div class="flex justify-between mt-2">
          <p></p>
          <PrimaryButton text="create expense" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
