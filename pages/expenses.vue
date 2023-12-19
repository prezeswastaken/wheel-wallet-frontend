<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";
import { useExpenseStore } from "~/stores/useExpenseStore";
import { Doughnut } from "vue-chartjs";

definePageMeta({
  middleware: ["auth"],
});

const authStore = useAuthStore();
const expenseStore = useExpenseStore();
const carStore = useCarStore();

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Cost",
      data: [],
      backgroundColor: [
        "#c6a0f6",
        "#ed8796",
        "#f5a97f",
        "#eed49f",
        "#a6da95",
        "#7dc4e4",
        "#f5bde6",
      ],
      hoverOffset: 50,
    },
  ],
});

onMounted(async () => {
  const userID = authStore.user?.id as number;
  await expenseStore.fetchExpensesByUserID(userID);
  await carStore.fetchCarsByUserID(userID);
  updateChartData();
  console.log(expenses.value);
  console.log("Cars length: ", cars.value?.length);
});

const expenses = computed(() => {
  return expenseStore.expenses;
});

const cars = computed(() => {
  return carStore.cars;
});

function getExpenseSumByCarID(carID: number) {
  const expensesValue = expenses.value;

  if (expensesValue) {
    return (
      expensesValue
        .filter((expense) => expense.car_id === carID)
        .reduce(
          (accumulator, expense) => accumulator + (expense.cost || 0),
          0,
        ) / 100
    ).toFixed(2);
  } else {
    return "0.00";
  }
}

function updateChartData() {
  chartData.value = {
    labels: carStore.cars?.map((car) => car.model as string),
    datasets: [
      {
        label: "Cost",
        data: carStore.cars?.map((car) => getExpenseSumByCarID(car.id)),
        backgroundColor: [
          "#c6a0f6",
          "#ed8796",
          "#f5a97f",
          "#eed49f",
          "#a6da95",
          "#7dc4e4",
          "#f5bde6",
        ],
        hoverOffset: 50,
      },
    ],
  };
  /*
  chartData.value.labels = carStore.cars?.map((car) => car.model as string);
  chartData.value.datasets.data = carStore.cars?.map((car) => getExpenseSumByCarID(car.id),);
  */
}
const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: "#cad3f5", // Color for legend labels
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)", // Color for the x-axis grid lines
      },
      ticks: {
        color: "#cad3f5", // Color for the x-axis labels (bottom)
      },
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)", // Color for the y-axis grid lines
      },
      ticks: {
        color: "#cad3f5", // Color for the y-axis labels (left)
      },
    },
  },
};
</script>

<template>
  <div>
    <h1 class="text-3xl text-header-color">Your expenses</h1>
    <div
      class="flex flex-col gap-10 p-10 mt-5 rounded-3xl sm:grid-cols-2 bg-overlay-background-color"
    >
      <div class="flex flex-col gap-5 p-10 rounded-3xl bg-expense-color">
        <h1 class="text-3xl text-header-color">Money spent on your cars</h1>
        <p class="text-button-active-main-color">
           WARNING! This section includes expenses of co-owners, so if you have
          weak nerves, it's best moment to maybe go back...
        </p>
        <div
          class="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            class="flex flex-col gap-5 justify-center items-center p-40 w-40 h-40 text-3xl rounded-3xl shadow-lg bg-background-color shadow-background-color"
            v-for="car in cars"
            :key="car.id as number"
          >
            <NuxtLink
              class="flex gap-10 duration-300 hover:text-header-color"
              :to="`/car/${car.id}`"
            >
              <p></p>
              <div :to="`/car/${car.id}`">
                <p>{{ car.model }}</p>
              </div>
            </NuxtLink>
            <div class="flex gap-10">
              <p></p>
              <p>{{ getExpenseSumByCarID(car.id as number) }}</p>
            </div>
          </div>
        </div>
        <div class="w-96" v-if="cars && cars?.length > 1">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
