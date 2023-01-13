import { iWhitelabel } from 'src/model/whitelabelModel';
import { $http } from 'src/boot/axios';
export default {
  async requestAllWhitelabels(params = {}) {
    return await $http.get('auth/whitelabel/all', { params });
  },
  async requestCreateOrUpdateWhitelabel(
    params: iWhitelabel = {} as iWhitelabel
  ) {
    if (params.id) {
      return await $http.put('auth/whitelabel/update', { ...params });
    }
    return await $http.post('auth/whitelabel/create', { ...params });
  },
  async requestSetWhitelabelActive(id: number) {
    return await $http.post('auth/whitelabel/set/active', { id });
  },
  async requestSearchWhitelabel(params = {}) {
    return await $http.get('auth/whitelabel/search', { params });
  },
  async requestDeleteWhitelabel(id: number) {
    return await $http.delete('auth/whitelabel/delete', { params: { id } });
  },
};
