import { $http } from 'src/boot/axios';
export default {
  async requestRegisterAdmin(params = {}) {
    return await $http.post('/register/admin', { ...params });
  },
};
