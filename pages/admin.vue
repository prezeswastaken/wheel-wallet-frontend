<script lang="ts" setup>
import { User } from "~/stores/useAuthStore";

definePageMeta({
  middleware: ["admin"],
});

type Response = {
  users: Array<User>;
};

const users = ref<Array<User> | null>(null);

async function fetchUsers() {
  const response = await useApiFetch("/api/users");
  users.value = (response.data.value as Response).users as Array<User>;
  console.log(users.value);
}

onMounted(async () => {
  fetchUsers();
});

const userIDtoDelete = ref<number | null>(null);
const showDeletePopup = ref<boolean>(false);

function handleDeleteClick(userID: number) {
  userIDtoDelete.value = userID;
  showDeletePopup.value = true;
}

async function deleteUser() {
  await useApiFetch(`/api/user/${userIDtoDelete.value}/delete`, {
    method: "DELETE",
  });
  console.log(`User with id ${userIDtoDelete.value} deleted.`);
}
</script>

<template>
  <div
    class="grid relative grid-cols-4 gap-5 p-5 rounded-3xl bg-overlay-background-color"
  >
    <div
      v-for="user in users"
      class="flex justify-between p-5 rounded-3xl shadow-lg bg-background-color shadow-background-color"
    >
      <div class="flex flex-col gap-3">
        <p>󰻾 {{ user.id }}</p>
        <p> {{ user.name }}</p>
        <p>󰇰 {{ user.email }}</p>
      </div>
      <button
        @click="handleDeleteClick(user.id as number)"
        class="duration-300 hover:text-error-color"
      >
        󰆴
      </button>
    </div>
    <div
      v-if="showDeletePopup"
      class="flex fixed top-1/2 left-1/2 flex-col justify-between items-center p-5 w-1/4 h-1/4 rounded-3xl transform -translate-x-1/2 -translate-y-1/2 border-text-color bg-expense-color"
    >
      <h1 class="self-center text-lg text-center text-header-color">
        Are you sure u want to delete user with id {{ userIDtoDelete }}
      </h1>
      <div class="flex justify-between w-full">
        <button
          @click="showDeletePopup = false"
          class="p-5 rounded-3xl border-4 duration-300 border-text-color hover:text-hover-color hover:border-hover-color"
        >
          NO
        </button>
        <button
          @click="
            deleteUser();
            showDeletePopup = false;
            fetchUsers();
          "
          class="p-5 rounded-3xl border-4 duration-500 hover:scale-150 text-error-color border-error-color"
        >
          YES
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
