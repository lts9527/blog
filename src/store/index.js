import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './module/user';
import articleModule from './module/article';
import categoryModule from './module/category';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    load: 0,
    tags: [
      {
        icon: "mdi-tag-outline",
        text: "标签一",
      },
      {
        icon: "mdi-tag-outline",
        text: "标签二",
      },
      {
        icon: "mdi-tag-outline",
        text: "标签三",
      },
    ],
    templist: [],
    detaultlist: [
      {
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
        tags: ["标签三", "标签二"],
        browse: 0,
        comments: 0,
        stars: 0,
        title: "kubernetes 高可用部署工具:sealos",
        name: "1",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
    ],
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
    categoryModule,
  },
});
