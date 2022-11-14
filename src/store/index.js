import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './module/user';
import articleModule from './module/article';
import categoryModule from './module/category';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
