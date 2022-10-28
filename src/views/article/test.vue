<template>
  <div id="article">
    <div id="article-head">
      <v-card elevation="0" class="mx-auto" max-width="900" tile>
        <v-list-item>
          <v-list-item-content style="text-align: center;">
            <v-list-item-title id="article-title">kubernetes 高可用部署工具:sealos</v-list-item-title>
            <v-btn id="article-category" v-on:click="test" height="auto" text>手机游戏</v-btn>
            <v-list-item-subtitle style="font-size:13px">2022-08-26 08:19 3.5万阅读 · 1567喜欢 · 783评论</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

    <div id="article-content">
      <v-md-editor
        :before-preview-change="next(text)"
        v-model="text"
        mode="preview"
        default-show-toc
        height="auto"
      ></v-md-editor>
    </div>

    <div id="article-comments">
      <v-card elevation="0" max-width="auto" class="mx-auto">
        <div style="font-size: 18px;padding-top: 20px;margin-left: 20px;">783 评论</div>
        <v-list three-line>
          <v-tabs>
            <v-tab>按热度排序</v-tab>
            <v-tab>按时间排序</v-tab>
          </v-tabs>
          <v-container style="min-width: 100%;margin-bottom: 50px;" fluid>
            <v-row style="max-height: 80px;">
              <v-avatar id="article-comments-inputbox-headportrait">
                <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
              </v-avatar>
              <v-col cols="12" sm="9">
                <div id="article-comments-inputbox">
                  <v-textarea
                    id="articleDetail"
                    :error-messages="article.comments.inputbox.errorMessages"
                    clearable
                    counter="100"
                    v-model="tempcomment"
                    style="padding: 5px;white-space:pre-wrap"
                    label="发表评论"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="60"
                  ></v-textarea>
                </div>
                <v-btn
                  id="article-comments-sendbutton"
                  @click="comment"
                  elevation="0"
                  color="#37A0D3"
                  height="64"
                  width="70"
                >发表评论</v-btn>
              </v-col>
            </v-row>
          </v-container>

          <template v-for="(item, index) in items">
            <v-divider v-if="item.divider" :key="index" :inset="item.inset"></v-divider>
            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.name"></v-list-item-title>
                <v-list-item-subtitle style="-webkit-box-orient:horizontal;" v-html="item.content"></v-list-item-subtitle>
                <v-list-item-action-text style v-text="item.createtime"></v-list-item-action-text>
                <v-btn plain icon max-width="0" style="left: -85%;bottom: 1px;">
                  <v-icon small>mdi-thumb-up-outline</v-icon>
                  <v-list-item-action-text v-html="item.stars"></v-list-item-action-text>
                </v-btn>
                <v-btn plain icon max-width="0" style="left: -80%;bottom: 1px;">
                  <v-icon small>mdi-thumb-down-outline</v-icon>
                </v-btn>
                <v-tab
                  @click="item.reply=!item.reply"
                  style="color: rgba(0, 0, 0, 0.6);min-width: 0;right: -22%;font-size: 12px;max-height: 0px;bottom: 22px;"
                >回复</v-tab>

                <template v-for="(itemv, index) in item.usercontent">
                  <v-divider v-if="itemv.divider" :key="index" :inset="itemv.inset"></v-divider>
                  <v-list-item v-else :key="itemv.title">
                    <v-list-item-avatar>
                      <v-img :src="itemv.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="itemv.name"></v-list-item-title>
                      <v-list-item-subtitle
                        style="-webkit-box-orient:horizontal;"
                        v-html="itemv.content"
                      ></v-list-item-subtitle>
                      <v-list-item-action-text style v-text="itemv.createtime"></v-list-item-action-text>
                      <v-btn plain icon max-width="0" style="left: -85%;bottom: 1px;">
                        <v-icon small>mdi-thumb-up-outline</v-icon>
                        <v-list-item-action-text v-html="itemv.stars"></v-list-item-action-text>
                      </v-btn>
                      <v-btn plain icon max-width="0" style="left: -80%;bottom: 1px;">
                        <v-icon small>mdi-thumb-down-outline</v-icon>
                      </v-btn>
                      <v-tab
                        @click="itemv.reply=!itemv.reply"
                        style="color: rgba(0, 0, 0, 0.6);min-width: 0;right: -22%;font-size: 12px;max-height: 0px;bottom: 22px;"
                      >回复</v-tab>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <v-container v-if="item.reply" style="min-width: 100%;margin-bottom: 50px;" fluid>
                  <v-row style="max-height: 80px;">
                    <v-avatar id="article-comments-inputbox-headportrait">
                      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                    </v-avatar>
                    <v-col cols="12" sm="9">
                      <div id="article-comments-inputbox">
                        <v-textarea
                          id="articleDetail"
                          :error-messages="item.errorMessages"
                          clearable
                          counter="100"
                          v-model="item.replycontent"
                          style="padding: 5px;white-space:pre-wrap"
                          label="发表评论"
                          auto-grow
                          outlined
                          rows="1"
                          row-height="60"
                        ></v-textarea>
                      </div>
                      <v-btn
                        id="article-comments-sendbutton"
                        @click="commentSeparate(item)"
                        elevation="0"
                        color="#37A0D3"
                        height="64"
                        width="70"
                      >发表评论</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </div>

    <div id="article-navigation" class="d-flex flex-column mb-6">
      <v-card elevation="0" max-width="64">
        <v-btn
          color="#ffffff"
          class="rightbar-btn"
          v-for="(item, i) in rightbar"
          :key="i"
          elevation="0"
          min-height="62"
          @click="setstatus(i)"
        >
          <v-icon :color="item.color" v-text="item.icon"></v-icon>
          <div style="position: absolute;top: 25px;">{{item.nums}}</div>
        </v-btn>
      </v-card>
      <v-btn @click="top" id="article-navigation-top" color="#ffffff" elevation="0" min-height="56">
        <v-icon>mdi-apple-keyboard-control</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import { formatterDate } from "@/utils/date";
