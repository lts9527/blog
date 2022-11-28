<template>
  <div>
    <v-card class="mt-04">
      <input
        class="input"
        placeholder="请输入文章标题(建议30个字以内)"
        style="margin-left:40px;max-width: 730px;color:# CDD0D4"
        v-model="article.title"
      />
      <v-row justify="center">
        <v-card outlined class="mb-5 mx-13" width="90%">
          <v-md-editor v-model="article.content" height="450px" />
        </v-card>
      </v-row>
      <v-btn
        text
        class="ml-10"
        depressed
        small
        type="text"
        color
        @click="settings = ! settings"
      >更多设置</v-btn>
      <v-row>
        <v-col class="pl-13">
          <v-card v-show="settings" width="95%" tile>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>标签</v-list-item-title>
                <v-autocomplete
                  :items="tags"
                  dense
                  chips
                  clearable
                  deletable-chips
                  small-chips
                  multiple
                ></v-autocomplete>
              </v-list-item-content>
            </v-list-item>
            <v-card-subtitle>文章封面</v-card-subtitle>
            <v-card-actions>
              <v-file-input
                style="margin-top: -80px;margin-left: 80px;"
                v-model="value"
                prepend-icon="mdi-image"
                hide-input
                accept="image/*"
                label="File input"
                v-on:change="getCover"
              ></v-file-input>
            </v-card-actions>

            <v-img :src="src" width="200" :aspect-ratio="16/9"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-container>
      <v-btn class="ml-7" color="primary">发布文章</v-btn>
      <v-btn class="ml-6" @click="getCover">存草稿</v-btn>
    </v-container>
  </div>
</template>
  
  <script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        {
          color: "#1F7087",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          title: "Supermodel",
          artist: "Foster the People",
        },
      ],
      value: {},
      src: {},
      show: false,
      settings: true,
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
      tags: [
        "foo",
        "bar",
        "fizz",
        "buzz",
        "buzz1",
        "buzz2",
        "buzz3",
        "buzz4",
        "buzz5",
        "buzz6",
      ],
    };
  },
  mounted() {
    this.tags = this.$store.state.tags;
    // console.log("this.tags", this.tags);
  },
  computed: {},
  watch: {},
  // 加载页面完毕时获取分类列表
  created() {
    mapActions("articleModule", {
      articleList: "list",
    });
    // 请求api
    this.articleList(9527)
      .then((list) => {
        this.btns = list;
      })
      .catch((err) => {
        console.log("get article list err:", err.response.data.message);
      });
  },
  methods: {
    ...mapActions("articleModule", {
      articleCreate: "create",
      articleList: "list",
    }),
    getCover() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.value);
      fileReader.onload = (temp) => {
        this.src = temp.target.result;
      };
    },
  },
};
</script>
  
  <style scoped>
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}

.v-md-editor__toolbar {
  border-bottom: none;
}

.v-md-editor {
  box-shadow: none;
}

.input::placeholder {
  color: #cdd0d4;
}

input {
  width: 100%;
  outline: none;
  height: 64px;
  border: 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 40px;
  margin-left: 20px;
  color: #2c3e50;
}
</style>