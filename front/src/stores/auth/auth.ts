import { defineStore } from 'pinia';
import { $http } from 'src/boot/axios';
import { useAuth } from 'src/composable/auth';

const { setUserCache, logout } = useAuth();
export const useAuthStore = defineStore('auth', {
  state: (): any => ({
    erro: false,
    error_status: '',
    loading: false,
  }),
  getters: {},
  actions: {
    async AUTH_REQUEST(value: any) {
      this.loading = true;
      await $http
        .post('login', value)
        .then(({ data }) => {
          setUserCache(data);
          window.location.href = '/';
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(({ response }) => {
          this.erro = true;
          this.error_status = response.data.message;
        });
    },
    CHECK_ACCESS() {
      return true;
    },
    async LOGOUT() {
      this.loading = true;
      await $http
        .post('logout', {})
        .then(({ }) => {
          logout();
        })
        .finally(() => {
          this.loading = false;
        })
    },
  },
});
