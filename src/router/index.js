import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/components/home/home';
import store from '../store';
import tagReq from "@/store/module/tag"

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    redirect: '/platform/apps',
    component: {
      render: c => c("router-view"),
    },
    children: [
      {
        path: 'apps',
        name: 'apps',
        component: () => import('@/views/platform/platform.vue'),
        children: [
          {
            path: "video",
            name: "videoman",
            component: {
              render: c => c("router-view")
            }
          },
          {
            path: "category",
            name: "classman",
            component: () => import("@/views/platform/category/category.vue")
          },
          {
            path: 'todo',
            name: 'todo',
            redirect: '/platform/apps/todo/articles',
            component: () => import('@/views/platform/apps/todo/todo.vue'),
            children: [
              {
                path: 'articles',
                name: 'articles',
                component: () => import('@/views/platform/apps/todo/articles.vue'),
              },
              {
                path: 'draft',
                name: 'draft',
                component: () => import('@/views/platform/apps/todo/draft.vue'),
              },
              {
                path: 'edit',
                name: 'edit',
                component: () => import('@/views/platform/apps/todo/edit.vue'),
              },
              {
                path: 'tags/:id',
                name: 'tags',
                meta: {
                  icon: 'md-flower',
                  title: route => `{{ tags }}-${route.params.id}`,
                  notCache: true,
                  beforeCloseName: 'before_close_normal'
                },
                component: () => import('@/views/platform/apps/todo/tags.vue')
              },
            ]
          },

        ]
      },
    ]
  },
  {
    path: '/article',
    name: 'article',
    component: {
      render: c => c("router-view")
    },
    children: [
      // {
      //   path: 'markdowndit',
      //   name: 'markdowndit',
      //   component: () => import('@/components/article/edit/markdowndit.vue'),
      // },
      // {
      //   path: 'editor',
      //   name: 'editor',
      //   component: () => import('@/components/article/edit/editor.vue'),
      // },
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
