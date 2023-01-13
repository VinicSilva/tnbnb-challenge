import { useNotification } from 'src/composable/notification';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import checksService from 'src/service/checksService';
import { iSearchUser, iStateCheck, iFormCheck } from 'src/model/checkModel';
const { requestGetChecks, requestRegisterCheck } = checksService;
const { notification } = useNotification();
export const useCheckStore = defineStore('check', {
  state: (): iStateCheck => ({
    loadingTable: false,
    loadingModal: false,
    openModalCheck: false,
    listChecks: [],
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
    OPEN_MODAL_CHECK(value: boolean) {
      this.openModalCheck = value;
    },
    SET_FORM_CHECK(form: iFormCheck = {} as iFormCheck) {
      this.form = {
        ...form,
      };
    },
    async REQUEST_GET_CHECKS(params: iSearchUser = {}) {
      params.status = this.CHECK_STATUS(params.status as string)
      this.loadingTable = true;
      this.pagination = configPagination()
      this.listChecks = []
      await requestGetChecks(params)
        .then(({ data }: any) => {
          this.listChecks = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    async REQUEST_ADD_CHECK(params: any) {
      this.loadingModal = true;
      await requestRegisterCheck(params)
        .then(async ({}) => {
          notification.success();
          await this.REQUEST_GET_CHECKS({ status: 'pending' });
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(({ }) => {
          notification.error();
        });
    },
    CHECK_STATUS(statusValue: string): string {
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
