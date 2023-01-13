import { RouteRecordRaw } from 'vue-router';

const routeUser: RouteRecordRaw[] = [
  {
    path: '',
    name: 'balance',
    meta: { auth: true },
    component: () => import('src/pages/balance/BalancePage.vue'),
  },
  {
    path: '/expenses',
    name: 'expenses',
    meta: { auth: true },
    component: () => import('src/pages/expense/ExpensePage.vue'),
  },
  {
    path: '/bank_checks',
    name: 'bank_checks',
    meta: { auth: true },
    component: () => import('src/pages/bank_check/BankCheckPage.vue'),
  }
];

export default routeUser;
