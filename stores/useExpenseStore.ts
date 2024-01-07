import { defineStore } from "pinia";
import type {
  Expense,
  ExpenseCreateData,
  ExpenseEditData,
} from "~/types/ExpenseType";

export const useExpenseStore = defineStore("expense", () => {
  const expenses = ref<Expense[] | null>(null);

  async function fetchExpensesByCarID(carID: number) {
    const { data } = await useApiFetch(`/api/car/${carID}/expenses`);
    expenses.value = data.value as Expense[];
  }

  async function fetchExpensesByUserID(userID: number) {
    const { data } = await useApiFetch(`/api/user/${userID}/expenses`);
    expenses.value = data.value as Expense[];
  }

  async function createExpense(expenseCreateData: ExpenseCreateData) {
    const response = await useApiFetch("/api/expense", {
      method: "post",
      body: expenseCreateData,
    });
    return response;
  }

  async function deleteExpense(expenseID: number) {
    const response = await useApiFetch(`/api/expense/${expenseID}/delete`, {
      method: "delete",
    });
    return response;
  }

  async function updateExpense(
    expenseEditData: ExpenseEditData,
    expenseID: number,
  ) {
    const response = await useApiFetch(`/api/expense/${expenseID}/edit`, {
      method: "put",
      body: expenseEditData,
    });
    return response;
  }

  const hasExpenses = computed(() => {
    if (expenses.value && typeof expenses.value.length !== "undefined") {
      return expenses.value.length > 0;
    } else {
      return false;
    }
  });

  return {
    expenses,
    fetchExpensesByCarID,
    fetchExpensesByUserID,
    createExpense,
    updateExpense,
    deleteExpense,
    hasExpenses,
  };
});
