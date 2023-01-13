import { $http } from 'src/boot/axios';
export default {
  async requestGetPurchases(params = {}) {
    return await $http.get('purchases', { params });
  },
  async requestRegisterPurchase(params = {}) {
    return await $http.post('purchase', { ...params });
  }
};