<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";
import type { Expense } from "~/types/ExpenseType";
const props = defineProps<{
  expense: Expense;
}>();

const authStore = useAuthStore();

const date = computed(() => {
    const date = new Date(props.expense.date);
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleString('en-US', options);
});

const cost = computed (() => {
    let cost = props.expense.cost / 100;
    return cost.toFixed(2);
});

const canEdit = computed (() => {
    return authStore.user?.id as number == props.expense.user_id;
});
</script>

<template>
  <div class="p-5 text-lg rounded-3xl shadow-md bg-expense-color shadow-background-color">
      <div class="flex justify-between items-center">
      <div class="flex flex-col">
      <p class="flex"><p class="mr-5">{{expense.planned ? "" : ""}}</p>{{ expense.name }}</p>
      <p class="flex text-hover-color"><p class="mr-5"></p> {{ cost }}</p>
      <p class="flex text-[#f5a97f]"><p class="mr-5"></p> {{ date }}</p>
      </div>
      <NuxtLink v-if="canEdit" class="mr-5 text-3xl duration-300 hover:text-5xl hover:text-hover-color" :to="`/expense/edit/${expense.id}`"></Nuxtlink>
      </div>
  </div>
</template>

<style scoped></style>
