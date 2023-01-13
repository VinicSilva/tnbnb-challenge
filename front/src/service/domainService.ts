import { $http } from 'src/boot/axios';
import { iDomain, iSearchDomain } from 'src/model/domainModel';
export default {
  async requestAllDomain(params: iSearchDomain = {}) {
    return await $http.get('auth/domain/all', { params });
  },
  async requestSearchDomain(params: iSearchDomain) {
    return await $http.get('auth/domain/search', { params });
  },
  async requestAddDomain(params: iDomain) {
    if (params.id) {
      return await $http.put('auth/domain/update', { ...params });
    }
    return await $http.post('auth/domain/add', { ...params });
  },
  async requestDeleteDomain(id: number) {
    return await $http.delete('auth/domain/delete', { params: { id } });
  },
};
