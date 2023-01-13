import { $http } from 'src/boot/axios';
export default {
  async requestAllUsers(params = {}) {
    return await $http.get('auth/users/all', { params });
  },
  async requestSearchUsers(params = {}) {
    return await $http.get('auth/users/search', { params });
  },
  async requestRegisterUser(params = {}) {
    return await $http.post('register', { ...params });
  },
};
