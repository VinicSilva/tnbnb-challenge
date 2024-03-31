import { useTranslate } from 'src/composable/translate';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export function useListAllMenu() {
  const { translate } = useTranslate();
  return {
    up: computed(() => {
      return {
        admin_users: {
          text: translate.value.users,
          icon: 'fa-solid fa-users',
          to: '/',
          active: false,
          routename: 'admin_users',
        },
      };
    }),
    down: computed(() => {
      return [];
    }),
  };
}

export const isActiveMenu = (menu: string) => {
  const router = useRouter();
  return menu === router?.currentRoute?.value?.name;
};

export function useMenuByUser() {
  const { up } = useListAllMenu();
  const list = computed(() => {
    return {
      admin: [up.value.admin_users],
      customer: [],
    };
  });
  return list.value;
}
