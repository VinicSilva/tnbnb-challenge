import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'balance', component: () => import('src/pages/customer/Balance.vue') },
      { path: '/expenses', name: 'expenses', component: () => import('src/pages/customer/Expenses.vue') },
      { path: '/checks', name: 'checks', component: () => import('src/pages/customer/Checks.vue') },
      { path: '/logout', name: 'logout', component: () => import('src/pages/customer/Logout.vue') },
    ],

  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('src/layouts/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('layouts/SignUp.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
