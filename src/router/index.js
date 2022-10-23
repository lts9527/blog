import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/components/home/home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/platform',
    name: 'platform',
    redirect: '/platform/home',
    component: {
      render: c => c("router-view"),
    },
    children: [
      {
        path: 'home',
        name: 'platformhome',
        component: () => import('@/views/platform/platform.vue'),
        children: [
          {
            path: 'upload/text/edit',
            name: 'upload',
            component: () => import('@/components/article/edit/editor.vue'),
          }
        ]
      },
    ]
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/components/article/article.vue'),
    children: [
      {
        path: 'markdowndit',
        name: 'markdowndit',
        component: () => import('@/components/article/edit/markdowndit.vue'),
      },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/components/article/edit/editor.vue'),
      },
      {
        path: 'list/test',
        name: 'list',
        // component: () => import('@/components/article/list/test/test'),
        component: () => import('@/views/article/test.vue'),

      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