export default {
  data() {
    return {
      tempcomment: "",
      items: [
        // { header: "按热度排行" },
        {
          createtime: "2022-08-26 20:05",
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "tom",
          content: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          usercontent: [
            {
              createtime: "2022-08-26 20:05",
              stars: 0,
              reply: false,
              replycontent: "",
              errorMessages: "",
              avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
              name: "tom",
              content: ` test`,
            },

            {
              createtime: 0,
              stars: 0,
              reply: false,
              replycontent: "",
              errorMessages: "",
              avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
              name: "jack",
              content: ` Wish I could come, but I'm out of town this weekend.`,
            },
          ],
        },
        { divider: true, inset: true },
        {
          createtime: 0,
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          name: "jack",
          usercontent: [],
          content: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          createtime: 0,
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          name: "test",
          usercontent: [],
          content:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          createtime: 0,
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          name: "ss",
          usercontent: [],
          content:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          createtime: 0,
          stars: 0,
          reply: false,
          replycontent: "",
          errorMessages: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          name: "77",
          usercontent: [],
          content:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
      rightbar: [
        {
          icon: "mdi-thumb-up-outline",
          inc_icon: "mdi-thumb-up-outline",
          fin_icon: "mdi-thumb-up",
          status: false,
          color: "",
          nums: 0,
        },
        {
          icon: "mdi-cards-heart-outline",
          inc_icon: "mdi-cards-heart-outline",
          fin_icon: "mdi-cards-heart",
          status: false,
          color: "",
          nums: 0,
        },
        {
          icon: "mdi-message-processing-outline",
          inc_icon: "mdi-message-processing-outline",
          fin_icon: "mdi-message-processing-outline",
          // color: "",
          nums: 0,
        },
        {
          icon: "mdi-open-in-new",
          inc_icon: "mdi-open-in-new",
          fin_icon: "mdi-open-in-new",
          // color: "",
          // nums: 0,
        },
      ],
      fab: true,
      text: `<h1 align="center">Markdown Editor built on Vue</h1>

<p align="center">
  <a href="https://npmcharts.com/compare/@kangc/v-md-editor?minimal=true"><img src="https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/v/@kangc/v-md-editor.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true" alt="License"></a>
</p>

## Links
- [Demo](https://code-farmer-i.github.io/vue-markdown-editor/examples/base-editor.html)
- [Documentation](https://code-farmer-i.github.io/vue-markdown-editor/)
- [Changelog](https://code-farmer-i.github.io/vue-markdown-editor/changelog.html)

## Install

## Quick Start
\`\`\`bash
# use npm
npm i @kangc/v-md-editor -S

# use yarn
yarn add @kangc/v-md-editor
\`\`\`

## Quick Start

\`\`\`js
import Vue from 'vue';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

VueMarkdownEditor.use(vuepressTheme);

Vue.use(VueMarkdownEditor);
\`\`\`

## Usage

\`\`\`html
<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script>
  export default {
    data() {
      return {
        text: '',
      };
    },
  };
</scrip/t>
\`\`\`

## Refrence

- [ElementUi Scrollbar Component](https://github.com/ElemeFE/element/tree/dev/packages/scrollbar)
- [vuepress-plugin-container](https://vuepress.github.io/zh/plugins/container/)

`,
      mode: "editable",
      article: {
        comments: {
          inputbox: {
            errorMessages: "",
          },
        },
      },
    };
  },
  computed: {
    // itemss() {
    //   return Array.from({ length: this.length }, (k, v) => v + 1);
    // },
    // length() {
    //   return 1;
    // },
  },
  methods: {
    test(s) {
      alert(s);
    },
    next(k) {
      this.text = k;
    },
    top() {
      this.$scrollTo();
    },
    addline() {
      let str = $("#articleDetail").html(
        $("textarea").val().replace(/\n/g, "<br/>")
      );
      console.log("str", str);
      tempcomment + str;
    },
    setstatus(j) {
      for (var k = 0, len = this.rightbar.length; k < len; k++) {
        if (j === k) {
          if (j === this.rightbar.length - 1) {
            break;
          }
          if (!this.rightbar[k].status) {
            this.rightbar[k].icon = this.rightbar[k].fin_icon;
            this.rightbar[k].color = "#4B9FD1";
            this.rightbar[k].nums++;
            this.rightbar[k].status = !this.rightbar[k].status;
            console.log(this.rightbar[k]);
            return;
          }
          this.rightbar[k].icon = this.rightbar[k].inc_icon;
          this.rightbar[k].color = "";
          this.rightbar[k].nums--;
          this.rightbar[k].status = !this.rightbar[k].status;
        }
      }
    },
    commentSeparate(item) {
      let tempcomment = item.replycontent;
      if (tempcomment === null || tempcomment.length === 0) {
        item.errorMessages = "评论不能为空";
        setTimeout(() => {
          item.errorMessages = "";
        }, 2000);
        return;
      }
      if (tempcomment.length > 100) {
        item.errorMessages = "评论超过规定字数";
        setTimeout(() => {
          item.errorMessages = "";
        }, 2000);
        return;
      }
      let str = tempcomment.replace(/\n/g, "<br/>");
      let createtime = formatterDate(
        new Date(Date().valueOf()),
        "yyyy-MM-dd hh:mm"
      );
      // item.push({ divider: true, inset: true });
      let data = {
        createtime: createtime,
        avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
        name: "ss",
        content: str,
      };
      item.content + str;
      // alert(item.content + str);
      console.log(data);
      item.usercontent.push(data);
      item.replycontent = "";
      item.errorMessages = "";
      item.reply = !item.reply;
    },
    comment() {
      let tempcomment = this.tempcomment;
      if (tempcomment === null || tempcomment.length === 0) {
        this.article.comments.inputbox.errorMessages = "评论不能为空";
        setTimeout(() => {
          this.article.comments.inputbox.errorMessages = "";
        }, 2000);
        return;
      }
      if (tempcomment.length > 100) {
        this.article.comments.inputbox.errorMessages = "评论超过规定字数";
        setTimeout(() => {
          this.article.comments.inputbox.errorMessages = "";
        }, 2000);
        return;
      }
      let str = tempcomment.replace(/\n/g, "<br/>");
      let createtime = formatterDate(
        new Date(Date().valueOf()),
        "yyyy-MM-dd hh:mm"
      );
      this.items.push({ divider: true, inset: true });
      let data = {
        createtime: createtime,
        avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
        title: "test",
        subtitle: str,
      };
      this.items.push(data);
      tempcomment = "";
      this.article.comments.inputbox.errorMessages = "";
    },
  },
  // 创建节点之前设置背景色
  beforeCreate() {
    document.querySelector("div").setAttribute("style", "background:#f6f7f9");
  },
  // 销毁节点之前删除属性
  beforeDestroy() {
    document.querySelector("div").removeAttribute("style");
  },
};
</script>
  
<style>
#article-navigation:hover {
  color: #37a0d3;
}

#article-navigation-top:hover {
  color: #37a0d3;
}

