import { useTranslate } from 'src/composable/translate';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export function useListAllMenu() {
  const { translate } = useTranslate();
  return {
    up: computed(() => {
      return {
        partners: {
          text: translate.value.partners,
          icon: 'mdi-heart',
          to: '/partners',
          active: false,
          routename: 'partners',
        },
        domain: {
          text: translate.value.domain,
          icon: 'mdi-web',
          to: '/domain',
          active: false,
          routename: 'domain',
        },
        analyze: {
          text: 'Analise de uso',
          icon: 'mdi-chart-pie',
          to: '/analyze',
          active: false,
          routename: 'analyze',
        },
        companies: {
          text: translate.value.companies,
          icon: 'mdi-office-building',
          to: '/companies',
          active: false,
          routename: 'companies',
        },
        power_bi: {
          text: 'Power BI',
          icon: 'mdi-chart-box',
          to: '/powerbi',
          active: false,
          routename: 'power_bi',
        },
        users: {
          text: translate.value.users,
          icon: 'mdi-account-multiple',
          to: '/user',
          active: false,
          routename: 'user',
        },
        whitelabels: {
          text: translate.value.themes,
          icon: 'mdi-palette',
          to: '/whitelabels',
          active: false,
          routename: 'whitelabels',
        },
        groups: {
          text: translate.value.groups,
          icon: 'mdi-account-group',
          to: '/groups',
          active: false,
          routename: 'groups',
        },
        reports: {
          text: translate.value.reports,
          icon: 'mdi-file-chart',
          to: '/reports',
          active: false,
          routename: 'reports',
        },
        playlist: {
          text: translate.value.playlist,
          icon: 'mdi-youtube-tv',
          to: '/playlists',
          active: false,
          routename: 'playlists',
        },
        departament: {
          text: translate.value.department,
          icon: 'mdi-card-account-details',
          to: '/department',
          active: false,
          routename: 'department',
        },
        dashboard: {
          text: translate.value.dashboard,
          icon: 'fa-solid fa-gauge',
          to: '/dashboard',
          active: false,
          routename: 'dashboard',
        },
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
        checks: {
          text: translate.value.check,
          icon: 'mdi-credit-card-scan',
          to: '/checks',
          active: false,
          routename: 'checks',
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
        up.value.checks,
      ],
    };
  });
  return list.value;
}
