import { RouteRecordRaw } from 'vue-router';

const routeAdmin: RouteRecordRaw[] = [
  {
    path: '',
    name: 'admin_bank_checks',
    meta: { auth: true },
    component: () => import('src/pages/admin/BankCheck.vue'),
  },
];

export default routeAdmin;
