import { iAddPartners, iSearchPartners } from '../stores/partners/model';
import { $http } from 'src/boot/axios';

export default {
  async requestAllPartners(params: iSearchPartners = {}) {
    return await $http.get('auth/partners/all', { params });
  },
  async requestAddOrUpdatePartners(data: iAddPartners) {
    if (data.id) {
      return await $http.put('auth/partners/update', { ...data });
    }
    return await $http.post('auth/partners/add', { ...data });
  },
  async requestSearchPartners(search: string) {
    return await $http.get('auth/partners/search', { params: { search } });
  },
  async requestDeletePartners(id: number) {
    return await $http.delete('auth/partners/delete', { params: { id } });
  },
};