#article-navigation-top {
  margin-top: 20px;
}

#article-navigation {
  position: fixed;
  margin-left: 926px;
  bottom: 100px;
  transition: 0.5s ease-in-out;
  margin-bottom: 50px;
  z-index: 10;
}

#article-comments-sendbutton {
  margin-top: 18px;
  right: -106%;
  bottom: 60%;
  color: #fff;
  word-break: break-word;
  display: block;
  white-space: pre-wrap;
}

#article-comments-inputbox {
  max-height: 110px;
  min-width: 100%;
  overflow: auto;
  margin: 10px 0;
  margin-left: 30px;
  white-space: pre-line;
  white-space: pre-wrap;
}

#article-comments-inputbox-headportrait {
  top: 40px;
  left: 15px;
}

#article-comments {
  margin-top: 20px;
}

#article {
  width: 900px;
  margin: 0 auto;
  /* background: #f6f7f9; */
}

#article-content img {
  width: auto;
  height: auto;
  margin-top: 60px;
}

#article-content h1 {
  color: #2e3e4f;
  white-space: nowrap;
  line-height: 40px;
  top: 40px;
}

#article-title {
  margin-top: 10px;
  font-size: 50px;
  line-height: 1.4;
  min-height: 39px px;
  font-size: 28px;
  color: #222;
  margin-bottom: 16px;
  font-weight: 700;
  text-align: center;
}

#article-head {
  padding-top: 100px;
}

#article-category {
  color: #7d7d7d;
  font-size: 13px;
  max-width: 0;
  top: 18px;
  left: 26%;
}
</style>