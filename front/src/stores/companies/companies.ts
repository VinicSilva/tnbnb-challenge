import { iSearchCompanies } from '../../model/companiesModel';
import { configPagination } from 'src/utils/functions/paginate';
import { useNotification } from 'src/composable/notification';
import { defineStore } from 'pinia';
import {
  iStateCompanies,
  iCompanies,
  iFormCompanies,
} from 'src/model/companiesModel';

import companiesService from 'src/service/companiesService';

const {
  requestAllCompanies,
  requestSearchCompanies,
  requestAddOrUpdateCompanies,
  requestDeleteCompanies,
} = companiesService;
const { notification } = useNotification();

const dataForm = (
  data: iFormCompanies = {} as iFormCompanies
): iFormCompanies => {
  return {
    id: data?.id || null,
    userId: data?.userId || null,
    nome_tenant: data?.nome_tenant || '',
    email: data?.email || '',
    password: data?.password || '',
    conta_powerbi: data?.conta_powerbi || '',
    tipo_filtro: data?.tipo_filtro || '',
    limit_usuarios: data?.limit_usuarios || 1,
    ativar_filtro: data?.ativar_filtro || 'N',
    ativar_ris: data?.ativar_ris || 'N',
    permite_definir_tema: data?.permite_definir_tema || 'N',
    permite_definir_subdominio: data?.permite_definir_subdominio || 'N',
    listFilter: data?.listFilter || [],
    listRis: data?.listRis || [],
  };
};

export const useCompaniesStore = defineStore('companies', {
  state: (): iStateCompanies => ({
    openModal: false,
    loadingModal: false,
    loadingTable: false,
    listCompanies: [],
    form: dataForm(),
    pagination: configPagination(),
  }),
  actions: {
    SET_OPEN_MODAL_COMPANIES(value: boolean) {
      this.openModal = value;
    },
    SET_FORM_COMPANIES(data: iFormCompanies = {} as iFormCompanies) {
      this.form = dataForm(data);
    },
    async REQUEST_GET_ALL_COMPANIES(params: iSearchCompanies = {}) {
      this.loadingTable = true;
      await requestAllCompanies(params)
        .then(({ data }) => {
          this.listCompanies = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_SEARCH_COMPANIES(params = {}) {
      this.loadingTable = true;
      await requestSearchCompanies(params)
        .then(({ data }) => {
          this.listCompanies = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_ADD_OR_UPDATE_COMPANIES(
      params: iFormCompanies = {} as iFormCompanies
    ) {
      this.loadingModal = true;
      await requestAddOrUpdateCompanies(params)
        .then(async () => {
          notification.success();
          await this.REQUEST_GET_ALL_COMPANIES();
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(() => {
          notification.error();
        });
    },
    async REQUEST_DELETE_COMPANIES(id: number | number[]) {
      await requestDeleteCompanies(id)
        .then(async () => {
          notification.success();
          this.REQUEST_GET_ALL_COMPANIES();
        })
        .catch(() => {
          notification.error();
        });
    },
  },
});
