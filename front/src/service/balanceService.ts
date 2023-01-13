import { $http } from 'src/boot/axios';
export default {
  async requestGetBalance(params = {}) {
    return await $http.get('balance', { params });
  },
};