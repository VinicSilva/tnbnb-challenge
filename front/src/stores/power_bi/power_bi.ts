import { defineStore } from 'pinia';
import { useNotification } from 'src/composable/notification';
import { iStatePowerBiTenant, iPowerBiTenant } from 'src/model/powerBiModel';
import powerBiTenantService from 'src/service/powerBiTenantService';

const { notification } = useNotification();

const {
  requestAddOrUpdatePowerBiTenant,
  requestAllPowerBi,
  requestDeletePowerBi,
} = powerBiTenantService;

const formConfig = (
  data: iPowerBiTenant = {} as iPowerBiTenant
): iPowerBiTenant => {
  return {
    id: data?.id ?? null,
    usuario_powerbi: data?.usuario_powerbi ?? '',
    nivel_autenticacao: data?.nivel_autenticacao ?? '',
    senha_powerbi: data?.senha_powerbi ?? '',
    client_id_azure: data?.client_id_azure ?? '',
    client_secret_azure: data?.client_secret_azure ?? '',
    diretorio_id_azure: data?.diretorio_id_azure ?? '',
  };
};

export const usePowerBiStore = defineStore('power_bi', {
  state: (): iStatePowerBiTenant => ({
    openModalPowerBi: false,
    listPowerBi: [],
    loadingTable: false,
    loadingModal: false,
    form: formConfig(),
  }),
  actions: {
    SET_FORM_POWER_BI(data: iPowerBiTenant = {} as iPowerBiTenant) {
      this.form = formConfig(data);
    },
    OPEN_MODAL_POWER_BI(value: boolean) {
      this.openModalPowerBi = value;
    },
    async REQUEST_GET_ALL_POWER_BI() {
      this.loadingTable = true;
      requestAllPowerBi()
        .then(({ data }) => {
          this.listPowerBi = data;
        })
        .finally(() => {
          this.loadingTable = false;
        });
    },
    async REQUEST_ADD_OR_UPDATE_POWER_BI(param: iPowerBiTenant) {
      this.loadingModal = true;
      requestAddOrUpdatePowerBiTenant(param)
        .then(async () => {
          notification.success();
          await this.REQUEST_GET_ALL_POWER_BI();
        })
        .finally(() => {
          this.loadingModal = false;
        })
        .catch(({ response }) => {
          const error = response.data.message;
          if (error === 'power_bi_exists') {
            notification.error({
              message: 'Power BI já Existe!',
            });
            return false;
          }
          notification.error();
        });
    },
    async REQUEST_REMOVE_POWER_BI(id: number) {
      await requestDeletePowerBi(id)
        .then(async () => {
          notification.success();
          await this.REQUEST_GET_ALL_POWER_BI();
        })
        .catch(() => {
          notification.error();
        });
    },
  },
});
