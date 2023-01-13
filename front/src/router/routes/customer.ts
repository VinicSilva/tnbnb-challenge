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
    path: '/checks',
    name: 'checks',
    meta: { auth: true },
    component: () => import('src/pages/check/CheckPage.vue'),
  }
];

export default routeUser;
