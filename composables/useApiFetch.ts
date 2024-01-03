import type { UseFetchOptions } from "nuxt/app";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig();
  let headers: any = {
    referer: config.public.frontendUrl,
    charset: "UTF-8",
  };
  const token = useCookie("XSRF-TOKEN");

  if (token.value) {
    headers["X-XSRF-TOKEN"] = token.value as string;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    };
  }
  return useFetch(`${config.public.laravelApiUrl}${path}`, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });
}
