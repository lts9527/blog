<template>
  <div>
    <List v-show="!edit" :list="list" v-on:opEdit="opEdit">
      <template v-slot:create-time>2022-11-06 19:33:13</template>
      <template v-slot:edit-time>2022-11-06 19:33:13</template>
    </List>

    <Edit v-if="edit" :article="article" v-on:before="returnList"></Edit>
  </div>
</template>

<script>
import List from "@/components/article/list/list.vue";
import Edit from "@/components/article/edit/edit.vue";
export default {
  components: {
    List,
    Edit,
  },
  data() {
    return {
      edit: false,
      article: {
        user_id: 9527,
        category_id: 0,
        title: "test",
        content: `\`\`\`js
      import Vue from 'vue';
      import VueMarkdownEditor from '@kangc/v-md-editor';
      import '@kangc/v-md-editor/lib/style/base-editor.css';
      import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
      
      VueMarkdownEditor.use(vuepressTheme);
      
      Vue.use(VueMarkdownEditor);
      \`\`\`
      `,
      },
      list: [],
    };
  },
  created() {
    this.list = this.$store.state.detaultlist;
  },
  methods: {
    opEdit(value) {
      this.edit = true;
    },

    returnList(value) {
      this.edit = false;
    },

    test() {
      alert(1);
    },
  },
};
</script>

<style>
</style>