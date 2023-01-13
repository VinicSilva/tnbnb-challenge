import { $http } from 'src/boot/axios';
import { iPowerBiTenant } from 'src/model/powerBiModel';

export default {
  async requestAllPowerBi() {
    return await $http.get('auth/power_bi_tenant/all');
  },
  async requestAddOrUpdatePowerBiTenant(params:iPowerBiTenant) {
    if (params.id) {
      return await $http.put('auth/power_bi_tenant/update', { ...params });
    }
    return await $http.post('auth/power_bi_tenant/add', { ...params });
  },
  async requestDeletePowerBi(id: number) {
    return await $http.delete('auth/power_bi_tenant/delete', { params: { id } });
  },
};
