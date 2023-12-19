import { useAuthStore } from "~/stores/useAuthStore";
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  if (!auth.user?.is_admin) {
    return navigateTo("/login", { replace: true });
  }
});
