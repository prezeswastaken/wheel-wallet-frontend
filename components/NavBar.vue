<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore";

const auth = useAuthStore();
</script>

<template>
  <div class="flex gap-10 justify-start items-center w-full">
    <NavLink v-if="!auth.isLoggedIn" link="/register" text="register" />
    <NavLink v-if="!auth.isLoggedIn" link="/login" text="login" />
    <NavLink v-if="auth.isLoggedIn" link="/dashboard" text="your cars" />
    <NavLink v-if="auth.isLoggedIn" link="/expenses" text="expense summary" />
    <NavLink
      v-if="auth.isLoggedIn"
      link="/user-logs"
      text="Monitor your cars"
    />
    <NavLink v-if="auth.user?.is_admin" link="/admin" text="admin panel" />
  </div>
</template>

<style scoped></style>
