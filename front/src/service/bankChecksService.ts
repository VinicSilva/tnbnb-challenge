import { $http } from 'src/boot/axios';
export default {
  async requestGetBankChecks(params = {}) {
    return await $http.get('bank_checks', { params });
  },
  async requestRegisterBankCheck(params: any = {}) {
    const data: any = new FormData();
    data.append('description', params.description);
    data.append('value', params.value);
    data.append('image', params.image);
    return await $http.post('bank_check', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
