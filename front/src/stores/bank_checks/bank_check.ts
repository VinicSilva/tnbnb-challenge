import { useNotification } from 'src/composable/notification';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import bankChecksService from 'src/service/bankChecksService';
import { iSearchUser, iStateBankCheck, iFormBankCheck } from 'src/model/bankCheckModel';
const { requestGetBankChecks, requestRegisterBankCheck } = bankChecksService;
const { notification } = useNotification();
export const useBankCheckStore = defineStore('bank_check', {
  state: (): iStateBankCheck => ({
    loadingTable: false,
    loadingModal: false,
    openModalBankCheck: false,
    listBankChecks: [],
    form: {
      value: '',
      description: '',
      image: '',
      id: null,
    },
    pagination: configPagination(),
  }),
  getters: {},
  actions: {
    OPEN_MODAL_BANK_CHECK(value: boolean) {
      this.openModalBankCheck = value;
    },
    SET_FORM_BANK_CHECK(form: iFormBankCheck = {} as iFormBankCheck) {
      this.form = {
        ...form,
      };
    },
    async REQUEST_GET_BANK_CHECKS(params: iSearchUser = {}) {
      params.status = this.BANK_CHECK_STATUS(params.status as string)
      this.loadingTable = true;
      this.pagination = configPagination()
      this.listBankChecks = []
      await requestGetBankChecks(params)
        .then(({ data }: any) => {
          this.listBankChecks = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    async REQUEST_ADD_BANK_CHECK(params: any) {
      this.loadingModal = true;
      await requestRegisterBankCheck(params)
        .then(async ({}) => {
          notification.success();
          await this.REQUEST_GET_BANK_CHECKS({ status: 'pending' });
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    BANK_CHECK_STATUS(statusValue: string): string {
      statusValue = statusValue.toLowerCase()      
      const allStatus: any = {
        'aceito': 'accepted',
        'acepto': 'accepted',
        'pendente': 'pending',
        'pendiente': 'pending',
        'recusado': 'rejected',
        'rechazado': 'rejected',
      }
      return allStatus[statusValue.toLowerCase()] || statusValue
    },
  },
});
