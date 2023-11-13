import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn && !process.server) {
    await auth.fetchUser();
  }
});
