import { useTranslate } from 'src/composable/translate';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export function useListAllMenu() {
  const { translate } = useTranslate();
  return {
    up: computed(() => {
      return {
        balance: {
          text: translate.value.balance,
          icon: 'fa-solid fa-balance-scale',
          to: '/',
          active: false,
          routename: 'balance',
        },
        expenses: {
          text: translate.value.expense,
          icon: 'mdi-arrow-bottom-left',
          to: '/expenses',
          active: false,
          routename: 'expenses',
        },
        bank_checks: {
          text: translate.value.bank_checks,
          icon: 'mdi-credit-card-scan',
          to: '/bank_checks',
          active: false,
          routename: 'bank_checks',
        },
        admin_bank_checks: {
          text: translate.value.admin_bank_checks,
          icon: 'fa-solid fa-bank',
          to: '/',
          active: false,
          routename: 'admin_bank_checks',
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
      admin: [
        up.value.admin_bank_checks,
      ],
      customer: [
        up.value.balance,
        up.value.expenses,
        up.value.bank_checks,
      ],
    };
  });
  return list.value;
}
