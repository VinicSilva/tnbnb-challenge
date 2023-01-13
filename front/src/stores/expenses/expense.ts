import { useNotification } from 'src/composable/notification';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import expensesService from 'src/service/expensesService';
import { iSearchUser, iStateExpenses, iFormPurchase } from 'src/model/expenseModel';
const { requestGetPurchases, requestRegisterPurchase } = expensesService;
const { notification } = useNotification();
export const useExpenseStore = defineStore('expense', {
  state: (): iStateExpenses => ({
    loadingTable: false,
    loadingModal: false,
    openModalExpense: false,
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
    SET_FORM_EXPENSE(form: iFormPurchase = {} as iFormPurchase) {
      this.form = {
        ...form,
      };
    },
    async REQUEST_GET_EXPENSES(params: iSearchUser = {}) {
      this.loadingTable = true;
      await requestGetPurchases(params)
        .then(({ data }: any) => {
          this.listExpenses = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    async REQUEST_ADD_PURCHASE(params: any) {
      this.loadingModal = true;
      await requestRegisterPurchase(params)
        .then(async ({}) => {
          notification.success();
          await this.REQUEST_GET_EXPENSES();
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
  },
});
