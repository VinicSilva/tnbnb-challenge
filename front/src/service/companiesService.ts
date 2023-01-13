import { iCompanies, iSearchCompanies } from 'src/model/companiesModel';
import { $http } from 'src/boot/axios';

export default {
  async requestAllCompanies(params: iSearchCompanies = {}) {
    return await $http.get('auth/companies/all', { params });
  },
  async requestSearchCompanies(params: iSearchCompanies) {
    return await $http.get('auth/companies/search', { params });
  },
  async requestAddOrUpdateCompanies(params: iCompanies) {
    if (params.id) {
      return await $http.put('auth/companies/update', { ...params });
    }
    return await $http.post('auth/companies/add', { ...params });
  },
  async requestDeleteCompanies(id: number | number[]) {
    return await $http.delete('auth/companies/delete', { params: { id } });
  },
};
