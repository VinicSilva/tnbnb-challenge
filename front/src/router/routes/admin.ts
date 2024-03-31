import { RouteRecordRaw } from 'vue-router';

const routeAdmin: RouteRecordRaw[] = [
  {
    path: '',
    name: 'admin_users',
    meta: { auth: true },
    component: () => import('src/pages/expense/ExpensePage.vue'),
  },
];

export default routeAdmin;
