import { $http } from 'src/boot/axios';
export default {
  async requestGetUsers(params = {}) {
    return await $http.get('/users', { params });
  },
  async requestUpdateUser(userId: number, params = {}) {
    return await $http.put(`/users/${userId}`, { ...params });
  },
  async requestRegisterUser(params = {}) {
    return await $http.post('/users', { ...params });
  },
  async requestDeleteUser(userId: number) {
    return await $http.delete(`/users/${userId}`)
  },
};