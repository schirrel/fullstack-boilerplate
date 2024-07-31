import { defineStore } from "pinia";
import { ENDPOINTS } from "~/services/api";
import type { FetchError } from "ofetch";

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    user: null as unknown as User,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      this.loading = true;
      try {
        const response: { token: string } = await $fetch(
          ENDPOINTS.API_URL + ENDPOINTS.auth.login,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: {
              email,
              password,
            },
          }
        );
        if (response.token) {
          const token = useCookie("token"); // useCookie new hook in nuxt 3
          token.value = response.token; // set token to cookie
          this.authenticated = true; // set authenticated  state value to true
        }
      } catch (error) {
        if ((error as FetchError).statusCode === 401) {
          alert("Check your credentials");
        } else {
          alert("Sorry!\n Something went wrong when trying to log you in.");
        }
      } finally {
        this.loading = false;
      }
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
    async loadUser() {
      const { $api } = useNuxtApp();

      const user = (await $api(ENDPOINTS.profile.me)) as object;
      this.user = user;
    },
  },
});
