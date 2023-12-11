<script lang="ts" setup>
import type { Expense } from "~/types/ExpenseType";
const props = defineProps<{
  expense: Expense;
}>();
const date = computed(() => {
    const date = new Date(props.expense.date);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleString('en-US', options);
});
</script>

<template>
  <div class="p-5 text-lg rounded-3xl shadow-md bg-expense-color shadow-background-color">
      <p class="flex"><p class="mr-5">{{expense.planned ? "" : ""}}</p>{{ expense.name }}</p>
      <p class="flex text-hover-color"><p class="mr-5"></p> {{ expense.cost / 100 }}</p>
      <p class="flex text-[#f5a97f]"><p class="mr-5"></p> {{ date }}</p>
  </div>
</template>

<style scoped></style>
