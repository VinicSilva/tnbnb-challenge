import { $http } from 'src/boot/axios';
export default {
  async requestChangeStatusBankCheck(id: number, status: string): any {
    return await $http.put(`admin/checks/change/status/${id}`, { status });
  },
  async requestGetBankPendingChecks(params = {}) {
    return await $http.get('admin/checks', { params });
  },
};