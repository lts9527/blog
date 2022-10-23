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
    <v-card style="top: 15px;">
      <v-virtual-scroll :bench="1" :items="items" height="600px" item-height="600">
        <input
          class="input"
          placeholder="请输入文章标题(建议30个字以内)"
          style="margin-left:100px;max-width: 730px;color:# CDD0D4"
          v-model="article.title"
        />
        <v-card outlined style="width: 90%;height: auto;margin-left: 5%;margin-bottom: 20px;">
          <v-md-editor
            style="width: 90%;margin-left: 5%;"
            v-model="article.content"
            height="450px"
          />
        </v-card>
        <v-expansion-panels accordion flat>
          <v-expansion-panel>
            <v-expansion-panel-header style="width:140px;left: 30px;">更多设置</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card height="400px">
                <v-card-title style="margin-left: 13px;">选择文章分类</v-card-title>
                <v-row justify="space-around">
                  <v-menu v-for="obj in btns" :key="obj.name" :rounded="obj.rounded" offset-y>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        :color="obj.color"
                        rounded
                        class="ma-5"
                        v-bind="attrs"
                        v-on="on"
                      >{{ obj.name }}</v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="item in getArray(obj)" :key="item" link>
                        <v-list-item-title @click="setCategory(item)" v-text="item"></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-card-text style="margin-left: 3%;">当前选择的分类: {{ CurrentCategory }}</v-card-text>
                </v-row>
                <v-card-title style="margin-left: 13px;">添加标签</v-card-title>
                <v-card-text class="tag-ps" :v-model="tagslen">(还可以添加{{ tagslen }}个标签)</v-card-text>
                <v-col class="tag-ipnut" align-self="center" cols="12" sm="6" md="6">
                  <v-text-field
                    style="left: 100%;max-width: 230px;"
                    label="tag"
                    v-model="inputValue"
                    v-on:blur="blur"
                    @keyup.enter="pushtoArray(inputValue)"
                    :rules="rules"
                    :error-messages="errormsg"
                    filled
                    rounded
                  ></v-text-field>
                </v-col>
                <v-row justify="space-around">
                  <v-col cols="12" sm="10" md="12">
                    <v-sheet elevation="0" class="py-4 px-1">
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
        <v-btn v-on:click="test" color="primary" style="top: 30px; left:55px">发布文章</v-btn>
        <v-btn style="top: 30px; margin-left:80px">存草稿</v-btn>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      article: {
        title: "",
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
      btns: [
        {
          name: "前端",
          rounded: "0",
          color: "",
          label: ["vue", "react", "javascript"],
        },
        {
          name: "后端",
          rounded: "lg",
          color: "",
          label: ["go", "rust", "java", "php"],
        },
        {
          name: "运维",
          rounded: "lg",
          color: "",
          label: ["k8s", "docker", "nginx", "linux"],
        },
        {
          name: "中间件",
          rounded: "0",
          color: "",
          label: ["mysql", "redis", "etcd", "mq"],
        },
      ],
      CurrentCategory: "",
      tags: ["Work", "Home Improvement"],
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
      // tagslen: this.getLen(["Work", "Home Improvement"]),
      // tagslen: this.getLen(),
      tagslen: 8,
      errormsg: "",
      tagcolor: "primary",
      benched: 0,
    };
  },
  computed: {
    items() {
      return Array.from({ length: this.length }, (k, v) => v + 1);
    },
    length() {
      return 1;
    },
  },
  watch: {},
  methods: {
    getArray(obj) {
      for (var i in this.btns) {
        if (obj.name === this.btns[i].name) {
          return this.btns[i].label;
        }
      }
    },
    setCategory(name) {
      for (var i in this.btns) {
        for (var j in this.btns[i].label) {
          if (name === this.btns[i].label[j]) {
            this.Identification = !this.Identification;
            this.btns[i].color = "primary";
            this.CurrentCategory =
              this.btns[i].name + " => " + this.btns[i].label[j];
            break;
          }
          this.btns[i].color = "";
        }
      }
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
  left: 5%;
  /* top: 70%; */
  /* position: fixed; */
  bottom: 20%;
  /* margin-bottom: 10px; */
  position: absolute;
}

.tag-ipnut {
  max-width: 300px;
  top: 40%;
  position: absolute;
}

.tag-ps {
  max-width: 200px;
  left: 11%;
  top: 47.5%;
  position: absolute;
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