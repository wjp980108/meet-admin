import type { RouteRecordRaw } from 'vue-router';
import { $t } from '@/utils';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/appRoot',
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: $t('page.login.title'),
      isWithoutTab: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: {
      title: '404',
      isWithoutTab: true,
    },
    component: () => import('@/views/error/404.vue'),
  },
];
