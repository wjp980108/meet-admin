import type { RouteRecordRaw } from 'vue-router';

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
      title: '登录',
      isWithoutTab: true,
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: '404',
      isWithoutTab: true,
    },
    component: () => import('@/views/error/404.vue'),
  },
];
