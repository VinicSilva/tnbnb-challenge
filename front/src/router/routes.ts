import { RouteRecordRaw } from 'vue-router';

import routeAdmin from './routes/admin';
import routeCustomer from './routes/customer';
import { useMenu } from 'src/composable/menu';
const { listRoutesAllowed} = useMenu();

const confiRoutes = (type: string | null = null) => {
  switch (type) {
    case 'admin':
      return routeAdmin;
    case 'customer':
      return routeCustomer;
    default:
      return [];
  }
};

export function routes(type: string | null = null) {
  const pageAll = confiRoutes(type);
  
  const listPagesAllowed = pageAll.filter((page: any) => {
    return listRoutesAllowed.value.includes(page.name);
  });

  const routesDefault: RouteRecordRaw[] = [
    {
      path: '/signin',
      name: 'signin',
      component: () => import('src/pages/signin/SigninPage.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('src/pages/signup/SignupPage.vue'),
    },
    {
      path: '/',
      meta: { auth: true },
      component: () => import('src/layouts/Layout.vue'),
      children: listPagesAllowed,
    },
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue'),
    },
  ];

  return routesDefault;
}
