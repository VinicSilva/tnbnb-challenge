import { $http } from 'src/boot/axios';
export default {
  async requestGetTransactions(params = {}) {
    return await $http.get('transactions', { params });
  },
};