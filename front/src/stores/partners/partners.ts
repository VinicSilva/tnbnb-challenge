import { configPagination } from 'src/utils/index';
import { iPartners } from '../../model/partnersModel';
import { iPartnersState } from 'src/model/partnersModel';
import { iAddPartners, iSearchPartners } from './model';
import { defineStore } from 'pinia';
import { useNotification } from 'src/composable/notification';
import partnersService from 'src/service/partnersService';
const { notification } = useNotification();
const {
  requestAllPartners,
  requestAddOrUpdatePartners,
  requestDeletePartners,
  requestSearchPartners,
} = partnersService;

const formDataPartners = (form: iPartners = {} as iPartners): iPartners => {
  return {
    id: form?.id ?? null,
    user_id: form?.user_id ?? null,
    nome_parceiro: form?.nome_parceiro ?? '',
    email: form?.email ?? '',
    password: form?.password ?? '',
    situacao_parceiro: form?.situacao_usuario ?? '',
    subdominio_id: form?.subdominio_id ?? null,
    data_validate_teste: form?.data_validate_teste ?? '',
  };
};

export const usePartnersStore = defineStore('partners', {
  state: (): iPartnersState => ({
    openModalPartners: false,
    loadingModal: false,
    loadingTable: false,
    pagination: configPagination(),
    listPartners: [],
    form: formDataPartners(),
  }),
  getters: {},
  actions: {
    OPEN_MODAL_PARTNERS(value: boolean) {
      this.openModalPartners = value;
    },
    SET_FORM_PARTNERS(form: iPartners = {} as iPartners) {
      this.form = formDataPartners(form);
    },
    async REQUEST_GET_PARTERNS(params: iSearchPartners = {}) {
      this.loadingTable = true;
      await requestAllPartners(params)
        .then(({ data }) => {
          this.listPartners = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_ADD_OR_UPDATE_PARTERNS(params: iAddPartners) {
      this.loadingModal = true;
      await requestAddOrUpdatePartners(params)
        .then(async () => {
          notification.success();
          await this.REQUEST_GET_PARTERNS();
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(() => {
          notification.error();
        });
    },
    async REQUEST_PARTERNS(id: number) {
      await requestDeletePartners(id)
        .then(async () => {
          notification.success();
          await this.REQUEST_GET_PARTERNS();
        })
        .catch(() => {
          notification.error();
        });
    },
    async REQUEST_SEARCH_PARTNERS(search: string) {
      this.loadingTable = true;
      await requestSearchPartners(search)
        .then(({ data }) => {
          this.listPartners = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
  },
});
