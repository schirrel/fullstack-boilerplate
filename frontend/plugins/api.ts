import { ENDPOINTS } from "~/services/api";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: ENDPOINTS.API_URL,
    onRequest({ request, options, error }) {
      const accessToken = useCookie("token").value;
      if (accessToken) {
        const headers = (options.headers ||= {});
        if (Array.isArray(headers)) {
          headers.push(["Authorization", `Bearer ${accessToken}`]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        } else {
          headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        const { logUserOut } = useAuthStore();
        await nuxtApp.runWithContext(() => {
          logUserOut();
        });
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
