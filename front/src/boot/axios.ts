import { useNotification } from 'src/composable/notification';
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useAuth } from 'src/composable/auth';
import { isTokenExpired } from 'src/utils';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export const $http = axios.create({
  baseURL: `${process.env.BASE_API_URL}/api`,
});

const { isLoggedIn, getToken, logout } = useAuth();
const { notification } = useNotification();

$http.interceptors.request.use(
  (config) => {
    if (isLoggedIn.value) {
      const token = getToken.value;

      if (isTokenExpired(token)) {
        notification.info({ message: 'Autenticação expirou' });
        logout();
        return false;
      }

      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

$http.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const msg = error.response.data.message;
    if (msg === 'Token is Expired') logout();
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$http = $http;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});
