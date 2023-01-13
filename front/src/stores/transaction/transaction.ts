import { useNotification } from 'src/composable/notification';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import transactionService from 'src/service/transactionService';
import { iSearchUser, iStateTransaction } from 'src/model/transactionModel';
const { requestGetTransactions } = transactionService;
const { notification } = useNotification();
export const useTransactionStore = defineStore('transaction', {
  state: (): iStateTransaction => ({
    loadingTable: false,
    listTransactions: [],
    pagination: configPagination(),
  }),
  getters: {},
  actions: {
    async REQUEST_GET_TRANSACTIONS(params: iSearchUser = {}) {
      this.loadingTable = true;
      await requestGetTransactions(params)
        .then(({ data }: any) => {
          this.listTransactions = data.data;
          this.pagination = configPagination(data);
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
