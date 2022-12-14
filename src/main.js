/* eslint-disable quotes */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/css/global.css'

import vuetify from './plugins/vuetify';
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'


Vue.use(VuetifyDialog, {
  context: {
    vuetify
  },
})

// html预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// 编辑组件
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

// 自定义通知组件
// import Notification from "@/components/notification/index.js";
// Vue.use(Notification);

VMdEditor.use(githubTheme, {
  Hljs: hljs,
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(VMdPreview);
Vue.use(VMdEditor);


// 回到顶层
Vue.prototype.$scrollTo = (x = 0, y = 0, type = 'smooth') => {
  window.scrollTo({
    top: x,
    left: y,
    behavior: type // 滚动行为：smooth平滑滚动，instant瞬间滚动，默认值auto，等同于instant
  })
}

Vue.config.productionTip = false;

// axios
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
