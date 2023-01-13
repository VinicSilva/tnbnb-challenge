import { useNotification } from 'src/composable/notification';
import { defineStore } from 'pinia';
import balanceService from 'src/service/balanceService';
import { iSearchUser, iStateBalance } from 'src/model/balanceModel';
const { requestGetBalance } = balanceService;
const { notification } = useNotification();
export const useBalanceStore = defineStore('balance', {
  state: (): iStateBalance => ({
    loading: false,
    balance: {},
  }),
  getters: {},
  actions: {
    async REQUEST_GET_BALANCE(params: iSearchUser = {}) {
      this.loading = true;
      await requestGetBalance(params)
        .then(({ data }: any) => {
          this.balance = data;
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
