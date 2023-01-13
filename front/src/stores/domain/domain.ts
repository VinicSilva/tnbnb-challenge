import { iSearchDomain } from '../../model/domainModel';
import { useNotification } from 'src/composable/notification';
import { iDomain, iDomainState } from 'src/model/domainModel';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import domainService from 'src/service/domainService';
const {
  requestAllDomain,
  requestAddDomain,
  requestSearchDomain,
  requestDeleteDomain,
} = domainService;
const { notification } = useNotification();

export const useDomainStore = defineStore('domain', {
  state: (): iDomainState => ({
    listDomain: [],
    pagination: {},
    loadingTable: false,
    loadingModal: false,
    form: {
      subdominio: '',
      id: null,
    },
    openModalDomain: false,
  }),
  getters: {},
  actions: {
    OPEN_MODAL_DOMAIN(value: boolean) {
      this.openModalDomain = value;
    },
    SET_FORM_DOMAIN(form: iDomain = {} as iDomain) {
      this.form = {
        ...form,
      };
    },
    async REQUEST_GET_DOMAIN(params: iSearchDomain = {}) {
      this.loadingTable = true;
      await requestAllDomain(params)
        .then(({ data }) => {
          this.listDomain = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_SEARCH_DOMAIN(params: iSearchDomain = {}) {
      this.loadingTable = true;
      await requestSearchDomain(params)
        .then(({ data }) => {
          this.listDomain = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_ADD_OR_UPDATE_DOMAIN(params: iDomain) {
      this.loadingModal = true;
      await requestAddDomain(params)
        .then(() => {
          notification.success();
          this.REQUEST_GET_DOMAIN();
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(({ response }) => {
          let configMessage = {};
          const error = response.data.message;
          if (error === 'domain_exists') {
            configMessage = { caption: 'Subdominio já existe!' };
          }
          notification.error(configMessage);
        });
    },
    async REQUEST_DELETE_DOMAIN(id: number) {
      await requestDeleteDomain(id)
        .then(async () => {
          notification.success();
          await this.REQUEST_GET_DOMAIN();
        })
        .catch(() => {
          notification.error();
        });
    },
  },
});
