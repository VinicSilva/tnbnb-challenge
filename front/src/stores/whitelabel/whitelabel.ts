import { iWhitelabel, iWhitelabelState } from 'src/model/whitelabelModel';
import { defineStore } from 'pinia';
import { useNotification } from 'src/composable/notification';
import whitelabelService from 'src/service/whitelabelService';
import { configPagination } from 'src/utils';

const { notification } = useNotification();

const {
  requestAllWhitelabels,
  requestSearchWhitelabel,
  requestDeleteWhitelabel,
  requestCreateOrUpdateWhitelabel,
  requestSetWhitelabelActive,
} = whitelabelService;

const configForm = (data: iWhitelabel = {} as iWhitelabel): iWhitelabel => {
  return {
    id: data?.id ?? null,
    active: data?.active ?? 'N',
    name: data?.name ?? '',
    logo: data?.logo ?? '',
    button: data?.button ?? '#0c1427',
    header: data?.header ?? '#0c1427',
    modal: data?.modal ?? '#0c1427',
    sidebar_text: data?.sidebar_text ?? '#4c4c4c',
    sidebar_icon: data?.sidebar_icon ?? '#4c4c4c',
    login_background: data?.login_background ?? '#0c1427',
    card_login: data?.card_login ?? '#ffffffdb',
    sidebar: data?.sidebar ?? '#fff',
  };
};

export const useWhitelabelStore = defineStore('whitelabel', {
  state: (): iWhitelabelState => ({
    openModalWhitelabel: false,
    loadingTable: false,
    loadingModal: false,
    listWhitelabels: [],
    pagination: configPagination(),
    formWhitelabel: configForm(),
  }),
  actions: {
    OPEN_MODAL_WHITELABEL(value: boolean) {
      this.openModalWhitelabel = value;
    },
    SET_FORM_WHITELABEL(data: iWhitelabel = {} as iWhitelabel) {
      this.formWhitelabel = configForm(data);
    },
    async REQUEST_ALL_WHITELABELS(params = {}) {
      this.loadingTable = true;
      await requestAllWhitelabels(params)
        .then(({ data }) => {
          this.listWhitelabels = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_CREATE_OR_UPDATE_WHITELABEL(
      params: iWhitelabel = {} as iWhitelabel
    ) {
      this.loadingModal = true;
      await requestCreateOrUpdateWhitelabel(params)
        .then(async () => {
          if(params.active === 'S'){
            notification.info({
              message: 'A página será recarregada!',
            });
            setTimeout(() => {
              window.location.reload();
            }, 2500);
            return false;
          }
          notification.success();
          await this.REQUEST_ALL_WHITELABELS();
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(() => {
          notification.error();
        });
    },
    async REQUEST_SET_WHITELABEL_ACTIVE(id: number) {
      await requestSetWhitelabelActive(id)
        .then(async () => {
          notification.info({
            message: 'A página será recarregada!',
          });
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        })
        .catch(() => {
          notification.error();
        });
    },
    async REQUEST_SEARCH_WHITELABELS(params = {}) {
      this.loadingTable = true;
      await requestSearchWhitelabel(params)
        .then(({ data }) => {
          this.listWhitelabels = data.data;
          this.pagination = configPagination(data);
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_DELETE_WHITELABELS(id: number) {
      await requestDeleteWhitelabel(id)
        .then(async () => {
          notification.success();
          await this.REQUEST_ALL_WHITELABELS();
        })
        .catch(() => {
          notification.error();
        });
    },
  },
});
