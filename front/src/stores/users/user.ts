import { useTranslate } from 'src/composable/translate';
import { useNotification } from 'src/composable/notification';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import usersService from 'src/service/usersService';
import { iSearchUser, iStateUser } from 'src/model/userModel';
const { requestAllUsers, requestSearchUsers, requestRegisterUser } = usersService;
const { notification } = useNotification();
const { translate } = useTranslate();
export const useUsersStore = defineStore('users', {
  state: (): iStateUser => ({
    openModalUser: false,
    loadingTable: false,
    loading: false,
    listUsers: [],
    pagination: configPagination(),
  }),
  getters: {},
  actions: {
    OPEN_MODAL_USER(value: boolean) {
      this.openModalUser = value;
    },
    async REQUEST_GET_ALL_USERS(params: iSearchUser = {}) {
      this.loadingTable = true;
      await requestAllUsers(params)
        .then(({ data }) => {
          this.listUsers = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_SEARCH_USER(params: iSearchUser = {}) {
      this.loadingTable = true;
      await requestSearchUsers(params)
        .then(({ data }) => {
          this.listUsers = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },

    async REQUEST_REGISTER_USER(params: any = {}) {
      if (params.password && params.password.length < 6) {
        notification.error({ caption: translate.value.message.invalid_password_size });
        return;
      }
      if (params.password !== params.password_confirmation) {
        notification.error({ caption: translate.value.message.passwords_do_not_match });
        return;
      }
      this.loading = true;
      await requestRegisterUser(params)
        .then(({ }) => {
          notification.success();
          setTimeout(() => window.location.href = '/signin', 1000)
        })
        .finally(() => {
          this.loading = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
  },
});
