import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './module/user';
import articleModule from './module/article';
import tagModule from './module/tag';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    load: 0,
    tags: [
      {
        icon: "mdi-tag-outline",
        name: "标签一",
      },
      {
        icon: "mdi-tag-outline",
        name: "标签二",
      },
      {
        icon: "mdi-tag-outline",
        name: "标签三",
      },
    ],
    routes: 0,
    templist: [],
    artData: [],
    detaultlist: {
      total: 10,
      list: [
        {
          id: 1,
          active: false,
          tags: ["标签一"],
          browse: 0,
          comments: 0,
          stars: 0,
          title: "test",
          name: "tom",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          id: 2,
          active: false,
          tags: ["标签三", "标签二"],
          browse: 0,
          comments: 0,
          stars: 0,
          title: "kubernetes 高可用部署工具:sealos",
          name: "1",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `kubernetes 高可用部署工具:sealos`,
        },
        {
          id: 1,
          active: false,
          tags: ["标签一"],
          browse: 0,
          comments: 0,
          stars: 0,
          title: "3",
          name: "tom",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          id: 2,
          active: false,
          tags: ["标签三", "标签二"],
          browse: 0,
          comments: 0,
          stars: 0,
          title: "4",
          name: "1",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `kubernetes 高可用部署工具:sealos`,
        },
        {
          id: 1,
          active: false,
          tags: ["标签一"],
          browse: 0,
          comments: 0,
          stars: 0,
          title: "5",
          name: "tom",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          id: 2,
          active: false,
          tags: ["标签三", "标签二"],
          browse: 0,
          comments: 0,
          stars: 0,
          title: "6",
          name: "1",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          content: `kubernetes 高可用部署工具:sealos`,
        },
        {
          active: false,
          title: 7,
          content: 7,
        },
        {
          active: false,
          title: 8,
          content: 8,
        },
        {
          active: false,
          title: 9,
          content: 9,
        },
        {
          active: false,
          title: 10,
          content: 10,
        },
      ],
    }

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userModule,
    articleModule,
    tagModule,
  },
});
