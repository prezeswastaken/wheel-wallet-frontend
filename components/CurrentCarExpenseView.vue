<script lang="ts" setup>
import { useCarStore } from "~/stores/useCarStore";
import { useExpenseStore } from "~/stores/useExpenseStore";

const route = useRoute();

const carStore = useCarStore();
const expenseStore = useExpenseStore();

let currentCarID: number | null = null;

enum PlannedFilterOptions {
  All,
  Planned,
  NotPlanned,
}

const plannedFilterOption = ref(PlannedFilterOptions.All);

const expensesToShow = computed(() => {
  switch (plannedFilterOption.value) {
    case PlannedFilterOptions.All:
      return expenseStore.expenses;
    case PlannedFilterOptions.Planned:
      return expenseStore.expenses?.filter((expense) => expense.planned);
    case PlannedFilterOptions.NotPlanned:
      return expenseStore.expenses?.filter((expense) => !expense.planned);
    default:
      return expenseStore.expenses;
  }
});

onMounted(() => {
  currentCarID = route.params.id as unknown as number;
  expenseStore.fetchExpensesByCarID(currentCarID);
});
</script>

<template>
  <div class="flex flex-col gap-10 p-10 rounded-3xl bg-background-color">
    <h2 class="text-3xl text-header-color">Expenses</h2>
    <div
      class="flex flex-col gap-10 p-10 rounded-3xl sm:flex-row w-fit bg-overlay-background-color"
    >
      <label
        class="duration-300 hover:text-hover-color"
        :class="
          plannedFilterOption == PlannedFilterOptions.All
            ? 'text-header-color'
            : ''
        "
      >
        <input
          type="radio"
          v-model="plannedFilterOption"
          :value="PlannedFilterOptions.All"
        />
        All
      </label>
      <label
        :class="
          plannedFilterOption == PlannedFilterOptions.Planned
            ? 'text-header-color'
            : ''
        "
        class="duration-300 hover:text-hover-color"
      >
        <input
          type="radio"
          v-model="plannedFilterOption"
          :value="PlannedFilterOptions.Planned"
        />
        Planned
      </label>
      <label
        :class="
          plannedFilterOption == PlannedFilterOptions.NotPlanned
            ? 'text-header-color'
            : ''
        "
        class="duration-300 hover:text-hover-color"
      >
        <input
          type="radio"
          v-model="plannedFilterOption"
          :value="PlannedFilterOptions.NotPlanned"
        />
        Not Planned
      </label>
    </div>
    <NuxtLink
      class="flex justify-center items-center p-3 h-10 text-left uppercase rounded-3xl border border-transparent duration-300 hover:bg-transparent bg-button-active-main-color text-background-color hover:text-hover-color hover:border-hover-color"
      :to="{ path: '/expense/new', query: { carID: currentCarID } }"
    >
      <p>add new expense</p>
      <ArrowRightIcon class="mb-0.5 ml-1 w-6 h-5" />
    </NuxtLink>
    <div class="flex flex-col gap-10 lg:flex-row">
      <!-- List of expenses -->
      <div
        class="flex flex-col gap-10 p-10 w-full rounded-3xl bg-overlay-background-color"
      >
        <Expense
          :expense="expense"
          v-for="expense in expensesToShow?.toReversed()"
        />
      </div>

      <!-- Graphs related to expenses -->
      <div
        class="flex flex-col gap-10 p-10 w-full rounded-3xl bg-overlay-background-color"
      >
        penes
      </div>
    </div>
  </div>
</template>

<style scoped></style>
