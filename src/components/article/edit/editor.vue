<template>
  <div>
    <v-tabs align-with-title>
      <v-tab>Item One</v-tab>
      <v-tab>Item Two</v-tab>
      <v-tab>Item Three</v-tab>
    </v-tabs>
    <v-tabs class="tabs" slider-size="0" height="15" align-with-title>
      <v-tab class="tabs-tab">编辑文章</v-tab>
      <v-tab>草稿箱</v-tab>
    </v-tabs>
    <v-card class="mt-4">
      <input
        class="input"
        placeholder="请输入文章标题(建议30个字以内)"
        style="margin-left:52px;max-width: 730px;color:# CDD0D4"
        v-model="article.title"
      />
      <v-card outlined class="mb-5 mx-13" width="90%">
        <v-md-editor v-model="article.content" height="450px" />
      </v-card>
      <v-expansion-panels accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header style="width:140px;left: 30px;">更多设置</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card style="margin-top: -20px;">
              <v-card-title style="margin-left: 13px;">选择文章分类</v-card-title>
              <v-tabs class="mx-6" centered>
                <v-container v-for="item in items" :key="item.title" class="pa-2" outlined tile>
                  <v-menu transition="fade-transition" open-on-hover top offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        :color="item.color"
                        elevation="0"
                        v-bind="attrs"
                        v-on="on"
                      >{{item.title}}</v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        @click="setCategory(item.title, subtitle)"
                        dense
                        :key="i"
                        v-for="subtitle,i in item.subtitle"
                      >
                        <v-list-item-content>
                          <v-list-item-title v-text="subtitle"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-container>
              </v-tabs>
              <v-card-text class="ml-4">当前选择的分类: {{ CurrentCategory }}</v-card-text>
              <v-card-title class="ml-4" style="margin-top: -30px;">
                添加标签
                <v-card-subtitle :v-model="tagslen">(还可以添加{{ tagslen }}个标签)</v-card-subtitle>
                <v-text-field
                  class="mt-6 field"
                  label="tag"
                  v-model="inputValue"
                  v-on:blur="blur"
                  @keyup.enter="pushtoArray(inputValue)"
                  :rules="rules"
                  :error-messages="errormsg"
                  filled
                  rounded
                  clearable
                  dense
                ></v-text-field>
              </v-card-title>
              <v-row justify="space-around" style="margin-bottom: 50px;margin-top: -40px;">
                <v-col cols="12" sm="10" md="6">
                  <v-sheet>
                    <v-chip-group class="tag-location" multiple>
                      <v-chip
                        close
                        :color="getcolor()"
                        v-on:click:close="tagdelete(tag)"
                        v-for="tag in tags"
                        :key="tag"
                      >{{ tag }}</v-chip>
                    </v-chip-group>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-container>
      <v-btn class="ml-10" v-on:click="create" color="primary">发布文章</v-btn>
      <v-btn class="ml-6">存草稿</v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
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
        tags: [],
      },
      btns: [
        // {
        //   name: "前端",
        //   rounded: "0",
        //   color: "",
        //   sub_catgory: ["vue", "react", "javascript"],
        // },
        // {
        //   name: "后端",
        //   rounded: "lg",
        //   color: "",
        //   sub_catgory: ["go", "rust", "java", "php"],
        // },
        // {
        //   name: "运维",
        //   rounded: "lg",
        //   color: "",
        //   sub_catgory: ["k8s", "docker", "nginx", "linux"],
        // },
        // {
        //   name: "中间件",
        //   rounded: "0",
        //   color: "",
        //   sub_catgory: ["mysql", "redis", "etcd", "mq"],
        // },
      ],
      items: [
        {
          title: "分类1",
          color: "",
          subtitle: ["分类1-1", "分类1-2"],
        },
        {
          title: "分类2",
          color: "",
          subtitle: ["分类2-1", "分类2-2"],
        },
        {
          title: "分类3",
          color: "",
          subtitle: ["分类3-1", "分类3-2", "分类3-3", "分类3-4"],
        },
        {
          title: "分类4",
          color: "",
          subtitle: ["分类4-1", "分类4-2", "分类4-3"],
        },
        {
          title: "分类5",
          color: "",
          subtitle: ["分类5-1", "分类5-2", "分类5-3", "分类5-4"],
        },
        {
          title: "分类6",
          color: "",
          subtitle: ["分类6-1", "分类6-2", "分类6-3", "分类6-4"],
        },
        {
          title: "分类7",
          color: "",
          subtitle: ["分类6-1", "分类6-2", "分类6-3", "分类6-4"],
        },
      ],
      CurrentCategory: "",
      tags: ["test"],
      inputValue: "",
      rules: [
        // (value) => !!value || "Required.",
        (value) => (value || "").length <= 10 || "Max 10 characters",
        // 电子邮件规则
        // (value) => {
        //   const pattern =
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return pattern.test(value) || "Invalid e-mail.";
        // },
      ],
      tagslen: 9,
      errormsg: "",
      tagcolor: "primary",
      benched: 0,
    };
  },
  computed: {
    // items() {
    //   return Array.from({ length: this.length }, (k, v) => v + 1);
    // },
    length() {
      return 1;
    },
  },
  watch: {},
  // 加载页面完毕时获取分类列表
  created() {
    // mapActions("articleModule", {
    //   articleList: "list",
    // });
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
    create() {
      if (this.article.category_id === 0) {
        alert("请选择分类");
        return;
      }
      this.article["tags"] = this.tags;
      console.log("this.article", this.article);
      // 请求api
      this.articleCreate(this.article)
        .then((articleID) => {
          // 跳转首页
          // this.$router.replace({ name: "Home" });
          console.log("article id:", articleID);
          this.$dialog.notify.success("创建成功", {
            position: "top-right",
            timeout: 2000,
          });
        })
        .catch((err) => {
          if (err.response.data.hasOwnProperty(err.response.data.message)) {
            this.$dialog.notify.error(err.response.data.message, {
              position: "top-right",
              timeout: 2000,
            });
            return;
          }
          this.$dialog.notify.error("创建文章失败，请重试", {
            position: "top-right",
            timeout: 2000,
          });
        });
    },
    setCategory(title, subtitle) {
      this.templist = [];
      for (let i in this.article) {
        if (subtitle === this.article[i].category) {
          let temparr = this.article[i].list;
          this.templist = temparr;
        }
      }
      for (let i in this.items) {
        this.items[i].color = "";
      }
      for (let i in this.items) {
        if (title === this.items[i].title) {
          this.items[i].color = "success";
          this.CurrentCategory = title + "  =>  " + subtitle;
          break;
        }
      }
    },
    getArray(obj) {
      for (var i in this.btns) {
        if (obj.name === this.btns[i].name) {
          if (this.btns[i].hasOwnProperty("sub_category")) {
            return this.btns[i].sub_category;
          }
        }
      }
      return undefined;
    },
    pushtoArray(mydata) {
      if (mydata.length === 0) {
        this.errormsg = "Required";
        return;
      }
      if (this.tagslen === 0) {
        this.errormsg = "超过最大可添加值";
        return;
      }
      if (mydata.length > 10) {
        this.errormsg = "名称最长为十位数";
        return;
      }
      var oktopush = true;
      for (var ele in this.tags) {
        if (this.tags[ele] == mydata) {
          oktopush = false;
          this.errormsg = "标签已存在";
          this.inputValue = "";
          return;
        }
      }
      if (oktopush) {
        console.log("this", this);
        this.tags.push(mydata);
        this.tagslen--;
        this.errormsg = "";
        this.inputValue = "";
      }
    },
    blur() {
      this.errormsg = "";
      this.inputValue = "";
    },
    tagdelete(name) {
      this.tags.splice(this.tags.indexOf(name), 1);
      this.tagslen++;
    },
    getcolor() {
      return "primary";
    },
    test() {
      this.$router.push({
        name: "list",
        params: {
          article: {
            title: this.article.title,
            content: this.article.content,
          },
        },
      });
    },
  },
};
</script>

<style>
/* .row .justify-space-around {
  width: 0;
  height: 0;
} */

.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none;
}

.v-md-editor__toolbar {
  border-bottom: none;
}

/* .v-card {
  position: static;
} */

.v-md-editor {
  box-shadow: none;
}

.tag-location {
  left: 30px;
  /* top: 70%; */
  /* position: fixed; */
  /* bottom: 20%; */
  /* margin-bottom: 10px; */
  position: absolute;
}

.tag-ipnut {
  max-width: 300px;
  top: 40%;
  position: absolute;
}

.field {
  max-width: 300px;
}

.tag-ps {
  /* max-width: 200px; */
  /* left: 11%; */
  /* top: 47.5%; */
  /* position: absolute; */
}

.article-row {
  top: 50px;
  position: relative;
}

.test {
  width: auto;
  height: 630px;
  /* border: 1px solid #e6e9ef; */
  margin-top: 10px;
}

.tabs {
  margin-top: 10px;
  padding-top: 4px;
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