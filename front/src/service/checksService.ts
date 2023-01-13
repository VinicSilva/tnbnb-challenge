import { $http } from 'src/boot/axios';
export default {
  async requestGetChecks(params = {}) {
    return await $http.get('checks', { params });
  },
  async requestRegisterCheck(params: any = {}) {
    const data: any = new FormData();
    data.append('description', params.description);
    data.append('value', params.value);
    data.append('image', params.image);
    return await $http.post('check', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
