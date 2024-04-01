import { useTranslate } from 'src/composable/translate';
import { useNotification } from 'src/composable/notification';
import { configPagination } from 'src/utils/index';
import { defineStore } from 'pinia';
import adminService from 'src/service/adminService';
const { requestRegisterAdmin } = adminService;
const { notification } = useNotification();
const { translate } = useTranslate();
export const useAdminStore = defineStore('admin', {
  state: (): any => ({
    loading: false,
    pagination: configPagination(),
  }),
  getters: {},
  actions: {
    async REQUEST_REGISTER_USER(params: any = {}) {
      if (params.password && params.password.length < 6) {
        notification.error({ caption: translate.value.message.invalid_password_size });
        return;
      }
      if (params.password !== params.password_confirmation) {
        notification.error({ caption: translate.value.message.passwords_do_not_match });
        return;
      }
      this.loading = true;
      await requestRegisterAdmin(params)
        .then(({ }) => {
          notification.success();
          setTimeout(() => window.location.href = '/signin', 1000)
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
