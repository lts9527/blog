import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/components/home/home';
import store from '../store';

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
        // component: () => import('@/views/platform/platest.vue'),
        children: [
          // {
          //   path: 'upload/text/edit',
          //   name: 'upload',
          //   component: () => import('@/components/article/edit/editor.vue'),
          // },
          {
            path: "manager",
            name: "manager",
            component: {
              render: c => c("router-view"),
            },
            children: [
              {
                path: 'text',
                name: 'manager-text',
                component: () => import('@/views/platform/upload/manager/text.vue'),
              }
            ]
          },
          {
            path: 'todo',
            name: 'todo',
            redirect: '/platform/apps/todo/articles',
            component: () => import('@/views/platform/category/test.vue'),
            // component: () => import('@/views/platform/category/category.vue'),
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
              // {
              //   path: 'tags',
              //   name: 'tags',
              //   component: {
              //     render: c => c("router-view"),
              //   },
              //   component: () => import('@/views/platform/apps/todo/tags.vue'),
              // },
              {
                path: 'upload/text/edit',
                name: 'upload',
                component: () => import('@/views/platform/apps/todo/editor.vue'),
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

// 添加标签路由
var addTags = function () {
  // console.log("addTagsRoute")
  const tags = store.state.tags;
  let routerObj = {
    path: "",
    name: "",
    component: () => import("@/views/platform/apps/todo/articles.vue"),
  };
  tags.forEach((element, index) => {
    routerObj.path = `/platform/apps/todo/${index}`;
    routerObj.name = `tags-${index}`;
    router.addRoute("todo", routerObj);
  });
  // addTags = function () {}
}

addTags()

export default router;
