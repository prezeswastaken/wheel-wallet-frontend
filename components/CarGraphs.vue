<script lang="ts" setup>
import { Bar } from "vue-chartjs";
import { Doughnut } from "vue-chartjs";
import { useAuthStore } from "~/stores/useAuthStore";
import { useCarStore } from "~/stores/useCarStore";
import { useExpenseStore } from "~/stores/useExpenseStore";
import { Expense } from "~/types/ExpenseType";

const authStore = useAuthStore();
const route = useRoute();

async function fetchCurrentCar() {
  if (authStore.user != null) {
    await carStore.fetchCurrentCarByCarID(route.params.id as unknown as number);
    console.log("coowner id:", carStore.currentCar?.coowner_id);
  }
}

const carStore = useCarStore();
const expenseStore = useExpenseStore();

const fetchedExpenses = ref(false);
const expenses = ref<null | Expense[]>(null);
onMounted(async () => {
  await fetchCurrentCar();
  await expenseStore.fetchExpensesByCarID(carStore.currentCar?.id);
  console.log("Fetched,", expenseStore.expenses);
  expenses.value = expenseStore.expenses;
  fetchedExpenses.value = true;
});

const allExpensesChartData = ref({
  labels: [],
  datasets: [
    {
      label: "Cost",
      data: [],
      backgroundColor: ["#c6a0f6", "#ed8796"],
      hoverOffset: 50,
    },
  ],
});

const plannedExpensesChartData = ref({
  labels: [],
  datasets: [
    {
      label: "Cost",
      data: [],
      backgroundColor: ["#c6a0f6", "#ed8796"],
      hoverOffset: 50,
    },
  ],
});

const ownerCoownerExpensesChartData = ref({
  labels: [],
  datasets: [
    {
      label: "Cost",
      data: [],
      backgroundColor: ["#c6a0f6", "#ed8796"],
      hoverOffset: 50,
    },
  ],
});

async function updateExpenses() {
  await fetchCurrentCar();
  allExpensesChartData.value = {
    labels: expenses.value?.map((expense) => expense.name),
    datasets: [
      {
        label: "Cost",
        data: expenses.value?.map((expense) => (expense.cost / 100).toFixed(2)),
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

  let plannedExpensesSum = expenses.value
    ?.filter((expense) => expense.planned == true)
    .reduce((accumulator, expense) => accumulator + (expense.cost || 0), 0);

  if (plannedExpensesSum != null) {
    plannedExpensesSum = (plannedExpensesSum / 100).toFixed(2);
  }

  let notPlannedExpensesSum = expenses.value
    ?.filter((expense) => expense.planned == false)
    .reduce((accumulator, expense) => accumulator + (expense.cost || 0), 0);
  if (notPlannedExpensesSum != null) {
    notPlannedExpensesSum = (notPlannedExpensesSum / 100).toFixed(2);
  }

  plannedExpensesChartData.value = {
    labels: ["Planned", "Not planned"],
    datasets: [
      {
        label: "Total sum",
        data: [plannedExpensesSum, notPlannedExpensesSum],
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

  // Owner / coowner expense summary
  let { coowner_id } = carStore.currentCar ?? {};

  if (coowner_id == null || coowner_id == undefined) {
    return;
  }

  const currentUserID = authStore.user?.id;
  const isCurrentUserOwnerOfCar =
    carStore.currentCar?.owner_id == currentUserID;

  // Current user expenses
  let currentUserExpensesSum = expenses.value
    ?.filter((expense) => expense.user_id == currentUserID)
    .reduce((accumulator, expense) => accumulator + (expense.cost || 0), 0);
  if (currentUserExpensesSum != null) {
    currentUserExpensesSum = (currentUserExpensesSum / 100).toFixed(2);
  }

  // Other user expenses
  let otherUserExpensesSum = expenses.value
    ?.filter((expense) => expense.user_id != currentUserID)
    .reduce((accumulator, expense) => accumulator + (expense.cost || 0), 0);
  if (otherUserExpensesSum != null) {
    otherUserExpensesSum = (otherUserExpensesSum / 100).toFixed(2);
  }
  console.log("Current", currentUserExpensesSum);
  console.log("Other", otherUserExpensesSum);

  ownerCoownerExpensesChartData.value = {
    labels: ["Current user", "Other user"],
    datasets: [
      {
        label: "Total money spent",
        data: [currentUserExpensesSum, otherUserExpensesSum],
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
}

watch(expenses, () => {
  updateExpenses();
});

const allExpensesChartOptions = {
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
  <div
    class="grid grid-cols-1 gap-5 justify-center items-center self-center w-full lg:grid-cols-2"
  >
    <div class="p-5 rounded-3xl bg-expense-color">
      <p class="text-3xl text-center uppercase text-header">
        All expenses of this car
      </p>
      <Bar
        v-if="fetchedExpenses && expenses && expenses.length > 0"
        class=""
        :data="allExpensesChartData"
        :options="allExpensesChartOptions"
      />
    </div>
    <div class="p-5 rounded-3xl bg-expense-color">
      <p class="text-3xl text-center uppercase text-header">
        Planned vs not planned
      </p>
      <Doughnut
        class="w-96"
        :data="plannedExpensesChartData"
        :options="allExpensesChartOptions"
      />
    </div>
    <div
      v-if="carStore.currentCar?.coowner_id != null"
      class="p-5 rounded-3xl bg-expense-color"
    >
      <p class="text-3xl text-center uppercase text-header">
        You vs other owner
      </p>
      <Doughnut
        class="w-96"
        :data="ownerCoownerExpensesChartData"
        :options="allExpensesChartOptions"
      />
    </div>
  </div>
</template>

<style scoped></style>
