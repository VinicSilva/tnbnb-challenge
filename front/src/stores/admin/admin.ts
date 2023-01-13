import { useNotification } from 'src/composable/notification';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import adminService from 'src/service/adminService';
import { iSearchUser, iStateBankCheck } from 'src/model/adminModel';
const { requestChangeStatusBankCheck, requestGetBankPendingChecks } = adminService;
const { notification } = useNotification();
export const useAdminStore = defineStore('admin', {
  state: (): iStateBankCheck => ({
    loadingTable: false,
    listPendingChecks: [],
    pagination: configPagination(),
  }),
  getters: {},
  actions: {
    async REQUEST_CHANGE_STATUS_BANK_CHECK(bank_check_id: number, status: string) {
      this.loadingTable = true;
      await requestChangeStatusBankCheck(bank_check_id, status)
        .then(async ({ }: any) => {
          notification.success();
          await this.REQUEST_GET_BANK_PENDING_CHECKS();
        })
        .finally(() => {
          this.loadingTable = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    async REQUEST_GET_BANK_PENDING_CHECKS(params: iSearchUser = {}) {
      this.loadingTable = true;
      await requestGetBankPendingChecks(params)
        .then(({ data }: any) => {
          this.listPendingChecks = data.data;
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
