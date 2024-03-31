import { useNotification } from 'src/composable/notification';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import userService from 'src/service/userService';
const { requestGetUsers, requestRegisterUser, requestUpdateUser, requestDeleteUser } = userService;
const { notification } = useNotification();
export const useExpenseStore = defineStore('expense', {
  state: (): any => ({
    loadingTable: false,
    loadingModal: false,
    openModalExpense: false,
    propUser: {},
    listExpenses: [],
    form: {
      value: '',
      description: '',
      purchase_date: '',
      id: null,
    },
    pagination: configPagination(),
  }),
  getters: {},
  actions: {
    OPEN_MODAL_EXPENSE(value: boolean) {
      this.openModalExpense = value;
    },
    SET_FORM_EXPENSE(form: any = {} as any) {
      this.form = {
        ...form,
      };
    },
    SET_PROP_USER(propUser: any) {
      this.propUser = {
        ...propUser,
      };
    },
    async REQUEST_GET_USERS(params: any = {}) {
      this.loadingTable = true;
      await requestGetUsers(params)
        .then(({ data }: any) => {
          this.listExpenses = data.data;
          this.pagination = configPagination({} as any);
        })
        .finally(() => {
          this.loadingTable = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    async REQUEST_ADD_USER(params: any) {
      this.loadingModal = true;
      await requestRegisterUser(params)
        .then(async ({}) => {
          notification.success();
          await this.REQUEST_GET_USERS();
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    async REQUEST_UPDATE_USER(params: any) {
      this.loadingModal = true;
      await requestUpdateUser(params.id, params)
        .then(async ({}) => {
          notification.success();
          await this.REQUEST_GET_USERS();
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    async REQUEST_DELETE_USER(id: number) {
      this.loadingTable = true;
      await requestDeleteUser(id)
        .then(async ({}) => {
          notification.success();
          await this.REQUEST_GET_USERS();
        })
        .finally(() => {
          this.loadingTable = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
  },
});
